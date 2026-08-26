import assert from 'node:assert/strict';
import {
  MOMENTUM_SUPPORT_MAX_ENCODED_LENGTH,
  MOMENTUM_SUPPORT_STORAGE_KEY,
  MOMENTUM_SUPPORT_TTL_MS,
  decodeMomentumSupportContext,
  prefillMomentumSupportForm,
  readMomentumSupportContext,
} from '../src/lib/momentum-support-context.mjs';

const now = Date.UTC(2026, 7, 26, 12, 0, 0);
const validContext = {
  v: 1,
  iat: Math.floor(now / 1000),
  source: 'momentum',
  language: 'fr',
  instance: 'customer.momentum.example',
  enterpriseId: 'enterprise-42',
  userId: 'staff-123',
  firstName: 'Zoë',
  lastName: 'Dùpont',
  email: 'zoe@example.com',
  appVersion: '2026.8.26',
  pagePath: '/frmMain.aspx',
};

function encode(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function storageFor(payload, receivedAt = now) {
  const values = new Map([[MOMENTUM_SUPPORT_STORAGE_KEY, JSON.stringify({ receivedAt, payload })]]);
  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
  };
}

const encoded = encode(validContext);
assert.deepEqual(decodeMomentumSupportContext(encoded, now), validContext, 'valid Unicode context must round-trip');
assert.equal(decodeMomentumSupportContext('not+base64', now), null, 'non-base64url payload must be rejected');
assert.equal(decodeMomentumSupportContext('a'.repeat(MOMENTUM_SUPPORT_MAX_ENCODED_LENGTH + 1), now), null, 'oversize payload must be rejected');
assert.equal(decodeMomentumSupportContext(encode({ ...validContext, iat: Math.floor((now - MOMENTUM_SUPPORT_TTL_MS - 1) / 1000) }), now), null, 'expired payload must be rejected');
assert.ok(decodeMomentumSupportContext(encode({ ...validContext, iat: Math.floor((now + (15 * 60 * 1000)) / 1000) }), now), 'bounded future clock skew must be accepted');
assert.equal(decodeMomentumSupportContext(encode({ ...validContext, iat: Math.floor((now + (15 * 60 * 1000) + 1000) / 1000) }), now), null, 'excess future clock skew must be rejected');
assert.equal(decodeMomentumSupportContext(encode({ ...validContext, language: 'es' }), now), null, 'unsupported locale must be rejected');
assert.equal(decodeMomentumSupportContext(encode({ ...validContext, pagePath: '/page?token=secret' }), now), null, 'query strings must never enter support context');
assert.equal(decodeMomentumSupportContext(encode({ ...validContext, instance: 'https://customer.example' }), now), null, 'instance must be a host, not a URL');
assert.ok(
  decodeMomentumSupportContext(encode({ ...validContext, firstName: '😀'.repeat(100) }), now),
  'bounded non-BMP text must be measured by Unicode code point',
);
assert.equal(
  decodeMomentumSupportContext(encode({ ...validContext, firstName: '😀'.repeat(101) }), now),
  null,
  'non-BMP text over the code-point limit must be rejected',
);
assert.equal(
  decodeMomentumSupportContext(encode({ ...validContext, firstName: 'A\u0085B' }), now),
  null,
  'C1 controls must be rejected',
);
assert.equal(
  decodeMomentumSupportContext(encode({ ...validContext, firstName: '\uD800' }), now),
  null,
  'unpaired surrogates must be rejected',
);

assert.deepEqual(readMomentumSupportContext(storageFor(encoded), now), validContext, 'stored context must be read within its TTL');
const expiredStorage = storageFor(encoded, now - MOMENTUM_SUPPORT_TTL_MS - 1);
assert.equal(readMomentumSupportContext(expiredStorage, now), null, 'expired session context must not be returned');
assert.equal(expiredStorage.getItem(MOMENTUM_SUPPORT_STORAGE_KEY), null, 'expired session context must be removed');
assert.equal(readMomentumSupportContext({ getItem() { throw new Error('blocked'); } }, now), null, 'blocked storage must fail closed');

function control(name) {
  return {
    name,
    value: '',
    events: [],
    getAttribute(attribute) { return attribute === 'name' ? this.name : null; },
    dispatchEvent(event) { this.events.push(event.type); },
  };
}

const controls = [
  control('firstname'),
  control('lastname'),
  control('email'),
  control('TICKET.mm_instance'),
  control('0-2/mm_instances'),
  control('TICKET.mm_orig_release'),
  control('TICKET.mm_product'),
  control('TICKET.mm_momentum_page_path'),
  control('TICKET.mm_momentum_user_id'),
  control('TICKET.mm_momentum_enterprise_id'),
  control('TICKET.mm_momentum_language'),
  control('TICKET.mm_kb_article_path'),
];
const root = { querySelectorAll: () => controls };
const result = prefillMomentumSupportForm(root, validContext, '/fr/help/edit-a-schedule/');

assert.deepEqual(result.missing, [], 'the target HubSpot schema must accept every mapped value');
assert.equal(controls.find((item) => item.name === 'firstname').value, 'Zoë');
assert.equal(controls.find((item) => item.name === 'TICKET.mm_instance').value, validContext.instance);
assert.equal(controls.find((item) => item.name === '0-2/mm_instances').value, validContext.instance);
assert.equal(controls.find((item) => item.name === 'TICKET.mm_product').value, 'Momentum Staff Scheduler');
assert.equal(controls.find((item) => item.name === 'TICKET.mm_momentum_page_path').value, '/frmMain.aspx');
assert.equal(controls.find((item) => item.name === 'TICKET.mm_kb_article_path').value, '/fr/help/edit-a-schedule/');
assert.ok(controls.every((item) => item.events.join(',') === 'input,change'), 'prefill must notify HubSpot of every populated field');

let controlledValue = '';
const controlledInput = Object.create({
  get value() { return controlledValue; },
  set value(value) { controlledValue = value; },
});
Object.assign(controlledInput, {
  name: 'email',
  events: [],
  getAttribute(attribute) { return attribute === 'name' ? this.name : null; },
  dispatchEvent(event) { this.events.push(event.type); },
});
prefillMomentumSupportForm({ querySelectorAll: () => [controlledInput] }, validContext);
assert.equal(controlledValue, validContext.email, 'controlled HubSpot inputs must use their native value setter');
assert.deepEqual(controlledInput.events, ['input', 'change']);

const partialResult = prefillMomentumSupportForm({ querySelectorAll: () => [control('firstname')] }, validContext);
assert.ok(partialResult.missing.includes('instance'), 'missing form fields must be reported');

console.log('Momentum support context validation and HubSpot prefill OK');

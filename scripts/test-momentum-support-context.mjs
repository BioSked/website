import assert from 'node:assert/strict';
import {
  MOMENTUM_SUPPORT_MAX_ENCODED_LENGTH,
  MOMENTUM_SUPPORT_LAST_KB_STORAGE_KEY,
  MOMENTUM_SUPPORT_STORAGE_KEY,
  MOMENTUM_SUPPORT_TTL_MS,
  applyMomentumSupportFormData,
  decodeMomentumSupportContext,
  prefillMomentumSupportForm,
  readLastKnowledgeBasePath,
  readMomentumSupportContext,
  storeLastKnowledgeBasePath,
  verifyMomentumSupportForm,
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
  username: 'zdupont',
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

// A Momentum build older than the username field must keep working: the handoff
// stays valid and the field reads as absent, rather than the whole context
// being rejected and every prefill silently disappearing.
const { username: _omitted, ...withoutUsername } = validContext;
assert.deepEqual(
  decodeMomentumSupportContext(encode(withoutUsername), now),
  { ...validContext, username: '' },
  'a handoff without a username must stay valid',
);
assert.equal(
  decodeMomentumSupportContext(encode({ ...validContext, username: 'x'.repeat(101) }), now),
  null,
  'an oversized username must fail closed',
);
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

function mutableStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

const articleStorage = mutableStorage();
assert.equal(storeLastKnowledgeBasePath(articleStorage, '/help/edit-a-schedule/', now), true);
assert.equal(readLastKnowledgeBasePath(articleStorage, now), '/help/edit-a-schedule/');
assert.equal(storeLastKnowledgeBasePath(articleStorage, '/fr/help/modifier-un-planning/', now), true);
assert.equal(readLastKnowledgeBasePath(articleStorage, now), '/fr/help/modifier-un-planning/');
assert.equal(storeLastKnowledgeBasePath(articleStorage, '/help/kb-tickets/new/', now), false, 'support form must never be recorded as an article');
assert.equal(storeLastKnowledgeBasePath(articleStorage, '/pricing/', now), false, 'non-KB paths must be rejected');
assert.equal(storeLastKnowledgeBasePath(articleStorage, '/help/article/?token=secret', now), false, 'query strings must be rejected');
articleStorage.setItem(MOMENTUM_SUPPORT_LAST_KB_STORAGE_KEY, JSON.stringify({
  viewedAt: now - MOMENTUM_SUPPORT_TTL_MS - 1,
  path: '/help/expired-article/',
}));
assert.equal(readLastKnowledgeBasePath(articleStorage, now), '', 'expired article attribution must be rejected');
assert.equal(articleStorage.getItem(MOMENTUM_SUPPORT_LAST_KB_STORAGE_KEY), null, 'expired article attribution must be removed');

function control(name, type = 'text') {
  return {
    name,
    type,
    value: '',
    defaultValue: '',
    events: [],
    attributes: new Map(),
    getAttribute(attribute) {
      if (attribute === 'name') return this.name;
      if (attribute === 'type') return this.type;
      return this.attributes.get(attribute) ?? null;
    },
    setAttribute(attribute, value) { this.attributes.set(attribute, value); },
    dispatchEvent(event) { this.events.push(event.type); },
  };
}

const controls = [
  control('firstname'),
  control('lastname'),
  control('email'),
  control('TICKET.mm_instance', 'hidden'),
  control('0-2/mm_instances'),
  control('TICKET.mm_orig_release', 'hidden'),
  control('TICKET.mm_product', 'hidden'),
  control('TICKET.mm_momentum_page_path', 'hidden'),
  control('TICKET.mm_momentum_user_id', 'hidden'),
  control('TICKET.mm_momentum_username', 'hidden'),
  control('TICKET.mm_momentum_enterprise_id', 'hidden'),
  control('TICKET.mm_momentum_language', 'hidden'),
  control('TICKET.mm_kb_article_path', 'hidden'),
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
assert.deepEqual(
  verifyMomentumSupportForm(root, validContext, '/fr/help/edit-a-schedule/'),
  {
    confirmed: ['firstName', 'lastName', 'email', 'instance', 'appVersion', 'product', 'pagePath', 'userId', 'username', 'enterpriseId', 'language', 'lastKbPath'],
    missing: [],
    mismatched: [],
  },
  'verification must report only physical controls whose current values still match the context',
);
assert.ok(
  controls.filter((item) => item.type !== 'hidden').every((item) => item.events.join(',') === 'input,change'),
  'prefill must notify HubSpot input validation and legacy change handlers for visible fields',
);
assert.ok(
  controls.filter((item) => item.type === 'hidden').every((item) => item.events.length === 0),
  'hidden HubSpot fields must not dispatch events that reset their values',
);
let controlledValue = '';
const controlledInput = Object.create({
  get value() { return controlledValue; },
  set value(value) { controlledValue = value; },
});
Object.assign(controlledInput, {
  name: 'firstname',
  events: [],
  getAttribute(attribute) { return attribute === 'name' ? this.name : null; },
  dispatchEvent(event) { this.events.push(event.type); },
});
prefillMomentumSupportForm({ querySelectorAll: () => [controlledInput] }, validContext);
assert.equal(controlledValue, validContext.firstName, 'controlled HubSpot inputs must use their value setter');
assert.deepEqual(controlledInput.events, ['input', 'change']);

const submittedValues = new Map();
const formData = {
  set(name, value) { submittedValues.set(name, value); },
};
const submittedNames = applyMomentumSupportFormData(formData, validContext, '/fr/help/edit-a-schedule/');
assert.equal(submittedValues.get('TICKET.mm_instance'), validContext.instance);
assert.equal(submittedValues.get('TICKET.mm_orig_release'), validContext.appVersion);
assert.equal(submittedValues.get('TICKET.mm_product'), 'Momentum Staff Scheduler');
assert.equal(submittedValues.get('TICKET.mm_kb_article_path'), '/fr/help/edit-a-schedule/');
assert.equal(submittedValues.has('firstname'), false, 'submission refresh must preserve visible contact fields');
assert.equal(submittedValues.has('email'), false, 'submission refresh must preserve user-correctable email');
assert.equal(submittedValues.has('0-2/mm_instances'), false, 'submission refresh must preserve the French company instance field');
assert.ok(submittedNames.every((name) => name.startsWith('TICKET.') || name.startsWith('mm_')));

const alreadyEditedEmail = control('email');
alreadyEditedEmail.value = 'corrected@example.com';
prefillMomentumSupportForm({ querySelectorAll: () => [alreadyEditedEmail] }, validContext);
assert.equal(alreadyEditedEmail.value, 'corrected@example.com', 'retries must not overwrite user corrections');

const partialResult = prefillMomentumSupportForm({ querySelectorAll: () => [control('firstname')] }, validContext);
assert.ok(partialResult.missing.includes('instance'), 'missing form fields must be reported');

console.log('Momentum support context validation and HubSpot prefill OK');

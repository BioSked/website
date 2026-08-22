/**
 * KB support form end-to-end test.
 * Fills the real HubSpot form on the KB preview page and submits it with trusted
 * mouse events, so the submission travels the exact path a customer's would.
 * Prints the ticket stamp to verify routing in HubSpot afterwards.
 *
 *   node kb-support-e2e.mjs [fr|en]
 */
import { launch } from 'chrome-launcher';
import CDP from 'chrome-remote-interface';

const LOCALE = (process.argv[2] || 'fr').toLowerCase();
const BASE = process.env.KB_BASE || 'http://localhost:8899';
const URL = `${BASE}${LOCALE === 'en' ? '/help' : `/${LOCALE}/help`}/kb-tickets/new/`;

const STAMP = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
const SUBJECT = `[TEST KB E2E ${STAMP}] ${LOCALE.toUpperCase()} routing check`;

const VALUES = {
  firstname: 'Claude',
  lastname: 'E2E Test',
  email: 'claude.martin@biosked.com',
  company: 'BioSked (automated test)',
  country: LOCALE === 'fr' ? 'France' : 'United States',
  '0-2/mm_instances': 'kb-preview.biosked.com (test)',
  'TICKET.mm_product': 'Momentum Staff Scheduler',
  'TICKET.hs_ticket_category': 'GENERAL_INQUIRY',
  'TICKET.hs_ticket_priority': 'LOW',
  'TICKET.subject': SUBJECT,
  'TICKET.content': [
    'Automated end-to-end test submitted from the KB preview support form.',
    'Purpose: confirm the request reaches the correct support pipeline.',
    'No action required, this ticket can be closed.',
    `Stamp: ${STAMP}`,
  ].join('\n'),
};

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-first-run', '--disable-gpu'] });
const client = await CDP({ port: chrome.port });
const { Page, Runtime, Input, Emulation } = client;
await Page.enable();
await Runtime.enable();
await Emulation.setDeviceMetricsOverride({ width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

const evalJs = async (expression) => {
  const { result, exceptionDetails } = await Runtime.evaluate({ expression, returnByValue: true, awaitPromise: true });
  if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || 'eval failed');
  return result.value;
};

console.log(`→ ${URL}`);
await Page.navigate({ url: URL });
await Page.loadEventFired();
await new Promise((r) => setTimeout(r, 6000)); // HubSpot embed + iframe render

const ready = await evalJs(`(() => {
  const f = document.querySelector('#kb-support-form iframe');
  if (!f) return { ok: false, why: 'no iframe' };
  const d = f.contentDocument;
  if (!d || !d.querySelector('form')) return { ok: false, why: 'no form in iframe' };
  return { ok: true, fields: d.querySelectorAll('.hs-form-field').length };
})()`);
if (!ready.ok) { console.error('FAIL: form never rendered:', ready.why); await client.close(); await chrome.kill(); process.exit(1); }
console.log(`   form rendered (${ready.fields} fields)`);

const filled = await evalJs(`(() => {
  const d = document.querySelector('#kb-support-form iframe').contentDocument;
  const values = ${JSON.stringify(VALUES)};
  const setVal = (el, v) => {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype
      : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  };
  const missing = [];
  Object.keys(values).forEach((name) => {
    const el = d.querySelector('[name="' + name + '"]');
    if (!el) { missing.push(name); return; }
    setVal(el, values[name]);
  });
  return { missing };
})()`);
if (filled.missing.length) console.log(`   note: fields not found: ${filled.missing.join(', ')}`);
console.log('   fields filled');

// Trusted click on the submit button (HubSpot ignores synthetic .click()).
// The embed iframe is taller than the viewport and does not scroll itself, so the
// host page has to be scrolled until the button is actually on screen.
const btn = await evalJs(`(() => {
  const f = document.querySelector('#kb-support-form iframe');
  const b = f.contentDocument.querySelector('.hs-button');
  const scroller = document.scrollingElement && document.scrollingElement.scrollHeight > innerHeight
    ? document.scrollingElement
    : (document.body.scrollHeight > document.body.clientHeight ? document.body : document.documentElement);
  const rectY = () => f.getBoundingClientRect().top + b.getBoundingClientRect().top;
  scroller.scrollTop += rectY() - innerHeight / 2;
  return new Promise((res) => setTimeout(() => {
    const ir = f.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const x = Math.round(ir.left + br.left + br.width / 2);
    const y = Math.round(ir.top + br.top + br.height / 2);
    const hit = document.elementFromPoint(x, y);
    res({
      x, y, label: b.value || b.textContent,
      onScreen: y > 0 && y < innerHeight,
      hit: hit ? hit.tagName + '.' + String(hit.className).slice(0, 30) : null,
    });
  }, 600));
})()`);
if (!btn.onScreen) {
  console.error(`FAIL: submit button off screen at y=${btn.y}`);
  await client.close(); await chrome.kill(); process.exit(1);
}
console.log(`   button on screen (hit test: ${btn.hit})`);
console.log(`   clicking "${btn.label.trim()}" at (${btn.x}, ${btn.y})`);
for (const type of ['mousePressed', 'mouseReleased']) {
  await Input.dispatchMouseEvent({ type, x: btn.x, y: btn.y, button: 'left', clickCount: 1 });
}

let outcome = null;
for (let i = 0; i < 20; i += 1) {
  await new Promise((r) => setTimeout(r, 1000));
  outcome = await evalJs(`(() => {
    const f = document.querySelector('#kb-support-form iframe');
    const d = f ? f.contentDocument : null;
    const host = document.querySelector('#kb-support-form');
    const done = (d && d.querySelector('.submitted-message')) || (host && host.querySelector('.submitted-message'));
    const errs = d ? [...d.querySelectorAll('.hs-error-msg, .hs-error-msgs li')].map(e => e.textContent.trim()).filter(Boolean) : [];
    return { submitted: !!done, message: done ? done.textContent.trim().slice(0, 200) : null, errors: errs.slice(0, 5) };
  })()`);
  if (outcome.submitted || outcome.errors.length) break;
}

console.log('\n' + '='.repeat(70));
if (outcome.submitted) {
  console.log(`SUBMITTED OK  (locale ${LOCALE})`);
  console.log(`  confirmation: ${outcome.message}`);
} else {
  console.log(`NOT SUBMITTED (locale ${LOCALE})`);
  if (outcome.errors.length) console.log(`  validation errors: ${outcome.errors.join(' | ')}`);
}
console.log(`  stamp:   ${STAMP}`);
console.log(`  subject: ${SUBJECT}`);
console.log('='.repeat(70));

await client.close();
await chrome.kill();
process.exit(outcome.submitted ? 0 : 1);

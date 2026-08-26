export const MOMENTUM_SUPPORT_FRAGMENT_PREFIX = '#momentum-support=';
export const MOMENTUM_SUPPORT_STORAGE_KEY = 'biosked-momentum-support-context-v1';
export const MOMENTUM_SUPPORT_MAX_ENCODED_LENGTH = 8192;
export const MOMENTUM_SUPPORT_TTL_MS = 4 * 60 * 60 * 1000;

// React compensates with server time before minting the handoff. Keep a bounded
// tolerance for response latency, clock granularity, and older clients that do
// not yet have that offset; a larger window would weaken stale-link rejection.
const MAX_FUTURE_CLOCK_SKEW_MS = 15 * 60 * 1000;
const SUPPORTED_LANGUAGES = new Set(['en', 'fr', 'de', 'nl', 'it']);

const FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 320,
  instance: 253,
  enterpriseId: 100,
  userId: 100,
  appVersion: 80,
  pagePath: 500,
};

function isBoundedText(value, maximum, { allowEmpty = true } = {}) {
  if (typeof value !== 'string' || (!allowEmpty && value.length === 0)) return false;

  const codePoints = Array.from(value);
  return codePoints.length <= maximum
    && codePoints.every((character) => {
      const codePoint = character.codePointAt(0) ?? 0;
      return codePoint > 31
        && (codePoint < 127 || codePoint > 159)
        && (codePoint < 0xD800 || codePoint > 0xDFFF);
    });
}

function isInstanceHost(value) {
  if (!isBoundedText(value, FIELD_LIMITS.instance, { allowEmpty: false })) return false;
  if (!/^[a-z0-9.-]+(?::\d{1,5})?$/i.test(value)) return false;
  try {
    const parsed = new URL(`https://${value}`);
    return parsed.host === value && parsed.pathname === '/';
  } catch {
    return false;
  }
}

function isSafePagePath(value) {
  return isBoundedText(value, FIELD_LIMITS.pagePath, { allowEmpty: false })
    && value.startsWith('/')
    && !/[?#]/.test(value);
}

function decodeBase64Url(value) {
  if (typeof value !== 'string'
    || value.length < 1
    || value.length > MOMENTUM_SUPPORT_MAX_ENCODED_LENGTH
    || !/^[A-Za-z0-9_-]+$/.test(value)) {
    return null;
  }

  try {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

export function decodeMomentumSupportContext(encoded, now = Date.now()) {
  const decoded = decodeBase64Url(encoded);
  if (!decoded) return null;

  let value;
  try {
    value = JSON.parse(decoded);
  } catch {
    return null;
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  if (value.v !== 1 || value.source !== 'momentum') return null;
  if (!Number.isInteger(value.iat)) return null;

  const issuedAtMs = value.iat * 1000;
  if (issuedAtMs > now + MAX_FUTURE_CLOCK_SKEW_MS || issuedAtMs < now - MOMENTUM_SUPPORT_TTL_MS) {
    return null;
  }

  if (!SUPPORTED_LANGUAGES.has(value.language)) return null;
  if (!isInstanceHost(value.instance)) return null;
  if (!isSafePagePath(value.pagePath)) return null;
  if (!isBoundedText(value.enterpriseId, FIELD_LIMITS.enterpriseId, { allowEmpty: false })) return null;
  if (!isBoundedText(value.userId, FIELD_LIMITS.userId, { allowEmpty: false })) return null;
  if (!isBoundedText(value.firstName, FIELD_LIMITS.firstName)) return null;
  if (!isBoundedText(value.lastName, FIELD_LIMITS.lastName)) return null;
  if (!isBoundedText(value.email, FIELD_LIMITS.email)) return null;
  if (value.email && (!value.email.includes('@') || /\s/.test(value.email))) return null;
  if (!isBoundedText(value.appVersion, FIELD_LIMITS.appVersion)) return null;

  return {
    v: 1,
    iat: value.iat,
    source: 'momentum',
    language: value.language,
    instance: value.instance,
    enterpriseId: value.enterpriseId,
    userId: value.userId,
    firstName: value.firstName,
    lastName: value.lastName,
    email: value.email,
    appVersion: value.appVersion,
    pagePath: value.pagePath,
  };
}

export function readMomentumSupportContext(storage, now = Date.now()) {
  if (!storage) return null;

  let raw;
  try {
    raw = storage.getItem(MOMENTUM_SUPPORT_STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  let envelope;
  try {
    envelope = JSON.parse(raw);
  } catch {
    clearMomentumSupportContext(storage);
    return null;
  }

  if (!envelope
    || !Number.isFinite(envelope.receivedAt)
    || envelope.receivedAt > now + MAX_FUTURE_CLOCK_SKEW_MS
    || envelope.receivedAt < now - MOMENTUM_SUPPORT_TTL_MS) {
    clearMomentumSupportContext(storage);
    return null;
  }

  const context = decodeMomentumSupportContext(envelope.payload, now);
  if (!context) clearMomentumSupportContext(storage);
  return context;
}

export function clearMomentumSupportContext(storage) {
  try {
    storage?.removeItem(MOMENTUM_SUPPORT_STORAGE_KEY);
  } catch {
    // Browsers can block storage. The handoff remains optional in that case.
  }
}

export function momentumHubSpotFieldValues(context, lastKnowledgeBasePath = '') {
  return [
    { key: 'firstName', names: ['firstname'], value: context.firstName },
    { key: 'lastName', names: ['lastname'], value: context.lastName },
    { key: 'email', names: ['email'], value: context.email },
    { key: 'instance', names: ['TICKET.mm_instance', 'mm_instance', '0-2/mm_instances'], value: context.instance },
    { key: 'appVersion', names: ['TICKET.mm_orig_release', 'mm_orig_release'], value: context.appVersion },
    { key: 'product', names: ['TICKET.mm_product', 'mm_product'], value: 'Momentum Staff Scheduler' },
    { key: 'pagePath', names: ['TICKET.mm_momentum_page_path', 'mm_momentum_page_path'], value: context.pagePath },
    { key: 'userId', names: ['TICKET.mm_momentum_user_id', 'mm_momentum_user_id'], value: context.userId },
    { key: 'enterpriseId', names: ['TICKET.mm_momentum_enterprise_id', 'mm_momentum_enterprise_id'], value: context.enterpriseId },
    { key: 'language', names: ['TICKET.mm_momentum_language', 'mm_momentum_language'], value: context.language },
    { key: 'lastKbPath', names: ['TICKET.mm_kb_article_path', 'mm_kb_article_path'], value: lastKnowledgeBasePath },
  ];
}

function setElementValue(element, value) {
  // HubSpot's classic v2 embed does not keep hidden fields in the same
  // controlled state as visible inputs. Dispatching input/change on a hidden
  // field makes HubSpot reconcile it back to its blank default. Attribute
  // mutations can also trigger a re-render, so update only the native value;
  // the formdata hook below refreshes ticket fields at submission time.
  const isHidden = element?.type === 'hidden' || element?.getAttribute?.('type') === 'hidden';
  if (isHidden) {
    element.value = value;
    return;
  }

  // HubSpot's supported legacy-form prefill pattern is equivalent to jQuery's
  // .val(value).change(): assign through the control's own value path, then
  // notify the embed with a change event.
  element.value = value;
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

export function prefillMomentumSupportForm(root, context, lastKnowledgeBasePath = '') {
  const controls = Array.from(root?.querySelectorAll?.('input[name], select[name], textarea[name]') ?? []);
  const applied = [];
  const missing = [];

  for (const field of momentumHubSpotFieldValues(context, lastKnowledgeBasePath)) {
    if (!field.value) continue;
    const matches = controls.filter((control) => field.names.includes(control.getAttribute('name')));
    if (matches.length === 0) {
      missing.push(field.key);
      continue;
    }
    for (const control of matches) {
      // Do not overwrite a correction the user has already made while a later
      // HubSpot fieldset is still rendering. Blank controls still receive the
      // app context on each bounded retry.
      if (!control.value) setElementValue(control, field.value);
    }
    applied.push(field.key);
  }

  return { applied, missing };
}

export function verifyMomentumSupportForm(root, context, lastKnowledgeBasePath = '') {
  const controls = Array.from(root?.querySelectorAll?.('input[name], select[name], textarea[name]') ?? []);
  const confirmed = [];
  const missing = [];
  const mismatched = [];

  for (const field of momentumHubSpotFieldValues(context, lastKnowledgeBasePath)) {
    if (!field.value) continue;
    const matches = controls.filter((control) => field.names.includes(control.getAttribute('name')));
    if (matches.length === 0) missing.push(field.key);
    else if (matches.every((control) => control.value === field.value)) confirmed.push(field.key);
    else mismatched.push(field.key);
  }

  return { confirmed, missing, mismatched };
}

export function applyMomentumSupportFormData(formData, context, lastKnowledgeBasePath = '') {
  if (!formData?.set) return [];

  const applied = [];
  for (const field of momentumHubSpotFieldValues(context, lastKnowledgeBasePath)) {
    if (!field.value) continue;
    for (const name of field.names) {
      // Contact fields and the French company-level instance field are visible
      // and user-correctable. Preserve the values shown in the form. The
      // app-only ticket context remains authoritative for this submission and
      // is refreshed after HubSpot has constructed the native FormData object.
      if (!name.startsWith('TICKET.') && !name.startsWith('mm_')) continue;
      formData.set(name, field.value);
      applied.push(name);
    }
  }
  return applied;
}

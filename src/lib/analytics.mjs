const SITE_LANGUAGES = new Set(['en', 'fr', 'fr-ch', 'de', 'nl', 'it']);
const LOCALE_PREFIXES = new Set(['fr', 'fr-ch', 'de', 'nl', 'it']);
const DEMO_FORM_IDS = new Set([
  'e937d75c-2dbc-4b77-8e53-1582aa472092',
  'a28f608c-a613-4fbe-a382-1fbc49b6885c',
  '86756c6e-ad74-4d9e-8f3a-68b36b459ba0',
]);
const QUOTE_FORM_ID = '152f6973-10dd-42d4-af28-2df2f8f830e9';

export function normalizeSiteLanguage(language) {
  const normalized = String(language || '').toLowerCase();
  if (SITE_LANGUAGES.has(normalized)) return normalized;
  const base = normalized.split('-')[0];
  return SITE_LANGUAGES.has(base) ? base : 'en';
}

export function classifyCtaPath(pathname) {
  const segments = String(pathname || '').split('/').filter(Boolean);
  if (LOCALE_PREFIXES.has(segments[0])) segments.shift();
  if (segments.length !== 1) return null;
  if (segments[0] === 'demo') return 'demo_cta_click';
  if (segments[0] === 'getquote') return 'quote_cta_click';
  return null;
}

export function createDedupedEventDispatcher(
  sendEvent,
  dedupeWindowMs = 2000,
  now = Date.now,
) {
  const recentEvents = new Map();

  return (dedupeKey, eventName, parameters, onComplete) => {
    const currentTime = now();
    const existing = recentEvents.get(dedupeKey);
    if (existing && currentTime - existing.startedAt < dedupeWindowMs) {
      if (onComplete) {
        if (existing.completed) onComplete();
        else existing.callbacks.add(onComplete);
      }
      return;
    }

    const state = {
      startedAt: currentTime,
      completed: false,
      callbacks: new Set(onComplete ? [onComplete] : []),
    };
    recentEvents.set(dedupeKey, state);

    sendEvent(eventName, parameters, () => {
      if (state.completed) return;
      state.completed = true;
      for (const callback of state.callbacks) callback();
      state.callbacks.clear();
    });
  };
}

export function leadEventForForm(formId, pathname) {
  if (DEMO_FORM_IDS.has(formId)) return 'demo_form_submit';
  if (formId !== QUOTE_FORM_ID) return null;
  return /\/ressources\/?$/.test(String(pathname || ''))
    ? 'whitepaper_unlock'
    : 'quote_form_submit';
}

const SITE_LANGUAGES = new Set(['en', 'fr', 'fr-ch', 'de', 'de-ch', 'nl', 'it']);
const LOCALE_PREFIXES = new Set(['fr', 'fr-ch', 'de', 'de-ch', 'nl', 'it']);
const DEMO_FORM_IDS = new Set([
  'e937d75c-2dbc-4b77-8e53-1582aa472092',
  'a28f608c-a613-4fbe-a382-1fbc49b6885c',
  '86756c6e-ad74-4d9e-8f3a-68b36b459ba0',
]);
const QUOTE_FORM_ID = '152f6973-10dd-42d4-af28-2df2f8f830e9';
const KB_SUPPORT_FORM_IDS = new Set([
  'd6e6cae7-b838-40b9-b84b-bbfb1a46ec1e',
  '894f4e34-0e56-402f-9092-b09cc9876473',
]);

// Time zones associated with jurisdictions where this site's audience-
// measurement configuration requires opt-in before analytics loads. Treat
// Europe conservatively, including Switzerland because Europe/Zurich is also
// used in Germany and Liechtenstein. Include European territories whose IANA
// time zone does not begin with Europe/ and common ICU canonical aliases.
export const PRIOR_CONSENT_TIME_ZONES = Object.freeze([
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Athens',
  'Europe/Berlin',
  'Europe/Bratislava',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Budapest',
  'Europe/Busingen',
  'Europe/Copenhagen',
  'Europe/Dublin',
  'Europe/Gibraltar',
  'Europe/Guernsey',
  'Europe/Helsinki',
  'Europe/Isle_of_Man',
  'Europe/Jersey',
  'Europe/Lisbon',
  'Europe/Ljubljana',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Mariehamn',
  'Europe/Monaco',
  'Europe/Nicosia',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Prague',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/San_Marino',
  'Europe/Sofia',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Vaduz',
  'Europe/Vatican',
  'Europe/Vienna',
  'Europe/Vilnius',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Atlantic/Canary',
  'Atlantic/Madeira',
  'Atlantic/Azores',
  'Atlantic/Reykjavik',
  'Africa/Ceuta',
  'Asia/Nicosia',
  'Asia/Famagusta',
  'America/Cayenne',
  'America/Guadeloupe',
  'America/Martinique',
  'America/Marigot',
  'America/St_Barthelemy',
  'Indian/Reunion',
  'Indian/Mayotte',
  'Arctic/Longyearbyen',
  'America/Aruba',
  'America/Cayman',
  'America/Curacao',
  'America/Danmarkshavn',
  'America/Godthab',
  'America/Nuuk',
  'America/Grand_Turk',
  'America/Kralendijk',
  'America/Lower_Princes',
  'America/Miquelon',
  'America/Scoresbysund',
  'America/Thule',
  'America/Tortola',
  'Atlantic/Bermuda',
  'Atlantic/Faeroe',
  'Atlantic/Faroe',
  'Atlantic/South_Georgia',
  'Atlantic/St_Helena',
  'Atlantic/Stanley',
  'Indian/Kerguelen',
  'Pacific/Gambier',
  'Pacific/Marquesas',
  'Pacific/Noumea',
  'Pacific/Tahiti',
  'Pacific/Wallis',
  'Africa/Abidjan',
  'Africa/Nairobi',
  'America/Panama',
  'America/Puerto_Rico',
  'Asia/Dubai',
  'Indian/Maldives',
  'Pacific/Tarawa',
]);

const PRIOR_CONSENT_TIME_ZONE_SET = new Set(PRIOR_CONSENT_TIME_ZONES);

export function requiresPriorAnalyticsConsent(timeZone) {
  const normalized = String(timeZone || '');
  if (!normalized || !normalized.includes('/') || normalized.startsWith('Etc/')) return true;
  return normalized.startsWith('Europe/') || PRIOR_CONSENT_TIME_ZONE_SET.has(normalized);
}

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
  if (KB_SUPPORT_FORM_IDS.has(formId)) return 'kb_support_form_submit';
  if (formId !== QUOTE_FORM_ID) return null;
  return /\/ressources\/?$/.test(String(pathname || ''))
    ? 'whitepaper_unlock'
    : 'quote_form_submit';
}

/**
 * Cookie-free visit counter (site-stats/README.md).
 *
 * One anonymous hit per page view, template download, demo or quote click and
 * completed form, sent to a Firestore collection in the EU (project
 * biosked-site-stats). No cookie, no local storage write, no identifier, no IP
 * address or user agent is stored: only the page path, the referring site,
 * campaign tags and the site language. A hit expires after about 25 months.
 * Visitors who chose "Block" or send Global Privacy Control are not counted.
 */
export const STATS_ENDPOINT =
  'https://firestore.googleapis.com/v1/projects/biosked-site-stats/databases/(default)/documents/hits';

const SITE_HOSTS = new Set(['biosked.com', 'www.biosked.com']);
const RETENTION_DAYS = 760;
const CTA_EVENTS = { template_download: 'tpl', demo_cta_click: 'demo', quote_cta_click: 'quote' };

/** Short form of a GA call-to-action event name, or null when not counted. */
export function statsEventForCta(eventName) {
  return CTA_EVENTS[eventName] ?? null;
}

/** Counting runs only on the live site, never for automated browsers or after a refusal. */
export function statsAllowed({ hostname, gpc, consentChoice, webdriver }) {
  return SITE_HOSTS.has(hostname) && !gpc && consentChoice !== 'denied' && !webdriver;
}

// Campaign values that look like contact details are dropped.
function cleanValue(value, max) {
  const text = String(value ?? '').trim().slice(0, max);
  return /@|\d{6,}/.test(text) ? '' : text;
}

function referrerHost(referrer) {
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return SITE_HOSTS.has(host) ? '' : host.replace(/^www\./, '').slice(0, 100);
  } catch {
    return '';
  }
}

/** Firestore document for one hit. */
export function buildHit({ event, pathname, target = '', referrer = '', search = '', lang = '', now = Date.now() }) {
  const path = String(pathname || '/');
  const params = new URLSearchParams(search);
  const fields = {
    e: { stringValue: event },
    p: { stringValue: (path.startsWith('/') && !path.includes('@') ? path : '/').slice(0, 200) },
    exp: { timestampValue: new Date(now + RETENTION_DAYS * 86400000).toISOString() },
  };
  const add = (key, value) => {
    if (value) fields[key] = { stringValue: value };
  };
  add('x', cleanValue(target, 200));
  add('r', referrerHost(referrer));
  add('s', cleanValue(params.get('utm_source'), 80));
  add('m', cleanValue(params.get('utm_medium'), 80));
  add('c', cleanValue(params.get('utm_campaign'), 80));
  add('l', cleanValue(lang, 5));
  return { fields };
}

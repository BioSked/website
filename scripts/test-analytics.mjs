import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import {
  classifyCtaPath,
  createDedupedEventDispatcher,
  leadEventForForm,
  normalizeSiteLanguage,
  PRIOR_CONSENT_TIME_ZONES,
  requiresPriorAnalyticsConsent,
} from '../src/lib/analytics.mjs';
import {
  buildHubSpotSubmission,
  getCookieValue,
} from '../src/lib/hubspotSubmission.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

function consentRuntimeSource(baseHead) {
  const marker = '<script is:inline define:vars={{ pageLocale, analyticsPageLocation, priorConsentTimeZones }}>';
  const start = baseHead.indexOf(marker);
  assert.notEqual(start, -1, 'consent runtime marker');
  const bodyStart = start + marker.length;
  const bodyEnd = baseHead.indexOf('</script>', bodyStart);
  assert.notEqual(bodyEnd, -1, 'consent runtime closing tag');
  return baseHead.slice(bodyStart, bodyEnd);
}

function runConsentRuntime(source, {
  timeZone,
  choice = null,
  choiceAgeMs = 0,
  gpc = false,
  hostname = 'biosked.com',
  pageUrl = null,
  referrer = '',
} = {}) {
  const storage = new Map();
  if (choice) storage.set('biosked-consent', JSON.stringify({ v: choice, t: Date.now() - choiceAgeMs }));
  const appendedScripts = [];
  const cookieWrites = [];
  const dispatchedEvents = [];
  const eventListeners = new Map();
  class RuntimeEvent { constructor(type) { this.type = type; } }
  class RuntimeCustomEvent extends RuntimeEvent {
    constructor(type, init = {}) {
      super(type);
      this.detail = init.detail;
    }
  }
  const runtimeUrl = new URL(pageUrl || `https://${hostname}/`);
  const document = {
    head: { appendChild: (node) => appendedScripts.push(node) },
    createElement: (tagName) => ({ tagName }),
    referrer,
  };
  Object.defineProperty(document, 'cookie', {
    get: () => '_ga=client; _ga_TEST=container; other=keep',
    set: (value) => cookieWrites.push(value),
  });
  const context = {
    analyticsPageLocation: null,
    Date,
    document,
    Event: RuntimeEvent,
    CustomEvent: RuntimeCustomEvent,
    Intl: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone }) }) },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    },
    location: {
      hostname,
      href: runtimeUrl.href,
      origin: runtimeUrl.origin,
      pathname: runtimeUrl.pathname,
    },
    navigator: { globalPrivacyControl: gpc },
    pageLocale: 'en',
    priorConsentTimeZones: [...PRIOR_CONSENT_TIME_ZONES],
    URL,
    URLSearchParams,
  };
  context.window = context;
  context.addEventListener = (type, listener) => {
    const listeners = eventListeners.get(type) || [];
    listeners.push(listener);
    eventListeners.set(type, listeners);
  };
  context.dispatchEvent = (event) => {
    dispatchedEvents.push(event.type);
    for (const listener of eventListeners.get(event.type) || []) listener(event);
  };
  runInNewContext(source, context);
  const fireEvent = (type, properties = {}) => {
    const event = Object.assign(new RuntimeEvent(type), properties);
    context.dispatchEvent(event);
  };
  return { context, appendedScripts, cookieWrites, dispatchedEvents, fireEvent };
}

assert.equal(normalizeSiteLanguage('en'), 'en');
assert.equal(normalizeSiteLanguage('fr-CH'), 'fr-ch');
assert.equal(normalizeSiteLanguage('de-DE'), 'de');
assert.equal(normalizeSiteLanguage('unknown'), 'en');

for (const timeZone of [
  'Europe/Paris',
  'Europe/London',
  'Europe/Belgrade',
  'Europe/Istanbul',
  'Europe/Zurich',
  'Asia/Nicosia',
  'Atlantic/Canary',
  'Atlantic/Faeroe',
  'Africa/Ceuta',
  'America/Cayenne',
  'America/Puerto_Rico',
  'Indian/Reunion',
  'Pacific/Tahiti',
  'UTC',
  'GMT',
  'Etc/UTC',
  'Etc/GMT+5',
  'CET',
  'EET',
  'WET',
  'EST5EDT',
  'GB-Eire',
]) {
  assert.equal(requiresPriorAnalyticsConsent(timeZone), true, timeZone);
}
for (const timeZone of ['America/New_York']) {
  assert.equal(requiresPriorAnalyticsConsent(timeZone), false, timeZone);
}
assert.equal(requiresPriorAnalyticsConsent(''), true, 'unknown time zone');
assert.ok(PRIOR_CONSENT_TIME_ZONES.length > 60);

assert.equal(classifyCtaPath('/demo/'), 'demo_cta_click');
assert.equal(classifyCtaPath('/fr/demo/'), 'demo_cta_click');
assert.equal(classifyCtaPath('/fr-ch/demo'), 'demo_cta_click');
assert.equal(classifyCtaPath('/nl/getquote/'), 'quote_cta_click');
assert.equal(classifyCtaPath('/blog/demo/'), null);
assert.equal(classifyCtaPath('/demo/thank-you/'), null);

assert.equal(
  leadEventForForm('e937d75c-2dbc-4b77-8e53-1582aa472092', '/demo/'),
  'demo_form_submit',
);
assert.equal(
  leadEventForForm('a28f608c-a613-4fbe-a382-1fbc49b6885c', '/fr/demo/'),
  'demo_form_submit',
);
assert.equal(
  leadEventForForm('86756c6e-ad74-4d9e-8f3a-68b36b459ba0', '/nl/demo/'),
  'demo_form_submit',
);
assert.equal(
  leadEventForForm('152f6973-10dd-42d4-af28-2df2f8f830e9', '/getquote/'),
  'quote_form_submit',
);
assert.equal(
  leadEventForForm('152f6973-10dd-42d4-af28-2df2f8f830e9', '/fr/ressources/'),
  'whitepaper_unlock',
);
assert.equal(
  leadEventForForm('d6e6cae7-b838-40b9-b84b-bbfb1a46ec1e', '/kb-preview/en/knowledge/kb-tickets/new/'),
  'kb_support_form_submit',
);
assert.equal(
  leadEventForForm('894f4e34-0e56-402f-9092-b09cc9876473', '/kb-preview/fr/knowledge/kb-tickets/new/'),
  'kb_support_form_submit',
);
const kbSnapshot = JSON.parse(read('src/data/generated/hubspot-kb.json'));
for (const [name, form] of Object.entries(kbSnapshot.forms)) {
  assert.equal(
    leadEventForForm(form.formId, `/kb-preview/${form.locale}/knowledge/kb-tickets/new/`),
    'kb_support_form_submit',
    `${name} analytics mapping`,
  );
}
assert.equal(leadEventForForm('unknown', '/demo/'), null);

assert.equal(getCookieValue('other=1; hubspotutk=contact%20token', 'hubspotutk'), 'contact token');
assert.equal(getCookieValue('other=1', 'hubspotutk'), '');

assert.deepEqual(
  buildHubSpotSubmission({
    values: {
      firstname: '  Marie ',
      lastname: 'Curie',
      email: 'marie@example.fr',
      company: 'Hôpital exemple',
      numemployees: '120',
      message: '',
      ignored: 'not submitted',
    },
    pageUri: 'https://biosked.com/fr/ressources/',
    pageName: 'Livres blancs',
    hutk: 'contact-token',
    submittedAt: 123456789,
  }),
  {
    submittedAt: '123456789',
    fields: [
      { objectTypeId: '0-1', name: 'firstname', value: 'Marie' },
      { objectTypeId: '0-1', name: 'lastname', value: 'Curie' },
      { objectTypeId: '0-1', name: 'email', value: 'marie@example.fr' },
      { objectTypeId: '0-1', name: 'company', value: 'Hôpital exemple' },
      { objectTypeId: '0-1', name: 'numemployees', value: '120' },
    ],
    context: {
      hutk: 'contact-token',
      pageUri: 'https://biosked.com/fr/ressources/',
      pageName: 'Livres blancs',
    },
  },
);
assert.throws(() => buildHubSpotSubmission({ values: null }), TypeError);

let now = 1000;
const sentEvents = [];
const dispatch = createDedupedEventDispatcher(
  (eventName, parameters, onComplete) => sentEvents.push({ eventName, parameters, onComplete }),
  2000,
  () => now,
);
let duplicateCompleted = 0;
dispatch('demo:key', 'demo_form_submit', { form_id: 'demo' });
dispatch('demo:key', 'demo_form_submit', { form_id: 'demo' }, () => { duplicateCompleted += 1; });
assert.equal(sentEvents.length, 1);
assert.equal(duplicateCompleted, 0);
assert.equal(typeof sentEvents[0].onComplete, 'function');
sentEvents[0].onComplete();
assert.equal(duplicateCompleted, 1);
sentEvents[0].onComplete();
assert.equal(duplicateCompleted, 1);
dispatch('demo:key', 'demo_form_submit', { form_id: 'demo' }, () => { duplicateCompleted += 1; });
assert.equal(duplicateCompleted, 2);
assert.equal(sentEvents.length, 1);
now += 2001;
dispatch('demo:key', 'demo_form_submit', { form_id: 'demo' });
assert.equal(sentEvents.length, 2);

const baseHead = read('src/components/BaseHead.astro');
assert.match(baseHead, /window\.__bskDisableGA\s*=/);
assert.match(baseHead, /ga-disable-G-8BGTQK1QD9/);
assert.match(baseHead, /deleteAnalyticsCookies/);
assert.match(baseHead, /allow_google_signals:\s*false/);
assert.match(baseHead, /allow_ad_personalization_signals:\s*false/);
assert.ok(
  baseHead.indexOf("gtag('consent', 'default'") < baseHead.indexOf("gtag('js', new Date())"),
  'consent defaults must be queued before Google tag initialization',
);
assert.match(baseHead, /if \(choice === 'granted'\) \{ window\.__bskLoadGA\(\); return; \}/);
assert.doesNotMatch(baseHead, /if \(choice === 'granted'\)[\s\S]{0,120}choice === 'denied' \|\| gpc/);
assert.match(baseHead, /define:vars=\{\{ pageLocale, analyticsPageLocation, priorConsentTimeZones \}\}/);
assert.match(baseHead, /site_language:\s*pageLocale/);
assert.match(baseHead, /content_group:\s*pageLocale/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]biosked\.com['"]/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]www\.biosked\.com['"]/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]kb\.biosked\.com['"]/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]kb\.biosked\.fr['"]/);
assert.match(baseHead, /dispatchEvent\(new Event\(['"]bsk:analytics-ready['"]\)\)/);
assert.match(baseHead, /addEventListener\(['"]storage['"]/);
assert.equal((baseHead.match(/addEventListener\(['"]storage['"]/g) || []).length, 1);
assert.match(baseHead, /bsk:consent-synced/);
assert.match(baseHead, /pageType\s*===\s*['"]not-found['"]/);
assert.match(baseHead, /page_location:\s*sanitizedPageLocation\(analyticsPageLocation \|\| location\.href\)/);
assert.match(baseHead, /page_referrer:\s*analyticsPageLocation \? ['"]['"] : sanitizedReferrer\(document\.referrer\)/);
assert.match(baseHead, /pageType\s*===\s*['"]not-found['"][^\n]*<meta name=['"]referrer['"] content=['"]no-referrer['"]/);

const consentSource = consentRuntimeSource(baseHead);
for (const timeZone of new Set([
  ...PRIOR_CONSENT_TIME_ZONES,
  'Europe/Belgrade',
  'Europe/Istanbul',
  'Europe/Zurich',
  'America/New_York',
  'UTC',
  'Etc/UTC',
  'CET',
  'EET',
  'WET',
  'EST5EDT',
  'GB-Eire',
  '',
])) {
  const runtime = runConsentRuntime(consentSource, { timeZone });
  const shouldWait = requiresPriorAnalyticsConsent(timeZone);
  assert.equal(runtime.appendedScripts.length, shouldWait ? 0 : 1, `${timeZone || '(unknown)'} helper/runtime drift`);
  assert.equal(runtime.context.__bskConsentPending === true, shouldWait, `${timeZone || '(unknown)'} pending state`);
}

for (const timeZone of ['Europe/Paris', 'Europe/London', 'Europe/Belgrade', 'Europe/Istanbul', 'Europe/Zurich', 'Asia/Nicosia', 'Africa/Ceuta', 'America/Puerto_Rico', 'Pacific/Tahiti', 'CET', 'EET', 'WET', 'EST5EDT', 'GB-Eire']) {
  const runtime = runConsentRuntime(consentSource, { timeZone });
  assert.equal(runtime.appendedScripts.length, 0, `${timeZone} must wait`);
  assert.equal(runtime.context.__bskConsentPending, true, `${timeZone} must prompt`);
}

for (const timeZone of ['America/New_York']) {
  const runtime = runConsentRuntime(consentSource, { timeZone });
  assert.equal(runtime.appendedScripts.length, 1, `${timeZone} defaults on`);
  assert.equal(runtime.context.__bskGALoaded, true, `${timeZone} analytics enabled`);
  assert.equal(runtime.appendedScripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=GT-NB96M5G7');
}

const unknownZoneRuntime = runConsentRuntime(consentSource, { timeZone: '' });
assert.equal(unknownZoneRuntime.appendedScripts.length, 0);
assert.equal(unknownZoneRuntime.context.__bskConsentPending, true);

const deniedRuntime = runConsentRuntime(consentSource, {
  timeZone: 'America/New_York',
  choice: 'denied',
});
assert.equal(deniedRuntime.appendedScripts.length, 0);
assert.equal(deniedRuntime.context.__bskGALoaded, false);
assert.equal(deniedRuntime.context['ga-disable-G-8BGTQK1QD9'], true);
assert.equal(deniedRuntime.cookieWrites.some((value) => value.startsWith('_ga=')), true);

const oldDeniedRuntime = runConsentRuntime(consentSource, {
  timeZone: 'America/New_York',
  choice: 'denied',
  choiceAgeMs: 400 * 24 * 60 * 60 * 1000,
});
assert.equal(oldDeniedRuntime.appendedScripts.length, 0);
assert.equal(oldDeniedRuntime.context.__bskGALoaded, false);

const oldDeniedPriorConsentRuntime = runConsentRuntime(consentSource, {
  timeZone: 'Europe/Paris',
  choice: 'denied',
  choiceAgeMs: 400 * 24 * 60 * 60 * 1000,
});
assert.equal(oldDeniedPriorConsentRuntime.appendedScripts.length, 0);
assert.equal(oldDeniedPriorConsentRuntime.context.__bskGALoaded, false);
assert.notEqual(oldDeniedPriorConsentRuntime.context.__bskConsentPending, true);

const gpcRuntime = runConsentRuntime(consentSource, {
  timeZone: 'America/New_York',
  choice: 'granted',
  gpc: true,
});
assert.equal(gpcRuntime.appendedScripts.length, 0);
assert.equal(gpcRuntime.context.__bskGALoaded, false);
assert.equal(gpcRuntime.context['ga-disable-G-8BGTQK1QD9'], true);

const crossTabRuntime = runConsentRuntime(consentSource, { timeZone: 'America/New_York' });
assert.equal(crossTabRuntime.context.__bskGALoaded, true);
crossTabRuntime.fireEvent('storage', {
  key: 'biosked-consent',
  newValue: JSON.stringify({ v: 'denied', t: Date.now() }),
});
assert.equal(crossTabRuntime.context.__bskGALoaded, false);
assert.equal(crossTabRuntime.context['ga-disable-G-8BGTQK1QD9'], true);
assert.ok(crossTabRuntime.dispatchedEvents.includes('bsk:consent-synced'));
crossTabRuntime.fireEvent('storage', {
  key: 'biosked-consent',
  newValue: JSON.stringify({ v: 'granted', t: Date.now() }),
});
assert.equal(crossTabRuntime.context.__bskGALoaded, true);
assert.equal(crossTabRuntime.context['ga-disable-G-8BGTQK1QD9'], false);

const priorCrossTabRuntime = runConsentRuntime(consentSource, { timeZone: 'Europe/Paris' });
priorCrossTabRuntime.fireEvent('storage', {
  key: 'biosked-consent',
  newValue: JSON.stringify({ v: 'granted', t: Date.now() }),
});
assert.equal(priorCrossTabRuntime.context.__bskGALoaded, true);
assert.equal(priorCrossTabRuntime.context.__bskConsentPending, false);

gpcRuntime.fireEvent('storage', {
  key: 'biosked-consent',
  newValue: JSON.stringify({ v: 'granted', t: Date.now() }),
});
assert.equal(gpcRuntime.context.__bskGALoaded, false);
assert.equal(gpcRuntime.context['ga-disable-G-8BGTQK1QD9'], true);

const grantedRuntime = runConsentRuntime(consentSource, {
  timeZone: 'Europe/Paris',
  choice: 'granted',
});
assert.equal(grantedRuntime.appendedScripts.length, 1);
assert.equal(grantedRuntime.context.__bskGALoaded, true);

const expiredGrantedRuntime = runConsentRuntime(consentSource, {
  timeZone: 'Europe/Paris',
  choice: 'granted',
  choiceAgeMs: 200 * 24 * 60 * 60 * 1000,
});
assert.equal(expiredGrantedRuntime.appendedScripts.length, 0);
assert.equal(expiredGrantedRuntime.context.__bskConsentPending, true);

const sanitizedLocationRuntime = runConsentRuntime(consentSource, {
  timeZone: 'America/New_York',
  pageUrl: 'https://biosked.com/?email=person@example.com&token=secret&utm_source=qa&utm_medium=qa%09secret&utm_campaign=launch',
  referrer: 'https://biosked.com/previous/?email=person@example.com&token=secret',
});
const sanitizedConfig = Array.from(sanitizedLocationRuntime.context.dataLayer, (args) => Array.from(args))
  .find(([name]) => name === 'config');
assert.equal(sanitizedConfig[2].page_location, 'https://biosked.com/?utm_source=qa&utm_campaign=launch');
assert.equal(sanitizedConfig[2].page_referrer, 'https://biosked.com/previous/');

const piiLikeAttributionRuntime = runConsentRuntime(consentSource, {
  timeZone: 'America/New_York',
  pageUrl: 'https://biosked.com/?utm_source=qa&utm_campaign=Jane_Doe&utm_term=555-123-4567&utm_content=release_slug',
});
const piiLikeAttributionConfig = Array.from(piiLikeAttributionRuntime.context.dataLayer, (args) => Array.from(args))
  .find(([name]) => name === 'config');
assert.equal(
  piiLikeAttributionConfig[2].page_location,
  'https://biosked.com/?utm_source=qa&utm_content=release_slug',
);

const previewRuntime = runConsentRuntime(consentSource, {
  timeZone: 'America/New_York',
  hostname: 'localhost',
});
assert.equal(previewRuntime.appendedScripts.length, 0);
assert.notEqual(previewRuntime.context.__bskGALoaded, true);

for (const hostname of ['kb.biosked.com', 'kb.biosked.fr']) {
  const kbHostRuntime = runConsentRuntime(consentSource, {
    timeZone: 'America/New_York',
    hostname,
  });
  assert.equal(kbHostRuntime.appendedScripts.length, 1, `${hostname} must be an analytics host`);
  assert.equal(kbHostRuntime.context.__bskGALoaded, true);
}

const optOutRuntime = runConsentRuntime(consentSource, { timeZone: 'America/New_York' });
const scriptsBeforeOptOut = optOutRuntime.appendedScripts.length;
optOutRuntime.context.__bskDisableGA();
assert.equal(optOutRuntime.context.__bskGALoaded, false);
assert.equal(optOutRuntime.context['ga-disable-G-8BGTQK1QD9'], true);
assert.equal(optOutRuntime.cookieWrites.some((value) => value.startsWith('_ga=')), true);
assert.equal(optOutRuntime.cookieWrites.some((value) => value.includes('domain=.biosked.fr')), true);
optOutRuntime.context.__bskLoadGA();
assert.equal(optOutRuntime.context.__bskGALoaded, true);
assert.equal(optOutRuntime.context['ga-disable-G-8BGTQK1QD9'], false);
assert.equal(optOutRuntime.appendedScripts.length, scriptsBeforeOptOut);
const configCommands = Array.from(optOutRuntime.context.dataLayer, (args) => Array.from(args))
  .filter(([name]) => name === 'config');
assert.equal(configCommands.length, 1);
assert.equal(configCommands[0][2].allow_google_signals, false);
assert.equal(configCommands[0][2].allow_ad_personalization_signals, false);
assert.equal(configCommands[0][2].cookie_expires, 34128000);
assert.equal(configCommands[0][2].cookie_update, false);

const kbArticlePage = read('src/pages/kb-preview/[lang]/knowledge/[...slug].astro');
assert.match(kbArticlePage, /window\.__bskGALoaded\s*===\s*true[\s\S]{0,120}window\.gtag\('event',\s*'kb_article_feedback'/);

const consentBanner = read('src/components/ConsentBanner.astro');
assert.doesNotMatch(consentBanner, /\bGoogle\b/i);
assert.match(consentBanner, /audience-measurement cookies/);
assert.match(consentBanner, /bsk:open-privacy-choices/);
assert.match(consentBanner, /bsk:consent-synced/);
assert.match(consentBanner, /id="bsk-privacy-choices-mobile"/);
assert.match(consentBanner, /fixedChoicesOnDesktop/);
assert.match(consentBanner, /['"]md:hidden['"]:\s*!fixedChoicesOnDesktop/);
assert.match(consentBanner, /bsk-privacy-choices-mobile[\s\S]*md:hidden/);
assert.match(consentBanner, /mobileChoices\.addEventListener\(['"]click['"], show\)/);

const footer = read('src/components/layout/Footer.astro');
assert.match(footer, /bsk:open-privacy-choices/);
assert.match(footer, /privacyChoicesLabel/);
assert.doesNotMatch(footer, /\{hideFooter\s*&&\s*\(/);

const privacyPage = read('src/pages/privacy.astro');
assert.match(privacyPage, /Google Analytics 4/);
assert.match(privacyPage, /Global Privacy Control/);
assert.match(privacyPage, /six months/);
assert.match(privacyPage, /location\.hash\s*===\s*['"]#cookies-fr['"]/);
assert.match(privacyPage, /location\.hash\s*===\s*['"]#cookies-en['"]\s*\?\s*['"]cookies['"]/);
assert.doesNotMatch(privacyPage, /European time zones other than Switzerland/);
assert.match(privacyPage, /scrollIntoView/);

const baseLayout = read('src/layouts/BaseLayout.astro');
assert.match(baseLayout, /import AnalyticsEvents from ['"]@\/components\/AnalyticsEvents\.astro['"]/);
assert.match(baseLayout, /<AnalyticsEvents\s*\/>/);
assert.match(baseLayout, /data-page-type=\{pageType\}/);
assert.match(baseLayout, /<BaseHead[^>]*pageType=\{pageType\}/s);

const analyticsEvents = read('src/components/AnalyticsEvents.astro');
assert.match(analyticsEvents, /classifyCtaPath/);
assert.match(analyticsEvents, /leadEventForForm/);
assert.match(analyticsEvents, /hs-form-event:on-submission:success/);
assert.match(analyticsEvents, /CustomEvent<\{ formId\?: string \}>/);
assert.match(analyticsEvents, /detail\?\.formId/);
assert.match(analyticsEvents, /bskTrackLead/);
assert.match(analyticsEvents, /__bskGALoaded/);
assert.match(analyticsEvents, /site_language/);
assert.match(analyticsEvents, /event_callback/);
assert.match(analyticsEvents, /event_timeout/);
assert.match(analyticsEvents, /\{ capture: true \}/);
assert.match(analyticsEvents, /hasAttribute\(['"]data-locale-choice['"]\)/);
assert.match(analyticsEvents, /document\.body\.dataset\.pageType\s*===\s*['"]not-found['"]/);
assert.match(analyticsEvents, /track\(['"]page_not_found['"]/);
assert.match(analyticsEvents, /addEventListener\(['"]bsk:analytics-ready['"]/);
assert.match(analyticsEvents, /page_location:\s*['"]https:\/\/biosked\.com\/__404__['"]/);
assert.match(analyticsEvents, /page_referrer:\s*['"]['"]/);

const notFoundPage = read('src/pages/404.astro');
assert.match(notFoundPage, /pageType=['"]not-found['"]/);

const astroConfig = read('astro.config.mjs');
assert.match(astroConfig, /['"]contact['"]:\s*\{\s*destination:\s*['"]\/demo['"]/);
assert.match(astroConfig, /['"]demander-une-demonstration['"]:\s*\{\s*destination:\s*['"]\/fr\/demo['"]/);

const generatedRedirects = read('public/_redirects');
assert.match(generatedRedirects, /^\/contact\/ \/demo\/ 301$/m);
assert.match(generatedRedirects, /^\/demander-une-demonstration\/ \/fr\/demo\/ 301$/m);

const packageJson = JSON.parse(read('package.json'));
assert.equal(
  packageJson.scripts.postbuild,
  'node scripts/generate-static-redirect-pages.mjs && node scripts/prune-kb-preview-fallbacks.mjs && npm run test:seo && npm run test:kb:dist && node scripts/test-style.mjs dist',
);

const staticRedirectGenerator = read('scripts/generate-static-redirect-pages.mjs');
assert.match(staticRedirectGenerator, /location\.search/);
assert.match(staticRedirectGenerator, /location\.hash/);
assert.match(staticRedirectGenerator, /location\.replace/);

const whitepaperPage = read('src/pages/fr/ressources.astro');
for (const label of [
  'Prénom',
  'Nom',
  'E-mail professionnel',
  'Établissement ou organisation',
  'Nombre de personnes à planifier',
  'Informations complémentaires',
  'Recevoir les livres blancs',
]) {
  assert.match(whitepaperPage, new RegExp(label));
}
assert.doesNotMatch(
  whitepaperPage,
  /First name|Last Name|Work Email|Company name|Number of staff to schedule|Any additional request|Request quote/,
);
assert.match(whitepaperPage, /api-eu1\.hsforms\.com\/submissions\/v3\/integration\/submit/);
assert.match(whitepaperPage, /buildHubSpotSubmission/);
assert.match(whitepaperPage, /try \{ analyticsWindow\.bskTrackLead\?\.\(HUBSPOT_FORM_ID\); \} catch \{\}/);
assert.match(whitepaperPage, /<form[\s\S]*method="post"[\s\S]*api-eu1\.hsforms\.com/);
assert.match(whitepaperPage, /<fieldset id="whitepaper-fields"[^>]*disabled>/);
assert.match(whitepaperPage, /id="whitepaper-js-required"/);
assert.match(whitepaperPage, /jsRequiredMessage\?\.classList\.add\('hidden'\)/);
assert.match(whitepaperPage, /validateTrimmedRequiredFields/);
assert.match(whitepaperPage, /submissionInFlight/);
assert.match(whitepaperPage, /new AbortController\(\)/);
assert.match(whitepaperPage, /id="whitepaper-success"/);
assert.doesNotMatch(whitepaperPage, /bskHsForm|hbspt\.forms\.create/);
const whitepaperFetchIndex = whitepaperPage.indexOf('response = await fetch');
const whitepaperAcceptedIndex = whitepaperPage.indexOf('if (!response.ok)');
const whitepaperTrackIndex = whitepaperPage.indexOf('analyticsWindow.bskTrackLead?.(HUBSPOT_FORM_ID)');
assert.ok(whitepaperFetchIndex >= 0);
assert.ok(whitepaperAcceptedIndex > whitepaperFetchIndex);
assert.ok(whitepaperTrackIndex > whitepaperAcceptedIndex);

const englishQuotePage = read('src/pages/getquote.astro');
assert.match(englishQuotePage, /class="hs-form-frame"/);
assert.match(englishQuotePage, /data-form-id="152f6973-10dd-42d4-af28-2df2f8f830e9"/);
assert.match(englishQuotePage, /forms\/embed\/25195055\.js/);
assert.doesNotMatch(englishQuotePage, /bskHsForm/);

for (const [path, successPath] of [
  ['src/pages/fr/getquote.astro', '/fr/demo/merci/'],
  ['src/pages/fr-ch/getquote.astro', '/fr-ch/demo/merci/'],
]) {
  const quotePage = read(path);
  assert.match(quotePage, /class="[^"]*\bhs-form-frame\b[^"]*"/);
  assert.match(quotePage, /data-form-id="152f6973-10dd-42d4-af28-2df2f8f830e9"/);
  assert.match(quotePage, /forms\/embed\/25195055\.js/);
  assert.match(quotePage, new RegExp(`data-success-redirect="${successPath}"`));
  assert.doesNotMatch(quotePage, /bskHsForm|onFormSubmit(?:ted)?/);
}

const intlQuotePage = read('src/components/sections/intl/GetQuotePage.astro');
assert.match(intlQuotePage, /class="[^"]*\bhs-form-frame\b[^"]*"/);
assert.match(intlQuotePage, /152f6973-10dd-42d4-af28-2df2f8f830e9/);
assert.match(intlQuotePage, /data-form-id=\{formId\}/);
assert.match(intlQuotePage, /forms\/embed\/25195055\.js/);
assert.match(intlQuotePage, /data-success-redirect=\{thankYouPath\}/);
assert.doesNotMatch(intlQuotePage, /bskHsForm|onFormSubmit(?:ted)?/);

assert.match(analyticsEvents, /\.hs-form-frame\[data-form-id\]/);
assert.match(analyticsEvents, /candidate\.dataset\.formId\s*===\s*detail\.formId/);
assert.match(analyticsEvents, /frame\.dataset\.successRedirect/);
assert.match(analyticsEvents, /redirectDestination\.origin\s*===\s*location\.origin/);
assert.match(analyticsEvents, /location\.assign\(successRedirect\)/);

const kbSupportForm = read('src/components/kb/KbSupportForm.astro');
assert.match(kbSupportForm, /onFormSubmitted/);
assert.doesNotMatch(kbSupportForm, /onFormSubmit:/);
assert.match(kbSupportForm, /bskTrackLead\(form\.formId\)/);

for (const path of [
  'src/pages/demo.astro',
  'src/pages/fr/demo.astro',
  'src/pages/fr-ch/demo.astro',
  'src/components/sections/intl/DemoPage.astro',
  'src/pages/fr/ressources.astro',
]) {
  const formPage = read(path);
  assert.match(formPage, /(?:window|analyticsWindow)\.bskTrackLead/);
  assert.doesNotMatch(formPage, /forms\/embed\/v2\.js/);
  assert.doesNotMatch(formPage, /onFormSubmit\s*:/);
}

for (const path of [
  'src/pages/fr/demo.astro',
  'src/pages/fr-ch/demo.astro',
  'src/components/sections/intl/DemoPage.astro',
]) {
  assert.match(read(path), /bskTrackLead\([^;]+,\s*redirect\)/);
}

console.log('analytics unit and wiring tests passed');

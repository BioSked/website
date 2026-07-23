import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  classifyCtaPath,
  createDedupedEventDispatcher,
  leadEventForForm,
  normalizeSiteLanguage,
} from '../src/lib/analytics.mjs';
import {
  buildHubSpotSubmission,
  getCookieValue,
} from '../src/lib/hubspotSubmission.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

assert.equal(normalizeSiteLanguage('en'), 'en');
assert.equal(normalizeSiteLanguage('fr-CH'), 'fr-ch');
assert.equal(normalizeSiteLanguage('de-DE'), 'de');
assert.equal(normalizeSiteLanguage('unknown'), 'en');

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
assert.match(baseHead, /if \(gpc \|\| choice === 'denied'\) return;/);
assert.match(baseHead, /if \(choice === 'granted'\) \{ window\.__bskLoadGA\(\); return; \}/);
assert.doesNotMatch(baseHead, /if \(choice === 'granted'\)[\s\S]{0,120}choice === 'denied' \|\| gpc/);
assert.match(baseHead, /define:vars=\{\{ pageLocale, analyticsPageLocation \}\}/);
assert.match(baseHead, /site_language:\s*pageLocale/);
assert.match(baseHead, /content_group:\s*pageLocale/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]biosked\.com['"]/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]www\.biosked\.com['"]/);
assert.match(baseHead, /dispatchEvent\(new Event\(['"]bsk:analytics-ready['"]\)\)/);
assert.match(baseHead, /pageType\s*===\s*['"]not-found['"]/);
assert.match(baseHead, /page_location:\s*analyticsPageLocation/);
assert.match(baseHead, /page_referrer:\s*['"]['"]/);
assert.match(baseHead, /pageType\s*===\s*['"]not-found['"][^\n]*<meta name=['"]referrer['"] content=['"]no-referrer['"]/);

const baseLayout = read('src/layouts/BaseLayout.astro');
assert.match(baseLayout, /import AnalyticsEvents from ['"]@\/components\/AnalyticsEvents\.astro['"]/);
assert.match(baseLayout, /<AnalyticsEvents\s*\/>/);
assert.match(baseLayout, /data-page-type=\{pageType\}/);
assert.match(baseLayout, /<BaseHead[^>]*pageType=\{pageType\}/s);

const analyticsEvents = read('src/components/AnalyticsEvents.astro');
assert.match(analyticsEvents, /classifyCtaPath/);
assert.match(analyticsEvents, /leadEventForForm/);
assert.match(analyticsEvents, /hs-form-event:on-submission:success/);
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
  'node scripts/generate-static-redirect-pages.mjs && npm run test:seo',
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

for (const path of [
  'src/pages/demo.astro',
  'src/pages/fr/demo.astro',
  'src/pages/fr-ch/demo.astro',
  'src/components/sections/intl/DemoPage.astro',
  'src/pages/fr/getquote.astro',
  'src/pages/fr-ch/getquote.astro',
  'src/components/sections/intl/GetQuotePage.astro',
  'src/pages/fr/ressources.astro',
]) {
  const formPage = read(path);
  assert.match(formPage, /(?:window|analyticsWindow)\.bskTrackLead/);
  assert.doesNotMatch(formPage, /forms\/embed\/v2\.js/);
}

for (const path of [
  'src/pages/fr/demo.astro',
  'src/pages/fr-ch/demo.astro',
  'src/components/sections/intl/DemoPage.astro',
  'src/pages/fr/getquote.astro',
  'src/pages/fr-ch/getquote.astro',
  'src/components/sections/intl/GetQuotePage.astro',
]) {
  assert.match(read(path), /bskTrackLead\([^;]+,\s*redirect\)/);
}

console.log('analytics unit and wiring tests passed');

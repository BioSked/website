import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  classifyCtaPath,
  leadEventForForm,
  normalizeSiteLanguage,
} from '../src/lib/analytics.mjs';

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

const baseHead = read('src/components/BaseHead.astro');
assert.match(baseHead, /if \(gpc \|\| choice === 'denied'\) return;/);
assert.match(baseHead, /if \(choice === 'granted'\) \{ window\.__bskLoadGA\(\); return; \}/);
assert.doesNotMatch(baseHead, /if \(choice === 'granted'\)[\s\S]{0,120}choice === 'denied' \|\| gpc/);
assert.match(baseHead, /define:vars=\{\{ pageLocale \}\}/);
assert.match(baseHead, /site_language:\s*pageLocale/);
assert.match(baseHead, /content_group:\s*pageLocale/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]biosked\.com['"]/);
assert.match(baseHead, /location\.hostname\s*===\s*['"]www\.biosked\.com['"]/);

const baseLayout = read('src/layouts/BaseLayout.astro');
assert.match(baseLayout, /import AnalyticsEvents from ['"]@\/components\/AnalyticsEvents\.astro['"]/);
assert.match(baseLayout, /<AnalyticsEvents\s*\/>/);

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
  assert.match(formPage, /window\.bskTrackLead/);
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

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { FR_CH_LOCAL, frChLocalPathFor } from '../src/i18n/frChPaths.mjs';

const cases = [
  ['/fr/', '/fr-ch/'],
  ['/fr', '/fr-ch'],
  ['/fr?source=nav#top', '/fr-ch?source=nav#top'],
  ['/fr/pricing/', '/fr-ch/pricing/'],
  ['/fr/demo?source=nav#form', '/fr-ch/demo?source=nav#form'],
  ['/fr/securite-donnees/', '/fr-ch/securite-donnees/'],
  ['/fr/mentions-legales/', '/fr-ch/mentions-legales/'],
  ['/fr/cas-clients/', '/fr/cas-clients/'],
  ['/fr/blog/', '/fr/blog/'],
  ['/fr-ch/pricing/', '/fr-ch/pricing/'],
  ['/france/pricing/', '/france/pricing/'],
  ['/pricing/', '/pricing/'],
];

for (const [input, expected] of cases) {
  assert.equal(frChLocalPathFor(input), expected, `${input} should map to ${expected}`);
}

assert.deepEqual(FR_CH_LOCAL, [
  '/',
  '/pricing',
  '/demo',
  '/getquote',
  '/securite-donnees',
  '/mentions-legales',
]);

const [navSource, footerSource, prefsSource, navbarActionsSource, pricingCardsSource, localesSource, pricingPlansSource, deChMarketSource, baseHeadSource] = await Promise.all([
  readFile(new URL('../src/i18n/navLinks.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/i18n/footerLinks.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/LocalePrefs.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/layout/NavbarActions.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/sections/PricingCards.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/i18n/locales.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/i18n/pricingPlans.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/i18n/market/de-ch.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/BaseHead.astro', import.meta.url), 'utf8'),
]);

assert.match(navSource, /href:\s*frChLocalPathFor\(link\.href\)/, 'FR-CH navbar must use the shared mapper');
assert.match(footerSource, /href:\s*frChLocalPathFor\(l\.href\)/, 'FR-CH footer must use the shared mapper');
assert.match(prefsSource, /current === 'fr-ch'/, 'FR-CH pages must repair reused French conversion links');
assert.match(prefsSource, /!stored && sessionStorage/, 'an explicit FR choice must override Swiss session stickiness');
assert.match(prefsSource, /:not\(\[data-locale-choice\]\)/, 'locale repair must not rewrite the language selector itself');
assert.match(prefsSource, /a\[href\^="\/fr"\]/, 'locale repair must include French root links with a query or fragment');

assert.match(navbarActionsSource, /aria-expanded=\{isMenuOpen\}/, 'mobile menu button must expose its open state');
assert.match(navbarActionsSource, /aria-modal="true"/, 'open mobile navigation must be exposed as a modal');
assert.match(
  navbarActionsSource,
  /data-mobile-menu-scroll[\s\S]*mt-16[\s\S]*h-\[calc\(100dvh-4rem\)\][\s\S]*overflow-y-auto[\s\S]*overscroll-contain/,
  'mobile menu must own the dynamic viewport below the fixed header',
);
assert.match(
  navbarActionsSource,
  /document\.documentElement\.style\.overflow\s*=\s*'hidden'/,
  'mobile menu must lock document scrolling',
);
assert.match(
  navbarActionsSource,
  /document\.body\.style\.overflow\s*=\s*'hidden'/,
  'mobile menu must lock body scrolling',
);

assert.match(
  pricingCardsSource,
  /lg:row-span-4\s+lg:grid\s+lg:grid-rows-\[subgrid\]/,
  'pricing cards must share title, description, CTA, and feature rows through CSS subgrid',
);
assert.match(
  pricingCardsSource,
  /data-pricing-card-header[\s\S]*lg:row-span-3\s+lg:grid-rows-\[subgrid\]/,
  'pricing card headers must share title, description, and CTA rows across cards',
);
assert.match(pricingCardsSource, /asChild[\s\S]*href=\{t\.quoteHref\}/, 'pricing CTAs must render as accessible links, not nested button links');
assert.match(localesSource, /LOCALE_CODES[^;]*'de-ch'/, 'Deutsch (Schweiz) must be a selectable locale');
assert.match(baseHeadSource, /alt\.code === 'de-ch' \? 'de-CH'/, 'Deutsch (Schweiz) must publish de-CH hreflang');
assert.match(baseHeadSource, /'de-ch':\s*'de_CH'/, 'Deutsch (Schweiz) must publish de_CH Open Graph locale');
assert.match(pricingPlansSource, /DE_CH_PRICING_PLANS/, 'Deutsch (Schweiz) must define localized pricing plans');
assert.match(deChMarketSource, /CHF\s*5\.99/, 'Deutsch (Schweiz) pricing must be denominated in CHF');

console.log('locale navigation tests passed');

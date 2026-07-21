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

const [navSource, footerSource, prefsSource] = await Promise.all([
  readFile(new URL('../src/i18n/navLinks.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/i18n/footerLinks.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/LocalePrefs.astro', import.meta.url), 'utf8'),
]);

assert.match(navSource, /href:\s*frChLocalPathFor\(link\.href\)/, 'FR-CH navbar must use the shared mapper');
assert.match(footerSource, /href:\s*frChLocalPathFor\(l\.href\)/, 'FR-CH footer must use the shared mapper');
assert.match(prefsSource, /current === 'fr-ch'/, 'FR-CH pages must repair reused French conversion links');
assert.match(prefsSource, /!stored && sessionStorage/, 'an explicit FR choice must override Swiss session stickiness');
assert.match(prefsSource, /:not\(\[data-locale-choice\]\)/, 'locale repair must not rewrite the language selector itself');
assert.match(prefsSource, /a\[href\^="\/fr"\]/, 'locale repair must include French root links with a query or fragment');

console.log('locale navigation tests passed');

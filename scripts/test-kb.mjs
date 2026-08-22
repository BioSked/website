import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshotPath = path.join(projectRoot, 'src/data/generated/hubspot-kb.json');
const raw = await readFile(snapshotPath, 'utf8');
const snapshot = JSON.parse(raw);

assert.equal(snapshot.schemaVersion, 1, 'KB snapshot schema version must be 1');
// Only hosts that are never redirected may feed the sync (see docs/KB_RUNBOOK.md).
assert.ok(['content.biosked.com', 'kb.biosked.fr'].includes(snapshot.sourceHost), `KB snapshot must come from a non-redirected HubSpot host, got ${snapshot.sourceHost}`);
assert.match(snapshot.contentHash, /^[a-f0-9]{64}$/, 'KB snapshot must carry a SHA-256 content hash');
assert.ok(snapshot.generatedAt, 'KB snapshot must record its generation timestamp');
assert.ok(Array.isArray(snapshot.articles), 'KB snapshot must contain an article array');
assert.ok(snapshot.articles.length >= 150, `expected at least 150 published KB articles, got ${snapshot.articles.length}`);

const allowedLocales = new Set(['en', 'fr']);
const paths = new Set();
const sourceUrls = new Set();
const localeCounts = new Map();

for (const article of snapshot.articles) {
  assert.ok(allowedLocales.has(article.locale), `unsupported locale: ${article.locale}`);
  localeCounts.set(article.locale, (localeCounts.get(article.locale) ?? 0) + 1);
  assert.ok(article.title?.trim(), `missing title for ${article.sourceUrl}`);
  assert.ok(article.description?.trim(), `missing description for ${article.sourceUrl}`);
  assert.doesNotMatch(article.description, /&(?:amp|gt|lt|quot|apos|#\d+|#x[0-9a-f]+);/i, `encoded HTML entity in description for ${article.sourceUrl}`);
  assert.ok(article.bodyHtml?.trim(), `missing body for ${article.sourceUrl}`);
  assert.ok(article.sourcePath.startsWith(`/${article.locale}/knowledge/`), `bad source path: ${article.sourcePath}`);
  const expectedSitePath = article.locale === 'en'
    ? article.sourcePath.replace('/en/knowledge', '/help')
    : article.sourcePath.replace(`/${article.locale}/knowledge`, `/${article.locale}/help`);
  assert.equal(article.sitePath, expectedSitePath, `bad site path for ${article.sourcePath}`);
  assert.ok(Array.isArray(article.breadcrumbs) && article.breadcrumbs.length >= 1, `missing hierarchy for ${article.sourcePath}`);
  assert.ok(!paths.has(article.sourcePath), `duplicate source path: ${article.sourcePath}`);
  assert.ok(!sourceUrls.has(article.sourceUrl), `duplicate source URL: ${article.sourceUrl}`);
  paths.add(article.sourcePath);
  sourceUrls.add(article.sourceUrl);

  assert.doesNotMatch(
    article.bodyHtml,
    /<\/?(?:script|style|form|input|button|select|textarea|object|embed|base|meta|link)\b/i,
    `unsafe element in ${article.sourceUrl}`,
  );
  assert.doesNotMatch(article.bodyHtml, /\son[a-z]+\s*=/i, `inline event handler in ${article.sourceUrl}`);
  assert.doesNotMatch(article.bodyHtml, /\sstyle\s*=/i, `inline style in ${article.sourceUrl}`);
  assert.doesNotMatch(article.bodyHtml, /(?:href|src)\s*=\s*["']?\s*javascript:/i, `javascript URL in ${article.sourceUrl}`);
  for (const match of article.bodyHtml.matchAll(/<iframe\b[^>]*\bsrc="([^"]+)"/gi)) {
    const iframeUrl = new URL(match[1]);
    assert.equal(iframeUrl.protocol, 'https:', `non-HTTPS iframe in ${article.sourceUrl}`);
    assert.equal(iframeUrl.hostname, 'www.guidejar.com', `untrusted iframe host in ${article.sourceUrl}`);
    assert.ok(iframeUrl.pathname.startsWith('/embed/'), `untrusted iframe path in ${article.sourceUrl}`);
  }
  assert.doesNotMatch(
    article.bodyHtml,
    /https:\/\/(?:kb\.biosked\.com|kb\.biosked\.fr|content\.biosked\.com)\/(?:en|fr)\/knowledge\//i,
    `unrewritten internal link in ${article.sourcePath}`,
  );
  // The sync host is never meant to be visible: images stay on the public asset host.
  assert.doesNotMatch(article.bodyHtml, /content\.biosked\.com/i, `sync host leaked into ${article.sourcePath}`);
  assert.doesNotMatch(JSON.stringify(article), /\u2014/, `forbidden em dash in ${article.sourcePath}`);
}

for (const locale of allowedLocales) {
  assert.ok((localeCounts.get(locale) ?? 0) >= 70, `expected at least 70 ${locale} articles`);
}

assert.ok(Array.isArray(snapshot.categories) && snapshot.categories.length >= 6, 'KB snapshot must contain category hierarchy');
for (const category of snapshot.categories) {
  assert.ok(allowedLocales.has(category.locale), `unsupported category locale: ${category.locale}`);
  assert.ok(category.title?.trim(), 'category title is required');
  assert.ok(category.path?.startsWith(`/${category.locale}/knowledge/`), `bad category path: ${category.path}`);
  assert.ok(Array.isArray(category.articlePaths) && category.articlePaths.length > 0, `empty category: ${category.path}`);
  assert.ok(category.sitePath?.includes('/help/'), `bad category site path: ${category.sitePath}`);
}

assert.deepEqual(
  snapshot.forms,
  {
    en: { portalId: '25195055', formId: 'd6e6cae7-b838-40b9-b84b-bbfb1a46ec1e', region: 'eu1' },
    fr: { portalId: '25195055', formId: '894f4e34-0e56-402f-9092-b09cc9876473', region: 'eu1' },
  },
  'support forms must remain bound to the existing HubSpot forms',
);

const requiredFrontendFiles = [
  'src/lib/kb.ts',
  'src/components/BaseHead.astro',
  'src/layouts/BaseLayout.astro',
  'src/components/kb/KbArticleCard.astro',
  'src/components/kb/KbHero.astro',
  'src/components/kb/KbSearch.astro',
  'src/components/kb/KbSupportForm.astro',
  'src/components/kb/pages/KbHomePage.astro',
  'src/components/kb/pages/KbEntryPage.astro',
  'src/components/kb/pages/KbSupportPage.astro',
  'src/pages/help/index.astro',
  'src/pages/help/[...slug].astro',
  'src/pages/help/kb-tickets/new.astro',
  'src/pages/help/search-index-[locale].json.ts',
  'src/pages/[lang]/help/index.astro',
  'src/pages/[lang]/help/[...slug].astro',
  'src/pages/[lang]/help/kb-tickets/new.astro',
];
const frontendSources = new Map();
for (const file of requiredFrontendFiles) {
  const source = await readFile(path.join(projectRoot, file), 'utf8');
  frontendSources.set(file, source);
  assert.equal(source.includes('\u2014'), false, `${file}: forbidden punctuation`);
  assert.equal(source.includes('text-[#168b91]'), false, `${file}: inaccessible teal text color`);
  assert.equal(source.includes('text-[#178b91]'), false, `${file}: inaccessible teal text color`);
}

const searchSource = frontendSources.get('src/components/kb/KbSearch.astro');
assert.match(searchSource, /role="combobox"/, 'KB search must expose combobox semantics');
assert.match(searchSource, /aria-controls=\{resultsId\}/, 'KB search must associate the input with its results');
assert.match(
  searchSource,
  /CSS\.supports\(['"]selector\(:popover-open\)['"]\)/,
  'KB search must verify :popover-open selector support before calling Element.matches',
);
assert.match(
  searchSource,
  /document\.body\.append(?:Child)?\(results\)/,
  'KB search must portal its fixed-position fallback outside clipping ancestors',
);

assert.match(
  frontendSources.get('src/components/BaseHead.astro'),
  /localeRedirectEntries = localeRedirectsOverride/,
  'locale auto-redirects must be separable from canonical hreflang links',
);
assert.match(
  frontendSources.get('src/layouts/BaseLayout.astro'),
  /localeRedirects=\{localeRedirects\}/,
  'KB language links must stay inside the knowledge base during automatic locale selection',
);

const supportFormSource = frontendSources.get('src/components/kb/KbSupportForm.astro');
assert.match(supportFormSource, /select\[id\^="phone_ext"\]/, 'embedded phone prefix must receive an accessible name');
assert.match(supportFormSource, /background:#007b83!important/, 'embedded form submit button must use accessible contrast');
assert.match(supportFormSource, /data-bsk-kb-form/, 'embedded form styles must be injected into the HubSpot iframe');
assert.match(
  frontendSources.get('src/components/kb/KbArticleCard.astro'),
  /h-full min-w-0 flex-col/,
  'article cards must be allowed to shrink on narrow localized layouts',
);

console.log(`KB snapshot and frontend OK: ${snapshot.articles.length} articles, ${snapshot.categories.length} categories, hash ${snapshot.contentHash.slice(0, 12)}`);

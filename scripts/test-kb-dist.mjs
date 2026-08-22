import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const siteOrigin = 'https://biosked.com';
const snapshot = JSON.parse(await readFile(path.join(projectRoot, 'src/data/generated/hubspot-kb.json'), 'utf8'));
const translations = JSON.parse(await readFile(path.join(projectRoot, 'src/data/generated/kb-translations.json'), 'utf8'));

// English lives at the site root like every other English page, the rest is prefixed.
const kbPath = (locale, rest = '/') => (locale === 'en' ? `/help${rest}` : `/${locale}/help${rest}`);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const htmlPathFor = (sitePath) => {
  const decoded = decodeURIComponent(new URL(sitePath, siteOrigin).pathname);
  return path.join(distRoot, decoded.replace(/^\//, ''), 'index.html');
};
const readHtml = async (sitePath) => readFile(htmlPathFor(sitePath), 'utf8');
const exists = async (target) => {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
};
const assertLive = (html, label) => {
  assert.match(html, /<meta name="robots" content="index, follow">/, `${label}: knowledge base pages must be indexable`);
  assert.doesNotMatch(html, /kb\.biosked\.(?:com|fr)\/(?:en|fr)\/knowledge|content\.biosked\.com/, `${label}: must not link to the HubSpot-hosted knowledge base`);
};
const assertCanonical = (html, sitePath, label) => {
  assert.match(
    html,
    new RegExp(`<link rel="canonical" href="${escapeRegExp(siteOrigin + sitePath.replace(/\/$/, ''))}/?">`),
    `${label}: canonical must be the page itself`,
  );
};

const translatedLocales = (translations.languages ?? []).filter((locale) => Object.keys(translations.articles?.[locale] ?? {}).length > 0);
const activeLocales = ['en', 'fr', ...translatedLocales];

// The preview is gone for good, and the Swiss locales read de/fr instead of getting copies.
assert.equal(await exists(path.join(distRoot, 'kb-preview')), false, 'the /kb-preview tree must no longer be generated');
for (const locale of ['de', 'de-ch', 'nl', 'it', 'fr-ch']) {
  assert.equal(await exists(path.join(distRoot, locale, 'kb-preview')), false, `${locale}/kb-preview must not exist`);
}
for (const locale of ['de-ch', 'fr-ch']) {
  assert.equal(await exists(path.join(distRoot, locale, 'help')), false, `${locale}/help must not be generated (it reads the de/fr knowledge base)`);
}

for (const locale of activeLocales) {
  const homePath = kbPath(locale);
  const home = await readHtml(homePath);
  assertLive(home, homePath);
  assertCanonical(home, homePath, homePath);
  for (const other of activeLocales) {
    assert.ok(
      home.includes(`hreflang="${other}" href="${siteOrigin}${kbPath(other)}"`),
      `${homePath}: hreflang must list the ${other} knowledge base`,
    );
  }

  const supportPath = kbPath(locale, '/kb-tickets/new/');
  const support = await readHtml(supportPath);
  assertLive(support, supportPath);
  const form = snapshot.forms[locale] ?? snapshot.forms.en;
  assert.ok(support.includes(form.portalId), `${supportPath} is missing the HubSpot portal ID`);
  assert.ok(support.includes(form.formId), `${supportPath} is missing the HubSpot form ID`);
  assert.ok(support.includes(form.region), `${supportPath} is missing the HubSpot region`);
  assert.ok(support.includes('mailto:support@biosked.com'), `${supportPath} must offer the email fallback`);

  const index = JSON.parse(await readFile(path.join(distRoot, 'help', `search-index-${locale}.json`), 'utf8'));
  const expectedCount = locale === 'en' || locale === 'fr'
    ? snapshot.articles.filter((article) => article.locale === locale).length
    : Object.keys(translations.articles[locale]).length;
  assert.equal(index.length, expectedCount, `${locale} search index must contain every ${locale} article`);
  assert.equal(new Set(index.map((item) => item.path)).size, index.length, `${locale} search paths must be unique`);
  for (const item of index) {
    assert.ok(item.path.startsWith(kbPath(locale)), `${locale} search index must stay inside its locale: ${item.path}`);
  }
}

const sourceById = new Map(snapshot.articles.map((article) => [article.articleId, article]));
const expectedTargets = new Set([
  ...activeLocales.map((locale) => kbPath(locale).replace(/\/$/, '')),
  ...activeLocales.map((locale) => kbPath(locale, '/kb-tickets/new')),
  ...snapshot.articles.map((article) => article.sitePath),
  ...snapshot.categories.map((category) => category.sitePath),
]);

for (const article of snapshot.articles) {
  const html = await readHtml(article.sitePath);
  assertLive(html, article.sitePath);
  assertCanonical(html, article.sitePath, article.sitePath);
  assert.ok(html.includes(`data-article-id="${article.articleId}"`), `${article.sitePath}: article feedback ID missing`);
}

for (const locale of translatedLocales) {
  for (const [articleId] of Object.entries(translations.articles[locale])) {
    const source = sourceById.get(articleId);
    assert.ok(source, `${locale}: translated article ${articleId} has no source article`);
    const slug = source.sourcePath.split('/knowledge/')[1];
    const sitePath = kbPath(locale, `/${slug}`);
    expectedTargets.add(sitePath);
    const html = await readHtml(sitePath);
    assertLive(html, sitePath);
    assertCanonical(html, sitePath, sitePath);
  }
  // Translated categories reuse the slug of the source category (English or French).
  for (const category of snapshot.categories) {
    expectedTargets.add(kbPath(locale, `/${category.path.split('/knowledge/')[1]}`));
  }
}

for (const category of snapshot.categories) {
  const html = await readHtml(category.sitePath);
  assertLive(html, category.sitePath);
  assertCanonical(html, category.sitePath, category.sitePath);
}

for (const article of snapshot.articles) {
  for (const match of article.bodyHtml.matchAll(/href="(\/(?:[a-z]{2}\/)?help\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    const target = decodeURIComponent(match[1]).replace(/\/$/, '');
    assert.ok(expectedTargets.has(target), `${article.sourcePath}: internal link has no generated target: ${target}`);
  }
}

for (const file of ['sitemap-index.xml', 'sitemap-0.xml']) {
  const target = path.join(distRoot, file);
  if (!(await exists(target))) continue;
  const xml = await readFile(target, 'utf8');
  assert.equal(xml.includes('/kb-preview/'), false, `${file}: preview paths must never be published`);
  if (file === 'sitemap-0.xml') {
    for (const locale of activeLocales) {
      assert.ok(xml.includes(`<loc>${siteOrigin}${kbPath(locale)}</loc>`), `${file}: must list the ${locale} knowledge base home`);
    }
  }
}

console.log(
  `KB dist OK: ${snapshot.articles.length} source articles, ${translatedLocales.length} translated locales, ${snapshot.categories.length} categories, live HubSpot forms wired`,
);

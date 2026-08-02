import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const snapshot = JSON.parse(await readFile(path.join(projectRoot, 'src/data/generated/hubspot-kb.json'), 'utf8'));

const htmlPathFor = (previewPath) => {
  const decoded = decodeURIComponent(new URL(previewPath, 'https://biosked.com').pathname);
  return path.join(distRoot, decoded.replace(/^\//, ''), 'index.html');
};

const readHtml = async (previewPath) => readFile(htmlPathFor(previewPath), 'utf8');
const exists = async (target) => {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
};

for (const locale of ['de', 'de-ch', 'nl', 'it']) {
  assert.equal(
    await exists(path.join(distRoot, locale, 'kb-preview')),
    false,
    `synthetic ${locale}/kb-preview fallback tree must be pruned`,
  );
}

for (const locale of ['en', 'fr']) {
  const homePath = `/kb-preview/${locale}/knowledge`;
  const home = await readHtml(homePath);
  assert.match(home, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(home, new RegExp(`<link rel="canonical" href="https://kb\\.biosked\\.com/${locale}/knowledge">`));

  const supportPath = `/kb-preview/${locale}/knowledge/kb-tickets/new`;
  const support = await readHtml(supportPath);
  const form = snapshot.forms[locale];
  assert.ok(support.includes(form.portalId), `${locale} support page is missing portal ID`);
  assert.ok(support.includes(form.formId), `${locale} support page is missing form ID`);
  assert.ok(support.includes(form.region), `${locale} support page is missing HubSpot region`);
}

for (const article of snapshot.articles) {
  const html = await readHtml(article.previewPath);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/, `${article.previewPath}: preview must remain noindex`);
  assert.ok(
    html.includes(`<link rel="canonical" href="${article.sourceUrl}">`),
    `${article.previewPath}: canonical must point at its live HubSpot source`,
  );
  assert.ok(html.includes(`data-article-id="${article.articleId}"`), `${article.previewPath}: article feedback ID missing`);
}

for (const category of snapshot.categories) {
  const html = await readHtml(category.previewPath);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/, `${category.previewPath}: category must remain noindex`);
  assert.ok(
    html.includes(`<link rel="canonical" href="https://kb.biosked.com${category.path}">`),
    `${category.previewPath}: category canonical is wrong`,
  );
}

const searchIndex = JSON.parse(await readFile(path.join(distRoot, 'kb-preview/search-index.json'), 'utf8'));
assert.equal(searchIndex.length, snapshot.articles.length, 'search index must contain every article');
assert.equal(new Set(searchIndex.map((item) => item.path)).size, searchIndex.length, 'search paths must be unique');

const previewTargets = new Set([
  '/kb-preview',
  '/kb-preview/en/knowledge',
  '/kb-preview/fr/knowledge',
  '/kb-preview/en/knowledge/kb-tickets/new',
  '/kb-preview/fr/knowledge/kb-tickets/new',
  ...snapshot.articles.map((article) => article.previewPath.replace(/\/$/, '')),
  ...snapshot.categories.map((category) => category.previewPath.replace(/\/$/, '')),
]);

for (const article of snapshot.articles) {
  for (const match of article.bodyHtml.matchAll(/href="(\/kb-preview\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    const target = decodeURIComponent(match[1]).replace(/\/$/, '');
    assert.ok(previewTargets.has(target), `${article.sourcePath}: internal link has no generated target: ${target}`);
  }
}

const sitemapFiles = ['sitemap-index.xml', 'sitemap-0.xml'];
for (const file of sitemapFiles) {
  const target = path.join(distRoot, file);
  if (!(await exists(target))) continue;
  const xml = await readFile(target, 'utf8');
  assert.equal(xml.includes('/kb-preview/'), false, `${file}: preview pages must not be indexed`);
}

console.log(
  `KB dist OK: ${snapshot.articles.length} articles, ${snapshot.categories.length} categories, both live HubSpot forms wired`,
);

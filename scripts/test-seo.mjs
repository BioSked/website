import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const siteOrigin = 'https://biosked.com';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));
  return nested.flat();
}

function attributes(tag) {
  const parsed = {};
  for (const match of tag.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    const name = match[1].replace(/^</, '').toLowerCase();
    parsed[name] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return parsed;
}

function metaContent(html, attribute, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gsi)]
    .map((match) => attributes(match[0]))
    .find((attrs) => attrs[attribute] === value);
  return tag?.content;
}

function linkHref(html, rel) {
  const tag = [...html.matchAll(/<link\b[^>]*>/gsi)]
    .map((match) => attributes(match[0]))
    .find((attrs) => (attrs.rel ?? '').split(/\s+/).includes(rel));
  return tag?.href;
}

function titleText(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
}

function localOutputPath(urlString) {
  const url = new URL(urlString, siteOrigin);
  if (url.origin !== siteOrigin) return null;
  const pathname = decodeURIComponent(url.pathname);
  if (path.extname(pathname)) return path.join(distDir, pathname.slice(1));
  return path.join(distDir, pathname.slice(1), 'index.html');
}

function expectedOpenGraphLocale(canonicalUrl) {
  const pathname = new URL(canonicalUrl).pathname;
  if (pathname === '/fr-ch' || pathname.startsWith('/fr-ch/')) return 'fr_CH';
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr_FR';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de_DE';
  if (pathname === '/nl' || pathname.startsWith('/nl/')) return 'nl_NL';
  if (pathname === '/it' || pathname.startsWith('/it/')) return 'it_IT';
  return 'en_US';
}

async function assertLocalUrlExists(urlString, context) {
  const outputPath = localOutputPath(urlString);
  if (!outputPath) return;
  await assert.doesNotReject(
    access(outputPath),
    `${context} points to a missing build artifact: ${urlString}`,
  );
}

function collectStructuredAssets(value, key = '') {
  const assetKeys = new Set(['image', 'logo', 'screenshot', 'thumbnailUrl', 'contentUrl']);
  const direct = assetKeys.has(key)
    ? typeof value === 'string'
      ? [value]
      : value && typeof value === 'object' && typeof value.url === 'string'
        ? [value.url]
        : []
    : [];

  if (Array.isArray(value)) {
    return [...direct, ...value.flatMap((item) => collectStructuredAssets(item, key))];
  }
  if (value && typeof value === 'object') {
    return [
      ...direct,
      ...Object.entries(value).flatMap(([childKey, childValue]) =>
        collectStructuredAssets(childValue, childKey),
      ),
    ];
  }
  return direct;
}

await access(distDir);
const htmlFiles = (await walk(distDir)).filter((file) => file.endsWith('.html'));
let checkedPages = 0;
let checkedImages = 0;
let checkedStructuredAssets = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativePath = path.relative(distDir, file);
  const isRedirect = /<meta\b[^>]*http-equiv=["']refresh["']/i.test(html);
  if (isRedirect) continue;

  checkedPages += 1;
  assert.ok(titleText(html), `${relativePath} is missing a title`);
  assert.ok(metaContent(html, 'name', 'description'), `${relativePath} is missing a meta description`);
  const canonicalUrl = linkHref(html, 'canonical');
  assert.ok(canonicalUrl, `${relativePath} is missing a canonical URL`);

  const isNotFoundPage = relativePath === '404.html' || /(^|\/)404\/index\.html$/.test(relativePath);
  if (isNotFoundPage) {
    assert.match(
      metaContent(html, 'name', 'robots') ?? '',
      /(^|\s|,)noindex(,|\s|$)/,
      `${relativePath} must be noindex`,
    );
  }

  const openGraphUrl = metaContent(html, 'property', 'og:url');
  const openGraphLocale = metaContent(html, 'property', 'og:locale');
  assert.equal(openGraphUrl, canonicalUrl, `${relativePath} og:url must match its canonical URL`);
  assert.equal(
    openGraphLocale,
    expectedOpenGraphLocale(canonicalUrl),
    `${relativePath} og:locale must match its canonical locale`,
  );

  const twitterUrl = metaContent(html, 'name', 'twitter:url');
  assert.equal(twitterUrl, canonicalUrl, `${relativePath} twitter:url must match its canonical URL`);
  assert.equal(
    metaContent(html, 'name', 'twitter:card'),
    'summary_large_image',
    `${relativePath} must use a large-image X card`,
  );

  for (const match of html.matchAll(/<img\b[^>]*>/gsi)) {
    const attrs = attributes(match[0]);
    assert.ok(Object.hasOwn(attrs, 'alt'), `${relativePath} contains an image without an alt attribute: ${match[0].slice(0, 180)}`);
    checkedImages += 1;
  }

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gsi)) {
    let data;
    assert.doesNotThrow(() => {
      data = JSON.parse(match[1]);
    }, `${relativePath} contains invalid JSON-LD`);

    for (const assetUrl of collectStructuredAssets(data)) {
      await assertLocalUrlExists(assetUrl, `${relativePath} JSON-LD`);
      checkedStructuredAssets += 1;
    }
  }

  const openGraphImage = metaContent(html, 'property', 'og:image');
  assert.ok(openGraphImage, `${relativePath} is missing og:image`);
  await assertLocalUrlExists(openGraphImage, `${relativePath} og:image`);

  const twitterImage = metaContent(html, 'name', 'twitter:image');
  assert.ok(twitterImage, `${relativePath} is missing twitter:image`);
  await assertLocalUrlExists(twitterImage, `${relativePath} twitter:image`);
}

const homepageRoutes = ['', 'fr', 'fr-ch', 'de', 'nl', 'it'];
for (const route of homepageRoutes) {
  const label = route || 'en';
  const html = await readFile(path.join(distDir, route, 'index.html'), 'utf8');
  const pageTitle = titleText(html);
  const pageDescription = metaContent(html, 'name', 'description');
  assert.ok(pageTitle.length >= 30 && pageTitle.length <= 60, `${label} home title must be 30-60 characters; found ${pageTitle.length}`);
  assert.ok(pageDescription.length >= 120 && pageDescription.length <= 160, `${label} home description must be 120-160 characters; found ${pageDescription.length}`);
  assert.equal(linkHref(html, 'canonical'), `${siteOrigin}/${route ? `${route}/` : ''}`, `${label} home canonical URL is incorrect`);
}

const llmsPath = path.join(distDir, 'llms.txt');
const llmsText = await readFile(llmsPath, 'utf8');
assert.match(llmsText, /^# Momentum by BioSked\s*$/m, 'llms.txt must contain the site H1');
assert.match(llmsText, /^> \S.+$/m, 'llms.txt must contain a summary blockquote');
assert.match(llmsText, /^## Product and company\s*$/m, 'llms.txt must contain the primary links section');
const llmsLinkLines = llmsText.split('\n').filter((line) => /^-\s*\[/.test(line));
assert.ok(llmsLinkLines.length > 0, 'llms.txt must contain at least one Markdown link');
for (const line of llmsLinkLines) {
  const match = line.match(/^-\s*\[[^\]]+\]\(([^)]+)\)(?::.*)?$/);
  assert.ok(match, `llms.txt contains a malformed link: ${line}`);
  const url = new URL(match[1]);
  assert.equal(url.protocol, 'https:', `llms.txt link must use HTTPS: ${url}`);
  assert.equal(url.origin, siteOrigin, `llms.txt link must stay on ${siteOrigin}: ${url}`);
  assert.equal(url.search, '', `llms.txt link must not contain a query string: ${url}`);
  assert.equal(url.hash, '', `llms.txt link must not contain a fragment: ${url}`);
  await assertLocalUrlExists(url.toString(), 'llms.txt');
}

const robotsText = await readFile(path.join(distDir, 'robots.txt'), 'utf8');
assert.match(robotsText, /^Sitemap: https:\/\/biosked\.com\/sitemap-index\.xml$/m, 'robots.txt must advertise the sitemap');
assert.match(
  robotsText,
  /^User-agent: OAI-SearchBot\s*\nAllow: \/$/m,
  'robots.txt must explicitly allow OpenAI search indexing',
);

console.log(`SEO checks passed: ${checkedPages} pages, ${checkedImages} images, ${checkedStructuredAssets} structured-data assets, llms.txt, and robots.txt.`);

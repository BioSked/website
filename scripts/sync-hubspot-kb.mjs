import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, parseFragment, serializeOuter } from 'parse5';

const SOURCE_ORIGIN = 'https://kb.biosked.com';
const SOURCE_HOST = 'kb.biosked.com';
const SITEMAP_URL = `${SOURCE_ORIGIN}/sitemap.xml`;
const PREVIEW_PREFIX = '/kb-preview';
const SUPPORTED_LOCALES = new Set(['en', 'fr']);
const ALLOWED_IFRAME_HOSTS = new Set(['www.guidejar.com']);
const USER_AGENT = 'BioSked knowledge-base synchronizer/1.0 (+https://biosked.com)';
const CONCURRENCY = 3;
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(projectRoot, 'src/data/generated/hubspot-kb.json');

const forms = {
  en: { portalId: '25195055', formId: 'd6e6cae7-b838-40b9-b84b-bbfb1a46ec1e', region: 'eu1' },
  fr: { portalId: '25195055', formId: '894f4e34-0e56-402f-9092-b09cc9876473', region: 'eu1' },
};

function replaceForbiddenPunctuation(value) {
  return value.replaceAll('\u2014', ' - ');
}

const XML_ENTITIES = Object.freeze({
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
});

function decodeXml(value) {
  return value.replace(/&(amp|lt|gt|quot|apos);/g, (_entity, name) => XML_ENTITIES[name]);
}

function attr(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value ?? '';
}

function setAttr(node, name, value) {
  if (!node.attrs) node.attrs = [];
  const existing = node.attrs.find((item) => item.name === name);
  if (existing) existing.value = value;
  else node.attrs.push({ name, value });
}

function removeAttr(node, name) {
  if (!node.attrs) return;
  node.attrs = node.attrs.filter((item) => item.name !== name);
}

function classes(node) {
  return new Set(attr(node, 'class').split(/\s+/).filter(Boolean));
}

function hasClass(node, className) {
  return classes(node).has(className);
}

function descendants(root, predicate, result = []) {
  if (predicate(root)) result.push(root);
  for (const child of root.childNodes ?? []) descendants(child, predicate, result);
  if (root.content) descendants(root.content, predicate, result);
  return result;
}

function firstDescendant(root, predicate) {
  if (predicate(root)) return root;
  for (const child of root.childNodes ?? []) {
    const found = firstDescendant(child, predicate);
    if (found) return found;
  }
  if (root.content) return firstDescendant(root.content, predicate);
  return null;
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  if (node.nodeName === 'script' || node.nodeName === 'style') return '';
  return (node.childNodes ?? []).map(textContent).join('');
}

function decodeHtmlEntities(value) {
  let decoded = String(value ?? '');
  for (let pass = 0; pass < 3; pass += 1) {
    const escapedAngles = decoded.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    const next = textContent(parseFragment(`<span>${escapedAngles}</span>`));
    if (next === decoded) break;
    decoded = next;
  }
  return decoded;
}

function cleanText(value) {
  return replaceForbiddenPunctuation(decodeHtmlEntities(value)).replace(/\s+/g, ' ').trim();
}

function metaContent(document, selectorName, value) {
  const meta = firstDescendant(document, (node) =>
    node.tagName === 'meta' && attr(node, selectorName).toLowerCase() === value.toLowerCase());
  return cleanText(attr(meta ?? {}, 'content'));
}

function normalizeSourceUrl(value, baseUrl) {
  const url = new URL(value, baseUrl);
  url.searchParams.delete('hsLang');
  const search = url.searchParams.toString();
  return `${url.origin}${url.pathname}${search ? `?${search}` : ''}${url.hash}`;
}

function sourcePathFromHref(value, baseUrl) {
  const url = new URL(value, baseUrl);
  return url.pathname.replace(/\/$/, '') || '/';
}

function previewHrefFor(value, baseUrl) {
  const url = new URL(value, baseUrl);
  if (url.hostname !== SOURCE_HOST || !/^\/(?:en|fr)\/knowledge(?:\/|$)/.test(url.pathname)) return value;
  url.searchParams.delete('hsLang');
  const search = url.searchParams.toString();
  return `${PREVIEW_PREFIX}${url.pathname}${search ? `?${search}` : ''}${url.hash}`;
}

function sanitizeTree(node, baseUrl) {
  if (node.nodeName === '#text') {
    node.value = replaceForbiddenPunctuation(node.value ?? '');
    return true;
  }

  const blockedElements = new Set([
    'script',
    'style',
    'form',
    'input',
    'button',
    'select',
    'textarea',
    'object',
    'embed',
    'base',
    'meta',
    'link',
  ]);
  if (blockedElements.has(node.tagName)) return false;

  if (node.attrs) {
    node.attrs = node.attrs.filter((item) => {
      const name = item.name.toLowerCase();
      if (name.startsWith('on') || name === 'style' || name === 'srcdoc') return false;
      if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(item.value)) return false;
      return true;
    });
  }

  if (node.tagName === 'a') {
    const href = attr(node, 'href');
    if (href) {
      try {
        const target = new URL(href, baseUrl);
        if (!['http:', 'https:', 'mailto:', 'tel:'].includes(target.protocol)) {
          removeAttr(node, 'href');
          return true;
        }
        setAttr(node, 'href', previewHrefFor(href, baseUrl));
        if (target.hostname !== SOURCE_HOST) setAttr(node, 'rel', 'noopener noreferrer');
      } catch {
        removeAttr(node, 'href');
      }
    }
  }

  if (node.tagName === 'img') {
    const src = attr(node, 'src');
    if (src) {
      try {
        setAttr(node, 'src', new URL(src, baseUrl).toString());
      } catch {
        removeAttr(node, 'src');
      }
    }
    if (!node.attrs?.some((item) => item.name === 'alt')) setAttr(node, 'alt', '');
    setAttr(node, 'loading', 'lazy');
    setAttr(node, 'decoding', 'async');
  }

  if (node.tagName === 'iframe') {
    const src = attr(node, 'src');
    try {
      const url = new URL(src, baseUrl);
      if (url.protocol !== 'https:' || !ALLOWED_IFRAME_HOSTS.has(url.hostname) || !url.pathname.startsWith('/embed/')) return false;
      setAttr(node, 'src', url.toString());
      setAttr(node, 'loading', 'lazy');
      if (!attr(node, 'title')) setAttr(node, 'title', 'Embedded knowledge base media');
    } catch {
      return false;
    }
  }

  if (node.childNodes) node.childNodes = node.childNodes.filter((child) => sanitizeTree(child, baseUrl));
  if (node.content && !sanitizeTree(node.content, baseUrl)) return false;
  return true;
}

async function fetchText(url, attempts = 7) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) {
        const error = new Error(`${response.status} ${response.statusText}`);
        error.status = response.status;
        error.retryAfter = Number(response.headers.get('retry-after') ?? 0);
        throw error;
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        const retryAfterMs = Number.isFinite(error.retryAfter) ? error.retryAfter * 1_000 : 0;
        const exponentialBackoffMs = Math.min(30_000, 750 * (2 ** (attempt - 1)));
        const jitterMs = Math.floor(Math.random() * 250);
        await new Promise((resolve) => setTimeout(resolve, Math.max(retryAfterMs, exponentialBackoffMs) + jitterMs));
      }
    }
  }
  throw new Error(`Failed to fetch ${url}: ${lastError?.message ?? lastError}`);
}

function parseSitemap(xml) {
  const entries = [];
  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const block = match[1];
    const loc = block.match(/<loc>([\s\S]*?)<\/loc>/)?.[1];
    if (!loc) continue;
    const lastmod = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1] ?? null;
    const url = new URL(decodeXml(loc.trim()));
    const locale = url.pathname.split('/').filter(Boolean)[0];
    if (url.hostname !== SOURCE_HOST || !SUPPORTED_LOCALES.has(locale)) continue;
    if (!url.pathname.startsWith(`/${locale}/knowledge/`)) continue;
    if (url.pathname.endsWith('/kb-tickets/new')) continue;
    entries.push({ url: url.toString(), lastmod: lastmod?.trim() ?? null, locale });
  }
  return entries;
}

function parseBreadcrumbs(document, baseUrl, locale) {
  const items = descendants(document, (node) => node.tagName === 'li' && hasClass(node, 'hs-kb-breadcrumb_item'));
  const breadcrumbs = [];
  for (const item of items) {
    const anchor = firstDescendant(item, (node) => node.tagName === 'a' && Boolean(attr(node, 'href')));
    const title = cleanText(textContent(anchor ?? item));
    if (!title) continue;
    const href = anchor ? normalizeSourceUrl(attr(anchor, 'href'), baseUrl) : baseUrl;
    breadcrumbs.push({ title, sourceUrl: href, path: sourcePathFromHref(href, baseUrl) });
  }
  if (breadcrumbs.length === 0) {
    breadcrumbs.push({
      title: locale === 'fr' ? 'Base de connaissances Momentum' : 'Momentum Knowledge Base',
      sourceUrl: `${SOURCE_ORIGIN}/${locale}/knowledge`,
      path: `/${locale}/knowledge`,
    });
  }
  return breadcrumbs;
}

function parseAlternates(document, baseUrl) {
  const result = {};
  const links = descendants(document, (node) => node.tagName === 'link' && attr(node, 'rel').split(/\s+/).includes('alternate'));
  for (const link of links) {
    const locale = attr(link, 'hreflang').toLowerCase();
    const href = attr(link, 'href');
    if (!SUPPORTED_LOCALES.has(locale) || !href) continue;
    result[locale] = sourcePathFromHref(href, baseUrl);
  }
  return result;
}

function extractArticle(html, entry) {
  const document = parse(html);
  const articleNode = firstDescendant(document, (node) => node.tagName === 'article' && hasClass(node, 'knowledgebase-post'));
  if (!articleNode) return null;

  const titleNode = firstDescendant(articleNode, (node) => node.tagName === 'h1');
  const title = cleanText(textContent(titleNode)) || metaContent(document, 'property', 'og:title');
  const description = metaContent(document, 'name', 'description') || title;
  const bodyNodes = descendants(articleNode, (node) => hasClass(node, 'hs_cos_wrapper_type_inline_richtext_field'))
    .filter((node) => cleanText(textContent(node)).length > 0);
  if (bodyNodes.length === 0) throw new Error(`No rich text body found at ${entry.url}`);

  for (const bodyNode of bodyNodes) sanitizeTree(bodyNode, entry.url);
  const bodyHtml = bodyNodes
    .map((node) => (node.childNodes ?? []).map((child) => serializeOuter(child)).join(''))
    .join('\n')
    .trim();
  const searchText = cleanText(bodyNodes.map(textContent).join(' '));
  if (!title || !description || !bodyHtml || !searchText) throw new Error(`Incomplete article extraction at ${entry.url}`);

  const canonicalNode = firstDescendant(document, (node) => node.tagName === 'link' && attr(node, 'rel').split(/\s+/).includes('canonical'));
  const canonicalUrl = canonicalNode ? normalizeSourceUrl(attr(canonicalNode, 'href'), entry.url) : normalizeSourceUrl(entry.url, entry.url);
  const sourcePath = sourcePathFromHref(canonicalUrl, entry.url);
  const feedbackNode = firstDescendant(document, (node) => Boolean(attr(node, 'article-id')));
  const articleId = attr(feedbackNode ?? {}, 'article-id') || createHash('sha256').update(canonicalUrl).digest('hex').slice(0, 16);
  const breadcrumbs = parseBreadcrumbs(document, entry.url, entry.locale);
  const meaningfulBreadcrumbs = breadcrumbs.filter((item) => item.path !== `/${entry.locale}/knowledge` && item.path !== sourcePath);
  const primaryCategory = meaningfulBreadcrumbs[0] ?? null;
  const subcategory = meaningfulBreadcrumbs[1]?.title ?? null;

  return {
    articleId,
    locale: entry.locale,
    title,
    description,
    sourceUrl: canonicalUrl,
    sourcePath,
    previewPath: `${PREVIEW_PREFIX}${sourcePath}`,
    lastModified: entry.lastmod,
    breadcrumbs,
    primaryCategory: primaryCategory ? { title: primaryCategory.title, path: primaryCategory.path } : null,
    subcategory,
    alternates: parseAlternates(document, entry.url),
    bodyHtml,
    searchText,
  };
}

function extractBrowserArticle(record) {
  const sourceUrl = normalizeSourceUrl(record.sourceUrl, record.sourceUrl);
  const locale = new URL(sourceUrl).pathname.split('/').filter(Boolean)[0];
  if (!SUPPORTED_LOCALES.has(locale)) return null;

  const document = parse(`<div id="browser-export-body">${record.bodyHtml ?? ''}</div>`);
  const bodyNode = firstDescendant(document, (node) => attr(node, 'id') === 'browser-export-body');
  if (!bodyNode) return null;
  sanitizeTree(bodyNode, sourceUrl);

  const bodyHtml = (bodyNode.childNodes ?? []).map((child) => serializeOuter(child)).join('').trim();
  const searchText = cleanText(textContent(bodyNode));
  const title = cleanText(record.title ?? '');
  const description = cleanText(record.description ?? '') || title;
  if (!title || !description || !bodyHtml || !searchText) {
    throw new Error(`Incomplete browser-export article at ${sourceUrl}`);
  }

  const sourcePath = sourcePathFromHref(record.canonical || sourceUrl, sourceUrl);
  const breadcrumbs = (record.breadcrumbs ?? [])
    .map((item) => {
      const href = item.href ? normalizeSourceUrl(item.href, sourceUrl) : sourceUrl;
      return { title: cleanText(item.title ?? ''), sourceUrl: href, path: sourcePathFromHref(href, sourceUrl) };
    })
    .filter((item) => item.title);
  const meaningfulBreadcrumbs = breadcrumbs.filter((item) => item.path !== `/${locale}/knowledge` && item.path !== sourcePath);
  const primaryCategory = meaningfulBreadcrumbs[0] ?? null;
  const alternates = {};
  for (const alternate of record.alternates ?? []) {
    const alternateLocale = String(alternate.hreflang ?? '').toLowerCase();
    if (SUPPORTED_LOCALES.has(alternateLocale) && alternate.href) {
      alternates[alternateLocale] = sourcePathFromHref(alternate.href, sourceUrl);
    }
  }

  return {
    articleId: record.articleId || createHash('sha256').update(sourceUrl).digest('hex').slice(0, 16),
    locale,
    title,
    description,
    sourceUrl,
    sourcePath,
    previewPath: `${PREVIEW_PREFIX}${sourcePath}`,
    lastModified: record.lastmod || null,
    breadcrumbs,
    primaryCategory: primaryCategory ? { title: primaryCategory.title, path: primaryCategory.path } : null,
    subcategory: meaningfulBreadcrumbs[1]?.title ?? null,
    alternates,
    bodyHtml,
    searchText,
  };
}

async function mapConcurrent(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function buildCategories(articles) {
  const byKey = new Map();
  for (const article of articles) {
    const fallback = {
      title: article.locale === 'fr' ? 'Autres guides' : 'More guides',
      path: `/${article.locale}/knowledge/more-guides`,
    };
    const category = article.primaryCategory ?? fallback;
    const key = `${article.locale}:${category.path}`;
    if (!byKey.has(key)) {
      byKey.set(key, {
        locale: article.locale,
        title: category.title,
        path: category.path,
        previewPath: `${PREVIEW_PREFIX}${category.path}`,
        articlePaths: [],
        subcategories: [],
      });
    }
    const item = byKey.get(key);
    item.articlePaths.push(article.sourcePath);
    if (article.subcategory && !item.subcategories.includes(article.subcategory)) item.subcategories.push(article.subcategory);
  }
  return [...byKey.values()]
    .map((category) => ({
      ...category,
      articlePaths: [...new Set(category.articlePaths)].sort(),
      subcategories: category.subcategories.sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.locale.localeCompare(b.locale) || a.title.localeCompare(b.title));
}

const exportArgIndex = process.argv.indexOf('--from-export');
const exportPath = exportArgIndex >= 0 ? process.argv[exportArgIndex + 1] : '';
let sourceCandidateCount = 0;
let sourceMode = 'public-sitemap';
let extracted = [];

if (exportPath) {
  const browserExport = JSON.parse(await readFile(path.resolve(exportPath), 'utf8'));
  if (!Array.isArray(browserExport.records) || browserExport.errors?.length) {
    throw new Error('Browser export is incomplete or contains fetch errors');
  }
  sourceMode = 'browser-export';
  sourceCandidateCount = browserExport.sourcePageCount ?? browserExport.records.length;
  extracted = browserExport.records.map(extractBrowserArticle);
} else {
  sourceMode = 'public-sitemap-incremental';
  const sitemapXml = await fetchText(SITEMAP_URL);
  const entries = parseSitemap(sitemapXml);
  sourceCandidateCount = entries.length;
  if (entries.length < 150) throw new Error(`Sitemap exposed only ${entries.length} KB candidates; refusing an incomplete snapshot`);

  let previousSnapshot = null;
  try {
    previousSnapshot = JSON.parse(await readFile(outputPath, 'utf8'));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
  const previousByUrl = new Map(
    (previousSnapshot?.articles ?? []).map((article) => [normalizeSourceUrl(article.sourceUrl, article.sourceUrl), article]),
  );
  let completed = 0;
  let fetched = 0;
  let reused = 0;
  extracted = await mapConcurrent(entries, CONCURRENCY, async (entry) => {
    const normalizedUrl = normalizeSourceUrl(entry.url, entry.url);
    const previous = previousByUrl.get(normalizedUrl);
    let article;
    if (previous && previous.lastModified === entry.lastmod) {
      article = previous;
      reused += 1;
    } else {
      const html = await fetchText(entry.url);
      article = extractArticle(html, entry);
      fetched += 1;
    }
    completed += 1;
    if (completed % 25 === 0 || completed === entries.length) process.stdout.write(`Processed ${completed}/${entries.length}\n`);
    return article;
  });
  console.log(`Incremental sync: reused ${reused}, fetched ${fetched}.`);
}

const articles = extracted
  .filter(Boolean)
  .sort((a, b) => a.locale.localeCompare(b.locale) || a.sourcePath.localeCompare(b.sourcePath));
const categories = buildCategories(articles);
const core = {
  schemaVersion: 1,
  sourceHost: SOURCE_HOST,
  sourceSitemap: SITEMAP_URL,
  sourceMode,
  sourceCandidateCount,
  articles,
  categories,
  forms,
};
const contentHash = createHash('sha256').update(JSON.stringify(core)).digest('hex');
const snapshot = {
  ...core,
  generatedAt: new Date().toISOString(),
  contentHash,
};

await mkdir(path.dirname(outputPath), { recursive: true });
const tempPath = `${outputPath}.tmp`;
await writeFile(tempPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
await rename(tempPath, outputPath);
console.log(`Wrote ${path.relative(projectRoot, outputPath)}: ${articles.length} articles, ${categories.length} categories, ${contentHash.slice(0, 12)}`);

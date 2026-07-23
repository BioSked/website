import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../astro.config.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const siteOrigin = new URL(config.site).origin;
const allowedDestinationOrigins = new Set([siteOrigin, 'https://kb.biosked.com']);
const attributionQueryParameters = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'gclid',
  'gbraid',
  'wbraid',
  'dclid',
  'msclkid',
  'fbclid',
  'li_fat_id',
  '_gl',
];
const safeIncomingFragments = ['#contact', '#form'];

function destinationParts(destination) {
  if (destination.startsWith('//')) {
    throw new Error(`Protocol-relative redirect destinations are not allowed: ${destination}`);
  }
  const url = new URL(destination, siteOrigin);
  if (!allowedDestinationOrigins.has(url.origin) || url.search) {
    throw new Error(`Redirect destination origin is not allowed or contains query data: ${destination}`);
  }
  if (url.hash && !/^#[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(url.hash)) {
    throw new Error(`Redirect destination contains an unsafe fragment: ${destination}`);
  }
  const normalizedPath = url.origin === siteOrigin && url.pathname !== '/'
    ? `${url.pathname.replace(/\/+$/, '')}/`
    : url.pathname;
  return {
    target: url.origin === siteOrigin ? normalizedPath : `${url.origin}${normalizedPath}`,
    languagePath: normalizedPath,
    hash: url.hash,
  };
}

function outputPathFor(source) {
  const normalized = source.replace(/^\/+|\/+$/g, '');
  const segments = normalized.split('/');
  if (!normalized || segments.some((segment) => !segment || segment === '.' || segment === '..' || segment.includes('\\'))) {
    throw new Error(`Unsafe redirect source path: ${source}`);
  }
  return path.join(distDir, ...segments, 'index.html');
}

function htmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function scriptLiteral(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

function languageFor(destination) {
  const locale = destination.split('/').filter(Boolean)[0];
  if (locale === 'fr-ch') return 'fr-CH';
  if (['fr', 'de', 'nl', 'it'].includes(locale)) return locale;
  return 'en';
}

await access(distDir);
let generated = 0;

for (const [source, rule] of Object.entries(config.redirects ?? {})) {
  const destination = typeof rule === 'string' ? rule : rule.destination;
  const { target, languagePath, hash: fixedHash } = destinationParts(destination);
  const outputPath = outputPathFor(source);
  const canonical = new URL(target, siteOrigin).href;
  const fallbackTarget = `${target}${fixedHash}`;
  const sourcePath = `/${source.replace(/^\/+|\/+$/g, '')}/`;
  const html = `<!doctype html>
<html lang="${htmlEscape(languageFor(languagePath))}">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta name="referrer" content="no-referrer">
<title>Redirecting to ${htmlEscape(target)}</title>
<link rel="canonical" href="${htmlEscape(canonical)}">
<script>(()=>{const target=${scriptLiteral(target)},fixedHash=${scriptLiteral(fixedHash)},allowed=new Set(${scriptLiteral(attributionQueryParameters)}),allowedHashes=new Set(${scriptLiteral(safeIncomingFragments)}),input=new URLSearchParams(location.search),output=new URLSearchParams();let kept=0;for(const [key,value] of input){const normalizedKey=key.toLowerCase(),hasControl=[...value].some((character)=>{const code=character.charCodeAt(0);return code<32||code===127});if(kept>=14||!allowed.has(normalizedKey)||value.length>256||value.includes('@')||hasControl)continue;output.append(normalizedKey,value);kept+=1}const query=output.toString(),safeHash=allowedHashes.has(location.hash)?location.hash:'',hash=fixedHash||safeHash;location.replace(target+(query?'?'+query:'')+hash)})();</script>
<noscript><meta http-equiv="refresh" content="0;url=${htmlEscape(fallbackTarget)}"></noscript>
</head>
<body><p><a href="${htmlEscape(target)}">Redirecting from <code>${htmlEscape(sourcePath)}</code> to <code>${htmlEscape(target)}</code></a></p></body>
</html>
`;
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
  generated += 1;
}

console.log(`Generated ${generated} query-preserving static redirect pages.`);

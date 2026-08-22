/**
 * de/nl/it knowledge base articles are a static translation overlay on the
 * EN/FR HubSpot source. When a source article changes after the translations
 * were generated, the translated page silently drifts. This report lists those
 * articles at build time so the drift is visible. It warns, it never fails the
 * build: a stale translation is still better than no page.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshot = JSON.parse(await readFile(path.join(projectRoot, 'src/data/generated/hubspot-kb.json'), 'utf8'));
const translations = JSON.parse(await readFile(path.join(projectRoot, 'src/data/generated/kb-translations.json'), 'utf8'));

const generatedAt = translations.generatedAt ? new Date(translations.generatedAt) : null;
if (!generatedAt || Number.isNaN(generatedAt.getTime())) {
  console.log('KB translations: no generatedAt stamp, staleness unknown.');
  process.exit(0);
}

const translatedIds = new Set(
  (translations.languages ?? []).flatMap((locale) => Object.keys(translations.articles?.[locale] ?? {})),
);
const stale = snapshot.articles.filter((article) => {
  if (!translatedIds.has(article.articleId) || !article.lastModified) return false;
  return new Date(`${article.lastModified}T23:59:59Z`) > generatedAt;
});

if (stale.length === 0) {
  console.log(`KB translations current: ${translatedIds.size} source articles, none changed since ${translations.generatedAt}.`);
} else {
  console.log(`KB translations STALE: ${stale.length} source article(s) changed since ${translations.generatedAt}; the de/nl/it pages need a translation refresh:`);
  for (const article of stale) console.log(`  - [${article.locale}] ${article.sourcePath} (updated ${article.lastModified})`);
}

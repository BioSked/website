import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Exercise the actual sync category builder without fetching or writing a snapshot.
const source = await readFile(new URL('./sync-hubspot-kb.mjs', import.meta.url), 'utf8');
const start = source.indexOf('function buildCategories(');
const end = source.indexOf('\nconst exportArgIndex', start);
assert.ok(start >= 0 && end > start, 'category builder must be available');
const sitePathFor = (value) => value.replace('/en/knowledge', '/help').replace('/fr/knowledge', '/fr/help');
const build = vm.runInNewContext(`${source.slice(start, end)}\nbuildCategories`, { sitePathFor });
const plain = (value) => JSON.parse(JSON.stringify(value));
const video = {
  locale: 'en', sourcePath: '/en/knowledge/new-mobile-app-video-guide',
  primaryCategory: { title: 'Video Guides', path: '/en/knowledge/video-guides' },
  subcategory: 'Mobile application',
};
const published = {
  locale: 'en', title: 'New Mobile App is here!', path: '/en/knowledge/new-mobile-app-is-here',
  sitePath: '/help/new-mobile-app-is-here', articlePaths: [video.sourcePath], subcategories: [],
};
const categories = plain(build([video], [published]));
assert.ok(categories.some((c) => c.path === video.primaryCategory.path), 'preserve the current primary category');
assert.deepEqual(categories.find((c) => c.path === published.path), published,
  'a published secondary category must survive when the article primary category changes');
assert.equal(categories.length, 2, 'retain both published entry points without creating an article');
const again = plain(build([video], [published, published]));
assert.deepEqual(again, categories, 'published category discovery must be idempotent');
assert.equal(plain(build([video])).length, 1, 'legacy browser exports remain supported');
const { discoverMissingCategories } = await import('./lib/kb-published-categories.mjs');
const home = { locale: 'en', url: 'https://content.biosked.com/en/knowledge', html: `
  <a class="hs-kb-home-list__category-link" href="/en/knowledge/new-mobile-app-is-here?hsLang=en"><h3>New Mobile App is here!</h3><p>Announcement</p></a>
  <a class="hs-kb-home-list__category-link" href="https://untrusted.example/en/knowledge/other"><h3>Ignore external</h3></a>` };
const categoryHtml = `<a class="hs-kb-category-article-list__link" href="/en/knowledge/new-mobile-app-video-guide?hsLang=en">Video guide</a>`;
const fetched = [];
const discovered = await discoverMissingCategories([home], [video], plain(build([video])), async (url) => {
  fetched.push(url); return categoryHtml;
});
assert.deepEqual(discovered, [published], 'discover the category from actual HubSpot home/listing markup');
assert.deepEqual(fetched, ['https://content.biosked.com/en/knowledge/new-mobile-app-is-here'], 'never fetch off-host links');
assert.deepEqual(await discoverMissingCategories([home], [video], categories, async () => { throw new Error('unnecessary fetch'); }), [], 'do not refetch existing categories');
await assert.rejects(discoverMissingCategories([home], [], [], async () => categoryHtml), /absent from the snapshot/, 'reject partial category membership');
await assert.rejects(discoverMissingCategories([{ ...home, html: '<p>wrong page</p>' }], [video], [], async () => categoryHtml), /No published categories/, 'fail closed on broken source extraction');
await assert.rejects(discoverMissingCategories([home], [video], [], async () => '<p>No listing</p>'), /No mirrored articles/, 'never silently ship an empty restored category');
console.log('Published-category regression checks passed.');

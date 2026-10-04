/**
 * Tells Bing (and the other IndexNow engines) that pages changed, so they
 * recrawl within minutes instead of waiting. ChatGPT search and Copilot use
 * Bing's index. Key file: public/8e6c7cdabc975ed372e7a19b395fc8e4.txt (must stay deployed).
 *
 *   node scripts/indexnow.mjs https://biosked.com/fr/secteurs-soins/anesthesie/ ...
 *   node scripts/indexnow.mjs --sitemap          # every URL in the live sitemap (use sparingly)
 */
import { readdirSync } from 'node:fs';

// The key is public by design (IndexNow fetches it from the site root); read it
// from the deployed key file so the file stays the single source.
const KEY = readdirSync(new URL('../public/', import.meta.url))
    .map((name) => name.match(/^([0-9a-f]{32})\.txt$/)?.[1])
    .find(Boolean);
if (!KEY) throw new Error('IndexNow key file missing from public/');
const HOST = 'biosked.com';

async function sitemapUrls() {
    const index = await (await fetch('https://biosked.com/sitemap-index.xml')).text();
    const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const urls = [];
    for (const map of maps) {
        const xml = await (await fetch(map)).text();
        urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
    }
    return urls;
}

const args = process.argv.slice(2);
const urlList = args.includes('--sitemap') ? await sitemapUrls() : args;
if (!urlList.length) {
    console.error('Give URLs, or --sitemap');
    process.exit(1);
}
for (let i = 0; i < urlList.length; i += 9000) {
    const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urlList.slice(i, i + 9000) }),
    });
    console.log(`IndexNow: ${res.status} ${res.statusText} for ${Math.min(9000, urlList.length - i)} URLs`);
}

/**
 * Checks the Firebase redirect sites for the retired biosked.fr hosts: every
 * legacy URL must answer one 301 whose target answers 200 (no second hop).
 *
 *   node scripts/test-firebase-redirects.mjs          # the *.web.app test hosts
 *   node scripts/test-firebase-redirects.mjs --live   # biosked.fr, www, kb, go
 *   node scripts/test-firebase-redirects.mjs --live --only=fr,kb
 *
 * Not part of the build: it needs the network and checks deployed state.
 */
import { readFile } from 'node:fs/promises';
import config from '../astro.config.mjs';

const live = process.argv.includes('--live');
const HOSTS = live
    ? { fr: ['https://biosked.fr', 'https://www.biosked.fr'], kb: ['https://kb.biosked.fr'], go: ['https://go.biosked.fr'] }
    : { fr: ['https://biosked-fr-redirect.web.app'], kb: ['https://biosked-fr-kb-redirect.web.app'], go: ['https://biosked-fr-go-redirect.web.app'] };

const frPaths = new Set(['/', '/feed/', '/sitemap_index.xml', '/robots.txt']);
for (const from of Object.keys(config.redirects ?? {})) {
    const p = '/' + from.replace(/^\/+|\/+$/g, '');
    frPaths.add(`${p}/`);
    frPaths.add(p);
}
const snapshot = JSON.parse(await readFile(new URL('../src/data/generated/hubspot-kb.json', import.meta.url), 'utf8'));
const kbPaths = new Set(['/', '/en/knowledge', '/fr/knowledge', '/en/knowledge/kb-tickets/new', '/fr/knowledge/kb-tickets/new', '/fr/knowledge/vue-de-la-nouvelle-date', '/knowledge/add-single-request']);
for (const a of snapshot.articles) kbPaths.add(new URL(a.sourceUrl).pathname);
for (const c of snapshot.categories) kbPaths.add(c.path);

async function check(url) {
    const first = await fetch(url, { redirect: 'manual' });
    const location = first.headers.get('location');
    if (first.status !== 301 || !location) return `${url} -> ${first.status} (expected 301)`;
    const second = await fetch(location, { redirect: 'manual' });
    if (second.status !== 200) return `${url} -> ${location} -> ${second.status} (expected 200)`;
    return null;
}

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const only = new Set(onlyArg ? onlyArg.slice(7).split(',') : ['fr', 'kb', 'go']);
for (const key of Object.keys(HOSTS)) if (!only.has(key)) HOSTS[key] = [];

const jobs = [];
for (const host of HOSTS.fr) for (const p of frPaths) jobs.push(host + p);
for (const host of HOSTS.kb) for (const p of kbPaths) jobs.push(host + p);
const goPaths = ['/', '/demo-anesthesie', '/fr-fr/etude-de-cas-chirec', '/webinar-july-2026', '/meetings/demo-momentum/jfr-2026', '/fr-fr/d%C3%A9couvrez-une-nouvelle-fa%C3%A7on-de-planifier-%C3%A9quitablement'];
for (const host of HOSTS.go) for (const p of goPaths) jobs.push(host + p);

const failures = [];
for (let i = 0; i < jobs.length; i += 12) {
    const results = await Promise.all(jobs.slice(i, i + 12).map((u) => check(u).catch((e) => `${u} -> ${e.message}`)));
    failures.push(...results.filter(Boolean));
}
for (const f of failures) console.error(`FAIL ${f}`);
console.log(`${jobs.length - failures.length}/${jobs.length} legacy URLs: one 301, then 200${live ? ' (live hosts)' : ' (web.app hosts)'}`);
process.exit(failures.length ? 1 : 0);

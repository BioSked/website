/**
 * Summary of the cookie-free visit counter (site-stats/README.md).
 *
 *   node scripts/site-stats-report.mjs            last 7 days
 *   node scripts/site-stats-report.mjs --days 28
 *   node scripts/site-stats-report.mjs --cleanup  also delete hits past their expiry
 *
 * Reading needs an owner of the Firebase project biosked-site-stats: the
 * script uses SITE_STATS_TOKEN, or the access token of a local
 * `firebase login` (refresh it by running any firebase command first).
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const BASE = 'https://firestore.googleapis.com/v1/projects/biosked-site-stats/databases/(default)/documents';
const args = process.argv.slice(2);
const days = Number(args[args.indexOf('--days') + 1]) || 7;
const RETENTION_DAYS = 760;

function token() {
  if (process.env.SITE_STATS_TOKEN) return process.env.SITE_STATS_TOKEN;
  const store = JSON.parse(readFileSync(`${homedir()}/.config/configstore/firebase-tools.json`, 'utf8'));
  if (store.tokens.expires_at < Date.now() + 60000) throw new Error('Firebase login token expired: run `npx firebase-tools projects:list` once, then retry.');
  return store.tokens.access_token;
}
const headers = { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' };

async function hitsSince(fromExp) {
  const res = await fetch(`${BASE}:runQuery`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: 'hits' }],
      where: { fieldFilter: { field: { fieldPath: 'exp' }, op: 'GREATER_THAN_OR_EQUAL', value: { timestampValue: fromExp } } },
    } }),
  });
  if (!res.ok) throw new Error(`Firestore ${res.status}: ${await res.text()}`);
  return (await res.json()).filter((r) => r.document).map((r) => r.document);
}

const now = Date.now();
const since = new Date(now - days * 86400000);
const docs = await hitsSince(new Date(since.valueOf() + RETENTION_DAYS * 86400000).toISOString());
const hits = docs
  .map((d) => ({ ...Object.fromEntries(Object.entries(d.fields).map(([k, v]) => [k, v.stringValue ?? v.timestampValue])), day: d.createTime.slice(0, 10) }))
  .filter((h) => !h.p.startsWith('/__test__'));

const count = (list, key) => Object.entries(list.reduce((acc, h) => ((acc[key(h)] = (acc[key(h)] || 0) + 1), acc), {}))
  .sort((a, b) => b[1] - a[1]);
const show = (title, rows, limit = 15) => {
  console.log(`\n${title}`);
  if (!rows.length) console.log('  (none)');
  for (const [k, n] of rows.slice(0, limit)) console.log(`  ${String(n).padStart(5)}  ${k}`);
};

const pv = hits.filter((h) => h.e === 'pv');
console.log(`biosked.com visit counter, ${since.toISOString().slice(0, 10)} to ${new Date(now).toISOString().slice(0, 10)} (${days} days)`);
console.log(`Page views ${pv.length} | template downloads ${hits.filter((h) => h.e === 'tpl').length} | demo clicks ${hits.filter((h) => h.e === 'demo').length} | quote clicks ${hits.filter((h) => h.e === 'quote').length} | completed forms ${hits.filter((h) => h.e === 'lead').length}`);
show('Page views per day', count(pv, (h) => h.day).sort((a, b) => a[0].localeCompare(b[0])), 60);
show('Top pages', count(pv, (h) => h.p));
show('Referring sites (page views)', count(pv.filter((h) => h.r), (h) => h.r));
show('Campaign tags (source / medium / campaign)', count(hits.filter((h) => h.s || h.m || h.c), (h) => `${h.s || '-'} / ${h.m || '-'} / ${h.c || '-'}`));
show('Template downloads', count(hits.filter((h) => h.e === 'tpl'), (h) => `${h.x}  (from ${h.p})`));
show('Demo and quote clicks', count(hits.filter((h) => h.e === 'demo' || h.e === 'quote'), (h) => `${h.e}  from ${h.p}`));
show('Completed forms', count(hits.filter((h) => h.e === 'lead'), (h) => `${h.x}  on ${h.p}`));
show('Languages', count(pv, (h) => h.l || '-'));

if (args.includes('--cleanup')) {
  const res = await fetch(`${BASE}:runQuery`, { method: 'POST', headers, body: JSON.stringify({ structuredQuery: {
    from: [{ collectionId: 'hits' }],
    where: { fieldFilter: { field: { fieldPath: 'exp' }, op: 'LESS_THAN', value: { timestampValue: new Date(now).toISOString() } } },
  } }) });
  const expired = (await res.json()).filter((r) => r.document).map((r) => r.document.name);
  for (const name of expired) await fetch(`https://firestore.googleapis.com/v1/${name}`, { method: 'DELETE', headers });
  console.log(`\nDeleted ${expired.length} expired hits.`);
}

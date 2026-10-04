/**
 * Builds the site as it will look on each scheduled date and checks that no
 * live page links to a page that is not live yet. Slow (one build per date):
 * run before adding or moving scheduled pages.
 *   node scripts/test-scheduled.mjs            all dates
 *   node scripts/test-scheduled.mjs 2026-10-13 one date
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SCHEDULE } from '../src/data/publishSchedule.mjs';

const dates = process.argv[2] ? [process.argv[2]] : [...new Set(SCHEDULE.map((s) => s.date))].sort();
const dist = new URL('../dist/', import.meta.url).pathname;
const exists = (href) => {
    const clean = decodeURIComponent(href.split('#')[0].split('?')[0]);
    if (!clean || clean === '/') return true;
    if (/\.[a-z0-9]{2,5}$/i.test(clean)) return existsSync(join(dist, clean));
    return existsSync(join(dist, clean, 'index.html'));
};
let failures = 0;
for (const date of dates) {
    execFileSync('npx', ['astro', 'build'], { env: { ...process.env, PUBLISH_DATE: date }, stdio: 'ignore' });
    const hasContent = (s) => s.kind === 'upgrade' || existsSync(new URL(`../src/scheduled/${s.kind === 'landing' ? 'landing/' : ''}${s.key}.${s.kind === 'landing' ? 'json' : 'md'}`, import.meta.url));
    for (const s of SCHEDULE.filter((s) => s.date <= date && !hasContent(s))) console.warn(`${date}: ${s.key} has no content yet (will not publish)`);
    const live = SCHEDULE.filter((s) => s.date <= date && hasContent(s));
    for (const item of live) {
        const file = join(dist, item.path, 'index.html');
        if (!existsSync(file)) { console.error(`${date}: ${item.path} not built`); failures++; continue; }
        const html = readFileSync(file, 'utf8');
        const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
        for (const [, href] of main.matchAll(/href="(\/[^"]*)"/g)) {
            if (!exists(href)) { console.error(`${date}: ${item.path} links to missing ${href}`); failures++; }
        }
    }
    for (const item of SCHEDULE.filter((s) => s.date > date && s.kind !== 'upgrade')) {
        if (existsSync(join(dist, item.path, 'index.html'))) { console.error(`${date}: ${item.path} built before its date`); failures++; }
    }
    console.log(`${date}: ${live.length} scheduled pages checked`);
}
if (failures) { console.error(`${failures} problem(s)`); process.exit(1); }
console.log('Scheduled pages: all links resolve on every date.');

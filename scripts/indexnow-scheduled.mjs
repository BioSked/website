/**
 * Run by the daily scheduled deploy: tells IndexNow (Bing, and the engines
 * that share it) about the pages that went live today
 * (src/data/publishSchedule.mjs). Does nothing on days with no new page.
 * Check without sending: PUBLISH_DATE=2026-10-12 node scripts/indexnow-scheduled.mjs --dry
 */
import { execFileSync } from 'node:child_process';
import { SCHEDULE, publishToday } from '../src/data/publishSchedule.mjs';

const today = publishToday();
const urls = SCHEDULE.filter((s) => s.date === today).map((s) => `https://biosked.com${s.path}`);
if (!urls.length) {
    console.log(`IndexNow: nothing scheduled for ${today}`);
    process.exit(0);
}
// The blog indexes and feeds change too when a post goes live.
const extra = ['https://biosked.com/fr/blog/', 'https://biosked.com/blog/', 'https://biosked.com/sitemap-0.xml'];
if (process.argv.includes('--dry')) {
    console.log(`IndexNow (dry run, ${today}):\n${[...urls, ...extra].join('\n')}`);
    process.exit(0);
}
execFileSync(process.execPath, [new URL('./indexnow.mjs', import.meta.url).pathname, ...urls, ...extra], { stdio: 'inherit' });

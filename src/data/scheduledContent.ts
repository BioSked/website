/**
 * A scheduled page is published when its date has come AND its content file
 * exists (src/scheduled/<key>.md or src/scheduled/landing/<key>.json), so a
 * missing file never produces a footer link or hreflang to a 404.
 */
import { isLive, liveGroups, scheduleItem, SCHEDULE } from './publishSchedule.mjs';

const files = Object.keys({
    ...import.meta.glob('../scheduled/*.md'),
    ...import.meta.glob('../scheduled/landing/*.json'),
});
const withContent = new Set(files.map((f) => f.split('/').pop()!.replace(/\.(md|json)$/, '')));

export function isPublished(key: string): boolean {
    const item = scheduleItem(key);
    if (!item || !isLive(key)) return false;
    return item.kind === 'upgrade' || withContent.has(key);
}

/** Translation groups whose pages are all published. */
export function publishedGroups(): Record<string, Record<string, string>> {
    return Object.fromEntries(
        Object.entries(liveGroups()).filter(([name]) => SCHEDULE.filter((s) => s.group === name).every((s) => isPublished(s.key))),
    );
}

export { SCHEDULE };

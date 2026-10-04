/**
 * Staggered publishing. A page listed here exists on the site only from its
 * date (Europe/Zurich): the build skips it before that, and the daily
 * scheduled deploy (.github/workflows/deploy.yml) publishes it that morning
 * and pings IndexNow (scripts/indexnow-scheduled.mjs).
 *
 * kind: 'md' = src/scheduled/<key>.md (article), 'landing' =
 * src/scheduled/landing/<key>.json (landing page), 'upgrade' = an existing
 * page whose new version (src/data/frLandingPages.ts) replaces the old one.
 * group: pages that are translations of each other (hreflang + language
 * switcher), linked only once every page of the group is live.
 * footer: footer label in the page's locale, shown once live.
 *
 * Preview a future state locally: PUBLISH_DATE=2026-11-30 npm run build
 */
export const SCHEDULE = [
    { key: 'fr-ght', date: '2026-10-07', locale: 'fr', path: '/fr/secteurs-soins/etablissements-de-sante/', kind: 'upgrade' },
    { key: 'nl-chirec', date: '2026-10-08', locale: 'nl', path: '/nl/referenties/chirec/', kind: 'md' },
    { key: 'ch-pikett-de', date: '2026-10-12', locale: 'de-ch', path: '/de-ch/funktionen/pikettplanung/', kind: 'landing', group: 'pikett', footer: 'Pikettplanung' },
    { key: 'ch-pikett-fr', date: '2026-10-12', locale: 'fr-ch', path: '/fr-ch/fonctionnalites/planning-de-piquet/', kind: 'landing', group: 'pikett', footer: 'Planning de piquet' },
    { key: 'nl-spoed', date: '2026-10-13', locale: 'nl', path: '/nl/specialismen/spoedgevallen/', kind: 'landing', footer: 'Spoedgevallen' },
    { key: 'frch-refs', date: '2026-10-14', locale: 'fr-ch', path: '/fr-ch/references/', kind: 'md', footer: 'Références' },
    { key: 'de-tv', date: '2026-10-15', locale: 'de', path: '/de/ratgeber/tv-aerzte-dienstplan-grenzen/', kind: 'md' },
    { key: 'it-guardia', date: '2026-10-16', locale: 'it', path: '/it/funzionalita/turni-di-guardia-e-reperibilita/', kind: 'landing', footer: 'Turni di guardia' },
    { key: 'nl-radio', date: '2026-10-20', locale: 'nl', path: '/nl/specialismen/radiologie/', kind: 'landing', footer: 'Radiologie' },
    { key: 'us-acgme', date: '2026-10-21', locale: 'en', path: '/guides/acgme-duty-hours-2028-proposal/', kind: 'md' },
    { key: 'fr-cardio', date: '2026-10-22', locale: 'fr', path: '/fr/secteurs-soins/cardiologie/', kind: 'upgrade' },
    { key: 'de-notauf', date: '2026-10-27', locale: 'de', path: '/de/fachbereiche/notaufnahme/', kind: 'landing', footer: 'Notaufnahme' },
    { key: 'fr-buyer', date: '2026-10-28', locale: 'fr', path: '/fr/blog/choisir-logiciel-planning-medical/', kind: 'md' },
    { key: 'it-ps', date: '2026-10-29', locale: 'it', path: '/it/specialita/pronto-soccorso/', kind: 'landing', footer: 'Pronto soccorso' },
    { key: 'ch-feiertage-de', date: '2026-11-02', locale: 'de-ch', path: '/de-ch/ratgeber/feiertage-2027-kantone/', kind: 'md', group: 'feiertage2027' },
    { key: 'ch-feries-fr', date: '2026-11-02', locale: 'fr-ch', path: '/fr-ch/guide/jours-feries-2027-cantons/', kind: 'md', group: 'feiertage2027' },
    { key: 'us-holiday', date: '2026-11-03', locale: 'en', path: '/blog/posts/holiday-call-schedule-fairness/', kind: 'md' },
    { key: 'de-radio', date: '2026-11-03', locale: 'de', path: '/de/fachbereiche/radiologie/', kind: 'landing', footer: 'Radiologie' },
    { key: 'it-radio', date: '2026-11-05', locale: 'it', path: '/it/specialita/radiologia/', kind: 'landing', footer: 'Radiologia' },
    { key: 'de-anaes', date: '2026-11-10', locale: 'de', path: '/de/fachbereiche/anaesthesie/', kind: 'landing', footer: 'Anästhesie' },
    { key: 'it-ccnl', date: '2026-11-12', locale: 'it', path: '/it/guida/ccnl-area-sanita-turni/', kind: 'md' },
    { key: 'ch-42-de', date: '2026-11-16', locale: 'de-ch', path: '/de-ch/ratgeber/42-plus-4-dienstplan/', kind: 'md', group: '42plus4' },
    { key: 'ch-42-fr', date: '2026-11-16', locale: 'fr-ch', path: '/fr-ch/guide/semaine-42-plus-4/', kind: 'md', group: '42plus4' },
];

/** Today in Europe/Zurich as YYYY-MM-DD, or PUBLISH_DATE when set. */
export function publishToday() {
    const forced = typeof process !== 'undefined' ? process.env.PUBLISH_DATE : undefined;
    if (forced && /^\d{4}-\d{2}-\d{2}$/.test(forced)) return forced;
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich' }).format(new Date());
}

export function scheduleItem(key) {
    return SCHEDULE.find((s) => s.key === key);
}

export function isLive(key) {
    const item = scheduleItem(key);
    if (!item) throw new Error(`Unknown scheduled key: ${key}`);
    return item.date <= publishToday();
}

/** Live translation groups as { name: { locale: path-without-trailing-slash } }. */
export function liveGroups() {
    const groups = {};
    for (const item of SCHEDULE) {
        if (!item.group) continue;
        (groups[item.group] ??= []).push(item);
    }
    const out = {};
    for (const [name, items] of Object.entries(groups)) {
        if (items.every((i) => isLive(i.key))) {
            out[name] = Object.fromEntries(items.map((i) => [i.locale, i.path.replace(/\/$/, '')]));
        }
    }
    return out;
}

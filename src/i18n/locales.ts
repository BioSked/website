/**
 * Locale metadata + cross-locale path mapping for the multilingual site.
 *
 * URL scheme: English is the default locale and lives unprefixed at the root.
 * fr/de/nl/it live under their prefix. French has its own page tree
 * (market-specific pages like /fr/cas-clients, /fr/secteurs-soins/...);
 * de/nl/it mirror every English route via Astro's i18n fallback (rewrite)
 * until they get localized pages of their own.
 */
import { FR_CH_LOCAL } from './frChPaths.mjs';
export { FR_CH_LOCAL, frChLocalPathFor } from './frChPaths.mjs';

export const LOCALE_CODES = ['en', 'fr', 'fr-ch', 'de', 'nl', 'it'] as const;
export type LocaleCode = (typeof LOCALE_CODES)[number];

export const LOCALE_LABELS: Record<LocaleCode, string> = {
    en: 'English',
    fr: 'Français',
    'fr-ch': 'Français (Suisse)',
    de: 'Deutsch',
    nl: 'Nederlands',
    it: 'Italiano',
};

/** Pages that exist at the root for every locale (not translated per-locale). */
const SHARED_ROOT_PATHS = ['/privacy', '/changelog', '/internal-testing'];

/** English marketing paths that have a real French equivalent at /fr/<same>. */
const FR_MIRRORED = ['/', '/about', '/careers', '/pricing', '/demo', '/getquote', '/blog'];

/** Routes genuinely localized for de/nl/it (everything else is an EN fallback rewrite). */
const DNI_LOCAL = ['/', '/pricing', '/demo', '/getquote'];

/** Locale-exclusive pages with no equivalent anywhere else. */
const LOCALE_ONLY_PAGES: Partial<Record<LocaleCode, string[]>> = {
    nl: ['/arbeidstijdregistratie-2027', '/demo/bedankt'],
    de: ['/demo/danke'],
    it: ['/demo/grazie'],
    fr: ['/demo/merci'],
    'fr-ch': ['/demo/merci'],
};

function isLocaleOnly(cur: LocaleCode, rest: string): boolean {
    return (LOCALE_ONLY_PAGES[cur] ?? []).includes(rest);
}

/**
 * Locale-specific slugs that are semantic equivalents across locales
 * (no English page exists). Keys are canonical group names.
 */
const PAGE_EQUIV: Record<string, Partial<Record<LocaleCode, string>>> = {
    references: { fr: '/fr/cas-clients', de: '/de/referenzen', nl: '/nl/referenties', it: '/it/referenze' },
    security: { fr: '/fr/securite-donnees', 'fr-ch': '/fr-ch/securite-donnees', de: '/de/sicherheit-und-daten', nl: '/nl/beveiliging-en-gegevens', it: '/it/sicurezza-e-dati' },
};

function equivGroupFor(pathname: string): Partial<Record<LocaleCode, string>> | null {
    const clean = ('/' + pathname.replace(/^\/+/, '')).replace(/\/+$/, '') || '/';
    for (const group of Object.values(PAGE_EQUIV)) {
        if (Object.values(group).includes(clean)) return group;
    }
    return null;
}

export function splitLocale(pathname: string): { locale: LocaleCode; rest: string } {
    const clean = ('/' + pathname.replace(/^\/+/, '')).replace(/\/+$/, '') || '/';
    for (const code of LOCALE_CODES) {
        if (code === 'en') continue;
        if (clean === `/${code}`) return { locale: code, rest: '/' };
        if (clean.startsWith(`/${code}/`)) return { locale: code, rest: clean.slice(code.length + 1) || '/' };
    }
    return { locale: 'en', rest: clean };
}

function isShared(rest: string): boolean {
    return SHARED_ROOT_PATHS.some((p) => rest === p || rest.startsWith(p + '/'));
}

/**
 * Best equivalent of the current page in the target locale.
 * Never returns a URL that would 404: falls back to the locale's home
 * (or closest hub) when no equivalent page exists.
 */
export function altPathFor(pathname: string, target: LocaleCode): string {
    const { locale: cur, rest } = splitLocale(pathname);
    const trail = (p: string) => (p === '/' ? '/' : p + '/');

    const equiv = equivGroupFor(pathname);
    if (equiv) {
        const t = equiv[target];
        if (t) return t + '/';
        return target === 'en' ? '/' : `/${target}/`;
    }

    if (isLocaleOnly(cur, rest)) {
        if (target === cur) return trail(`/${cur}` + rest);
        return target === 'en' ? '/' : `/${target}/`;
    }

    if (isShared(rest)) return trail(rest); // shared root pages: same URL for every locale

    const isFrench = (l: LocaleCode) => l === 'fr' || l === 'fr-ch';

    // Normalize the current path to an English-shaped base path when possible.
    let enRest: string | null = rest;
    if (isFrench(cur)) {
        if (FR_MIRRORED.includes(rest)) {
            enRest = rest;
        } else if (rest.startsWith('/blog/')) {
            enRest = '/blog'; // FR post slugs have no EN twin -> EN blog index
        } else {
            enRest = null; // FR-only page (cas-clients, secteurs-soins/..., fonctionnalites/...)
        }
    }

    if (target === 'en') return trail(enRest ?? '/');

    if (target === 'fr-ch') {
        if (FR_CH_LOCAL.includes(rest)) return trail('/fr-ch' + (rest === '/' ? '' : rest));
        return '/fr-ch/';
    }
    if (target === 'fr') {
        if (isFrench(cur)) return trail('/fr' + (rest === '/' ? '' : rest));
        if (FR_MIRRORED.includes(rest)) return trail('/fr' + (rest === '/' ? '' : rest));
        if (rest.startsWith('/blog/')) return '/fr/blog/'; // EN post -> FR blog index
        return '/fr/';
    }

    // de / nl / it mirror every English route via fallback rewrites.
    const base = enRest ?? '/';
    return trail(`/${target}` + (base === '/' ? '' : base));
}

/**
 * hreflang alternates for the current page — ONLY true equivalents.
 * - Shared root pages (privacy/changelog) and FR-only pages: no alternates.
 * - English-shaped paths: en + de/nl/it (locale URLs deliberately serve these
 *   routes) + fr only when a real mirrored French page exists.
 * - EN blog posts/changelog entries have no French equivalent: no fr entry.
 */
export function hreflangAlternates(pathname: string): { code: LocaleCode | 'x-default'; path: string }[] {
    const { locale: cur, rest } = splitLocale(pathname);
    const trail = (p: string) => (p === '/' ? '/' : p + '/');
    const equiv = equivGroupFor(pathname);
    if (equiv) {
        return (Object.entries(equiv) as [LocaleCode, string][]).map(([code, path]) => ({ code, path: path + '/' }));
    }
    if (isShared(rest)) return [];
    if (isLocaleOnly(cur, rest)) return [];
    // Non-canonical fallback copies (EN content at a locale URL) emit no hreflang.
    const selfPath = trail(('/' + pathname.replace(/^\/+/, '')).replace(/\/+$/, '') || '/');
    if (canonicalPathFor(pathname) !== selfPath) return [];
    if ((cur === 'fr' || cur === 'fr-ch') && !FR_MIRRORED.includes(rest)) {
        // French-only pages: emit the fr/fr-CH pair only where a Swiss twin exists
        if (FR_CH_LOCAL.includes(rest)) {
            return [
                { code: 'fr', path: trail('/fr' + (rest === '/' ? '' : rest)) },
                { code: 'fr-ch', path: trail('/fr-ch' + (rest === '/' ? '' : rest)) },
            ];
        }
        return [];
    }
    if (rest.startsWith('/blog/')) return []; // posts exist in one language only
    const out: { code: LocaleCode | 'x-default'; path: string }[] = [
        { code: 'en', path: trail(rest) },
    ];
    if (FR_MIRRORED.includes(rest)) {
        out.push({ code: 'fr', path: trail('/fr' + (rest === '/' ? '' : rest)) });
        if (FR_CH_LOCAL.includes(rest)) out.push({ code: 'fr-ch', path: trail('/fr-ch' + (rest === '/' ? '' : rest)) });
    }
    for (const l of ['de', 'nl', 'it'] as LocaleCode[]) {
        if (DNI_LOCAL.includes(rest)) out.push({ code: l, path: trail(`/${l}` + (rest === '/' ? '' : rest)) });
    }
    out.push({ code: 'x-default', path: trail(rest) });
    return out;
}

/**
 * Canonical path for the current URL. Untranslated de/nl/it fallback routes
 * (EN content served at a locale URL) canonicalize to the English page;
 * everything else canonicalizes to itself.
 */
export function canonicalPathFor(pathname: string): string {
    const { locale: cur, rest } = splitLocale(pathname);
    const trail = (p: string) => (p === '/' ? '/' : p + '/');
    if (cur === 'de' || cur === 'nl' || cur === 'it') {
        if (!DNI_LOCAL.includes(rest) && !equivGroupFor(pathname) && !isLocaleOnly(cur, rest)) return trail(rest);
    }
    if (cur === 'fr-ch') {
        if (!FR_CH_LOCAL.includes(rest) && !equivGroupFor(pathname)) return trail('/fr' + (rest === '/' ? '' : rest));
    }
    return trail(('/' + pathname.replace(/^\/+/, '')).replace(/\/+$/, '') || '/');
}

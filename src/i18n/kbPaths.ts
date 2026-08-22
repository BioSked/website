/**
 * Knowledge base entry points per site locale, without importing the KB data
 * module (src/lib/kb.ts pulls in the full article snapshot). Swiss French reads
 * the French KB and Swiss German the German one; the English KB lives at the
 * site root like every other English page.
 */
import type { LocaleCode } from './locales';

const KB_LOCALE_FOR_SITE: Record<LocaleCode, 'en' | 'fr' | 'de' | 'nl' | 'it'> = {
    en: 'en',
    fr: 'fr',
    'fr-ch': 'fr',
    de: 'de',
    'de-ch': 'de',
    nl: 'nl',
    it: 'it',
};

export function kbHomeHref(locale: LocaleCode): string {
    const kb = KB_LOCALE_FOR_SITE[locale] ?? 'en';
    return kb === 'en' ? '/help/' : `/${kb}/help/`;
}

export function kbSupportHref(locale: LocaleCode): string {
    return `${kbHomeHref(locale)}kb-tickets/new/`;
}

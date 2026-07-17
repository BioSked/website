import { NAV_LINKS } from '@/consts';
import type { LocaleCode } from './locales';

/**
 * Per-locale navigation structures. Labels are translation keys resolved
 * through useTranslations() with each locale's common.json.
 *
 * - en: the biosked.com reference nav (from consts), untouched.
 * - fr: the French-market nav (specialties + cas clients), hrefs under /fr/.
 * - de/nl/it: the English structure with locale-prefixed hrefs — those URLs
 *   all exist thanks to the i18n fallback rewrites.
 */

const FR_NAV_LINKS = [
    {
        label: 'nav.product',
        alt: 'nav.product-subtitle',
        href: '/fr/',
        anchor: '#momentum',
        showMobile: true,
        showDesktop: true,
    },
    {
        label: 'nav.specialties',
        alt: 'nav.specialties-subtitle',
        href: '#',
        showMobile: true,
        showDesktop: true,
        subitems: [
            { label: 'nav.radiology', alt: 'nav.radiology-subtitle', href: '/fr/secteurs-soins/radiologie/', showDesktop: true, showMobile: true },
            { label: 'nav.anesthesia', alt: 'nav.anesthesia-subtitle', href: '/fr/secteurs-soins/anesthesie/', showDesktop: true, showMobile: true },
            { label: 'nav.emergency', alt: 'nav.emergency-subtitle', href: '/fr/secteurs-soins/urgences/', showDesktop: true, showMobile: true },
            { label: 'nav.healthcare-facilities', alt: 'nav.healthcare-facilities-subtitle', href: '/fr/secteurs-soins/etablissements-de-sante/', showDesktop: true, showMobile: true },
        ],
    },
    {
        label: 'nav.pricing',
        alt: 'nav.pricing-subtitle',
        href: '/fr/pricing/',
        showMobile: true,
        showDesktop: true,
    },
    {
        label: 'nav.case-studies',
        alt: 'nav.case-studies-subtitle',
        href: '/fr/cas-clients/',
        showMobile: true,
        showDesktop: true,
    },
    {
        label: 'nav.resources',
        alt: 'nav.resources-subtitle',
        href: '#',
        showDesktop: true,
        showMobile: true,
        subitems: [
            { label: 'nav.blog', alt: 'nav.blog-subtitle', href: '/fr/blog/', showDesktop: true, showMobile: true },
            { label: 'nav.whitepapers', alt: 'nav.whitepapers-subtitle', href: '/fr/ressources/', showDesktop: true, showMobile: true },
            { label: 'nav.about', alt: 'nav.about-subtitle', href: '/fr/about/', showDesktop: true, showMobile: true },
            { label: 'nav.careers', alt: 'nav.careers-subtitle', href: '/fr/careers/', showDesktop: true, showMobile: true },
        ],
    },
];

function prefixHrefs(links: typeof NAV_LINKS, prefix: string) {
    const fix = (href: string) => {
        if (!href || href === '#' || href.startsWith('http') || href.startsWith(prefix + '/')) return href;
        return href === '/' ? prefix + '/' : prefix + href;
    };
    return links.map((link) => ({
        ...link,
        href: fix(link.href),
        subitems: link.subitems?.map((sub) => ({ ...sub, href: fix(sub.href) })),
    }));
}

const REFERENCES_PATH: Record<string, string> = { de: '/de/referenzen', nl: '/nl/referenties', it: '/it/referenze' };

const FR_CH_LOCAL_HREFS = ['/fr/', '/fr/pricing', '/fr/demo', '/fr/getquote', '/fr/securite-donnees', '/fr/mentions-legales'];

function reprefixFrNav(prefix: string) {
    // Only the pages that exist in the Swiss locale are re-prefixed; deep
    // French content (secteurs, cas clients, blog) is shared with /fr.
    const fix = (href: string) => (href && FR_CH_LOCAL_HREFS.includes(href) ? prefix + href.slice(3) : href);
    return FR_NAV_LINKS.map((link) => ({
        ...link,
        href: fix(link.href),
        subitems: link.subitems?.map((sub) => ({ ...sub, href: fix(sub.href) })),
    }));
}

export function navLinksFor(locale: LocaleCode) {
    if (locale === 'en') return NAV_LINKS;
    if (locale === 'fr') return FR_NAV_LINKS;
    if (locale === 'fr-ch') return reprefixFrNav('/fr-ch');
    const links = prefixHrefs(NAV_LINKS, `/${locale}`);
    // Insert the references page after the first item (Product)
    return [
        links[0],
        { label: 'nav.references', alt: 'nav.references-subtitle', href: REFERENCES_PATH[locale], showMobile: true, showDesktop: true },
        ...links.slice(1),
    ];
}

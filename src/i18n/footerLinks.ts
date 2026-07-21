import { frChLocalPathFor, type LocaleCode } from './locales';

/**
 * Per-locale footer content. Kept as literal strings (no t() layer) — the
 * footer is simple enough that one structure per locale reads clearer.
 * Support links point at the market's knowledge base.
 */
export interface FooterLocale {
    hqLines: [string, string];
    privacyLabel: string;
    sections: { title: string; links: { name: string; href: string }[] }[];
}

const EN: FooterLocale = {
    hqLines: ['Americas Headquarter: Rochester, New York', 'Europe Headquarter: Geneva, Switzerland'],
    privacyLabel: 'Privacy Policy',
    sections: [
        {
            title: 'Momentum',
            links: [
                { name: 'Product', href: '/' },
                { name: 'Pricing', href: '/pricing/' },
                { name: 'Support', href: 'https://kb.biosked.com/en/knowledge/kb-tickets/new' },
                { name: 'Changelog', href: '/changelog/' },
            ],
        },
        {
            title: 'Company',
            links: [
                { name: 'Blog', href: '/blog/' },
                { name: 'About us', href: '/about/' },
                { name: 'Careers', href: '/careers/' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/biosked/' },
            ],
        },
    ],
};

const FR: FooterLocale = {
    hqLines: ['Siège Amériques : Rochester, New York', 'Siège Europe : Genève, Suisse'],
    privacyLabel: 'Politique de confidentialité',
    sections: [
        {
            title: 'Momentum',
            links: [
                { name: 'Produit', href: '/fr/' },
                { name: 'Tarifs', href: '/fr/pricing/' },
                { name: 'Cas clients', href: '/fr/cas-clients/' },
                { name: 'Support', href: 'https://kb.biosked.com/fr/knowledge/kb-tickets/new' },
                { name: 'Changelog', href: '/changelog/' },
            ],
        },
        {
            title: 'Société',
            links: [
                { name: 'Blog', href: '/fr/blog/' },
                { name: 'Livres blancs', href: '/fr/ressources/' },
                { name: 'À propos', href: '/fr/about/' },
                { name: 'Carrières', href: '/fr/careers/' },
                { name: 'Sécurité & données', href: '/fr/securite-donnees/' },
                { name: 'Mentions légales', href: '/fr/mentions-legales/' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/biosked/' },
            ],
        },
    ],
};

const DE: FooterLocale = {
    hqLines: ['Hauptsitz Amerika: Rochester, New York', 'Hauptsitz Europa: Genf, Schweiz'],
    privacyLabel: 'Datenschutzerklärung',
    sections: [
        {
            title: 'Momentum',
            links: [
                { name: 'Produkt', href: '/de/' },
                { name: 'Preise', href: '/de/pricing/' },
                { name: 'Referenzen', href: '/de/referenzen/' },
                { name: 'Support', href: 'https://kb.biosked.com/en/knowledge/kb-tickets/new' },
                { name: 'Changelog', href: '/changelog/' },
            ],
        },
        {
            title: 'Unternehmen',
            links: [
                { name: 'Blog', href: '/de/blog/' },
                { name: 'Über uns', href: '/de/about/' },
                { name: 'Karriere', href: '/de/careers/' },
                { name: 'Sicherheit & Daten', href: '/de/sicherheit-und-daten/' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/biosked/' },
            ],
        },
    ],
};

const NL: FooterLocale = {
    hqLines: ['Hoofdkantoor Amerika: Rochester, New York', 'Hoofdkantoor Europa: Genève, Zwitserland'],
    privacyLabel: 'Privacybeleid',
    sections: [
        {
            title: 'Momentum',
            links: [
                { name: 'Product', href: '/nl/' },
                { name: 'Prijzen', href: '/nl/pricing/' },
                { name: 'Referenties', href: '/nl/referenties/' },
                { name: 'Arbeidstijdregistratie 2027', href: '/nl/arbeidstijdregistratie-2027/' },
                { name: 'Support', href: 'https://kb.biosked.com/en/knowledge/kb-tickets/new' },
                { name: 'Changelog', href: '/changelog/' },
            ],
        },
        {
            title: 'Bedrijf',
            links: [
                { name: 'Blog', href: '/nl/blog/' },
                { name: 'Over ons', href: '/nl/about/' },
                { name: 'Vacatures', href: '/nl/careers/' },
                { name: 'Beveiliging & gegevens', href: '/nl/beveiliging-en-gegevens/' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/biosked/' },
            ],
        },
    ],
};

const IT: FooterLocale = {
    hqLines: ['Sede Americhe: Rochester, New York', 'Sede Europa: Ginevra, Svizzera'],
    privacyLabel: 'Informativa sulla privacy',
    sections: [
        {
            title: 'Momentum',
            links: [
                { name: 'Prodotto', href: '/it/' },
                { name: 'Prezzi', href: '/it/pricing/' },
                { name: 'Referenze', href: '/it/referenze/' },
                { name: 'Support', href: 'https://kb.biosked.com/en/knowledge/kb-tickets/new' },
                { name: 'Changelog', href: '/changelog/' },
            ],
        },
        {
            title: 'Azienda',
            links: [
                { name: 'Blog', href: '/it/blog/' },
                { name: 'Chi siamo', href: '/it/about/' },
                { name: 'Carriere', href: '/it/careers/' },
                { name: 'Sicurezza e dati', href: '/it/sicurezza-e-dati/' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/biosked/' },
            ],
        },
    ],
};

const FR_CH: FooterLocale = {
    ...FR,
    sections: FR.sections.map((s) => ({
        ...s,
        links: s.links.map((l) => ({ ...l, href: frChLocalPathFor(l.href) })),
    })),
};

const FOOTER_BY_LOCALE: Record<LocaleCode, FooterLocale> = { en: EN, fr: FR, 'fr-ch': FR_CH, de: DE, nl: NL, it: IT };

export function footerFor(locale: LocaleCode): FooterLocale {
    return FOOTER_BY_LOCALE[locale] ?? EN;
}

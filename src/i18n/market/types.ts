/**
 * Per-market localized content beyond the homepage basics.
 * One file per locale in src/i18n/market/{locale}.ts implements MarketContent.
 * Consumed by src/pages/{locale}/demo.astro, pricing.astro and index.astro.
 */
export interface MarketContent {
    /** Customer quote band on the homepage (translated quote, original attribution). */
    quote: {
        text: string;
        author: string;   // e.g. "Dr Frédéric Cavallotto"
        role: string;     // localized role + organization + country
        stats: { value: string; label: string }[]; // exactly 3, published proof points only
    };
    demo: {
        metaTitle: string;
        metaDescription: string;
        heading: string;
        sub: string;
        formTitle: string;
        steps?: string[];       // what-happens-next, 3 short lines
        privacyNote?: string;   // one-line GDPR/hosting reassurance under the form
        formId?: string;        // per-locale HubSpot form (defaults to the shared form)
    };
    /** Optional quote-request page copy; falls back to demo copy when absent. */
    getquote?: {
        metaTitle: string;
        metaDescription: string;
        heading: string;
        sub: string;
        formTitle: string;
        formId?: string;        // per-locale HubSpot form (defaults to the shared form)
    };
    /** Thank-you page shown after form submission (noindex). */
    thankyou?: {
        slug: string;    // e.g. 'danke'
        title: string;
        heading: string;
        body: string;    // expectation-setting, real commitments only
        back: string;    // label of the back-to-home link
    };
    /** Optional localized security/data page. */
    security?: {
        metaTitle: string;
        metaDescription: string;
        kicker: string;
        heading: string;
        lead: string;
        points: { title: string; text: string }[]; // 6 items mirroring /fr/securite-donnees
        contactLine: string; // may contain {mail} placeholder rendered as info@biosked.com link
    };
    /** Optional localized references/case-summaries page. */
    references?: {
        metaTitle: string;
        metaDescription: string;
        kicker: string;
        heading: string;
        lead: string;
        featured: {
            org: string;
            specialty: string;
            factsLine: string;
            paragraphs: string[]; // 2-3 short paragraphs
            quote: { text: string; author: string; role: string };
            stats: { value: string; label: string }[]; // 3
        };
        others: { org: string; specialty: string; line: string }[]; // 4-6 one-liners w/ concrete facts
        languageNote: string; // "full case studies available in French" + link text
        fullStudiesLabel: string; // label of the link to /fr/cas-clients
        demoCta: string;
    };
    pricing: {
        metaTitle: string;
        metaDescription: string;
        kicker: string;      // small uppercase label, e.g. "Preise"
        heading: string;
        lead: string;
        anchor?: string;     // entry price anchor line (may contain <strong>)
        includedTitle: string;
        included: { title: string; text: string }[]; // 4-6 items: what a subscription includes
        faqTitle: string;
        faq: { q: string; a: string }[]; // 4-6 market-relevant questions
        demoCta: string;
        quoteCta: string;
    };
}

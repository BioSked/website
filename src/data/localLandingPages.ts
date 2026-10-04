/**
 * Scheduled landing pages in every locale (src/scheduled/landing/<key>.json),
 * rendered by src/pages/[...scheduled].astro with LocalLandingPage.astro.
 * Dates live in src/data/publishSchedule.mjs.
 */
export interface LocalLandingPage {
    key: string;
    locale: string;
    path: string;
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    description: string;
    painsHeading: string;
    primaryPain: string;
    pains: string[];
    outcomesHeading: string;
    outcomes: string[];
    quote?: { text: string; cite: string; href?: string };
    sections?: { heading: string; paragraphs: string[] }[];
    proof: string;
    faq?: { q: string; a: string }[];
    resource?: { label: string; href: string };
    related: { label: string; href: string }[];
    labels: {
        demo: string;
        secondary?: string;
        secondaryHref?: string;
        momentumEyebrow: string;
        proofEyebrow: string;
        faqHeading: string;
        imageAlt: string;
    };
}

const modules = import.meta.glob<{ default: LocalLandingPage }>('../scheduled/landing/*.json', { eager: true });

export const LOCAL_LANDING_PAGES: LocalLandingPage[] = Object.values(modules).map((m) => m.default);

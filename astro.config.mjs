import { defineConfig } from 'astro/config';
import { readdirSync } from 'node:fs';

import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeAddClasses from './src/lib/rehypeAddClasses.mjs';
import rehypeRaw from 'rehype-raw';
import rehypeUnwrapImages from 'rehype-unwrap-images';

// Legacy biosked.fr blog URLs lived at /blog/<fr-slug>. The posts now live at
// /fr/blog/<fr-slug>, so we 301 every one of them. Combined with a
// path-preserving host redirect (biosked.fr/* -> biosked.com/*) at retirement
// time, every historical French URL keeps resolving.
const frBlogSlugs = readdirSync('./src/pages/fr/blog')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
const frBlogRedirects = Object.fromEntries(
    frBlogSlugs.map((s) => [`/blog/${s}`, { destination: `/fr/blog/${s}`, status: 301 }])
);

// Same story for the French feature/sector landing pages (slugs are stable,
// defined in src/data/frLandingPages.ts).
const FR_FEATURE_SLUGS = [
    'planification-optimisee-automatiquement-2',
    'plannings-de-garde-centralises',
    'gestion-des-requetes-des-equipes',
    'communication-et-diffusion',
    'rapports-et-statistiques',
    'badgeage-et-suivi-rh',
];
const FR_SECTOR_SLUGS = [
    'radiologie',
    'anesthesie',
    'cardiologie',
    'urgences',
    'etablissements-de-sante',
    'autres-specialites-medicales',
];
const frLandingRedirects = Object.fromEntries([
    ...FR_FEATURE_SLUGS.map((s) => [`/fonctionnalites/${s}`, { destination: `/fr/fonctionnalites/${s}`, status: 301 }]),
    ...FR_SECTOR_SLUGS.map((s) => [`/secteurs-soins/${s}`, { destination: `/fr/secteurs-soins/${s}`, status: 301 }]),
]);

// Until 28 Jul 2026 the de, de-ch, nl and it trees served English fallback copies
// of the blog, about and careers pages (canonical to the English page). Google
// still requests those addresses, so each one goes to the page it copied.
const RETIRED_FALLBACK_LOCALES = ['de', 'de-ch', 'nl', 'it'];
const enBlogSlugs = readdirSync('./src/pages/blog/posts')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
const retiredFallbackRedirects = Object.fromEntries(
    RETIRED_FALLBACK_LOCALES.flatMap((l) => [
        [`/${l}/blog`, { destination: '/blog', status: 301 }],
        [`/${l}/about`, { destination: '/about', status: 301 }],
        [`/${l}/careers`, { destination: '/careers', status: 301 }],
        ...enBlogSlugs.map((s) => [`/${l}/blog/posts/${s}`, { destination: `/blog/posts/${s}`, status: 301 }]),
    ])
);

export default defineConfig({
    site: 'https://biosked.com',
    output: 'static',

    image: {
        dangerouslyProcessSVG: true,
    },

    prefetch: {
        defaultStrategy: 'hover',
        prefetchAll: false,
    },

    i18n: {
        locales: ['en', 'fr', 'fr-ch', 'de', 'de-ch', 'nl', 'it'],
        defaultLocale: 'en',
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: false,
        },
    },

    integrations: [
        react(),
        sitemap({
            filter: (page) => {
                if (page === 'https://biosked.com/privacy/') return false;
                // Journée clients JFR 2026 : pages d'inscription non indexées, hors sitemap.
                if (page.startsWith('https://biosked.com/fr/jfr-2026/')) return false;
                // Astro's fr-ch -> fr fallback can surface synthetic /fr-ch-ch/
                // routes to the sitemap integration. They are not real pages.
                if (page.includes('/fr-ch-ch/') || page.includes('/de-ch-ch/')) return false;
                if (/\/demo\/(merci|danke|bedankt|grazie)\//.test(page)) return false;
                // de/de-ch/nl/it/fr-ch: only genuinely localized routes
                const m = page.match(/^https:\/\/biosked\.com\/(de|de-ch|nl|it|fr-ch)\/(.*)$/);
                const allowed = {
                    de: ['', 'demo/', 'pricing/', 'getquote/', 'referenzen/', 'sicherheit-und-daten/', 'ratgeber/dienstplan-aerzte/'],
                    'de-ch': ['', 'demo/', 'pricing/', 'getquote/', 'referenzen/', 'sicherheit-und-daten/', 'impressum/', 'ratgeber/dienstplan-aerzte/'],
                    nl: ['', 'demo/', 'pricing/', 'getquote/', 'referenties/', 'beveiliging-en-gegevens/', 'arbeidstijdregistratie-2027/', 'gids/wachtrooster-artsen/'],
                    it: ['', 'demo/', 'pricing/', 'getquote/', 'referenze/', 'sicurezza-e-dati/', 'guida/turni-di-guardia-medici/'],
                    'fr-ch': ['', 'pricing/', 'demo/', 'getquote/', 'securite-donnees/', 'mentions-legales/', 'guide/planning-de-garde-medecins/'],
                };
                // The knowledge base is fully translated for de/nl/it; de-ch and fr-ch read de/fr.
                if (m && m[2].startsWith('help/')) return ['de', 'nl', 'it'].includes(m[1]);
                // The changelog is published in en, fr, de, nl and it; de-ch and fr-ch read de/fr.
                if (m && m[2].startsWith('changelog/')) return ['de', 'nl', 'it'].includes(m[1]);
                if (m) return allowed[m[1]].includes(m[2]);
                return true;
            },
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en',
                    fr: 'fr',
                    'fr-ch': 'fr-CH',
                    de: 'de',
                    'de-ch': 'de-CH',
                    nl: 'nl',
                    it: 'it',
                },
            },
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
        build: {
            cssCodeSplit: true,
        },
        server: {
            watch: {
                usePolling: true,
            },
        },
    },

    // Legacy redirects, three families:
    //  1. inherited biosked.com slugs -> EN pages
    //  2. legacy biosked.fr WordPress URLs -> /fr/ pages
    //  3. generated: old FR blog + landing-page paths -> /fr/ equivalents
    //  4. generated: retired de/de-ch/nl/it fallback copies -> the English page
    redirects: {
        ...frBlogRedirects,
        ...frLandingRedirects,
        ...retiredFallbackRedirects,
        "fr/blog/257-ameliorations-plus-tard-ce-que-vos-tickets-nous-ont-appris": { destination: "/fr/blog/257-ameliorations-plus-tard-tout-ce-que-nous-avons-corrige", status: 301 },

        // --- guide folders (one guide per locale for now): no 404 on the folder URL ---
        "guides": { destination: "/guides/physician-call-schedule", status: 301 },
        "de/ratgeber": { destination: "/de/ratgeber/dienstplan-aerzte", status: 301 },
        "de-ch/ratgeber": { destination: "/de-ch/ratgeber/dienstplan-aerzte", status: 301 },
        "nl/gids": { destination: "/nl/gids/wachtrooster-artsen", status: 301 },
        "it/guida": { destination: "/it/guida/turni-di-guardia-medici", status: 301 },
        "fr-ch/guide": { destination: "/fr-ch/guide/planning-de-garde-medecins", status: 301 },

        // --- inherited biosked.com legacy slugs (EN) ---
        "bookdemo": { destination: "/demo", status: 301 },
        "schedule-a-demo": { destination: "/demo", status: 301 },
        "contact-sales": { destination: "/demo", status: 301 },
        "contact": { destination: "/demo", status: 301 },
        "about-biosked/leadership-team": { destination: "/about", status: 301 },
        "category/news": { destination: "/blog", status: 301 },
        "the-first-rvu-based-multi-time-zone-scheduling-platform-for-radiology-teams": { destination: "/blog/posts/2025-11-05-rvu-based-scheduling", status: 301 },
        "momentum-update-a-shift-based-view-for-better-on-the-ground-coordination": { destination: "/blog/posts/2025-07-03-shift-view", status: 301 },
        "ai-a-powerful-lever-for-optimizing-team-schedules-in-healthcare-settings": { destination: "/blog/posts/2025-03-15-optimizing-team-schedules", status: 301 },
        "biosked-reinvents-medical-team-scheduling-with-the-new-version-of-momentum": { destination: "/blog/posts/2025-01-29-medical-team-scheduling", status: 301 },
        "5-myths-of-healthcare-staff-scheduling-software": { destination: "/blog/posts/2024-01-31-five-healthcare-myths", status: 301 },
        "the-year-of-improved-workforce-management": { destination: "/blog/posts/2023-12-21-year-2024", status: 301 },
        "the-costly-implications-of-staff-turnover-in-healthcare-organizations": { destination: "/blog/posts/2023-11-29-rising-costs-in-healthcare", status: 301 },
        "scheduling-struggles-the-implications-of-manual-staff-scheduling": { destination: "/blog/posts/2023-11-06-manual-staff-scheduling-implications", status: 301 },
        "revolutionizing-healthcare-management-why-healthcare-scheduling-software-is-essential": { destination: "/blog/posts/2023-10-24-revolution-healthcare-scheduling", status: 301 },
        "innovative-solutions-for-smarter-anesthesia-scheduling": { destination: "/blog/posts/2023-10-17-smarter-anesthesia", status: 301 },
        "benefits-of-automating-physician-scheduling-software": { destination: "/blog/posts/2023-10-17-schedule-automation-benefits", status: 301 },
        "prescription-for-efficient-healthcare": { destination: "/blog/posts/2023-10-03-prescription-efficient-healthcare", status: 301 },
        "a-game-changer-in-healthcare-how-staff-scheduling-software-streamlines-operations": { destination: "/blog/posts/2023-09-21-healthcare-game-changer", status: 301 },
        "optimize-physician-scheduling": { destination: "/blog/posts/2023-08-09-physician-scheduling-ai", status: 301 },
        "10-reasons-for-physician-scheduling-software": { destination: "/blog/posts/2023-08-09-five-reasons-to-automate", status: 301 },
        "scheduling-myths-that-ruin-efficiency": { destination: "/blog/posts/2023-08-09-scheduling-myths", status: 301 },
        "healthcare-scheduling-requests": { destination: "/blog/posts/2023-08-09-scheduling-requests", status: 301 },
        "creating-culturef-physician-wellness": { destination: "/blog/posts/2022-09-04-culture-of-physician-wellness", status: 301 },
        "improving-your-practices-scheduling-understanding-equity": { destination: "/blog/posts/2022-05-15-understanding-equity", status: 301 },
        "consequences-of-improper-scheduling": { destination: "/blog/posts/2022-03-15-consequences-improper-scheduling", status: 301 },
        "press-release-healthcare-scheduling-software": { destination: "/blog/posts/2021-11-02-biosked-independence", status: 301 },

        // --- legacy biosked.fr WordPress URLs (FR) ---
        "blog/posts/fr/2025-07-03-shift-view": { destination: "/fr/blog/nouveaute-momentum-une-vue-par-shift-pour-une-meilleure-coordination-sur-le-terrain", status: 301 },
        "accueil-biosked": { destination: "/fr/", status: 301 },
        // renamed WordPress posts, still linked from 2023-2025 HubSpot emails
        "blog/intelligence-artificielle-remplacer-activite-radiologue": { destination: "/fr/blog/lintelligence-artificielle-peut-elle-remplacer-a-terme-lactivite-du-radiologue", status: 301 },
        "blog/perspectives-pour-le-marche-radiologie-france-monde": { destination: "/fr/blog/perspectives-pour-le-marche-de-la-radiologie-en-france-et-dans-le-monde", status: 301 },
        "blog/teleradiologie-solution-long-terme": { destination: "/fr/blog/la-teleradiologie-une-solution-a-long-terme", status: 301 },
        "demander-une-demo": { destination: "/fr/demo", status: 301 },
        "demander-une-demonstration": { destination: "/fr/demo", status: 301 },
        // Legacy biosked.nl slug (host-level 301s forward the path here;
        // the .nl legal-page slug is identical to the .fr one, already mapped)
        "een-demonstratie-aanvragen": { destination: "/nl/demo", status: 301 },
        "ressources": { destination: "/fr/ressources", status: 301 },
        "ressources/livre-blanc": { destination: "/fr/ressources", status: 301 },
        "ressources/temoignages": { destination: "/fr/cas-clients", status: 301 },
        "la-societe-biosked": { destination: "/fr/about", status: 301 },
        "la-societe-biosked/nous-connaitre": { destination: "/fr/about", status: 301 },
        "la-societe-biosked/lequipe": { destination: "/fr/about/#equipe", status: 301 },
        "la-societe-biosked/nous-rejoindre-2": { destination: "/fr/careers", status: 301 },
        "secteurs-soins": { destination: "/fr/#specialites", status: 301 },
        "fonctionnalites": { destination: "/fr/#fonctionnalites", status: 301 },
        "essais-cliniques": { destination: "/fr/secteurs-soins/etablissements-de-sante", status: 301 },
        "mentions-legales-politique-de-confidentialite": { destination: "/fr/mentions-legales", status: 301 },
        "note-de-version": { destination: "/fr/changelog", status: 301 },
        "note-de-version-momentum": { destination: "/fr/changelog", status: 301 },
        "support": { destination: "/fr/help/kb-tickets/new", status: 301 },
        "theme/actualites": { destination: "/fr/blog", status: 301 },
        "theme/biosked": { destination: "/fr/blog", status: 301 },
        "theme/anesthesie": { destination: "/fr/secteurs-soins/anesthesie", status: 301 },
        "theme/cardiologie": { destination: "/fr/secteurs-soins/cardiologie", status: 301 },
        "theme/radiologie": { destination: "/fr/secteurs-soins/radiologie", status: 301 },
        "theme/urgences": { destination: "/fr/secteurs-soins/urgences", status: 301 },
        "theme/recrutement": { destination: "/fr/careers", status: 301 },
        "blog/layout_category/archives": { destination: "/fr/blog", status: 301 },
        "blog/layout_category/nouveau-modele": { destination: "/fr/blog", status: 301 },
    },

    markdown: {
        processor: unified({
            rehypePlugins: [
                // Parse raw HTML in migrated posts so the article classes below reach it too.
                rehypeRaw,
                rehypeUnwrapImages,
                [rehypeAddClasses, {
                    h1: 'text-display-section font-bold text-center max-w-xl mx-auto mb-6',
                    h2: 'text-display-card font-bolder mt-8 sm:mt-12 mb-4 sm:mb-6',
                    h3: 'text-xl font-bold mt-6 sm:mt-8 mb-2 sm:mb-4',
                    h4: 'font-semibold mt-4 sm:mt-6',
                    p: 'mb-3 sm:mb-4 text-foreground/85 [&>img]:border-none [&>img]:shadow-none [&>img]:mb-0 [&>img]:bg-secondary/5',
                    img: 'mb-8 rounded sm:mb-12 border border-secondary/15 shadow-xl shadow-secondary/10',
                    strong: 'text-foreground font-semibold',
                    ul: "mb-6 list-none pl-5 text-foreground/85 [&>li]:before:content-['•'] [&>li]:before:-ml-6 [&>li]:before:mr-2",
                    ol: "mb-6 list-[upper-roman] pl-5 text-foreground/85 [&>li]:pl-2",
                    li: "my-2 pl-2 before:text-secondary/25 marker:text-accent",
                    hr: 'my-6 md:my-10',
                    table: 'block md:table w-full max-w-2xl mx-auto mb-6 overflow-x-auto border-collapse text-sm md:text-base',
                    th: 'text-left align-bottom font-semibold text-foreground border-b-2 border-secondary/25 py-2 pr-4',
                    td: 'align-top text-foreground/85 border-b border-secondary/10 py-2.5 pr-4',
                    a: 'text-accent hover:underline',
                    blockquote: 'py-4 [&>p]:bg-primary/10 [&>p]:rounded-r [&>p]:p-4 [&>p]:pl-6 [&>p]:border-l [&>p]:border-cyan-500 [&>p]:border-l-2',
                    pre: 'mb-3 sm:mb-4 text-foreground/85 !bg-secondary/10 !text-secondary rounded-sm p-3 text-sm',
                    code: 'text-sm bg-secondary/5 border border-secondary/10 text-secondary rounded-sm px-1.5 py-0.5 font-medium',
                }],
            ],
        }),
    },
});

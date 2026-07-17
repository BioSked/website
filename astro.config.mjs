import { defineConfig } from 'astro/config';
import { readdirSync } from 'node:fs';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeAddClasses from 'rehype-add-classes';
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

export default defineConfig({
    site: 'https://biosked.com',
    output: 'static',

    experimental: {
        svgo: true,
    },

    prefetch: {
        defaultStrategy: 'hover',
        prefetchAll: false,
    },

    i18n: {
        locales: ['en', 'fr', 'fr-ch', 'de', 'nl', 'it'],
        defaultLocale: 'en',
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: false,
            fallbackType: 'rewrite',
        },
        // de/nl/it pages that are not localized yet serve the English content
        // at their own URL. French is fully localized, so no fallback.
        fallback: {
            'fr-ch': 'fr',
            de: 'en',
            nl: 'en',
            it: 'en',
        },
    },

    integrations: [
        mdx(),
        react(),
        sitemap({
            filter: (page) => {
                if (page === 'https://biosked.com/privacy/') return false;
                if (page.includes('/changelog/') || page.includes('/internal-testing/')) return false;
                if (/\/demo\/(merci|danke|bedankt|grazie)\//.test(page)) return false;
                // de/nl/it: only genuinely localized routes; EN-fallback rewrites stay out
                const m = page.match(/^https:\/\/biosked\.com\/(de|nl|it|fr-ch)\/(.*)$/);
                const allowed = {
                    de: ['', 'demo/', 'pricing/', 'getquote/', 'referenzen/', 'sicherheit-und-daten/'],
                    nl: ['', 'demo/', 'pricing/', 'getquote/', 'referenties/', 'beveiliging-en-gegevens/', 'arbeidstijdregistratie-2027/'],
                    it: ['', 'demo/', 'pricing/', 'getquote/', 'referenze/', 'sicurezza-e-dati/'],
                    'fr-ch': ['', 'pricing/', 'demo/', 'getquote/', 'securite-donnees/', 'mentions-legales/'],
                };
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
            rollupOptions: {
                output: {
                    manualChunks: {
                        'react-vendor': ['react', 'react-dom'],
                        'form-vendor': ['react-hook-form', '@hookform/resolvers'],
                    },
                },
            },
        },
        server: {
            watch: {
                usePolling: true,
            },
        },
    },

    // Legacy redirects, three families:
    //  1. inherited biosked.com slugs (mirrors BioSked/website) -> EN pages
    //  2. legacy biosked.fr WordPress URLs -> /fr/ pages
    //  3. generated: old FR blog + landing-page paths -> /fr/ equivalents
    redirects: {
        ...frBlogRedirects,
        ...frLandingRedirects,

        // --- inherited biosked.com legacy slugs (EN) ---
        "bookdemo": { destination: "/demo", status: 301 },
        "schedule-a-demo": { destination: "/demo", status: 301 },
        "contact-sales": { destination: "/demo", status: 301 },
        "about-biosked/leadership-team": { destination: "/about", status: 301 },
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
        "demander-une-demo": { destination: "/fr/demo", status: 301 },
        "ressources": { destination: "/fr/ressources", status: 301 },
        "ressources/livre-blanc": { destination: "/fr/ressources", status: 301 },
        "ressources/temoignages": { destination: "/fr/cas-clients", status: 301 },
        "la-societe-biosked": { destination: "/fr/about", status: 301 },
        "la-societe-biosked/nous-connaitre": { destination: "/fr/about", status: 301 },
        "la-societe-biosked/lequipe": { destination: "/fr/about#equipe", status: 301 },
        "la-societe-biosked/nous-rejoindre-2": { destination: "/fr/careers", status: 301 },
        "secteurs-soins": { destination: "/fr/#specialites", status: 301 },
        "fonctionnalites": { destination: "/fr/#fonctionnalites", status: 301 },
        "essais-cliniques": { destination: "/fr/secteurs-soins/etablissements-de-sante", status: 301 },
        "mentions-legales-politique-de-confidentialite": { destination: "/fr/mentions-legales", status: 301 },
        "note-de-version": { destination: "/changelog", status: 301 },
        "note-de-version-momentum": { destination: "/changelog", status: 301 },
        "support": { destination: "https://kb.biosked.com/fr/knowledge/kb-tickets/new", status: 301 },
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
        rehypePlugins: [
            rehypeUnwrapImages,
            [rehypeAddClasses, {
                h1: 'text-display-section font-bold text-center max-w-xl mx-auto mb-6',
                h2: 'text-display-card font-bolder mt-8 sm:mt-12 mb-4 sm:mb-6',
                h3: 'text-xl font-bold mt-6 sm:mt-8 mb-2 sm:mb-4',
                h4: 'font-semibold mt-4 sm:mt-6',
                p: 'mb-3 sm:mb-4 text-foreground/85 [&>img]:border-none [&>img]:shadow-none [&>img]:mb-0 [&>img]:bg-secondary/5',
                img: 'mb-8 rounded sm:mb-12 border border-secondary/15 shadow-xl shadow-secondary/10',
                strong: 'text-foreground font-semibold',
                ul: "mb-6 list-none pl-5 text-foreground/85 [&>li]:before:content-['—'] [&>li]:before:-ml-6 [&>li]:before:mr-2",
                ol: "mb-6 list-[upper-roman] pl-5 text-foreground/85 [&>li]:pl-2",
                li: "my-2 pl-2 before:text-secondary/25 marker:text-accent",
                hr: 'my-6 md:my-10',
                a: 'text-accent hover:underline',
                blockquote: 'py-4 [&>p]:bg-primary/10 [&>p]:rounded-r [&>p]:p-4 [&>p]:pl-6 [&>p]:border-l [&>p]:border-cyan-500 [&>p]:border-l-2',
                pre: 'mb-3 sm:mb-4 text-foreground/85 !bg-secondary/10 !text-secondary rounded-sm p-3 text-sm',
                code: 'text-sm bg-secondary/5 border border-secondary/10 text-secondary rounded-sm px-1.5 py-0.5 font-medium'
            }]
        ]
    }
});

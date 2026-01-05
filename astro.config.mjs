import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeAddClasses from 'rehype-add-classes';

export default defineConfig({
    site: 'https://biosked.com',
    output: 'static',
    // outDir: './docs', // change to docs when pushing build manually (instead of using GH workflow)

    experimental: {
        svgo: true,
    },

    prefetch: {
        defaultStrategy: 'hover',
        prefetchAll: false,
    },

    i18n: {
        locales: ["en", "fr"],
        defaultLocale: "en",
        prefixDefaultLocale: false, // let's make English URL shorter and easily accessible eg: biosked.com/pricing
        redirectToDefaultLocale: true,
        fallback: {
          fr: "en"
        },
        routing: {
          fallbackType: "rewrite"
        }
    },

    integrations: [
        mdx(), 
        react(), 
        sitemap({
            filter: (page) => page !== 'https://biosked.com/privacy/',
        })
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
            }
        }
    },

    // Redirects legacy pages (mostly dating from the old Wordpress website)
    redirects: {
        "bookdemo": {
            destination: "/demo",
            status: 301
        },
        "schedule-a-demo": {
            destination: "/demo",
            status: 301
        },
        "contact-sales": {
            destination: "/demo",
            status: 301
        },
        "about-biosked/leadership-team": {
            destination: "/about",
            status: 301
        },
        "the-first-rvu-based-multi-time-zone-scheduling-platform-for-radiology-teams": {
            destination: "/blog/posts/2025-11-05-rvu-based-scheduling",
            status: 301
        },
        "momentum-update-a-shift-based-view-for-better-on-the-ground-coordination": {
            destination: "/blog/posts/2025-07-03-shift-view",
            status: 301
        },
        "ai-a-powerful-lever-for-optimizing-team-schedules-in-healthcare-settings": {
            destination: "/blog/posts/2025-03-15-optimizing-team-schedules",
            status: 301
        },
        "biosked-reinvents-medical-team-scheduling-with-the-new-version-of-momentum": {
            destination: "/blog/posts/2025-01-29-medical-team-scheduling",
            status: 301
        },
        "5-myths-of-healthcare-staff-scheduling-software": {
            destination: "/blog/posts/2024-01-31-five-healthcare-myths",
            status: 301
        },
        "the-year-of-improved-workforce-management": {
            destination: "/blog/posts/2023-12-21-year-2024",
            status: 301
        },
        "the-costly-implications-of-staff-turnover-in-healthcare-organizations": {
            destination: "/blog/posts/2023-11-29-rising-costs-in-healthcare",
            status: 301
        },
        "scheduling-struggles-the-implications-of-manual-staff-scheduling": {
            destination: "/blog/posts/2023-11-06-manual-staff-scheduling-implications",
            status: 301
        },
        "revolutionizing-healthcare-management-why-healthcare-scheduling-software-is-essential": {
            destination: "/blog/posts/2023-10-24-revolution-healthcare-scheduling",
            status: 301
        },
        "innovative-solutions-for-smarter-anesthesia-scheduling": {
            destination: "/blog/posts/2023-10-17-smarter-anesthesia",
            status: 301
        },
        "benefits-of-automating-physician-scheduling-software": {
            destination: "/blog/posts/2023-10-17-schedule-automation-benefits",
            status: 301
        },
        "prescription-for-efficient-healthcare": {
            destination: "/blog/posts/2023-10-03-prescription-efficient-healthcare",
            status: 301
        },
        "a-game-changer-in-healthcare-how-staff-scheduling-software-streamlines-operations": {
            destination: "/blog/posts/2023-09-21-healthcare-game-changer",
            status: 301
        },
        "optimize-physician-scheduling": {
            destination: "/blog/posts/2023-08-09-physician-scheduling-ai",
            status: 301
        },
        "10-reasons-for-physician-scheduling-software": {
            destination: "/blog/posts/2023-08-09-five-reasons-to-automate",
            status: 301
        },
        "scheduling-myths-that-ruin-efficiency": {
            destination: "/blog/posts/2023-08-09-scheduling-myths",
            status: 301
        },
        "healthcare-scheduling-requests": {
            destination: "/blog/posts/2023-08-09-scheduling-requests",
            status: 301
        },
        "creating-culturef-physician-wellness": {
            destination: "/blog/posts/2022-09-04-culture-of-physician-wellness",
            status: 301
        },
        "improving-your-practices-scheduling-understanding-equity": {
            destination: "/blog/posts/2022-05-15-understanding-equity",
            status: 301
        },
        "consequences-of-improper-scheduling": {
            destination: "/blog/posts/2022-03-15-consequences-improper-scheduling",
            status: 301
        },
        "press-release-healthcare-scheduling-software": {
            destination: "/blog/posts/2021-11-02-biosked-independence",
            status: 301
        },
    },

    markdown: {
        rehypePlugins: [
            [rehypeAddClasses, {
                h1: 'max-w-2xl mx-auto text-display-section font-bold text-center max-w-xl mx-auto mb-6',
                h2: 'max-w-2xl mx-auto text-display-card mt-8 sm:mt-12 mb-4 sm:mb-6',
                h3: 'max-w-2xl mx-auto font-semibold mt-4 sm:mt-6',
                p: 'redacted mb-3 sm:mb-4 text-foreground/85',
                strong: 'text-foreground font-semibold',
                ul: "max-w-2xl mx-auto mb-6 list-none pl-5 text-foreground/85 [&>li]:before:content-['▪︎'] [&>li]:before:-ml-6 [&>li]:before:mr-2",
                ol: "max-w-2xl mx-auto mb-6 list-[upper-roman] pl-5 text-foreground/85 [&>li]:pl-2",
                li: "my-3 before:text-accent marker:text-accent",
                img: 'mb-8 sm:mb-15 rounded shadow-xl shadow-secondary/10 border border-secondary/15',
                hr: 'my-6 md:my-10 max-w-2xl mx-auto',
                a: 'text-accent hover:underline',
                blockquote: 'py-4 [&>p]:bg-primary/10 [&>p]:rounded-r [&>p]:p-4 [&>p]:pl-6 [&>p]:border-l [&>p]:border-cyan-500 [&>p]:border-l-2',
                pre: 'redacted mb-3 sm:mb-4 text-foreground/85 !bg-secondary/10 !text-secondary rounded-sm p-3 text-sm',
            }]
        ]
    }
});
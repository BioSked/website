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
        "/the-first-rvu-based-multi-time-zone-scheduling-platform-for-radiology-teams": {
            destination: "/blog/posts/2025-11-05-rvu-based-scheduling",
            status: 301
        },
        "ai-a-powerful-lever-for-optimizing-team-schedules-in-healthcare-settings": {
            destination: "/blog/posts/2025-03-15-optimizing-team-schedules",
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
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
  markdown: {
    rehypePlugins: [
      [rehypeAddClasses, {
        'h1': 'text-display-section font-bold',
        'h2': 'text-display-card mt-6 sm:mt-10',
        'h3': 'font-semibold',
        'p': 'py-4 sm:py-6 text-foreground/80',
        'strong': 'text-foreground font-semibold'
      }]
    ]
  }
});
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://biosked.com',
  output: 'static',
  outDir: './docs',
  
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
    sitemap()
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
  }
});
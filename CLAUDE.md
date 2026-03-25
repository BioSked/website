# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

BioSked marketing website for the Momentum healthcare scheduling product. Built with Astro 5 + React 19 + Tailwind CSS 4. Static site with multilingual support (English/French) using Astro's Islands architecture.

## Commands

```bash
npm run dev       # Development server with hot reload
npm run build     # Production build (static HTML)
npm run preview   # Preview production build locally
```

There are no lint, test, or format scripts configured. ESLint and Prettier configs exist but have no npm scripts.

## Architecture

- **Static only** — all pages use `export const prerender = true`, no SSR
- **Astro components** (`.astro`) for static content, **React** (`.tsx`) for interactive islands
- **Hydration directives**: use `client:idle`, `client:visible`, or `client:load` sparingly on React components
- **Dual UI components** exist: e.g., `Button.astro` + `button.tsx` — use the Astro version in `.astro` files
- **i18n**: English (default, no prefix) and French (`/fr/` prefix). Translations in `src/i18n/locales/{lang}/{namespace}.json`

## Key Paths

| Path | Purpose |
|------|---------|
| `src/pages/` | File-based routing |
| `src/components/sections/` | Page sections (Astro + React) |
| `src/components/ui/` | UI primitives (Astro + React versions) |
| `src/components/layout/` | Header, Footer, Navbar |
| `src/components/elements/` | Small reusable Astro components |
| `src/layouts/` | Page templates (BaseLayout, ArticleLayout, etc.) |
| `src/i18n/` | Translation system and locale JSON files |
| `src/pages/blog/posts/` | English blog posts (markdown) |
| `src/pages/blog/posts/fr/` | French blog posts |
| `src/pages/changelog/` | Changelog entries (markdown) |
| `src/consts.ts` | Site config, nav links, feature flags |
| `src/styles/global.css` | Tailwind imports + CSS design tokens |
| `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `astro.config.mjs` | Build config, redirects, i18n, markdown styling |

## Path Aliases

```
@/*           → ./src/*
@components/* → ./src/components/*
@layouts/*    → ./src/layouts/*
@lib/*        → ./src/lib/*
```

## Conventions

- **TypeScript strict mode** — all components should be type-safe
- **Tailwind CSS 4** with Vite plugin — design tokens are CSS variables in `global.css`
- Use `cn()` from `@lib/utils` for conditional class composition
- Markdown elements get automatic styling via `rehype-add-classes` in `astro.config.mjs` — don't add manual classes in markdown
- Blog post filenames follow `YYYY-MM-DD-article-title.md` format
- Blog frontmatter requires: `title`, `description`, `author`, `date`, `image`
- Icons: use `lucide-astro` in `.astro` files, `lucide-react` in `.tsx` files
- Forms use React Hook Form + Zod validation
- Modal forms triggered via custom events (e.g., `open-get-started`)

## Deployment

- **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)
- Auto-deploys on push to `main`
- Site URL: `https://biosked.com`

## Environment Variables

See `.env.example` for required variables: `RESEND_API_KEY`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID`, `HUBSPOT_REGION`.

## Gotchas

- No API routes exist in `src/pages/` despite form components referencing `/api/*` endpoints
- Feature flags in `src/consts.ts` (`siteConfig.features`) gate several sections — check before adding content to disabled features
- Extensive legacy redirects from old WordPress URLs exist in `astro.config.mjs`
- Node.js version pinned in `.nvmrc` (20.17.0)

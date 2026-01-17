# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

BioSked marketing website built with Astro, React, and Tailwind CSS. This is a static site with multilingual support (English/French) featuring the Momentum product for healthcare scheduling software. The site uses Astro's Islands architecture with selective React hydration for interactive components.

## Development Commands

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI directly
npm run astro
```

Note: There are no lint, test, or format scripts configured in package.json. Code quality is managed manually.

## Build & Deployment

- **CI/CD**: Automated deployment via GitHub Actions (`.github/workflows/deploy.yml`)
- **Target**: GitHub Pages
- **Trigger**: Pushes to `main` branch or manual workflow dispatch
- **Build Tool**: Uses `withastro/action@v5` for building and deploying

## Architecture

### Core Stack
- **Astro 5** - Static site generator with file-based routing
- **React 19** - Component library for interactive elements (Islands architecture)
- **TypeScript** - Type safety with strict mode
- **Tailwind CSS 4** - Utility-first styling with custom design tokens
- **MDX** - Markdown content with JSX support for blog posts

### Key Architectural Patterns

**1. Astro Islands Architecture**
- Most pages are static Astro components (`.astro`)
- Interactive components are React (`.tsx`) and hydrated selectively
- Use `client:*` directives sparingly for React components
- All pages use `export const prerender = true` for static generation

**2. Internationalization (i18n)**
- Built-in Astro i18n with two locales: `en` (default), `fr`
- English URLs have no locale prefix (e.g., `/pricing`)
- French URLs are prefixed (e.g., `/fr/pricing`)
- Translation system in `src/i18n/`:
  - `i18n.ts`: Translation function with namespace support
  - `ui.ts`: Auto-loads JSON files from `locales/{lang}/{namespace}.json`
  - Usage: `const t = useTranslations(Astro.currentLocale)` then `t('key')`
  - Supports dot notation (e.g., `t('nav.home')`) and namespaces (e.g., `t('common:nav.home')`)

**3. Component Organization**
```
src/components/
├── elements/       # Small, reusable Astro components
├── layout/         # Header, Footer, Banner, Navbar
├── sections/       # Page sections (mostly React for interactivity)
└── ui/             # UI primitives (both Astro and React versions)
                    # Duplicates exist: Button.astro + button.tsx
```

**4. Layout System**
- `BaseLayout.astro`: Main layout with nav, footer, SEO
- `ArticleLayout.astro`: For blog posts with rich content styling
- `ChangelogLayout.astro`: For changelog entries
- `TermsLayout.astro`: For legal pages

**5. Path Aliases** (defined in `tsconfig.json`)
```typescript
"@/*"           → "./src/*"
"@components/*" → "./src/components/*"
"@layouts/*"    → "./src/layouts/*"
"@lib/*"        → "./src/lib/*"
```

### Content Management

**Blog Posts**
- Location: `src/pages/blog/posts/*.md` (English) and `src/pages/blog/posts/fr/*.md` (French)
- Collection: Defined in `src/content.config.ts` as `enPosts` collection
- Schema: `title`, `description`, `image`, `author`, `date`
- File naming: `YYYY-MM-DD-article-title.md`
- Images: Store in `src/assets/images/`
- Blog index: Auto-generates from collection, sorted by date (newest first)

**Adding a Blog Post**:
1. Create `YYYY-MM-DD-title.md` in `src/pages/blog/posts` or `src/pages/blog/posts/fr`
2. Include frontmatter: `title`, `description`, `author`, `date`, `image`
3. Add image to `src/assets/images/` if needed
4. Commit changes—site rebuilds automatically via GitHub Actions

**Markdown Styling**
- Custom classes applied via `rehype-add-classes` plugin (see `astro.config.mjs`)
- Headings, lists, links, blockquotes, code blocks all have pre-defined styles
- Don't add manual classes to markdown elements

**Changelog**
- Location: `src/pages/changelog/*.md`
- Collection: `enChangelogs` in `content.config.ts`
- Schema: Includes `version` field in addition to blog schema

### Routing & Pages

- File-based routing in `src/pages/`
- All production pages use `export const prerender = true` (static generation)
- 404 page: `src/pages/404.astro`
- Legacy redirects: Extensive list in `astro.config.mjs` (old WordPress URLs → new routes)

### Configuration & Constants

**`src/consts.ts`**: Central configuration file
- Site metadata (`SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_METADATA`)
- Navigation links (`NAV_LINKS`) with i18n support
- Feature flags (`siteConfig.features`) for showing/hiding sections
- SEO keywords for healthcare scheduling domain

**`astro.config.mjs`**: Build configuration
- Site URL: `https://biosked.com`
- i18n setup with fallback behavior
- Manual code splitting for React and form libraries
- SVG optimization enabled (`svgo: true`)
- Prefetch strategy: `hover` (prefetch on link hover)
- Legacy URL redirects from old WordPress site

### Styling

**Tailwind CSS**
- Tailwind 4 with Vite plugin
- Design tokens via CSS variables (defined in `src/styles/global.css`)
- Custom utilities: `class-variance-authority`, `clsx`, `tailwind-merge`
- Helper function: `cn()` in `src/lib/utils.ts` for conditional classes
- Typography plugin: `@tailwindcss/typography` for blog content
- Animation libraries: `tailwindcss-animate`, `tw-animate-css`
- Background noise filter applied via SVG in `BaseLayout.astro`

### Interactive Components

**UI Libraries**
- Radix UI primitives for React components (accordion, dialog, navigation-menu, tabs)
- Lucide icons for both Astro (`lucide-astro`) and React (`lucide-react`)
- Motion library for animations
- Embla Carousel for testimonials/carousels (with autoplay/autoscroll plugins)

**Forms**
- React Hook Form with Zod validation (`@hookform/resolvers`)
- Modal forms trigger via custom events (e.g., `open-get-started`)
- Forms reference `/api/*` endpoints but these don't exist in the repo (likely external or removed)

### Environment Variables

Required variables (see `.env.example`):
- `RESEND_API_KEY`: Email service
- `HUBSPOT_PORTAL_ID`: CRM integration
- `HUBSPOT_FORM_ID`: CRM form ID
- `HUBSPOT_REGION`: Region setting (e.g., `eu1`)

### Third-Party Integrations

- Google Tag Manager via `@digi4care/astro-google-tagmanager` (integrated in `BaseLayout.astro`)
- HubSpot forms embedded via script tag in `BaseLayout.astro`
- Sitemap generation with filters (excludes `/privacy/` and `/changelog/*`)

## Important Notes

- **Always use official Astro documentation** when working with Astro features
- No API routes currently exist in `src/pages/` despite form components referencing them
- Component duplication: Both Astro and React versions of UI components exist (e.g., `Button.astro` and `button.tsx`)
- When adding React components to Astro pages, use appropriate `client:*` directive (`client:idle`, `client:load`, etc.)
- Blog posts are markdown files in `pages/`, not in a separate `content/` directory, but managed via Content Collections
- The site uses static generation exclusively—no SSR or hybrid rendering
- Node version specified: See `.nvmrc` for required Node.js version

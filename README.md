# BioSked website

Source for [biosked.com](https://biosked.com), BioSked's public multilingual website.

## Stack

- Astro
- React islands
- TypeScript
- Tailwind CSS
- GitHub Pages

The site is statically generated. It has no server-side API routes and requires no runtime secrets.

## Local development

Requirements:

- Node.js version pinned in `.nvmrc` (currently 22.22.3)
- npm

```bash
npm ci --include=dev
npm run dev
```

The local site is available at `http://localhost:4321`.

## Quality checks

```bash
npm run check
npm run build
```

The type check validates all Astro, TypeScript and React source. The production build runs the analytics, locale and SEO checks and generates static fallback pages for legacy URLs.

Individual checks are also available:

```bash
npm run test:analytics
npm run test:locales
npm run test:seo
```

## Structure

- `src/pages/`: English and localized routes
- `src/components/`: shared Astro and React components
- `src/i18n/`: locale navigation and content mappings
- `src/assets/`: source images and media
- `public/`: files copied directly to the production site
- `scripts/`: build-time validation and redirect generation
- `astro.config.mjs`: site, locale, sitemap and legacy-route configuration

The English site is served at `/`. French is served at `/fr/` and `/fr-ch/`. German, Dutch and Italian are served at `/de/`, `/nl/` and `/it/`.

## Security

Everything sent to the browser is public. Analytics measurement IDs and embedded form IDs are public identifiers, not credentials. Never add API keys, private-app tokens, customer data or production exports to this repository.

Report security issues privately as described in [SECURITY.md](.github/SECURITY.md).

## Deployment

A validated push to `main` deploys the static build through GitHub Pages. Legacy redirects are generated at build time from the rules in `astro.config.mjs`.

See [CONTRIBUTING.md](CONTRIBUTING.md) before changing the site.

Copyright © BioSked. All rights reserved.

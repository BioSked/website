# Contributing

BioSked maintains this repository as the source for its public website. Changes should be narrow, reviewable and safe to publish.

## Before making changes

- Never commit credentials, customer data, production exports or internal documents.
- Assume all source files, Git metadata, workflow logs and artifacts are public.
- Remove author, device, location and editing metadata from new media before committing it.
- Put local configuration in ignored files, not in the repository.

## Development

```bash
npm ci --include=dev
npm run dev
```

Use the Node.js version pinned in `.nvmrc`.

## Required verification

Run the full production build before submitting a change:

```bash
npm run check
npm run build
```

This includes analytics, locale and SEO validation. For visual changes, also check the affected pages at desktop and mobile widths and confirm that navigation, consent and forms still work.

## Repository conventions

- Keep locale navigation symmetrical unless a deliberate locale-specific route is documented.
- Add legacy routes to `astro.config.mjs`; do not hand-edit generated redirect pages.
- Do not add client-side code that expects a server endpoint on this static site.
- Treat browser-visible analytics and form identifiers as public. Private API tokens do not belong in frontend code.
- Keep operational recovery procedures and internal review notes outside this public repository.

## Security reports

Do not open a public issue for a suspected vulnerability. Follow [the private reporting instructions](.github/SECURITY.md).

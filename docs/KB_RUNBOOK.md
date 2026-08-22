# Knowledge base runbook

The Momentum knowledge base is published on biosked.com (English at `/help/`,
the other locales at `/{fr,de,nl,it}/help/`). The team keeps writing articles
in HubSpot; this site mirrors them.

## How content flows

1. The team edits articles in HubSpot (Service > Knowledge base), in English and
   French, exactly as before.
2. `scripts/sync-hubspot-kb.mjs` reads the public sitemap and article pages of
   **content.biosked.com**, a HubSpot secondary domain bound to the same
   knowledge base. It runs on every deployment and hourly via
   `.github/workflows/kb-refresh.yml`, and only fetches pages whose `lastmod`
   changed. The result is `src/data/generated/hubspot-kb.json`.
3. German, Dutch and Italian are a translation overlay
   (`src/data/generated/kb-translations.json`, produced by
   `scripts/kb-merge-translations.py` from `scripts/kb-i18n/`). They do not
   update themselves: `scripts/kb-translation-staleness.mjs` prints, at every
   build, the source articles that changed after the translations were made.
4. `src/lib/kb.ts` merges both files and the pages under `src/pages/help/` and
   `src/pages/[lang]/help/` render them.

## Why content.biosked.com exists

`kb.biosked.com` and `kb.biosked.fr`, the old public addresses, redirect every
article to its new URL on biosked.com (HubSpot URL redirects, one pattern per
host and language). A redirected page cannot be scraped, so the sync reads a
third address that is never linked and never redirected. It has the same
HubSpot flags as the old `.fr` host (`isUsedForKnowledge`, not primary) and a
`robots.txt` disallow, so it does not compete with biosked.com in search.

Article images stay on `kb.biosked.com/hs-fs/...`: the redirect rules only
match `/{lang}/knowledge/` paths, so images keep serving from the established
host and the sync host stays invisible in page source.

DNS: `content.biosked.com CNAME 25195055.group0.sites.hscoscdn-eu1.net`, in
Google Cloud DNS, zone `biosked-com-public`. Do not delete it: without it the
sync fails and the knowledge base stops updating (the last good site stays
online, a failed sync blocks the deployment).

## Redirects to maintain

- HubSpot > Settings > Content > Domains & URLs > URL Redirects: the
  `kb.biosked.com/*` and `kb.biosked.fr/*` rules to `biosked.com`.
- `src/pages/404.astro`: sends old `/kb-preview/...` links (the pre-launch
  preview) to the new paths.
- `astro.config.mjs`: the legacy `/support` slug goes to `/fr/help/kb-tickets/new`.

## Rollback

Each step reverses independently:

- Site: revert the go-live commits and push; GitHub Pages redeploys.
- Redirects: delete the HubSpot URL redirect rules; the HubSpot pages are still
  there and come back instantly.
- Sync source: switch `SOURCE_ORIGIN` in `scripts/sync-hubspot-kb.mjs` back to
  a non-redirected host.

## Verification gates

```bash
npm run check
npm run build          # runs test:kb, test:seo, test:kb:dist and the style check
node scripts/e2e/kb-ui-e2e.mjs   # KB_LOCALES=en,fr,de,nl,it against a local dist server
```

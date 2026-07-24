# Knowledge Base Preview and Rollback

## What this release changes

- Adds a noindex preview at `/kb-preview/` with English and French knowledge-base routes.
- Pulls article bodies, categories, translations, images and metadata from the published HubSpot knowledge base.
- Embeds the existing English and French HubSpot support forms, so form configuration and Help Desk routing remain owned in HubSpot.
- Refreshes changed knowledge-base pages every hour and during normal website deployments.
- Does not change `kb.biosked.com`, its DNS, the current HubSpot theme, or existing support links.

## Content refresh behavior

The sync reads the HubSpot sitemap, compares each page's `lastmod` value with the checked-in snapshot, and fetches only changed or new pages. Deleted pages disappear from the next generated preview. A failed sync stops the deployment, leaving the last successful site online.

The forms are loaded directly from HubSpot at runtime. Form edits therefore appear without a website rebuild.

## Preview rollback

The current HubSpot knowledge base stays live throughout the preview. There is no customer-facing cutover to undo.

To remove the preview:

1. Revert the knowledge-base preview release commit on `main`.
2. Let the standard GitHub Pages workflow deploy the revert.
3. Confirm `/kb-preview/` returns 404 and `https://kb.biosked.com/en/knowledge` still returns 200.

If only the automatic refresh is misbehaving, disable the `Refresh Knowledge Base Preview` workflow. The last successful Pages deployment stays online.

## Production cutover guardrail

Do not point `kb.biosked.com` at the custom frontend until the preview is approved and the authenticated HubSpot GraphQL sync has passed in CI.

The rollback DNS target observed before this work was:

```text
kb.biosked.com -> 25195055.group0.sites.hscoscdn-eu1.net
IPv4: 199.60.103.2, 199.60.103.254
```

Before a future DNS cutover, record the live DNS response again. If the replacement fails, restore that then-current HubSpot target and verify both language home pages and both support forms.

## Verification gates

A release is valid only when all of these pass:

```bash
npm run check
npm run build
npm run test:kb
npm run test:kb:dist
```

The build verifies every generated article and category route, search-index coverage, canonical links, noindex protection, image alt attributes, internal links and both existing HubSpot form IDs.

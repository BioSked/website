# Cookie-free visit counter

biosked.com counts visits without cookies, so the numbers include European
visitors who never answer the consent banner (Google Analytics only runs after
"Allow").

## What is recorded

One Firestore document per hit, in collection `hits` of the Firebase project
`biosked-site-stats` (database `(default)`, location `eur3`, EU):

| Field | Meaning |
|---|---|
| `e` | `pv` page view, `tpl` template download, `demo` / `quote` button click, `lead` completed form |
| `p` | page path, without query string or fragment |
| `x` | target: template file, demo or quote path, or the form event name |
| `r` | referring site host name (empty for our own pages) |
| `s` `m` `c` | `utm_source`, `utm_medium`, `utm_campaign` (values that look like contact details are dropped) |
| `l` | site language |
| `exp` | expiry, 760 days after the visit |

No cookie, no local storage write, no IP address, no user agent, no identifier.
The document creation time gives the date. Nothing is sent from localhost or
previews, from automated browsers, after "Block", or with Global Privacy Control.

Code: `src/lib/siteStats.mjs` (rules shared with the tests) and
`src/components/SiteStats.astro`, included in `BaseLayout.astro`. Tests:
`scripts/test-analytics.mjs`. The privacy policy (`src/pages/privacy.astro`,
EN and FR) describes it.

## Security rules

`firestore.rules`: browsers may only create a hit with the fields above,
bounded lengths and an expiry about 25 months ahead. Nobody can read, change
or delete hits from the web. Deploy after a change:

    cd site-stats && npx firebase-tools deploy --only firestore:rules --project biosked-site-stats

Rules take about a minute to apply.

## Dashboard

https://biosked-site-stats.web.app (Firebase Hosting, folder `dashboard/`).
Sign in with a BioSked Google account; only addresses listed in
`isViewer()` in `firestore.rules` can read the numbers. To add someone, add
their address there and deploy the rules. Deploy the page after a change:

    cd site-stats && npx firebase-tools deploy --only hosting --project biosked-site-stats

The page is not indexed (noindex header) and holds no data itself.

## Reading the numbers from the command line

    node scripts/site-stats-report.mjs            # last 7 days
    node scripts/site-stats-report.mjs --days 28
    node scripts/site-stats-report.mjs --cleanup  # also deletes expired hits

Needs an owner of the Firebase project (a local `firebase login`, or an access
token in `SITE_STATS_TOKEN`). The project is on the free Spark plan: 20,000
writes a day are free and writes beyond that are refused, not billed.
Firestore TTL deletion needs billing, so expired hits are removed with
`--cleanup` (the first ones expire in November 2028).

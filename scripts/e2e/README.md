# KB preview end-to-end tests

Browser-driven checks for the knowledge base preview. They run against a built
site, so start a static server on `dist/` first:

```
npm run build
(cd dist && python3 -m http.server 8899)
```

Both scripts need Chrome and the two CDP helpers:

```
npm i --no-save chrome-launcher chrome-remote-interface
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

## kb-ui-e2e.mjs

Desktop (1440), tablet (768) and mobile (375) passes over the KB home and an
article page: search results reachable and never clipped by an ancestor,
keyboard navigation, no horizontal overflow, images/tables/code inside the
viewport, tap-target sizes in the KB content, console and network health.

```
node scripts/e2e/kb-ui-e2e.mjs        # exits non-zero on any failure
```

## kb-support-e2e.mjs

Fills the real HubSpot support form on the KB preview page and submits it with
trusted mouse events, then reports the ticket stamp so routing can be checked in
HubSpot.

```
node scripts/e2e/kb-support-e2e.mjs fr
node scripts/e2e/kb-support-e2e.mjs en
```

NOTE: the form is protected by reCAPTCHA Enterprise, so an automated headless
run cannot complete the submission by design. The script still validates
everything up to the submit click (form renders, all fields present and
fillable, button reachable); completing the round trip needs a real browser
session. Treat a "NOT SUBMITTED" result with no validation errors as the
expected captcha outcome, not a regression.

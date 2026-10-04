# Redirects for BioSked's retired domains

biosked.com is the only website. Every other BioSked domain answers with
permanent (301) redirects served by Firebase Hosting, project
`momentum-firebase-87e95`. This folder is the source of truth for all the
redirect sites. DNS lives in Google Cloud DNS (project `momentum-335403`, one
zone per domain, e.g. `biosked-fr-public`); the domains are registered at
Infomaniak (Bio-Optronics Sàrl). The full picture is in the Domains & Web
Hosting runbook on SharePoint (Momentum > 05. General SaaS).

| Host | Firebase site (target) | Where it sends people |
|---|---|---|
| biosked.fr, www.biosked.fr | `biosked-fr-redirect` (`fr`) | the matching page on biosked.com, French pages under `/fr/` |
| kb.biosked.fr | `biosked-fr-kb-redirect` (`kbfr`) | the same article on biosked.com/help (`/fr/help/` for French) |
| go.biosked.fr | `biosked-fr-go-redirect` (`gofr`) | each old landing page to its biosked.com equivalent; meetings, files and unsubscribe links to go.biosked.com. **Not live yet:** DNS still points at HubSpot until after JFR 2026 |
| biosked.nl, www | `biosked-nl-redirect` (`nl`) | home to biosked.com/nl/; legacy paths to their final page; other paths kept as is |
| biosked.ch, www | `biosked-ch-redirect` (`ch`) | home to biosked.com/fr-ch/; legacy paths to their final page; other paths kept as is |
| biosked.net, www | `biosked-net-redirect` (`net`) | home to biosked.com/; legacy paths to their final page; other paths kept as is |
| blog.biosked.com | `biosked-blog-redirect` (`blog`) | the old WordPress blog: known posts to their biosked.com post, anything else to biosked.com/blog/ (DNS in zone `biosked-com-public`) |

Every legacy URL reaches its final page in one hop, trailing slash kept. GitHub Pages
cannot send a real 301, so the rules point at final pages, never at
biosked.com's own meta-refresh stubs.

## Change a rule

The biosked.fr rules come from the `redirects` map in `astro.config.mjs` (the
same source as `public/_redirects`); the same map also feeds the .nl, .ch and .net
sites. The kb and go rules are in `scripts/generate-firebase-redirects.mjs`. Edit, then:

```bash
node scripts/generate-redirects.mjs
node scripts/generate-firebase-redirects.mjs
cd firebase-redirects
npx firebase-tools deploy --only hosting:fr,hosting:kbfr,hosting:gofr,hosting:nl,hosting:ch,hosting:net,hosting:blog
cd ..
node scripts/test-firebase-redirects.mjs --live
```

Name the targets you changed: a bare `--only hosting` redeploys every site in
this file at once.
Deploying needs a Google account with access to `momentum-firebase-87e95`
(`npx firebase-tools login`). The project is on the free Spark plan: keep these
sites redirect-only, never host files here (shared 360 MB/day transfer quota).

## Switch go.biosked.fr (after JFR 2026)

In zone `biosked-fr-public`, replace `go.biosked.fr CNAME
25195055.sites.hscoscdn-eu1.net.` with `go.biosked.fr CNAME
biosked-fr-go-redirect.web.app.` (TTL 300). The Firebase certificate is
already issued. Firebase confirms ownership within a minute or two; then run
`node scripts/test-firebase-redirects.mjs --live --only=go`.

## Roll back

Firebase console > Hosting > the site > Release history > Roll back. To take a
host off Firebase entirely, point its DNS record elsewhere (TTL is 300 s on
biosked.fr).

# Redirects for the retired biosked.fr hosts

biosked.com is the only website. The old French hosts answer with permanent
(301) redirects served by Firebase Hosting, project `momentum-firebase-87e95`.
Their DNS lives in Google Cloud DNS, zone `biosked-fr-public` (project
`momentum-335403`); the domain is registered at Infomaniak.

| Host | Firebase site | Where it sends people |
|---|---|---|
| biosked.fr, www.biosked.fr | `biosked-fr-redirect` | the matching page on biosked.com, French pages under `/fr/` |
| kb.biosked.fr | `biosked-fr-kb-redirect` | the same article on biosked.com/help (`/fr/help/` for French) |
| go.biosked.fr | `biosked-fr-go-redirect` | biosked.com/fr/ (the old HubSpot landing pages are gone) |

Every legacy URL reaches its final page in one hop. GitHub Pages cannot send a
real 301, so the rules point at final pages, never at biosked.com's own
meta-refresh stubs.

## Change a rule

The biosked.fr rules come from the `redirects` map in `astro.config.mjs` (the
same source as `public/_redirects`). Edit the map or the generator, then:

```bash
node scripts/generate-redirects.mjs
node scripts/generate-firebase-redirects.mjs
cd firebase-redirects
npx firebase-tools deploy --only hosting:fr,hosting:kbfr,hosting:gofr
cd ..
node scripts/test-firebase-redirects.mjs --live
```

Deploying needs a Google account with access to `momentum-firebase-87e95`
(`npx firebase-tools login`). The project is on the free Spark plan: keep these
sites redirect-only, never host files here (shared 360 MB/day transfer quota).

## Roll back a deploy

Firebase console > Hosting > the site > Release history > Roll back. To take a host off Firebase entirely,
point its record in `biosked-fr-public` elsewhere (TTL is 300 s).

biosked.nl, biosked.ch and biosked.net use the same project with a plain
path-preserving rule each (sites `biosked-nl-redirect`, `biosked-ch-redirect`,
`biosked-net-redirect`); they are not managed from this folder.

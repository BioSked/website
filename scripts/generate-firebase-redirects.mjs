/**
 * Regenerates firebase-redirects/firebase.json: the 301 rules served by the
 * Firebase Hosting redirect sites (project momentum-firebase-87e95) for the
 * retired biosked.fr hosts.
 *
 *   biosked-fr-redirect     biosked.fr, www.biosked.fr  old WordPress site
 *   biosked-fr-kb-redirect  kb.biosked.fr               old HubSpot knowledge base
 *   biosked-fr-go-redirect  go.biosked.fr               old HubSpot landing pages
 *
 * Every legacy URL goes to its final biosked.com page in ONE hop (GitHub Pages
 * cannot send real 301s, so pointing at biosked.com's own redirect stubs would
 * add a meta-refresh hop). The exact rules come from the redirect map in
 * astro.config.mjs, the same source as public/_redirects.
 *
 * Run after editing redirects:  node scripts/generate-firebase-redirects.mjs
 * Deploy:  cd firebase-redirects && npx firebase-tools deploy --only hosting:fr,hosting:kbfr,hosting:gofr
 * Test:    node scripts/test-firebase-redirects.mjs [--live]
 */
import { writeFileSync } from 'node:fs';
import config from '../astro.config.mjs';

const ORIGIN = 'https://biosked.com';
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Directory-style destination, the form biosked.com serves without a second hop. */
function finalUrl(dest) {
    if (dest.startsWith('http')) return dest;
    const withSlash = dest.endsWith('/') || dest.includes('#') ? dest : `${dest}/`;
    return ORIGIN + withSlash;
}

const exact = Object.entries(config.redirects ?? {}).map(([from, to]) => {
    const path = String(from).replace(/^\/+|\/+$/g, '');
    const dest = typeof to === 'string' ? to : to.destination;
    return { regex: `^/${escapeRe(path)}/?$`, destination: finalUrl(dest), type: 301 };
});

const frSite = {
    target: 'fr',
    public: 'public',
    redirects: [
        { source: '/', destination: `${ORIGIN}/fr/`, type: 301 },
        ...exact,
        // WordPress feeds and sitemaps
        { regex: '^/(?:comments/)?feed/?$', destination: `${ORIGIN}/fr/rss.xml`, type: 301 },
        { regex: '^/.+/feed/?$', destination: `${ORIGIN}/fr/rss.xml`, type: 301 },
        { regex: '^/[a-z0-9_-]*sitemap[a-z0-9_.-]*\\.xml$', destination: `${ORIGIN}/sitemap-index.xml`, type: 301 },
        // WordPress archives and pagination that never had a page of their own
        { regex: '^/(?:category|tag|author)/.*$', destination: `${ORIGIN}/fr/blog/`, type: 301 },
        { regex: '^/(?:blog/)?page/[0-9]+/?$', destination: `${ORIGIN}/fr/blog/`, type: 301 },
        // The March 2025 open letter was linked from the old about page
        { source: '/wp-content/uploads/2025/03/Lettre-ouverte-FR.pdf', destination: `${ORIGIN}/fr/about/`, type: 301 },
        // Everything else: same path on biosked.com (its own legacy stubs and 404 page).
        // A regex, not the /:path* glob, because the glob drops the trailing slash.
        { regex: '^/(?P<rest>.*)$', destination: `${ORIGIN}/:rest`, type: 301 },
    ],
};

const kbSite = {
    target: 'kbfr',
    public: 'public',
    redirects: [
        { regex: '^/en/knowledge/?$', destination: `${ORIGIN}/help/`, type: 301 },
        { regex: '^/fr/knowledge/?$', destination: `${ORIGIN}/fr/help/`, type: 301 },
        { regex: '^/en/knowledge/kb-search-results/?$', destination: `${ORIGIN}/help/`, type: 301 },
        { regex: '^/fr/knowledge/kb-search-results/?$', destination: `${ORIGIN}/fr/help/`, type: 301 },
        { regex: '^/en/knowledge/(?P<rest>.+?)/?$', destination: `${ORIGIN}/help/:rest/`, type: 301 },
        { regex: '^/fr/knowledge/(?P<rest>.+?)/?$', destination: `${ORIGIN}/fr/help/:rest/`, type: 301 },
        // Article images and HubSpot files keep serving from kb.biosked.com
        { regex: '^/(?P<rest>(?:hs-fs|hubfs)/.*)$', destination: 'https://kb.biosked.com/:rest', type: 301 },
        { regex: '^/.*$', destination: `${ORIGIN}/help/`, type: 301 },
    ],
};

const goSite = {
    target: 'gofr',
    public: 'public',
    redirects: [
        { regex: '^/.*$', destination: `${ORIGIN}/fr/`, type: 301 },
    ],
};

const firebaseJson = { hosting: [frSite, kbSite, goSite] };
writeFileSync(new URL('../firebase-redirects/firebase.json', import.meta.url), JSON.stringify(firebaseJson, null, 2) + '\n');
console.log(`wrote firebase-redirects/firebase.json (${frSite.redirects.length} biosked.fr rules, ${exact.length} from astro.config.mjs)`);

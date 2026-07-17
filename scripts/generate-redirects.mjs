/**
 * Regenerates public/_redirects (Cloudflare Pages / Netlify format) from the
 * redirect map in astro.config.mjs, so the hosting-level 301s always match
 * the Astro meta-refresh fallback pages.
 *
 * Run after editing redirects:  node scripts/generate-redirects.mjs
 */
import { writeFileSync } from 'node:fs';
import config from '../astro.config.mjs';

const redirects = config.redirects ?? {};
const lines = [
    '# Hosting-level 301 redirects for Cloudflare Pages/Netlify.',
    '# GENERATED from astro.config.mjs by scripts/generate-redirects.mjs — do not edit by hand.',
    '# Astro static redirects also create fallback meta-refresh pages; SEO launch should use real 301s.',
    '',
];
for (const [from, to] of Object.entries(redirects)) {
    const src = '/' + String(from).replace(/^\/+/, '');
    const dest = typeof to === 'string' ? to : to.destination;
    const status = typeof to === 'string' ? 301 : (to.status ?? 301);
    const destOut = dest.startsWith('http') ? dest : (dest.endsWith('/') || dest.includes('#') ? dest : dest + '/');
    lines.push(`${src}/ ${destOut} ${status}`);
}
writeFileSync(new URL('../public/_redirects', import.meta.url), lines.join('\n') + '\n');
console.log(`wrote ${Object.keys(redirects).length} redirects to public/_redirects`);

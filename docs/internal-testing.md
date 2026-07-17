# Internal Testing Tutorial

## 1. Run It Locally

```bash
git clone https://github.com/BioSked/website-fr.git
cd website-fr
nvm use
npm install
npm run dev
```

Open `http://localhost:4321`.

Use these smoke-test URLs:

- `http://localhost:4321/`
- `http://localhost:4321/blog/`
- `http://localhost:4321/cas-clients/`
- `http://localhost:4321/secteurs-soins/radiologie/`
- `http://localhost:4321/secteurs-soins/anesthesie/`
- `http://localhost:4321/fonctionnalites/planification-optimisee-automatiquement-2/`
- `http://localhost:4321/demander-une-demo/` should redirect to `/demo/`

## 2. Share On The Same Network

```bash
ipconfig getifaddr en0
npm run dev -- --host 0.0.0.0 --port 4321
```

Share `http://YOUR_LOCAL_IP:4321` with teammates on the same Wi-Fi or VPN.

## 3. Test The Production Build

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4322
```

Open `http://localhost:4322`. This is closer to how the static site will behave after deployment.

## 4. Optional Hosted Preview

The GitHub Actions workflow currently only runs a build check. GitHub Pages is not enabled because the current BioSked GitHub plan does not support private Pages; enabling Pages would make the preview public.

For hosted internal testing, deploy the repo to a password-protected Vercel, Netlify, or Cloudflare Pages preview. Keep `public/robots.txt` as `Disallow: /` until launch.

## 5. Before Launch

Complete this checklist before pointing any production domain at this repo or merging it back under `biosked.com`:

- Change `public/robots.txt` from `Disallow: /` to `Allow: /`.
- Add the production `CNAME` only when DNS is ready.
- Keep all old `biosked.fr` URLs either as real pages or 301 redirects.
- Use the hosting-level redirects in `public/_redirects` on Cloudflare Pages or Netlify; Astro’s static fallback redirects are meta refresh pages and should not be the only SEO redirect mechanism at launch.
- Verify redirects with `curl -I https://domain/old-path/`.
- Recheck `astro.config.mjs` `site`, sitemap, canonical, and hreflang values for the final domain strategy.
- If merging into `biosked.com`, move these pages under the final French locale route and keep 301 redirects from `biosked.fr` to the matching French URLs.

# Rollback — restore the English-only biosked.com

The pre-multilingual site (English only) is preserved at:

- **Branch:** `en-only-backup`
- **Tag:** `en-only-2026-07-17` (commit `e411100`)

## Instant rollback (one command)

```bash
git fetch origin
git push origin refs/tags/en-only-2026-07-17^{commit}:main --force
```

GitHub Pages redeploys automatically on push (~2 minutes). That's it.

Do NOT touch the Pages settings during rollback: the site now uses
**workflow builds** (`build_type: workflow`) with the custom domain
**biosked.com set in repo Settings → Pages** (changed at launch, 17 Jul 2026 —
previously the domain lived in the legacy `docs/CNAME` file). Both the old and
new source trees build and deploy correctly under this configuration.

Non-force alternative (keeps history, adds a revert commit):

```bash
git checkout main && git pull
git revert --no-edit <first-multilingual-commit>..HEAD
git push origin main
```

## Roll forward again

The multilingual site remains on `BioSked/website-fr` main — re-sync from there
or `git revert` the revert.

## Notes

- The rollback restores the EN-only site *including* its pre-existing issues
  documented in `docs/EN-SITE-REVIEW-2026-07.md` ($4.99 pricing, testimonial
  misattributions, fabricated JSON-LD rating).
- `public/CNAME` (`newwebsite.biosked.com`) is identical in both versions —
  no DNS change is involved in either direction.

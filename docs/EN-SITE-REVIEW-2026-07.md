# EN site review ledger — from the multilingual biosked.com work (16 Jul 2026)

Findings on THIS repo's pages, surfaced by the site-wide critique run in `BioSked/website-fr`
(the multilingual biosked.com v1, where the FR/DE/NL/IT pages already apply the fixes below).
Full copy contract: `website-fr:migration/materials/messaging-brief.md`.

## Urgent — factual errors live on biosked.com

1. **`src/components/sections/TestimonialsCarouselSection.tsx` attributes Dr Frédéric Cavallotto
   to "UCLA Health"** while showing the CHIREC logo. He is chef du service des Urgences,
   Hôpital de Braine-l'Alleud (Groupe CHIREC), Belgium — the flagship EU case study.
   A real clinician with a fabricated affiliation, visible to any FR/BE prospect switching to EN.
2. Same file: **Bernard Bensadoun attributed to "Irimed"** — reconcile with IRIS GRIM
   (the quote is safest attributed to "Équipe de planification, IRIS GRIM" — see the published
   case-study PDF; the same fix was applied to the FR carousel in website-fr).

## High — structured data

3. **`src/components/BaseHead.astro` ships fabricated JSON-LD**: an `aggregateRating` of 4.8/150
   with no published review source (manual-action risk for self-serving review markup), an
   expired `$0` Offer (`priceValidUntil: 2025-12-31`), and a `SearchAction` pointing to a
   non-existent `/search`. website-fr already stripped these from its copy of the file —
   the diff can be cherry-picked.

## Business decision — pricing anchoring

4. EN `/pricing` publishes self-serve prices ($4.99/$8.99/$10.99 per provider/month) while all
   EU locales sell quote-based, ROI-framed pricing. On the merged single-domain site, a French
   buyer (price = #1 documented loss reason) is one language-switch from the $4.99 anchor.
   Options: geo/locale-aware pricing routing, or accept and brief sales on the anchoring risk.

## Voice ledger (when EN gets its own copy pass)

Per the messaging brief (expert-in-scheduling, ROI-forward, Marc-lens): naked-ratio hero claim
("10x faster" — no source), "Ready to Transform How Your Organization Schedules?" CTA
(rhetorical-question register), "The first solution built for RVU-based scheduling" (unscoped
first-claim), keywords meta not locale-aware. The EU pages demonstrate the target register:
problem in the buyer's vocabulary → mechanism → published number with attribution
(e.g. "4 days → 4–5 hours per month, CHIREC 2025").

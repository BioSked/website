# /legal/ pages

Localized, no-index pages that publish the Momentum General Terms and Conditions
and the authorised subprocessors (Annex 2, Schedule D). Seven locales: en at
`/legal/`, the others at `/<locale>/legal/`. The contract text exists in English
and French only; de, de-ch, nl and it show the English text with a localized frame.

## Regenerate the contract text

The HTML fragments are generated, never hand-edited.

```
pandoc "<GTC EN>.docx" -t html5 --wrap=none -o /tmp/terms-en.html
pandoc "<GTC FR>.docx" -t html5 --wrap=none -o /tmp/terms-fr.html
node scripts/legal/clean-terms-html.mjs /tmp/terms-en.html en
node scripts/legal/clean-terms-html.mjs /tmp/terms-fr.html fr
```

Then replace the PDFs in `public/legal/` and update `legalVersion.ts`
(version, issue date, status, effective date). The em dash is kept out of the
source through the `&mdash;` entity; the rendered text is the contract verbatim.

## Go-live checklist

1. Counsel-reviewed files in hand; regenerate the fragments and the PDFs.
2. `legalVersion.ts`: status `in-force`, effective date set.
3. Notify customers per GTC section 20 (30 days, 60 for material adverse changes).

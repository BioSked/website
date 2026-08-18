# KB article translation, shared rules

## Work economically (read this first)

Budget is limited. Translate directly, do not investigate.

**Only read these three files:** this one, `ui_glossary_core.json`, and your own
`batches/batchN.json`. Nothing else.

**Do not:** read `app_*.ts`, `work_items.json`, `ui_glossary_full.json` or the
website repo; write helper or extraction scripts; grep for house style; compare
with the French articles. If a term is not in the core glossary, just pick the
standard healthcare scheduling term and stay consistent. Translating well from
the text in front of you is the whole job.

Sequence: read the 3 files, translate, Write the output file, run the one
verification command, fix if it fails, report. Nothing more.

You translate BioSked knowledge base articles for the Momentum healthcare staff
scheduling product. Output must be production quality: a support agent and a
hospital scheduler will read it.

## Absolute rules

1. **Preserve the HTML exactly.** `bodyHtml` is real HTML. Keep every tag,
   attribute, class, id, order and nesting identical. Translate only human
   readable text nodes and `alt` / `title` attribute values. Never add, drop,
   reorder or reformat markup. Never pretty print. Never wrap in code fences.
2. **Keep English videos and all media untouched.** Do not modify any `src`,
   `href`, `data-*`, iframe embed, YouTube / Vimeo / Wistia / HubSpot video URL,
   image path or file name. Videos stay English on purpose. If surrounding prose
   introduces a video, translate that prose but leave the embed byte identical.
   You may translate a visible caption, never the URL.
3. **Never translate:** product and brand names (Momentum, BioSked, Momentum
   Staff Scheduler, Momentum Mobile, HubSpot), code, URLs, email addresses,
   instance names, file names, placeholders such as `{count}` or `%s`, and text
   inside `<code>` / `<pre>`.
4. **Use the UI glossary** (`ui_glossary_core.json`) for anything the user sees
   on screen: button labels, screen names, menu entries, field names. These are
   the strings actually shipped in the product, so a reader can match your text
   to the interface. When an article says "click **Assign**", the German must be
   the app's own "Zuweisen", not a synonym. If a term is missing from the
   glossary, choose the most common healthcare scheduling term and stay
   consistent across every article in your batch.
5. **Register:** German uses formal "Sie". Dutch uses formal "u". Italian uses
   the informal "tu" (this matches the existing biosked.com market pages and the
   app). Be natural, not literal: instructions should read as if written by a
   native support writer, short sentences, imperative for steps.
6. **No em dash (U+2014) anywhere.** Use a comma, colon, parentheses or a plain
   hyphen. This is a hard house rule and a build check enforces it.
7. Keep the meaning strictly. Do not add, remove, summarise or "improve"
   content, and invent nothing. If the source is ambiguous, translate literally.

## What to produce

For every input article, produce an object with exactly these keys:

```json
{
  "id": "<copy the id from the input, unchanged>",
  "title": "translated title",
  "description": "translated description (empty string if the input was empty)",
  "bodyHtml": "translated HTML, structurally identical to the input"
}
```

Return a JSON array of those objects, one per input article, in the same order,
and nothing else.

## Self check before you finish

- Same number of objects as input articles, ids unchanged.
- For each article: the count of `<` characters and the count of `href=` and
  `src=` occurrences match the source exactly.
- No em dash. No markdown fences. Valid JSON (escape quotes properly).
- Glossary terms used for on screen elements.

// Turns pandoc's HTML export of the Momentum General Terms (docx) into the
// fragments rendered at /legal/ and /legal/subprocessors/.
// Usage: pandoc terms.docx -t html5 --wrap=none -o /tmp/terms.html
//        node scripts/legal/clean-terms-html.mjs /tmp/terms.html en
// Writes src/components/legal/terms-<lang>.html and subprocessors-<lang>.html.
import { readFile, writeFile } from 'node:fs/promises';

const [, , input, lang] = process.argv;
if (!input || !lang) throw new Error('usage: clean-terms-html.mjs <pandoc-html> <en|fr>');
let html = await readFile(input, 'utf8');

// 1. Drop the title block: everything before section 1.
const firstSection = html.search(/<p><strong>1\. [^<]+<\/strong><\/p>/);
if (firstSection < 0) throw new Error('section 1 not found');
html = html.slice(firstSection);

// 2. Numbered section titles (a whole bold paragraph followed by a rule) become h2.
html = html.replace(/<p><strong>(\d+)\. ([^<]+)<\/strong><\/p>\s*<hr \/>/g, (_, n, t) => `<h2 id="s${n}">${n}. ${t}</h2>`);
// 3. Annex titles become h2 with a stable id.
html = html.replace(/<p><strong>(Annexe?) (\d+) \u2014 ([^<]+)<\/strong><\/p>(\s*<hr \/>)?/g, (_, a, n, t) => `<h2 id="annex${n}">${a} ${n}: ${t}</h2>`);
// 4. Bold-only paragraphs starting with an annex clause number (A1.2, A2.5 ...) become h3.
html = html.replace(/<p><strong>(A\d(?:\.\d+)*) ([^<]+)<\/strong><\/p>/g, (_, n, t) => `<h3 id="${n.toLowerCase().replace(/\./g, '-')}">${n} ${t}</h3>`);
// 5. Remaining rules are decoration in the docx.
html = html.replace(/<hr \/>\s*/g, '');
// 6. Typography: the repository forbids the literal em dash; keep the contract text
//    verbatim through the entity.
html = html.replace(/\u2014/g, '&mdash;');
html = html.replace(/\u00a0/g, '&nbsp;');

// 7. Subprocessor schedule: from the A2.5 heading to the change-notice paragraph.
const schedStart = html.search(/<h3 id="a2-5">/);
const schedEndMatch = html.slice(schedStart).match(/<p><em>[^<]*11\.4[^<]*<\/em><\/p>/);
if (schedStart < 0 || !schedEndMatch) throw new Error('schedule D not found');
const schedEnd = schedStart + schedEndMatch.index + schedEndMatch[0].length;
const schedule = html.slice(schedStart, schedEnd);

await writeFile(new URL(`../../src/components/legal/terms-${lang}.html`, import.meta.url), html.trim() + '\n');
await writeFile(new URL(`../../src/components/legal/subprocessors-${lang}.html`, import.meta.url), schedule.trim() + '\n');
console.log(`${lang}: terms ${html.length} chars, schedule ${schedule.length} chars`);

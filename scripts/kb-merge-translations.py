#!/usr/bin/env python3
"""
Merge the per-batch agent translations into src/data/generated/kb-translations.json.

Kept deliberately separate from hubspot-kb.json so that re-running
scripts/sync-hubspot-kb.mjs (which rewrites the HubSpot snapshot) never destroys
translated content. kb.ts overlays this file onto the source articles at build time.

Usage: python3 merge.py [de nl it]
"""
import json, os, re, sys, html, hashlib

EM_DASH = '\u2014'  # escaped: the repo style check forbids the literal character

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, '..', 'website')
SNAP = os.path.join(SITE, 'src', 'data', 'generated', 'hubspot-kb.json')
OUT = os.path.join(SITE, 'src', 'data', 'generated', 'kb-translations.json')

langs = sys.argv[1:] or ['de', 'nl', 'it']
snapshot = json.load(open(SNAP, encoding='utf-8'))
work = {w['id']: w for w in json.load(open(os.path.join(HERE, 'work_items.json'), encoding='utf-8'))}
shell = json.load(open(os.path.join(HERE, 'shell.json'), encoding='utf-8'))

def text_of(body):
    t = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', body or '', flags=re.S | re.I)
    t = re.sub(r'<[^>]+>', ' ', t)
    return re.sub(r'\s+', ' ', html.unescape(t)).strip()

def check(src, tr, lang, aid):
    problems = []
    for token in ('<', 'href=', 'src='):
        if src.count(token) != tr.count(token):
            problems.append(f'{lang}/{aid}: {token!r} count {src.count(token)} -> {tr.count(token)}')
    if EM_DASH in tr:
        problems.append(f'{lang}/{aid}: em dash present')
    # every URL in the source must survive untouched (videos stay English)
    urls = lambda s: sorted(re.findall(r'(?:href|src)="([^"]+)"', s))
    if urls(src) != urls(tr):
        problems.append(f'{lang}/{aid}: URL set changed')
    return problems

translations, problems, counts = {}, [], {}
for lang in langs:
    entries, seen = {}, set()
    for n in range(1, 5):
        path = os.path.join(HERE, 'out', f'{lang}_batch{n}.json')
        if not os.path.exists(path):
            problems.append(f'{lang}: MISSING out/{lang}_batch{n}.json')
            continue
        for item in json.load(open(path, encoding='utf-8')):
            aid = item['id']
            if aid in seen:
                problems.append(f'{lang}/{aid}: duplicate')
                continue
            seen.add(aid)
            src = work.get(aid)
            if not src:
                problems.append(f'{lang}/{aid}: unknown article id')
                continue
            problems.extend(check(src['bodyHtml'], item['bodyHtml'], lang, aid))
            body = item['bodyHtml']
            entries[aid] = {
                'title': item['title'].strip(),
                'description': (item.get('description') or '').strip(),
                'bodyHtml': body,
                'searchText': text_of(body)[:1200],
            }
    missing = [i for i in work if i not in entries]
    if missing:
        problems.append(f'{lang}: {len(missing)} articles missing, e.g. {missing[:3]}')
    counts[lang] = len(entries)
    translations[lang] = entries

payload = {
    'schemaVersion': 1,
    'generatedFrom': snapshot.get('contentHash'),
    'sourceArticleCount': len(work),
    'languages': langs,
    'categories': shell['categories'],
    'subcategories': shell['subcategories'],
    'copy': shell['copy'],
    'articles': translations,
}

print('counts:', counts, 'of', len(work), 'source articles')
if problems:
    print(f'\n{len(problems)} PROBLEM(S):')
    for p in problems[:25]:
        print('  -', p)
    if '--force' not in sys.argv:
        print('\nnot written (use --force to write anyway)')
        sys.exit(1)

json.dump(payload, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print(f'\nwrote {OUT} ({os.path.getsize(OUT)/1024:.0f} KB)')

#!/usr/bin/env python3
"""Turn each lesson script in pipeline/lessons/*.json into a readable lesson page
for the website: src/content/courses/claude-mastery/NN-name.md

Run from the repo root:   python3 pipeline/to_site.py
The video scripts stay the single source of truth — edit a lesson JSON,
run this, and the site lesson updates. (The trailer, lesson 00, is skipped.)"""
import glob, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'content', 'courses', 'claude-mastery')
os.makedirs(OUT, exist_ok=True)


def clean(s):
    s = re.sub(r'<br\s*/?>', ' ', str(s or ''))
    s = re.sub(r'</?(em|s|b|strong|span)[^>]*>', '', s)
    return s.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').strip()


def narration(lines):
    out = []
    for l in lines or []:
        out.append(clean(l.get('cap') or l.get('say') or '') if isinstance(l, dict) else clean(l))
    return ' '.join(x for x in out if x)


def bullets(items, a='t', b='d'):
    rows = []
    for it in items or []:
        t, d = clean(it.get(a)), clean(it.get(b))
        rows.append(f'- **{t}**' + (f' — {d}' if d else ''))
    return '\n'.join(rows)


def scene(s):
    t = s['type']
    head = clean(s.get('headline') or s.get('eyebrow') or s.get('chapter'))
    para = narration(s.get('lines'))
    md = []
    if t in ('title', 'next'):
        return ''
    if t == 'cameo':
        md += [f'> **{clean(s.get("quote"))}**', '> — Pat Diamitani', '', bullets(s.get('items'), 't', 'x')]
        return '\n'.join(md)
    md.append(f'## {head}')
    if t == 'statement':
        if s.get('sub'): md.append(clean(s['sub']))
    if para and t != 'recap': md.append(para)
    if t == 'orbit':
        md.append(bullets(s.get('orbit')))
        if s.get('chips'): md.append('Works in: ' + ', '.join(clean(c) for c in s['chips']) + '.')
    elif t in ('layers', 'cards'):
        md.append(bullets(s.get('items') or s.get('cards')))
    elif t == 'grid':
        for g in s.get('groups', []):
            md.append(f'### {clean(g.get("t"))}')
            md.append(bullets(g.get('cards')))
        if s.get('banner'): md.append(f'> {clean(s["banner"].get("t"))}')
    elif t == 'terminal':
        if s.get('sub'): md.append(clean(s['sub']))
        block = []
        for c in s.get('commands', []):
            block.append(clean(c['cmd']) if c.get('comment') else '$ ' + clean(c['cmd']))
            if c.get('out'): block.append(clean(c['out']))
        md.append('```bash\n' + '\n'.join(block) + '\n```')
        if s.get('callout'): md.append(f'> **{clean(s["callout"].get("label", "Tip"))}:** {clean(s["callout"].get("t"))}')
    elif t == 'steps':
        md.append('\n'.join(f'{i}. **{clean(x["t"])}** — "{clean(x.get("p"))}"' for i, x in enumerate(s.get('steps', []), 1)))
    elif t == 'compare':
        l, r = s['left'], s['right']
        rows = ['| ' + clean(l.get('tag') or l.get('title')) + ' | ' + clean(r.get('tag') or r.get('title')) + ' |', '| --- | --- |']
        for a, b in zip(l.get('items', []), r.get('items', [])):
            rows.append(f'| {clean(a)} | {clean(b)} |')
        md.append(f'**{clean(l.get("title"))}** vs **{clean(r.get("title"))}**')
        md.append('\n'.join(rows))
    elif t == 'table':
        rows = ['| Name | Value | Note |', '| --- | --- | --- |']
        for r in s.get('rows', []):
            rows.append(f'| {clean(r.get("t"))} | `{clean(r.get("v"))}` | {clean(r.get("tag"))} |')
        md.append('\n'.join(rows))
    elif t == 'tree':
        ld = s['leader']
        md.append(f'**{clean(ld["t"])}** — {clean(ld.get("d"))}')
        md.append(bullets(s.get('nodes')))
        if s.get('badge'): md.append(f'Each specialist works in {clean(s["badge"]["t"])}.')
    elif t == 'equation':
        md.append('\n'.join(f'- **{clean(x["v"])} · {clean(x["t"])}** — {clean(x.get("d"))}' for x in s.get('terms', [])))
    elif t == 'stats':
        md.append('\n'.join(f'- **{x["value"]}** {clean(x["label"])}' for x in s.get('stats', [])))
    elif t == 'code':
        ext = os.path.splitext(s.get('path', ''))[1].lstrip('.') or 'text'
        md.append(f'**`{clean(s.get("path"))}`**')
        md.append(f'```{ext}\n{s.get("code", "")}\n```')
        hl = [f'- **{clean(h["label"])}** — {clean(h.get("note"))}' for h in s.get('highlights', [])]
        if hl: md.append('\n'.join(hl))
    elif t == 'recap':
        md.append('\n'.join(f'- {clean(x["t"])}' for x in s.get('takeaways', [])))
        if s.get('mission'): md.append(f'> **Your mission:** {clean(s["mission"].get("t"))}')
    return '\n\n'.join(x for x in md if x)


count = 0
for path in sorted(glob.glob(os.path.join(ROOT, 'pipeline', 'lessons', '*.json'))):
    d = json.load(open(path))
    if not d.get('lesson'):
        continue  # trailer
    scenes = d['scenes']
    first = scenes[0]
    words = sum(len(narration(x.get('lines')).split()) for x in scenes)
    minutes = max(5, round(words / 150 + 2))
    desc = clean(first.get('sub') or first.get('lead') or d['title'])
    body = '\n\n'.join(x for x in (scene(s) for s in scenes) if x)
    title = d['title'].replace('&', 'and') if False else d['title']
    slug = re.sub(r'^\d+-', '', d['slug'])
    front = f'---\ntitle: {title}\nduration: ~{minutes} min\ndescription: {desc}\n---\n\n'
    open(os.path.join(OUT, f'{d["lesson"]:02d}-{slug}.md'), 'w').write(front + body + '\n')
    count += 1
print(f'wrote {count} lessons to {os.path.relpath(OUT, ROOT)}')

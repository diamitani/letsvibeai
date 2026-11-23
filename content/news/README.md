# Vibe News content

The `/news` section is generated statically from this folder. A daily routine (7:00 AM CT) adds new content and pushes to `main`; Vercel rebuilds.

| Path | What it is |
| --- | --- |
| `articles/YYYY-MM-DD-slug.md` | Original Daily AI Articles. Rendered in full at `/news/<filename-without-.md>`. |
| `curated.json` | Curated picks from RSS feeds and newsletters (array, newest first is not required; the site sorts by `date`). |
| `feeds.json` | Verified RSS/Atom feeds and newsletter sources the routine pulls from. Rendered as a public directory on `/news` and `/news/sources` (name, description, category, site, RSS, story count). |

## Article frontmatter

```md
---
title: Headline (colons are fine)
description: One or two sentence summary used for cards, SEO and RSS.
date: 2026-11-23
tags: Agents, Skills, Shipping
author: LetsVibeAI Editorial
relatedCourses: vibe-coding, claude-code
---
```

`relatedCourses` uses course slugs from `/courses/<slug>` (`vibe-coding`, `claude-code`, `claude-cowork`, ...). Reading time is computed automatically.

## Curated item shape

```json
{
  "id": "2026-11-23-source-short-slug",
  "type": "rss",
  "source": "Vercel",
  "title": "Original headline",
  "url": "https://original-article-url",
  "date": "2026-11-23",
  "takeaway": "Two original sentences on why it matters for builders.",
  "tags": ["Vercel", "Shipping"]
}
```

`type` is `rss` or `newsletter`. Never paste full third-party article text: headline, original 2-sentence takeaway, source, date and outbound link only. Items without an `http(s)` URL are skipped.

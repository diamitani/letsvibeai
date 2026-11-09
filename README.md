# LetsVibeAI — The AI Skills Institution

**Learn AI. Build with AI. Grow with AI.** Free, plain-English courses that take people from "I've never coded" to shipping their own AI tools, automations and apps.

Live site: [letsvibeai.com](https://www.letsvibeai.com)

## What's on the site

- **Claude Code Mastery:** 11 video lessons (trailer + 8 core lessons + 2 masterclasses)
- **Claude Cowork: Your AI Coworker:** 11 video lessons (trailer + 10 lessons)
- Every lesson has its own shareable link, e.g. `letsvibeai.com/courses/claude-cowork/05-skills`, with the video, lesson notes, a clickable transcript, progress tracking and auto-play of the next lesson
- 4 reading courses: Vibe Coding, Zero to Ship, Project Labs, GTM Automation Labs
- Blog and "Work with Pat" offers

## Run it locally

```bash
npm install      # first time only
npm run dev      # opens http://localhost:3000
npm run build    # production build into dist/
```

## Where to edit things (no coding needed)

| To change… | Edit this file |
| --- | --- |
| Course titles, descriptions, outcomes | `src/content/catalog.ts` |
| Lesson notes (the text under each video) | `src/content/courses/<folder>/<NN-lesson>.md` |
| Add a lesson | Add a numbered `.md` file to the course folder. For a video lesson, also add the video (see below) |
| Prices and contact email | `src/content/site.ts` |
| A blog post | `src/content/blog/<post>.md` |
| Colours and fonts | `tailwind.config.js` |

### Adding or replacing a lesson video

Each video lesson uses three files with the same name (the "video id", e.g. `cw-05-skills`):

1. `public/videos/lessons/<id>.mp4`, the video (720p MP4, about 7 MB for two minutes)
2. `public/images/lessons/<id>.jpg`, the thumbnail
3. `public/transcripts/<id>.json`, the transcript (optional)

Then add the video's length in seconds to `src/content/videos.json`. Claude Code lessons use the id `cm-<lesson file name>`, Cowork lessons `cw-<lesson file name>`.

### Contact form

Without setup, the form opens the visitor's email app addressed to `hello@letsvibeai.com`. To receive submissions directly, create a free form at formspree.io and add its URL in Vercel → Project → Settings → Environment Variables as `VITE_CONTACT_ENDPOINT`, then redeploy.

## Deploy

Vercel builds every push to `main` (`vercel.json`: Vite, output `dist`, SPA rewrites).

## Course materials

`modules/`, `templates/`, `checklists/`, `capstone/`, `resources/` and `videos/` hold the source course materials and HyperFrames video compositions.

Photos: Unsplash (free license) and LetsVibeAI Build Night (Feb 2026).


## Claude Mastery lesson scripts

`pipeline/lessons/*.json` holds the Claude Mastery video scripts (one JSON file per lesson); `pipeline/README.md` explains how they are rendered into narrated videos. To regenerate the readable lesson pages in `src/content/courses/claude-mastery/` after editing a script, run from the repo root:

```bash
python3 pipeline/to_site.py
```

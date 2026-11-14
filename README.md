# LetsVibeAI — The AI Skills Institution

**Learn AI. Build with AI. Grow with AI.** Free, plain-English courses that take people from a vibe-coded idea to a shipped product on any platform.

Live site: [letsvibeai.com](https://www.letsvibeai.com)

This app is a Next.js (App Router) site. The previous Vite SPA was replaced on the `redesign/idea-to-ship` branch.

## Local development

```bash
cp .env.example .env.local   # optional
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start
npm run lint
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (default in code: `https://www.letsvibeai.com`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Existing LetsVibeAI Supabase project URL. Without it, accounts are disabled and lesson progress stays in the browser. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is also accepted. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional form endpoint (e.g. Formspree). Without it, the contact form opens a mail draft to hello@letsvibeai.com. |

If the Vercel project still has `VITE_SUPABASE_*` or `VITE_CONTACT_ENDPOINT` from the old app, add the `NEXT_PUBLIC_*` names above. Do not commit secrets.

The progress table is still `public.lv_lesson_progress` (course + lesson). Sign-up still stores `full_name` in user metadata.

## What's on the site

- **Path:** idea → document & architect → build with AI → check & ship, mapped onto the real courses and platforms in the curriculum.
- **Video courses:** Vibe Coding: Idea to Shipped App; Claude Code Mastery; Claude Cowork.
- **Reading courses:** Ship It: Zero to Production on Every Platform; Frontier Agent Platforms; Full-Stack Vibe Coding with Lovable & Bolt; Project Labs; GTM Automation Labs.
- **Library:** prompts, the 11-document planning stack, checklists, and glossary (from the open curriculum).
- **Blog, workshops, pricing, about, account.**

Every lesson has a shareable URL, e.g. `letsvibeai.com/courses/claude-cowork/05-skills`.

## Where to edit content

| To change… | Edit |
| --- | --- |
| Course titles, descriptions, outcomes | `src/lib/catalog.ts` and `src/lib/courses-legacy.ts` |
| Lesson notes | `content/courses/<folder>/<NN-lesson>.md` |
| Blog posts | `content/blog/<post>.md` |
| Prompts, templates, checklists | `content/resources/`, `content/templates/`, `content/checklists/` (curriculum originals also remain at the repo root) |
| Site copy, offers, plans | `src/lib/site.ts` |
| Colours and fonts | `tailwind.config.ts` (brand board: `letsvibeai-brand-direction.png`) |
| Logo and app icon | `public/brand/` |

Lesson videos live at `public/videos/lessons/<id>.mp4` with posters in `public/images/lessons/` and optional transcripts in `public/transcripts/`. Durations are in `content/videos.json`.

## Deploy

Vercel should detect **Next.js**. `vercel.json` sets `"framework": "nextjs"` and does **not** use the old Vite `outputDirectory: dist` or SPA rewrite to `index.html`. If a project-level preset still says Vite / `dist`, change it to Next.js or the production deploy will fail.

## Curriculum source materials

`modules/`, `templates/`, `checklists/`, `capstone/`, `resources/`, and `videos/` hold the source course materials and HyperFrames compositions used to produce the site content.

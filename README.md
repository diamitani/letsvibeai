# LetsVibeAI — The AI Skills Institution

**Learn AI. Build with AI. Grow with AI.** Free, plain-English courses that take people from "I've never coded" to shipping their own AI tools, automations and apps.

Live site: [letsvibeai.com](https://www.letsvibeai.com)

## What's on the site

- **4 free courses / 26 lessons:** Vibe Coding: Idea to Shipped App (10 modules with quizzes), Build with AI: Zero to Ship (10 days), Project Labs (3), GTM Automation Labs (3)
- **Builder Toolkit:** 11 building blocks, 11-document planning stack (copy/download), prompt library, checklists, glossary
- **Pricing & offers:** Live Build Nights, 1:1 coaching, cohorts and team workshops
- **Blog:** LiveBuildAI briefings and tool guides

Design system and sitemap: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

## Run it locally

```bash
npm install      # first time only
npm run dev      # opens http://localhost:3000
npm run build    # production build into dist/
```

## Where to edit things (no coding needed)

| To change… | Edit this file |
| --- | --- |
| Headlines, offers, prices, FAQs, guides, plans | `src/content/site.ts` |
| Course titles, summaries, course-page copy | `src/content/courses.ts` |
| A lesson | `src/content/courses/<course>/<NN-lesson>.md` |
| Add a lesson | Add a new numbered `.md` file to that course folder |
| A blog post | `src/content/blog/<post>.md` |
| Colors, fonts, spacing | `src/styles/tokens.css` |
| Images | `public/images/` |

### Contact form

Without setup, the form opens the visitor's email app addressed to `hello@letsvibeai.com`. To receive submissions directly, create a free form at formspree.io and add its URL in Vercel → Project → Settings → Environment Variables as `VITE_CONTACT_ENDPOINT`, then redeploy.

## Deploy

Vercel builds every push to `main` (`vercel.json`: Vite, output `dist`, SPA rewrites).

## Course materials

`modules/`, `templates/`, `checklists/`, `capstone/`, `resources/` and `videos/` hold the source course materials and HyperFrames video compositions.

Photos: Unsplash (free license) and LetsVibeAI Build Night (Feb 2026).

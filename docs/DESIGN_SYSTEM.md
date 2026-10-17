# LetsVibeAI Design System v2.0

**Brand:** Gateway V (see `letsvibeai-brand-guidelines.md`) · **Layout language:** modeled on the Lexio Framer template (floating pill nav, photo hero, tinted offer cards, image + panel course cards, glass feature panel, bento grid, accordion FAQ, contact split).

The previous design system (Tailwind theme, `src/index.css`, all old components) was removed in this version. Do not reintroduce Tailwind or hard-coded colors — use the tokens.

## Files

| File | What it holds |
| --- | --- |
| `src/styles/tokens.css` | Every color, font size, space, radius, shadow and motion value |
| `src/styles/site.css` | All components and section patterns, built only from tokens |
| `src/content/site.ts` | Marketing copy, offers, prices, FAQs, guides, plans |
| `src/content/courses.ts` | Course catalog (title, summary, image, course-page copy) |
| `src/content/courses/<slug>/*.md` | Lesson text — one file per lesson, ordered by number prefix |
| `src/content/blog/*.md` | Blog posts with frontmatter (title, date, type, description) |
| `src/data/courseData.ts` | Module quizzes, deliverables, 11 building blocks, 11 doc templates, capstone rubric |

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--navy` | #071B3A | Dark surfaces, hero overlays, featured plan |
| `--ink` | #10213F | Headings |
| `--blue-strong` | #1F6FDB | Primary buttons, badges (white text passes AA 4.8:1) |
| `--blue` | #2F80ED | Icons, focus rings, highlights |
| `--green` / `--success` | #34D399 / #0F8A5F | Progress, completion |
| `--violet` | #7C5CFC | Discovery accents |
| `--cyan` | #20C7D9 | Energy accents |
| `--mist` | #F4F7FB | Alternate section background (Lexio cream) |
| `--sky-50` | #E8F1FD | Tinted cards, guides band, footer (Lexio peach) |
| `--green-50` | #DCF6EC | CTA strip, feature card (Lexio sage) |
| `--violet-50` | #ECE8FF | Quote card (Lexio lavender) |
| `--text` / `--text-muted` | #2C3A55 / #4A5878 | Body / secondary copy (AA on white and tints) |

**Type:** Sora (brand font) for everything, JetBrains Mono for code. Headings 600 weight, −0.04em tracking. Scale: hero 76 · h1 64 · h2 52 · h3 30 · h4 22 · h5 18 · body 15.5.
**Space:** 4px base (`--s-1` … `--s-9`), sections `--section-y` (64–104px), container 1320px.
**Radius:** 8 / 12 / 16 / 24 / pill. Cards use 16.
**Motion:** `--ease` cubic-bezier(.22,1,.36,1); scroll reveal = fade + 28px lift + blur, 800ms. Everything is disabled under `prefers-reduced-motion`.

## Components

| Component | Class / file | Variants & states |
| --- | --- | --- |
| Button | `.btn` · `Button` in `components/ui.tsx` | primary, navy, outline, ghost-light · sm · hover arrow nudge, active scale, disabled |
| Circle button | `.btn-circle` | default, soft, disabled |
| Badge / chip | `.badge`, `.chip` | blue, soft, green |
| Nav | `.nav` · `Layout.tsx` | floating pill; solid on scroll; mobile drawer under 860px |
| Hero / page hero | `.hero`, `.page-hero` | photo, plain gradient |
| Offer card | `.offer-card` | numbered, badge, line illustration, price + arrow |
| Countdown | `.countdown` | hides itself after `site.offerDeadline` |
| Course card | `.course-card` | white or mist panel; image zoom on hover |
| Info card | `.info-card` + `.icon-tile` | blue, green, violet tiles |
| Guide card | `.guide-card` | photo or monogram fallback |
| Build card + carousel | `.build-card`, `.carousel` | arrow controls, responsive per-view |
| FAQ | `.faq-item` | open/closed, animated height, aria-expanded |
| Contact form | `.contact`, `.field`, `.input` | focus ring, success / error notes |
| Prose | `.prose` | lesson, blog and resource markdown; code blocks get a Copy button |
| Lesson player | `.lesson`, `.progress`, `.callout`, `.quiz` | progress saved in localStorage |
| Pricing plan | `.plan` | default, featured |
| Toolkit | `.tabs`, `.block-card`, `CopyBlock` | copy + download templates |

## Sitemap (information architecture)

```
/                         Home — hero, ways to learn, courses, features, bento, guides, builds, FAQ, contact
/courses                  Course catalog
/courses/:slug            Course detail — approach, outcomes, curriculum, capstone (vibe-coding)
/courses/:slug/:lesson    Lesson player — lesson text, deliverable, quiz, progress, prev/next
/toolkit                  11 building blocks · 11-doc planning stack · prompt library · checklists · glossary
/pricing                  Free / Live Cohort / Teams & Programs + offers
/about                    Approach, principles, method, guides
/blog, /blog/:slug        LiveBuildAI briefings and guides
/contact                  Contact form + FAQ
*                         404
```

## Rules

1. Use tokens, never raw hex values, in components.
2. Body text stays `--text` or `--text-muted`; never put white text on `--blue` (fails contrast) — use `--blue-strong`.
3. Every interactive element keeps a visible `:focus-visible` ring.
4. New pages are composed from existing sections before inventing new ones.
5. No invented testimonials, ratings or enrollment numbers.

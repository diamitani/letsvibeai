# LetsVibeAI Design System v2.1

**Look:** the warm cream + coral style of the original LetsVibeAI site — Hanken Grotesk with DM Serif italic accent words, white rounded cards, a dark-tile logo — on the **Lexio** template layout (floating pill nav, tinted offer cards, image + panel course cards, glass feature panel, bento grid, accordion FAQ, contact split).
**Brand marks:** Gateway V (see `letsvibeai-brand-guidelines.md`). The previous blue/Sora skin (v2.0) and the older Tailwind system were removed — do not reintroduce Tailwind or hard-coded colors.

## Files

| File | What it holds |
| --- | --- |
| `src/styles/tokens.css` | Every color, font size, space, radius, shadow and motion value |
| `src/styles/site.css` | All components and section patterns, built only from tokens |
| `src/content/site.ts` | Marketing copy, offers, prices, FAQs, guides, plans |
| `src/content/courses.ts` | Course catalog (title, summary, image, course-page copy) |
| `src/content/courses/<slug>/*.md` | Lesson text — one file per lesson, ordered by number prefix. `claude-mastery/` is generated from `pipeline/lessons/*.json` |
| `src/content/blog/*.md` | Blog posts with frontmatter (title, date, type, description) |
| `src/data/courseData.ts` | Module quizzes, deliverables, 11 building blocks, 11 doc templates, capstone rubric |

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ink` / `--navy` | #101B24 | Headings, dark panels (video card, code, featured plan) |
| `--accent` | #EC4909 | Coral: large type, icons, italic highlight words |
| `--accent-strong` | #D63F04 | Buttons and small coral text (white text passes AA, 4.6:1) |
| `--accent-deep` | #B93503 | Button hover |
| `--cream` | #F7F4F2 | Page and alternate section background |
| `--peach` | #FBE1CE | Tinted cards, offers, guides band, footer, form panel |
| `--sage` | #C4DAC8 | CTA strip, feature card |
| `--periwinkle` | #E1E3F6 | Quote card, icon tiles |
| `--gold` | #FCD554 | Stars, small highlights |
| `--text` / `--text-muted` | #2B3036 / #4A4D4F | Body / secondary copy (AA on white, cream and peach) |

**Type:** Hanken Grotesk for everything, DM Serif Text *italic* for accent words (wrap them in `<em>` inside any `h-hero`, `h1`–`h4`), JetBrains Mono for code. Scale: hero 84 · h1 68 · h2 56 · h3 32 · h4 24 · h5 20 · body 16.
**Space:** 4px base (`--s-1` … `--s-9`), sections `--section-y` (64–104px), container 1320px.
**Radius:** 8 / 14 / 20 / 32 / pill. Cards use 20; the hero showcase uses 32.
**Motion:** `--ease` cubic-bezier(.22,1,.36,1); scroll reveal = fade + 28px lift + blur, 800ms. Disabled under `prefers-reduced-motion`.

## Components

| Component | Class / file | Variants & states |
| --- | --- | --- |
| Button | `.btn` · `Button` in `components/ui.tsx` | primary, navy, outline, ghost-light · sm · hover arrow nudge, active scale, disabled |
| Circle button | `.btn-circle` | default, soft, disabled |
| Badge / chip | `.badge`, `.chip` | coral, soft, green |
| Nav | `.nav` · `Layout.tsx` | floating pill; solid on scroll; mobile drawer under 860px |
| Home hero + showcase | `.home-hero`, `.showcase`, `.video-card`, `.code-card` | centered headline, trailer player, copyable code |
| Page hero | `.page-hero` | photo, plain gradient |
| Practices grid | `.practices`, `.practice` | 8 rule cards linking to lessons |
| Offer card | `.offer-card` | numbered, badge, line illustration, price + arrow |
| Countdown | `.countdown` | hides itself after `site.offerDeadline` |
| Course card | `.course-card` | white or mist panel; image zoom on hover |
| Info card | `.info-card` + `.icon-tile` | peach, sage, periwinkle tiles |
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
2. Body text stays `--text` or `--text-muted`; never put white text on `--accent` (fails contrast) — use `--accent-strong`.
3. Every interactive element keeps a visible `:focus-visible` ring.
4. New pages are composed from existing sections before inventing new ones.
5. No invented testimonials, ratings or enrollment numbers.

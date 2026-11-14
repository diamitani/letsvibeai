# Module 8 — The document stack: 11 planning docs, written with AI

Before any code, have AI write 11 planning documents from your idea. Together they become the agent's brain: every later prompt points at them, so the build stays consistent and nothing gets invented. Generate them in the order below — each one feeds the next.

### Lesson 8.1 — The 11 documents

| # | Document | Answers | Must include |
| --- | --- | --- | --- |
| 1 | Product Requirements Document (PRD) | What are we building, for whom, and why? | Problem, personas, user stories, MVP features, success metrics, out of scope |
| 2 | Product Specifications | Exactly how does each feature behave? | Per feature: inputs, outputs, states, edge cases, acceptance criteria |
| 3 | Technical Stack Key Sheet | Which tool does each job? | Block → tool → plan/price → account owner → env variable names |
| 4 | System Architecture | How do the parts connect? | Diagram, data flow, database schema, APIs, third-party services |
| 5 | Information Architecture | How is content organized and navigated? | Sitemap, page list, navigation, user flows |
| 6 | Well-Architected Framework | Is it secure, reliable and affordable? | Security, reliability, performance, cost, operations, sustainability checks |
| 7 | Software Development Lifecycle (SDLC) Checklist | How do we build, test and release? | Plan → design → build → test → deploy → monitor, with checkboxes |
| 8 | Product Roadmap | What ships when? | MVP, V1, V2 phases with features and gates |
| 9 | Brand Guidelines | How do we look and sound? | Logo, colors, fonts, voice, do/don't examples |
| 10 | Design Specifications | How does each screen look and behave? | Design tokens, components, layouts, responsive rules, accessibility |
| 11 | Go-To-Market Plan | How do we get and keep customers? | Positioning, pricing, channels, sales playbook, GTM tech stack, team, process |

The six pillars in #6 come from the AWS Well-Architected Framework; Azure and Google publish similar ones.

### Lesson 8.2 — The master prompt

Run this in your harness of choice with your context pack loaded. Generate one document per message so you can review each.

```
You are a product team in one: product manager, software architect,
designer, security engineer and go-to-market lead.

Project: read /context/00-project-brief.md and my notes below.
[brain dump]

We will create 11 documents, one at a time, saved to /docs:
01-prd.md, 02-product-specs.md, 03-tech-stack-key-sheet.md,
04-system-architecture.md, 05-information-architecture.md,
06-well-architected.md, 07-sdlc-checklist.md, 08-roadmap.md,
09-brand-guidelines.md, 10-design-specs.md, 11-gtm-plan.md

Rules:
- Use only facts I've given you or that you can cite. Mark guesses as
  ASSUMPTION and list open questions at the end of each doc.
- Default stack: Next.js, Tailwind, shadcn/ui, Supabase (db, auth,
  storage), Stripe, Vercel AI SDK + AI Gateway, GitHub, Vercel.
- Each doc must be consistent with the earlier ones.

Start with 01-prd.md. Ask me up to 5 questions first if you need to.
```

### Lesson 8.3 — From documents to a buildable project

With all 11 docs in `/docs`, one more chain produces the three things a coding agent needs:

1. **System instructions** — the agent's operating manual: read `/docs`, configure each block of the stack, and build core **functions** (tasks), **skills** (processes) and **agents** (AI + tools).
2. **Scaffolding** — the complete folder and file structure for version 1, with empty or starter files for every page, component, API route, database migration and agent folder.
3. **Build prompts** — one prompt per section (auth, database, each page, payments, chat), each ready to paste, each ending with a definition of done. You refine each with your own edits.

**Prompt to copy:**

```
Using everything in /docs, produce:
1) /instructions/system.md — system instructions for a coding agent
   building this app.
2) The full scaffolding directory tree for V1, then create it.
3) /prompts/ — one numbered build prompt per section, in build order,
   each with a definition of done and a test.
```

**Exercise:** generate all 11 docs for your capstone app. Read each one; correct anything wrong — your corrections are the most valuable context you'll ever give.

**Check yourself:**

1. Why generate the PRD before the system architecture?
2. What are the six Well-Architected pillars?
3. What three outputs turn documents into a buildable project?


---

[← Previous](./07-agents.md) · [Course home](../README.md) · [Next →](./09-build-process.md)

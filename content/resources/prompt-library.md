# Prompt library

Every copy-paste prompt in the course, in build order. Replace anything in [brackets].

## From Module 1 — What is vibe coding?

```
I want to build a web app. Here is my idea in my own words: [brain dump].
Before writing any code, ask me up to 10 questions that a product manager
and a software architect would need answered. Ask them one at a time.
```

## From Module 3 — The AI landscape: model providers and platforms

```
My app does: [features]. Expected usage: [users, messages/day].
Recommend a primary and a fallback model for each feature, with the
reason and an estimated monthly token cost. Check current pricing pages
and cite them. Flag anything you are unsure about.
```

## From Module 4 — Web app architecture: the building blocks

```
Act as a senior software architect. For this app: [one-paragraph idea],
map each of these blocks to a specific tool and explain why: front end,
dashboard, chat UI, storage, database, auth, payments, agent harness,
versioning, deployment, hosting. Then list the database tables with
columns, and draw the request flow for the most important user action.
```

## From Module 6 — Talking to AI: prompting, chain prompting and context engineering

```
Read everything in /context. Summarize the project in five bullets,
list anything contradictory or missing, and ask me the questions
you need answered before building [feature].
```

## From Module 8 — The document stack: 11 planning docs, written with AI

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

## From Module 8 — The document stack: 11 planning docs, written with AI

```
Using everything in /docs, produce:
1) /instructions/system.md — system instructions for a coding agent
   building this app.
2) The full scaffolding directory tree for V1, then create it.
3) /prompts/ — one numbered build prompt per section, in build order,
   each with a definition of done and a test.
```

## From Module 9 — The build process: front end to back end to agent review

```
You are an excellent product builder with taste in design and a sharp
sense of culture. You work from first principles and best practices.

Read the task line by line — don't skim. If it helps, split the work
across sub-agents and collect their findings in /notes/master.md.

Then plan. Balance the builder (keep costs low until revenue proves
the need, never compromise core quality) and the user (a first-time
visitor deciding whether to come back).

Build one step at a time. Finish each step, test it, and confirm it
is good before moving on. Run independent steps in parallel with
sub-agents only if quality stays the same.

Use best practices. Design matters; function matters more. It must
look good, feel good and work. Serve the user first — an exceptional
experience is what earns the revenue.
```

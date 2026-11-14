# Module 9 — The build process: front end to back end to agent review

Build in a fixed order: design the front end, scaffold the project, connect the back end, then refine one page at a time — and finish with a team of review agents checking everything before launch. Order prevents rework.

### Lesson 9.1 — The seven-step build

1. **Design the front end.** Start from a template or HTML design (v0, Lovable, Figma Make, Google AI Studio, or one from your template library).
2. **Keep a template library.** Save every design you like — screenshots, HTML, links — in a `/references` folder. It's your reusable visual vocabulary.
3. **Export and own the code.** Push the design to GitHub and open it in your coding harness (Claude Code, Cursor, Antigravity).
4. **Scaffold the whole app.** Use the scaffolding from Module 8 so every page, route and agent folder exists, even if empty.
5. **Connect the back end.** Instruct the agent to follow `/docs` and wire each block of the stack, one at a time: Supabase database → Supabase auth → Supabase storage → Stripe → AI SDK + Gateway → chat UI → voice (optional, e.g. SignalWire or ElevenLabs).
6. **Edit each page individually.** One page per session, with its build prompt. Test it, commit it, move on.
7. **Review with an agent team.** Run specialist reviewers over the whole app (Lesson 9.4), fix, repeat.

### Lesson 9.2 — Front-end templates by business type

| App type | Core pages |
| --- | --- |
| SaaS | Landing page, products/features, pricing, about, sign up |
| Marketplace | Card grids, product filters, product page, settings, checkout |
| E-learning | Courses, library, lesson player, certifications, AI tutor |
| Directory | Listings, filters, listing detail, contact, account, CRM |

### Lesson 9.3 — The dashboard blueprint

| Area | Pages |
| --- | --- |
| Home | Custom home, onboarding checklist, subscription status |
| Subpages | Workspaces, products, configurations, tools |
| Profile | Info, edit, public preview |
| Settings | Account, billing (Stripe customer portal), permissions, data export/delete |
| Chat UI | Sessions, projects, chat history, skills, sub-agents, tools |

### Lesson 9.4 — The review agent team

When V1 works end to end, run each reviewer as its own agent (or sub-agent) with its own checklist:

| Reviewer | Checks |
| --- | --- |
| UI | Visual consistency with design specs and brand guidelines |
| UX | User funnel: time to first value, time to buy, dead ends, empty states |
| Design system | Tokens and components reused, not reinvented |
| Front end | Responsive layouts, performance, accessibility |
| Back end | API routes, error handling, secrets in env vars only |
| Database | Schema, indexes, row-level security on every table |
| Security | Auth flows, webhooks verified, rate limits, dependency audit |
| QA | Every user story from the PRD tested; console free of errors |
| Scale | Will it hold at 1, 1,000 and 1,000,000 users? What breaks first? |

### Lesson 9.5 — The builder's prompt

Paste this at the start of a major build session:

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

**Exercise:** run steps 1–5 for your capstone. Commit to GitHub after each step with a message describing what changed.

**Check yourself:**

1. Why scaffold every page before building any of them in detail?
2. Which reviewer checks row-level security?
3. What should you do after each page is finished?


---

[← Previous](./08-document-stack.md) · [Course home](../README.md) · [Next →](./10-ship-it.md)

# Module 6 — Talking to AI: prompting, chain prompting and context engineering

The quality of what AI builds is capped by the quality of what you give it. Three skills raise that cap: a well-structured prompt, chains of prompts that refine each other, and a context pack that tells every agent everything about your project.

### Lesson 6.1 — Anatomy of a great prompt

Use the **RGCCEOD** checklist — seven parts, in order:

1. **Role** — who the AI should act as. "You are a senior Next.js engineer."
2. **Goal** — the outcome, in one sentence. "Build the pricing page."
3. **Context** — the project, the users, the stack, the files that matter.
4. **Constraints** — what not to do, budgets, tools to use or avoid.
5. **Examples** — a sample, a screenshot, a site you like.
6. **Output** — the exact format: files, a table, a checklist.
7. **Definition of done** — how you'll both know it's finished. "All three tiers render, the button opens Stripe Checkout, no console errors."

Add one line to every important prompt: **"If anything is unclear, ask me before you start. If you're not sure something is true, say so."** This single line cuts hallucinations sharply.

### Lesson 6.2 — Chain prompting

Chain prompting means using the output of one prompt (or one model) as the input to the next, so each step improves the last. Big tasks done in one shot are mediocre; done as a chain, they're excellent.

**Example chain — from idea to build prompt:**

1. **Brain dump → structure.** "Turn my messy notes into a one-page product brief."
2. **Brief → critique.** Paste the brief into a *second* model: "Act as a skeptical investor and a senior engineer. List the 10 biggest gaps."
3. **Critique → revision.** Back to the first: "Revise the brief to fix these gaps."
4. **Revision → build prompt.** "Write a step-by-step build prompt for a coding agent, using this brief."

Using different models for drafting and critiquing catches blind spots — each model has different strengths.

### Lesson 6.3 — Context engineering

Prompting is what you say in one message. **Context engineering** is designing *everything* the model sees: instructions, project docs, examples, tool results and memory. Agents forget between sessions, so you write the context down once and load it every time.

**Build a context pack** — a folder at the root of your project:

```
/context
  00-project-brief.md        what we're building, for whom, why
  01-tech-stack.md           every tool, version, and where keys live
  02-architecture.md         blocks, data flow, database tables
  03-brand-and-design.md     colors, fonts, voice, components
  04-conventions.md          folder rules, naming, "never do" list
  05-current-status.md       what's done, what's next, known bugs
AGENTS.md / CLAUDE.md        the short index the agent reads first
```

Most coding harnesses read a root instruction file automatically — `CLAUDE.md` for Claude Code, `AGENTS.md` for Codex and many others, rules files for Cursor. Keep that file short and point it at the `/context` folder.

**Context rules:**

- **Relevant beats more.** Load what this task needs; a stuffed context window confuses the model and costs tokens.
- **Write it down once.** Every decision you'd otherwise repeat goes in the pack.
- **Keep status current.** Update `05-current-status.md` at the end of every session — or ask the agent to.

**Prompt to copy:**

```
Read everything in /context. Summarize the project in five bullets,
list anything contradictory or missing, and ask me the questions
you need answered before building [feature].
```

**Exercise:** create your `/context` folder with the six files above. Use your Module 1 Q&A and Module 4 architecture map to fill them.

**Check yourself:**

1. Name the seven parts of a great prompt.
2. Why use a second model to critique the first one's work?
3. What's the difference between prompting and context engineering?


---

[← Previous](./05-the-toolbox.md) · [Course home](../README.md) · [Next →](./07-agents.md)

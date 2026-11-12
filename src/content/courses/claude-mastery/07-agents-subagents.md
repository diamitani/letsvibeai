---
title: Agents & subagents: plan, build, ship
duration: ~5 min
description: Delegate like a lead, not a typist.
---

> **You describe. Agents build.**
> — Pat Diamitani

- **Plain language, typed or spoken**
- **Agents write the code**

## Split big work across specialists.

One agent doing everything gets slow, and confused. Instead, hand pieces to specialists. One researches, one builds, one reviews. Each works in its own clean context, so the main thread stays sharp.

**You + lead agent** — Plans and delegates

- **Researcher** — Finds the facts
- **Builder** — Writes the code
- **Reviewer** — Checks the work

Each specialist works in clean context.

## Role. Tools. Instructions.

An agent is another markdown file. It has a role, and a list of tools it may use. Then its instructions. This reviewer can read, but never edit.

**`.claude/agents/reviewer.md`**

```md
---
name: reviewer
description: Reviews diffs for bugs.
  Use after every edit.
tools: Read, Grep, Bash
---
You are a strict code reviewer.
Report bugs by severity.
Never edit files.
```

- **Role** — A name and when to use it
- **Tools** — Only the tools it needs
- **Rules** — Read, but never edit

## A brief that works.

Delegating well means writing a good brief. The goal, and why it matters. What done looks like. What not to touch. And what to report back.

- **Goal & why** — The outcome and the reason
- **Done looks like** — How you'll check it
- **Don't touch** — Files and systems off-limits
- **Report back** — What to hand you at the end

## Plan. Build. Test. Ship.

Put it together. Approve the plan. Let agents build in parallel. Have the reviewer, and the tests, check the work. Then push to git, and deploy.

1. **Plan** — ""
2. **Build** — ""
3. **Test** — ""
4. **Ship** — ""

## What you just learned.

- Specialists beat one do-everything agent
- An agent is a markdown file
- Good briefs: goal, done, limits, report

> **Your mission:** Create one reviewer agent — and run it after your next change.

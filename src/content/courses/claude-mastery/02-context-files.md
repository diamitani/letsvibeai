---
title: Context files that remember for you
duration: ~5 min
description: Write it once. Every session starts smart.
---

## Say it once. Reuse it forever.

Every new session starts with a blank memory. So you end up explaining your stack, your style, and your rules, again and again. A context file fixes that. You write it once, and the agent reads it first, every time.

**Re-explaining every chat** vs **One CLAUDE.md file**

| Without it | With it |
| --- | --- |
| "We use Next.js and pnpm…" | Read first, every single session |
| "Please run the tests first…" | Your stack, rules and checks |
| "Don't touch the /dist folder…" | Lives in the repo, versioned in git |

## It's just markdown.

Here's a real one. It's just a markdown file in your project. A line about the stack. Things to always do, like running the tests. And things to never do, like committing secrets.

**`CLAUDE.md`**

```md
# Project rules

Stack: Next.js, TypeScript, pnpm.

## Always
- Run `pnpm test` before saying done
- Small commits, clear messages

## Never
- Edit files in /dist
- Commit .env files
```

- **Stack** — The stack, in one line
- **Always** — Things it must always do
- **Never** — Hard lines it never crosses

## Four things belong in a rules file.

Four things belong in it. Your stack, and the commands to build and test. Your always and never rules. Where the important things live. And how the agent should check its own work.

- **Stack & commands** — How to build, run and test
- **Always & never** — The hard rules
- **Where things live** — The folders that matter
- **How to verify** — What "done" means

## Every harness reads one. The name changes.

Every harness reads a file like this. Only the name changes. AGENTS.md is the closest thing to a shared standard, and many tools read it. Write it once, and point the others at it.

| Name | Value | Note |
| --- | --- | --- |
| Claude Code | `CLAUDE.md` |  |
| Codex | `AGENTS.md` | Shared standard |
| Gemini CLI | `GEMINI.md` |  |
| Cursor | `.cursor/rules/` |  |
| VS Code Copilot | `.github/copilot-instructions.md` |  |

## Short beats complete.

A few tips. Keep it short. Under two hundred lines. Write rules, not essays. And every time the agent gets something wrong, add a line, so it never happens again.

- **Under 200 lines** — Short files get followed
- **Rules, not essays** — One clear line per rule
- **Fix it when it slips** — Every mistake becomes a new line

## What you just learned.

- The agent reads your context file first
- Stack, rules, folders, and checks
- Short, and updated after every slip

> **Your mission:** Create a CLAUDE.md with your stack, three always rules and three never rules.

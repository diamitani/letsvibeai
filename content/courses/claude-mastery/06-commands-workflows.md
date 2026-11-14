---
title: Commands, prompts & workflows
duration: ~5 min
description: Your best prompts, one keystroke away.
---

## Same prompt again? Make it a command.

If you keep pasting the same prompt, it's time for a command. Type a slash and a word, and the whole prompt runs. Add a word after it, to point it at what matters today.

Type a slash and a word.

```bash
$ /review
● Running review.md — reading git diff --staged…
$ /review security
● Focus: security · 2 bugs, 3 style notes
```

> **Slash command:** One file. One word. Same result every time.

## Three parts. Six lines.

Here's a review command. Frontmatter at the top describes it. A slot catches whatever you type after the command. And the body is just the prompt.

**`.claude/commands/review.md`**

```md
---
description: Review staged changes
argument-hint: [focus area]
---
Review `git diff --staged`.
Focus on: $ARGUMENTS
List bugs first, then style nits.
```

- **Frontmatter** — Frontmatter — what it is
- **Arguments** — Arguments — what you type after it
- **Body** — Body — the prompt itself

## Same idea. Different folder.

Each harness calls them something slightly different. Commands, prompts, or workflows. Same idea, different folder.

| Name | Value | Note |
| --- | --- | --- |
| Claude Code | `.claude/commands/` |  |
| Codex | `~/.codex/prompts/` |  |
| Cursor | `.cursor/commands/` |  |
| VS Code Copilot | `.github/prompts/*.prompt.md` |  |

## Keep commands in git.

Keep them in git. Write one file per command. Commit it next to the code. And the whole team gets it on their next pull.

1. **Write** — ""
2. **Commit** — ""
3. **Share** — ""

## What you just learned.

- Repeated prompt → slash command
- Frontmatter, arguments, body
- Commit it, and the team gets it

> **Your mission:** Turn the prompt you paste most into a slash command — and commit it.

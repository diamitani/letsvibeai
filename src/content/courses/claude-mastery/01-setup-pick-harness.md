---
title: Pick & install your agent harness
duration: ~5 min
description: A working AI agent on your machine in about ten minutes.
---

> **From typist to director.**
> — Pat Diamitani

- **Describe what the scene needs**
- **Review and steer the output**
- **Let the agent run the camera**

## A harness is the app around the model.

A model is the brain. A harness is everything around it. It reads your files, runs commands, calls tools, and remembers your rules. Claude Code, Codex, Cursor and VS Code are all harnesses.

- **Reads files**
- **Runs commands**
- **Calls tools**
- **Remembers rules**

Works in: Claude Code, Codex, Cursor, VS Code.

## Five layers. Every time.

Under the hood, every harness has the same five layers. The model. Context, which is your rules and memory. Capabilities, like skills and tool connections. Surfaces, meaning chat, terminal or editor. And orchestration, where agents work together.

- **Model** — The brain you pick
- **Context** — Rules and memory
- **Capabilities** — Skills and tools
- **Surfaces** — Chat, terminal, editor
- **Orchestration** — Agents working together

## Start with the one you already use.

Start with whatever you already use. If you like the terminal, try Claude Code, Codex, or Hermes. If you live in an editor, try VS Code, Cursor, or Antigravity. Everything in this course carries over to all of them.

### Terminal-first

- **Claude Code** — Agentic CLI
- **Codex** — Agentic CLI
- **Hermes** — Open-source agent

### Editor & desktop

- **VS Code** — Copilot agent mode
- **Cursor** — Built-in agent
- **Antigravity** — Agent manager app

> Skills you learn here transfer to every harness

## Give it a folder and git.

Make a fresh folder, and turn it into a git repo. Git is your undo button. Every change the agent makes can be reviewed, and rolled back. Then launch the harness inside that folder.

Git is your undo button.

```bash
$ mkdir my-first-agent && cd my-first-agent
$ git init
Initialized empty Git repository in ~/my-first-agent/.git/
# launch your harness here
$ claude
● Agent ready — working in ~/my-first-agent
```

> **Git = undo:** Every change is reviewable and reversible.

## Three prompts for day one.

Here are three prompts to try on day one. First, ask it to explain the folder. Then ask for a plan, and tell it not to write code yet. Finally, ask it to do just step one, then stop.

1. **Explain** — "What's in this folder?"
2. **Plan** — "Plan it. No code yet."
3. **Do one step** — "Do step one, then stop and show me."

## What you just learned.

- A harness is the app around the model
- Every harness shares the same five layers
- Folder + git before your first prompt

> **Your mission:** Install one harness, start a git repo, and run the three day-one prompts.

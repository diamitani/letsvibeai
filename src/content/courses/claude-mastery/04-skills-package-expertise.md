---
title: Skills: package your expertise
duration: ~5 min
description: Teach the agent a job once. It remembers forever.
---

## One job, done your way.

A skill teaches the agent one job, done your way. It's a folder, with one markdown file inside, called SKILL.md. When a request matches, the agent loads it automatically.

**`.claude/skills/pdf-report/`**

```text
pdf-report/
├── SKILL.md
├── templates/
│   └── report.html
└── reference/
    └── brand-guide.md
```

- **Folder** — A folder per job
- **Instructions** — SKILL.md holds the playbook
- **Extras** — Loads itself when a task matches

## Name. Description. Steps.

At the top, a name, and a description. The description is how the agent decides when to use it. Below that, the steps, in plain language.

**`pdf-report/SKILL.md`**

```md
---
name: pdf-report
description: Build a branded PDF report
  from a CSV. Use when asked for a
  report or a one-pager.
---

1. Summarise the 3 key trends
2. Fill templates/report.html
3. Export to PDF
```

- **Name** — A short, unique name
- **Trigger** — The description decides when it fires
- **Steps** — Plain-language steps

## Only pay for what's needed.

Skills scale because of progressive disclosure. At first, the agent only sees the name and description. The full steps load only when a request matches. And long references live in separate files, read only when needed.

- **Name + description** — Always loaded — tiny
- **SKILL.md body** — Loaded when the task matches
- **Linked files** — Opened only if needed

## Descriptions that trigger.

If a skill doesn't fire, the description is usually the problem. Say what it does. Say when to use it. And use the words people actually type.

- **Say what it does** — "Builds a branded PDF report"
- **Say when to use it** — "Use when asked for a report"
- **Use real words** — The words people actually type

## Same file. Everywhere.

The skill format is an open standard. Put it in your project, keep it in your personal folder, or add it in the Claude app. Write it once, and it travels with you.

| Name | Value | Note |
| --- | --- | --- |
| Project | `.claude/skills/<name>/SKILL.md` |  |
| Personal | `~/.claude/skills/<name>/SKILL.md` |  |
| Claude app | `Settings → Skills` | Syncs to Code |

## What you just learned.

- A skill = a folder + SKILL.md
- The description is the trigger
- Progressive disclosure keeps it light

> **Your mission:** Turn the process you explain most often into your first skill.

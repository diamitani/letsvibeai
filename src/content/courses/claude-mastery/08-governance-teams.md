---
title: Governance for teams
duration: ~5 min
description: Make it safe. Then make it stick.
---

## Rules for agents. Rules for people.

Governance needs two sets of rules. Rules for the agents, written in their context files. And rules for the people, written down where everyone can see them.

**For the agents** vs **For the people**

| In context files | In the playbook |
| --- | --- |
| CLAUDE.md and agent files | What data is off-limits |
| Allowed tools and folders | Who approves new tools |
| Checks before "done" | How work gets reviewed |

## Decide what goes where.

Start with data. Decide what never goes in a prompt. Which tools the agents may connect to. And who approves anything new.

- **Never in a prompt** — Secrets, keys, and restricted data
- **Approved tools** — Which connectors are allowed
- **Who approves** — One owner for anything new

## Ask before writing.

Then permissions. Allow list the safe commands, so it can move fast on the boring stuff. Deny anything sensitive, like your secrets file. Everything else, the agent asks first. And keep a log of what it changed.

**`.claude/settings.json`**

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(git diff:*)"
    ],
    "deny": [
      "Read(./.env)"
    ]
  }
}
```

- **Allow** — Safe commands run fast
- **Deny** — Secrets stay off-limits
- **Ask** — Everything else asks first

## Start small. Share everything.

Finally, roll out in steps. Pilot with one team for thirty days. Share a skills library in git. Review it every month, and keep what works.

1. **Pilot** — ""
2. **Share** — ""
3. **Review** — ""

## What you just learned.

- Rules for agents and for people
- Allow the safe, deny the sensitive
- Pilot → share → review monthly

> **Your mission:** Write a one-page AI playbook for your team — and pick the pilot group.

---
title: Connectors & MCP
duration: ~5 min
description: Plug the agent into the tools you already use.
---

## Connect. Don't paste.

Copying and pasting data into a chat goes stale the moment you do it. A connector lets the agent read live data, and take real actions.

**Copy & paste** vs **Connect the tool**

| Goes stale | Stays live |
| --- | --- |
| A snapshot, out of date in minutes | Reads the latest data |
| Limited to what you remembered | Finds what it needs on its own |
| You do every action by hand | Takes real actions, with approval |

## MCP is one plug for every tool.

The standard is called MCP, the Model Context Protocol. It gives the agent live data from your docs, tickets, and code. It lets the agent take real actions, like creating, updating, and sending. And it works the same way across harnesses.

- **Docs & files**
- **Tickets & CRM**
- **Code repos**
- **Real actions**

Works in: GitHub, Slack, Google Drive, Asana, Databases.

## A name, a command, a key.

Setting one up takes three things. A name, and a command to start the server. And a key. Keep the key in an environment variable. Never paste it into the file.

**`.mcp.json`**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

- **Name** — A name for the server
- **Command** — How to start it
- **Key** — The key comes from an env var

## Grant the least access that works.

Give the least access that works. Start read only. Use scoped tokens. And require approval for anything that writes or sends.

- **Read-only first** — Add write access later, on purpose
- **Scoped tokens** — Kept in env vars, never in files
- **Approve writes** — A human OKs anything that sends

## What you just learned.

- Connect, don't paste
- MCP: one plug for every tool
- Least access, keys in env vars

> **Your mission:** Connect one everyday tool — read-only — and ask the agent a question about it.

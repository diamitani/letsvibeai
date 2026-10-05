# Module 7 — Agents: harness, skills, tools, loops, goals and graphs

An agent is an AI model that works in a loop: it reads instructions, decides what to do, uses tools, checks the result and repeats until the goal is met. You build one by organizing its parts into folders, then asking a coding agent to wire them together.

### Lesson 7.1 — Chatbot vs agent

A **chatbot** answers one message at a time. An **agent** takes a goal ("research these 20 leads and draft emails"), plans the steps, calls tools (search, CRM, email), looks at what happened, and keeps going. Formula: **Agent = Model + Instructions + Tools + Memory + Loop.**

### Lesson 7.2 — The agent vocabulary

| Term | Plain English |
| --- | --- |
| LLM | The model doing the thinking (Claude, GPT, Gemini, Grok) |
| Model provider | The company serving that model by API |
| API | A doorway one program uses to ask another program for something |
| SDK | A software development kit: ready-made code for using an API in your language (Vercel AI SDK, Anthropic SDK) |
| ADK | An agent development kit: an SDK specifically for building agents (Google's ADK, Claude Agent SDK, OpenAI Agents SDK) |
| Agent harness | Everything wrapped around the model — instructions, tools, memory, loop, guardrails — that turns it into a worker |
| Agent runtime | Where and how the agent actually runs: the process that executes the loop, calls tools and streams results |
| Agent control panel | The dashboard where humans watch, approve, pause and review agents |
| AI gateway | One connection that routes requests to many model providers, with fallbacks, budgets and logging |
| MCP (Model Context Protocol) | An open standard for plugging tools and data into any agent — "USB-C for AI" |
| Sandbox | A locked-down, disposable computer where the agent can run real code safely, away from your files |

### Lesson 7.3 — The agent folder structure

Build an agent by giving each part its own folder. Start in Google Drive or your repo; type plain-language notes in each; ask your coding agent to fill in the rest and connect them.

```
/agent
  /instructions   what the agent does, its tone, rules for every situation
  /agents         the main agent's definition
  /sub-agents     delegated specialists (researcher, writer, reviewer)
  /skills         repeatable workflows, written as step-by-step recipes
  /tools          services it can use: email, CRM, search (often MCP servers)
  /functions      small single tasks reused across skills
  /knowledge      docs, user data, industry best practices
  /memory         how it remembers past sessions and users
  /harness        how all of the above is assembled
  /runtime        how it executes and produces the final artifact
  /gateway        which model providers and comms services it connects to
  /sandbox        where it runs code safely
```

**Example:** in `/tools`, make a doc that says just "email, CRM, calendar." Then prompt: *"For each tool listed in /tools, create an MCP server or connector, with the auth it needs and a test."*

### Lesson 7.4 — Skills, processes and thinking systems

A **skill** is a repeatable process the agent can apply to any matching task — written once, reused forever. Example: a "write a landing page" skill with steps for research, outline, copy, review. Skills turn one-off prompts into a system. Most modern harnesses (Claude Code, Codex, Hermes, OpenClaw) load skills from a folder automatically.

### Lesson 7.5 — Loops, goals and graphs

- **Loop engineering** — the agent keeps working through a checklist until every item is checked, testing after each step. Your job is writing the checklist and the test for "done."
- **Goals** — instead of steps, give a measurable goal ("all pages pass the accessibility check") and let the agent loop until it's met, with a cap on attempts and cost.
- **Graphs** — a map of steps (nodes) and paths between them (edges), including loops back. Example: *draft → review → (fail? back to draft) → publish.* Graphs make complex agents predictable.
- **Human in the loop** — pause for approval before anything irreversible: sending email, spending money, deleting data.

### Lesson 7.6 — The Vercel agent stack

| Piece | Role | Link |
| --- | --- | --- |
| Chatbot template | A complete, deployable chat app to start from | [chatbot.ai-sdk.dev](https://chatbot.ai-sdk.dev/demo) |
| AI SDK | TypeScript toolkit for calling models, tools and streaming | [ai-sdk.dev](https://ai-sdk.dev) |
| AI Gateway | One API for hundreds of models, with fallbacks and spend controls | [vercel.com/ai-gateway](https://vercel.com/ai-gateway) |
| AI Elements | Pre-built chat UI components | [elements.ai-sdk.dev](https://elements.ai-sdk.dev/) |
| Tools as packages | Template for packaging reusable agent tools | [GitHub template](https://github.com/vercel-labs/ai-sdk-tool-as-package-template) |
| Workflow SDK | Durable, multi-step workflows that survive restarts | [workflow-sdk.dev](https://workflow-sdk.dev/) |
| Chat SDK | Ship one agent to Slack, Teams, Discord and more | [chat-sdk.dev](https://chat-sdk.dev/) |
| Sandbox | Isolated VMs to run agent-written code | [vercel.com/sandbox](https://vercel.com/sandbox) |
| eve | Open-source agent framework: agents as folders of instructions, skills, tools and settings | [vercel.com/eve](https://vercel.com/eve) |
| Passport | Single sign-on identity for internal apps and agents | [vercel.com/passport](https://vercel.com/passport) |
| Connect | Short-lived OAuth tokens instead of stored secrets | [vercel.com/connect](https://vercel.com/connect) |
| Security | Firewall, bot protection, DDoS | [vercel.com/security](https://vercel.com/security) |

Further reading: [AI SDK templates](https://ai-sdk.dev/resources/templates), [vercel.com/ai](https://vercel.com/ai), and The Register's [overview of eve and Passport](https://www.theregister.com/devops/2026/06/19/vercel-debuts-eve-open-source-agent-framework-tries-to-fix-shadow-ai-with-passport/5258726).

**Exercise:** create the `/agent` folder for one agent in your app (e.g. a tutor or a lead researcher). Write 3–5 lines in each folder's notes file, then ask your coding agent to scaffold it with the AI SDK.

**Check yourself:**

1. What five things make an agent?
2. What's the difference between a skill and a tool?
3. Why should irreversible actions have a human in the loop?


---

[← Previous](./06-talking-to-ai.md) · [Course home](../README.md) · [Next →](./08-document-stack.md)

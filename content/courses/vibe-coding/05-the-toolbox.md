# Module 5 — The toolbox: coding harnesses, cloud and hosting

A coding harness is where you talk to the AI that writes your code. Beginners should start in a browser app builder, graduate to an AI code editor, and add a terminal coding agent once the project gets serious. For hosting, Vercel + GitHub covers almost every first app.

### Lesson 5.1 — Four kinds of coding harness

| Kind | What it feels like | Tools | Best for |
| --- | --- | --- | --- |
| App builders (browser) | Chat on one side, live app on the other; no installs | [Lovable](https://lovable.dev), [v0](https://v0.dev) by Vercel, [Figma Make](https://www.figma.com/make/) | First prototypes, landing pages, front-end designs |
| AI code editors (IDEs) | A full code editor with an AI agent built in | [Cursor](https://cursor.com), [Windsurf](https://windsurf.com), [Google Antigravity](https://antigravity.google/) | Day-to-day building once you own the code |
| Coding agents (terminal / extension) | You give a task; the agent plans, edits many files, runs commands and tests | [Claude Code](https://www.anthropic.com/claude-code), [OpenAI Codex](https://openai.com/codex/), [Cline](https://cline.bot), [OpenCode](https://opencode.ai), [AdaL](https://github.com/SylphAI-Inc/adal-cli) | Big multi-file features, refactors, scaffolding a whole repo |
| Personal agent runtimes | An always-on agent that lives in your chats, with memory and skills | [OpenClaw](https://composio.dev/content/openclaw-vs-hermes-agent), [Hermes Agent](https://composio.dev/content/openclaw-vs-hermes-agent) (Nous Research) | Automations and assistants around your business, not app scaffolding |

Notes on each:

- **Lovable** — builds full-stack apps from chat and connects natively to Supabase and Stripe; exports to GitHub.
- **v0** — Vercel's prompt-to-UI/app builder; deploys straight to Vercel.
- **Figma Make** — turns prompts and Figma designs into working prototypes; great for the design phase.
- **Cursor / Windsurf** — AI-first editors based on VS Code, with agent modes that edit across files.
- **Antigravity** — Google's agent-first IDE, where you manage several agents working in parallel.
- **Claude Code** — Anthropic's agentic coding tool in the terminal, IDE, desktop and web; strong at long, multi-step builds.
- **Codex** — OpenAI's coding agent, available as a CLI, IDE extension and cloud agent.
- **Cline / OpenCode / AdaL** — open-source or bring-your-own-model agents; flexible and cheaper at scale.
- **OpenClaw / Hermes** — open-source (MIT) agent runtimes that connect to messaging apps and learn skills over time.
- **HyperAgent** — several unrelated products share this name; confirm which one before teaching it.

**Recommended path:** prototype the look in v0, Lovable or Figma Make → export to GitHub → open the repo in Cursor or Antigravity → use Claude Code or Codex for big features.

### Lesson 5.2 — Cloud platforms

The cloud is renting someone else's computers by the minute. Three giants offer hundreds of services; simpler clouds trade options for ease.

| Platform | Character | When to use |
| --- | --- | --- |
| [AWS](https://aws.amazon.com) | Largest, most services; steepest learning curve | Enterprise customers, Bedrock models, heavy infrastructure |
| [Azure](https://azure.microsoft.com) | Microsoft's cloud; deep Office/Entra integration | Selling to Microsoft-centric companies, Azure AI Foundry |
| [Google Cloud (GCP)](https://cloud.google.com) | Strong in data, AI and Kubernetes | Gemini/Vertex AI, BigQuery analytics |
| [DigitalOcean](https://www.digitalocean.com) | Simple, predictable pricing | Your own small servers (VPS) for bots and background jobs |
| [Heroku](https://www.heroku.com) | The original "git push and it runs" platform | Simple back-end apps and APIs |

**Key terms:** a **compute instance** is one rented virtual computer (AWS EC2, Google Compute Engine). A **virtual private server (VPS)** is the simpler, flat-price version (DigitalOcean Droplets). **Serverless** means you upload code and the platform runs it only when needed — you never manage a server. Vercel runs your back end serverlessly.

### Lesson 5.3 — Hosting and deployment

| Tool | Role |
| --- | --- |
| [GitHub](https://github.com) | Stores your code and its full history; triggers deployments; GitHub Actions automates tests |
| [Vercel](https://vercel.com) | Hosts Next.js apps; every push to GitHub deploys automatically, with a preview URL per change |
| [Netlify](https://www.netlify.com) | Similar push-to-deploy hosting, strong for static and marketing sites |
| AWS (Amplify) / Azure (Static Web Apps) | Push-to-deploy hosting inside the big clouds, for enterprise requirements |

**The default beginner stack:** GitHub (code) → Vercel (deploy + host) → Supabase (database, auth, storage) → Stripe (payments) → Vercel AI SDK + AI Gateway (agents).

**Exercise:** start your **Technical Stack Key Sheet** — one row per building block from Module 4: tool, account link, plan/price, who owns the login, where the API keys are stored.

**Check yourself:**

1. When would you move from an app builder to an AI code editor?
2. What's the difference between a VPS and serverless?
3. What happens when you push code to GitHub with Vercel connected?


---

[← Previous](./04-web-app-architecture.md) · [Course home](../README.md) · [Next →](./06-talking-to-ai.md)

# LetsVibeAI — Architecture-First Vibe Coding Platform (v1.0)

> *Build, architect, and ship production-grade web apps with AI agents — no coding background required.*
> 
> **Live Web Application:** [letsvibeai.com](https://github.com/diamitani/letsvibeai)  
> **GitHub Repository:** [github.com/diamitani/letsvibeai](https://github.com/diamitani/letsvibeai)

---

## 🌟 The Core Promise

> *"You don't need to learn to code. You need to learn how software is put together — and how to tell AI exactly what to build."*

Traditional coding courses focus on syntax and memorization. **LetsVibeAI** teaches software architecture and agent direction:
1. **Principle 1: Direction Beats Guessing.** AI models hallucinate when prompts are vague. When you provide technical architecture, data models, auth constraints, and definitions of done, agents produce production code on the first pass.
2. **Principle 2: Every App Has an Architecture.** A web app is built from 11 interconnected building blocks. If you build UI before database and auth foundations, the app collapses.

---

## 🚀 Features & Platform Capabilities

### 1. 🎥 HyperFrames Cinematic Video Compositions
- **Official Course Trailer (`/videos/trailer`)**: High-energy 16s 60fps motion graphic video explaining the film-director mindset and the 11 building blocks.
- **11 Building Blocks Explainer (`/videos/architecture-explainer`)**: 18s 60fps animated request trace following a user action through Browser → OAuth → Server → Postgres RLS → Stripe → AI Agent loop.
- Authored with GSAP timelines and rendered deterministically to MP4 using the `hyperframes` engine.

### 2. 🗺️ Interactive 11-Block Architecture Visualizer
- Visual node graph with an interactive **"Simulate Live User Request Flow"** animation.
- Deep-dive inspector drawer for every building block (Front End, Auth, Database, Storage, Payments, Agent, Git, Deployment).
- Security & scale guidance (Postgres RLS, httpOnly cookies, server environment secrets).

### 3. 📚 10 Core Course Modules with Interactive Quizzes
- Complete syllabi with plain-English breakdowns, real-world analogies, copy-paste prompts, and hands-on exercises.
- **Interactive 3-Question Knowledge Checks** with instant feedback, explanations, score calculations, and celebratory confetti on 100% completion.

### 4. ⚡ Prompt Studio & Token Cost Estimator
- **Prompt Architect**: Turns raw ideas into production-ready system prompts and context packs.
- **Token Cost Estimator**: Live sliders for DAU, queries/day, and token lengths with real-time monthly cost comparisons across Claude 3.7 Sonnet, GPT-4o, DeepSeek R1, and Gemini 2.5 Flash.

### 5. 📑 The 11-Document Planning Stack
- Complete templates for `01-prd.md` through `11-gtm-plan.md` with instant copy and markdown file download.

### 6. 🏆 Capstone Project Hub & Verified Certificate Generator
- 100-point grading rubric tracking project deliverables.
- Interactive **Certificate of Completion Generator** with custom student name, verification ID, and instant print/export support.

---

## 🛠️ The 11 Building Blocks

| # | Block | Role (Plain English) | Analogy | Default Tool |
|---|---|---|---|---|
| 1 | **Front End** | The public website users see in their browser | The Storefront | Next.js / Vite + Tailwind CSS |
| 2 | **Dashboard** | The logged-in workspace where users do the work | The Back Office | Next.js App Routes |
| 3 | **Chat UI** | The streaming chat window for talking to AI agents | The Help Desk | Vercel AI SDK |
| 4 | **Storage** | Holds images, PDFs, audio, and user uploads | The Filing Cabinet | Supabase Storage / S3 |
| 5 | **Database** | Relational tables with Row-Level Security (RLS) | The Secure Master Ledger | Supabase (Postgres) |
| 6 | **Auth & OAuth** | Sign-up, Google sign-in, session tokens | The Keycard Entry Gate | Supabase Auth / Clerk |
| 7 | **Payments** | Checkout sessions, subscriptions, webhooks | The Cash Register | Stripe Billing |
| 8 | **Agent Harness** | System instructions, tool schemas, memory | The Employee Handbook | Vercel AI SDK / Claude |
| 9 | **Versioning** | Tracking every commit and rollback point | Video Game Save Points | Git + GitHub |
| 10 | **Deployment** | Automated CI/CD builds on every git push | The Moving Truck | Vercel Edge Platform |
| 11 | **Hosting** | Edge servers delivering the web app globally | The Building Ground | Vercel Cloud |

---

## 📖 Course Modules Overview

1. [Module 1 — What is Vibe Coding?](modules/01-what-is-vibe-coding.md)
2. [Module 2 — AI Fundamentals: ML, LLMs, Tokens & GPUs](modules/02-ai-fundamentals.md)
3. [Module 3 — The AI Landscape: Model Providers & Platforms](modules/03-ai-landscape.md)
4. [Module 4 — Web App Architecture: The Building Blocks](modules/04-web-app-architecture.md)
5. [Module 5 — The Toolbox: Coding Harnesses, Cloud & Hosting](modules/05-the-toolbox.md)
6. [Module 6 — Talking to AI: Prompting, Chains & Context Engineering](modules/06-talking-to-ai.md)
7. [Module 7 — Agents: Harness, Skills, Tools, Loops, Goals & Graphs](modules/07-agents.md)
8. [Module 8 — The Document Stack: 11 Planning Docs Written with AI](modules/08-document-stack.md)
9. [Module 9 — The Build Process: Front End to Back End to Agent Review](modules/09-build-process.md)
10. [Module 10 — Ship It: Versioning, Deployment, Hosting & Launch](modules/10-ship-it.md)
11. [Capstone — Build & Demo a Revenue-Ready App](capstone/README.md)

---

## 💻 Local Development & Build

### Prerequisites
- Node.js 18+
- npm

### 1. Run Web Application
\`\`\`bash
# Install dependencies
npm install

# Start Vite dev server on localhost:3000
npm run dev

# Build production bundle
npm run build
\`\`\`

### 2. HyperFrames Video Compositions
\`\`\`bash
# Lint the trailer composition
cd videos/trailer && npx hyperframes lint

# Render trailer to MP4
npx hyperframes render -o ../../public/videos/letsvibeai-trailer.mp4

# Lint the architecture explainer composition
cd ../architecture-explainer && npx hyperframes lint

# Render architecture explainer to MP4
npx hyperframes render -o ../../public/videos/letsvibeai-architecture-explainer.mp4
\`\`\`

---

## 📄 License & Attribution

Designed and built for the **LetsVibeAI** community.  
Authored under the **Site Empire OS** / **PAL × SDLC** architecture doctrine.

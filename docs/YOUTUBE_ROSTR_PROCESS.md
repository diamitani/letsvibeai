# LetsVibeAI — Video ROSTR & YouTube Tutorial Process

## 1. Overview
The **LetsVibeAI Video ROSTR** is a curated, verified catalog of video tutorials and daily executive briefs designed to guide learners from fundamental vibe coding principles to advanced agentic architecture.

This catalog is maintained **as code** in:
- Manifest file: `src/data/videoRostrData.ts`
- Automated CLI script: `scripts/update_video_rostr.py`
- In-app interactive submit drawer: Located in the **Ecosystem Hub & Directory** view.

---

## 2. Core Pillars of the ROSTR
1. **Daily Vibe Briefs**: Short, high-signal 3–5 minute daily briefings rendered with neural voiceover and motion graphics. Highlighted prominently on the Home Introduction page to engage visitors from LinkedIn and YouTube.
2. **Foundational Mastered Curriculum**: The 10 original modules + Capstone, 100% free with local mastered MP4 streaming and YouTube fallback.
3. **Curated YouTube ROSTR**: High-leverage lectures, walk-throughs, and tutorials from leading industry engineers (Andrej Karpathy, Anthropic, Cursor, Vercel, Supabase, Google DeepMind).

---

## 3. How to Update the ROSTR

### A. Via the CLI Tool (`scripts/update_video_rostr.py`)
Run the Python script directly from your terminal or within an agent session:

```bash
# 1. List current items in the ROSTR
python3 scripts/update_video_rostr.py --list

# 2. Add a new YouTube Tutorial
python3 scripts/update_video_rostr.py --add \
  --url "https://youtu.be/EXAMPLE_ID" \
  --title "Advanced Next.js 15 Streaming with Vercel AI Gateway" \
  --creator "Vercel Engineering" \
  --creator-url "https://youtube.com/@VercelHQ" \
  --category "Agent Workflows & MCP" \
  --duration "18:30" \
  --level "Advanced" \
  --summary "Learn how to configure fallback models and rate limit budgets." \
  --takeaways "Zero-latency streaming,Zod tool schemas,AI Gateway routing" \
  --tags "Next.js,AI Gateway,Vercel" \
  --featured

# 3. Synchronize a new Daily Vibe Brief
python3 scripts/update_video_rostr.py --sync-daily \
  --date "October 10, 2026" \
  --title "Multi-Agent Orchestration & Jev Verification" \
  --mp4 "/videos/daily/ai-daily-brief-2026-10-10.mp4" \
  --duration "3:40" \
  --highlights "Subagent delegation,Tool sandboxes,Verification gates" \
  --tool "Antigravity & Claude Code"
```

### B. Via the In-App Web Interface
1. Navigate to **Directory & Hub** (`/directory`).
2. Click **"Update / Suggest ROSTR Tutorial"**.
3. Paste the YouTube link and select the subject category.
4. The system compiles a valid TypeScript manifest entry and copies it to your clipboard.

---

## 4. Quality & Taxonomy Standards
All entries must satisfy the **One Must Act** standard:
- **No broken links**: YouTube IDs must be verified 11-character identifiers.
- **Concrete takeaways**: Every tutorial must list at least 2 actionable takeaways.
- **Approved Categories**:
  - `Harness Setup` (Claude Code, Cursor, Codex, Antigravity)
  - `Fullstack Vibe Coding` (Next.js, Vite, React 19, Tailwind)
  - `Agent Workflows & MCP` (Model Context Protocol, Vercel AI SDK, Tools)
  - `Prompt Architecture & PAL` (Prompts, Specs, PRDs, System Instructions)
  - `Database & Auth` (Supabase Postgres, RLS, OAuth, Stripe)
  - `Deployment & Scale` (Git, Vercel, Rollbacks, Monitoring)

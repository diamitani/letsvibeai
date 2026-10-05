# CurriculumOS — AI Curriculum Architect

**Full-stack web app with chat UI** that researches learning resources across the web, builds structured indexes, and generates personalized curricula — powered by the ROSTR multi-agent framework.

---

## Architecture

```
User (Chat UI) → PAL Compiler → Research Engine → Master Index → Curriculum Generator
                    ↓                ↓                ↓               ↓
               Intent Extract    Web Search      Taxonomy Build   Personalized
               Context Inject    Source Tiering   Cross-Reference   Lesson Plans
```

Built on the **ROSTR framework** (Runtime, Orchestration, State, Tools, Reference):
- **PAL** — Prompt Abstraction Layer: NL intent → agent manifest
- **RAG DAL** — 3-tier knowledge retrieval with credibility scoring
- **NPAO** — 5D phase taxonomy + 4D priority allocation
- **Hub** — 4-level persistent state for knowledge compounding

---

## Quick Start

```bash
# Clone and start
git clone https://github.com/diamitani/curriculum-os.git
cd curriculum-os
./start.sh
```

Then open **http://localhost:3002** and describe what you want to learn.

---

## Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 + Tailwind CSS + Lucide Icons |
| **Backend** | FastAPI (Python) |
| **AI** | DeepSeek API (optional — works in simulated mode) |
| **Deploy** | Vercel (frontend) |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/health` | Health check |
| `POST` | `/api/v1/research` | Discover learning resources |
| `POST` | `/api/v1/index` | Build master resource index |
| `POST` | `/api/v1/generate` | Generate personalized curriculum |

---

## Adding DeepSeek API Key

```bash
export DEEPSEEK_API_KEY="sk-..."
```

With the API key, the system uses LLM-powered search, intelligent taxonomy building, and custom PAL-generated gap-filling content. Without it, it falls back to simulated mode with structured default curricula.

---

## Project Structure

```
curriculum-os/
├── backend/                  # FastAPI Python backend
│   ├── src/curriculum_agent/ # ROSTR pipeline modules
│   │   ├── pal/              # Intent compiler
│   │   ├── research/         # Resource discovery engine
│   │   ├── index/            # Master index builder
│   │   ├── curriculum/       # Curriculum generator
│   │   ├── ragdal/           # Knowledge retrieval pipeline
│   │   └── npao/             # Orchestration & allocation
│   └── tests/                # 27 test cases
├── frontend/                 # Next.js 15 chat UI
│   └── src/
│       ├── app/              # App router + API routes
│       └── components/       # Chat UI + curriculum display
└── start.sh                  # One-command launcher
```

---

## License

MIT © Patrick Diamitani

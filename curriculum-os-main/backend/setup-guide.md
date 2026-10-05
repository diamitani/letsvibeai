# CurriculumOS — Setup Guide

## Step-by-Step Deployment

---

## Prerequisites

- Python 3.11 or higher
- A DeepSeek API key (sign up at [platform.deepseek.com](https://platform.deepseek.com))
- pip package manager
- Git (for version control)
- Optional: Docker (for containerized deployment)

---

## Step 1: Clone & Install

```bash
git clone https://github.com/rostr-ai/curriculum-os.git
cd curriculum-os

python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

---

## Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

```ini
DEEPSEEK_API_KEY=sk-your-key-here
```

Get your DeepSeek key at [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys).

---

## Step 3: Verify Configuration

```bash
python -m src.curriculum_agent.config --verify
```

Expected output:
```
✓ DeepSeek API key configured
✓ RAG DAL confidence threshold: 0.8
✓ Knowledge base path: ./rostr-hub/knowledge-base
✓ Rostr Hub initialized
  Ready to research, index, and generate.
```

---

## Step 4: Run Your First Curriculum

### CLI Mode

```bash
python -m src.curriculum_agent --topic "reinforcement learning" \
  --level intermediate \
  --output curriculum.md
```

### API Server Mode

```bash
uvicorn src.curriculum_agent.main:app --reload --port 8000
```

Test the API:

```bash
curl -X POST http://localhost:8000/research \
  -H "Content-Type: application/json" \
  -d '{"topic": "reinforcement learning", "depth": "intermediate"}'
```

---

## Step 5: Export & Deploy

### As a Claude Skill

Copy `skill/SKILL.md` to your Claude skills directory:

```bash
cp skill/SKILL.md ~/.claude/skills/curriculum-os/
```

Then activate in Claude Code:
```
/skill curriculum-os
```

### As a Standalone Agent

The `standalone/` directory contains a fully self-contained agent package.

### As an OpenClaw Agent

Copy the `openclaw/` directory into your OpenClaw workspace.

---

## API Key Setup Reference

| Service | Key Required | Where to Get It |
|---------|-------------|-----------------|
| **DeepSeek** | `DEEPSEEK_API_KEY` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |

DeepSeek is the default and recommended backend. The free tier provides sufficient credits for hundreds of curricula.

---

## Testing

```bash
# Run all tests
pytest tests/ -v

# Test specific module
pytest tests/test_pal.py -v
pytest tests/test_research.py -v
pytest tests/test_curriculum.py -v
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DEEPSEEK_API_KEY` | Yes | — | DeepSeek API authentication |
| `DEEPSEEK_MODEL` | No | `deepseek-chat` | Model identifier |
| `RAGDAL_CONFIDENCE_THRESHOLD` | No | `0.8` | Minimum confidence to stop research |
| `RAGDAL_MAX_PASSES` | No | `3` | Maximum research iterations |
| `RAGDAL_CACHE_TTL_HOURS` | No | `72` | Research cache duration |
| `KNOWLEDGE_BASE_PATH` | No | `./rostr-hub/knowledge-base` | Where to persist knowledge |
| `NPAO_DEFAULT_PATTERN` | No | `sequential` | Orchestration pattern |
| `NPAO_MAX_PARALLEL_TASKS` | No | `5` | Parallel task limit |
| `API_HOST` | No | `0.0.0.0` | API server bind address |
| `API_PORT` | No | `8000` | API server port |
| `LOG_LEVEL` | No | `info` | Logging verbosity |

---

## Docker Deployment (Optional)

```dockerfile
# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "src.curriculum_agent.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t curriculum-os .
docker run -p 8000:8000 -e DEEPSEEK_API_KEY=sk-your-key curriculum-os
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` |
| `DeepSeek API error` | Verify `DEEPSEEK_API_KEY` is set correctly |
| `No resources found` | Check `RAGDAL_MAX_PASSES` — increase if topic is niche |
| `Index empty` | Run research before index — they are sequential |
| `Curriculum has gaps` | The agent will flag coverage gaps; review and re-run with more specific query |
| `Permission denied` | Ensure `rostr-hub/` directory is writable |

---

*Built on the ROSTR Agent Framework — PAL + RAG DAL + NPAO + Rostr Hub*

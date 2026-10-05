# CurriculumOS Setup Questionnaire

## Before You Begin

Answer these questions to configure CurriculumOS for your environment.

---

### 1. Where will you run CurriculumOS?

Choose your target platform:

- [ ] **Claude Code / Cowork** — Install as a skill (`skill/SKILL.md`)
- [ ] **Claude.ai** — Use as a project (`claude-project/`)
- [ ] **API Server** — Run the FastAPI server (`src/`)
- [ ] **OpenClaw** — Use as an OpenClaw agent (`openclaw/`)
- [ ] **Standalone** — Platform-independent agent (`standalone/`)

### 2. API Keys

| Key | Required | Where to Get It | Configured? |
|-----|----------|-----------------|-------------|
| `DEEPSEEK_API_KEY` | Yes | https://platform.deepseek.com/api_keys | [ ] |

### 3. DeepSeek Model

- [ ] `deepseek-chat` (default, recommended)
- [ ] `deepseek-reasoner` (for complex curriculum reasoning)

### 4. Research Depth

- [ ] **Standard** (3-pass RAG DAL, ~30-60s per topic)
- [ ] **Deep** (5-pass, ~2-3 min, more thorough coverage)
- [ ] **Quick** (1-pass, ~10s, best-effort)

### 5. Knowledge Persistence

- [ ] **Local files** (default: `rostr-hub/knowledge-base/`)
- [ ] **Custom path** (specify: _______________)

### 6. Export Format Preference

- [ ] JSON (default, API-friendly)
- [ ] Markdown (human-readable)
- [ ] CSV (spreadsheet-compatible)
- [ ] All of the above

### 7. Test Run

After setup, run a test:

```bash
python -m src.curriculum_agent --topic "testing" --verify
```

Then try:

```bash
python -m src.curriculum_agent --topic "Python basics" --level beginner --output test-curriculum.md
```

---

## Verification Checklist

Before first use, confirm:

- [ ] `DEEPSEEK_API_KEY` is set in `.env` or environment
- [ ] `pip install -r requirements.txt` completed successfully
- [ ] `python -m src.curriculum_agent --verify` passes all checks
- [ ] Test curriculum generates without errors
- [ ] Rostr Hub directories are writable
- [ ] Export files are in the correct format for your target platform

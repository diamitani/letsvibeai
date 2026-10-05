# Decisions Log

## 2026-06-03: Initial Architecture Decision
- **Decision:** Use DeepSeek API as primary LLM backend
- **Rationale:** Cost-effective ($0.001/curriculum), good instruction-following, MIT-license compatible
- **Alternatives considered:** OpenAI (more expensive), Claude (API key required), local models (too slow)
- **Status:** Implemented

## 2026-06-03: Three-Layer Architecture
- **Decision:** Separate Research → Index → Generate into distinct pipeline stages
- **Rationale:** Enables independent operation of each layer, easier testing, clear state boundaries
- **Alternatives considered:** Single end-to-end generation (less flexible, harder to debug)
- **Status:** Implemented

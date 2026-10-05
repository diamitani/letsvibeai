# System Architecture: LetsVibeAI & ROSTR v2 Runtime Integration

**System Version:** 2.0.0-PROD  
**Owner:** System Architect  
**Governing Frameworks:** ROSTR v2 (PAL · RAG DAL · NPAO · ContextEngine) · Vercel AI SDK Stack · AWS Well-Architected Framework (Six Pillars)

---

## 1. Executive Summary

**LetsVibeAI** integrates the **ROSTR v2** multi-agent runtime and the **Vercel AI SDK backend sandbox** to solve the five fundamental bottlenecks of vibe-coded AI systems:
1. **Prompting Bottleneck:** Replaced by **PAL (Prompt Abstraction Layer)** compiling natural language requests into typed YAML agent manifests.
2. **Retrieval Brittleness:** Replaced by **RAG DAL (Dynamic Acquisition Layer)** multi-pass credibility-stratified retrieval.
3. **Task Routing Drag:** Replaced by **NPAO & 5D Lifecycle** prioritizing tasks by cognitive and technical friction (Necessity → Anxiety → Priority → Opportunity).
4. **Context Loss:** Compounded across project workspaces via **Rostr Hub** multi-namespace memory.
5. **Session Amnesia:** Eliminated via **ContextEngine** append-only execution trace logging.

---

## 2. High-Level C4 System Architecture Diagram

```text
                                  +---------------------------------------+
                                  |         CLIENT SURFACES (BROWSER)     |
                                  |  - Next.js / Vite React 19 Frontend   |
                                  |  - Curriculum Agent Drawer            |
                                  |  - Vercel AI Portfolio Sandbox        |
                                  |  - 11-Block Architecture Visualizer   |
                                  +-------------------+-------------------+
                                                      |
                                                      | HTTPS / SSE Streaming
                                                      v
                                  +---------------------------------------+
                                  |         GATEWAY & EDGE ROUTER         |
                                  |  - Cloudflare / Vercel Edge (WAF)     |
                                  |  - Session Verification (httpOnly)    |
                                  +-------------------+-------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
                         v                                                         v
    +--------------------------------------+             +---------------------------------------+
    |       ROSTR v2 AGENT RUNTIME         |             |      BACKEND VERCEL AI SANDBOX        |
    |                                      |             |                                       |
    | 1. PAL Compiler (5-stage)            |             | 1. Vercel AI SDK (streamText)         |
    | 2. RAG DAL (3-Tier Grounding)        |             | 2. Typed Tool Calling with Zod Schemas|
    | 3. NPAO Scheduler (5D Lifecycle)     |             | 3. Multi-Model Router (Claude/GPT/R1) |
    | 4. ContextEngine (Append Ledger)     |             | 4. Telemetry (Tokens, Latency, Cost)  |
    +------------------+-------------------+             +-------------------+-------------------+
                       |                                                     |
                       +----------------------------+------------------------+
                                                    |
                                                    v
                                  +---------------------------------------+
                                  |     PERSISTENCE & SECURITY VAULT      |
                                  |                                       |
                                  | 1. Supabase Postgres with RLS         |
                                  |    - profiles (auth.uid() = id)       |
                                  |    - projects (tenant isolation)      |
                                  |    - messages (vector pgvector)       |
                                  | 2. Stripe Webhook Truth Engine        |
                                  | 3. Server Environment Secret Store    |
                                  +---------------------------------------+
```

---

## 3. The Five ROSTR v2 Pillars in LetsVibeAI

### Pillar 1: PAL (Prompt Abstraction Layer)
- **Stage 1: Intent Extraction:** Parses raw student prompt for imperative verbs and domain signals (`Auth:OAuth`, `Database:Postgres`, `Payments:Stripe`, `AI:VercelAISDK`). Calculates ambiguity score (0.0 to 1.0).
- **Stage 2: Context Injection:** Pulls relevant specs from `/context` and RAG DAL corpus.
- **Stage 3: Semantic Enhancement:** Transforms loose directives into measurable definitions of done and explicit completion criteria.
- **Stage 4: Runtime Compilation:** Emits strictly typed `PalManifest` with allowed/denied tool policies.
- **Stage 5: Deterministic Routing:** Directs to builder, researcher, reviewer, or deployer sub-agents.

### Pillar 2: RAG DAL (Dynamic Acquisition Layer)
Enforces a 3-tier credibility hierarchy:
- **Tier 1 (Authoritative / Ground Truth, weight: 1.00):** 10 Course Modules, 11 Planning Docs, Postgres RLS rules, Stripe webhook contracts.
- **Tier 2 (Verified Specifications, weight: 0.75):** Next.js App Router docs, Supabase Auth specs, Vercel AI SDK docs.
- **Tier 3 (Community & Examples, weight: 0.40):** Student testimonials, prompt library examples.

Confidence formula:
$$\text{Confidence} = 0.35(\text{SourceScore}) + 0.30(\text{Consistency}) + 0.25(\text{TierWeight}) + 0.10(\text{Recency})$$

### Pillar 3: NPAO & The 5D Lifecycle
Tasks are prioritized by friction before building:
1. **Necessity:** Hard blockers (broken RLS, missing env keys, build failures).
2. **Anxiety:** Ambiguous specs or unverified third-party APIs.
3. **Priority:** Core product roadmap and primary JTBD deliverables.
4. **Opportunity:** Optimizations, voice synthesis, multi-model fallback extensions.

Mapped across the 5D Lifecycle:
`PreD (Envision)` → `D1 (Discover)` → `D2 (Design)` → `D3 (Develop)` → `D4 (Deploy)`

### Pillar 4: Rostr Hub
Multi-namespace persistent state:
- `global/`: Universal course doctrines and Well-Architected standards.
- `team/`: Cohort peer reviews and instructor grading templates.
- `project/`: Student project briefs, PRDs, and database schemas.

### Pillar 5: ContextEngine
Append-only JSONL execution ledger (`.rostr/context-engine/run.jsonl`) recording actor, action, status, and metadata for every curriculum agent and sandbox execution.

---

## 4. Backend Sandbox Vercel AI Stack Architecture

The backend sandbox allows students to test AI agents with zero local setup:
- **Streaming Protocol:** Standard Server-Sent Events (SSE) via Vercel AI SDK `streamText`.
- **Tool Calling Sandbox:**
  - `extract_clauses`: Legal agreement section extraction.
  - `query_supabase_rls`: Multi-tenant data retrieval adhering to Postgres RLS policies.
  - `verify_stripe_entitlement`: Verifies customer subscription status via cryptographic webhooks.
- **Circuit Breakers & Token Safety:**
  - Hard limit on max output tokens (default: 4,000).
  - Rate limiting per session to avoid token cost overrun.
  - Server-side environment variable isolation: Client never receives secret keys.

---

## 5. AWS Well-Architected Framework 6-Pillar Review

| Pillar | Implementation in LetsVibeAI & ROSTR v2 |
|---|---|
| **Operational Excellence** | Append-only ContextEngine logging, automated CI/CD preview deployments via Vercel, reproducible PAL manifests. |
| **Security** | Postgres Row-Level Security (RLS) enabled on all tables; secrets stored exclusively in server environment variables; zero client-side secret exposure; Stripe webhook signature verification. |
| **Reliability** | Multi-model fallback routing (Claude 3.7 Sonnet → GPT-4o → Gemini Flash); stateless edge server execution. |
| **Performance Efficiency** | Streaming responses via Vercel AI SDK SSE; edge caching; pre-compiled GSAP HyperFrames animation assets. |
| **Cost Optimization** | Token Cost Estimator; dynamic model routing sending simple tasks to low-cost models ($0.15/M) and preserving frontier models for reasoning. |
| **Sustainability** | Serverless compute scaling down to zero when idle; lightweight code bundles. |

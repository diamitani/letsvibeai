# ROSTR System Architecture & Agent Operational Guide

> **ROSTR** stands for **Runtime, Orchestration, State, Tools, and Reference**.  
> It is a modular multi-agent operating system designed for deterministic intent translation, credibility-weighted retrieval, phase-aware workflow orchestration, persistent knowledge compounding, and zero-infrastructure session continuity.

---

## 1. Executive Summary & Core Definitions

ROSTR solves the five foundational bottlenecks of multi-agent systems:
1. **Prompting Bottleneck:** Translates messy user requests into strictly typed agent manifests via **PAL**.
2. **Retrieval Brittleness:** Replaces single-pass search with multi-pass, credibility-weighted information gathering via **RAG DAL**.
3. **Naive Task Routing:** Replaces keyword-based delegation with cognitive and lifecycle-aware routing via **NPAO** and the **5D Lifecycle**.
4. **Context Loss:** Compounds organizational knowledge across teams and projects via the multi-namespace **Rostr Hub**.
5. **Session Amnesia:** Eliminates cold-start context loss across runs via flat-file, append-only **ContextEngine**.

```
                           +------------------------------------+
                           |        USER / CLIENT LAYER         |
                           |  (Natural Language / CLI / API)    |
                           +-----------------+------------------+
                                             |
                                             v
                           +------------------------------------+
                           |    COMPILATION LAYER: PAL          |
                           |  Parse -> Ambiguity -> Intent ->   |
                           |  Semantic Enhancement -> Manifest  |
                           +-----------------+------------------+
                                             |
                                             v
                           +------------------------------------+
                           |     DECISION LAYER: NPAO & 5D      |
                           |  Necessity -> Anxiety -> Priority  |
                           |  -> Opportunity | Phase 0-4 Routing |
                           +-----------------+------------------+
                                             |
                                             v
                     +-----------------------+-----------------------+
                     |            EXECUTION LAYER (Agents)           |
                     |  - Builder   - Researcher  - Reviewer/QA      |
                     |  - Deployer  - Debugger    - Integrator       |
                     +-----------+-------------------+---------------+
                                 |                   |
                       (Knowledge Needs)     (State & Continuity)
                                 |                   |
                                 v                   v
                     +-------------------+   +-----------------------+
                     |      RAG DAL      |   |       ROSTR HUB       |
                     |  3-Tier Search    |   |  - Namespaces (Global,|
                     |  Convergence Loop |   |    Org, Team, Project)|
                     |  Credibility Gate |   |  - ContextEngine Logs |
                     +-------------------+   +-----------------------+
```

---

## 2. The 5 Core Pillars

### Pillar 1: PAL (Prompt Abstraction Layer)
*The Compiler for Agent Instructions.*

PAL converts unpolished, loosely typed natural language into strictly typed, executable runtime manifests.

```
[Raw User Input]
       │
       ▼
[Stage 1: Intent Extraction] ──► Parse imperative verbs, domain signals, constraints & ambiguity score
       │
       ▼
[Stage 2: Context Injection]  ──► Query Reference Hub & ContextEngine within token budget
       │
       ▼
[Stage 3: Semantic Enhancement]─► Expand ambiguous directives into measurable success criteria
       │
       ▼
[Stage 4: Runtime Compilation] ──► Output structured Agent Manifest (YAML/JSON)
       │
       ▼
[Stage 5: Deterministic Routing]─► Route to NPAO for agent matching & phase alignment
```

#### PAL Manifest Output Contract
```yaml
runtime:
  agent_type: builder | researcher | reviewer | designer | deployer | debugger
  model: claude-sonnet-4-6 | claude-opus-4 | auto-select
  temperature: 0.2
instructions:
  task_description: "Explicit, unambiguous directive with numbered steps"
  completion_criteria:
    - "Criterion 1 with measurable threshold"
    - "Criterion 2 verified against automated test/schema"
  escalation_policy: require_approval | auto_proceed | human_in_the_loop
tools_enabled:
  allow: [filesystem_read, execute_python, search_web]
  deny: [production_db_drop, force_push_main]
memory:
  mode: session | project | persistent
  context_sources: ["projects/core-app", "org/engineering-standards"]
```

---

### Pillar 2: RAG DAL (Dynamic Acquisition Layer)
*Autonomous, Credibility-Stratified Information Gathering.*

Agents must not rely on unvalidated, single-pass web queries. RAG DAL enforces a 3-tier credibility hierarchy and an autonomous convergence loop:

#### Three-Tier Source Hierarchy
| Tier | Classification | Credibility Weight | Qualifying Sources |
| :--- | :--- | :---: | :--- |
| **Tier 1** | **Authoritative / Primary** | `1.00` | Academic papers (arXiv, PubMed), official documentation (`.gov`, `.edu`, official SDK specs), standards bodies (W3C, IETF, ISO). |
| **Tier 2** | **Verified Editorial / Industry** | `0.75` | Major trade publications (TechCrunch, WSJ, Reuters), peer-reviewed industry analysis (Gartner, Forrester). |
| **Tier 3** | **Community / UGC** | `0.40` | Forums, Reddit, Stack Overflow, GitHub discussions, personal blogs (used for sentiment, edge-case hints, or ground-truth verification). |

#### Autonomous Convergence Protocol
1. **Pass 1 (Broad Sweep):** Decompose query into sub-topics; search across all tiers to establish baseline corpus.
2. **Pass 2 (Gap Fill):** Detect missing or low-confidence sub-topics; run targeted searches on Tier 1 and Tier 2 sources.
3. **Pass 3 (Deep Verification):** Resolve conflicting claims against Tier 1 primary sources; flag irreconcilable gaps as `UNCERTAIN`.
4. **Pass 4 (Boundary Fallback):** If unresolved after 3 passes, mark status as `OPEN` and proceed with stated risk boundaries.

$$\text{Confidence} = 0.35(\text{SourceScore}) + 0.30(\text{ConsistencyScore}) + 0.25(\text{TierWeight}) + 0.10(\text{RecencyScore})$$

---

### Pillar 3: NPAO & The 5D Lifecycle
*Phase-Aware Prioritization & Task Execution.*

NPAO sequences tasks based on real-world impact and cognitive friction, rather than naive urgency:

```
                      EXECUTION SEQUENCE
                      
  [1. NECESSITY]   ──► Hard blockers, broken builds, failing health checks.
         │             (Must be resolved first)
         ▼
  [2. ANXIETY]     ──► High cognitive drag, ambiguous specs, undocumented risks.
         │             (Clear friction before building)
         ▼
  [3. PRIORITY]    ──► Core mission deliverables, primary product roadmap features.
         │             (The primary value driver)
         ▼
  [4. OPPORTUNITY] ──► Optimizations, refactors, exploratory extensions.
                       (Execute when core pipeline is healthy)
```

#### The 5D Lifecycle Taxonomy
| Phase | Stage Name | Focus Question | Required Gate / Exit Criteria |
| :--- | :--- | :--- | :--- |
| **Phase 0** | **PreD** (Pre-Development) | *Is this worth building?* | Problem stated in 1 sentence; 3 alternatives evaluated; kill/go decision recorded. |
| **Phase 1** | **Design** | *What exactly are we building?* | System architecture, data contracts, API schemas, and failure states documented. |
| **Phase 2** | **Development** | *Does it work?* | Feature implemented, passing unit/integration tests, zero unhandled errors. |
| **Phase 3** | **Deployment** | *Is it safe to ship?* | Automated linting passed, CI/CD pipeline green, rollback plan defined. |
| **Phase 4** | **Debugging** | *What broke and why?* | Root-cause analysis documented; regression test written; fix verified. |

---

### Pillar 4: Rostr Hub
*Persistent, Multi-Namespace Knowledge Architecture.*

Rostr Hub provides multi-agent communication and persistent state memory structured into 4 hierarchical namespaces:

```
  [Global Namespace]   ──► Enterprise policies, architectural rules, global tool manifests
         │
         ▼
  [Org Namespace]      ──► Organization-wide design tokens, compliance rules, core APIs
         │
         ▼
  [Team Namespace]     ──► Team conventions, shared domain models, active sprint goals
         │
         ▼
  [Project Namespace]  ──► Local state, feature branches, decision logs, active session checkpoints
```

* **Invariance Rule:** Agents can read downstream and local namespaces automatically; cross-project access requires explicit authorization.

---

### Pillar 5: ContextEngine
*Zero-Infrastructure, Flat-File Session Continuity.*

ContextEngine eliminates session amnesia by appending session state into structured, human-readable markdown/JSON artifacts at the root of the project:

#### 5 Operational Modes
1. `CACHE`: Append immediate run results, architectural decisions, and error logs.
2. `RETRIEVE`: Extract relevant historical decisions and prior solutions before initiating work.
3. `REPORT`: Produce structured summaries of what was accomplished during a session.
4. `QUERY`: Allow subagents to interrogate past execution runs for specific error patterns.
5. `SCHEDULE`: Queue deferred tasks for subsequent agent cycles.

---

## 3. Agent Operating Rules & Invariants

When acting within the ROSTR framework, every agent must adhere to the following non-negotiable rules:

1. **PAL First:** Never execute ad-hoc or vague instructions. Every task must be expanded with clear completion criteria and constraints before execution begins.
2. **Phase Verification:** Classify the active task into its 5D Phase (PreD, Design, Development, Deployment, Debugging). Never write production code during PreD or Design.
3. **Credibility Gating:** Never cite unverified community claims as factual architectural ground truth. Anchor core logic in Tier 1 documentation.
4. **Append-Only Memory:** Log architectural decisions, resolved errors, and state checkpoints to ContextEngine. Never overwrite historical logs.
5. **Human-in-the-Loop Confirmation:** High-consequence or irreversible actions (deployments, destructive database operations, external communications) require explicit user approval.

---

## 4. Quick-Reference Execution Checklist

```markdown
[ ] 1. PARSE & COMPILE: Did PAL translate the prompt into an explicit manifest?
[ ] 2. PHASE CHECK: Is the current task in PreD, Design, Dev, Deploy, or Debug?
[ ] 3. NPAO ORDER: Are hard blockers (Necessity) and ambiguity (Anxiety) resolved before building (Priority)?
[ ] 4. RAG DAL VALIDATION: Are external knowledge dependencies backed by Tier 1/2 sources?
[ ] 5. PERSIST: Are final decisions, code artifacts, and state changes recorded in the Rostr Hub / ContextEngine?
```
read the full rostr paper here for context: https://zenodo.org/records/19550414
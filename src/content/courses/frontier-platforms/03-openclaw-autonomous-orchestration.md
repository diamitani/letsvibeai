# Module 3 — OpenClaw Autonomous Multi-Agent Orchestration

OpenClaw is an open-source autonomous agent harness engineered for parallel subagent coordination, Middle-Out DAG execution, and durable workflow persistence.

### Lesson 3.1 — The Multi-Agent Swarm vs Single Agent

Single agents fail when complex multi-turn tasks overload their context window. OpenClaw solves this through role-specialized subagents:
1. **Coordinator Agent**: Receives human intent, decomposes into an execution DAG, and assigns atomic slices.
2. **Researcher Subagent**: Read-only codebase and web search; retrieves relevant APIs without contaminating the coordinator.
3. **Builder Subagent**: Writes code in an isolated workspace branch or worktree.
4. **Verifier / QA Subagent**: Independent testing agent running `test`, `build`, and security sweeps.

### Lesson 3.2 — Middle-Out DAG Wave Compression

Tasks are scheduled in waves: dependencies run sequentially, while independent modules (e.g. frontend UI and backend database schema) run in parallel waves, compressing build times from hours to minutes.

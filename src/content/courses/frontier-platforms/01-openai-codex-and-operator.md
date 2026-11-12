# Module 1 — OpenAI Codex, Canvas & Operator Workflows

OpenAI Codex and its evolution through GPT-4o Canvas and Operator represent a direct shift in how engineers and non-technical directors write software. Rather than typing out code or copy-pasting from chat, Codex models operate directly against file trees, code syntax, and real-time execution sandboxes.

### Lesson 1.1 — Directing Codex: Beyond Chat into Code Synthesis

When working with Codex in Canvas or the API:
- **Instruction Precision**: Codex relies on structured AST (Abstract Syntax Tree) understanding. Specifying component interfaces, typed props, and deterministic outputs prevents unwanted refactoring.
- **Canvas Interactive Editing**: You highlight code regions, state the invariant (e.g. "Add optimistic UI updates and error rollback"), and steer the model while keeping surrounding functions intact.

```typescript
// Directed Codex Prompt Pattern:
// 1. Target: React 19 Client Component with optimistic state
// 2. Invariant: Never store API keys in client bundles
// 3. Output: Strict TypeScript with zod schema validation
```

### Lesson 1.2 — Operator & Browser Agents for Autonomous QA

OpenAI Operator and web agent harnesses execute browser-based tasks:
- Logging into staging environments
- Testing multi-step checkout funnels
- Simulating user actions (clicks, form inputs, session storage validation)
- Flagging UI regressions before production deployment

# Module 5 — Verification Gates & The One Must Act Theorem

Building with frontier AI agents requires strict verification boundaries. The One Must Act (W = 1.00) foundation wholeness theorem establishes that an autonomous system must never claim completion until every contract and build test is verified by an independent process.

### Lesson 5.1 — The 5 Quality Gates Before Deployment

1. **Secret & Credential Scan**: 0 API keys or private tokens in git diffs or client bundles.
2. **Deterministic Type & Build Gate**: Clean exit 0 with zero environment dependencies.
3. **Accessibility (WCAG 2.2 AA)**: Keyboard navigability, contrast compliance, and semantic HTML.
4. **Served-Content Sweep**: Verify no mock data, broken links, or hallucinated claims survive.
5. **Idempotent Webhooks & Entitlements**: Payment and auth state verified server-side only.

### Lesson 5.2 — Cross-Model Verification

Never let the author agent grade its own code. Pair Claude builders with Codex verifiers, or Hermes orchestrators with independent QA test runners to ensure impartial error detection.

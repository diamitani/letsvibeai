# Module 2 — Nous Hermes Agent Harness & Bedrock Orchestration

Nous Research's Hermes models (including Hermes 2, Hermes 3, and Hermes Agent harnesses) provide state-of-the-art open-weights reasoning and autonomous tool calling that can run locally, on specialized GPU clusters, or through AWS Bedrock.

### Lesson 2.1 — Open-Weights Function Calling Architecture

Hermes was explicitly trained on structured function calling tags: `<tool_call>` and `<scratchpad>` extended thinking.
- **Why Hermes Matters**: Complete sovereignty over your AI infrastructure. No vendor lock-in, zero external data leakage, and custom tool binding.
- **Harness Topology**:
  - Model: Hermes 3 Llama / Qwen foundation
  - System Instructions: Calibrated Truth Guard & tool schema definition
  - Tool Invoker: Local Python / Node sandboxes executing validated system calls
  - Verification Gate: Strict JSON schema checking before system state modifications

### Lesson 2.2 — Deploying on AWS Bedrock & Local Ollama

```bash
# Running Hermes locally with tool calling support
ollama run hermes3:8b

# Or routing through AWS Bedrock with bedrock-agent-runtime
python -m rostr_harness.hermes --endpoint bedrock --model hermes-70b
```

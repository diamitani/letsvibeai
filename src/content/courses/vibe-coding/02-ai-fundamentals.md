# Module 2 — AI fundamentals: ML, LLMs, tokens and GPUs

Modern AI is software that learned patterns from enormous amounts of data, runs on specialized chips called GPUs, and reads and writes in units called tokens. Understanding these four ideas makes you a better builder and a smarter buyer.

### Lesson 2.1 — Machine learning in plain English

**Traditional software** follows rules a human wrote: "if the cart total is over $50, shipping is free." **Machine learning (ML)** flips this: you show a system thousands of examples and it learns the rules itself.

- **Supervised learning** — learn from labeled examples ("this email is spam, this one isn't").
- **Unsupervised learning** — find structure in unlabeled data (grouping customers by behavior).
- **Reinforcement learning** — learn by trial, error and reward (game-playing AIs; also used to make chat models more helpful, via human feedback — RLHF).

**Neural networks** are the engine behind modern ML: layers of simple math units, loosely inspired by brain neurons, connected by billions of adjustable numbers called **parameters** (or weights). Training nudges those numbers, over and over, until the network's outputs match the examples.

### Lesson 2.2 — How large language models (LLMs) work

An LLM is a neural network trained to do one thing extremely well: **predict the next token** of text. Do that across trillions of words of books, code and web pages, and the model picks up grammar, facts, reasoning patterns and coding skill as side effects.

- **The transformer** — the architecture behind nearly every modern LLM, introduced in the 2017 Google paper *Attention Is All You Need*. Its key idea, **attention**, lets the model weigh which earlier words matter most for the next one.
- **Pre-training** — the expensive phase: months of GPU time learning from raw text.
- **Post-training** — fine-tuning and human feedback that turn a raw text-predictor into a helpful, safer assistant.
- **Inference** — using the trained model. Every time you send a prompt, that's inference.
- **Context window** — how much text the model can "see" at once (your prompt, files, chat history and its answer). Anything outside it, the model doesn't know about in that moment.

**Why this matters for vibe coding:** the model only knows what was in its training data plus what's in its context window right now. Your project details are never in the training data — so you must put them in the context (Module 6).

### Lesson 2.3 — Tokens: the currency of AI

A **token** is a chunk of text — a word, part of a word or a symbol. In English, one token is roughly ¾ of a word, so 1,000 tokens ≈ 750 words.

Tokens matter for three reasons:

1. **Cost** — providers charge per million tokens, with output tokens usually priced several times higher than input tokens.
2. **Limits** — the context window is measured in tokens. Overfill it and the model forgets or truncates.
3. **Speed** — more tokens in and out means slower answers.

**Builder habits that save tokens:** keep a tight context file instead of pasting everything; use smaller, cheaper models for simple tasks and frontier models for hard reasoning; reuse cached prompts where the provider supports **prompt caching**.

### Lesson 2.4 — GPUs: what powers it all

A **CPU** is a few very smart workers doing tasks one after another. A **GPU** (graphics processing unit) is thousands of simple workers doing math at the same time. Neural networks are mostly giant grids of multiplication — exactly what GPUs are built for. NVIDIA dominates this market; Google (TPUs), Amazon (Trainium), AMD and others build competing AI chips.

Training a frontier model takes tens of thousands of GPUs running for months in **data centers** that draw as much electricity as a small city. That's why AI is sold as metered cloud usage: you rent slices of those GPUs, one token at a time.

**The full chain:** electricity → data center → GPUs → trained model → provider's API → your app → your user.

**Exercise:** paste a page of your app idea into a free online tokenizer (OpenAI and Anthropic both document token counting). Note the count. Estimate: if 1,000 users each send 20 messages a day at \~1,500 tokens per round trip, how many tokens a month is that?

**Check yourself:**

1. What does an LLM actually predict?
2. Why do your project details have to go in the context window?
3. Why are GPUs better than CPUs for AI?


---

[← Previous](./01-what-is-vibe-coding.md) · [Course home](../README.md) · [Next →](./03-ai-landscape.md)

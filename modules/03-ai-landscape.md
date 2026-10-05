# Module 3 — The AI landscape: model providers and platforms

A handful of labs build the frontier models; cloud platforms resell them with enterprise security; specialists like ElevenLabs own a single medium such as voice. Most real apps use two or three providers, connected through one gateway.

### Lesson 3.1 — Labs, platforms and specialists

- **Model labs** train their own models and sell access by API and chat apps: Anthropic, OpenAI, Google, xAI.
- **Cloud AI platforms** host many labs' models inside a big cloud, with that cloud's security, billing and compliance: AWS Bedrock, Azure AI Foundry, Google Vertex AI.
- **Specialists** go deep on one medium: ElevenLabs (voice and audio).
- **Gateways** let your app call any of them through one connection and swap models without rewriting code: Vercel AI Gateway, OpenRouter.

### Lesson 3.2 — Who's who

Model version numbers change almost monthly, so this table names model *families*. Always check the provider's models page for today's best version and price.

| Provider | Model families | Known for | Use it in your app for |
| --- | --- | --- | --- |
| [Anthropic](https://www.anthropic.com) | Claude Opus (most capable), Sonnet (balanced), Haiku (fast, cheap); Claude Code for agentic coding | Coding, long documents, agent reliability, safety research | Coding agents, tutors, document analysis, customer-facing chat |
| [OpenAI](https://openai.com) | GPT (general), reasoning models, Codex (coding), image and voice models | ChatGPT, the largest consumer AI user base | General chat, coding, images, real-time voice |
| [Google Gemini](https://ai.google.dev) | Gemini Pro (capable), Flash (fast, cheap); Antigravity IDE; AI Studio | Huge context windows, multimodal (video, images, audio), Google ecosystem | Analyzing video/PDFs, cheap high-volume tasks |
| [xAI](https://x.ai) | Grok | Live data from X (Twitter), fewer content restrictions | Real-time social and news features |
| [AWS Bedrock](https://aws.amazon.com/bedrock/) | Hosts Claude, Amazon Nova, Llama, Mistral and others | Enterprise security and billing inside AWS | Companies already on AWS; data-residency needs |
| [Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-foundry) | Hosts OpenAI's GPT models plus many others | Microsoft enterprise integration (Entra ID, Office) | Companies already on Microsoft 365 / Azure |
| [ElevenLabs](https://elevenlabs.io) | Text-to-speech, voice cloning, speech-to-text (Scribe), voice agents, dubbing, music | The most natural-sounding AI voices | Voice tutors, phone agents, narrated content |

### Lesson 3.3 — How to choose

1. **Start with the job, not the brand.** Coding agent? Long-document Q&A? Voice? Cheap bulk classification?
2. **Pick a tier.** Frontier models for hard reasoning; fast/cheap models for simple, high-volume work. Many apps route between both.
3. **Check price per million tokens** (input and output) against your usage estimate from Module 2.
4. **Check where your customers live.** Enterprise buyers may require AWS or Azure.
5. **Use a gateway** so you can switch providers in one line when prices or quality change.

**Prompt to copy:**

```
My app does: [features]. Expected usage: [users, messages/day].
Recommend a primary and a fallback model for each feature, with the
reason and an estimated monthly token cost. Check current pricing pages
and cite them. Flag anything you are unsure about.
```

**Exercise:** fill in a one-row-per-feature table: feature → job type → model tier → provider → fallback.

**Check yourself:**

1. What's the difference between a model lab and a cloud AI platform?
2. Why use an AI gateway?
3. When would you choose Bedrock or Azure AI Foundry over calling a lab directly?


---

[← Previous](./02-ai-fundamentals.md) · [Course home](../README.md) · [Next →](./04-web-app-architecture.md)

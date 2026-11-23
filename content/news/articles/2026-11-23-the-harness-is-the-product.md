---
title: The harness is the product: what this week's AI news means for vibe coders
description: Skills files, smarter tool loading, cheaper cached tokens and deploy checks. Last week's releases all point the same way. Your setup around the model matters as much as the model.
date: 2026-11-23
tags: Agents, Skills, Shipping, Gemini, Vercel
author: LetsVibeAI Editorial
relatedCourses: vibe-coding, claude-code
---

Every week there is a new model. This week there was one too: Google DeepMind shipped Gemini 4 Neon. But if you build apps with AI, the more useful news from the past seven days was about everything *around* the model: the instructions you give it, the tools it can reach, what it costs to run, and what stops a bad deploy.

Here is what happened, and what to do about it this week.

## 1. Write your process down once, as a skill

GitHub published [a practical guide to agent skills](https://github.blog/ai-and-ml/github-copilot/build-once-run-on-any-agent-a-practical-guide-to-agent-skills/). Its definition is simple: a skill is a versioned folder built around a `SKILL.md` file that describes when and how to do one repeatable task. The guide makes one point worth remembering: a skill can describe how to do something, like query a database, but it doesn't grant access. The environment still has to provide the tools, credentials and permissions.

**For you:** if you've explained your deploy steps, brand rules or database conventions to an agent more than twice, that's a skill. Put it in your repo so every agent you use can follow it.

## 2. Load the tools a task needs, not all of them

Google introduced [Tool Retrieval in the Gemini API](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/), in preview. It lets agents access hundreds of tools while using fewer tokens. Vercel shipped the same idea for the command line: coding agents can now run [`vercel help search`](https://vercel.com/changelog/agents-can-now-find-vercel-cli-commands-by-describing-the-task) with a plain-language task, like `"roll back production"`, and get back the right command and its options.

**For you:** an agent that looks things up beats one that guesses. Run `vercel upgrade`, and when your app's tool list gets long, plan to fetch tools on demand instead of stuffing every definition into every prompt.

## 3. The harness changes the score

Hugging Face published research on [harness adapters](https://huggingface.co/blog/harness-adapters-at-scale): small LoRA adapters trained with reinforcement learning *inside* a specific agent harness. On Terminal-Bench 2.1 under the pi harness, Qwen3.8-27B went from 39% to 55% pass@1, and average tokens per task dropped from 2.9K to 1.5K. The same model got better and cheaper just by fitting it to the harness it runs in.

**For you:** when an agent struggles, don't just swap models. Look at the setup: instructions, tools, context files and the workflow you're running it in.

## 4. Price your context like it's a budget

[Gemini 4 Neon](https://deepmind.google/blog/introducing-gemini-4-neon/) costs $3 per million input tokens and $15 per million output, with a 1 million-token context window. Cached input is $0.15 per million, a 95% discount. Meanwhile, [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/inference-engineering-for-software-engineers) reports companies moving to open models to cut AI spend, citing Uber at 50% lower per-token cost and Pinterest at 90%.

**For you:** keep the stable parts of your prompt (system instructions, project docs) at the top and unchanged, so repeat calls can hit the cache. Cost is a design decision, not a surprise at the end of the month.

## 5. Guard the door before you open it

Simon Willison highlighted [Claire Vo's account of token fraud](https://simonwillison.net/2026/Nov/20/token-fraud-is-here-and-its-bad/) at ChatPRD: groups looping free trials and promo codes to resell AI usage or run their own businesses on her agent. And on the shipping side, Vercel can now [block a production deploy](https://vercel.com/changelog/catch-missing-feature-flags-before-they-reach-production) when a feature flag is declared in code but missing from the project, instead of silently using its default.

**For you:** if your app has a free tier, ship rate limits, signup verification and per-user spend caps in version one. If you use feature flags, turn on the deployment check so a half-built feature can't go live by accident.

## The pattern

Put together, this week's releases point one way. Models keep getting better, but **the work that makes an AI app reliable is the work around the model**: clear written process (skills), the right tools at the right moment, a budget for context, and guardrails at the door and at deploy. That's the architecture-first approach our courses teach: describe it, document it, build with AI, then check and ship.

*Sources are linked inline. Every number above comes from the linked announcement or article.*

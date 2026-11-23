---
title: Know where your data goes: the trust checklist for shipping an AI app
description: Audited zero data retention, provider location controls, local models, a patch-now nginx bug and agent spending limits. This week's news says trust is now part of shipping, not an afterthought.
date: 2026-11-23
tags: Privacy, Security, AI Gateway, Local AI, Shipping
author: LetsVibeAI Editorial
relatedCourses: vibe-coding, claude-code
---

The moment your vibe-coded app gets its first real user, it starts sending their words to a model provider. Their prompts, maybe their files, maybe their customer data. Most of us ship that part on faith.

This week's news is about replacing that faith with things you can check and settings you can control. Here's what changed, and what to do before your next deploy.

## 1. Ask for proof, not promises

"Zero data retention" (ZDR) usually means a provider has signed a contract saying it won't keep your prompts or completions. Vercel's argument in [Introducing Audited ZDR on AI Gateway](https://vercel.com/blog/introducing-audited-zdr-on-ai-gateway) is that a contract isn't enough. Under the new label, a provider only counts as Audited ZDR after an independent security firm tests its claims against its code, infrastructure and live traffic, then publishes the report. Baseten, Modal and Wafer are the launch partners that have already begun audits.

The audit covers the places data quietly leaks: request logs, traces, crash dumps, prompt caches, support tools, and training or evaluation datasets. It also checks that a request marked ZDR never fails over to a non-ZDR endpoint.

Vercel added a second layer the same day: [canary audits](https://vercel.com/changelog/ai-gateway-now-runs-canary-zdr-audits). AI Gateway sends prompts containing unique URLs that exist nowhere else. A ZDR provider should never read or crawl prompt content, so if anything ever requests one of those URLs, it gets flagged for investigation.

**For you:** write one short paragraph for your app's privacy page or README: which model provider you use, and what its data retention policy is. If you can't fill it in, that's your first task.

## 2. Decide where your providers can be based

Also new: you can [choose AI Gateway providers by headquarters country](https://vercel.com/changelog/choose-ai-gateway-providers-by-headquarters-country). You can set an allowlist of countries to use or a denylist of countries to block. Pro and Enterprise teams can apply it to every request; on any plan you can set it on a single request in the gateway provider options.

There's one catch to plan for. If no provider is available in an allowed country, the gateway tries your fallback models. If none of those qualify either, the request fails. It doesn't quietly route somewhere else.

**For you:** if a client, school or employer has rules about where AI vendors are located, this turns your answer into a setting. Configure fallback models so a strict rule doesn't become an outage.

## 3. Or keep the data on your machine

Sometimes the simplest privacy answer is not sending the data anywhere. Hugging Face [welcomed Inkling 2 Mini](https://huggingface.co/blog/inkling2mini) from Thinking Machines Lab, a model built for local setups. It's a mixture-of-experts model with about 26B total and 3B active parameters per token, a 1M-token context, and image plus text input. It shipped with transformers, llama.cpp and MLX support. In Hugging Face's own vibe tests it was at least comparable with Qwen 3.8 27B, though the team says more validation is needed.

Looping is having a moment. Z.ai's [GLM-5.4](https://z.ai/blog/glm-5.4) also runs a shared block of layers more than once to reason more deeply without adding parameters. It's aimed at coding, but its API is listed as coming soon and open weights are planned only after safety hardening, so it's one to watch for now.

**For you:** if you're prototyping with sensitive data, like health notes, student records or a client's spreadsheet, try a local model first and only move to a hosted one when you know what you're sending.

## 4. Patch the boring layer

Privacy settings don't help if the server is wide open. Cloudflare's write-up on [nginx2root](https://blog.cloudflare.com/nginx2root/) covers the ten nginx vulnerabilities F5 and nginx.org disclosed on November 18. Five of them are memory corruption bugs that an unauthenticated attacker can use to crash an nginx worker or, per the researchers, run commands on the server. A related Linux kernel bug can turn that into root on the host, even from inside a Docker container. Cloudflare calls it a patch-now event.

**For you:** if you self-host on a VPS or in Docker behind nginx, update today.

## 5. Give your agents a budget and a leash

Trust isn't only about data. It's also about what your AI is allowed to *do*. The Verge reports that [Walmart will let Meta's Muse shop on its site](https://www.theverge.com/ai-artificial-intelligence/1039874/walmart-agent-gateway-meta-muse-black-friday) starting November 24, through an Agent Gateway. Purchases go through Agent Profiles, where shoppers can set spending limits, approve purchases and check the history of everything the agent bought.

**For you:** that's a good design to copy. If your app lets an agent send, buy, post or delete, give it three things: a limit, an approval step for anything risky, and a log the user can read.

## 6. Understand what your agent wrote

You can't vouch for code you can't read. The There's An AI For That newsletter highlighted [Computor](https://newsletter.theresanaiforthat.com/p/google-kills-its-search-button), a free site from TU Graz with three Python courses, 70 exercises, and an AI tutor named Lena who points you toward what's wrong instead of fixing it for you.

**For you:** when your agent hands you a fix, ask it to explain the change line by line before you accept it. That habit is how you catch the leaked key or the missing permission check before your users do.

## Your pre-ship trust checklist

- [ ] I can name my model provider and its data retention policy.
- [ ] If I have location rules, they're set in my gateway, with fallback models configured.
- [ ] Sensitive prototype data stays on a local model until I know what's being sent.
- [ ] Anything I self-host (nginx, Docker, the OS) is patched.
- [ ] Every agent action that spends, sends or deletes has a limit, an approval and a log.
- [ ] I can explain the last change my agent made.

Shipping fast is the point of vibe coding. Shipping something people can trust is what makes them come back.

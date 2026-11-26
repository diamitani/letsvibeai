---
title: The promises your app makes: data, access, retries and limits once real users show up
description: A 1Password breach that started with one GitHub account, a bankrupt Character.AI trying to sell 21 million users' chats, and a Vercel engine that re-runs your code on purpose all point at the same lesson. Shipping means making promises to your users, and you have to build the code that keeps them.
date: 2026-11-26
tags: Security, Privacy, Reliability, Agents, Shipping
author: LetsVibeAI Editorial
relatedCourses: zero-to-ship, vibe-coding, claude-code
---

When you share a link to something you vibe-coded, you're making promises, whether you write them down or not. *Your data is safe with me. Only you can see this. When you click "Pay," you'll be charged once. This will still work next week.*

On a demo, nobody tests those promises. With real users, people do, and sometimes the world does it for you. Several stories from the last 48 hours show what happens when promises like these break, and what builders did to keep them. Here are five promises every shipped app makes, and how to back each one up.

## Promise 1: "Your data won't end up somewhere you didn't agree to"

The starkest story of the week: a coalition of **42 state attorneys general** is [intervening in Character.AI's bankruptcy](https://techcrunch.com/2026/11/25/state-ags-fight-character-ais-plan-to-auction-off-users-private-chats/) to stop it from auctioning off user data. According to the AGs, the dataset includes chat histories from **more than 21 million U.S. accounts**, more than **2.1 million** of them belonging to minors, plus personal data like IP addresses. Character.AI filed for Chapter 11 in October, and the auction is scheduled for December 1.

The AGs' core complaint is that Character.AI had previously told users their personal information would not be sold. California Attorney General Rob Bonta put it plainly: "Character.AI promised consumers that their data would not be sold." TechCrunch also notes that chatbot safety laws in California, Colorado, New York and Connecticut take effect on January 1, 2027.

**For you:** your side project probably won't go through bankruptcy court, but the same question applies at any size: *what happens to the data if this ends?* Before launch:

- Store only what the app actually needs. If you don't need full chat transcripts, don't keep them.
- Pick a retention period and write the deletion job, not just the policy sentence.
- Give users a working "delete my account and data" button.
- Write a privacy promise you can keep even if you shut the project down, then reread it whenever you add a feature that stores something new.

## Promise 2: "Only the right people can get in"

Vercel published a case study on [how furniture maker Cozey turns its operators into software builders](https://vercel.com/blog/how-cozey-turns-its-operators-into-software-builders-on-vercel). It's a great example of vibe coding inside a real business: warehouse, finance and support staff use coding agents to build web apps and deploy them themselves. A warehouse coordinator built a live floor plan, and finance built an app to review profit and loss weekly instead of monthly.

It also includes a warning. "An employee once deployed an app that anyone on the internet could open." For internal apps that shipped without proper authentication, Cozey's VP of Digital, Sam Morrison, turned on Vercel's access protection, and the company moved to single sign-on. "It saved us from some pretty serious privacy risks," he says.

The 1Password incident shows the other side of access: *your* accounts. In [its incident update](https://1password.com/blog/update-on-nov-2026-security-incident), 1Password says that on November 19 it started investigating signs that an attacker had gained access to **one employee's corporate GitHub account**. From there, the attacker accessed source code, pushed malicious code to backend services that downloaded customer names, email addresses and other account metadata, and got into the CI/CD system, which holds infrastructure secrets. Vault contents were not accessed. In response, 1Password revoked the stolen token, rotated every credential that might have been exposed, and lengthened the codes in its invitation and recovery emails from six digits to ten characters.

**For you:** two quick checks this week.

1. **Open your app in a private window while logged out.** Can you see anything you shouldn't? Check every internal or admin page, not just the home page.
2. **Treat your GitHub account like the master key it is.** If it connects to your deploys, someone who gets in can ship code to your users. Use strong two-factor authentication, remove old personal access tokens, and write down where every secret lives so you could rotate them all in one sitting.

## Promise 3: "When you click once, it happens once"

The most technical story of the week matters a lot for agent apps. Vercel's [Workflow SDK 5.8](https://vercel.com/changelog/workflows-speculative-execution) runs on a new engine. In Vercel's benchmarks, p75 step-to-step overhead fell from **85 ms to 7 ms**, and a five-turn agent loop added 0.9 seconds of overhead instead of 3.0.

The speed comes from *speculative execution*: the engine may run a step again on purpose. That's only safe for steps that are **idempotent**, meaning that running them twice has the same effect as running them once. Vercel's own example lays it out. A Stripe charge that passes the step ID as an idempotency key is safe, so Stripe creates one charge. Sending an email over SMTP isn't, because there's no idempotency key and a second attempt sends a second email. For steps like that, you set `maxRetries = 0` so they run at most once.

This isn't only about Vercel. Retries are everywhere: queues, webhooks, agent loops and users double-clicking a button.

**For you:** list every step in your app that has a side effect in the outside world, like charging money, sending a message, creating a record, or calling a paid API. For each one, ask your coding agent: "What happens if this runs twice?" Then fix the answer. Use an idempotency key where the service supports one. Otherwise, check whether the work was already done before doing it again, or make sure the step can't be retried.

## Promise 4: "This will keep working when a provider changes the rules"

Two OpenAI updates are a reminder that the tools and models you build on can change under you. TechCrunch reports that ChatGPT's [Chat and Work will share a single usage meter](https://techcrunch.com/2026/11/25/openai-says-heavy-chatgpt-users-may-hit-limits-sooner-as-it-merges-chat-and-work/), with shared limits rolling out more broadly in December. OpenAI says a small fraction of its heaviest users may hit their limits sooner, while Instant model conversations stay unlimited. Separately, OpenAI's Tibo Sottiaux [posted on X](https://twitter.com/thsottiaux/status/2125784147889393806) that a billing mistake at the GPT-6.2 launch had wrongly discounted usage. Now that it's fixed, users will hit their limits **40% faster on GPT-6.2 Astra and 25% faster on Sol** than the week before.

Neither is a disaster, but if your launch week depends on one plan's allowance, one model or one provider, a change like this can stall you. Cozey offers a pattern here too. Six of its projects, including the storefront, send model requests through Vercel AI Gateway, which gives teams one interface across providers and can route a request to another provider serving the same model if the first one is unavailable.

**For you:** know your fallback before you need it. Keep your model calls behind one small function or gateway so you can switch models with a config change. And if you code with an AI subscription, know which model you'd switch to when you hit a cap, so you're not stuck on deadline day.

## Promise 5: "It does what it says," even if you didn't read every line

The last story answers a question every vibe coder eventually asks: *how can I trust code I didn't fully read?* In [The Pragmatic Engineer's interview with Katelyn Lesse](https://newsletter.pragmaticengineer.com/p/how-anthropic-builds-software-in), who leads platform engineering at Anthropic, she describes how the team rewrote the API that serves every Claude token from Python to Rust **in around five months**, with no Rust experts on the team. They didn't do strict code reviews. Instead, they had the new Rust service shadow the existing Python one and iterated until all responses were identical. Lesse estimates that engineers looked closely at only **about 20%** of the generated code.

Her rule: "As long as you can really boil something down to make it verifiable in some way, then you don't have to look at every single line of Rust code that's getting written."

**For you:** you probably don't have a perfect reference system, but you can build a smaller version of one. Write down a handful of real inputs and the outputs you expect, like a signup, a checkout or a typical prompt. Turn them into automated checks your agent runs after every change. The more of your app's behavior you can check automatically, the less you have to rely on reading code line by line, and the safer it is to let the agent move fast.

## Your checklist for this week

1. **Data promise.** Store less, set a retention period, ship a working delete button, and make sure your privacy text matches what the code does.
2. **Access promise.** Open every page logged out, put internal tools behind auth, and lock down your GitHub account and secrets.
3. **Once-only promise.** Find every side effect and make it idempotent or impossible to retry.
4. **Fallback promise.** Keep model calls swappable and know your plan B when a provider changes limits.
5. **Verification promise.** Turn a few real scenarios into checks your agent runs on every change.

None of this makes a demo look better, and that's the point. These are the parts users never see until they break, and they decide whether people trust what you've built. Build the code that keeps your promises before you make them.

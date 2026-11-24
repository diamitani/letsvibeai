---
title: Who approves your agent's work? Build the checker before you hand over the keys
description: Claude Ship can now approve pull requests against a policy file, DeepMind's agents had to prove every idea, and OpenAI's Shirudo waits for an operator to sign off. Yesterday's news shares one lesson for vibe coders. Let agents do more, but decide in writing what "good enough" means and how you'll check it.
date: 2026-11-24
tags: Agents, Code review, Evals, Verification, Shipping
author: LetsVibeAI Editorial
relatedCourses: vibe-coding, claude-code, zero-to-ship
---

When you vibe code, the agent writes most of the code. Then you hit the next bottleneck: someone has to decide whether that code is good enough to ship. For most students and solo founders, that someone is you, at midnight, skimming a diff you didn't write.

Yesterday's news had one clear message about that bottleneck. The big labs are giving agents more of the approval job, but none of them do it on trust. Each one starts with a written rule and an automatic check, and a human signs off at the risky step.

Here's what shipped, and how to use the same pattern on your own project.

## 1. Approval is turning into a file in your repo

Anthropic launched [Claude Ship](https://techcrunch.com/2026/11/23/anthropic-launches-claude-ship-letting-ai-agents-review-fix-and-approve-code-changes/), a set of agents for what happens *after* a pull request is opened. It combines three parts:

- **Code Review**, which is already generally available.
- **PR Steward** (beta), which deals with failing CI checks, merge conflicts and review feedback, and comments after every push on what it changed and how to roll it back.
- **Claude Approvals** (beta), which approves routine changes using an approval policy the team writes as a file in the repository, in natural language.

Anthropic's reason, quoted by TechCrunch: "On the Claude Code team, Claude writes most of our code, and we wanted everything after the PR to move that fast too." It's rolling out to Claude Team and Enterprise plans for GitHub repositories, [The Verge reports](https://www.theverge.com/ai-artificial-intelligence/1040134/anthropic-claude-ship-ai-pull-requests).

The most useful detail is how Anthropic suggests starting. Run approvals in **observe-only mode** first, on **one repository**, with a **monthly spending limit**, and choose which changes always go to a human.

**For you:** you don't need Claude Ship to use this idea. Add a short `APPROVAL.md` to your repo that says what counts as a routine change (copy edits, styling, tests) and what always needs your eyes (auth, payments, database migrations, anything touching user data). Give it to whatever agent reviews your code. Even if you still click merge yourself, you're now checking against a written rule instead of a feeling.

## 2. A score is only as good as the checker behind it

Hugging Face published a long guide on [how to build and maintain an agentic evaluation](https://huggingface.co/blog/agentic-evals). It breaks an eval into parts: a task, the agent harness, a pinned environment, rollouts (single attempts), a **verifier** that grades the final state, and a **trace** of everything the agent did. The guide's point is that each part can change the score, so you should check them, not just the model. It also notes that a review of 445 LLM benchmarks found recurring problems in tasks and metrics that weaken what the scores can actually tell you.

Its eight steps begin with something anyone can do: **write down the claim**. That's a plain sentence about what the agent should be able to do, broken into small skills you can check one at a time.

**For you:** before you trust an agent with a feature, write the claim ("it can turn a pasted receipt into a correct expense row"). Then collect five to ten real examples with known right answers, and build a tiny script that checks the output. Rerun it every time you change the model, prompt or tools. Read the traces when it fails. That's how you'll learn whether the problem is the model or your setup.

## 3. Let agents explore, but only keep what passes

Google DeepMind showed what happens when the checker is strict. In [new research on quantum algorithms](https://deepmind.google/blog/finding-faster-quantum-algorithms-with-agents-and-formal-verification/), teams of Gemini 4 agents worked separately on known problems and met every four hours to trade ideas. But an idea only entered the shared notebook after it was proved in **Lean**, a formal theorem prover. The results included an 11.8× cost reduction for a circuit used in inertial confinement fusion, an 8× cheaper simulation for a light-sensitive molecule, and a 290× speedup for the arcsin routine. DeepMind is open-sourcing the Lean library, problem specifications and verified solutions.

You won't be writing Lean proofs for a to-do app. The structure still carries over: agents generate freely, a machine check decides what stays, and humans pick the problems and judge the results.

**For you:** your "proof" is your test suite, type checker and linter. Tell your agent that a change isn't done until `npm run lint`, `npm run build` and your tests pass. Make that the gate, not your gut.

## 4. Agents can draft the fix; people approve the deploy

OpenAI and Cisco introduced [Shirudo](https://openai.com/index/introducing-shirudo), an open-source runtime that uses eBPF to block a vulnerable code path on a running Linux system while a real patch is prepared. In a controlled test, a Codex-generated shield blocked a Java4Shell exploit attempt against a running Elasticsearch service without a restart. The workflow is the lesson. Teams can watch how a proposed shield would affect their app *before* enforcing it. Shields are cryptographically signed and verified before loading, and one only goes live after an operator approves it.

**For you:** use the same split for any agent that can change production, like your database, DNS, environment variables or billing. The agent can propose the change and explain the rollback, and you approve it. Keep that permission boundary even after the agent has earned your trust on small stuff.

## 5. Check promises with tripwires, not just contracts

Two smaller releases from the same day apply the "verify it" idea to data. Vercel's AI Gateway now runs [canary ZDR audits](https://vercel.com/changelog/ai-gateway-now-runs-canary-zdr-audits). It sends prompts containing unique URLs that exist nowhere else, then records any request to them, because a zero-data-retention provider should never read or crawl prompt content. Vercel also added [extraction models](https://vercel.com/changelog/ai-gateway-now-supports-extraction-models). ScaleDown Extract-1 returns named fields from text, images or PDFs, with `null` for missing fields and a confidence score from 0 to 1 that Vercel says you can use to flag uncertain results for review.

**For you:** if your app pulls data out of documents, don't treat every field the same. Auto-accept the high-confidence ones and send the rest to a human review screen. That one rule is often the difference between a demo and a product people can rely on.

## Bonus: check the idea, too

The same logic applies before you write any code. [There's An AI For That covered research](https://newsletter.theresanaiforthat.com/p/tesla-s-ai-rebuilds-reality) where AI "shoppers" answered in their own words instead of giving a 1 to 5 score. Checked against 57 real product surveys and 9,300 human answers, they got to 90% of how consistently real people repeat their own answers. The newsletter's takeaway is the right one: a pretend customer is a fast first read, not the final word. Use it to find the questions worth asking, then ask real people.

## The pattern

Agents are taking on more of the shipping pipeline: reviewing, fixing, approving and even patching live systems. Every serious example from yesterday has the same three pieces:

1. **A written rule** for what "good" means (an approval policy, a claim, a problem spec).
2. **An automatic check** that enforces it (a verifier, a proof, a canary, a confidence score).
3. **A human gate** at the risky step, with a trial run first (observe-only mode, operator approval).

Set up those three, and you can hand an agent more of the work without losing track of what reaches your users. That's the shipping discipline our courses teach: describe it, build it with AI, check it automatically, and only then ship it.

*Sources are linked inline. Every number above comes from the linked announcement or article.*

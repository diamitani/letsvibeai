---
title: Ship the boring parts: why reliability, not raw model power, decides whether your agent app works
description: A new benchmark shows top agents failing everyday tasks more than a third of the time, the UK says AI hacking tools are winning through old, simple weaknesses, and iFood runs 25,000+ agent jobs by scripting everything around the model. For vibe coders, the takeaway is the same. The model is rarely the weak link anymore. The setup around it is.
date: 2026-11-25
tags: Agents, Reliability, Security, Evals, Shipping
author: LetsVibeAI Editorial
relatedCourses: vibe-coding, zero-to-ship, claude-code
---

Simon Willison looked back on a remarkable year yesterday. In [a write-up of his AI Engineer Code Summit keynote](https://simonwillison.net/2026/Nov/24/llm-inflection-points/), he describes three inflection points in twelve months. First came coding agents whose default answer was usually right. Then came proactive "Fable class" models he sums up as "Give it a goal, give it the right tools, and watch it cook." Most recently, models started producing games that are actually fun. His current rule of thumb: "if you can imagine and then clearly describe a piece of software, Fable can build it."

That's exciting if you're turning a vibe-coded idea into a product. But the other big stories from the last 48 hours add a catch. Models are good enough now that **the things that break your app are mostly around the model**: inconsistent runs, sloppy basics, and steps you left for the agent to improvise.

Here's what the news says, and what to do about it this week.

## 1. Top agents still fail everyday tasks, and they're inconsistent

TechCrunch reported on [ShellBench](https://techcrunch.com/2026/11/24/even-the-best-ai-agents-struggle-with-everyday-life/), a new benchmark for everyday agent work. It was built with researchers at The OpenClaw Foundation, Parsewave, Hugging Face, Red Hat and UC Berkeley, and draws on more than 10 million anonymized, real-world agent interactions. The tasks look like real life: messy inboxes, calendars, spreadsheets, receipts, outdated information and phishing attempts.

The results are humbling:

- Even the most advanced models from OpenAI, Anthropic and Meta **failed more than a third of the time**.
- **15.7%** of all attempts failed at least one safety requirement, and about **10%** of otherwise correct attempts still broke a safety rule.
- When each task was run three times under identical conditions, the top scorer, GPT-6 Astra, got **all three right less than half the time**.
- Agents recommended duplicate or incorrect invoice payments **40.3%** of the time, and failed to withhold a sensitive bank upload token in **18.6%** of attempts on one task.

The harness mattered too. Meta's Muse Wonder Full scored 56% in the Pi harness but 38.1% in Claude Code, and GPT-6 Astra beat Claude Fable 5.2 in one harness but lost in another. (The researchers didn't test the consumer apps' own harnesses, so treat this as a picture of the models, not of Muse, Dots or Claude Duet as shipped.)

**For you:** a single successful demo proves very little. Pick the three to five tasks your app really depends on. Run each one several times with the same input and count how often it's fully right. Note any run that leaks something it shouldn't or does something you didn't ask for. If the agent can spend money or send messages, add a confirmation step for exactly those actions. ShellBench's invoice result is a good reason why.

## 2. AI hackers are winning with old, simple weaknesses

The same day, the UK's cybersecurity agency, the NCSC, warned of a "marked rise" in AI-driven attacks, [per TechCrunch](https://techcrunch.com/2026/11/24/uk-warns-ai-driven-cyberattacks-are-exposing-years-of-weak-security/). Since September it has seen several incidents involving autonomous hacking tools that caused intrusions and downtime. The surprising part is *how* they get in. The NCSC says the issues being exploited are not new memory-corruption bugs, "or even known but unpatched vulnerabilities," but weaknesses left over from years of technical debt.

The tools look for exposed, internet-facing systems, run through weak or easy-to-guess passwords, and abuse API endpoints developers use to access data. The NCSC's summary: AI "does not make established cyber security controls obsolete," and "building strong foundations has never mattered more." Weaknesses that went unnoticed for years can now be found in minutes.

**For you:** a vibe-coded app shipped last weekend is exactly the kind of internet-facing system these tools scan. Before you share the link, ask your coding agent for a basics audit and check its answers yourself:

- Does every API route that reads or writes user data require a logged-in user, and check that the user owns that data?
- Are there admin, debug or test endpoints still reachable in production?
- Are any secrets or API keys in client-side code or in the repo?
- Is there rate limiting on login and on any endpoint that costs you money?

None of these are new ideas. That's the point.

## 3. Script everything except the part that needs judgment

The most useful blueprint came from OpenAI's case study on [how iFood scales coding agents across 15,000 repositories](https://openai.com/business/customer-stories/ifood). iFood built a Remote Agents Platform: teams send a prompt and environment requirements to a REST API, the agent works inside an isolated sandbox, and the result comes back as a merge request. The platform has completed **25,000+ runs** at an average inference cost of **US$0.04 per run**. After its internal security tool moved onto the platform, the number of vulnerabilities fixed more than doubled.

The design choice that matters is what iFood *doesn't* leave to the agent. "Deterministic steps bookend the workflow": cloning the repository, loading the skills the agent can use and setting up the branch at the start, then publishing the merge request and artifacts at the end. The agent only handles the middle. In the words of iFood engineer Victor Coelho, it's "a combination of those two things: deterministic steps and agentic execution within the workflow."

**For you:** do the same with your own agent features. If your app has the model "fetch the user's data, analyze it, then save the result," write normal code for the fetch and the save, and give the model only the analysis. You'll get fewer weird failures, cheaper runs and logs you can actually read. This also answers the ShellBench problem: the fewer steps an agent improvises, the fewer chances it has to be inconsistent.

## 4. Keep an eye on what each run costs

Two smaller items point the same way. Vercel says existing Pro teams [no longer get an included Standard build slot](https://vercel.com/changelog/standard-builds-for-existing-pro-teams-have-moved-to-usage-based-billing). Standard builds now cost $0.014 per build minute, drawn from your monthly usage credit. If your agent pushes lots of tiny commits that each trigger a preview build, those minutes now show up on your bill.

Vercel also lets agents [manage AI Gateway through Vercel MCP](https://vercel.com/changelog/agents-can-now-manage-ai-gateway-through-vercel-mcp), including setting spending budgets for teams, projects and members. You can also create "virtual models," so you can swap the model behind your app without redeploying.

**For you:** set a budget before you launch, not after the first surprise invoice. And batch your agent's commits so you're not paying for a build per typo.

## Your checklist for this week

1. **Repeat, don't demo.** Run your app's most important agent tasks several times and track how often they're fully correct.
2. **Gate the risky actions.** Anything that pays, sends or deletes needs a confirmation step.
3. **Do the basics audit.** Check auth on every data route, remove debug endpoints, keep secrets out of client code and add rate limits.
4. **Script the bookends.** Deterministic code before and after, the agent only in the middle.
5. **Cap the spend.** Set model budgets and keep an eye on build minutes.

Willison may be right that a clear description is now enough to get software built. Getting it *shipped*, so it's reliable, safe and affordable for real users, is still your job. The good news is that those parts are well understood, and you can start on them today.

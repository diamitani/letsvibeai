---
title: Know what your app stands on: platform rules, backups and proof before you ship
description: Google's new rules for AI agents in Workspace, a self-hoster who keeps everything in Git, a one-command SQLite backup trick and two amateur planet hunters who checked their AI against known answers all teach the same lesson. Before you ship, know what your app depends on and how you'd prove it still works.
date: 2026-11-27
tags: Platform risk, Agents, Backups, Testing, Shipping
author: LetsVibeAI Editorial
relatedCourses: zero-to-ship, vibe-coding, claude-code
---

A vibe-coded app feels like it's made of one thing: your idea. In reality it sits on a stack of things you don't control. There's an API from a big platform, a server, a database file, and code an agent wrote that you mostly haven't read.

Most days, that stack holds. This week's stories show what happens when one layer moves, and they're full of practical habits for students who want to go from "it works on my laptop" to "it's live and I can keep it alive." Here are four questions to answer before you ship.

## Question 1: Whose rules does your main feature run on?

The biggest builder story of the week came from a [Tech Stackups breakdown](https://techstackups.com/articles/google-workspace-ai-agents-mcp/) that hit the Hacker News front page. On November 24, Google made its eight Workspace MCP servers generally available and published a new addendum to its API terms. From **February 1, 2027**, any tool that "is or is driven by an AI Agent" must reach Gmail, Drive, Calendar and the rest of Workspace through those servers.

The catch is in the tool list. The public Gmail server can search and read mail, create drafts and apply labels, but it can't send, reply, forward or edit a draft after creating it. Google's quota page says those tools "require partner access and aren't generally available." Agents that keep calling the REST APIs directly will be held to Standard-tier quotas, and doing so breaks the terms. The free Standard tier allows **5,000 MCP requests per day, per project, per product**, and a Gmail search counts as 10 of them, so an agent that only searches gets 500 searches a day across all its users.

There are data rules too. Workspace data may only be processed "to fulfill active, user-authorized tasks," and must be deleted when the user disconnects. Google can also cap retention of things like vector embeddings and memory indexes built from that data at 30 days. Apps that don't involve AI are, in Google's words, "not affected by this change."

Google's stated reasoning is real: an email agent that reads a message telling it to forward invoices somewhere is a known prompt-injection risk, and routing agents through one gateway gives admins a place to block actions and require approval. But for a student building an "AI inbox assistant," it means the feature you demo today may need a different design in two months.

**For you:** write a one-line list of every outside platform your app's main feature depends on. For each one, answer three questions:

- What do their terms say about AI or automated use?
- What's the free quota, and how many of *your* users does it actually cover?
- If they removed the one capability you rely on, what would your app still do?

If the honest answer to the last question is "nothing," design a version that still delivers value with the narrower access. For example, it could draft replies for the user to send instead of sending them itself.

## Question 2: Could you rebuild your setup from your repo?

On the other end of the spectrum, Jan-Lukas Else's post [AI made self-hosting fun again](https://janlukas.blog/posts/ai-self-hosting) reached the top spot on Hacker News this week, according to the author. His trick isn't a particular AI tool. It's where his setup lives. Most of his infrastructure is Docker Compose files, scripts and config files in Git repositories, "which makes it possible to use AI coding agents to work on my infrastructure in much the same way as they would work on any other software project."

The payoff is real. He built his own bootable OS image from a Git repo and says that even with AI it took half a day, while "without AI, it would probably have taken me at least a week." Updates now take a single Git push. Renovate opens pull requests for new versions, and merging one triggers GitHub Actions or Forgejo Actions workflows that build and deploy everything.

He's also honest about the downside: "AI-generated software isn't exempt from bugs, security issues, or technical debt. And having an AI agent make changes to my infrastructure doesn't absolve me of the responsibility of understanding those changes."

**For you:** whether you deploy on Vercel, a VPS or a Raspberry Pi, aim for this test: *if your server disappeared tonight, could you redeploy from your repo plus a list of secrets?* Ask your coding agent to move any setup you did by hand (environment variables, build commands, cron jobs) into files in the repo or into a short `DEPLOY.md`, so your agent can help you change it later instead of guessing.

## Question 3: Where's the copy of your data?

Code is easy to rebuild. User data isn't. Simon Willison highlighted a small but useful tool this week: [sqlite3_rsync](https://simonwillison.net/2026/Nov/26/sqlite3-rsync/). Normally, snapshotting a SQLite database means making a full duplicate on the same disk first, so if your small server already uses more than half its disk, "you are plain out of luck." sqlite3_rsync can copy a snapshot of the database over SSH to another machine *without* making that local copy first, and it can sync an existing copy by sending only the pages that changed.

Lots of vibe-coded projects store everything in a single SQLite file, and that's a fine choice. But one file on one machine is also one bad command away from being gone.

**For you:** before launch, set up a backup that lands on a *different* machine or service, schedule it, and then restore from it once to prove it works. A backup you've never restored is just a hope. If you use a hosted database, find where its backups and point-in-time restore settings live, and check what your plan actually includes.

## Question 4: How do you know the agent's output is right?

The most inspiring story of the week came by way of the There's An AI For That newsletter: two amateur astronomers [used Codex and Astra to search public telescope data for planets](https://openai.com/index/searching-for-distant-planets-with-astra/). OpenAI engineer Kevin Bond used Codex to compare published methods for finding faint, repeating dips in starlight, combine them into a search program, and test whether code changes improved it. He ran it on data from about **100,000 stars** from the Kepler telescope. Ethan Byrd, founder of the email infrastructure startup Primitive, used Astra on data from about **19 million stars**, and his first pass turned up 49 candidates.

What makes it a builder story is how they checked their work. Bond's search flagged more than 200 signals, **including 10 from planets astronomers had already confirmed**. Finding those known planets gave him confidence the program could pick out the kinds of signals he was looking for. Then he went further and asked a SETI Institute astronomer to check. The astronomer ran an independent search and found two of the same signals. Even so, nothing is confirmed yet, and OpenAI notes that confirming what caused them could take months or years.

Two other stories this week back up the same idea. GitHub's guide to [choosing the next safe step in application modernization](https://github.blog/ai-and-ml/github-copilot/how-to-choose-the-next-safe-step-in-application-modernization/) says to build an evidence inventory before changing anything, labeling every finding as *documented*, *inferred* or *unverified*. In one example, a time-boxed check on an old Java app showed 14 tests ran, with five passing and nine failing. The failures traced back to a single broken test dependency, not a broken app. "One broken test dependency did not justify redesigning the application," the author writes.

And Hugging Face's new series on [building and evaluating multi-agent systems](https://huggingface.co/blog/training-swarms) makes the same point about agents themselves. Four agents working on a task get four tries, and four tries cost four times as much. The fair test is whether four agents beat one agent *on the same token budget*. "We can only find out by testing."

**For you:** before you trust anything an agent built, give it questions you already know the answers to.

- For a feature, write three or four test cases with known correct outputs and run them after every change.
- Before a big rewrite, have your agent run the existing build and tests and write down what currently works, so you'd notice if the rewrite breaks it.
- Before adding "more agents" or a bigger model, measure whether it actually does better at the same cost.
- For anything important, get one independent check. That could be a friend testing it, a second model reviewing it, or a real user trying it while you watch.

## Ship something fun, then keep it alive

None of this is meant to slow you down. The same newsletter featured Andrej Karpathy's [AI-built map of the United States as a strategy game](https://newsletter.theresanaiforthat.com/p/karpathy-maps-america-with-ai). According to the newsletter, Claude spent seven hours pulling data from 31 public sources and wrote 45,000 lines of code, and Karpathy made it because it's "really fun to browse and play with." Projects like that are exactly what AI makes possible now.

The difference between a fun demo and a product people can depend on is mostly the boring stack underneath. So this weekend, take 30 minutes and answer the four questions for your project:

1. **Rules:** list every platform your main feature depends on, plus its terms and quota.
2. **Rebuild:** make sure your deploy setup lives in your repo.
3. **Data:** set up one off-machine backup and restore it once.
4. **Proof:** write three tests with known answers and run them after every agent change.

Then ship it.

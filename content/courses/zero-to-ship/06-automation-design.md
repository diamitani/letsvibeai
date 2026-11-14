---
title: Designing Automations with Chain Prompting
duration: 20 min
description: Apply the Chain Prompting method to design a more complex automation — the Social Media Monitor.
---

## Project: Social Media Monitor

**Goal**: Monitor Twitter for company mentions, analyze sentiment with AI, send daily summary to Slack.

### The Workflow

1. **Twitter** → Monitor for mentions of a keyword
2. **AI Model** → Analyze sentiment (Positive, Negative, Neutral)
3. **Slack** → Post original tweet + sentiment to #mentions channel

### Practice Prompt: Automation Architect

> I need to design an automation workflow in Make.com:
> 1. Monitor Twitter for mentions of "letsvibeai"
> 2. Use AI to analyze each mention's sentiment (Positive, Negative, Neutral)
> 3. Post the original tweet + sentiment to a Slack channel called #mentions
>
> Provide step-by-step implementation plan including: specific modules for each step, configuration instructions, data mapping between modules, and error handling suggestions.

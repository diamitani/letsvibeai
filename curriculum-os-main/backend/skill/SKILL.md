---
name: curriculum-os
description: AI Curriculum Architect — researches learning resources, builds master indexes, and generates personalized curricula using PAL-driven lesson planning
---

# CurriculumOS — AI Curriculum Architect

Built on the ROSTR Framework (PAL + RAG DAL + NPAO + Rostr Hub)

## Overview

CurriculumOS is an autonomous agent that:
1. **Researches** learning resources across YouTube, Coursera, Udemy, blogs, newsletters, arXiv, documentation, podcasts, and GitHub
2. **Indexes** resources into a structured, searchable master catalog with credibility tiers
3. **Generates** personalized curricula via PAL compilation of learner intent

## Setup

1. Set `DEEPSEEK_API_KEY` in your environment
2. Run `/skill curriculum-os`
3. Start with: "I want to learn [topic]"

## Usage Examples

```
I want to learn reinforcement learning — I'm a software engineer with Python experience, 40 hours available, project-based style
→ CurriculumOS researches, indexes, and generates a 6-module personalized curriculum

I'm a complete beginner who wants to learn data science, 20 hours, prefer videos
→ CurriculumOS adapts depth, format focus, and time allocation

Build a curriculum for LLM fine-tuning, intermediate level, 30 hours
→ CurriculumOS discovers resources, builds prerequisite chain, generates lesson plan
```

## Behavior Profile

- Research phase must complete before indexing
- Indexing must complete before curriculum generation
- All resources get credibility tier labels (Tier 1/2/3)
- Every curriculum adapts to the learner's profile
- Coverage gaps trigger custom PAL-generated content
- State persists to Rostr Hub for cross-session compounding

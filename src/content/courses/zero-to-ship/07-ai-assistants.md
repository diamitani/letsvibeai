---
title: Architecting Production AI Assistants
duration: 25 min
description: Learn the four-phase process for building a deployable, production-ready AI Assistant using an Assistants API.
---

## The Four Phases of Assistant Building

1. **Define (Chain Prompting)**: Design the assistant's "soul" — purpose, personality, tools
2. **Deploy (AI Platform)**: Create the assistant on the AI provider's platform
3. **Bundle (Assets)**: Prepare all materials for development (PRD, developer prompts)
4. **Build (Application)**: Build the front-end and back-end application

### Phase 1: Define Your Assistant's Master Prompt

Create a "Master Prompt" defining the assistant's vision, personality, capabilities, and boundaries.

### Practice Prompt: Customer Support Bot

> Based on this Master Prompt Idea, generate detailed instructions for an AI Assistant:
>
> "You are an AI Assistant for 'letsvibeai'. Your role is first-line customer support. Answer common questions from your knowledge base. If you cannot answer or the customer is frustrated, escalate to a human agent with a support ticket link."

### Phase 2: Deploy on AI Platform

Navigate to your AI provider's "Assistants" tab, create a new assistant, configure with generated instructions, enable "Retrieval" tool, and upload knowledge files.

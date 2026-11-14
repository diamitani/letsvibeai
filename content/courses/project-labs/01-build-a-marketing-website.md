---
title: Build a Marketing Website
duration: ~4 hours
description: Your first hands-on project.
---

## Overview

Your first hands-on project. Apply techniques from Modules 1-4 to build a complete, polished marketing website for a fictional (or real) product using any hosted builder (Lovable, v0.dev, or Bolt.new). Deploy to a live URL.

## Prerequisites

- Module 1: What Is AI (basic AI literacy)
- Module 2: What Is Vibe Coding (the loop)
- Module 3: The Toolkit (tool selection)
- Module 4: Prompt Chaining (basics)

## Learning Objectives

- Scaffold a multi-page website from a single prompt
- Iterate on design using natural language feedback
- Structure content for marketing conversion
- Deploy to a public URL
- Implement responsive design

## Build Steps

### Step 1: Define Your Product (30 min)

Before generating any code, write a one-paragraph product description:

```
Product name, target audience, core value proposition, key features, brand personality.
```

Example:
> "LaunchKit is a landing page builder for non-technical founders. It offers drag-and-drop templates, one-click deployment, and built-in analytics. The brand is modern, approachable, and confident."

### Step 2: Scaffold the Site (45 min)

Using your chosen tool (recommended: v0.dev for speed or Lovable for full-stack), prompt:

```
Build a marketing website for [product name].
Target audience: [description]
Pages needed: Home, Features, Pricing, About, Contact
Brand personality: [description]
Include: hero section, feature grid, pricing table, testimonial carousel, FAQ accordion, contact form
Style: modern, clean, responsive, [primary color] accent
```

Review the output. Does it match your vision? Note specific things to change.

### Step 3: Refine the Design (45 min)

Iterate using targeted prompts:

- "Make the hero section taller with a gradient background"
- "Change pricing cards to 3-column layout with featured plan highlighted"
- "Add hover animations to all buttons"
- "Make the testimonial section use a horizontal scroll on mobile"

Focus on one change at a time. Review after each.

### Step 4: Add Content (30 min)

Replace placeholder content with your actual copy:

- Write headlines that convert
- Add real feature descriptions
- Include authentic testimonials
- Add team photos or avatars

### Step 5: Deploy (30 min)

- Connect your GitHub repository
- Deploy via Vercel or Netlify
- Set up a custom domain (optional)
- Enable HTTPS

## Stretch Goals

- Add a blog page with at least 2 articles
- Implement dark mode toggle
- Add analytics (Plausible or Umami)
- Create a "waitlist" signup form connected to Supabase
- Add page transition animations

## Assessment Criteria

| Criterion | Pass | Distinction |
|-----------|------|-------------|
| Pages | 3+ pages, all linked | 5+ pages, custom 404 |
| Responsive | Works on mobile/desktop | Tablet optimized, no horizontal scroll |
| Performance | Loads in <3s | Lighthouse score >85 |
| Design | Clean, on-brand | Custom animations, polished spacing |
| Code | No console errors | TypeScript, accessible HTML |
| Deployed | Live on public URL | Custom domain, HTTPS enforced |

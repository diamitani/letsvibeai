# Module 3 — Packaging Custom Skills (`SKILL.md`)

Skills turn repetitive human processes into reproducible agent capabilities. Instead of re-explaining rules in every prompt, a skill bundles YAML frontmatter, execution instructions, scripts, and example fixtures.

### Lesson 3.1 — Anatomy of an Agent Skill

```markdown
---
name: api-scaffolder
description: Generates typed API endpoints with Zod validation and Supabase RLS policies
tools: [read_file, edit_file, run_command]
---

# Instructions
When scaffolding a new API route:
1. Verify database schema against data model.
2. Generate TypeScript interface.
3. Add rate limiting and session verification.
```

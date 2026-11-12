---
title: Prompts that survive production
duration: ~5 min
description: Structure beats clever wording.
---

## Five parts that hold up.

Strong prompts have five parts. A role. A clear goal. Constraints, like length or tone. Examples of what good looks like. And the exact output format you want back.

**`prompt.md`**

```md
Role: Senior product marketer.
Goal: Launch copy for the pricing page.
Constraints: Under 120 words. No hype.
Example: see docs/voice.md
Output: 3 headlines + 1 paragraph.
```

- **Role** — Role — who it should be
- **Goal** — Goal — what success is
- **Limits** — Constraints — the rules
- **Example** — Examples — show, don't tell
- **Output** — Output — exactly what to return

## Write it like a brief for a smart colleague.

Point to files instead of pasting them in.

Put together, it reads like a brief you would hand a smart colleague. Notice the example points to a file, instead of pasting it in.

## Iterate. Don't restart.

When the output misses, resist the urge to start over. Say exactly what's wrong, and what to keep. Starting fresh throws away everything the agent just learned.

**Start a new chat** vs **Steer the same thread**

| Tempting | Do this |
| --- | --- |
| Loses everything it learned | "Para 2 is too salesy — cut it." |
| Same mistakes, round two | "Keep the headlines as they are." |
| You re-explain from zero | Context and progress stay intact |

## Plan first. Then build.

For bigger jobs, use a loop. Ask for a plan. Correct the plan. Execute it, one step at a time. Then verify the result.

1. **Plan** — ""
2. **Correct** — ""
3. **Execute** — ""
4. **Verify** — ""

## What you just learned.

- Role, goal, constraints, examples, output
- Iterate in the same thread — don't restart
- Plan → correct → execute → verify

> **Your mission:** Rewrite one weekly prompt with all five parts — then run the plan-first loop.

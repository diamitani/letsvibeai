window.GENCY_LESSONS = [
 {
  "n": 1,
  "title": "Setup: pick and install a harness",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Pick and install a harness",
    "sub": "Get a working agent in ten minutes.",
    "lines": [
     {
      "say": "Welcome to Agent Harness Mastery.",
      "at": 0.7,
      "end": 2.7
     },
     {
      "say": "In this first lesson, you'll pick a harness and get it running on your machine.",
      "at": 3.2,
      "end": 9.2
     }
    ],
    "dur": 10.4
   },
   {
    "name": "Idea",
    "layout": "statement",
    "eyebrow": "The big idea",
    "headline": "A harness is the app around the model.",
    "sub": "It reads files, runs commands, calls tools and remembers your rules.",
    "lines": [
     {
      "say": "A model is the brain. A harness is everything around it.",
      "at": 11.1,
      "end": 15.5
     },
     {
      "say": "It reads your files, runs commands, calls tools, and remembers your rules.",
      "at": 16,
      "end": 20.8
     },
     {
      "say": "Claude Code, Codex, Hermes, Antigravity, VS Code and Cursor are all harnesses.",
      "at": 21.3,
      "end": 26.1
     }
    ],
    "dur": 16.9
   },
   {
    "name": "Layers",
    "layout": "points",
    "eyebrow": "Same everywhere",
    "headline": "Every harness has five layers.",
    "items": [
     {
      "t": "Model",
      "d": "The brain you pick",
      "at": 32.5
     },
     {
      "t": "Context",
      "d": "Rules and memory",
      "at": 34.3
     },
     {
      "t": "Capabilities",
      "d": "Skills and tools",
      "at": 37.6
     },
     {
      "t": "Surfaces",
      "d": "Chat, terminal, editor",
      "at": 40.5
     },
     {
      "t": "Orchestration",
      "d": "Agents and hooks",
      "at": 43.4
     }
    ],
    "lines": [
     {
      "say": "Under the hood, every harness has the same five layers.",
      "at": 28,
      "end": 32
     },
     {
      "say": "The model.",
      "at": 32.5,
      "end": 33.8
     },
     {
      "say": "Context, which is your rules and memory.",
      "at": 34.3,
      "end": 37.1
     },
     {
      "say": "Capabilities, like skills and tool connections.",
      "at": 37.6,
      "end": 40
     },
     {
      "say": "Surfaces, meaning chat, terminal or editor.",
      "at": 40.5,
      "end": 42.9
     },
     {
      "say": "And orchestration, where agents work together.",
      "at": 43.4,
      "end": 45.8
     }
    ],
    "dur": 19.7
   },
   {
    "name": "Choose",
    "layout": "harness",
    "eyebrow": "Pick one",
    "headline": "Start with the one you already have.",
    "items": [
     {
      "t": "Claude Code",
      "d": "Terminal · npm install"
     },
     {
      "t": "Codex",
      "d": "Terminal · npm install"
     },
     {
      "t": "Hermes",
      "d": "Terminal · open source"
     },
     {
      "t": "Antigravity",
      "d": "Desktop app · agent manager"
     },
     {
      "t": "VS Code",
      "d": "Editor · Copilot agent mode"
     },
     {
      "t": "Cursor",
      "d": "Editor · built-in agent"
     }
    ],
    "lines": [
     {
      "say": "Start with whatever you already use.",
      "at": 47.7,
      "end": 50.1
     },
     {
      "say": "If you like the terminal, try Claude Code, Codex or Hermes.",
      "at": 50.6,
      "end": 55
     },
     {
      "say": "If you live in an editor, try VS Code, Cursor, or Antigravity.",
      "at": 55.5,
      "end": 60.3
     },
     {
      "say": "Everything you learn in this course carries over to all of them.",
      "at": 60.8,
      "end": 65.6
     }
    ],
    "dur": 19.8
   },
   {
    "name": "First run",
    "layout": "code",
    "eyebrow": "Your first session",
    "headline": "Give it a folder and git.",
    "sub": "Git is your undo button.",
    "path": "terminal",
    "code": "mkdir my-first-agent\ncd my-first-agent\ngit init\n\n# launch your harness here\nclaude      # or: codex · hermes",
    "lines": [
     {
      "say": "Make a fresh folder, and turn it into a git repo.",
      "at": 67.5,
      "end": 71.9
     },
     {
      "say": "Git is your undo button. Every change the agent makes can be reviewed and rolled back.",
      "at": 72.4,
      "end": 78.8
     },
     {
      "say": "Then launch the harness inside that folder.",
      "at": 79.3,
      "end": 82.1
     }
    ],
    "dur": 16.5
   },
   {
    "name": "Prompts",
    "layout": "steps",
    "eyebrow": "Try these first",
    "headline": "Three prompts for day one.",
    "items": [
     {
      "t": "Explain",
      "d": "What is in this folder?",
      "at": 88.1
     },
     {
      "t": "Plan",
      "d": "Plan it. No code yet.",
      "at": 91.4
     },
     {
      "t": "Do one step",
      "d": "Then stop and show me.",
      "at": 97.1
     }
    ],
    "lines": [
     {
      "say": "Here are three prompts to try on day one.",
      "at": 84,
      "end": 87.6
     },
     {
      "say": "First, ask it to explain the folder.",
      "at": 88.1,
      "end": 90.9
     },
     {
      "say": "Then, ask for a plan, and tell it not to write code yet.",
      "at": 91.4,
      "end": 96.6
     },
     {
      "say": "Finally, ask it to do just step one, and stop.",
      "at": 97.1,
      "end": 101.1
     }
    ],
    "dur": 19
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "Your harness is ready.",
    "sub": "Next: Context files that remember for you",
    "lines": [
     {
      "say": "That's your setup.",
      "at": 103.1,
      "end": 104.4
     },
     {
      "say": "Next, we write the file that makes every session start smart.",
      "at": 104.9,
      "end": 109.3
     },
     {
      "say": "Free, from Gency A I dot com.",
      "cap": "Free, from gencyai.com",
      "at": 109.8,
      "end": 112.6
     }
    ],
    "dur": 12.4
   }
  ],
  "total": 114.7
 },
 {
  "n": 2,
  "title": "Context files that remember for you",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Context files that remember for you",
    "sub": "Write it once. Every session starts smart.",
    "lines": [
     {
      "say": "Lesson two. Context files.",
      "at": 0.7,
      "end": 2.3
     },
     {
      "say": "This is the single biggest upgrade most people never make.",
      "at": 2.8,
      "end": 6.8
     }
    ],
    "dur": 8
   },
   {
    "name": "Problem",
    "layout": "statement",
    "eyebrow": "The problem",
    "headline": "Say it once. Reuse it forever.",
    "sub": "Stop re-explaining your stack in every chat.",
    "lines": [
     {
      "say": "Every new session starts with a blank memory.",
      "at": 8.7,
      "end": 11.9
     },
     {
      "say": "So you end up explaining your stack, your style and your rules, again and again.",
      "at": 12.4,
      "end": 18.4
     },
     {
      "say": "A context file fixes that. You write it once, and the agent reads it first, every time.",
      "at": 18.9,
      "end": 25.7
     }
    ],
    "dur": 18.9
   },
   {
    "name": "Example",
    "layout": "code",
    "eyebrow": "A real one",
    "headline": "It is just markdown.",
    "path": "AGENTS.md",
    "code": "# Project rules\n\nStack: Next.js, TypeScript, pnpm.\n\n## Always\n- Run `pnpm test` before saying done\n- Small commits, clear messages\n\n## Never\n- Edit files in /dist\n- Commit .env files",
    "lines": [
     {
      "say": "Here's a real one. It's just a markdown file in your project.",
      "cap": "Here's a real one. It's just a markdown file in your project.",
      "at": 27.6,
      "end": 32.4
     },
     {
      "say": "A line about the stack.",
      "at": 32.9,
      "end": 34.9
     },
     {
      "say": "Things to always do, like running the tests.",
      "at": 35.4,
      "end": 38.6
     },
     {
      "say": "And things to never do, like committing secrets.",
      "at": 39.1,
      "end": 42.3
     }
    ],
    "dur": 16.6
   },
   {
    "name": "Contents",
    "layout": "points",
    "eyebrow": "What goes in",
    "headline": "Four things belong in a rules file.",
    "items": [
     {
      "t": "Stack and commands",
      "d": "How to build and test",
      "at": 46.7
     },
     {
      "t": "Always and never",
      "d": "Hard rules",
      "at": 50.8
     },
     {
      "t": "Where things live",
      "d": "Folders that matter",
      "at": 53.3
     },
     {
      "t": "How to verify",
      "d": "What done means",
      "at": 55.8
     }
    ],
    "lines": [
     {
      "say": "Four things belong in it.",
      "at": 44.2,
      "end": 46.2
     },
     {
      "say": "Your stack, and the commands to build and test.",
      "at": 46.7,
      "end": 50.3
     },
     {
      "say": "Your always and never rules.",
      "at": 50.8,
      "end": 52.8
     },
     {
      "say": "Where the important things live.",
      "at": 53.3,
      "end": 55.3
     },
     {
      "say": "And how the agent should check its own work.",
      "at": 55.8,
      "end": 59.4
     }
    ],
    "dur": 17.1
   },
   {
    "name": "Formats",
    "layout": "harness",
    "eyebrow": "Per harness",
    "headline": "Every harness reads one. The name changes.",
    "items": [
     {
      "t": "Claude Code",
      "d": "CLAUDE.md"
     },
     {
      "t": "Codex",
      "d": "AGENTS.md"
     },
     {
      "t": "Hermes",
      "d": "AGENTS.md · ~/.hermes/memories"
     },
     {
      "t": "Antigravity",
      "d": "GEMINI.md · .agent/rules/"
     },
     {
      "t": "VS Code",
      "d": ".github/copilot-instructions.md"
     },
     {
      "t": "Cursor",
      "d": ".cursor/rules/*.mdc"
     }
    ],
    "lines": [
     {
      "say": "Every harness reads a file like this. Only the name changes.",
      "at": 61.3,
      "end": 65.7
     },
     {
      "say": "Agents dot M D is the closest thing to a shared standard, and most tools read it.",
      "cap": "AGENTS.md is the closest thing to a shared standard — most tools read it.",
      "at": 66.2,
      "end": 73
     },
     {
      "say": "Write it once, and point the others at it.",
      "at": 73.5,
      "end": 77.1
     }
    ],
    "dur": 17.7
   },
   {
    "name": "Tips",
    "layout": "points",
    "eyebrow": "Keep it sharp",
    "headline": "Short beats complete.",
    "items": [
     {
      "t": "Keep it under 200 lines",
      "at": 80.8
     },
     {
      "t": "Rules, not essays",
      "at": 84.1
     },
     {
      "t": "Fix it when the agent slips",
      "at": 86.2
     }
    ],
    "lines": [
     {
      "say": "A few tips.",
      "at": 79,
      "end": 80.3
     },
     {
      "say": "Keep it short. Under two hundred lines.",
      "at": 80.8,
      "end": 83.6
     },
     {
      "say": "Write rules, not essays.",
      "at": 84.1,
      "end": 85.7
     },
     {
      "say": "And every time the agent gets something wrong, add a line so it never happens again.",
      "at": 86.2,
      "end": 92.6
     }
    ],
    "dur": 15.5
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "Your agent now remembers.",
    "sub": "Next: Prompts that survive production",
    "lines": [
     {
      "say": "Now your agent remembers.",
      "at": 94.6,
      "end": 96.2
     },
     {
      "say": "Next lesson, prompts that hold up in real work.",
      "at": 96.7,
      "end": 100.3
     }
    ],
    "dur": 8.6
   }
  ],
  "total": 102.4
 },
 {
  "n": 3,
  "title": "Prompts that survive production",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Prompts that survive production",
    "sub": "Structure beats clever wording.",
    "lines": [
     {
      "say": "Lesson three. Prompts that survive production.",
      "at": 0.7,
      "end": 3.1
     },
     {
      "say": "Clever wording isn't the trick. Structure is.",
      "at": 3.6,
      "end": 6.4
     }
    ],
    "dur": 7.6
   },
   {
    "name": "Parts",
    "layout": "points",
    "eyebrow": "The structure",
    "headline": "Five parts of a prompt that holds up.",
    "items": [
     {
      "t": "Role",
      "d": "Who it should be",
      "at": 10.8
     },
     {
      "t": "Goal",
      "d": "What success is",
      "at": 12.6
     },
     {
      "t": "Constraints",
      "d": "Limits and rules",
      "at": 14.4
     },
     {
      "t": "Examples",
      "d": "Show, do not tell",
      "at": 16.9
     },
     {
      "t": "Output format",
      "d": "Exactly what to return",
      "at": 19.8
     }
    ],
    "lines": [
     {
      "say": "Strong prompts have five parts.",
      "at": 8.3,
      "end": 10.3
     },
     {
      "say": "A role.",
      "at": 10.8,
      "end": 12.1
     },
     {
      "say": "A clear goal.",
      "at": 12.6,
      "end": 13.9
     },
     {
      "say": "Constraints, like length or tone.",
      "at": 14.4,
      "end": 16.4
     },
     {
      "say": "Examples of what good looks like.",
      "at": 16.9,
      "end": 19.3
     },
     {
      "say": "And the exact output format you want back.",
      "at": 19.8,
      "end": 23
     }
    ],
    "dur": 16.6
   },
   {
    "name": "Example",
    "layout": "code",
    "eyebrow": "Put together",
    "headline": "Read it like a brief.",
    "path": "prompt.md",
    "code": "Role: Senior product marketer.\nGoal: Launch copy for the pricing page.\nConstraints: Under 120 words. No hype.\nExample: see docs/voice.md\nOutput: 3 headlines + 1 paragraph.",
    "lines": [
     {
      "say": "Here's what that looks like.",
      "at": 24.9,
      "end": 26.9
     },
     {
      "say": "It reads like a brief you would hand a smart colleague.",
      "at": 27.4,
      "end": 31.8
     },
     {
      "say": "Notice the example points to a file instead of pasting it in.",
      "at": 32.3,
      "end": 37.1
     }
    ],
    "dur": 14.1
   },
   {
    "name": "Iterate",
    "layout": "statement",
    "eyebrow": "When it misses",
    "headline": "Iterate. Don't restart.",
    "sub": "Say what is wrong and what to keep.",
    "lines": [
     {
      "say": "When the output misses, resist the urge to start over.",
      "at": 39,
      "end": 43
     },
     {
      "say": "Say exactly what's wrong, and what to keep.",
      "at": 43.5,
      "end": 46.7
     },
     {
      "say": "Starting fresh throws away everything the agent just learned.",
      "at": 47.2,
      "end": 50.8
     }
    ],
    "dur": 13.7
   },
   {
    "name": "Loop",
    "layout": "steps",
    "eyebrow": "For bigger jobs",
    "headline": "Plan first. Then build.",
    "items": [
     {
      "t": "Plan",
      "d": "Ask for steps",
      "at": 55.6
     },
     {
      "t": "Correct",
      "d": "Fix the plan",
      "at": 57.7
     },
     {
      "t": "Execute",
      "d": "One step at a time",
      "at": 59.5
     },
     {
      "t": "Verify",
      "d": "Test the result",
      "at": 62.8
     }
    ],
    "lines": [
     {
      "say": "For bigger jobs, use a loop.",
      "at": 52.7,
      "end": 55.1
     },
     {
      "say": "Ask for a plan.",
      "at": 55.6,
      "end": 57.2
     },
     {
      "say": "Correct the plan.",
      "at": 57.7,
      "end": 59
     },
     {
      "say": "Execute it a step at a time.",
      "at": 59.5,
      "end": 62.3
     },
     {
      "say": "Then verify the result.",
      "at": 62.8,
      "end": 64.4
     }
    ],
    "dur": 13.6
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "Prompts that hold up.",
    "sub": "Next: Skills: package your expertise",
    "lines": [
     {
      "say": "Fixing a plan is cheaper than fixing a product.",
      "at": 66.4,
      "end": 70
     },
     {
      "say": "Next lesson, we turn your best prompts into skills.",
      "at": 70.5,
      "end": 74.1
     }
    ],
    "dur": 10.6
   }
  ],
  "total": 76.2
 },
 {
  "n": 4,
  "title": "Skills: package your expertise",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Skills: package your expertise",
    "sub": "Teach the agent a job once.",
    "lines": [
     {
      "say": "Lesson four. Skills.",
      "at": 0.7,
      "end": 2
     },
     {
      "say": "If you've explained a process three times, it should be a skill.",
      "at": 2.5,
      "end": 7.3
     }
    ],
    "dur": 8.5
   },
   {
    "name": "Idea",
    "layout": "statement",
    "eyebrow": "What a skill is",
    "headline": "A skill teaches one job, your way.",
    "sub": "A folder with a SKILL.md inside.",
    "lines": [
     {
      "say": "A skill teaches the agent one job, done your way.",
      "at": 9.2,
      "end": 13.2
     },
     {
      "say": "It's a folder with a single markdown file inside, called skill dot M D.",
      "cap": "It's a folder with a single markdown file inside: SKILL.md.",
      "at": 13.7,
      "end": 19.3
     },
     {
      "say": "When a request matches, the agent loads it automatically.",
      "at": 19.8,
      "end": 23.4
     }
    ],
    "dur": 16.1
   },
   {
    "name": "Anatomy",
    "layout": "code",
    "eyebrow": "Anatomy",
    "headline": "Name. Description. Steps.",
    "path": "skills/pdf-report/SKILL.md",
    "code": "---\nname: pdf-report\ndescription: Build a branded PDF\n  report from a CSV. Use when asked\n  for a report or one-pager.\n---\n\n1. Summarise the 3 key trends\n2. Fill templates/report.html\n3. Export to PDF",
    "lines": [
     {
      "say": "At the top, a name and a description.",
      "at": 25.3,
      "end": 28.5
     },
     {
      "say": "The description is how the agent decides when to use it.",
      "at": 29,
      "end": 33.4
     },
     {
      "say": "Below that, the steps, in plain language.",
      "at": 33.9,
      "end": 36.7
     }
    ],
    "dur": 13.3
   },
   {
    "name": "Disclosure",
    "layout": "points",
    "eyebrow": "Why it scales",
    "headline": "Progressive disclosure.",
    "items": [
     {
      "t": "Only the description loads at first",
      "at": 41.5
     },
     {
      "t": "The body loads when it matches",
      "at": 46
     },
     {
      "t": "Big references live in extra files",
      "at": 50.1
     }
    ],
    "lines": [
     {
      "say": "Skills scale because of progressive disclosure.",
      "at": 38.6,
      "end": 41
     },
     {
      "say": "At first, the agent only sees the name and description.",
      "at": 41.5,
      "end": 45.5
     },
     {
      "say": "The full steps load only when a request matches.",
      "at": 46,
      "end": 49.6
     },
     {
      "say": "And long references live in separate files, read only when needed.",
      "at": 50.1,
      "end": 54.5
     }
    ],
    "dur": 17.8
   },
   {
    "name": "Triggers",
    "layout": "points",
    "eyebrow": "Make it fire",
    "headline": "Descriptions that trigger.",
    "items": [
     {
      "t": "Say what it does",
      "at": 61.3
     },
     {
      "t": "Say when to use it",
      "at": 63.4
     },
     {
      "t": "Use the words people type",
      "at": 65.9
     }
    ],
    "lines": [
     {
      "say": "If a skill doesn't fire, the description is usually the problem.",
      "at": 56.4,
      "end": 60.8
     },
     {
      "say": "Say what it does.",
      "at": 61.3,
      "end": 62.9
     },
     {
      "say": "Say when to use it.",
      "at": 63.4,
      "end": 65.4
     },
     {
      "say": "And use the words people actually type.",
      "at": 65.9,
      "end": 68.7
     }
    ],
    "dur": 14.2
   },
   {
    "name": "Formats",
    "layout": "harness",
    "eyebrow": "Per harness",
    "headline": "Same file. Different folder.",
    "items": [
     {
      "t": "Claude Code",
      "d": ".claude/skills/"
     },
     {
      "t": "Codex",
      "d": ".agents/skills/"
     },
     {
      "t": "Hermes",
      "d": "~/.hermes/skills/"
     },
     {
      "t": "Antigravity",
      "d": ".agent/skills/"
     },
     {
      "t": "VS Code",
      "d": ".github/skills/"
     },
     {
      "t": "Cursor",
      "d": ".cursor/rules/ (fallback)"
     }
    ],
    "lines": [
     {
      "say": "The skill file is portable.",
      "at": 70.6,
      "end": 72.6
     },
     {
      "say": "Only the folder changes from one harness to the next.",
      "at": 73.1,
      "end": 77.1
     }
    ],
    "dur": 9.2
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "Your know-how, packaged.",
    "sub": "Next: Connectors and MCP",
    "lines": [
     {
      "say": "Browse free skills in the Gency A I library.",
      "cap": "Browse free skills in the GencyAI library.",
      "at": 79.9,
      "end": 83.5
     },
     {
      "say": "Next lesson, we connect the agent to your real tools.",
      "at": 84,
      "end": 88
     }
    ],
    "dur": 11
   }
  ],
  "total": 90.1
 },
 {
  "n": 5,
  "title": "Connectors & MCP",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Connectors & MCP",
    "sub": "Plug the agent into your real tools.",
    "lines": [
     {
      "say": "Lesson five. Connectors.",
      "at": 0.7,
      "end": 2
     },
     {
      "say": "Let's plug the agent into the tools you already use.",
      "at": 2.5,
      "end": 6.5
     }
    ],
    "dur": 7.7
   },
   {
    "name": "Idea",
    "layout": "statement",
    "eyebrow": "The rule",
    "headline": "Connect, don't paste.",
    "sub": "Live data beats stale copies.",
    "lines": [
     {
      "say": "Copying and pasting data into a chat goes stale the moment you do it.",
      "at": 8.4,
      "end": 14
     },
     {
      "say": "A connector lets the agent read live data, and take real actions.",
      "at": 14.5,
      "end": 19.3
     }
    ],
    "dur": 12.8
   },
   {
    "name": "MCP",
    "layout": "points",
    "eyebrow": "The standard",
    "headline": "MCP is one plug for every tool.",
    "items": [
     {
      "t": "Live data",
      "d": "Docs, tickets, repos",
      "at": 26.1
     },
     {
      "t": "Real actions",
      "d": "Create, update, send",
      "at": 29
     },
     {
      "t": "One protocol",
      "d": "Works in every harness",
      "at": 32.3
     }
    ],
    "lines": [
     {
      "say": "The standard is called M C P, the model context protocol.",
      "cap": "The standard is MCP — the Model Context Protocol.",
      "at": 21.2,
      "end": 25.6
     },
     {
      "say": "It gives the agent live data.",
      "at": 26.1,
      "end": 28.5
     },
     {
      "say": "It lets the agent take real actions.",
      "at": 29,
      "end": 31.8
     },
     {
      "say": "And it works the same way in every harness.",
      "at": 32.3,
      "end": 35.9
     }
    ],
    "dur": 16.6
   },
   {
    "name": "Config",
    "layout": "code",
    "eyebrow": "Setup",
    "headline": "A name, a command, a key.",
    "path": ".mcp.json",
    "code": "{\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"server-github\"],\n      \"env\": {\n        \"GITHUB_TOKEN\": \"${GITHUB_TOKEN}\"\n      }\n    }\n  }\n}",
    "lines": [
     {
      "say": "Setting one up takes three things.",
      "at": 37.8,
      "end": 40.2
     },
     {
      "say": "A name, a command to start the server, and a key.",
      "at": 40.7,
      "end": 45.1
     },
     {
      "say": "Keep the key in an environment variable. Never paste it into the file.",
      "at": 45.6,
      "end": 50.8
     }
    ],
    "dur": 14.9
   },
   {
    "name": "Safety",
    "layout": "points",
    "eyebrow": "Stay safe",
    "headline": "Grant the least access that works.",
    "items": [
     {
      "t": "Read-only first",
      "at": 55.6
     },
     {
      "t": "Scoped tokens in env vars",
      "at": 57.4
     },
     {
      "t": "Approve anything that writes",
      "at": 59.2
     }
    ],
    "lines": [
     {
      "say": "Give the least access that works.",
      "at": 52.7,
      "end": 55.1
     },
     {
      "say": "Start read only.",
      "at": 55.6,
      "end": 56.9
     },
     {
      "say": "Use scoped tokens.",
      "at": 57.4,
      "end": 58.7
     },
     {
      "say": "And require approval for anything that writes or sends.",
      "at": 59.2,
      "end": 62.8
     }
    ],
    "dur": 12
   },
   {
    "name": "Formats",
    "layout": "harness",
    "eyebrow": "Per harness",
    "headline": "Where the config lives.",
    "items": [
     {
      "t": "Claude Code",
      "d": ".mcp.json"
     },
     {
      "t": "Codex",
      "d": "~/.codex/config.toml"
     },
     {
      "t": "Hermes",
      "d": "~/.hermes/config.yaml"
     },
     {
      "t": "Antigravity",
      "d": "mcp_config.json"
     },
     {
      "t": "VS Code",
      "d": ".vscode/mcp.json"
     },
     {
      "t": "Cursor",
      "d": ".cursor/mcp.json"
     }
    ],
    "lines": [
     {
      "say": "Every harness keeps this config in its own file.",
      "at": 64.7,
      "end": 68.3
     },
     {
      "say": "The shape is the same. Only the format changes.",
      "at": 68.8,
      "end": 72.4
     }
    ],
    "dur": 9.6
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "Your agent is connected.",
    "sub": "Next: Commands, prompts and workflows",
    "lines": [
     {
      "say": "Your agent can now reach real work.",
      "at": 74.4,
      "end": 77.2
     },
     {
      "say": "Next, we turn repeat requests into one word commands.",
      "at": 77.7,
      "end": 81.3
     }
    ],
    "dur": 9.8
   }
  ],
  "total": 83.4
 },
 {
  "n": 6,
  "title": "Commands, prompts & workflows",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Commands, prompts & workflows",
    "sub": "Repeat requests, one keystroke away.",
    "lines": [
     {
      "say": "Lesson six. Commands.",
      "at": 0.7,
      "end": 2
     },
     {
      "say": "This is how you stop typing the same prompt every day.",
      "at": 2.5,
      "end": 6.9
     }
    ],
    "dur": 8.1
   },
   {
    "name": "Idea",
    "layout": "statement",
    "eyebrow": "The rule",
    "headline": "Pasting the same prompt? Make it a command.",
    "lines": [
     {
      "say": "If you keep pasting the same prompt, it's time for a command.",
      "at": 8.8,
      "end": 13.6
     },
     {
      "say": "Type a slash and a word, and the whole prompt runs.",
      "at": 14.1,
      "end": 18.5
     }
    ],
    "dur": 11.6
   },
   {
    "name": "Example",
    "layout": "code",
    "eyebrow": "Example",
    "headline": "/review, in six lines.",
    "path": ".claude/commands/review.md",
    "code": "---\ndescription: Review staged changes\nargument-hint: [focus area]\n---\nReview `git diff --staged`.\nFocus on: $ARGUMENTS\nList bugs first, then style nits.",
    "lines": [
     {
      "say": "Here's a review command.",
      "at": 20.4,
      "end": 22
     },
     {
      "say": "Frontmatter at the top describes it.",
      "at": 22.5,
      "end": 24.9
     },
     {
      "say": "The body is just the prompt, with a slot for arguments.",
      "at": 25.4,
      "end": 29.8
     }
    ],
    "dur": 11.3
   },
   {
    "name": "Anatomy",
    "layout": "points",
    "eyebrow": "Anatomy",
    "headline": "Three parts, every harness.",
    "items": [
     {
      "t": "Frontmatter",
      "d": "Description and options",
      "at": 35
     },
     {
      "t": "Arguments",
      "d": "What you type after it",
      "at": 36.8
     },
     {
      "t": "Body",
      "d": "The prompt itself",
      "at": 38.6
     }
    ],
    "lines": [
     {
      "say": "Every harness uses the same three parts.",
      "at": 31.7,
      "end": 34.5
     },
     {
      "say": "Frontmatter.",
      "at": 35,
      "end": 36.3
     },
     {
      "say": "Arguments.",
      "at": 36.8,
      "end": 38.1
     },
     {
      "say": "And the body.",
      "at": 38.6,
      "end": 39.9
     }
    ],
    "dur": 10.1
   },
   {
    "name": "Formats",
    "layout": "harness",
    "eyebrow": "Per harness",
    "headline": "Same idea, different folder.",
    "items": [
     {
      "t": "Claude Code",
      "d": ".claude/commands/"
     },
     {
      "t": "Codex",
      "d": "~/.codex/prompts/"
     },
     {
      "t": "Hermes",
      "d": "skills as /commands"
     },
     {
      "t": "Antigravity",
      "d": ".agent/workflows/"
     },
     {
      "t": "VS Code",
      "d": ".github/prompts/*.prompt.md"
     },
     {
      "t": "Cursor",
      "d": ".cursor/commands/"
     }
    ],
    "lines": [
     {
      "say": "Each harness calls them something slightly different.",
      "at": 41.8,
      "end": 44.6
     },
     {
      "say": "Commands, prompts, or workflows. Same idea, different folder.",
      "at": 45.1,
      "end": 48.3
     }
    ],
    "dur": 9.2
   },
   {
    "name": "Share",
    "layout": "steps",
    "eyebrow": "Team habit",
    "headline": "Keep commands in git.",
    "items": [
     {
      "t": "Write",
      "d": "One file per command",
      "at": 53.1
     },
     {
      "t": "Commit",
      "d": "Next to the code",
      "at": 55.6
     },
     {
      "t": "Share",
      "d": "Everyone gets it",
      "at": 58.5
     }
    ],
    "lines": [
     {
      "say": "Keep them in git.",
      "at": 51,
      "end": 52.6
     },
     {
      "say": "Write one file per command.",
      "at": 53.1,
      "end": 55.1
     },
     {
      "say": "Commit it next to the code.",
      "at": 55.6,
      "end": 58
     },
     {
      "say": "And the whole team gets it on their next pull.",
      "at": 58.5,
      "end": 62.5
     }
    ],
    "dur": 13.4
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "One keystroke, every time.",
    "sub": "Next: Agents and subagents",
    "lines": [
     {
      "say": "Your best prompts are now one keystroke away.",
      "at": 64.5,
      "end": 67.7
     },
     {
      "say": "Next, we split big work across specialist agents.",
      "at": 68.2,
      "end": 71.4
     }
    ],
    "dur": 9.8
   }
  ],
  "total": 73.5
 },
 {
  "n": 7,
  "title": "Agents & subagents: plan, build, ship",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Agents & subagents: plan, build, ship",
    "sub": "Delegate like a lead, not a typist.",
    "lines": [
     {
      "say": "Lesson seven. Agents and subagents.",
      "at": 0.7,
      "end": 2.7
     },
     {
      "say": "This is where you stop typing, and start leading.",
      "at": 3.2,
      "end": 6.8
     }
    ],
    "dur": 8
   },
   {
    "name": "Idea",
    "layout": "statement",
    "eyebrow": "The idea",
    "headline": "Split big work across specialists.",
    "sub": "Each agent gets a clean context.",
    "lines": [
     {
      "say": "One agent doing everything gets slow and confused.",
      "at": 8.7,
      "end": 11.9
     },
     {
      "say": "Instead, hand pieces to specialists. One researches, one reviews, one tests.",
      "at": 12.4,
      "end": 16.8
     },
     {
      "say": "Each works in its own clean context, so the main thread stays sharp.",
      "at": 17.3,
      "end": 22.5
     }
    ],
    "dur": 15.7
   },
   {
    "name": "Define",
    "layout": "code",
    "eyebrow": "Define one",
    "headline": "Role, tools, model.",
    "path": ".claude/agents/reviewer.md",
    "code": "---\nname: reviewer\ndescription: Reviews diffs for bugs.\n  Use after every edit.\ntools: Read, Grep, Bash\n---\nYou are a strict code reviewer.\nReport bugs by severity.\nNever edit files.",
    "lines": [
     {
      "say": "An agent is another markdown file.",
      "at": 24.4,
      "end": 26.8
     },
     {
      "say": "It has a role, a list of tools it may use, and its instructions.",
      "at": 27.3,
      "end": 32.9
     },
     {
      "say": "This reviewer can read, but never edit.",
      "at": 33.4,
      "end": 36.2
     }
    ],
    "dur": 13.7
   },
   {
    "name": "Brief",
    "layout": "points",
    "eyebrow": "Delegation",
    "headline": "A brief that works.",
    "items": [
     {
      "t": "The goal and why",
      "at": 41.4
     },
     {
      "t": "What done looks like",
      "at": 44.3
     },
     {
      "t": "What not to touch",
      "at": 46.4
     },
     {
      "t": "What to report back",
      "at": 48.5
     }
    ],
    "lines": [
     {
      "say": "Delegating well means writing a good brief.",
      "at": 38.1,
      "end": 40.9
     },
     {
      "say": "The goal, and why it matters.",
      "at": 41.4,
      "end": 43.8
     },
     {
      "say": "What done looks like.",
      "at": 44.3,
      "end": 45.9
     },
     {
      "say": "What not to touch.",
      "at": 46.4,
      "end": 48
     },
     {
      "say": "And what to report back.",
      "at": 48.5,
      "end": 50.5
     }
    ],
    "dur": 14.3
   },
   {
    "name": "Ship",
    "layout": "steps",
    "eyebrow": "End to end",
    "headline": "Plan. Build. Test. Ship.",
    "items": [
     {
      "t": "Plan",
      "d": "Approve the steps",
      "at": 54.2
     },
     {
      "t": "Build",
      "d": "Agents in parallel",
      "at": 56
     },
     {
      "t": "Test",
      "d": "Reviewer + tests",
      "at": 58.5
     },
     {
      "t": "Ship",
      "d": "Push and deploy",
      "at": 62.6
     }
    ],
    "lines": [
     {
      "say": "Put it together.",
      "at": 52.4,
      "end": 53.7
     },
     {
      "say": "Approve the plan.",
      "at": 54.2,
      "end": 55.5
     },
     {
      "say": "Let agents build in parallel.",
      "at": 56,
      "end": 58
     },
     {
      "say": "Have the reviewer and the tests check the work.",
      "at": 58.5,
      "end": 62.1
     },
     {
      "say": "Then push to git, and deploy to Vercel.",
      "at": 62.6,
      "end": 65.8
     }
    ],
    "dur": 15.3
   },
   {
    "name": "Formats",
    "layout": "harness",
    "eyebrow": "Per harness",
    "headline": "Where agents live.",
    "items": [
     {
      "t": "Claude Code",
      "d": ".claude/agents/*.md"
     },
     {
      "t": "Codex",
      "d": "config.toml profiles"
     },
     {
      "t": "Hermes",
      "d": "delegation + skills"
     },
     {
      "t": "Antigravity",
      "d": "Manager view · parallel"
     },
     {
      "t": "VS Code",
      "d": ".github/agents/*.agent.md"
     },
     {
      "t": "Cursor",
      "d": ".cursor/agents/"
     }
    ],
    "lines": [
     {
      "say": "Each harness defines agents a little differently.",
      "at": 67.7,
      "end": 70.5
     },
     {
      "say": "Some use markdown files. Others use profiles or a manager view.",
      "at": 71,
      "end": 75.4
     }
    ],
    "dur": 9.6
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "You lead. Agents build.",
    "sub": "Next: Governance for teams",
    "lines": [
     {
      "say": "You lead. They build. You review.",
      "at": 77.4,
      "end": 79.8
     },
     {
      "say": "Last lesson, rolling this out to a whole team.",
      "at": 80.3,
      "end": 83.9
     }
    ],
    "dur": 9.4
   }
  ],
  "total": 86
 },
 {
  "n": 8,
  "title": "Governance for teams",
  "scenes": [
   {
    "name": "Intro",
    "layout": "title",
    "headline": "Governance for teams",
    "sub": "Make it safe, then make it stick.",
    "lines": [
     {
      "say": "Lesson eight. Governance.",
      "at": 0.7,
      "end": 2
     },
     {
      "say": "How to roll agents out to a team, safely.",
      "at": 2.5,
      "end": 6.1
     }
    ],
    "dur": 7.3
   },
   {
    "name": "Idea",
    "layout": "statement",
    "eyebrow": "Two sets of rules",
    "headline": "Rules for the agents. Rules for the people.",
    "lines": [
     {
      "say": "Governance needs two sets of rules.",
      "at": 8,
      "end": 10.4
     },
     {
      "say": "Rules for the agents, written in their context files.",
      "at": 10.9,
      "end": 14.5
     },
     {
      "say": "And rules for the people, written down where everyone can see them.",
      "at": 15,
      "end": 19.8
     }
    ],
    "dur": 13.7
   },
   {
    "name": "Data",
    "layout": "points",
    "eyebrow": "Data",
    "headline": "Decide what goes where.",
    "items": [
     {
      "t": "What never goes in a prompt",
      "at": 23.5
     },
     {
      "t": "Which tools can connect",
      "at": 26.8
     },
     {
      "t": "Who approves new connectors",
      "at": 30.1
     }
    ],
    "lines": [
     {
      "say": "Start with data.",
      "at": 21.7,
      "end": 23
     },
     {
      "say": "Decide what never goes in a prompt.",
      "at": 23.5,
      "end": 26.3
     },
     {
      "say": "Which tools the agents may connect to.",
      "at": 26.8,
      "end": 29.6
     },
     {
      "say": "And who approves anything new.",
      "at": 30.1,
      "end": 32.1
     }
    ],
    "dur": 12.3
   },
   {
    "name": "Permissions",
    "layout": "points",
    "eyebrow": "Permissions",
    "headline": "Ask before writing.",
    "items": [
     {
      "t": "Default to ask",
      "at": 35.8
     },
     {
      "t": "Allow-list safe commands",
      "at": 39.5
     },
     {
      "t": "Log what agents changed",
      "at": 45.6
     }
    ],
    "lines": [
     {
      "say": "Then permissions.",
      "at": 34,
      "end": 35.3
     },
     {
      "say": "By default, the agent asks before it writes.",
      "at": 35.8,
      "end": 39
     },
     {
      "say": "Allow list the safe commands, so it can move fast on the boring stuff.",
      "at": 39.5,
      "end": 45.1
     },
     {
      "say": "And keep a log of what the agents changed.",
      "at": 45.6,
      "end": 49.2
     }
    ],
    "dur": 17.1
   },
   {
    "name": "Rollout",
    "layout": "steps",
    "eyebrow": "Rollout",
    "headline": "Start small. Share everything.",
    "items": [
     {
      "t": "One team",
      "d": "Pilot for 30 days",
      "at": 53.6
     },
     {
      "t": "Shared library",
      "d": "Skills in git",
      "at": 56.9
     },
     {
      "t": "Monthly review",
      "d": "Keep what works",
      "at": 59.8
     }
    ],
    "lines": [
     {
      "say": "Finally, roll out in steps.",
      "at": 51.1,
      "end": 53.1
     },
     {
      "say": "Pilot with one team for thirty days.",
      "at": 53.6,
      "end": 56.4
     },
     {
      "say": "Share a skills library in git.",
      "at": 56.9,
      "end": 59.3
     },
     {
      "say": "Review it every month, and keep what works.",
      "at": 59.8,
      "end": 63
     }
    ],
    "dur": 13.8
   },
   {
    "name": "Wrap",
    "layout": "end",
    "headline": "Course complete.",
    "sub": "You finished the course.",
    "lines": [
     {
      "say": "That's the course. You know the five layers, and how each harness writes them.",
      "at": 65,
      "end": 70.6
     },
     {
      "say": "Need help building it for your team? Talk to Gency A I.",
      "cap": "Need help building it for your team? Talk to GencyAI.",
      "at": 71.1,
      "end": 75.9
     }
    ],
    "dur": 13.8
   }
  ],
  "total": 78
 }
];

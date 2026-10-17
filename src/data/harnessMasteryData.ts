import { HarnessLesson, HarnessPractice, HarnessConceptTrack, HarnessFormatEntry } from '../types';

export interface HarnessOption {
  key: string;
  name: string;
  description: string;
  iconName: string;
}

export const HARNESS_OPTIONS: HarnessOption[] = [
  { key: 'claude', name: 'Claude Code', description: 'Anthropic terminal CLI & research harness', iconName: 'Terminal' },
  { key: 'codex', name: 'Codex', description: 'OpenAI autonomous terminal & execution harness', iconName: 'Cpu' },
  { key: 'hermes', name: 'Hermes', description: 'Self-hosted persistent agent runtime with memory', iconName: 'Layers' },
  { key: 'anti', name: 'Antigravity', description: 'DeepMind multi-agent IDE & autonomous workspace', iconName: 'Sparkles' },
  { key: 'vscode', name: 'VS Code Copilot', description: 'GitHub Copilot agent & instructions harness', iconName: 'FileCode' },
  { key: 'cursor', name: 'Cursor', description: 'AI-first code editor with MDC rule system', iconName: 'Compass' }
];

export const HARNESS_LESSONS: HarnessLesson[] = [
  {
    id: 'lesson-01',
    num: '01',
    title: 'Setup: pick and install a harness',
    dur: '6:40',
    desc: 'What an agent harness is, how the five layers map onto each one, and how to install and authenticate your first workspace.',
    src: '',
    isAvailable: false
  },
  {
    id: 'lesson-02',
    num: '02',
    title: 'Context files that remember for you',
    dur: '9:12',
    desc: 'Write project rules once (AGENTS.md, CLAUDE.md, rules folders) so every session starts informed with zero prompt repeating.',
    src: '',
    isAvailable: false
  },
  {
    id: 'lesson-03',
    num: '03',
    title: 'Prompts that survive production',
    dur: '11:05',
    desc: 'Role, goal, constraints, few-shot examples, and deterministic output schema. How to iterate and tune instead of restarting.',
    src: '',
    isAvailable: false
  },
  {
    id: 'lesson-04',
    num: '04',
    title: 'Skills: package your expertise',
    dur: '12:30',
    desc: 'Authoring SKILL.md files, progressive disclosure principles, trigger testing, and sharing skills seamlessly across harnesses.',
    src: '',
    isAvailable: false
  },
  {
    id: 'lesson-05',
    num: '05',
    title: 'Connectors & Model Context Protocol (MCP)',
    dur: '10:18',
    desc: 'Wire your agent into Google Drive, Slack, GitHub, Supabase, and proprietary APIs with least-privilege token access.',
    src: '',
    isAvailable: false
  },
  {
    id: 'lesson-06',
    num: '06',
    title: 'Commands, prompts & workflows',
    dur: '13:44',
    desc: 'Turn repeat requests into slash commands (/review, /test) and standardized, version-controlled markdown workflows.',
    src: '',
    isAvailable: false
  },
  {
    id: 'lesson-07',
    num: '07',
    title: 'Agents & subagents: plan, build, ship',
    dur: '15:20',
    desc: 'Plan first, delegate tasks to specialist subagents with dedicated budgets, verify with tests, and ship to production.',
    src: 'https://www.youtube.com/watch?v=gv0WHhKelSE',
    isAvailable: true
  },
  {
    id: 'lesson-08',
    num: '08',
    title: 'Governance for teams',
    dur: '8:55',
    desc: 'Data boundary rules, secret quarantine, shared org skill registries, and rollouts that scale safely without budget blowups.',
    src: '',
    isAvailable: false
  }
];

export const HARNESS_PRACTICES: HarnessPractice[] = [
  {
    n: '01',
    title: 'Start in a project',
    desc: 'Never work in a bare chat. Give every workstream its own rules, context boundary, and tracked workspace files.'
  },
  {
    n: '02',
    title: 'Write context once',
    desc: 'A tight rules file in the repository beats re-explaining stack decisions and guidelines in every single prompt.'
  },
  {
    n: '03',
    title: 'Plan before you build',
    desc: 'Ask for an implementation plan, review and correct it, then execute. Planning is 10x cheaper than fixing bad code.'
  },
  {
    n: '04',
    title: 'Package repeat work',
    desc: 'Done a process three times? Formalize it into a SKILL.md so it executes consistently and deterministically every time.'
  },
  {
    n: '05',
    title: 'Connect, don\'t paste',
    desc: 'Use Model Context Protocol (MCP) for live data. Grant the minimum scoped read/write permissions required for the job.'
  },
  {
    n: '06',
    title: 'Keep context clean',
    desc: 'Reset between major tasks. Delegate exploratory research to subagents so your primary reasoning thread stays razor sharp.'
  },
  {
    n: '07',
    title: 'Verify automatically',
    desc: 'Automated test suites, linter hooks, and typecheck gates catch regressions and hallucinations before they hit staging.'
  },
  {
    n: '08',
    title: 'Review before you ship',
    desc: 'The agent drafts the implementation. You own business accuracy, brand tone, security constraints, and customer data.'
  }
];

export const HARNESS_CONCEPT_TRACKS: HarnessConceptTrack[] = [
  {
    key: 'context',
    name: 'Context',
    meta: 'CONCEPT 01 · CONTEXT & MEMORY',
    desc: 'A workspace with its own instructions, reference documents, and persistent memory. Every session starts already knowing your stack, style guide, and project rules.',
    ship: 'Any ongoing product, client project, or marketing campaign.',
    modules: [
      'Write project instructions in one markdown file (AGENTS.md)',
      'Add reference files: API specs, design tokens, and style guides',
      'Global vs project vs directory-level scoping rules',
      'How agent memory works and how to steer entity vaults',
      'Share context through version-controlled git, not chat history'
    ]
  },
  {
    key: 'skills',
    name: 'Skills',
    meta: 'CONCEPT 02 · MODULAR CAPABILITIES',
    desc: 'A SKILL.md file that teaches the agent how to complete a specific task your way. It loads dynamically when a user prompt matches with no prompt engineering needed.',
    ship: 'You have explained the exact same process or workflow three times.',
    modules: [
      'Anatomy of a SKILL.md: name, trigger description, step-by-step runbook',
      'Authoring trigger descriptions that activate reliably',
      'Progressive disclosure: keeping the root skill concise with references/',
      'Testing, versioning, and publishing portable skills',
      'Browsing and mounting verified skills from the LetsVibeAI Hub'
    ]
  },
  {
    key: 'artifacts',
    name: 'Artifacts',
    meta: 'CONCEPT 03 · OUTPUT & DELIVERABLES',
    desc: 'Self-contained tangible deliverables created alongside the chat: documents, implementation plans, architecture diagrams, and interactive React apps.',
    ship: 'You need an executable, inspectable deliverable, not a wall of text.',
    modules: [
      'What qualifies as a persistent artifact vs disposable chat message',
      'Iterating on plans and specs without restarting session history',
      'Task lists, PRDs, and architecture walkthroughs as artifacts',
      'Interactive tools: sandbox builders, dashboards, and simulators',
      'Graduating markdown artifacts into production full-stack code'
    ]
  },
  {
    key: 'commands',
    name: 'Commands & Prompts',
    meta: 'CONCEPT 04 · MARKDOWN WORKFLOWS',
    desc: 'Reusable parameterized markdown files you trigger by name. Most harnesses share the same format: YAML frontmatter for metadata and markdown for execution prompts.',
    ship: 'You find yourself repeatedly copying and pasting the same prompt.',
    modules: [
      'YAML frontmatter basics: description, argument hints, tool filters',
      'Slash commands vs prompt files vs multi-step workflows',
      'Passing runtime variables and dynamic file references',
      'Project-level vs global developer command suites',
      'Maintaining versioned workflow commands alongside application code'
    ]
  },
  {
    key: 'agents',
    name: 'Agents & Subagents',
    meta: 'CONCEPT 05 · AUTONOMOUS DELEGATION',
    desc: 'Specialist agents with scoped instructions, dedicated toolsets, and isolated memory (one reviews, one writes tests, one deploys) in clean parallel contexts.',
    ship: 'The task is too complex or wide to execute in a single reasoning loop.',
    modules: [
      'Defining a specialist agent: role, permitted tools, and model choice',
      'Writing delegation briefs and success criteria that prevent drift',
      'Parallel agent orchestration with a centralized manager view',
      'Permission gates, execution hooks, and spend budgets',
      'Human-in-the-loop review and deterministic test verification'
    ]
  }
];

const MD_RULES = `# Project Rules & Standards

Stack: Next.js 15, TypeScript, Tailwind CSS, Supabase.

## Non-Negotiable Invariants
- Run \`pnpm test\` and \`pnpm lint\` before declaring any task complete
- Write clean, imperative commit messages and small atomic PRs
- Ensure all database mutations are protected with Postgres Row-Level Security (RLS)

## Prohibited Patterns
- Never edit generated bundles directly in /dist or /.next
- Never commit raw API keys, JWT secrets, or .env files`;

const MD_SKILL = `---
name: pdf-report
description: Build a branded PDF report from a CSV. Use when the user asks for a report, summary PDF, or one-pager.
---

# PDF Report Generator

1. Read the input CSV and summarize the top 3 key financial or performance trends
2. Populate the parameters into templates/report.html
3. Render and export the final output to /artifacts/report.pdf
4. Return the absolute file path and summary table`;

const SHARED_SKILL = `Same portable SKILL.md standard across all harnesses:

${MD_SKILL}`;

export const HARNESS_FORMAT_GUIDES: Record<string, HarnessFormatEntry> = {
  context: {
    title: 'Context & Project Rules Files',
    note: 'Every harness reads a markdown rules file from your project root. AGENTS.md is the industry standard. When in doubt, maintain AGENTS.md and symlink other tool formats.',
    harnesses: {
      claude: {
        path: 'CLAUDE.md  (or ~/.claude/CLAUDE.md for global user rules)',
        code: MD_RULES
      },
      codex: {
        path: 'AGENTS.md  (or ~/.codex/AGENTS.md for global user rules)',
        code: MD_RULES
      },
      hermes: {
        path: 'AGENTS.md or .hermes.md  (Memory stored in ~/.hermes/memories/)',
        code: `${MD_RULES}\n\n# Persistent Memory Files (Agent-Managed)\nMEMORY.md  → Key facts about your projects and stack\nUSER.md    → Information about your role and preferences`
      },
      anti: {
        path: 'GEMINI.md  ·  .agent/rules/*.md  (AGENTS.md also automatically loaded)',
        code: `# .agent/rules/project.md\n${MD_RULES}\n\n# Rules activation: Always On · Model Decision · Glob Filter · Manual Command`
      },
      vscode: {
        path: '.github/copilot-instructions.md  (AGENTS.md also supported)',
        code: `${MD_RULES}\n\n# Scoped Directory Rules: .github/instructions/api.instructions.md\n---\napplyTo: "src/api/**"\n---\nEnsure all incoming API payloads are strictly validated using Zod schemas.`
      },
      cursor: {
        path: '.cursor/rules/project.mdc  (AGENTS.md also supported)',
        code: `---\ndescription: Project rules and development standards\nglobs: "*"\nalwaysApply: true\n---\n${MD_RULES}`
      }
    }
  },
  skills: {
    title: 'Skills Standard (SKILL.md)',
    note: 'One directory per skill containing a SKILL.md file: YAML frontmatter with name and description, followed by step-by-step markdown instructions. The body is 100% portable.',
    harnesses: {
      claude: {
        path: '.claude/skills/pdf-report/SKILL.md  (or ~/.claude/skills/ for personal)',
        code: MD_SKILL
      },
      codex: {
        path: '.agents/skills/pdf-report/SKILL.md  (or ~/.codex/skills/ for personal)',
        code: SHARED_SKILL
      },
      hermes: {
        path: '~/.hermes/skills/pdf-report/SKILL.md',
        code: SHARED_SKILL
      },
      anti: {
        path: '.agent/skills/pdf-report/SKILL.md  (or ~/.gemini/antigravity/skills/ global)',
        code: SHARED_SKILL
      },
      vscode: {
        path: '.github/skills/pdf-report/SKILL.md',
        code: SHARED_SKILL
      },
      cursor: {
        path: '.cursor/rules/pdf-report.mdc  (native skills supported in newer builds)',
        code: `---\ndescription: Build a branded PDF report from a CSV. Use for reports, summary PDFs, and one-pagers.\nalwaysApply: false\n---\n\n1. Read the input CSV and summarize the top 3 key trends\n2. Populate templates/report.html with structured data\n3. Export to /artifacts/report.pdf and return the file path`
      }
    }
  },
  artifacts: {
    title: 'Artifacts & Tangible Deliverables',
    note: 'Some harnesses provide dedicated artifact panels. Everywhere else, the portable best practice is instructing the agent to write deliverables to a designated ./artifacts/ folder.',
    harnesses: {
      claude: {
        path: 'Claude.ai: built-in Artifacts panel  ·  Claude Code: files in ./artifacts/',
        code: `# CLAUDE.md\n## Deliverables Policy\nSave persistent reports, plans, diagrams, and HTML demos to ./artifacts/ as self-contained files. Never leave large output only in chat.`
      },
      codex: {
        path: './artifacts/  (files saved in active workspace)',
        code: `# AGENTS.md\n## Deliverables\nWrite all output artifacts to ./artifacts/<date>-<name>.md or .html. Summarize the artifact path in your final response.`
      },
      hermes: {
        path: './artifacts/  (or the workspace artifact folder)',
        code: `# AGENTS.md\n## Deliverables\nWrite all generated outputs to ./artifacts/. Update existing files rather than generating duplicate timestamped versions.`
      },
      anti: {
        path: 'Built-in interactive artifacts: Task List · Implementation Plan · Walkthrough',
        code: `Antigravity generates interactive markdown artifacts with user feedback buttons, alongside terminal logs and browser video recordings.\n\n# .agent/rules/deliverables.md\nAlways author an implementation plan artifact before modifying more than 3 files.`
      },
      vscode: {
        path: 'Copilot Chat code blocks → Apply  ·  files in ./artifacts/',
        code: `# .github/copilot-instructions.md\n## Deliverables\nSave structured documents to ./artifacts/ and open them in the active editor. Preview HTML files using Live Preview.`
      },
      cursor: {
        path: './artifacts/  (files in the workspace)',
        code: `---\ndescription: Deliverables and artifact storage\nalwaysApply: true\n---\nSave documents, diagrams, and HTML demos to ./artifacts/ as clean standalone files.`
      }
    }
  },
  commands: {
    title: 'Commands, Prompts & Slash Workflows',
    note: 'Reusable markdown files triggered by name or slash shortcut. Frontmatter specifies arguments and tool constraints; the body defines the exact prompt instructions.',
    harnesses: {
      claude: {
        path: '.claude/commands/review.md  →  triggered via /review',
        code: `---\ndescription: Review staged git changes\nargument-hint: [focus area]\n---\nReview \`git diff --staged\`. Focus specifically on: $ARGUMENTS\nList high-severity bugs first, followed by stylistic suggestions.`
      },
      codex: {
        path: '~/.codex/prompts/review.md  →  triggered via /prompts:review',
        code: `---\ndescription: Review staged git changes\nargument-hint: FOCUS=<area>\n---\nReview \`git diff --staged\`. Focus specifically on: $FOCUS\nList high-severity bugs first, followed by stylistic suggestions.`
      },
      hermes: {
        path: '~/.hermes/skills/review/SKILL.md  →  triggered via /review',
        code: `---\nname: review\ndescription: Review staged git changes\n---\nReview \`git diff --staged\`. List bugs first by severity, then provide actionable code diffs.`
      },
      anti: {
        path: '.agent/workflows/review.md  →  triggered via /review',
        code: `---\ndescription: Review staged changes\n---\n1. Execute \`git diff --staged\`\n2. Analyze code changes for bugs and security vulnerabilities\n3. Propose fixes formatted in an implementation plan artifact`
      },
      vscode: {
        path: '.github/prompts/review.prompt.md  →  triggered via /review',
        code: `---\nmode: agent\ndescription: Review staged changes\n---\nReview the staged changes in this workspace. Focus on \${input:focus}.\nList critical bugs first, followed by architecture suggestions.`
      },
      cursor: {
        path: '.cursor/commands/review.md  →  triggered via /review',
        code: `Review \`git diff --staged\`.\nList critical bugs first, then stylistic nits.\n\n(Cursor commands are plain markdown files located in .cursor/commands/)`
      }
    }
  },
  agents: {
    title: 'Agents & Subagent Delegation',
    note: 'Custom subagents are defined by a role, allowed tools, and model configuration. Specialist subagents execute parallel tasks in clean reasoning loops.',
    harnesses: {
      claude: {
        path: '.claude/agents/reviewer.md',
        code: `---\nname: reviewer\ndescription: Reviews diffs for security and logic bugs. Use proactively after code edits.\ntools: Read, Grep, Bash\nmodel: sonnet\n---\nYou are a strict senior code reviewer. Report bugs categorized by severity.\nNever edit files directly; output suggestions as diff blocks.`
      },
      codex: {
        path: '~/.codex/config.toml  (profiles) + AGENTS.md role specs',
        code: `[profiles.reviewer]\nmodel = "gpt-5-codex"\napproval_policy = "never"\nsandbox_mode = "read-only"\n\n# Execute: codex --profile reviewer "review my staged changes"`
      },
      hermes: {
        path: 'Delegation tool + skill-defined personas (~/.hermes/skills/)',
        code: `# ~/.hermes/skills/reviewer/SKILL.md\n---\nname: reviewer\ndescription: Strict code review specialist\n---\nWhen delegated a code review task, analyze diffs for security and logic bugs.\nNever edit files.\n\n# Hermes spawns isolated subagents for parallel multi-file work.`
      },
      anti: {
        path: '.agent/rules/ + Manager View (parallel agent orchestration)',
        code: `# .agent/rules/reviewer.md\nWhen delegated a code review: read only, inspect diffs for edge cases, report bugs by severity.\n\n# Spawn multiple concurrent agents from the Antigravity Manager View;\neach gets its own isolated context, plan, and artifact workspace.`
      },
      vscode: {
        path: '.github/agents/reviewer.agent.md',
        code: `---\ndescription: Reviews code diffs for bugs and regressions\ntools: ['codebase', 'search', 'usages']\nmodel: GPT-5\n---\nYou are a strict senior reviewer. Report bugs ordered by severity. Never edit files directly.`
      },
      cursor: {
        path: '.cursor/agents/reviewer.md  (or custom agent mode)',
        code: `---\nname: reviewer\ndescription: Reviews staged diffs for security and logic bugs\n---\nYou are a strict senior code reviewer. Report bugs ordered by severity. Never modify code directly.`
      }
    }
  },
  stack: {
    title: 'Folder Layout by Harness',
    note: 'The five universal layers remain constant across tools. Maintain your primary source of truth in AGENTS.md and .agents/skills/, then link into whichever harness your team runs.',
    harnesses: {
      claude: {
        path: 'Claude Code Project Root Layout',
        code: `CLAUDE.md\n.mcp.json\n.claude/\n  skills/<name>/SKILL.md\n  commands/*.md\n  agents/*.md\n  settings.json   (permissions, automated hooks)`
      },
      codex: {
        path: 'Codex Project Root Layout',
        code: `AGENTS.md\n.agents/skills/<name>/SKILL.md\n~/.codex/\n  config.toml     (MCP servers, profiles, approval policies)\n  prompts/*.md`
      },
      hermes: {
        path: 'Hermes Runtime Layout (~/.hermes/)',
        code: `AGENTS.md         (in project root)\n~/.hermes/\n  config.yaml     (default model, MCP connectors, active tools)\n  skills/<name>/SKILL.md\n  memories/MEMORY.md, USER.md`
      },
      anti: {
        path: 'Antigravity IDE Project Root Layout',
        code: `GEMINI.md / AGENTS.md\nmcp_config.json\n.agent/\n  rules/*.md\n  workflows/*.md\n  skills/<name>/SKILL.md`
      },
      vscode: {
        path: 'VS Code Copilot Project Root Layout',
        code: `AGENTS.md\n.github/\n  copilot-instructions.md\n  instructions/*.instructions.md\n  prompts/*.prompt.md\n  agents/*.agent.md\n  skills/<name>/SKILL.md\n.vscode/mcp.json`
      },
      cursor: {
        path: 'Cursor Project Root Layout',
        code: `AGENTS.md\n.cursor/\n  rules/*.mdc\n  commands/*.md\n  agents/*.md\n  mcp.json`
      }
    }
  },
  library: {
    title: 'Connecting Tools via Model Context Protocol (MCP)',
    note: 'Same standard everywhere: a named server running a command with environment variables. Always store credentials in environment variables rather than hardcoding in config files.',
    harnesses: {
      claude: {
        path: '.mcp.json  (project root)',
        code: `{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "\${GITHUB_TOKEN}" }\n    }\n  }\n}`
      },
      codex: {
        path: '~/.codex/config.toml',
        code: `[mcp_servers.github]\ncommand = "npx"\nargs = ["-y", "@modelcontextprotocol/server-github"]\nenv = { GITHUB_TOKEN = "\${GITHUB_TOKEN}" }`
      },
      hermes: {
        path: '~/.hermes/config.yaml',
        code: `mcp_servers:\n  github:\n    command: npx\n    args: ["-y", "@modelcontextprotocol/server-github"]\n    env:\n      GITHUB_TOKEN: \${GITHUB_TOKEN}`
      },
      anti: {
        path: 'mcp_config.json  (or Agent Panel → Manage MCP Servers)',
        code: `{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "\${GITHUB_TOKEN}" }\n    }\n  }\n}`
      },
      vscode: {
        path: '.vscode/mcp.json',
        code: `{\n  "inputs": [\n    {\n      "id": "gh",\n      "type": "promptString",\n      "password": true,\n      "description": "GitHub Personal Access Token"\n    }\n  ],\n  "servers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "\${input:gh}" }\n    }\n  }\n}`
      },
      cursor: {
        path: '.cursor/mcp.json',
        code: `{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "\${env:GITHUB_TOKEN}" }\n    }\n  }\n}`
      }
    }
  }
};

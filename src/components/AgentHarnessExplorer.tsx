import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  Code2,
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
  Clock,
  Layers,
  Terminal,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  X,
  ArrowRight,
  FolderTree,
  Cpu,
  Workflow,
  FileCode,
  FileText
} from 'lucide-react';

export const AgentHarnessExplorer: React.FC = () => {
  // Video Lesson State
  const [activeLesson, setActiveLesson] = useState<number>(6); // Default to lesson 7 (active video)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Track State
  const [activeTrack, setActiveTrack] = useState<number>(0);
  
  // Modal / Harness Format State
  const [activeBox, setActiveBox] = useState<string | null>(null);
  const [activeHarnessIndex, setActiveHarnessIndex] = useState<number>(3); // Default Antigravity
  const [copied, setCopied] = useState<boolean>(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const HARNESSES = [
    { key: 'claude', name: 'Claude Code', badge: 'CLI & Desktop' },
    { key: 'codex', name: 'Codex', badge: 'Terminal Profile' },
    { key: 'hermes', name: 'Hermes', badge: 'Autonomous Agent' },
    { key: 'anti', name: 'Antigravity', badge: 'DeepMind IDE' },
    { key: 'vscode', name: 'VS Code', badge: 'Copilot Agent' },
    { key: 'cursor', name: 'Cursor', badge: 'Rules & MDC' }
  ];

  const LESSONS = [
    { title: 'Setup: pick and install a harness', duration: '6:40', desc: 'What a harness is, how the five layers map onto each one, and how to install your first.', videoId: '' },
    { title: 'Context files that remember for you', duration: '9:12', desc: 'Write project rules once (AGENTS.md, CLAUDE.md, rules folders) so every session starts smart.', videoId: '' },
    { title: 'Prompts that survive production', duration: '11:05', desc: 'Role, goal, constraints, examples, output format. Iterate instead of restarting.', videoId: '' },
    { title: 'Skills: package your expertise', duration: '12:30', desc: 'Write a SKILL.md, use progressive disclosure, test triggers, share skills across harnesses.', videoId: '' },
    { title: 'Connectors & MCP', duration: '10:18', desc: 'Wire the agent into Drive, Slack, GitHub and your own APIs with least-privilege access.', videoId: '' },
    { title: 'Commands, prompts & workflows', duration: '13:44', desc: 'Turn repeat requests into slash commands and reusable prompt files.', videoId: '' },
    { title: 'Agents & subagents: plan, build, ship', duration: '15:20', desc: 'Plan first, delegate to specialist agents, verify with tests, deploy to Vercel.', videoId: 'gv0WHhKelSE' },
    { title: 'Governance for teams', duration: '8:55', desc: 'Data rules, permissions, shared skill libraries and a rollout plan that sticks.', videoId: '' }
  ];

  const PRACTICES = [
    { title: 'Start in a project', desc: 'Never work in a bare chat. Give every workstream its own rules and files.', boxKey: 'context' },
    { title: 'Write context once', desc: 'A tight rules file beats re-explaining yourself in every prompt.', boxKey: 'context' },
    { title: 'Plan before you build', desc: 'Ask for a plan, correct it, then execute. Cheaper than fixing the wrong build.', boxKey: 'artifacts' },
    { title: 'Package repeat work', desc: "Done it three times? Make it a skill so it's done right every time after.", boxKey: 'skills' },
    { title: 'Connect, don\'t paste', desc: 'Use MCP for live data. Grant the least access that works.', boxKey: 'library' },
    { title: 'Keep context clean', desc: 'Reset between tasks. Hand research to subagents so the main thread stays sharp.', boxKey: 'agents' },
    { title: 'Verify automatically', desc: 'Tests, hooks and checklists catch what a quick read misses.', boxKey: 'practices' },
    { title: 'Review before you ship', desc: 'The agent drafts. You own accuracy, tone and anything confidential.', boxKey: 'artifacts' }
  ];

  const TRACKS = [
    {
      key: 'context',
      name: 'Context & Memory',
      meta: 'CONCEPT 01 · CONTEXT',
      desc: 'A project with its own instructions, reference files and memory. Every session inside it starts already knowing who you are and what you are building.',
      ship: 'Any ongoing workstream: a client, a product, a campaign.',
      modules: [
        'Write project instructions in one markdown file',
        'Add reference files: briefs, examples, style guides',
        'Global vs project vs folder-level rules',
        'How memory works and how to steer it',
        'Share context through git, not chat'
      ]
    },
    {
      key: 'skills',
      name: 'Skills & Tools',
      meta: 'CONCEPT 02 · CAPABILITIES',
      desc: 'A SKILL.md file that teaches the agent one job your way. It loads automatically when a request matches with zero prompt overhead.',
      ship: 'You have explained the same process three times.',
      modules: [
        'Anatomy of a SKILL.md: name, description, steps',
        'Write a description that triggers reliably',
        'Progressive disclosure: keep the core file short',
        'Test, version and share skills',
        'Browse free skills in the GencyAI library'
      ]
    },
    {
      key: 'artifacts',
      name: 'Artifacts & Outputs',
      meta: 'CONCEPT 03 · OUTPUT',
      desc: 'Standalone deliverables the agent makes next to the chat: documents, plans, diagrams, and interactive tools you can open, edit and share.',
      ship: 'You want a usable thing, not a wall of text.',
      modules: [
        'What deserves to be an artifact',
        'Iterate without starting over',
        'Plans, task lists and walkthroughs as artifacts',
        'Interactive tools: calculators, dashboards, forms',
        'When to graduate an artifact into a real app'
      ]
    },
    {
      key: 'commands',
      name: 'Commands & Workflows',
      meta: 'CONCEPT 04 · MARKDOWN',
      desc: 'Reusable markdown files you trigger by name. Most harnesses share the same shape: frontmatter for metadata, plain instructions for the body.',
      ship: 'You keep pasting the same prompt.',
      modules: [
        'Frontmatter basics: description, arguments, tools',
        'Slash commands vs prompt files vs workflows',
        'Pass arguments and reference files',
        'Project-level vs personal commands',
        'Keep everything in git next to the code'
      ]
    },
    {
      key: 'agents',
      name: 'Agents & Subagents',
      meta: 'CONCEPT 05 · DELEGATION',
      desc: 'Specialist agents with their own instructions, tools and model: one reviews, one researches, one tests, each in an isolated clean context.',
      ship: 'The task is big enough to split up.',
      modules: [
        'Define an agent: role, tools, model',
        'Write a delegation brief that works',
        'Parallel agents and a manager view',
        'Hooks, permissions and approvals',
        'Review, merge and keep a human in the loop'
      ]
    }
  ];

  const MD_RULES = `# Project rules\n\nStack: Next.js 15, TypeScript, pnpm.\n\n## Always\n- Run \`pnpm test\` before saying a task is done\n- Small commits, imperative messages\n\n## Never\n- Edit generated files in /dist\n- Commit .env files`;
  const MD_SKILL = `---\nname: pdf-report\ndescription: Build a branded PDF report from a CSV. Use when the user asks for a report, summary PDF or one-pager.\n---\n\n# PDF report\n\n1. Read the CSV and summarise the 3 key trends\n2. Fill templates/report.html\n3. Export to PDF and list the file path`;
  const SHARED_SKILL = `Same SKILL.md body everywhere:\n\n${MD_SKILL}`;

  const FORMAT_DATA: Record<string, { title: string; note: string; h: Record<string, [string, string]> }> = {
    context: {
      title: 'Context & rules files',
      note: 'Every harness reads a markdown rules file from your repo root. AGENTS.md is the closest thing to a shared standard. If in doubt, write that and symlink the rest.',
      h: {
        claude: ['CLAUDE.md  (also ~/.claude/CLAUDE.md for personal rules)', MD_RULES],
        codex: ['AGENTS.md  (also ~/.codex/AGENTS.md)', MD_RULES],
        hermes: ['AGENTS.md or .hermes.md · memory in ~/.hermes/memories/', `${MD_RULES}\n\n# Memory files (agent-written)\nMEMORY.md  → facts about your projects\nUSER.md    → facts about you`],
        anti: ['GEMINI.md · .agent/rules/*.md  (AGENTS.md also read)', `# .agent/rules/project.md\n${MD_RULES}\n\n# Rules can be set to: Always On · Model Decision · Glob · Manual`],
        vscode: ['.github/copilot-instructions.md  (AGENTS.md also read)', `${MD_RULES}\n\n# Scoped rules: .github/instructions/api.instructions.md\n---\napplyTo: "src/api/**"\n---\nValidate every request body with zod.`],
        cursor: ['.cursor/rules/project.mdc  (AGENTS.md also read)', `---\ndescription: Project rules\nglobs:\nalwaysApply: true\n---\n${MD_RULES}`]
      }
    },
    skills: {
      title: 'Skills (SKILL.md)',
      note: 'One folder per skill with a SKILL.md inside: frontmatter for name and description, markdown body for the steps. The body is portable; only the folder location changes.',
      h: {
        claude: ['.claude/skills/pdf-report/SKILL.md · ~/.claude/skills/ for personal', MD_SKILL],
        codex: ['.agents/skills/pdf-report/SKILL.md · ~/.codex/skills/ for personal', SHARED_SKILL],
        hermes: ['~/.hermes/skills/pdf-report/SKILL.md', SHARED_SKILL],
        anti: ['.agent/skills/pdf-report/SKILL.md · ~/.gemini/antigravity/skills/ global', SHARED_SKILL],
        vscode: ['.github/skills/pdf-report/SKILL.md', SHARED_SKILL],
        cursor: ['.cursor/rules/pdf-report.mdc (rules fallback; native skills folder in newer builds)', `---\ndescription: Build a branded PDF report from a CSV. Use for reports, summary PDFs, one-pagers.\nalwaysApply: false\n---\n\n1. Read the CSV and summarise the 3 key trends\n2. Fill templates/report.html\n3. Export to PDF and list the file path`]
      }
    },
    artifacts: {
      title: 'Artifacts & deliverables',
      note: 'Only some harnesses have a dedicated artifact pane. Everywhere else, the portable pattern is the same: tell the agent to save deliverables as files in a known folder.',
      h: {
        claude: ['Claude.ai: built-in Artifacts pane · Claude Code: files in ./artifacts/', '# CLAUDE.md\n## Deliverables\nSave reports, plans and demos to ./artifacts/ as\nself-contained .html or .md. Never leave them only in chat.'],
        codex: ['./artifacts/ (files in the workspace)', '# AGENTS.md\n## Deliverables\nWrite outputs to ./artifacts/<date>-<name>.md or .html.\nSummarise the path in your final message.'],
        hermes: ['./artifacts/ or the agent\'s workspace folder', '# AGENTS.md\n## Deliverables\nWrite outputs to ./artifacts/. Reuse an existing file\ninstead of creating a new version.'],
        anti: ['Built-in artifacts: task list · implementation plan · walkthrough', 'Antigravity generates these as markdown artifacts you\ncomment on in the Manager view, alongside screenshots\nand browser recordings.\n\n# .agent/rules/deliverables.md\nAlways produce an implementation plan before editing\nmore than 3 files.'],
        vscode: ['Chat code blocks → Apply · files in ./artifacts/', '# .github/copilot-instructions.md\n## Deliverables\nSave documents to ./artifacts/ and open them in the\neditor. Preview HTML with the Live Preview extension.'],
        cursor: ['./artifacts/ (files in the workspace)', '---\ndescription: Where deliverables go\nalwaysApply: true\n---\nSave documents and demos to ./artifacts/ as .md or .html.']
      }
    },
    commands: {
      title: 'Commands, prompts & workflows',
      note: 'Reusable markdown you trigger by name. Frontmatter holds metadata; the body is just the prompt. Rename the folder and tweak the keys to port between tools.',
      h: {
        claude: ['.claude/commands/review.md → /review', '---\ndescription: Review staged changes\nargument-hint: [focus area]\n---\nReview `git diff --staged`. Focus on: $ARGUMENTS\nList bugs first, then style nits.'],
        codex: ['~/.codex/prompts/review.md → /prompts:review', '---\ndescription: Review staged changes\nargument-hint: FOCUS=<area>\n---\nReview `git diff --staged`. Focus on: $FOCUS\nList bugs first, then style nits.'],
        hermes: ['~/.hermes/skills/review/SKILL.md → /review', '---\nname: review\ndescription: Review staged changes\n---\nReview `git diff --staged`. List bugs first,\nthen style nits.'],
        anti: ['.agent/workflows/review.md → /review', '---\ndescription: Review staged changes\n---\n1. Run `git diff --staged`\n2. List bugs first, then style nits\n3. Propose fixes as a plan'],
        vscode: ['.github/prompts/review.prompt.md → /review', '---\nmode: agent\ndescription: Review staged changes\n---\nReview the staged changes. Focus on ${input:focus}.\nList bugs first, then style nits.'],
        cursor: ['.cursor/commands/review.md → /review', 'Review `git diff --staged`.\nList bugs first, then style nits.\n\n(Commands are plain markdown without required frontmatter.)']
      }
    },
    agents: {
      title: 'Agents & subagents',
      note: 'Custom agents are markdown files with a role, a tool list and sometimes a model. Where a tool has no agent file, roles live in your rules or config instead.',
      h: {
        claude: ['.claude/agents/reviewer.md', '---\nname: reviewer\ndescription: Reviews diffs for bugs. Use proactively after edits.\ntools: Read, Grep, Bash\nmodel: sonnet\n---\nYou are a strict code reviewer. Report bugs by severity.\nNever edit files.'],
        codex: ['~/.codex/config.toml (profiles) + AGENTS.md roles', '[profiles.reviewer]\nmodel = "gpt-5-codex"\napproval_policy = "never"\nsandbox_mode = "read-only"\n\n# run: codex --profile reviewer "review my diff"'],
        hermes: ['Delegation tool + skill-defined personas', '# ~/.hermes/skills/reviewer/SKILL.md\n---\nname: reviewer\ndescription: Strict code review persona\n---\nWhen delegated a review, report bugs by severity.\nNever edit files.\n\n# Hermes can spawn isolated subagents for parallel work.'],
        anti: ['.agent/rules/ + Manager view (parallel agents)', '# .agent/rules/reviewer.md\nWhen asked to review: read only, report bugs by\nseverity, never edit.\n\n# Spawn several agents at once from the Manager view;\neach gets its own task, plan and artifacts.'],
        vscode: ['.github/agents/reviewer.agent.md', '---\ndescription: Reviews diffs for bugs\ntools: [\'codebase\', \'search\', \'usages\']\nmodel: GPT-5\n---\nYou are a strict code reviewer. Report bugs by severity.\nNever edit files.'],
        cursor: ['.cursor/agents/reviewer.md (or a custom mode)', '---\nname: reviewer\ndescription: Reviews diffs for bugs\n---\nYou are a strict code reviewer. Report bugs by severity.\nNever edit files.']
      }
    },
    stack: {
      title: 'Folder layout by harness',
      note: 'The same five layers, five different folders. Keep one source of truth in AGENTS.md and a skills folder, then link into whichever harness you run.',
      h: {
        claude: ['Project Root', 'CLAUDE.md\n.mcp.json\n.claude/\n  skills/<name>/SKILL.md\n  commands/*.md\n  agents/*.md\n  settings.json   (permissions, hooks)'],
        codex: ['Project Root', 'AGENTS.md\n.agents/skills/<name>/SKILL.md\n~/.codex/\n  config.toml     (MCP, profiles, approvals)\n  prompts/*.md'],
        hermes: ['~/.hermes/ & Project Root', 'AGENTS.md  (project root)\n~/.hermes/\n  config.yaml     (model, MCP, tools)\n  skills/<name>/SKILL.md\n  memories/MEMORY.md, USER.md'],
        anti: ['Project Root', 'GEMINI.md / AGENTS.md\n.agent/\n  rules/*.md\n  workflows/*.md\n  skills/<name>/SKILL.md'],
        vscode: ['Project Root', 'AGENTS.md\n.github/\n  copilot-instructions.md\n  instructions/*.instructions.md\n  prompts/*.prompt.md\n  agents/*.agent.md\n  skills/<name>/SKILL.md\n.vscode/mcp.json'],
        cursor: ['Project Root', 'AGENTS.md\n.cursor/\n  rules/*.mdc\n  commands/*.md\n  agents/*.md\n  mcp.json']
      }
    },
    library: {
      title: 'Connecting tools (MCP)',
      note: 'Same idea everywhere: a named server with a command and arguments. The key names and file format change. Never paste secrets; reference environment variables.',
      h: {
        claude: ['.mcp.json', '{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }\n    }\n  }\n}'],
        codex: ['~/.codex/config.toml', '[mcp_servers.github]\ncommand = "npx"\nargs = ["-y", "@modelcontextprotocol/server-github"]\nenv = { GITHUB_TOKEN = "..." }   # prefer env_vars passthrough'],
        hermes: ['~/.hermes/config.yaml', 'mcp_servers:\n  github:\n    command: npx\n    args: ["-y", "@modelcontextprotocol/server-github"]\n    env:\n      GITHUB_TOKEN: ${GITHUB_TOKEN}'],
        anti: ['mcp_config.json  (Agent panel → Manage MCP servers)', '{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "..." }\n    }\n  }\n}'],
        vscode: ['.vscode/mcp.json', '{\n  "inputs": [{ "id": "gh", "type": "promptString", "password": true, "description": "GitHub token" }],\n  "servers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "${input:gh}" }\n    }\n  }\n}'],
        cursor: ['.cursor/mcp.json', '{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_TOKEN": "${env:GITHUB_TOKEN}" }\n    }\n  }\n}']
      }
    },
    practices: {
      title: 'Where to write the rules',
      note: 'Habits 1 to 2 and 6 to 7 all end up in the same place: a rules file the agent reads first. Here is its name and location in each harness.',
      h: null as any
    }
  };
  FORMAT_DATA.practices.h = FORMAT_DATA.context.h;

  const currentLesson = LESSONS[activeLesson];
  const activeFormatEntry = activeBox ? FORMAT_DATA[activeBox] : null;
  const currentHarnessKey = HARNESSES[activeHarnessIndex].key;
  const currentFormatPair = activeFormatEntry ? activeFormatEntry.h[currentHarnessKey] : null;

  const handleCopyCode = () => {
    if (currentFormatPair) {
      navigator.clipboard.writeText(currentFormatPair[1]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="harness-mastery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Top Badge and Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101b24] text-white text-xs font-semibold shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-[#ec4909]" />
            <span>Agent Harness Mastery by GencyAI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            Harness-Agnostic Training for{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              AI Coding & Work Agents.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            Context files, skills, artifacts, commands and agents with exact file formats for Claude Code, Codex, Hermes, Antigravity, VS Code, and Cursor.
          </p>
        </div>

        {/* Global Action Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setActiveBox('stack');
              setActiveHarnessIndex(3);
            }}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-bold border border-[#4a4d4f]/15 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FolderTree className="w-3.5 h-3.5 text-[#ec4909]" />
            <span>Folder Layouts</span>
          </button>

          <button
            onClick={() => {
              setActiveBox('library');
              setActiveHarnessIndex(3);
            }}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-bold border border-[#4a4d4f]/15 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ec4909]" />
            <span>MCP Tool Configs</span>
          </button>
        </div>
      </div>

      {/* 8-LESSON VIDEO THEATER & LESSON SELECTOR */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/[0.06] shadow-[0_12px_40px_-8px_rgba(16,27,36,0.06)] mb-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Cinema (7 cols) */}
          <div className="lg:col-span-7 bg-[#101b24] rounded-[24px] p-5 sm:p-6 text-white border border-black/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Screen Area */}
            <div className="aspect-video bg-[#020335] rounded-xl border border-white/10 relative overflow-hidden flex flex-col justify-between p-4">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-md">
                  LESSON 0{activeLesson + 1} OF 08
                </span>
                <span className="text-[11px] font-mono text-[#ec4909] font-bold flex items-center gap-1.5 bg-[#ec4909]/10 px-2.5 py-0.5 rounded-full border border-[#ec4909]/20">
                  <span className="w-2 h-2 rounded-full bg-[#ec4909] animate-pulse" />
                  {currentLesson.videoId ? 'LIVE STREAM AVAILABLE' : 'ON-DEMAND SYLLABUS'}
                </span>
              </div>

              {/* YouTube Video or Cinema Visualizer */}
              {currentLesson.videoId ? (
                <div className="absolute inset-0 z-0">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1&autoplay=0`}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="text-center my-auto space-y-3 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#ec4909] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#ec4909]/40">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight max-w-md mx-auto">
                    {currentLesson.title}
                  </h4>
                  <p className="text-xs text-white/70 max-w-sm mx-auto line-clamp-2">
                    {currentLesson.desc}
                  </p>
                </div>
              )}

              {/* Bottom Scrubber Indicator */}
              <div className="z-10 space-y-2 pt-4 bg-gradient-to-t from-[#020335] to-transparent">
                <div className="flex items-center justify-between text-xs text-white/70 font-mono">
                  <span>{currentLesson.duration}</span>
                  <span className="text-[#ec4909] font-bold">1080p 60fps</span>
                </div>
              </div>

            </div>

            {/* Video Lesson Description */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
              <h4 className="text-base font-bold text-white">
                {currentLesson.title}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {currentLesson.desc}
              </p>
            </div>

          </div>

          {/* Lesson Playlist Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-2 border-b border-[#4a4d4f]/10 px-1">
              <span className="text-xs font-bold font-mono uppercase text-[#101b24]">
                Curriculum Playlist (8 Modules)
              </span>
              <span className="text-xs text-[#ec4909] font-semibold">1h 28m Total</span>
            </div>

            {LESSONS.map((les, idx) => {
              const isActive = activeLesson === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveLesson(idx)}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-[#101b24] text-white border-[#101b24] shadow-md'
                      : 'bg-[#f7f4f2] hover:bg-white text-[#101b24] border-black/[0.04]'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-[#ec4909] text-white' : 'bg-black/5 text-[#4a4d4f]'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-xs font-bold truncate block">{les.title}</strong>
                      <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-white/80' : 'text-[#4a4d4f]'}`}>
                        {les.duration}
                      </span>
                    </div>
                    <p className={`text-[11px] line-clamp-1 leading-snug ${isActive ? 'text-white/70' : 'text-[#4a4d4f]'}`}>
                      {les.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* 5 CONCEPT TRACKS TABS & MODULE CHECKLIST */}
      <div className="bg-[#f7f4f2] rounded-[32px] p-6 sm:p-8 border border-black/[0.06] mb-14">
        
        <div className="space-y-2 mb-6">
          <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909] border border-[#ec4909]/20">
            {TRACKS[activeTrack].meta}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#101b24] font-sans">
            {TRACKS[activeTrack].name}
          </h3>
          <p className="text-xs sm:text-sm text-[#4a4d4f] max-w-2xl leading-relaxed">
            {TRACKS[activeTrack].desc}
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#4a4d4f]/10 mb-6">
          {TRACKS.map((t, idx) => (
            <button
              key={t.key}
              onClick={() => setActiveTrack(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTrack === idx
                  ? 'bg-[#101b24] text-white shadow-sm'
                  : 'bg-white text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80 border border-[#4a4d4f]/10'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
          {TRACKS[activeTrack].modules.map((mod, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-xs flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#ec4909]/10 text-[#ec4909] font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs font-semibold text-[#101b24] leading-snug">
                {mod}
              </span>
            </div>
          ))}
        </div>

        {/* Track Action Trigger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#4a4d4f]/10">
          <div className="text-xs text-[#4a4d4f]">
            <strong className="text-[#101b24] block font-bold">When to ship this:</strong>
            <span>{TRACKS[activeTrack].ship}</span>
          </div>

          <button
            onClick={() => {
              setActiveBox(TRACKS[activeTrack].key);
              setActiveHarnessIndex(3);
            }}
            className="px-5 py-2.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>View {TRACKS[activeTrack].name} Format Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 8 PRODUCTION PRACTICES GRID */}
      <div className="space-y-6 mb-14">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#101b24] font-sans tracking-tight">
              8 Core Engineering Practices for Teams
            </h3>
            <p className="text-xs sm:text-sm text-[#4a4d4f] mt-1">
              Field-tested habits to make agent sessions deterministic, auditable, and resilient.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveBox('practices');
              setActiveHarnessIndex(3);
            }}
            className="px-4 py-2 rounded-full bg-[#f7f4f2] hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-bold border border-[#4a4d4f]/10 transition-all cursor-pointer self-start sm:self-auto"
          >
            Where to write rules
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRACTICES.map((p, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveBox(p.boxKey);
                setActiveHarnessIndex(3);
              }}
              className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#ec4909] block">
                  RULE 0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-[#101b24]">
                  {p.title}
                </h4>
                <p className="text-xs text-[#4a4d4f] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 text-[11px] text-[#ec4909] font-bold flex items-center gap-1">
                <span>Inspect Format</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 6-HARNESS FORMAT MODAL (Exact GencyAI Explorer Frame) */}
      {activeBox && activeFormatEntry && currentFormatPair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101b24]/70 backdrop-blur-sm">
          <div className="bg-white border border-black/10 rounded-[32px] max-w-4xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-fadeIn">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#4a4d4f]/10">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909]">
                  FORMAT SPECIFICATION
                </span>
                <h3 className="text-2xl font-black text-[#101b24] font-sans mt-2">
                  {activeFormatEntry.title}
                </h3>
                <p className="text-xs text-[#4a4d4f] leading-relaxed max-w-2xl">
                  {activeFormatEntry.note}
                </p>
              </div>

              <button
                onClick={() => setActiveBox(null)}
                className="p-2 rounded-full bg-[#f7f4f2] text-[#4a4d4f] hover:text-[#101b24] border border-[#4a4d4f]/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Harness Tabs */}
            <div className="flex flex-wrap items-center gap-2 my-5">
              {HARNESSES.map((h, idx) => (
                <button
                  key={h.key}
                  onClick={() => {
                    setActiveHarnessIndex(idx);
                    setCopied(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeHarnessIndex === idx
                      ? 'bg-[#101b24] text-white shadow-xs'
                      : 'bg-[#f7f4f2] text-[#4a4d4f] hover:text-[#101b24] hover:bg-white border border-[#4a4d4f]/10'
                  }`}
                >
                  {h.name}
                </button>
              ))}
            </div>

            {/* File Path Indicator */}
            <div className="p-3 rounded-xl bg-[#f7f4f2] border border-[#4a4d4f]/10 flex items-center justify-between gap-3 text-xs mb-4">
              <div className="flex items-center gap-2 overflow-x-auto font-mono text-[#101b24]">
                <FileCode className="w-4 h-4 text-[#ec4909] shrink-0" />
                <span className="font-semibold">{currentFormatPair[0]}</span>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1 rounded-lg bg-white hover:bg-[#101b24] hover:text-white text-[#101b24] border border-[#4a4d4f]/15 font-mono text-[11px] font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#15803d]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Block */}
            <pre className="p-4 rounded-2xl bg-[#101b24] text-[#f7f4f2] font-mono text-xs overflow-x-auto leading-relaxed max-h-[320px] border border-black/10">
              {currentFormatPair[1]}
            </pre>

            {/* Modal Bottom Actions */}
            <div className="pt-4 mt-6 border-t border-[#4a4d4f]/10 flex items-center justify-end">
              <button
                onClick={() => setActiveBox(null)}
                className="px-6 py-2.5 rounded-full bg-[#101b24] hover:bg-[#020335] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState } from 'react';
import {
  Play,
  Film,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Code2,
  Copy,
  Check,
  Cpu,
  Terminal,
  FileCode,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface CourseVideoTheaterViewProps {
  onBackToHome?: () => void;
}

interface VideoLessonItem {
  id: string;
  type: 'core' | 'deepdive' | 'module';
  num: string;
  title: string;
  category: string;
  duration: string;
  videoUrl: string;
  desc: string;
  topics: string[];
  takeaways: string[];
  codeSample?: string;
  guideUrl?: string;
}

export const CourseVideoTheaterView: React.FC<CourseVideoTheaterViewProps> = ({ onBackToHome }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'core' | 'deepdive' | 'module'>('all');
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [playerMode, setPlayerMode] = useState<'mp4' | 'html'>('mp4');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const VIDEO_LESSONS: VideoLessonItem[] = [
    {
      id: 'lesson-01',
      type: 'core',
      num: '01',
      title: 'Setup: Pick and Install a Harness',
      category: 'LESSON 01 · SETUP & HARNESS',
      duration: '6:40',
      videoUrl: '/videos/lesson-01-harness-setup/index.html',
      desc: 'Understand what an agent harness is, how the 5 layers of AI engineering map onto each harness, and how to configure Claude Code, Codex, Hermes, or Antigravity.',
      topics: [
        'The 5 Layers: Model, Instructions, Tools, Memory, Loop',
        'Comparing CLI (Claude Code), Terminal (Codex), and IDEs (Antigravity)',
        'Git as the ultimate undo button and rollback guard'
      ],
      takeaways: [
        'Install Claude Code globally via npm or homebrew',
        'Initialize your repo with git before letting agents edit',
        'Configure your API keys in environment variables, never in code'
      ],
      codeSample: `# 1. Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 2. Authenticate with Anthropic
claude auth login

# 3. Start directing your first project
cd my-project && claude`
    },
    {
      id: 'lesson-02',
      type: 'core',
      num: '02',
      title: 'Context Files That Remember For You',
      category: 'LESSON 02 · CONTEXT & MEMORY',
      duration: '9:12',
      videoUrl: '/videos/lesson-02-context-memory/index.html',
      desc: 'Lock project invariants into CLAUDE.md, AGENTS.md, and rules directories so your AI agent starts every session with full architectural memory.',
      topics: [
        'Anatomy of a production CLAUDE.md / AGENTS.md',
        'Folder hierarchies and scoping rules',
        'Definition of Done checklists and testing gates'
      ],
      takeaways: [
        'Place high-priority invariants at the top of CLAUDE.md',
        'Include exact terminal commands for build, test, and lint',
        'Prevent regressions by documenting disallowed libraries and patterns'
      ],
      codeSample: `# CLAUDE.md - Project Ground Truth
## Tech Stack
- Framework: Next.js 15 (App Router) + TypeScript
- Styling: Tailwind CSS + Lucide Icons
- Database: Supabase Postgres + RLS

## Commands
- Build: \`npm run build\`
- Lint: \`npm run lint\`
- Test: \`npm run test\`

## Non-Negotiable Invariants
1. All DB queries must use parameterized Supabase client with RLS.
2. No API secrets in client-side bundles.`
    },
    {
      id: 'lesson-03',
      type: 'core',
      num: '03',
      title: 'Prompts That Survive Production',
      category: 'LESSON 03 · PAL FRAMEWORK',
      duration: '11:05',
      videoUrl: '/videos/lesson-03-prompts-pal/index.html',
      desc: 'Master the 5 essential components of production prompts and the PAL Pipeline (Parse, Scan, Latent Intent, Expand, Compile).',
      topics: [
        '5 Prompt Elements: Role, Goal, Constraints, Examples, Output Format',
        'Eliminating ambiguity before code generation',
        'Iterative refinement vs restarting from scratch'
      ],
      takeaways: [
        'Always specify input schema and exact output formats (JSON/TypeScript)',
        'Provide 1-2 negative examples to prevent common failure modes',
        'Ask the agent to outline its plan before executing multi-file edits'
      ],
      codeSample: `// PAL Prompt Spec Compiler
const promptSpec = {
  role: "Senior Staff Next.js Architect",
  goal: "Implement Stripe Checkout session endpoint with webhook verification",
  constraints: [
    "Use stripe-node v14+",
    "Verify webhook signature via STRIPE_WEBHOOK_SECRET",
    "Return 400 on invalid signature, 200 on handled event"
  ],
  outputFormat: "Next.js App Router Route Handler (app/api/webhooks/stripe/route.ts)"
};`
    },
    {
      id: 'lesson-04',
      type: 'core',
      num: '04',
      title: 'Skills: Package Your Expertise',
      category: 'LESSON 04 · SKILL BUNDLES',
      duration: '12:30',
      videoUrl: '/videos/lesson-04-skills-packaging/index.html',
      desc: 'Package repeatable workflows into portable SKILL.md bundles with YAML frontmatter, progressive disclosure, and auto-trigger keywords.',
      topics: [
        'SKILL.md anatomy: name, description, triggers, workflow',
        'Progressive disclosure: keeping the prompt window lean',
        'Cross-harness portability (Claude, Codex, Antigravity)'
      ],
      takeaways: [
        'Package any task done more than 3 times into a dedicated skill',
        'Write concise trigger descriptions so the model self-activates the skill',
        'Keep scripts and reference schemas inside the skill folder'
      ],
      codeSample: `---
name: design-taste-frontend
description: Anti-slop frontend styling skill for high-converting landing pages.
triggers: ["landing page", "ui design", "tailwind", "responsive layout"]
---

# Design Taste Instructions
1. Use curated color palettes (Deep Navy #071B3A, Signal Blue #2F80ED).
2. Never use generic browser fonts. Use Sora, Plus Jakarta Sans, JetBrains Mono.
3. Every card must have subtle borders, hover states, and smooth glassmorphism.`
    },
    {
      id: 'lesson-05',
      type: 'core',
      num: '05',
      title: 'Connectors & Model Context Protocol',
      category: 'LESSON 05 · MCP SERVERS',
      duration: '10:18',
      videoUrl: '/videos/lesson-05-connectors-mcp/index.html',
      desc: 'Wire your agent directly into Supabase Postgres, Chrome DevTools, GitHub, and SaaS APIs using the Model Context Protocol standard.',
      topics: [
        'MCP Architecture: Hosts, Clients, and Servers',
        'Configuring .mcp.json and claude_desktop_config.json',
        'Least-privilege security and sandboxing'
      ],
      takeaways: [
        'MCP eliminates copy-pasting API responses into chat windows',
        'Use read-only MCP connectors for database schema inspection in dev',
        'Keep credential environment variables securely referenced'
      ],
      codeSample: `{
  "mcpServers": {
    "supabase-db": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "\${SUPABASE_PROJECT_URL}",
        "SUPABASE_KEY": "\${SUPABASE_SERVICE_ROLE_KEY}"
      }
    }
  }
}`
    },
    {
      id: 'lesson-06',
      type: 'core',
      num: '06',
      title: 'Commands, Prompts & Workflows',
      category: 'LESSON 06 · SLASH COMMANDS',
      duration: '13:44',
      videoUrl: '/videos/lesson-06-commands-workflows/index.html',
      desc: 'Create dynamic slash commands (/plan, /test, /review) and parameterized Markdown workflows stored in .claude/commands.',
      topics: [
        'Slash command frontmatter and dynamic arguments ($1, $ARG)',
        'Team-shared workflows in version control',
        'Automating pre-flight verification checklists'
      ],
      takeaways: [
        'Standardize PR reviews and migrations with team slash commands',
        'Chain multiple tools together into an automated one-shot workflow',
        'Store commands in .claude/commands/ for effortless team distribution'
      ],
      codeSample: `# .claude/commands/ship.md
---
description: Run linting, unit tests, and generate a changelog before commit.
---

1. Run \`npm run lint\` and fix any auto-fixable errors.
2. Run \`npm run test\` and report coverage.
3. Generate a conventional commit message based on staged git diff.`
    },
    {
      id: 'lesson-07',
      type: 'core',
      num: '07',
      title: 'Agents & Subagents: Plan, Build, Ship',
      category: 'LESSON 07 · MULTI-AGENT SWARMS',
      duration: '15:20',
      videoUrl: '/videos/lesson-07-agents-subagents/index.html',
      desc: 'Orchestrate parallel subagents in clean context windows to research, implement, and verify complex applications without context pollution.',
      topics: [
        'Orchestrator vs Specialist subagents',
        'Isolated context windows and token optimization',
        'Automated feedback loops and test verification'
      ],
      takeaways: [
        'Delegate research tasks to subagents so your main conversation stays lean',
        'Use a dedicated QA subagent to review code before human signoff',
        'Maintain single responsibility per subagent invocation'
      ],
      codeSample: `// Subagent Orchestration Call
const researcher = await spawnSubagent({
  name: "db-architect",
  task: "Inspect Supabase schema and draft RLS policies for organizations table",
  tools: ["supabase-mcp", "grep_search"]
});

console.log("Subagent result:", researcher.summary);`
    },
    {
      id: 'lesson-08',
      type: 'core',
      num: '08',
      title: 'Governance for Teams & Enterprise',
      category: 'LESSON 08 · GOVERNANCE & SECURITY',
      duration: '8:55',
      videoUrl: '/videos/lesson-08-team-governance/index.html',
      desc: 'Enterprise security boundaries, SOC2/GDPR compliance, shared skill libraries, and rolling out Claude Code across engineering teams.',
      topics: [
        'Rules for agents vs rules for human developers',
        'Data privacy, telemetry, and zero data retention settings',
        'Audit logs, spend controls, and team skill registries'
      ],
      takeaways: [
        'Enforce branch protection rules that require human PR review',
        'Audit MCP connector permissions quarterly',
        'Maintain a central internal skill repository for enterprise workflows'
      ],
      codeSample: `# Enterprise Governance Checklist
- [x] Zero customer PII in agent training sets
- [x] All MCP servers authenticated via short-lived tokens
- [x] Automated secret scanning on every git commit
- [x] Role-based access control (Viewer, Member, Admin, Owner)`
    },
    {
      id: 'deepdive-artifacts',
      type: 'deepdive',
      num: 'DD1',
      title: 'Deep Dive: Mastering Claude Artifacts',
      category: 'DEEP DIVE · ARTIFACTS',
      duration: '10:45',
      videoUrl: '/videos/deepdive-claude-artifacts/index.html',
      desc: 'Build live React components, SVG diagrams, interactive calculators, and full micro-applications rendered directly in the Claude sidebar.',
      topics: [
        'Artifact types: React, HTML, SVG, Markdown, Mermaid',
        'Iterative live updates and component state management',
        'Exporting artifacts to production Next.js apps'
      ],
      takeaways: [
        'Use artifacts for visual prototypes and standalone calculators',
        'Iterate on visual UI without reloading the main conversation',
        'Copy JSX directly into your production design system'
      ],
      guideUrl: '/gency-ai-claude-mastery/project/uploads/Atlas_Artifacts_Training.html'
    },
    {
      id: 'deepdive-cowork',
      type: 'deepdive',
      num: 'DD2',
      title: 'Deep Dive: Claude Projects & Cowork',
      category: 'DEEP DIVE · PROJECTS & COWORK',
      duration: '12:15',
      videoUrl: '/videos/deepdive-claude-projects-cowork/index.html',
      desc: 'Maximize Claude Projects with 200k token persistent knowledge bases, custom instructions, and autonomous terminal execution loops.',
      topics: [
        'Structuring 200k token project knowledge bases',
        'Custom project instructions and persona alignment',
        'Autonomous execution loops and error recovery'
      ],
      takeaways: [
        'Upload your complete documentation stack to Project Knowledge',
        'Keep project instructions concise to preserve context capacity',
        'Use separate projects for frontend, backend, and marketing copy'
      ],
      guideUrl: '/gency-ai-claude-mastery/project/uploads/Atlas_Projects_Cowork_Training.html'
    },
    {
      id: 'deepdive-skills',
      type: 'deepdive',
      num: 'DD3',
      title: 'Deep Dive: Master Skills Catalog',
      category: 'DEEP DIVE · SKILLS CATALOG',
      duration: '14:20',
      videoUrl: '/videos/deepdive-skills-catalog/index.html',
      desc: 'Explore 60+ production skills across 5 core domains: Fullstack Web, GTM & Sales, Media & Video, Science & Data, and Enterprise Governance.',
      topics: [
        'The 5 Core Domains of the Master Skill Catalog',
        'Automated semantic trigger matching',
        'One-line markdown injection for instant skill activation'
      ],
      takeaways: [
        'Browse curated skills for Stripe, Supabase, Tailwind, and n8n',
        'Activate specialized capabilities without manual prompt crafting',
        'Combine skills into comprehensive autonomous pipelines'
      ],
      guideUrl: '/gency-ai-claude-mastery/project/uploads/Atlas_Skills_Training.html'
    },
    {
      id: 'deepdive-coe',
      type: 'deepdive',
      num: 'DD4',
      title: 'Deep Dive: Claude Center of Excellence',
      category: 'DEEP DIVE · ENTERPRISE COE',
      duration: '11:30',
      videoUrl: '/videos/deepdive-enterprise-coe/index.html',
      desc: 'A complete playbook for establishing an enterprise Claude Center of Excellence with tiered certification tracks and compliance policies.',
      topics: [
        'Setting up an internal AI Center of Excellence',
        '3-Tier training curriculum (Associate, Practitioner, Architect)',
        'Enterprise risk mitigation and SOC2/GDPR compliance'
      ],
      takeaways: [
        'Standardize AI onboarding across engineering and product teams',
        'Measure ROI through velocity metrics and reduced cycle times',
        'Deploy pre-approved skill packs for all company repositories'
      ],
      guideUrl: '/gency-ai-claude-mastery/project/uploads/Claude-Center-of-Excellence.html'
    },
    {
      id: 'deepdive-suite',
      type: 'deepdive',
      num: 'DD5',
      title: 'Deep Dive: Atlas Brand AI Skill Suite',
      category: 'DEEP DIVE · SKILL SUITE',
      duration: '16:00',
      videoUrl: '/videos/deepdive-skill-suite-launch/index.html',
      desc: 'Architecting end-to-end commercial AI systems: Monarch Video, Prospect Automation Engine, Master Music Catalogue, and Site Empire OS.',
      topics: [
        'Monarch Video deterministic render pipeline',
        'Prospect Automation Engine: n8n + CRM + AI copy',
        'Master Music Catalogue dual rights management',
        'Site Empire OS: 25-artifact production standard'
      ],
      takeaways: [
        'Build multi-agent workflows that generate real business revenue',
        'Combine headless browsers, APIs, and LLMs into automated engines',
        'Deploy deterministic video rendering with zero hallucination'
      ],
      guideUrl: '/gency-ai-claude-mastery/project/uploads/atlas-brand-skill-suite-launch.html'
    },
    {
      id: 'module-1',
      type: 'module',
      num: 'M01',
      title: 'Module 1: Vibe Coding Principles',
      category: 'MODULE 01 · FOUNDATIONS',
      duration: '8:30',
      videoUrl: '/videos/module-1-principles/index.html',
      desc: 'From idea to software in plain language. Direction beats guessing, web app architecture layers, and the 5-step vibe coding method.',
      topics: [
        'The Film Director vs Camera Operator mindset shift',
        'Principle 1: Direction beats Guessing (eliminating hallucinations)',
        'Principle 2: Every app has an architecture',
        'The 5-step method: Describe, Document, Architect, Build, Ship'
      ],
      takeaways: [
        'Direct your AI agent with specific tools and architectural constraints',
        'Plan the foundation before asking for UI rooms',
        'Build iteratively with structured checklists'
      ]
    },
    {
      id: 'module-7-8',
      type: 'module',
      num: 'M07',
      title: 'Module 7 & 8: Agents & Document Stack',
      category: 'MODULES 07-08 · AGENTS & DOCS',
      duration: '9:40',
      videoUrl: '/videos/module-7-8-agents-docs/index.html',
      desc: 'Agent folder anatomy, Model Context Protocol standard, and the 7-document production stack for zero-hallucination development.',
      topics: [
        'Formula: Agent = Model + Instructions + Tools + Memory + Loop',
        'Folder structure: /instructions, /agents, /skills, /tools, /memory',
        'Model Context Protocol as USB-C for AI',
        'The 7-Document production grounding stack'
      ],
      takeaways: [
        'Structure agent definitions in dedicated folders',
        'Use MCP connectors to safely interface with live infrastructure',
        'Seed agents with PRDs and Intent Specs before writing code'
      ]
    }
  ];

  const filteredVideos = VIDEO_LESSONS.filter(
    (v) => activeFilter === 'all' || v.type === activeFilter
  );

  const activeVideo = VIDEO_LESSONS[activeVideoIndex];
  const videoFolder = activeVideo.videoUrl.split('/')[2];
  const currentMp4Url = `/videos/${videoFolder}/${videoFolder}.mp4`;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left font-sans min-h-screen">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2F80ED]/15 border border-[#2F80ED]/30 text-[#20C7D9] text-xs font-semibold">
            <Film className="w-3.5 h-3.5 text-[#34D399]" />
            <span>LetsVibeAI Video Theater & Course Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            15 Compositions · Full Claude Code Curriculum
          </span>
          <a
            href="/gency-ai-claude-mastery/project/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-[#20C7D9] hover:underline"
          >
            <span>Open Standalone Hub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Theater Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Playlist Selector (4 cols) */}
        <div className="lg:col-span-4 bg-[#071B3A]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Film className="w-4 h-4 text-[#20C7D9]" />
              <span>Course Playlist</span>
            </h3>
            <span className="text-xs font-mono text-[#20C7D9] bg-[#20C7D9]/10 px-2 py-0.5 rounded-md border border-[#20C7D9]/20">
              {filteredVideos.length} Videos
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 mb-4 p-1 bg-black/30 rounded-xl">
            {(['all', 'core', 'deepdive', 'module'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-lg transition-all capitalize ${
                  activeFilter === filter
                    ? 'bg-[#2F80ED] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter === 'core' ? '8 Lessons' : filter === 'deepdive' ? 'Deep Dives' : filter}
              </button>
            ))}
          </div>

          {/* Video Items List */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredVideos.map((video) => {
              const globalIdx = VIDEO_LESSONS.findIndex((v) => v.id === video.id);
              const isSelected = activeVideoIndex === globalIdx;

              return (
                <div
                  key={video.id}
                  onClick={() => setActiveVideoIndex(globalIdx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#2F80ED]/20 border-[#20C7D9] shadow-md shadow-[#2F80ED]/10'
                      : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-[#20C7D9] text-[#030A17]'
                        : 'bg-black/40 text-[#20C7D9] border border-white/5'
                    }`}
                  >
                    {video.num}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-white truncate">{video.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                      <span>{video.duration}</span>
                      <span>•</span>
                      <span className="text-[#34D399] uppercase text-[10px]">
                        {video.type === 'core'
                          ? 'Core Lesson'
                          : video.type === 'deepdive'
                          ? 'Deep Dive'
                          : 'Module'}
                      </span>
                    </div>
                  </div>

                  {isSelected && <ChevronRight className="w-4 h-4 text-[#20C7D9] shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Video Player & Rich Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dual-Mode Player Stage */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 bg-[#071B3A] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setPlayerMode('mp4')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerMode === 'mp4'
                      ? 'bg-[#2F80ED] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Rendered 1080p MP4</span>
                </button>
                <button
                  onClick={() => setPlayerMode('html')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerMode === 'html'
                      ? 'bg-[#2F80ED] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#20C7D9]" />
                  <span>Interactive HTML Studio</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>1080p MP4 Ready</span>
                </span>
              </div>
            </div>

            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-[#2F80ED]/30 shadow-2xl shadow-black/80">
              {playerMode === 'mp4' ? (
                <video
                  key={currentMp4Url}
                  src={currentMp4Url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <iframe
                  key={activeVideo.videoUrl}
                  src={activeVideo.videoUrl}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  title={activeVideo.title}
                />
              )}
            </div>
          </div>

          {/* Video Metadata & Controls Card */}
          <div className="bg-[#071B3A]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <span className="text-xs font-mono font-bold text-[#34D399] tracking-wider uppercase">
                  {activeVideo.category}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">{activeVideo.title}</h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{activeVideo.desc}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <a
                  href={currentMp4Url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-[#2F80ED] to-[#20C7D9] text-[#030A17] text-xs font-mono font-bold transition-all flex items-center gap-2 hover:opacity-95 shadow-md"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </a>

                <a
                  href={activeVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold border border-white/10 transition-all flex items-center gap-2"
                >
                  <span>Studio Mode</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#20C7D9]" />
                </a>

                {activeVideo.guideUrl && (
                  <a
                    href={activeVideo.guideUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold border border-white/10 transition-all flex items-center gap-2"
                  >
                    <span>Guide Doc</span>
                    <BookOpen className="w-3.5 h-3.5 text-[#34D399]" />
                  </a>
                )}
              </div>
            </div>

            {/* Key Topics & Takeaways */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#20C7D9] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Key Concepts Covered</span>
                </h4>
                <ul className="space-y-2">
                  {activeVideo.topics.map((topic, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-[#20C7D9] mt-0.5">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Actionable Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {activeVideo.takeaways.map((takeaway, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-[#34D399] mt-0.5">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code Snippet Box (if available) */}
            {activeVideo.codeSample && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#20C7D9]" />
                    <span>Reference Snippet & Commands</span>
                  </span>
                  <button
                    onClick={() => handleCopyCode(activeVideo.codeSample!)}
                    className="text-xs font-mono text-[#20C7D9] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 text-[#34D399]" />
                        <span className="text-[#34D399]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 bg-black/60 border border-white/10 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{activeVideo.codeSample}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

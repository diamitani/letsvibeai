import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  Sparkles,
  Terminal,
  Code2,
  Clock,
  Layers,
  FileCode,
  ArrowRight,
  Activity,
  Cpu,
  ShieldCheck,
  Zap,
  Film,
  Video,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const OverviewVideoShowcase: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [progress, setProgress] = useState<number>(18);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'animated' | 'stream' | 'code'>('animated');

  const SCENES = [
    {
      id: 0,
      timestamp: '00:00',
      duration: '0:35',
      title: 'Scene 01: Intake & Intent Specification',
      headline: 'Compile Intent via PAL Pipeline',
      narration: 'Parse raw briefs, scan for architectural ambiguities, and compile executable intent specifications without hand-coded boilerplate.',
      phase: 'PARSE → SCAN → EXPAND',
      telemetry: { tokens: '1,420 t/s', agents: '1 Orchestrator', memory: '12 MB', gate: 'PASS' },
      codeSnippet: `// 1. PAL Intent Specification
import { parseIntent } from '@letsvibeai/pal';

const intentSpec = await parseIntent({
  domain: "ai-agent-harness",
  architecture: "multi_tenant_rls",
  tenancy: "workspace_isolated",
  database: "postgres_supabase",
  monetization: "stripe_metered"
});`
    },
    {
      id: 1,
      timestamp: '00:35',
      duration: '0:30',
      title: 'Scene 02: Context Architecture & Project Rules',
      headline: 'Write Rules Once, Remember Everywhere',
      narration: 'Lock brand tokens, stack rules, and workspace invariants into AGENTS.md and CLAUDE.md so every session starts informed.',
      phase: 'CONTEXT · RULES · MEMORY',
      telemetry: { tokens: '2,840 t/s', agents: '2 Reviewers', memory: '24 MB', gate: 'PASS' },
      codeSnippet: `# AGENTS.md - Canonical Rules Standard
## Architectural Invariants
1. Strict Postgres Row-Level Security on all tables.
2. Webhooks are the single source of truth for billing.
3. Zero API keys in client-side bundles.
4. WCAG 2.2 AA accessibility and responsive layout.`
    },
    {
      id: 2,
      timestamp: '01:05',
      duration: '0:35',
      title: 'Scene 03: Dynamic Skills & MCP Connector Mesh',
      headline: 'Progressive Disclosure of Live Tools',
      narration: 'Package repeatable workflows into portable SKILL.md bundles and wire live Model Context Protocol servers with least-privilege security.',
      phase: 'SKILLS · MCP · TOOL MESH',
      telemetry: { tokens: '4,100 t/s', agents: '3 Specialists', memory: '48 MB', gate: 'PASS' },
      codeSnippet: `// SKILL.md Tool Schema & MCP Adapter
{
  "mcpServers": {
    "supabase_vault": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": { "SUPABASE_KEY": "\${SUPABASE_SERVICE_ROLE}" }
    }
  }
}`
    },
    {
      id: 3,
      timestamp: '01:40',
      duration: '0:25',
      title: 'Scene 04: Autonomous Subagent Orchestration',
      headline: 'Parallel Delegation in Clean Contexts',
      narration: 'Spawn isolated subagent workers for research, implementation, and automated test verification while keeping the main conversation pristine.',
      phase: 'SUBAGENTS · PARALLEL RUN',
      telemetry: { tokens: '6,280 t/s', agents: '4 Active Workers', memory: '64 MB', gate: 'PASS' },
      codeSnippet: `// Spawn Parallel Specialist Subagents
const [dbReview, uiAudit, securityScan] = await Promise.all([
  agent.spawnSubagent({ role: "postgres-dba", task: "audit-rls" }),
  agent.spawnSubagent({ role: "frontend-qa", task: "wcag-audit" }),
  agent.spawnSubagent({ role: "sec-auditor", task: "secrets-scan" })
]);`
    },
    {
      id: 4,
      timestamp: '02:05',
      duration: '0:25',
      title: 'Scene 05: Verified Production Deploy & Monetization',
      headline: 'Zero-Downtime Vercel Deploy & Webhooks',
      narration: 'Verify contract tests, trigger preview deployments, synchronize Stripe customer entitlements, and ship commercial AI software.',
      phase: 'VERIFY → DEPLOY → SCALE',
      telemetry: { tokens: '8,400 t/s', agents: 'Production Live', memory: '96 MB', gate: '100% VERIFIED' },
      codeSnippet: `// Production Entitlement Webhook
export async function POST(req: Request) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  if (event.type === "checkout.session.completed") {
    await unlockTenantWorkspace(event.data.object.customer);
  }
}`
    }
  ];

  // Auto-step timeline when playing
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveScene((s) => (s + 1) % SCENES.length);
            return 0;
          }
          return prev + (2 * playbackSpeed);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const cur = SCENES[activeScene];

  return (
    <section id="overview-video" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Film className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>Interactive Overview & Video System</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            How the Platform Works:{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Live Animated Blueprint.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            Experience the complete 5-scene architectural walkthrough of the Agent Harness OS, or switch to the full Masterclass video theater.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#4a4d4f]/10 shadow-xs">
          <button
            onClick={() => setViewMode('animated')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'animated'
                ? 'bg-[#101b24] text-white shadow-xs'
                : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-[#f7f4f2]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#ec4909]" />
            <span>Animated Walkthrough</span>
          </button>

          <button
            onClick={() => setViewMode('stream')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'stream'
                ? 'bg-[#101b24] text-white shadow-xs'
                : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-[#f7f4f2]'
            }`}
          >
            <Video className="w-3 h-3 text-[#ec4909]" />
            <span>Live Stream Video</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cinema / Animation Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-[#101b24] rounded-[32px] p-6 sm:p-7 text-white border border-black/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Main Visual Display Canvas */}
          <div className="aspect-16/10 bg-[#020335] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between p-5">
            
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#ec4909] text-white">
                  SCENE 0{cur.id + 1}
                </span>
                <span className="text-[11px] font-mono font-bold text-white/90">
                  {cur.phase}
                </span>
              </div>

              {/* Pulsing Audio Frequency Bars */}
              <div className="flex items-center gap-1">
                {[40, 75, 55, 90, 60, 80, 45, 70, 85].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#ec4909] rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${h * (0.4 + (i % 3) * 0.2)}%` : '4px',
                      opacity: isPlaying ? 0.9 : 0.3
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Mode Content Rendering */}
            {viewMode === 'stream' ? (
              <div className="absolute inset-0 z-0">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/gv0WHhKelSE?rel=0&modestbranding=1"
                  title="Live Coding Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="my-auto text-center space-y-3 z-10 px-4">
                
                {/* Center Play Pulse */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-95 text-white flex items-center justify-center mx-auto shadow-xl shadow-[#ec4909]/40 transition-all cursor-pointer group"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-1" />
                  )}
                </button>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {cur.headline}
                  </h3>
                  <p className="text-xs text-white/80 max-w-md mx-auto leading-relaxed">
                    {cur.narration}
                  </p>
                </div>

                {/* Telemetry HUD */}
                <div className="pt-2 flex items-center justify-center gap-2 sm:gap-3 text-[10px] font-mono flex-wrap">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white/90 border border-white/10">
                    Velocity: <strong className="text-[#ec4909]">{cur.telemetry.tokens}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white/90 border border-white/10">
                    Agents: <strong className="text-white">{cur.telemetry.agents}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 text-white/90 border border-white/10">
                    Gate: <strong className="text-[#15803d]">{cur.telemetry.gate}</strong>
                  </span>
                </div>

              </div>
            )}

            {/* Bottom Playback Scrubber & Time Controls */}
            <div className="z-10 space-y-2 pt-3 bg-gradient-to-t from-[#020335] via-[#020335]/80 to-transparent">
              
              {/* Progress Scrubber */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  setProgress(pct);
                }}
                className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer group"
              >
                <div
                  className="h-full bg-[#ec4909] transition-all duration-200 group-hover:brightness-125"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Scrubber Meta Bar */}
              <div className="flex items-center justify-between text-xs text-white/70 font-mono">
                <div className="flex items-center gap-3">
                  <span>{cur.timestamp} / 02:30</span>
                  
                  {/* Speed Selector */}
                  <button
                    onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold cursor-pointer"
                  >
                    {playbackSpeed}x SPEED
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition-colors cursor-pointer">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[#ec4909] font-bold text-[11px]">HYPERFRAMES 4K</span>
                </div>
              </div>

            </div>

          </div>

          {/* Scene Switcher Timeline Ribbon */}
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-5 gap-2">
            {SCENES.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScene(i);
                  setProgress(0);
                }}
                className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                  activeScene === i
                    ? 'bg-white/15 border-[#ec4909] text-white shadow-xs'
                    : 'bg-white/5 border-transparent text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={`text-[9px] font-mono font-bold block ${activeScene === i ? 'text-[#ec4909]' : 'text-white/50'}`}>
                  0{i + 1} · {sc.duration}
                </span>
                <strong className="text-[11px] font-bold truncate block mt-0.5">
                  {sc.title.split(':')[1] || sc.title}
                </strong>
              </button>
            ))}
          </div>

        </div>

        {/* Right: Live Interactive Code & Architecture Companion (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-[32px] bg-white border border-black/[0.06] shadow-xs space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#4a4d4f]/10">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#ec4909]" />
              <h4 className="text-sm font-bold text-[#101b24]">
                Synchronized Code Companion
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#ec4909]/10 text-[#ec4909]">
              LIVE INGEST
            </span>
          </div>

          {/* Current Scene Summary */}
          <div className="p-3.5 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#ec4909] uppercase">
              {cur.title}
            </span>
            <p className="text-xs text-[#101b24] font-medium leading-snug">
              {cur.narration}
            </p>
          </div>

          {/* Live Code Block */}
          <pre className="p-4 rounded-2xl bg-[#101b24] font-mono text-xs text-[#f7f4f2] overflow-x-auto leading-relaxed max-h-[260px] border border-black/10">
            {cur.codeSnippet}
          </pre>

          {/* Key Deliverables Checklist */}
          <div className="pt-3 border-t border-[#4a4d4f]/10 space-y-2 text-xs text-[#4a4d4f]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              <span>Full source code verified for Next.js 15 and React 19</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              <span>Native support for Claude Code, Codex, Antigravity, and Cursor</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(35);

  const chapters = [
    {
      id: 0,
      timestamp: '00:00',
      title: 'Vibe Coding & Intent Spec Compilation',
      summary: 'Prompting mental models, context boundary scoping, and instruction pack structure.',
      codeSnippet: `// 1. Define high-fidelity intent spec\nconst intent = {\n  domain: "letsvibeai.com",\n  tenancy: "workspace_isolated",\n  database: "postgres_rls",\n  aiHarness: "vercel_ai_sdk_4"\n};`
    },
    {
      id: 1,
      timestamp: '04:20',
      title: 'Autonomous Agent Harnesses & Tool Wrappers',
      summary: 'Configuring Antigravity Agent Harness, Model Context Protocol servers, and rate limits.',
      codeSnippet: `// 2. Initialize MCP server connector\nimport { createAgentHarness } from '@letsvibeai/harness';\nconst harness = createAgentHarness({\n  tools: ['stripe_billing', 'supabase_vault'],\n  budgetLimit: 5000\n});`
    },
    {
      id: 2,
      timestamp: '11:45',
      title: 'Supabase RLS & Tenant Auth Vault',
      summary: 'Writing bulletproof row-level policies so workspace data and agent runs never leak.',
      codeSnippet: `// 3. Row-Level Security isolation policy\nCREATE POLICY "tenant_guard" ON workspaces\nFOR ALL USING (auth.uid() = owner_id);\n\nCREATE POLICY "agent_runs_guard" ON agent_runs\nFOR ALL USING (auth.uid() = user_id);`
    },
    {
      id: 3,
      timestamp: '18:30',
      title: 'Stripe Webhooks & Metered Scale',
      summary: 'Handling idempotent webhooks, tax calculations, and automated dunning workflows.',
      codeSnippet: `// 4. Idempotent webhook handler\nexport async function handleStripeWebhook(event) {\n  if (event.type === 'checkout.session.completed') {\n    await activateEntitlement(event.data.object.client_reference_id);\n  }\n}`
    }
  ];

  const currentChapter = chapters[activeChapter];

  return (
    <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>Masterclass Theater</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            Live Coding & Agent{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Demonstrations.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            Watch complete SaaS platforms and autonomous agent harnesses built in real time with verified production infrastructure.
          </p>
        </div>

        {/* Chapter Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-white p-1.5 rounded-full border border-[#4a4d4f]/10 shadow-xs">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChapter(ch.id);
                setProgress(ch.id * 25 + 15);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeChapter === ch.id
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-[#f7f4f2]'
              }`}
            >
              {ch.timestamp} · {ch.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Cinema Player & Code Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cinema Screen (7 cols) */}
        <div className="lg:col-span-7 bg-[#101b24] rounded-[28px] p-6 text-white border border-black/10 shadow-2xl relative overflow-hidden">
          
          {/* Simulated Screen Area */}
          <div className="aspect-video bg-[#020335] rounded-2xl border border-white/10 relative flex flex-col justify-between p-5 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/10 text-white font-bold backdrop-blur-md">
                CHAPTER 0{activeChapter + 1}
              </span>
              <span className="text-xs font-mono text-[#ec4909] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#ec4909] animate-pulse" />
                4K HD COHORT STREAM
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="text-center my-auto space-y-2">
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
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {currentChapter.title}
              </h4>
            </div>

            {/* Bottom Scrubber & Controls */}
            <div className="space-y-2">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-[#ec4909] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{currentChapter.timestamp} / 28:40</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition-colors cursor-pointer">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <Maximize className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/70 mt-4 leading-relaxed">
            {currentChapter.summary}
          </p>
        </div>

        {/* Right: Synchronized Code Stream (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-[28px] bg-white border border-black/[0.06] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#4a4d4f]/10">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#ec4909]" />
              <h4 className="text-sm font-bold text-[#101b24]">
                Synchronized Code Stream
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#ec4909]/10 text-[#ec4909]">
              LIVE
            </span>
          </div>

          <pre className="p-4 rounded-xl bg-[#f7f4f2] border border-[#4a4d4f]/10 font-mono text-xs text-[#101b24] overflow-x-auto leading-relaxed max-h-[220px]">
            {currentChapter.codeSnippet}
          </pre>

          {/* Key Takeaways */}
          <div className="pt-3 border-t border-[#4a4d4f]/10 space-y-2 text-xs text-[#4a4d4f]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              <span>Full copy-pasteable TypeScript & React 19 template</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              <span>Tested with Antigravity IDE and Claude Code runtimes</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

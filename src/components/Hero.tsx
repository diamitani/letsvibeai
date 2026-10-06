import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Terminal,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Code2,
  Layers,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onStartCourse: () => void;
  onWatchVideo: () => void;
  onExploreArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCourse,
  onWatchVideo,
  onExploreArchitecture
}) => {
  const [activeTab, setActiveTab] = useState<'npao' | 'harness' | 'vault'>('npao');
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const handleCopy = () => {
    const textToCopy =
      activeTab === 'npao'
        ? `// LetsVibeAI NPAO Production Contract\nconst spec = await compileNPAO({\n  intent: "Build multi-tenant creator platform with Stripe Connect",\n  harness: "Antigravity IDE",\n  auth: "Supabase RLS",\n  sla: "99.9% availability"\n});`
        : `// Agent Harness Runtime\nimport { createAgentHarness } from '@letsvibeai/harness';\nexport const agent = createAgentHarness({\n  tools: ['stripe_billing', 'supabase_rls', 'git_ops'],\n  creditsBudget: 2000\n});`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput('✓ NPAO compiled in 240ms · 4 architecture artifacts verified · RLS vault generated');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }, 700);
  };

  return (
    <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>The Premier Academy for Vibe Coding & Autonomous Agents</span>
          </div>

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#281010] font-heading leading-[1.08]">
            Vibe Code at <span className="text-[#FA5929] italic font-serif">Production Scale.</span>
          </h1>

          {/* Subtext (concise, under 20 words, no em-dashes) */}
          <p className="text-base sm:text-lg text-[#706B67] leading-relaxed max-w-xl">
            Build, test, and ship complete full-stack SaaS platforms with AI agent harnesses, Supabase RLS, and Stripe commerce.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartCourse}
              className="px-7 py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] active:scale-95 text-white font-extrabold text-sm transition-all shadow-lg shadow-[#FA5929]/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Start V1 Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWatchVideo}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F8F3EC] border border-[#EAE3D9] text-[#281010] font-bold text-sm transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#FA5929] fill-[#FA5929]" />
              <span>Watch Cinema Demo</span>
            </button>
          </div>

          {/* Trust Social Proof Strip (under hero, clean logos and numbers) */}
          <div className="pt-6 border-t border-[#EAE3D9] flex flex-wrap items-center gap-6 text-xs text-[#706B67]">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#FA5929] animate-ping" />
              <strong className="text-[#281010] font-mono">4,820+</strong> builders actively enrolled
            </div>
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[#706B67]">
              <span>Stack:</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-[#EAE3D9] text-[#281010] font-bold">React 19</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-[#EAE3D9] text-[#281010] font-bold">Supabase</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-[#EAE3D9] text-[#281010] font-bold">Stripe</span>
            </div>
          </div>

        </div>

        {/* Right Column: Live Interactive Vibe Coding Simulator (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#281010] rounded-3xl p-5 sm:p-6 text-white shadow-2xl border border-[#FA5929]/20 relative overflow-hidden">
            
            {/* Window Header & Tabs */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FA5929]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBF03]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                <span className="text-[11px] font-mono text-[#D8D1C7] ml-2">letsvibeai.live.ts</span>
              </div>

              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full text-[10px] font-mono font-bold">
                <button
                  onClick={() => setActiveTab('npao')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    activeTab === 'npao' ? 'bg-[#FA5929] text-white' : 'text-[#D8D1C7] hover:text-white'
                  }`}
                >
                  NPAO
                </button>
                <button
                  onClick={() => setActiveTab('harness')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    activeTab === 'harness' ? 'bg-[#FA5929] text-white' : 'text-[#D8D1C7] hover:text-white'
                  }`}
                >
                  Harness
                </button>
                <button
                  onClick={() => setActiveTab('vault')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    activeTab === 'vault' ? 'bg-[#FA5929] text-white' : 'text-[#D8D1C7] hover:text-white'
                  }`}
                >
                  RLS Vault
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="font-mono text-xs text-[#EAE3D9] bg-[#160E0E] p-4 rounded-2xl border border-white/5 space-y-2 overflow-x-auto min-h-[160px] leading-relaxed">
              {activeTab === 'npao' && (
                <div>
                  <p className="text-[#A89F91]">// 1. Parse intent and compile production blueprint</p>
                  <p className="text-[#FA5929]">const <span className="text-white">vibeSpec</span> = await <span className="text-[#FEBF03]">compileNPAO</span>&#40;&#123;</p>
                  <p className="pl-4 text-white">intent: <span className="text-[#34D399]">"Creator Platform with AI Agent"</span>,</p>
                  <p className="pl-4 text-white">tenancy: <span className="text-[#34D399]">"workspace_isolated"</span>,</p>
                  <p className="pl-4 text-white">payments: <span className="text-[#34D399]">"stripe_checkout_metered"</span>,</p>
                  <p className="pl-4 text-white">scaleReady: <span className="text-[#FA5929]">true</span></p>
                  <p className="text-[#FA5929]">&#125;&#41;;</p>
                </div>
              )}

              {activeTab === 'harness' && (
                <div>
                  <p className="text-[#A89F91]">// 2. Initialize autonomous agent execution harness</p>
                  <p className="text-[#FA5929]">export const <span className="text-white">agent</span> = <span className="text-[#FEBF03]">createAgentHarness</span>&#40;&#123;</p>
                  <p className="pl-4 text-white">role: <span className="text-[#34D399]">"General Manager Agent"</span>,</p>
                  <p className="pl-4 text-white">tools: <span className="text-[#34D399]">[32 modular skills]</span>,</p>
                  <p className="pl-4 text-white">auth: <span className="text-[#34D399]">"Supabase RLS Vault"</span></p>
                  <p className="text-[#FA5929]">&#125;&#41;;</p>
                </div>
              )}

              {activeTab === 'vault' && (
                <div>
                  <p className="text-[#A89F91]">// 3. Postgres Row-Level Security policy</p>
                  <p className="text-[#FA5929]">CREATE POLICY <span className="text-[#34D399]">"tenant_isolation"</span></p>
                  <p className="text-white">ON <span className="text-[#FEBF03]">app_workspaces</span></p>
                  <p className="text-white">FOR ALL USING &#40;auth.uid&#40;&#41; = owner_id&#41;;</p>
                </div>
              )}
            </div>

            {/* Execution Result Banner */}
            {executionOutput && (
              <div className="mt-3 p-3 rounded-xl bg-[#1F1212] border border-[#FA5929]/40 text-[11px] font-mono text-[#FA5929] animate-in fade-in flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{executionOutput}</span>
              </div>
            )}

            {/* Simulator Action Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D8D1C7] text-[11px] font-mono transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Spec'}</span>
              </button>

              <button
                onClick={handleRunSimulation}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] active:scale-95 text-white font-bold text-[11px] transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{isExecuting ? 'Compiling...' : 'Run Simulation'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

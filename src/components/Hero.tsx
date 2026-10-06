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
  Star,
  Video,
  Flame,
  Award
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
        ? `// LiveBuild AI: NPAO Production Contract\nconst spec = await compileNPAO({\n  intent: "Build multi-tenant autonomous AI agent with Stripe & Supabase",\n  harness: "Antigravity IDE",\n  auth: "Supabase RLS",\n  sla: "99.9% availability"\n});`
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
      setExecutionOutput('✓ NPAO blueprint compiled in 220ms: 4 agent tools verified · RLS vault generated');
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
    }, 650);
  };

  return (
    <section className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Stack: Eyebrow, Display H1, Subtitle, and Primary CTAs */}
      <div className="max-w-4xl mx-auto text-center space-y-5">
        
        {/* OpenClass Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
          <span>The AI Skills Institution for Work & Life</span>
        </div>

        {/* Display H1 - OpenClass typography style */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#101b24] leading-[1.08] font-sans">
          Unlock Your Full Potential with{' '}
          <span className="font-serif italic font-normal text-[#ec4909]">
            Live AI & Agent Building.
          </span>
        </h1>

        {/* Subtitle - Max 20 words per taste-skill guardrail */}
        <p className="text-base sm:text-lg text-[#4a4d4f] leading-relaxed max-w-2xl mx-auto">
          Thousands are transforming their careers with guided AI coaching, agent architectures, and hands-on capstone builds: start fresh or scale faster.
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Primary Orange Pill with White Circle Arrow */}
          <button
            onClick={onStartCourse}
            className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-98 text-white font-semibold text-sm transition-all shadow-lg shadow-[#ec4909]/25 flex items-center gap-2.5 cursor-pointer group"
          >
            <span>Browse Courses</span>
            <div className="w-6 h-6 rounded-full bg-white text-[#ec4909] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Secondary White Pill Button */}
          <button
            onClick={onWatchVideo}
            className="px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-[#f7f4f2] border border-[#4a4d4f]/15 text-[#101b24] font-semibold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#ec4909] fill-[#ec4909]" />
            <span>Watch Cinema Demo</span>
          </button>
        </div>

      </div>

      {/* Hero Bottom Visual Frame (OpenClass Bottom Wrapper Frame with Overlaid Floating Badges) */}
      <div className="mt-12 sm:mt-14 relative max-w-6xl mx-auto">
        
        {/* Main Hero Visual Card Container */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] p-4 sm:p-7 border border-black/[0.06] shadow-[0_20px_50px_-15px_rgba(16,27,36,0.08)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Video Showcase Preview / Cohort Card */}
            <div className="lg:col-span-6 relative rounded-[20px] overflow-hidden bg-[#101b24] min-h-[300px] sm:min-h-[360px] flex flex-col justify-between p-6 text-white group">
              
              {/* Background Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#101b24] via-[#101b24]/90 to-[#ec4909]/20 opacity-80" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ec4909]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ec4909] animate-pulse" />
                  <span>Module 01 Live Stream</span>
                </div>
                <span className="font-mono text-xs text-white/70">48:20 4K</span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-3">
                <button
                  onClick={onWatchVideo}
                  className="w-16 h-16 rounded-full bg-[#ec4909] hover:bg-[#d43f05] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-[#ec4909]/40 transition-all cursor-pointer group/play"
                >
                  <Play className="w-7 h-7 fill-white ml-0.5" />
                </button>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg sm:text-xl text-white tracking-tight">
                    Full-Stack AI Architecture & Vibe Coding
                  </h3>
                  <p className="text-xs text-white/80 max-w-sm">
                    Watch Dr. Alex Vance build a production agent with Supabase RLS and Stripe in 45 minutes.
                  </p>
                </div>
              </div>

              {/* Card Footer Tech Tags */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-white/80">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/10">React 19</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Supabase</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Vercel AI</span>
                </div>
                <span className="text-[#fcd554] font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#fcd554]" /> 4.9/5.0
                </span>
              </div>

            </div>

            {/* Right: Live Interactive Simulator / NPAO Code Runner */}
            <div className="lg:col-span-6 bg-[#f7f4f2] rounded-[22px] p-5 sm:p-6 border border-[#4a4d4f]/10 space-y-4">
              
              {/* Simulator Header & Tabs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ec4909]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fcd554]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                  </div>
                  <span className="font-mono text-xs text-[#4a4d4f] font-semibold ml-2">
                    livebuild.agent.ts
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#4a4d4f]/10 text-[11px] font-mono font-bold">
                  <button
                    onClick={() => setActiveTab('npao')}
                    className={`px-2.5 py-0.5 rounded-full transition-all ${
                      activeTab === 'npao' ? 'bg-[#101b24] text-white shadow-xs' : 'text-[#4a4d4f] hover:text-[#101b24]'
                    }`}
                  >
                    NPAO
                  </button>
                  <button
                    onClick={() => setActiveTab('harness')}
                    className={`px-2.5 py-0.5 rounded-full transition-all ${
                      activeTab === 'harness' ? 'bg-[#101b24] text-white shadow-xs' : 'text-[#4a4d4f] hover:text-[#101b24]'
                    }`}
                  >
                    Harness
                  </button>
                  <button
                    onClick={() => setActiveTab('vault')}
                    className={`px-2.5 py-0.5 rounded-full transition-all ${
                      activeTab === 'vault' ? 'bg-[#101b24] text-white shadow-xs' : 'text-[#4a4d4f] hover:text-[#101b24]'
                    }`}
                  >
                    RLS Vault
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="font-mono text-xs text-[#101b24] bg-white p-4 rounded-xl border border-[#4a4d4f]/10 space-y-2 overflow-x-auto min-h-[170px] leading-relaxed shadow-inner">
                {activeTab === 'npao' && (
                  <div>
                    <p className="text-[#4a4d4f]/70">// 1. Parse intent and compile production blueprint</p>
                    <p className="text-[#ec4909]">const <span className="text-[#101b24]">vibeSpec</span> = await <span className="text-[#020335] font-bold">compileNPAO</span>&#40;&#123;</p>
                    <p className="pl-4 text-[#101b24]">intent: <span className="text-[#15803d]">"Autonomous SaaS with AI Agent"</span>,</p>
                    <p className="pl-4 text-[#101b24]">tenancy: <span className="text-[#15803d]">"workspace_isolated"</span>,</p>
                    <p className="pl-4 text-[#101b24]">runtime: <span className="text-[#15803d]">"vercel_ai_sdk_4"</span>,</p>
                    <p className="pl-4 text-[#101b24]">payments: <span className="text-[#15803d]">"stripe_checkout"</span></p>
                    <p className="text-[#ec4909]">&#125;&#41;;</p>
                  </div>
                )}

                {activeTab === 'harness' && (
                  <div>
                    <p className="text-[#4a4d4f]/70">// 2. Agent Harness execution runtime</p>
                    <p className="text-[#ec4909]">import &#123; <span className="text-[#101b24]">createAgentHarness</span> &#125; from <span className="text-[#15803d]">'@letsvibeai/harness'</span>;</p>
                    <p className="text-[#ec4909]">export const <span className="text-[#101b24]">agent</span> = createAgentHarness&#40;&#123;</p>
                    <p className="pl-4 text-[#101b24]">tools: [<span className="text-[#15803d]">'stripe_billing'</span>, <span className="text-[#15803d]">'supabase_rls'</span>],</p>
                    <p className="pl-4 text-[#101b24]">creditsBudget: <span className="text-[#ec4909] font-bold">2500</span></p>
                    <p className="text-[#ec4909]">&#125;&#41;;</p>
                  </div>
                )}

                {activeTab === 'vault' && (
                  <div>
                    <p className="text-[#4a4d4f]/70">// 3. Secure Supabase Row-Level Security policy</p>
                    <p className="text-[#ec4909]">CREATE POLICY <span className="text-[#15803d]">"workspace_agent_access"</span></p>
                    <p className="pl-4 text-[#101b24]">ON <span className="text-[#020335] font-bold">agent_runs</span> FOR ALL</p>
                    <p className="pl-4 text-[#101b24]">USING &#40; auth.uid&#40;&#41; = user_id &#41;;</p>
                  </div>
                )}
              </div>

              {/* Execution Feedback / Results */}
              {executionOutput && (
                <div className="p-2.5 rounded-lg bg-[#34D399]/10 border border-[#34D399]/30 text-xs text-[#15803d] font-mono flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#15803d]" />
                  <span>{executionOutput}</span>
                </div>
              )}

              {/* Simulator Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#f7f4f2] text-[#4a4d4f] border border-[#4a4d4f]/10 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#15803d]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={handleRunSimulation}
                  disabled={isExecuting}
                  className="px-4 py-1.5 rounded-full bg-[#101b24] hover:bg-[#020335] active:scale-95 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-[#fcd554]" />
                  <span>{isExecuting ? 'Compiling Blueprint...' : 'Run Simulation'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Floating OpenClass Card 1: Review & Student Rating Pill (Top Right on desktop) */}
        <div className="hidden sm:flex absolute -top-6 -right-4 z-20 items-center gap-3 bg-white p-3.5 rounded-full border border-black/[0.08] shadow-[0_12px_30px_-6px_rgba(16,27,36,0.12)] animate-bounce-slow">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Student"
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Student"
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="Student"
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <div className="flex text-[#fcd554]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#101b24]">4.9</span>
            </div>
            <span className="text-[11px] text-[#4a4d4f] font-medium">Over 4k+ learners enrolled</span>
          </div>
        </div>

        {/* Floating OpenClass Card 2: Mentor Quote Card (Bottom Left on desktop) */}
        <div className="hidden sm:flex absolute -bottom-6 -left-4 z-20 items-center gap-3.5 bg-white p-4 rounded-[22px] border border-black/[0.08] shadow-[0_12px_30px_-6px_rgba(16,27,36,0.12)] max-w-sm text-left">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
            alt="Instructor"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#ec4909]/20"
          />
          <div className="space-y-0.5">
            <p className="text-xs text-[#101b24] font-serif italic font-medium leading-snug">
              "Master the architecture, test with real harnesses, and velocity follows naturally."
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-[11px] font-bold text-[#101b24]">Dr. Alex Vance</span>
              <span className="text-[10px] text-[#ec4909] font-semibold px-1.5 py-0.2 rounded bg-[#ec4909]/10">Mentor</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

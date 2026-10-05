import React, { useState } from 'react';
import { ARCHITECTURE_BLOCKS } from '../data/courseData';
import { ArchitectureBlock } from '../types';
import { Play, RotateCcw, ShieldAlert, Sparkles, Copy, Check, ArrowRight, X } from 'lucide-react';

export const ArchitectureMap: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<ArchitectureBlock>(ARCHITECTURE_BLOCKS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Simulation step order
  const simSteps = [
    { id: 'chatui', label: '1. User clicks "Ask Tutor" in Chat UI' },
    { id: 'auth', label: '2. Auth verifies session & user identity' },
    { id: 'server', label: '3. Next.js Server API receives payload' },
    { id: 'database', label: '4. Postgres RLS verifies data ownership' },
    { id: 'payments', label: '5. Stripe entitlement verified (plan = pro)' },
    { id: 'agent', label: '6. AI Agent invokes tools & generates response' },
    { id: 'frontend', label: '7. Answer streamed back to Browser via SSE' },
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < simSteps.length) {
        setSimulationStep(step);
        const block = ARCHITECTURE_BLOCKS.find((b) => b.id === simSteps[step].id);
        if (block) setSelectedBlock(block);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationStep(-1);
      }
    }, 1800);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module 4 Interactive Visual Blueprint</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The 11 Building Blocks of Web Apps
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Every revenue-generating SaaS connects these exact same parts. Click any block or simulate a live request.
        </p>

        {/* Simulation Action Bar */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-lg ${
              isSimulating
                ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-500/50 cursor-not-allowed animate-pulse'
                : 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black hover:opacity-90 active:scale-95 shadow-emerald-500/20'
            }`}
          >
            {isSimulating ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-black" />}
            <span>{isSimulating ? 'Simulating Request Flow...' : 'Simulate Live User Request Flow'}</span>
          </button>
        </div>

        {/* Active Simulation Step Indicator */}
        {isSimulating && (
          <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{simSteps[simulationStep]?.label}</span>
          </div>
        )}
      </div>

      {/* Main Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 11-Block Interactive Visual Map (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-900/70 rounded-3xl border border-zinc-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          
          {/* Layer 1: Client Surfaces */}
          <div className="mb-6">
            <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-3">
              1. Client Layer (Browser)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ARCHITECTURE_BLOCKS.filter((b) => b.layer === 'client').map((block) => {
                const isSelected = selectedBlock.id === block.id;
                const isSimActive = isSimulating && simSteps[simulationStep]?.id === block.id;
                return (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                      isSimActive
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/30 scale-105'
                        : isSelected
                        ? 'border-emerald-400 bg-emerald-950/40 shadow-md shadow-emerald-500/20'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-850'
                    }`}
                  >
                    <div className="text-xl mb-2">{block.analogyIcon}</div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {block.name}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-1 truncate">
                      {block.defaultTool.split('+')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layer 2: Auth Gatekeeper */}
          <div className="mb-6">
            <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-3">
              2. Authentication Gateway
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARCHITECTURE_BLOCKS.filter((b) => b.layer === 'gateway').map((block) => {
                const isSelected = selectedBlock.id === block.id;
                const isSimActive = isSimulating && simSteps[simulationStep]?.id === block.id;
                return (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-4 rounded-2xl text-left border transition-all group ${
                      isSimActive
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/30 scale-105'
                        : isSelected
                        ? 'border-emerald-400 bg-emerald-950/40'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xl mb-2">{block.analogyIcon}</div>
                    <div className="text-sm font-bold text-white">{block.name}</div>
                    <div className="text-[11px] font-mono text-cyan-400 mt-1">{block.defaultTool}</div>
                  </button>
                );
              })}
              {ARCHITECTURE_BLOCKS.filter((b) => b.id === 'server').map((block) => {
                const isSelected = selectedBlock.id === block.id;
                const isSimActive = isSimulating && simSteps[simulationStep]?.id === block.id;
                return (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-4 rounded-2xl text-left border transition-all group ${
                      isSimActive
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/30 scale-105'
                        : isSelected
                        ? 'border-emerald-400 bg-emerald-950/40'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xl mb-2">{block.analogyIcon}</div>
                    <div className="text-sm font-bold text-white">{block.name}</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-1">{block.defaultTool}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layer 3: Persistence (Database & Storage) */}
          <div className="mb-6">
            <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-3">
              3. Persistence & Vault
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARCHITECTURE_BLOCKS.filter((b) => b.layer === 'persistence').map((block) => {
                const isSelected = selectedBlock.id === block.id;
                const isSimActive = isSimulating && simSteps[simulationStep]?.id === block.id;
                return (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-4 rounded-2xl text-left border transition-all group ${
                      isSimActive
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/30 scale-105'
                        : isSelected
                        ? 'border-emerald-400 bg-emerald-950/40'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xl mb-2">{block.analogyIcon}</div>
                    <div className="text-sm font-bold text-white">{block.name}</div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-1 truncate">{block.defaultTool}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layer 4: External Services (Payments, Agent, Deployment) */}
          <div>
            <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-3">
              4. External Engines & Infrastructure
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {ARCHITECTURE_BLOCKS.filter((b) => b.layer === 'external' && b.id !== 'server').map((block) => {
                const isSelected = selectedBlock.id === block.id;
                const isSimActive = isSimulating && simSteps[simulationStep]?.id === block.id;
                return (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-3 rounded-2xl text-left border transition-all group ${
                      isSimActive
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/30 scale-105'
                        : isSelected
                        ? 'border-emerald-400 bg-emerald-950/40'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-lg mb-1">{block.analogyIcon}</div>
                    <div className="text-xs font-bold text-white leading-snug">{block.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Block Deep Dive Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-zinc-900/90 rounded-3xl border border-zinc-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl sticky top-24">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedBlock.analogyIcon}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
                  Analogy: {selectedBlock.analogy}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">{selectedBlock.name}</h3>
            </div>
          </div>

          {/* Plain English Role */}
          <div className="mt-5">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              What it does (Plain English)
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">{selectedBlock.role}</p>
          </div>

          {/* Recommended Tool & Alternatives */}
          <div className="mt-5 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="text-xs font-mono font-bold text-emerald-400 mb-1">
              ✓ Recommended Standard Tool
            </div>
            <div className="text-sm font-bold text-white font-mono">{selectedBlock.defaultTool}</div>
            
            <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center gap-2 flex-wrap text-xs text-zinc-400">
              <span className="font-mono text-zinc-500">Alternatives:</span>
              {selectedBlock.alternatives.map((alt, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                  {alt}
                </span>
              ))}
            </div>
          </div>

          {/* Security & Scalability Note */}
          <div className="mt-5 p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Architectural Rule & Security</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">{selectedBlock.securityNote}</p>
          </div>

          {/* Copy-Paste Prompt Template for this Block */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                Copy Prompt for Coding Agent
              </span>
              <button
                onClick={() => handleCopyPrompt(selectedBlock.promptExample)}
                className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-mono"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-300/90 leading-relaxed select-all">
              "{selectedBlock.promptExample}"
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

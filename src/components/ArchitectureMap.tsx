import React, { useState } from 'react';
import { ARCHITECTURE_BLOCKS } from '../data/courseData';
import { ArchitectureBlock } from '../types';
import { Play, RotateCcw, ShieldAlert, Sparkles, Copy, Check, ArrowRight, X, Layers } from 'lucide-react';

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
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#071B3A] text-xs font-semibold mb-3 shadow-xs">
          <Layers className="w-3.5 h-3.5 text-[#2F80ED]" />
          <span>Module 4 Interactive Blueprint</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#10213F] tracking-tight">
          The 11 Building Blocks of Web Apps
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          Every revenue-generating SaaS connects these exact same parts. Click any block or simulate a live request.
        </p>

        {/* Live Simulation Control Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md ${
              isSimulating
                ? 'bg-blue-50 text-[#2F80ED] border border-blue-200 animate-pulse'
                : 'bg-[#071B3A] text-white hover:bg-[#10213F] active:scale-95'
            }`}
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-[#2F80ED]" />
                <span>Simulating Request Flow...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Simulate Live User Request Flow</span>
              </>
            )}
          </button>
        </div>

        {/* Live Simulation Step Pill */}
        {isSimulating && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2F80ED] font-mono text-xs font-semibold animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-[#2F80ED] animate-ping" />
            <span>{simSteps[simulationStep]?.label}</span>
          </div>
        )}
      </div>

      {/* Main Architecture Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 11 Blocks Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {ARCHITECTURE_BLOCKS.map((block, idx) => {
            const isSelected = selectedBlock.id === block.id;
            const isSimActive = isSimulating && simSteps[simulationStep]?.id === block.id;

            return (
              <button
                key={block.id}
                onClick={() => setSelectedBlock(block)}
                className={`p-4 rounded-2xl text-left border transition-all relative flex flex-col justify-between min-h-[110px] ${
                  isSimActive
                    ? 'bg-blue-50 border-[#2F80ED] shadow-lg scale-105 ring-2 ring-[#2F80ED]/30'
                    : isSelected
                    ? 'bg-white border-[#071B3A] shadow-md ring-1 ring-[#071B3A]'
                    : 'bg-[#F4F7FB] border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    #{idx + 1}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSimActive
                        ? 'bg-[#2F80ED] animate-ping'
                        : isSelected
                        ? 'bg-[#34D399]'
                        : 'bg-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-[#10213F]' : 'text-slate-700'}`}>
                    {block.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {block.analogy}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Block Deep-Dive Inspector Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#F4F7FB] border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-5 text-left">
          
          {/* Header with Title and Tools */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#2F80ED] uppercase">
                  {selectedBlock.layer} Layer
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedBlock.analogy}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#10213F]">
                {selectedBlock.name}
              </h3>
            </div>
            <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold text-[#10213F] shadow-xs">
              {selectedBlock.defaultTool}
            </div>
          </div>

          {/* Plain English Description */}
          <div>
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Role & Responsibility
            </h5>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedBlock.role}
            </p>
          </div>

          {/* Security Rule / Invariant */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-amber-900 text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Security Rule: </span>
              <span>{selectedBlock.securityNote}</span>
            </div>
          </div>

          {/* Tools List */}
          <div>
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Standard Tool & Alternatives
            </h5>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-[#071B3A] text-white rounded-lg text-xs font-bold shadow-xs">
                {selectedBlock.defaultTool}
              </span>
              {selectedBlock.alternatives?.map((t: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Copyable Architect Prompt */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#2F80ED] uppercase">
                Copy Prompt for AI Agents
              </span>
              <button
                onClick={() => handleCopyPrompt(selectedBlock.promptExample)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#10213F] font-bold"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span className="text-[#34D399]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-800 bg-[#F4F7FB] p-3 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-200/60">
              {selectedBlock.promptExample}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};

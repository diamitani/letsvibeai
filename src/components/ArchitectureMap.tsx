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
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <Layers className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Module 4 Interactive Blueprint</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#281010] tracking-tight font-display">
          The 11 Building Blocks of Web Apps
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#706B67] font-normal">
          Every revenue-generating SaaS connects these exact same parts. Click any block or simulate a live request.
        </p>

        {/* Live Simulation Control Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-md ${
              isSimulating
                ? 'bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91] animate-pulse'
                : 'bg-[#FA5929] text-white hover:bg-[#E0491B] active:scale-95 shadow-[#FA5929]/20'
            }`}
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-[#FA5929]" />
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
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] font-mono text-xs font-semibold animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-[#FA5929] animate-ping" />
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
                    ? 'bg-[#FBE1CE] border-[#FA5929] shadow-lg scale-105 ring-2 ring-[#FA5929]/30'
                    : isSelected
                    ? 'bg-white border-[#FA5929] shadow-md ring-1 ring-[#FA5929]'
                    : 'bg-white border-[#EAE3D9] hover:bg-[#FAF7F2] hover:border-[#FA5929]/40 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#706B67]">
                    #{idx + 1}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSimActive
                        ? 'bg-[#FA5929] animate-ping'
                        : isSelected
                        ? 'bg-[#FA5929]'
                        : 'bg-[#EAE3D9]'
                    }`}
                  />
                </div>

                <div>
                  <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-[#281010]' : 'text-[#281010]'}`}>
                    {block.name}
                  </h4>
                  <p className="text-[11px] text-[#706B67] line-clamp-1 mt-0.5">
                    {block.analogy}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Block Deep-Dive Inspector Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#EAE3D9] rounded-3xl p-6 shadow-sm flex flex-col gap-5 text-left">
          
          {/* Header with Title and Tools */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EAE3D9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#FA5929] uppercase">
                  {selectedBlock.layer} Layer
                </span>
                <span className="text-[#EAE3D9]">•</span>
                <span className="text-xs font-semibold text-[#706B67]">
                  {selectedBlock.analogy}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#281010] font-display">
                {selectedBlock.name}
              </h3>
            </div>
            <div className="px-3 py-1 bg-[#F8F3EC] border border-[#EAE3D9] rounded-full text-xs font-mono font-bold text-[#281010] shadow-xs">
              {selectedBlock.defaultTool}
            </div>
          </div>

          {/* Plain English Description */}
          <div>
            <h5 className="text-[11px] font-bold text-[#706B67] uppercase tracking-wider mb-1">
              Role & Responsibility
            </h5>
            <p className="text-xs sm:text-sm text-[#706B67] leading-relaxed">
              {selectedBlock.role}
            </p>
          </div>

          {/* Security Rule / Invariant */}
          <div className="p-3.5 rounded-2xl bg-[#FBE1CE]/60 border border-[#FCAA91]/70 flex items-start gap-2.5 text-[#B8741A] text-xs">
            <ShieldAlert className="w-4 h-4 text-[#FA5929] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#281010]">Security Rule: </span>
              <span>{selectedBlock.securityNote}</span>
            </div>
          </div>

          {/* Tools List */}
          <div>
            <h5 className="text-[11px] font-bold text-[#706B67] uppercase tracking-wider mb-1.5">
              Standard Tool & Alternatives
            </h5>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-3 py-1 bg-[#FA5929] text-white rounded-full text-xs font-bold shadow-xs">
                {selectedBlock.defaultTool}
              </span>
              {selectedBlock.alternatives?.map((t: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#F8F3EC] border border-[#EAE3D9] rounded-full text-xs font-medium text-[#706B67] shadow-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Copyable Architect Prompt */}
          <div className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#FA5929] uppercase">
                Copy Prompt for AI Agents
              </span>
              <button
                onClick={() => handleCopyPrompt(selectedBlock.promptExample)}
                className="inline-flex items-center gap-1.5 text-xs text-[#281010] hover:text-[#FA5929] font-bold"
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
            <pre className="text-xs font-mono text-[#281010] bg-white p-3 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-[#EAE3D9]">
              {selectedBlock.promptExample}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};

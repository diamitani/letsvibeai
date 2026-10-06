import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Layers,
  ArrowRight,
  Calculator
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PromptStudio: React.FC = () => {
  const [role, setRole] = useState('Senior Full-Stack Architect');
  const [task, setTask] = useState('Build a Stripe billing portal with metered webhook handlers.');
  const [harness, setHarness] = useState('Claude Code / Antigravity');
  const [copied, setCopied] = useState(false);
  const [isCompiled, setIsCompiled] = useState(false);

  const estimatedTokens = Math.round((role.length + task.length + harness.length) * 1.8 + 320);
  const estimatedCost = ((estimatedTokens / 1000) * 0.003).toFixed(4);

  const compiledPrompt = `# Role: ${role}
# Target Harness: ${harness}
# Execution Standard: PAL Doctrine (Parse -> Ambiguity Scan -> Latent Intent -> Expand -> Compile)

## Primary Objective:
${task}

## Technical Invariants:
1. All database queries must be bound to org_id via Postgres Row-Level Security (RLS).
2. Stripe webhooks must enforce signature verification and idempotency keys.
3. Server state remains strictly on the server; client components receive typed payloads only.
4. Error handling must account for: 401 Unauthorized, 409 Conflict, 429 Rate Limit.

## Output Format:
Emit complete, production-ready TypeScript files with zero placeholders.`;

  const handleCompile = () => {
    setIsCompiled(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[32px] p-7 sm:p-9 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#4a4d4f]/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>Prompt Architect Studio</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#101b24] font-sans">
            Instruction Pack <span className="text-[#ec4909]">Compiler</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#4a4d4f]">
            Design, format, and compile strict system prompts and instructions for AI coding agents.
          </p>
        </div>

        {/* Real-Time Cost & Token Estimation Badge */}
        <div className="flex items-center gap-3 bg-[#f7f4f2] border border-[#4a4d4f]/10 p-3 rounded-2xl shrink-0">
          <Calculator className="w-4 h-4 text-[#ec4909]" />
          <div className="text-xs">
            <span className="text-[#4a4d4f]">Tokens: </span>
            <strong className="font-mono text-[#101b24]">{estimatedTokens} toks</strong>
            <span className="text-[#4a4d4f] ml-2">Cost: </span>
            <strong className="font-mono text-[#ec4909]">${estimatedCost}</strong>
          </div>
        </div>
      </div>

      {/* 2-Column Compiler Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#4a4d4f] uppercase mb-1">
                Agent Persona & Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#4a4d4f]/10 text-xs text-[#101b24] focus:outline-none focus:border-[#ec4909]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#4a4d4f] uppercase mb-1">
                Target Objective / Feature
              </label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#4a4d4f]/10 text-xs text-[#101b24] focus:outline-none focus:border-[#ec4909]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#4a4d4f] uppercase mb-1">
                Coding Harness
              </label>
              <select
                value={harness}
                onChange={(e) => setHarness(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#4a4d4f]/10 text-xs text-[#101b24] focus:outline-none focus:border-[#ec4909]"
              >
                <option value="Claude Code / Antigravity">Claude Code / Antigravity IDE</option>
                <option value="Cursor Composer">Cursor Composer Agent</option>
                <option value="OpenAI Swarm SDK">OpenAI Swarm SDK</option>
              </select>
            </div>

            <button
              onClick={handleCompile}
              className="w-full py-3 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Compile Instruction Pack</span>
            </button>
          </div>
        </div>

        {/* Right Output (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#4a4d4f]">instruction-pack.md</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-full bg-[#f7f4f2] hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#15803d]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#101b24] text-[#f7f4f2] font-mono text-xs overflow-x-auto leading-relaxed border border-black/10 min-h-[260px]">
            {compiledPrompt}
          </pre>
        </div>

      </div>

    </div>
  );
};

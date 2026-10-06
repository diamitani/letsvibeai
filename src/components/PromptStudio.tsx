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
    <section id="prompt-studio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompt Architect Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Instruction Pack <span className="text-[#FA5929]">Compiler</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            Design, format, and compile strict system prompts and instructions for AI coding agents.
          </p>
        </div>

        {/* Real-Time Cost & Token Estimation Badge */}
        <div className="flex items-center gap-3 bg-white border border-[#EAE3D9] p-3.5 rounded-2xl shadow-xs">
          <Calculator className="w-4 h-4 text-[#FA5929]" />
          <div className="text-xs">
            <span className="text-[#706B67]">Estimated Tokens: </span>
            <strong className="font-mono text-[#281010]">{estimatedTokens} toks</strong>
            <span className="text-[#706B67] ml-2">Cost: </span>
            <strong className="font-mono text-[#FA5929]">${estimatedCost}</strong>
          </div>
        </div>
      </div>

      {/* 2-Column Compiler Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#706B67] uppercase mb-1">
                Agent Persona & Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#706B67] uppercase mb-1">
                Target AI Coding Harness
              </label>
              <select
                value={harness}
                onChange={(e) => setHarness(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
              >
                <option value="Claude Code / Antigravity">Claude Code & Antigravity IDE</option>
                <option value="Cursor / Codex CLI">Cursor Composer & Codex CLI</option>
                <option value="Vercel AI SDK 4.0">Vercel AI SDK 4.0 Agent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#706B67] uppercase mb-1">
                Goal & Scope Parameters
              </label>
              <textarea
                rows={3}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
              />
            </div>

            <button
              onClick={handleCompile}
              className="w-full py-3 rounded-full bg-[#FA5929] hover:bg-[#E0491B] active:scale-95 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Compile Instruction Pack</span>
            </button>
          </div>
        </div>

        {/* Right Output Box (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#281010] text-white border border-[#FA5929]/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FA5929]" />
              <span className="text-xs font-mono font-bold text-[#D8D1C7]">
                SKILL.md / instruction-pack.md
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-mono text-[#D8D1C7] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#160E0E] font-mono text-xs text-[#EAE3D9] overflow-x-auto leading-relaxed border border-white/5 max-h-[300px]">
            {compiledPrompt}
          </pre>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#A89F91]">
            <span>Format: Markdown + System Directives</span>
            <span className="font-mono text-[11px] text-[#FA5929]">Verified Anti-Slop Compliant</span>
          </div>
        </div>

      </div>

    </section>
  );
};

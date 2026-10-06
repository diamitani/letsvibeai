import React, { useState } from 'react';
import { Terminal, Calculator, Sparkles, Copy, Check, Sliders, ArrowRight } from 'lucide-react';

export const PromptStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'calculator'>('generator');

  // Generator state
  const [idea, setIdea] = useState('An AI legal document analyzer for solo attorneys');
  const [audience, setAudience] = useState('Solo practitioners and boutique law firms');
  const [feature, setFeature] = useState('Upload contract PDF, extract risks, generate redline suggestions');
  const [stack, setStack] = useState('Next.js, Supabase, Tailwind, Stripe, Claude 3.7');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Calculator state
  const [users, setUsers] = useState(250);
  const [queriesPerDay, setQueriesPerDay] = useState(8);
  const [inputTokens, setInputTokens] = useState(1800);
  const [outputTokens, setOutputTokens] = useState(600);

  const generatePrompts = () => {
    const text = `You are a principal software architect and senior full-stack engineer.

MISSION:
Build the V1 release for "${idea}".
Target Audience: ${audience}.
Core Feature Loop: ${feature}.
Technical Stack: ${stack}.

GOVERNING RULES:
1. Architecture First: Verify database schema (Postgres RLS), Auth, and Stripe webhooks before generating client UI.
2. Zero Secret Leakage: All API keys, database service roles, and Stripe secret tokens live strictly in server-side environment variables.
3. Clean Lexio Design: Follow Lexio Theme System — Warm Alabaster Canvas (#F8F3EC), Espresso text (#281010), Coral Flame accents (#FA5929), and Plus Jakarta Sans typography.

PHASE 1 DELIVERABLE:
1. Produce /docs/01-prd.md and /docs/04-system-architecture.md.
2. Generate the Postgres schema with RLS security policies.
3. Write the protected Server Action for the core feature with Zod validation.
4. Output the definition of done with test criteria.`;

    setGeneratedPrompt(text);
  };

  // Run on first load
  React.useEffect(() => {
    generatePrompts();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Cost calculations
  const totalDailyQueries = users * queriesPerDay;
  const monthlyQueries = totalDailyQueries * 30;
  const monthlyInputTokensM = (monthlyQueries * inputTokens) / 1_000_000;
  const monthlyOutputTokensM = (monthlyQueries * outputTokens) / 1_000_000;

  const costClaudeInput = monthlyInputTokensM * 3.0;
  const costClaudeOutput = monthlyOutputTokensM * 15.0;
  const totalClaudeCost = costClaudeInput + costClaudeOutput;

  const costGptInput = monthlyInputTokensM * 2.5;
  const costGptOutput = monthlyOutputTokensM * 10.0;
  const totalGptCost = costGptInput + costGptOutput;

  const costDeepseekInput = monthlyInputTokensM * 0.55;
  const costDeepseekOutput = monthlyOutputTokensM * 2.19;
  const totalDeepseekCost = costDeepseekInput + costDeepseekOutput;

  return (
    <section id="prompts" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D9] text-left">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
          <Terminal className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Interactive Student Tools</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#281010] tracking-tight">
          Prompt Studio & Token Calculator
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#706B67] font-normal">
          Generate production-ready architectural prompts for Cursor, Claude, and Codex, or calculate your monthly model API budget.
        </p>

        {/* Tab Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#EAE3D9] shadow-xs">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'generator'
                  ? 'bg-[#281010] text-white shadow-sm font-extrabold'
                  : 'text-[#706B67] hover:text-[#281010]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FA5929]" />
              <span>Architect Prompt Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-[#281010] text-white shadow-sm font-extrabold'
                  : 'text-[#706B67] hover:text-[#281010]'
              }`}
            >
              <Calculator className="w-4 h-4 text-[#FA5929]" />
              <span>Token Budget Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generator Tab */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-[#281010] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#FA5929]" />
              <span>Describe Your SaaS Concept</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-[#281010] mb-1">Your App Idea</label>
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#281010] mb-1">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#281010] mb-1">Core Feature Loop</label>
              <input
                type="text"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#281010] mb-1">Tech Stack</label>
              <input
                type="text"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-xs"
              />
            </div>

            <button
              onClick={generatePrompts}
              className="w-full py-3.5 bg-[#FA5929] hover:bg-[#E0491B] text-white font-extrabold text-xs rounded-full transition-all shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <span>Compile Architecture Prompt</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <div className="lg:col-span-7 bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAE3D9]">
              <span className="text-xs font-mono font-bold text-[#FA5929]">
                Output: Master Prompt Pack
              </span>
              <button
                onClick={() => handleCopy(generatedPrompt)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F8F3EC] hover:bg-[#FBE1CE] border border-[#EAE3D9] rounded-full text-xs font-bold text-[#281010] shadow-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#FA5929]" />
                    <span className="text-[#FA5929]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs font-mono text-[#281010] leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[420px] shadow-xs">
              {generatedPrompt}
            </pre>
          </div>
        </div>
      )}

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <h4 className="text-sm font-extrabold text-[#281010] mb-4">
              Usage & Token Assumptions
            </h4>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#281010] mb-1">
                <span>Monthly Active Users</span>
                <span className="font-mono text-[#FA5929]">{users} users</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full accent-[#FA5929]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#281010] mb-1">
                <span>Queries per User / Day</span>
                <span className="font-mono text-[#FA5929]">{queriesPerDay} queries</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={queriesPerDay}
                onChange={(e) => setQueriesPerDay(Number(e.target.value))}
                className="w-full accent-[#FA5929]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#281010] mb-1">
                <span>Average Input Tokens per Request</span>
                <span className="font-mono text-[#FA5929]">{inputTokens} tokens</span>
              </div>
              <input
                type="range"
                min="200"
                max="8000"
                step="200"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="w-full accent-[#FA5929]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#281010] mb-1">
                <span>Average Output Tokens per Request</span>
                <span className="font-mono text-[#FA5929]">{outputTokens} tokens</span>
              </div>
              <input
                type="range"
                min="100"
                max="4000"
                step="100"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="w-full accent-[#FA5929]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-[#281010] mb-4">
              Estimated Monthly Model Costs
            </h4>

            <div className="p-4 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl flex items-center justify-between shadow-xs">
              <div>
                <h5 className="text-sm font-bold text-[#281010]">Claude 3.7 Sonnet</h5>
                <p className="text-[11px] text-[#706B67]">$3.00/M in · $15.00/M out</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-[#281010] font-mono">${totalClaudeCost.toFixed(2)}</div>
                <div className="text-[10px] text-[#706B67]">per month</div>
              </div>
            </div>

            <div className="p-4 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl flex items-center justify-between shadow-xs">
              <div>
                <h5 className="text-sm font-bold text-[#281010]">GPT-4o</h5>
                <p className="text-[11px] text-[#706B67]">$2.50/M in · $10.00/M out</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-[#FA5929] font-mono">${totalGptCost.toFixed(2)}</div>
                <div className="text-[10px] text-[#706B67]">per month</div>
              </div>
            </div>

            <div className="p-4 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl flex items-center justify-between shadow-xs">
              <div>
                <h5 className="text-sm font-bold text-[#281010]">DeepSeek R1 / V3</h5>
                <p className="text-[11px] text-[#706B67]">$0.55/M in · $2.19/M out</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-[#281010] font-mono">${totalDeepseekCost.toFixed(2)}</div>
                <div className="text-[10px] text-[#706B67]">per month</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

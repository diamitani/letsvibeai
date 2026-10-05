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
3. Anti-Slop Design: Follow design-taste-frontend standards — sleek obsidian dark mode, crisp typography, high tactile responsiveness (scale-[0.98] active states), and responsive layout.

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

  const models = [
    {
      name: 'Claude 3.7 Sonnet (Reasoning)',
      inPrice: 3.00,
      outPrice: 15.00,
      badge: 'Best for Coding & Agents',
      cost: monthlyInputTokensM * 3.00 + monthlyOutputTokensM * 15.00
    },
    {
      name: 'OpenAI GPT-4o',
      inPrice: 2.50,
      outPrice: 10.00,
      badge: 'Multimodal Frontier',
      cost: monthlyInputTokensM * 2.50 + monthlyOutputTokensM * 10.00
    },
    {
      name: 'DeepSeek R1',
      inPrice: 0.55,
      outPrice: 2.19,
      badge: 'Open Reasoning Value',
      cost: monthlyInputTokensM * 0.55 + monthlyOutputTokensM * 2.19
    },
    {
      name: 'Google Gemini 2.5 Flash',
      inPrice: 0.15,
      outPrice: 0.60,
      badge: 'Ultra Fast & High Volume',
      cost: monthlyInputTokensM * 0.15 + monthlyOutputTokensM * 0.60
    }
  ];

  return (
    <section id="studio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive AI Builder Tools</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Prompt Studio & Token Calculator
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Transform rough brain dumps into precision architect prompts, and model your monthly AI API operational costs.
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'generator'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Prompt Architect</span>
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Token Cost Estimator</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Prompt Generator */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Project Parameters</span>
            </h3>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">App Idea / Problem</label>
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Core Feature Loop</label>
              <input
                type="text"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Target Tech Stack</label>
              <input
                type="text"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              onClick={generatePrompts}
              className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 mt-2"
            >
              Regenerate Master Prompt
            </button>
          </div>

          {/* Generated Prompt Output (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Generated Production Prompt (Ready for Agent)
              </span>
              <button
                onClick={() => handleCopy(generatedPrompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto">
              {generatedPrompt}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 2: Token Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl space-y-5">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Usage Volume Sliders</span>
            </h3>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>Daily Active Users (DAU)</span>
                <span className="text-white font-bold">{users.toLocaleString()} users</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>AI Queries / User / Day</span>
                <span className="text-white font-bold">{queriesPerDay} queries</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={queriesPerDay}
                onChange={(e) => setQueriesPerDay(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>Input Prompt Tokens / Query</span>
                <span className="text-white font-bold">{inputTokens.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min="300"
                max="6000"
                step="100"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>Output Response Tokens / Query</span>
                <span className="text-white font-bold">{outputTokens.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1">
              <div>Total Monthly Queries: <strong className="text-white font-mono">{monthlyQueries.toLocaleString()}</strong></div>
              <div>Input Volume: <strong className="text-cyan-400 font-mono">{monthlyInputTokensM.toFixed(1)}M tokens/mo</strong></div>
              <div>Output Volume: <strong className="text-emerald-400 font-mono">{monthlyOutputTokensM.toFixed(1)}M tokens/mo</strong></div>
            </div>
          </div>

          {/* Model Pricing Comparison Table (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider pb-3 border-b border-zinc-800">
              Estimated Monthly Cost by Model Provider
            </h3>

            <div className="space-y-3">
              {models.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{m.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {m.badge}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-zinc-500 mt-1">
                      ${m.inPrice}/M in · ${m.outPrice}/M out
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-mono font-extrabold text-white">
                      ${m.cost.toFixed(2)}
                      <span className="text-xs text-zinc-500 font-normal"> / mo</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      ${(m.cost / users).toFixed(3)} / user
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Architectural Recommendation:</strong> Use a model router to send 80% of simple classification tasks to Gemini 2.5 Flash ($0.15/M) and reserve Claude 3.7 Sonnet for complex code generation to reduce total monthly cost by up to 70%.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

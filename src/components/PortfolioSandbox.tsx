import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, PortfolioProject, VercelAiSandboxEngine } from '../lib/sandbox/aiStack';
import { Terminal, Play, RotateCcw, Cpu, Layers, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, Code } from 'lucide-react';

export const PortfolioSandbox: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(PORTFOLIO_PROJECTS[0]);
  const [selectedModel, setSelectedModel] = useState('claude-3-7-sonnet');
  const [promptInput, setPromptInput] = useState(selectedProject.samplePrompt);
  const [streamOutput, setStreamOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [telemetry, setTelemetry] = useState<{ totalTokens: number; latencyMs: number; toolCalls: string[] } | null>(null);

  const handleSelectProject = (proj: PortfolioProject) => {
    setSelectedProject(proj);
    setPromptInput(proj.samplePrompt);
    setStreamOutput('');
    setTelemetry(null);
  };

  const handleRunSandbox = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setStreamOutput('');
    setTelemetry(null);

    try {
      const result = await VercelAiSandboxEngine.executeSandboxStream(
        promptInput,
        selectedModel,
        (chunk) => {
          setStreamOutput((prev) => prev + chunk);
        }
      );
      setTelemetry(result);
    } catch {
      setStreamOutput('Error executing sandbox stream.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <section id="sandbox" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Vercel AI SDK Backend Sandbox</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Live Portfolio Sandbox & AI Stack
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Test real student capstones in an active Vercel AI SDK streaming execution environment with tool calls and model telemetry.
        </p>
      </div>

      {/* Main Grid: Projects Selector & Live Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Portfolio Project Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Select Verified Portfolio Project
          </div>
          {PORTFOLIO_PROJECTS.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj)}
                className={`w-full text-left p-5 rounded-3xl border transition-all text-xs group ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-xl shadow-cyan-500/20'
                    : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 hover:bg-zinc-850'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-cyan-400 font-bold uppercase text-[10px]">
                    {proj.category}
                  </span>
                  <span className="font-mono font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                    {proj.monthlyRevenue}
                  </span>
                </div>
                <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  {proj.summary}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Founder: {proj.founder}</span>
                  <span className="text-zinc-400">Run Sandbox →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Live Sandbox Terminal & Telemetry (8 cols) */}
        <div className="lg:col-span-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Project Details Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  {selectedProject.category} · Capstone Project
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                {selectedProject.summary}
              </p>
            </div>

            {/* Model Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="claude-3-7-sonnet">Claude 3.7 Sonnet</option>
                <option value="gpt-4o">OpenAI GPT-4o</option>
                <option value="gemini-2-5-flash">Gemini 2.5 Flash</option>
                <option value="deepseek-r1">DeepSeek R1</option>
              </select>
            </div>
          </div>

          {/* Interactive Prompt Sandbox Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Test Execution Prompt</span>
              </label>
              <button
                onClick={() => setPromptInput(selectedProject.samplePrompt)}
                className="text-[11px] font-mono text-zinc-500 hover:text-white"
              >
                Reset Default
              </button>
            </div>
            <textarea
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
            />
            
            <button
              onClick={handleRunSandbox}
              disabled={isRunning || !promptInput.trim()}
              className="mt-3 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all disabled:opacity-40"
            >
              {isRunning ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-black" />}
              <span>{isRunning ? 'Streaming Execution via Vercel AI SDK...' : 'Run in Vercel AI Sandbox'}</span>
            </button>
          </div>

          {/* Live Streaming Terminal */}
          <div className="rounded-2xl bg-black border border-zinc-800 p-5 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-850 text-zinc-500 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Vercel AI SDK streamText() Output Terminal</span>
              </span>
              {telemetry && (
                <span className="text-cyan-400">
                  {telemetry.latencyMs}ms · {telemetry.totalTokens} tokens
                </span>
              )}
            </div>

            <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto">
              {streamOutput || selectedProject.simulatedOutput}
            </pre>
          </div>

          {/* Tech Stack Pillars of Selected Project */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
            <div className="font-mono font-bold text-zinc-400 uppercase mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full-Stack Architecture Key Sheet for this App</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px]">
              <div>
                <span className="text-zinc-500 block">Frontend:</span>
                <span className="text-white">{selectedProject.techStack.frontend}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Backend:</span>
                <span className="text-white">{selectedProject.techStack.backend}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Database + RLS:</span>
                <span className="text-emerald-400">{selectedProject.techStack.database}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">AI Gateway:</span>
                <span className="text-cyan-400">{selectedProject.techStack.aiGateway}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Auth:</span>
                <span className="text-white">{selectedProject.techStack.auth}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Payments:</span>
                <span className="text-white">{selectedProject.techStack.payments}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

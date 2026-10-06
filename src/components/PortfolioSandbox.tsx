import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, PortfolioProject, VercelAiSandboxEngine } from '../lib/sandbox/aiStack';
import { Terminal, Play, RotateCcw } from 'lucide-react';

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
    <section id="sandbox" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D9]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
          <Terminal className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Vercel AI SDK Backend Sandbox</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#281010] tracking-tight">
          Live Portfolio Sandbox & AI Stack
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#706B67] font-normal">
          Test real student capstones in an active Vercel AI SDK streaming execution environment with tool calls and model telemetry.
        </p>
      </div>

      {/* Main Grid: Projects Selector & Live Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* Left: 3 Capstone Projects List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-mono font-bold text-[#706B67] uppercase tracking-wider">
              Student Capstone Projects
            </h4>
            <span className="text-xs text-[#706B67] font-mono">Select to Test</span>
          </div>
          {PORTFOLIO_PROJECTS.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj)}
                className={`w-full p-5 rounded-3xl border text-left transition-all ${
                  isSelected
                    ? 'bg-white border-[#FA5929] shadow-md ring-1 ring-[#FA5929]'
                    : 'bg-white border-[#EAE3D9] hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#FA5929] uppercase px-2.5 py-0.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/40">
                    {proj.category}
                  </span>
                  <span className="text-xs font-bold text-[#281010] font-mono">
                    {proj.monthlyRevenue}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#281010] mb-1">{proj.title}</h4>
                <p className="text-xs text-[#706B67] line-clamp-2 leading-relaxed mb-2.5">
                  {proj.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#706B67] pt-2 border-t border-[#EAE3D9]">
                  <span>Built by: <strong className="text-[#281010]">{proj.founder}</strong></span>
                  <span className="font-mono text-[10px] text-[#706B67]">{proj.role}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Live Interactive Sandbox Terminal (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 shadow-xs">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#EAE3D9]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#281010]">Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-3.5 py-1.5 bg-[#F8F3EC] border border-[#EAE3D9] rounded-full text-xs font-mono text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-xs"
              >
                <option value="claude-3-7-sonnet">Claude 3.7 Sonnet (Hybrid Reasoning)</option>
                <option value="gpt-4o">GPT-4o (Multimodal Vision & Audio)</option>
                <option value="deepseek-r1">DeepSeek R1 (Deep Chain of Thought)</option>
                <option value="gemini-2-5-pro">Gemini 2.5 Pro (2M Context Window)</option>
              </select>
            </div>

            <button
              onClick={handleRunSandbox}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white font-bold text-xs shadow-sm active:scale-95 transition-all disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Streaming Tokens...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                  <span>Execute Vercel AI SDK</span>
                </>
              )}
            </button>
          </div>

          {/* Tech Stack Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            <div className="p-3 bg-[#F8F3EC] rounded-2xl border border-[#EAE3D9]">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block">Frontend</span>
              <span className="text-xs font-semibold text-[#281010] line-clamp-1">{selectedProject.techStack.frontend}</span>
            </div>
            <div className="p-3 bg-[#F8F3EC] rounded-2xl border border-[#EAE3D9]">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block">Database</span>
              <span className="text-xs font-semibold text-[#281010] line-clamp-1">{selectedProject.techStack.database}</span>
            </div>
            <div className="p-3 bg-[#F8F3EC] rounded-2xl border border-[#EAE3D9]">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block">AI Gateway</span>
              <span className="text-xs font-semibold text-[#281010] line-clamp-1">{selectedProject.techStack.aiGateway}</span>
            </div>
          </div>

          {/* Prompt Editor */}
          <div className="mb-4">
            <label className="block text-[11px] font-mono font-bold text-[#706B67] uppercase tracking-wider mb-1.5">
              Input Architecture & Prompt Payload
            </label>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={3}
              className="w-full p-3.5 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs font-mono text-[#281010] placeholder-[#706B67] focus:outline-none focus:border-[#FA5929] shadow-xs leading-relaxed"
            />
          </div>

          {/* Stream Output Window */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono font-bold text-[#706B67] uppercase tracking-wider">
                Vercel AI SDK Streamed Response
              </label>
              {telemetry && (
                <div className="flex items-center gap-3 text-[10px] font-mono text-[#706B67]">
                  <span>Tokens: <strong className="text-[#FA5929]">{telemetry.totalTokens}</strong></span>
                  <span>Latency: <strong className="text-[#281010]">{telemetry.latencyMs}ms</strong></span>
                  <span>Tools: <strong>{telemetry.toolCalls.length}</strong></span>
                </div>
              )}
            </div>

            <div className="min-h-[160px] p-4 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs font-mono text-[#281010] overflow-y-auto leading-relaxed shadow-xs">
              {streamOutput ? (
                <pre className="whitespace-pre-wrap font-mono text-[#281010]">{streamOutput}</pre>
              ) : (
                <span className="text-[#706B67] italic">
                  Click "Execute Vercel AI SDK" above to stream responses live...
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

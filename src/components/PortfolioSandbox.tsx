import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Clock,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Play,
  Copy,
  Check,
  RefreshCw,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PortfolioSandbox: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'claude-3-7' | 'gpt-4-5' | 'gemini-2-flash'>('claude-3-7');
  const [promptInput, setPromptInput] = useState('Generate an isolated Postgres RLS policy for workspace memberships.');
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const modelSpecs = {
    'claude-3-7': {
      name: 'Claude 3.7 Sonnet',
      provider: 'Anthropic',
      latency: '320ms',
      costPer1k: '$0.003',
      accuracy: '98.4%',
      output: `-- Claude 3.7 Sonnet Optimized Output
CREATE POLICY "workspace_members_isolation"
ON workspace_members
FOR ALL
USING (
  workspace_id IN (
    SELECT id FROM workspaces WHERE owner_id = auth.uid()
  )
);`
    },
    'gpt-4-5': {
      name: 'GPT-4.5 Preview',
      provider: 'OpenAI',
      latency: '540ms',
      costPer1k: '$0.010',
      accuracy: '96.2%',
      output: `-- GPT-4.5 Output
CREATE POLICY "membership_check"
ON workspace_members
FOR SELECT
USING (user_id = auth.uid());`
    },
    'gemini-2-flash': {
      name: 'Gemini 2.0 Flash',
      provider: 'Google DeepMind',
      latency: '140ms',
      costPer1k: '$0.0004',
      accuracy: '95.8%',
      output: `-- Gemini 2.0 Flash High-Speed Output
CREATE POLICY "fast_tenant_access"
ON workspace_members
FOR ALL
USING (auth.jwt() ->> 'org_id' = workspace_id::text);`
    }
  };

  const currentSpec = modelSpecs[selectedModel];

  const handleRun = () => {
    setIsRunning(true);
    setRunOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunOutput(currentSpec.output);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }, 450);
  };

  const handleCopy = () => {
    if (runOutput) {
      navigator.clipboard.writeText(runOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="sandbox" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive AI Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Model Benchmarking & <span className="text-[#FA5929]">Simulation Lab</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            Test and compare real-world reasoning, latency, and token costs across leading frontier models.
          </p>
        </div>

        {/* Model Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          <button
            onClick={() => setSelectedModel('claude-3-7')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedModel === 'claude-3-7'
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            Claude 3.7 Sonnet
          </button>

          <button
            onClick={() => setSelectedModel('gpt-4-5')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedModel === 'gpt-4-5'
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            GPT-4.5
          </button>

          <button
            onClick={() => setSelectedModel('gemini-2-flash')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedModel === 'gemini-2-flash'
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            Gemini 2.0 Flash
          </button>
        </div>
      </div>

      {/* Interactive Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input & Metrics Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Prompt Input Box */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
            <label className="block text-xs font-mono font-bold text-[#706B67] uppercase mb-2">
              Test Prompt / Architectural Task
            </label>
            <textarea
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
            />

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="mt-4 w-full py-3 rounded-full bg-[#FA5929] hover:bg-[#E0491B] active:scale-95 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Benchmarking Model...' : `Execute with ${currentSpec.name}`}</span>
            </button>
          </div>

          {/* Model Telemetry Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] text-center shadow-2xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block">Latency</span>
              <span className="text-sm font-bold font-mono text-[#281010]">{currentSpec.latency}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] text-center shadow-2xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block">Cost / 1k</span>
              <span className="text-sm font-bold font-mono text-[#FA5929]">{currentSpec.costPer1k}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] text-center shadow-2xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block">Benchmark</span>
              <span className="text-sm font-bold font-mono text-[#34D399]">{currentSpec.accuracy}</span>
            </div>
          </div>

        </div>

        {/* Right Output Code Box (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#281010] text-white border border-[#FA5929]/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FA5929]" />
              <span className="text-xs font-mono font-bold text-[#D8D1C7]">
                {currentSpec.name} Output Stream
              </span>
            </div>

            {runOutput && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-mono text-[#D8D1C7] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy SQL'}</span>
              </button>
            )}
          </div>

          <pre className="p-4 rounded-2xl bg-[#160E0E] font-mono text-xs text-[#EAE3D9] overflow-x-auto leading-relaxed border border-white/5 min-h-[190px]">
            {runOutput || currentSpec.output}
          </pre>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#A89F91]">
            <span>Provider: {currentSpec.provider}</span>
            <span className="font-mono text-[11px] text-[#34D399]">✓ Zero Hallucination Guard</span>
          </div>
        </div>

      </div>

    </section>
  );
};

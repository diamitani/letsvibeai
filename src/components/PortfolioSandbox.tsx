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
    <div className="bg-white rounded-[32px] p-7 sm:p-9 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#4a4d4f]/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive AI Sandbox</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#101b24] font-sans">
            Model Benchmarking & <span className="text-[#ec4909]">Simulation Lab</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#4a4d4f]">
            Test and compare real-world reasoning, latency, and token costs across leading frontier models.
          </p>
        </div>

        {/* Model Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#f7f4f2] p-1.5 rounded-full border border-[#4a4d4f]/10">
          <button
            onClick={() => setSelectedModel('claude-3-7')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedModel === 'claude-3-7'
                ? 'bg-[#101b24] text-white shadow-xs'
                : 'text-[#4a4d4f] hover:text-[#101b24]'
            }`}
          >
            Claude 3.7
          </button>

          <button
            onClick={() => setSelectedModel('gpt-4-5')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedModel === 'gpt-4-5'
                ? 'bg-[#101b24] text-white shadow-xs'
                : 'text-[#4a4d4f] hover:text-[#101b24]'
            }`}
          >
            GPT-4.5
          </button>

          <button
            onClick={() => setSelectedModel('gemini-2-flash')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedModel === 'gemini-2-flash'
                ? 'bg-[#101b24] text-white shadow-xs'
                : 'text-[#4a4d4f] hover:text-[#101b24]'
            }`}
          >
            Gemini 2.0
          </button>
        </div>
      </div>

      {/* Model Specs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 text-xs">
        <div>
          <span className="text-[#4a4d4f] text-[11px] block">Provider</span>
          <strong className="text-[#101b24] font-bold">{currentSpec.provider}</strong>
        </div>
        <div>
          <span className="text-[#4a4d4f] text-[11px] block">p95 Latency</span>
          <strong className="text-[#ec4909] font-mono font-bold">{currentSpec.latency}</strong>
        </div>
        <div>
          <span className="text-[#4a4d4f] text-[11px] block">Cost / 1k Tokens</span>
          <strong className="text-[#101b24] font-mono font-bold">{currentSpec.costPer1k}</strong>
        </div>
        <div>
          <span className="text-[#4a4d4f] text-[11px] block">Eval Accuracy</span>
          <strong className="text-[#15803d] font-mono font-bold">{currentSpec.accuracy}</strong>
        </div>
      </div>

      {/* Input Prompt Box */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#101b24] block">
          Simulation Prompt
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-[#f7f4f2] border border-[#4a4d4f]/10 text-xs text-[#101b24] focus:outline-none focus:border-[#ec4909]"
            placeholder="Enter simulation task or prompt..."
          />
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-6 py-3 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-95 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Execute'}</span>
          </button>
        </div>
      </div>

      {/* Output Console */}
      {runOutput && (
        <div className="space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#4a4d4f]">Generated Blueprint</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-full bg-[#f7f4f2] hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#15803d]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-[#101b24] text-white font-mono text-xs overflow-x-auto leading-relaxed border border-black/10">
            {runOutput}
          </pre>
        </div>
      )}

    </div>
  );
};

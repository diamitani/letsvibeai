import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  Sparkles,
  Terminal,
  Code2,
  Clock,
  Layers,
  FileCode,
  ArrowRight
} from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(35);

  const chapters = [
    {
      id: 0,
      timestamp: '00:00',
      title: 'Vibe Coding Fundamentals',
      summary: 'Prompting mental models, context scoping, and instruction pack structure.',
      codeSnippet: `// 1. Define high-fidelity intent spec\nconst intent = {\n  domain: "letsvibeai.com",\n  tenancy: "tenant_isolated",\n  database: "postgres_rls"\n};`
    },
    {
      id: 1,
      timestamp: '04:20',
      title: 'Agent Harnesses & Tools',
      summary: 'Configuring Claude Code, Antigravity SDK, and Model Context Protocol servers.',
      codeSnippet: `// 2. Initialize MCP server connector\nimport { MCPServer } from '@modelcontextprotocol/sdk';\nconst server = new MCPServer({ tools: [stripeBilling, databaseVault] });`
    },
    {
      id: 2,
      timestamp: '11:45',
      title: 'Supabase RLS & Auth Vault',
      summary: 'Writing bulletproof row-level policies so workspace data never leaks.',
      codeSnippet: `// 3. Row-Level Security isolation policy\nCREATE POLICY "tenant_guard" ON workspaces\nFOR ALL USING (auth.uid() = owner_id);`
    },
    {
      id: 3,
      timestamp: '18:30',
      title: 'Stripe Webhooks & Scale',
      summary: 'Handling idempotent webhooks, tax calculations, and self-serve billing.',
      codeSnippet: `// 4. Idempotent webhook handler\nconst session = await stripe.checkout.sessions.create({\n  client_reference_id: workspaceId\n});`
    }
  ];

  const currentChapter = chapters[activeChapter];

  return (
    <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Masterclass Theater</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Live Coding <span className="text-[#FA5929]">Demonstration</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            Watch complete SaaS platforms built in real-time using modern AI agents and verified infrastructure.
          </p>
        </div>

        {/* Chapter Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChapter(ch.id);
                setProgress(ch.id * 25 + 15);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeChapter === ch.id
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              {ch.timestamp} · {ch.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Cinema Player & Code Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cinema Screen (7 cols) */}
        <div className="lg:col-span-7 bg-[#281010] rounded-3xl p-6 text-white border border-[#FA5929]/20 shadow-2xl relative overflow-hidden">
          
          {/* Simulated Screen Area */}
          <div className="aspect-video bg-[#160E0E] rounded-2xl border border-white/5 relative flex flex-col justify-between p-5 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold">
                CHAPTER 0{activeChapter + 1}
              </span>
              <span className="text-xs font-mono text-[#FA5929] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FA5929] animate-ping" />
                4K HD STREAM
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="text-center my-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#FA5929] hover:bg-[#E0491B] active:scale-95 text-white flex items-center justify-center mx-auto shadow-xl shadow-[#FA5929]/30 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>
              <h4 className="text-base font-bold text-white font-heading mt-3">
                {currentChapter.title}
              </h4>
            </div>

            {/* Bottom Scrubber & Controls */}
            <div className="space-y-2">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-[#FA5929] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#D8D1C7]">
                <span>{currentChapter.timestamp} / 28:40</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <Maximize className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#D8D1C7] mt-4 leading-relaxed">
            {currentChapter.summary}
          </p>
        </div>

        {/* Right: Synchronized Code Stream (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#FA5929]" />
              <h4 className="text-sm font-bold text-[#281010] font-heading">
                Synchronized Code Stream
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
              LIVE
            </span>
          </div>

          <pre className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] font-mono text-xs text-[#281010] overflow-x-auto leading-relaxed max-h-[220px]">
            {currentChapter.codeSnippet}
          </pre>

          {/* Key Takeaways */}
          <div className="pt-3 border-t border-[#EAE3D9] space-y-2 text-xs text-[#706B67]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Full copy-pasteable TypeScript template</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Tested on Node.js 20 and Bun runtimes</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

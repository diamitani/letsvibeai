import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
  Code2,
  Lock,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

export const ArchitectureMap: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const stages = [
    {
      id: 0,
      phase: 'STAGE 01',
      title: 'Parse & Ingest',
      subtitle: 'Extract explicit specifications and constraints',
      details: [
        'Audience classification and technical stack choice',
        'Functional scope boundaries and non-goals',
        'Initial intake record with immutability stamp'
      ],
      schema: {
        stage: '01_parse',
        status: 'validated',
        intake: {
          audience: 'Founders & Engineers',
          stack: 'React 19 + Supabase + Stripe',
          nonGoals: ['No multi-region active-active on day 1']
        }
      }
    },
    {
      id: 1,
      phase: 'STAGE 02',
      title: 'Ambiguity Scan',
      subtitle: 'Identify missing tenancy, billing, and auth details',
      details: [
        'Auth provider failover and recovery flows',
        'Stripe webhook idempotency keys',
        'Postgres Row-Level Security tenancy boundary'
      ],
      schema: {
        stage: '02_ambiguity_scan',
        status: 'resolved',
        clarifications: {
          tenancy: 'org_id isolated with RLS',
          billing: 'Stripe webhook is single source of truth',
          auth: 'OAuth + passwordless magic link fallback'
        }
      }
    },
    {
      id: 2,
      phase: 'STAGE 03',
      title: 'Expand Architecture',
      subtitle: 'Design data models, security threat models, and cost path',
      details: [
        'C4 L1-L3 system topology diagram',
        '10-table relational schema with foreign key constraints',
        'OpenAPI 3.1 & tRPC typed endpoint definitions'
      ],
      schema: {
        stage: '03_expand',
        status: 'compiled',
        topology: {
          edge: 'Cloudflare / Vercel Edge',
          database: 'Postgres 16 with pgvector',
          jobs: 'Inngest / Trigger.dev async runners'
        }
      }
    },
    {
      id: 3,
      phase: 'STAGE 04',
      title: 'Compile NPAO',
      subtitle: 'Produce executable instruction pack and automated test fixtures',
      details: [
        'Complete PRD and build playbook',
        'Agent prompt pack for Claude Code & Antigravity',
        'Automated CI contract and accessibility tests'
      ],
      schema: {
        stage: '04_compile_npao',
        status: 'production_ready',
        artifacts: [
          'docs/08-prd.md',
          'docs/10-architecture.md',
          'docs/12-data-model.md',
          'docs/24-instruction-pack.md'
        ]
      }
    }
  ];

  const currentStage = stages[activeStage];

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(currentStage.schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Doctrine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            The PAL <span className="text-[#FA5929]">Pipeline & Blueprint</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            Parse, Ambiguity Scan, Latent Intent, Expand, and Compile before writing production code.
          </p>
        </div>

        {/* 4 Stage Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          {stages.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeStage === st.id
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              {st.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 2-Column Stage Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Stage Breakdown (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-8 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60">
              {currentStage.phase}
            </span>

            <h3 className="text-2xl font-black text-[#281010] font-heading mt-2 mb-1">
              {currentStage.title}
            </h3>
            <p className="text-xs text-[#706B67] mb-6">{currentStage.subtitle}</p>

            <div className="space-y-3 pt-4 border-t border-[#EAE3D9]">
              {currentStage.details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-[#281010]">
                  <CheckCircle2 className="w-4 h-4 text-[#FA5929] shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Navigation Switcher */}
            <div className="mt-8 pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                disabled={activeStage === 0}
                className="px-4 py-2 rounded-full bg-[#F8F3EC] text-xs font-bold text-[#706B67] hover:text-[#281010] disabled:opacity-30 border border-[#EAE3D9]"
              >
                ← Previous Stage
              </button>

              <span className="text-xs font-mono font-bold text-[#281010]">
                {activeStage + 1} of {stages.length}
              </span>

              <button
                onClick={() => setActiveStage((prev) => Math.min(stages.length - 1, prev + 1))}
                disabled={activeStage === stages.length - 1}
                className="px-4 py-2 rounded-full bg-[#FA5929] text-xs font-bold text-white hover:bg-[#E0491B] disabled:opacity-30 shadow-xs"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Compiled JSON Spec (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#281010] text-white border border-[#FA5929]/20 shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FA5929]" />
              <span className="text-xs font-mono font-bold text-[#D8D1C7]">
                pal-manifest.{currentStage.phase.toLowerCase().replace(' ', '_')}.json
              </span>
            </div>

            <button
              onClick={handleCopySchema}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-mono text-[#D8D1C7] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#160E0E] font-mono text-xs text-[#EAE3D9] overflow-x-auto leading-relaxed border border-white/5 max-h-[300px]">
            {JSON.stringify(currentStage.schema, null, 2)}
          </pre>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#A89F91]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#34D399]" />
              <span>Immutable Artifact Checksum Verified</span>
            </span>
            <span className="font-mono text-[11px] text-[#FA5929]">PAL-v1.0.0</span>
          </div>
        </div>

      </div>

    </section>
  );
};

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

  const current = stages[activeStage];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(current.schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[32px] p-7 sm:p-9 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#4a4d4f]/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Doctrine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#101b24] font-sans">
            The PAL <span className="text-[#ec4909]">Pipeline Architecture</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#4a4d4f]">
            Parse → Ambiguity Scan → Expand → Compile. Our systematic doctrine for building autonomous systems.
          </p>
        </div>

        {/* Stage Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#f7f4f2] p-1.5 rounded-full border border-[#4a4d4f]/10">
          {stages.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeStage === st.id
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24]'
              }`}
            >
              {st.phase}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Visual Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#ec4909] uppercase">
              {current.phase}
            </span>
            <h4 className="text-xl font-bold text-[#101b24] mt-0.5">
              {current.title}
            </h4>
            <p className="text-xs text-[#4a4d4f] mt-1">{current.subtitle}</p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#4a4d4f]/10">
            {current.details.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#101b24]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ec4909] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right JSON Schema Output (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#4a4d4f]">stage_contract.json</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-full bg-[#f7f4f2] hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#15803d]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#101b24] text-[#f7f4f2] font-mono text-xs overflow-x-auto leading-relaxed border border-black/10 min-h-[220px]">
            {JSON.stringify(current.schema, null, 2)}
          </pre>
        </div>

      </div>

    </div>
  );
};

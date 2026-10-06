import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  Code2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const DocumentStackViewer: React.FC = () => {
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const documents = [
    {
      id: '01',
      filename: 'docs/01-intent-spec.md',
      title: 'Intent Specification',
      owner: 'Product Lead',
      summary: 'Problem statement, audience, scope boundaries, non-goals, and acceptance signals.',
      content: `# Document: 01-intent-spec.md\nStatus: Approved\nOwner: Product Lead\n\n## 1. Problem Statement\nStrangers must understand the offer in 5 seconds and deploy working software within 3 minutes.\n\n## 2. Target Audience\nFounders, indie hackers, and software engineers building commercial autonomous systems.`
    },
    {
      id: '08',
      filename: 'docs/08-prd.md',
      title: 'Product Requirements (PRD)',
      owner: 'Product Lead',
      summary: 'Outcome metrics, numbered functional requirements FR-001 to FR-040, and rollout phases.',
      content: `# Document: 08-prd.md\nStatus: Approved\nOwner: Product Lead\n\n## 1. Functional Requirements\n- FR-01: One-click OAuth login via Supabase Auth.\n- FR-02: Stripe Checkout session creation on server with idempotency key.\n- FR-03: Autonomous agent runner dispatch via WebSocket stream.`
    },
    {
      id: '10',
      filename: 'docs/10-architecture.md',
      title: 'System Architecture',
      owner: 'Eng Lead',
      summary: 'C4 L1-L3 system topology, sequence diagrams, failure recovery, and cell scaling paths.',
      content: `# Document: 10-architecture.md\nStatus: Approved\nOwner: Eng Lead\n\n## 1. Logical Layers\n1. Edge (Cloudflare WAF + CDN)\n2. Experience (React 19 + Next.js App Router)\n3. Domain (TypeScript billing, tenancy policies)\n4. Data (Postgres 16 + RLS + pgvector)`
    },
    {
      id: '12',
      filename: 'docs/12-data-model.md',
      title: 'Data Model & RLS',
      owner: 'Data Architect',
      summary: 'Relational entity diagrams, Row-Level Security policies, and migration runbooks.',
      content: `# Document: 12-data-model.md\nStatus: Approved\nOwner: Data Architect\n\n## 1. Core Tables\n- workspaces (id, name, owner_id, plan, created_at)\n- entitlements (id, workspace_id, feature_flag, expires_at)\n- agent_runs (id, workspace_id, status, credits_used)`
    },
    {
      id: '16',
      filename: 'docs/16-payments.md',
      title: 'Commerce & Stripe Spec',
      owner: 'GTM Lead',
      summary: 'Price catalog, tax calculation, webhook idempotency, refund policies, and portal links.',
      content: `# Document: 16-payments.md\nStatus: Approved\nOwner: GTM Lead\n\n## 1. Webhook Lifecycle\n- checkout.session.completed: Upsert entitlement record idempotently.\n- invoice.payment_failed: Set workspace to grace period and notify admin.`
    },
    {
      id: '24',
      filename: 'docs/24-instruction-pack.md',
      title: 'Agent Instruction Pack',
      owner: 'Agent Lead',
      summary: 'Agent soul, prohibited actions, phased prompts, and automated test fixtures.',
      content: `# Document: 24-instruction-pack.md\nStatus: Approved\nOwner: Agent Lead\n\n## 1. Non-Negotiable Invariants\n1. PAL precedes execution.\n2. Secrets never live in git or client bundles.\n3. Zero em-dashes anywhere in user-facing copy.`
    }
  ];

  const currentDoc = documents[activeDocIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="docs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <FileText className="w-3.5 h-3.5" />
            <span>Architecture Artifacts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Production Document <span className="text-[#FA5929]">Stack</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            Explore the exact specifications and PRD templates included in the course downloads.
          </p>
        </div>

        {/* Document Selection Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          {documents.map((doc, idx) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeDocIndex === idx
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              Doc {doc.id}
            </button>
          ))}
        </div>
      </div>

      {/* Document Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Metadata & Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60">
            {currentDoc.filename}
          </span>
          <h3 className="text-xl font-bold text-[#281010] font-heading">{currentDoc.title}</h3>
          <p className="text-xs text-[#706B67] leading-relaxed">{currentDoc.summary}</p>

          <div className="pt-4 border-t border-[#EAE3D9] space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#706B67]">
              <span>Document Owner:</span>
              <strong className="text-[#281010]">{currentDoc.owner}</strong>
            </div>
            <div className="flex items-center justify-between text-[#706B67]">
              <span>Verification Gate:</span>
              <strong className="text-[#34D399]">Well-Architected Pass</strong>
            </div>
          </div>
        </div>

        {/* Right: Markdown Content Viewer (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#281010] text-white border border-[#FA5929]/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-[#D8D1C7]">{currentDoc.filename}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-mono text-[#D8D1C7] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Doc'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#160E0E] font-mono text-xs text-[#EAE3D9] overflow-x-auto leading-relaxed border border-white/5 max-h-[260px]">
            {currentDoc.content}
          </pre>
        </div>

      </div>

    </section>
  );
};

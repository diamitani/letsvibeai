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
    <div className="bg-white rounded-[32px] p-7 sm:p-9 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#4a4d4f]/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Architecture Artifacts</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#101b24] font-sans">
            Production Document <span className="text-[#ec4909]">Stack</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#4a4d4f]">
            Explore the exact specifications and PRD templates included in the verified course downloads.
          </p>
        </div>

        {/* Document Selection Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#f7f4f2] p-1.5 rounded-full border border-[#4a4d4f]/10">
          {documents.map((doc, idx) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeDocIndex === idx
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24]'
              }`}
            >
              Doc {doc.id}
            </button>
          ))}
        </div>
      </div>

      {/* Document Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Metadata (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#ec4909] uppercase">
              {currentDoc.filename}
            </span>
            <h4 className="text-xl font-bold text-[#101b24] mt-0.5">
              {currentDoc.title}
            </h4>
            <p className="text-xs text-[#4a4d4f] mt-1">{currentDoc.summary}</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#4a4d4f]/10 text-xs text-[#101b24]">
            <div className="flex items-center justify-between">
              <span className="text-[#4a4d4f]">Document Owner:</span>
              <strong className="font-bold">{currentDoc.owner}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4a4d4f]">Review Status:</span>
              <span className="px-2 py-0.5 rounded-full bg-[#34D399]/20 text-[#15803d] font-bold text-[10px]">
                Approved v1.0
              </span>
            </div>
          </div>
        </div>

        {/* Right Markdown Viewer (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#4a4d4f]">{currentDoc.filename}</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-full bg-[#f7f4f2] hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#15803d]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#101b24] text-[#f7f4f2] font-mono text-xs overflow-x-auto leading-relaxed border border-black/10 min-h-[220px]">
            {currentDoc.content}
          </pre>
        </div>

      </div>

    </div>
  );
};

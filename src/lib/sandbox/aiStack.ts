/**
 * Backend Sandbox Vercel AI Stack
 * Provides execution harness, streaming simulations, tool schemas, and portfolio projects
 */

export interface PortfolioProject {
  id: string;
  title: string;
  founder: string;
  role: string;
  category: string;
  monthlyRevenue: string;
  summary: string;
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    aiGateway: string;
    auth: string;
    payments: string;
  };
  samplePrompt: string;
  simulatedOutput: string;
  toolsUsed: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'ai-counsel',
    title: 'AI Counsel — Contract Redliner',
    founder: 'Elena Rostova',
    role: 'Former Product Marketing Lead',
    category: 'LegalTech SaaS',
    monthlyRevenue: '$4,200 / mo',
    summary: 'Upload commercial vendor agreements, extract non-standard indemnity clauses, and generate attorney-grade redline suggestions.',
    techStack: {
      frontend: 'Next.js 15 App Router + Tailwind',
      backend: 'Vercel Server Actions + Edge Functions',
      database: 'Supabase Postgres + RLS (Encrypted vaults)',
      aiGateway: 'Vercel AI SDK + Anthropic Claude 3.7 Sonnet',
      auth: 'Supabase Auth (Magic Links + 2FA)',
      payments: 'Stripe Billing ($49/mo Starter, $199/mo Pro)'
    },
    samplePrompt: 'Analyze this standard SaaS Master Services Agreement (MSA). Flag clauses where indemnification is uncapped, and propose balanced reciprocal language.',
    simulatedOutput: `[Vercel AI SDK: Tool Call -> extract_clauses]
Found 14 contract sections. Analyzing Section 8 (Indemnification)...

⚠️ CRITICAL RISK DETECTED:
Section 8.2 states: "Customer agrees to defend and indemnify Provider from any third-party claims without limitation."

REVISION RECOMMENDED:
"Each party shall defend, indemnify, and hold harmless the other party from and against third-party claims arising from gross negligence or intentional misconduct, subject to the Liability Cap in Section 9."`,
    toolsUsed: ['extract_clauses', 'verify_precedents', 'generate_diff']
  },
  {
    id: 'supply-sync',
    title: 'SupplySync — Autonomous PO Agent',
    founder: 'Marcus Vance',
    role: 'Operations Director',
    category: 'B2B Logistics',
    monthlyRevenue: '$8,500 / mo',
    summary: 'Monitors warehouse stock thresholds via Postgres webhooks and automatically drafts vendor purchase orders when inventory dips below safety margins.',
    techStack: {
      frontend: 'Vite + React + Tailwind + Lucide',
      backend: 'Node.js Express + Vercel Functions',
      database: 'Postgres on Neon with strict RLS',
      aiGateway: 'Vercel AI SDK + OpenAI GPT-4o',
      auth: 'Clerk Organizations with Multi-Tenancy',
      payments: 'Stripe Metered Usage ($0.10 / PO generated)'
    },
    samplePrompt: 'SKU #A49-CopperWire is down to 42 units (safety stock: 100). Draft a Purchase Order to Primary Vendor (Apex Alloys) for 200 units with Net-30 terms.',
    simulatedOutput: `[Vercel AI SDK: Tool Call -> check_supplier_catalog]
Apex Alloys catalog confirmed: Unit price $14.20. Minimum order quantity 100 units.

[Vercel AI SDK: Tool Call -> draft_purchase_order]
Purchase Order #PO-2026-892 created:
- Item: SKU #A49-CopperWire
- Quantity: 200 units @ $14.20 = $2,840.00
- Terms: Net-30 FOB Destination
- Status: Staged for Operator Approval (Human-in-the-loop)`,
    toolsUsed: ['check_supplier_catalog', 'draft_purchase_order', 'notify_slack']
  },
  {
    id: 'clinical-summaries',
    title: 'ClinicalSummaries — Bio-Paper Synthesizer',
    founder: 'Dr. Sophia Chen',
    role: 'Biotech Researcher',
    category: 'BioTech / Research',
    monthlyRevenue: '$3,100 / mo',
    summary: 'Summarizes 50-page clinical trial publications into structured patient eligibility criteria and adverse event matrices using massive context window routing.',
    techStack: {
      frontend: 'Next.js + shadcn/ui + Tailwind',
      backend: 'Next.js Route Handlers',
      database: 'Supabase Postgres with pgvector for embeddings',
      aiGateway: 'Vercel AI SDK + Google Gemini 2.5 Flash',
      auth: 'Supabase Auth with strict HIPAA audit logging',
      payments: 'Stripe Subscriptions ($29/mo Researcher tier)'
    },
    samplePrompt: 'Extract inclusion and exclusion criteria for Phase III immunotherapy trial NCT0482910, focusing on prior checkpoint inhibitor exposure.',
    simulatedOutput: `[Vercel AI SDK: Tool Call -> vector_search_trial_docs]
Retrieved 6 relevant trial protocol sections with pgvector cosine similarity > 0.88.

INCLUSION CRITERIA:
1. Confirmed histological diagnosis of metastatic melanoma.
2. ECOG performance status 0 or 1.
3. Age ≥ 18 years at time of signed consent.

EXCLUSION CRITERIA:
1. Prior exposure to anti-PD-1 or anti-CTLA-4 within 28 days of cycle 1.
2. Active symptomatic central nervous system metastases.`,
    toolsUsed: ['vector_search_trial_docs', 'verify_mesh_terms', 'audit_log_access']
  }
];

export class VercelAiSandboxEngine {
  /**
   * Simulates streaming response from Vercel AI SDK streamText endpoint
   */
  public static async executeSandboxStream(
    prompt: string,
    modelName: string,
    onTokenChunk: (chunk: string) => void
  ): Promise<{ totalTokens: number; latencyMs: number; toolCalls: string[] }> {
    const startTime = performance.now();
    
    // Simulated token generation with realistic pacing
    const tokens = [
      `[Vercel AI SDK] Initializing stream with model: ${modelName}...\n`,
      `[Gateway] Connecting to provider via secure TLS with streaming response enabled.\n\n`,
      `Evaluating prompt against architecture guidelines...\n`,
      `> Input: "${prompt}"\n\n`,
      `[AI Agent Reasoning]: Analyzing request and invoking necessary tools...\n`,
      `✓ Tool: query_supabase_rls(table: "projects", permission: "read_own")\n`,
      `✓ Tool: verify_stripe_entitlement(status: "active", plan: "pro")\n\n`,
      `[Output Stream]:\n`,
      `Based on the provided specification, the solution requires a 3-layer architecture: `,
      `1. A Next.js App Router client with responsive Tailwind CSS components. `,
      `2. A secure Server Action validating incoming requests with Zod schemas. `,
      `3. Postgres tables protected with Row Level Security ensuring tenant isolation.\n\n`,
      `Execution complete with 0 security warnings and 100% test coverage.`
    ];

    for (const chunk of tokens) {
      onTokenChunk(chunk);
      await new Promise(resolve => setTimeout(resolve, 80));
    }

    const latencyMs = Math.round(performance.now() - startTime);

    return {
      totalTokens: 342,
      latencyMs,
      toolCalls: ['query_supabase_rls', 'verify_stripe_entitlement']
    };
  }
}

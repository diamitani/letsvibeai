/**
 * ROSTR v2 Specification & Runtime Types
 * Runtime, Orchestration, State, Tools, and Reference
 */

export type AgentRole = 'builder' | 'researcher' | 'reviewer' | 'designer' | 'deployer' | 'debugger' | 'coach';

export type LifecyclePhase = 'PreD' | 'D1' | 'D2' | 'D3' | 'D4';
// PreD: Envision | D1: Discover | D2: Design | D3: Develop | D4: Deploy

export type NpaoPriority = 'necessity' | 'anxiety' | 'priority' | 'opportunity';

export type SourceTier = 'tier1' | 'tier2' | 'tier3';

export interface SourceCitation {
  id: string;
  title: string;
  sourceUrl?: string;
  tier: SourceTier;
  credibilityWeight: number; // Tier 1 = 1.0, Tier 2 = 0.75, Tier 3 = 0.40
  excerpt: string;
  verifiedAt: string;
}

export interface PalManifest {
  id: string;
  project_id: string;
  created_at: string;
  runtime: {
    agent_type: AgentRole;
    model: string;
    temperature: number;
    max_tokens?: number;
  };
  intent: {
    raw_input: string;
    normalized_goal: string;
    domain_signals: string[];
    ambiguity_score: number; // 0.0 (crystal clear) to 1.0 (vague)
  };
  instructions: {
    task_description: string;
    completion_criteria: string[];
    definition_of_done: string;
    escalation_policy: 'require_approval' | 'auto_proceed' | 'human_in_the_loop';
  };
  tools_enabled: {
    allow: string[];
    deny: string[];
  };
  memory: {
    mode: 'session' | 'project' | 'persistent';
    context_sources: string[];
    namespace: string;
  };
  npao_classification: {
    priority: NpaoPriority;
    phase: LifecyclePhase;
    friction_notes: string;
  };
}

export interface RagDalResult {
  query: string;
  passesCompleted: number; // 1 to 4 passes
  convergenceStatus: 'converged' | 'gap_filled' | 'uncertain' | 'boundary_fallback';
  confidenceScore: number; // 0.0 to 1.0 based on formula
  citations: SourceCitation[];
  groundedSummary: string;
}

export interface NpaoTask {
  id: string;
  title: string;
  category: NpaoPriority;
  phase: LifecyclePhase;
  reason: string;
  completed: boolean;
}

export interface ContextEngineLogEntry {
  timestamp: string;
  run_id: string;
  actor: string;
  action: string;
  status: 'pending' | 'success' | 'escalation' | 'error';
  metadata: Record<string, unknown>;
}

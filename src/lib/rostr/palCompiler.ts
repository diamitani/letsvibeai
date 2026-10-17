import { PalManifest, AgentRole, NpaoPriority, LifecyclePhase } from './types';
import { RagDalEngine } from './ragDal';

export class PalCompiler {
  /**
   * Compiles natural language input into a strictly typed ROSTR v2 PAL Manifest
   */
  public static compile(rawInput: string, targetRole: AgentRole = 'builder'): PalManifest {
    const trimmed = rawInput.trim();
    
    // Stage 1: Intent Extraction & Ambiguity Scoring
    const words = trimmed.split(/\s+/);
    let ambiguity = 0.7; // Default medium-high ambiguity for casual prompts
    
    // Check for explicit technical signals
    const signals: string[] = [];
    if (/supabase|postgres|sql|database/i.test(trimmed)) signals.push('Database:Postgres');
    if (/auth|login|signup|oauth/i.test(trimmed)) signals.push('Auth:OAuth');
    if (/stripe|payment|checkout|subscription/i.test(trimmed)) signals.push('Payments:Stripe');
    if (/ai|agent|llm|claude|openai/i.test(trimmed)) signals.push('AI:VercelAISDK');
    if (/next\.?js|react|tailwind/i.test(trimmed)) signals.push('FrontEnd:NextJS');

    // Reduce ambiguity if specific signals and criteria are present
    if (signals.length >= 3) ambiguity -= 0.35;
    if (words.length > 25) ambiguity -= 0.15;
    ambiguity = Math.max(0.1, Number(ambiguity.toFixed(2)));

    // Stage 2: Context Injection via RAG DAL
    const ragResult = RagDalEngine.query(trimmed);

    // Stage 3: Semantic Enhancement
    const taskDescription = `Execute vertical slice build for: "${trimmed}". Grounded in architecture specifications with zero secret leakage and enforced row-level security.`;

    const completionCriteria = [
      'Schema defined in Supabase Postgres with RLS policies verified',
      'API route validates incoming request with Zod schema',
      'All provider secret keys stored strictly in server environment variables',
      'User interface adheres to design-taste-frontend anti-slop rules'
    ];

    // Stage 4 & 5: Runtime Compilation & Deterministic NPAO Routing
    let priority: NpaoPriority = 'priority';
    let phase: LifecyclePhase = 'D3'; // Develop

    if (/bug|fix|error|fail|broken/i.test(trimmed)) {
      priority = 'necessity';
      phase = 'D3';
    } else if (/plan|scope|architect|prd|spec/i.test(trimmed)) {
      priority = 'anxiety';
      phase = 'D2'; // Design
    } else if (/deploy|launch|ship|domain/i.test(trimmed)) {
      priority = 'priority';
      phase = 'D4'; // Deploy
    }

    const manifest: PalManifest = {
      id: `pal-${Date.now().toString(36)}`,
      project_id: 'letsvibeai-workspace',
      created_at: new Date().toISOString(),
      runtime: {
        agent_type: targetRole,
        model: 'claude-3-7-sonnet',
        temperature: 0.2,
        max_tokens: 4000
      },
      intent: {
        raw_input: trimmed,
        normalized_goal: `Production-ready implementation of ${trimmed}`,
        domain_signals: signals.length > 0 ? signals : ['Architecture:Standard-11-Block'],
        ambiguity_score: ambiguity
      },
      instructions: {
        task_description: taskDescription,
        completion_criteria: completionCriteria,
        definition_of_done: '0 TypeScript compilation errors, passing automated test, and verified server-side secret boundaries.',
        escalation_policy: ambiguity > 0.5 ? 'require_approval' : 'auto_proceed'
      },
      tools_enabled: {
        allow: ['filesystem_read', 'filesystem_write', 'execute_command', 'rag_dal_query', 'supabase_query'],
        deny: ['production_db_drop', 'force_push_main', 'expose_client_secrets']
      },
      memory: {
        mode: 'project',
        context_sources: ['/context/00-project-brief.md', '/docs/04-system-architecture.md'],
        namespace: 'letsvibeai/student-projects'
      },
      npao_classification: {
        priority,
        phase,
        friction_notes: ambiguity > 0.5 ? 'High ambiguity detected. Clarification interview recommended before coding.' : 'Clear specifications. Proceed to execution.'
      }
    };

    return manifest;
  }
}

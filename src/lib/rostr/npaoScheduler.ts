import { NpaoPriority, LifecyclePhase, NpaoTask } from './types';

export class NpaoScheduler {
  /**
   * Sorts and sequences tasks according to ROSTR NPAO priority rules
   */
  public static sequence(tasks: NpaoTask[]): NpaoTask[] {
    const priorityWeight: Record<NpaoPriority, number> = {
      necessity: 1, // Resolves blockers & failures first
      anxiety: 2,   // Clears ambiguities & friction second
      priority: 3,  // Core deliverables third
      opportunity: 4 // Extensions fourth
    };

    const phaseWeight: Record<LifecyclePhase, number> = {
      PreD: 1,
      D1: 2,
      D2: 3,
      D3: 4,
      D4: 5
    };

    return [...tasks].sort((a, b) => {
      // First sort by completion (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then sort by NPAO priority
      if (priorityWeight[a.category] !== priorityWeight[b.category]) {
        return priorityWeight[a.category] - priorityWeight[b.category];
      }
      // Then sort by 5D phase
      return phaseWeight[a.phase] - phaseWeight[b.phase];
    });
  }

  /**
   * Default initial Capstone tasks mapped into NPAO
   */
  public static getDefaultCapstoneTasks(): NpaoTask[] {
    return [
      {
        id: 't-1',
        title: 'Draft Project Brief & 11 Planning Docs via PAL',
        category: 'anxiety',
        phase: 'D2',
        reason: 'Resolves vague requirements and eliminates guesswork before touching code.',
        completed: true
      },
      {
        id: 't-2',
        title: 'Configure Supabase Schema & Enable RLS on all tables',
        category: 'necessity',
        phase: 'D3',
        reason: 'Hard security blocker: prevents multi-tenant data leakage from day 1.',
        completed: true
      },
      {
        id: 't-3',
        title: 'Implement Core Agent Loop with Vercel AI SDK',
        category: 'priority',
        phase: 'D3',
        reason: 'Primary product value driver: provides the core interactive job to be done.',
        completed: false
      },
      {
        id: 't-4',
        title: 'Configure Stripe Checkout & Verify Webhook Signing',
        category: 'priority',
        phase: 'D3',
        reason: 'Revenue enablement: verifies paid entitlement activation.',
        completed: false
      },
      {
        id: 't-5',
        title: 'Run Pre-Launch Checklist & Deploy to Edge on Vercel',
        category: 'necessity',
        phase: 'D4',
        reason: 'Required quality gate before public customer access.',
        completed: false
      },
      {
        id: 't-6',
        title: 'Add Voice Synthesis (ElevenLabs) & Multi-Model Fallbacks',
        category: 'opportunity',
        phase: 'D4',
        reason: 'Exciting enhancement once core revenue pipeline is verified and stable.',
        completed: false
      }
    ];
  }
}

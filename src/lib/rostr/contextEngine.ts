import { ContextEngineLogEntry } from './types';

export class ContextEngine {
  private static STORAGE_KEY = 'rostr_context_engine_logs';

  public static getLogs(): ContextEngineLogEntry[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return this.getDefaultInitialLogs();
      return JSON.parse(data);
    } catch {
      return this.getDefaultInitialLogs();
    }
  }

  public static append(actor: string, action: string, status: 'pending' | 'success' | 'escalation' | 'error', metadata: Record<string, unknown> = {}): ContextEngineLogEntry {
    const entry: ContextEngineLogEntry = {
      timestamp: new Date().toISOString(),
      run_id: `run-${Date.now().toString(36)}`,
      actor,
      action,
      status,
      metadata
    };

    const current = this.getLogs();
    const updated = [entry, ...current].slice(0, 50); // Keep last 50 entries
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }
    return entry;
  }

  public static clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {}
  }

  private static getDefaultInitialLogs(): ContextEngineLogEntry[] {
    return [
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        run_id: 'run-init-001',
        actor: 'ROSTR-PAL-Compiler',
        action: 'Compiled student intake brief into PalManifest v2',
        status: 'success',
        metadata: { ambiguity_score: 0.18, target_phase: 'D2' }
      },
      {
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        run_id: 'run-rag-002',
        actor: 'RAG-DAL-Convergence',
        action: 'Retrieved 3 Tier-1 architecture specifications for Supabase RLS',
        status: 'success',
        metadata: { confidence: 0.94, sources: ['Module 4', 'Supabase Docs'] }
      },
      {
        timestamp: new Date(Date.now() - 600000).toISOString(),
        run_id: 'run-npao-003',
        actor: 'NPAO-Sequencer',
        action: 'Classified 6 Capstone tasks into 5D phases with Necessity first',
        status: 'success',
        metadata: { blockers_count: 2 }
      }
    ];
  }
}

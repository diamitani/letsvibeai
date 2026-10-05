import { PalManifest } from '../runtime/pal';

/**
 * NPAO (Necessity -> Anxiety -> Priority -> Opportunity) Task Router
 * Sequences tasks based on cognitive drag and 5D lifecycle, not just naive urgency.
 */

export function routeTask(manifest: PalManifest) {
  console.log(`[ROSTR Router] Routing task in phase: ${manifest.phase}`);

  // Simple routing logic based on NPAO rules
  if (manifest.phase === 'PreD' || manifest.phase === 'Design') {
    return {
      route: 'Designer',
      priority: 'ANXIETY', // High cognitive drag, need clear specs
      instructions: "Do not write production code yet. Output specs and architecture."
    };
  }

  if (manifest.phase === 'Debugging') {
    return {
      route: 'Debugger',
      priority: 'NECESSITY', // Hard blockers must be resolved first
      instructions: "Root-cause analysis required. Resolve blocker."
    };
  }

  if (manifest.phase === 'Development' || manifest.phase === 'Deployment') {
    return {
      route: 'Builder',
      priority: 'PRIORITY', // Core mission deliverables
      instructions: "Execute build and deployment steps safely."
    };
  }

  return {
    route: 'Researcher',
    priority: 'OPPORTUNITY',
    instructions: "General task or exploration."
  };
}

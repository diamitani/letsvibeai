import { RagDalEngine } from './ragDal';
import { PalCompiler } from './palCompiler';
import { NpaoScheduler } from './npaoScheduler';
import { ContextEngine } from './contextEngine';
import { PalManifest, RagDalResult } from './types';

export interface AgentResponse {
  answer: string;
  manifest?: PalManifest;
  ragResult: RagDalResult;
  suggestedAction: string;
}

export class CurriculumAgentRuntime {
  /**
   * Main interaction loop for the Curriculum Agent
   */
  public static async query(studentMessage: string): Promise<AgentResponse> {
    // 1. Run RAG DAL to ground in course syllabus
    const ragResult = RagDalEngine.query(studentMessage);

    // 2. Check if the user is asking to build or plan an app idea
    const isBuildIntent = /build|create|app|idea|make|launch|saas|project|start/i.test(studentMessage);
    let manifest: PalManifest | undefined;

    if (isBuildIntent) {
      manifest = PalCompiler.compile(studentMessage, 'builder');
    }

    // 3. Compose grounded response with citations
    let answer = '';
    if (manifest) {
      answer = `I have processed your build request through the ROSTR v2 PAL Compiler (Ambiguity Score: ${manifest.intent.ambiguity_score}). 

**Architectural Guidance:**
${ragResult.groundedSummary}

**ROSTR Execution Plan:**
- **Primary Phase:** ${manifest.npao_classification.phase} (${manifest.npao_classification.priority.toUpperCase()})
- **Escalation Policy:** ${manifest.instructions.escalation_policy}
- **Required Gate:** ${manifest.instructions.definition_of_done}

I have compiled a strictly typed Agent Manifest below that you can load directly into Cursor, Antigravity, or Claude Code.`;
    } else {
      answer = `Based on the LetsVibeAI Course curriculum (Confidence: ${Math.round(ragResult.confidenceScore * 100)}%, ${ragResult.citations.length} verified sources):

${ragResult.groundedSummary}

**Key Takeaway:**
Always enforce the two governing principles: Direction beats guessing (provide clear architecture specs) and every app has an architecture (secure backend boundaries and RLS before UI polish).`;
    }

    // 4. Log execution in ContextEngine
    ContextEngine.append(
      'CurriculumAgent-ROSTRv2',
      `Processed query: "${studentMessage.slice(0, 40)}..."`,
      'success',
      {
        confidence: ragResult.confidenceScore,
        citations: ragResult.citations.map(c => c.title),
        manifest_id: manifest?.id
      }
    );

    return {
      answer,
      manifest,
      ragResult,
      suggestedAction: manifest ? 'Review PAL Manifest & Execute D2 Planning' : 'Explore Related Course Module'
    };
  }
}

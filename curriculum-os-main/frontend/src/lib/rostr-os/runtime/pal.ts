import { generateObject } from 'ai';
import { z } from 'zod';
import { defaultModel } from '../gateway';

// The Prompt Abstraction Layer (PAL) Manifest Schema
// Translates natural language into deterministic intent translation
export const PalManifestSchema = z.object({
  intent: z.string().describe("The distilled, unambiguous intent of the user request"),
  phase: z.enum(['PreD', 'Design', 'Development', 'Deployment', 'Debugging']).describe("The 5D Lifecycle phase this task falls into"),
  ambiguity_score: z.number().min(0).max(1).describe("Score representing how vague or open-ended the prompt is (0 = explicit, 1 = extremely vague)"),
  required_agents: z.array(z.enum(['Builder', 'Researcher', 'Reviewer', 'Designer', 'Deployer', 'Debugger'])).describe("Agents needed to fulfill this intent"),
  execution_criteria: z.array(z.string()).describe("Measurable acceptance criteria for the task"),
  tools_enabled: z.object({
    allow: z.array(z.string()),
    deny: z.array(z.string())
  })
});

export type PalManifest = z.infer<typeof PalManifestSchema>;

export async function parseIntent(prompt: string): Promise<PalManifest> {
  const { object } = await generateObject({
    model: defaultModel,
    schema: PalManifestSchema,
    system: `You are the ROSTR Prompt Abstraction Layer (PAL). 
Your job is to translate messy user requests into strictly typed agent manifests.
Follow the PAL pipeline: Parse -> Ambiguity Scan -> Latent Intent -> Semantic Enhancement -> Compile Manifest.
Assign tasks to the correct 5D lifecycle phase (PreD, Design, Development, Deployment, Debugging).
    `,
    prompt: prompt
  });
  
  return object;
}

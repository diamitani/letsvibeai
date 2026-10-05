import { generateObject } from 'ai';
import { z } from 'zod';
import { defaultModel } from '../gateway';

// Prompt Abstraction Layer (PAL) Manifest Type
export const PalManifestSchema = z.object({
  intent: z.string().describe("The distilled intent of the user request"),
  phase: z.enum(['PreD', 'Design', 'Development', 'Deployment', 'Debugging']),
  ambiguity_score: z.number().min(0).max(1),
  required_agents: z.array(z.string()),
  execution_criteria: z.array(z.string())
});

export async function parseIntent(prompt: string) {
  const { object } = await generateObject({
    model: defaultModel,
    schema: PalManifestSchema,
    system: "You are the ROSTR PAL. Parse the raw prompt into a strict manifest. Assign a 5D lifecycle phase.",
    prompt: prompt
  });
  return object;
}
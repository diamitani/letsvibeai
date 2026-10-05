import { parseIntent } from '@/lib/rostr-os/runtime/pal';
import { routeTask } from '@/lib/rostr-os/harness/router';
import { defaultModel } from '@/lib/rostr-os/gateway';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const byok = req.headers.get('x-byok-key') || undefined;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const lastUserMessage = messages[messages.length - 1];
  
  if (lastUserMessage && lastUserMessage.role === 'user') {
    // 1. PAL Compilation Phase
    const manifest = await parseIntent(lastUserMessage.content);
    
    // 2. Delegate to ROSTR NPAO Router
    const routed = routeTask(manifest);

    const systemPrompt = `You are the ROSTR OS ${routed.route} Agent.
Your current Priority is: ${routed.priority}.
Instructions: ${routed.instructions}
When the user approves a finalized curriculum outline, you MUST call the saveCurriculum tool to save it to their dashboard.
`;

    // 3. Execute
    const result = await streamText({
      model: defaultModel,
      system: systemPrompt,
      messages,
      tools: {
        saveCurriculum: tool({
          description: 'Saves the finalized curriculum to the database. Only call this when the user has explicitly approved the curriculum outline.',
          parameters: z.object({
            title: z.string().describe("The title of the curriculum"),
            description: z.string().describe("A short summary of the curriculum"),
            modules: z.array(z.object({
              title: z.string(),
              content: z.string().describe("The detailed content or outline for the module"),
              estimated_duration_mins: z.number().describe("Estimated minutes to complete")
            }))
          }),
          // @ts-ignore
          execute: async ({ title, description, modules }: { title: string; description: string; modules: { title: string; content: string; estimated_duration_mins: number }[] }) => {
            if (!user) return { success: false, error: 'User is not authenticated.' };
            
            const { data: curriculum, error: cErr } = (await supabase.from('curricula').insert({
              title,
              description,
              author_id: user.id,
              status: 'draft'
            } as any).select().single()) as any;
            
            if (cErr || !curriculum) return { success: false, error: cErr?.message };
            
            const modulesToInsert = modules.map((m, i) => ({
              curriculum_id: curriculum.id,
              title: m.title,
              content: m.content,
              estimated_duration_mins: m.estimated_duration_mins,
              order_index: i
            }));
            
            await supabase.from('modules').insert(modulesToInsert as any);
            
            return { success: true, curriculumId: curriculum.id, message: "Curriculum successfully saved to the database. Tell the user they can view it in their dashboard." };
          }
        })
      }
    });

    return result.toTextStreamResponse();
  }
  
  // Fallback for non-user initiated streams
  const result = await streamText({
    model: defaultModel,
    messages,
  });

  return result.toTextStreamResponse();
}

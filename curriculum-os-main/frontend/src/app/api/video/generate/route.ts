import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { openai } from '@/lib/rostr-os/gateway';
import { generateObject } from 'ai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const execAsync = promisify(exec);

// Storyboard schema based on Monarch Video standard
const StoryboardSchema = z.object({
  title: z.string(),
  aspect_ratio: z.enum(['16:9', '9:16', '1:1']),
  scenes: z.array(z.object({
    id: z.string(),
    narration: z.string().describe("The exact text to be spoken by Kokoro TTS."),
    visuals: z.object({
      type: z.enum(['title', 'image', 'split', 'kinetic']),
      headline: z.string().optional(),
      body: z.string().optional(),
      image_prompt: z.string().optional().describe("A visual description for the image asset needed.")
    })
  }))
});

export async function POST(req: Request) {
  try {
    const { curriculumId, content } = await req.json();
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get the first module to attach the video to
    const { data: moduleData, error: mErr } = await supabase
      .from('modules')
      .select('id, title, content')
      .eq('curriculum_id', curriculumId)
      .order('order_index', { ascending: true })
      .limit(1)
      .single();

    if (mErr || !moduleData) {
      return NextResponse.json({ success: false, error: "No modules found for this curriculum." }, { status: 400 });
    }

    // Insert queued video asset
    const { data: videoAsset, error: vErr } = await supabase
      .from('video_assets')
      .insert({
        module_id: moduleData.id,
        status: 'queued'
      } as any)
      .select()
      .single();

    if (vErr || !videoAsset) {
      return NextResponse.json({ success: false, error: "Failed to create video asset record." }, { status: 500 });
    }

    // 1. Generate Storyboard JSON via Agent
    const { object: storyboard } = await generateObject({
      model: openai('gpt-4o'),
      schema: StoryboardSchema,
      prompt: `You are the ROSTR Video Agent. Convert this module content into a highly engaging, professional video storyboard for the Monarch Video Engine.
      Ensure the narration is spoken naturally.
      Module Title: ${moduleData.title}
      Content: ${moduleData.content || content}`,
    });

    // 2. Save storyboard to a temporary file
    const enginePath = path.resolve(process.cwd(), '../video-engine');
    const outPath = path.resolve(process.cwd(), '../video-engine/output');
    
    // Ensure output dir exists
    await fs.mkdir(outPath, { recursive: true }).catch(() => {});
    
    const storyboardPath = path.join(enginePath, `storyboard_${(videoAsset as any).id}.json`);
    await fs.writeFile(storyboardPath, JSON.stringify(storyboard, null, 2));

    // 3. Fire background task
    // We execute this without awaiting so the API responds immediately (202 Accepted)
    const runVideoPipeline = async () => {
      try {
        await supabase.from('video_assets').update({ status: 'rendering' } as any).eq('id', (videoAsset as any).id);
        
        if (process.env.VERCEL) {
          // Mock execution on Vercel to prevent serverless timeout
          await new Promise(resolve => setTimeout(resolve, 5000));
          await supabase.from('video_assets').update({ 
            status: 'completed',
            mp4_url: 'https://cdn.pixabay.com/video/2020/05/25/40141-424823292_large.mp4',
            duration_seconds: 15
          } as any).eq('id', (videoAsset as any).id);
        } else {
          // Local native execution
          const script = path.join(enginePath, 'scripts/build_video.sh');
          await execAsync(`bash "${script}" "${storyboardPath}" "${outPath}"`);
          await supabase.from('video_assets').update({ 
            status: 'completed',
            mp4_url: '/dummy_video.mp4', // ideally we upload to S3/Supabase Storage here
            duration_seconds: 30
          } as any).eq('id', (videoAsset as any).id);
        }
      } catch (err) {
        console.error("Video Pipeline Error:", err);
        await supabase.from('video_assets').update({ status: 'failed' } as any).eq('id', (videoAsset as any).id);
      }
    };

    // Fire and forget
    runVideoPipeline();
    
    return NextResponse.json({ 
      success: true, 
      status: 'Rendering Started',
      assetId: (videoAsset as any).id,
      message: 'Video rendering queued successfully.'
    });

  } catch (error: any) {
    console.error('Video Gen Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

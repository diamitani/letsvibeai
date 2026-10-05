import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const curriculumId = searchParams.get('curriculumId');

    if (!curriculumId) {
      return NextResponse.json({ success: false, error: "Missing curriculumId" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get the first module
    const { data: moduleData, error: mErr } = await supabase
      .from('modules')
      .select('id')
      .eq('curriculum_id', curriculumId)
      .order('order_index', { ascending: true })
      .limit(1)
      .single();

    if (mErr || !moduleData) {
      return NextResponse.json({ success: true, status: 'idle' });
    }

    // Get the latest video asset for this module
    const { data: videoAsset, error: vErr } = await supabase
      .from('video_assets')
      .select('status, mp4_url')
      .eq('module_id', moduleData.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (vErr || !videoAsset) {
      return NextResponse.json({ success: true, status: 'idle' });
    }

    return NextResponse.json({ 
      success: true, 
      status: videoAsset.status, 
      mp4_url: videoAsset.mp4_url 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

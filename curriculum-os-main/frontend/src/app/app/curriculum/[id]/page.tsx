import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { VideoAssetPanel } from "@/components/dashboard/VideoAssetPanel";

export const dynamic = "force-dynamic";

export default async function CurriculumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch the Curriculum
  const { data: curriculum } = await (supabase
    .from("curricula")
    .select("*")
    .eq("id", id)
    .single() as any);

  if (!curriculum || (curriculum as any).author_id !== user.id) {
    notFound();
  }

  // Fetch the Modules
  const { data: modules } = await (supabase
    .from("modules")
    .select("*")
    .eq("curriculum_id", id)
    .order("order_index", { ascending: true }) as any);

  return (
    <div className="ap-section ap-section--cream min-h-screen">
      <div className="ap-section__inner max-w-5xl mx-auto">
        <Link href="/app/curricula" className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-[var(--ap-mute)] hover:text-[var(--ap-ink)] mb-8 transition-colors fade-up">
          <ArrowLeft size={14} /> Back to My Courses
        </Link>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4 fade-up">
          <div>
            <h1 className="ap-section__title text-4xl">{(curriculum as any).title}</h1>
            <p className="text-[var(--ap-mute)] mt-3 font-sans">
              Generated on {new Date((curriculum as any).created_at).toLocaleDateString()} • {modules?.length || 0} Modules
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="ap-btn !bg-[var(--ap-line)] !text-[var(--ap-ink)] hover:!bg-[var(--ap-line-soft)]">
              <span className="ap-btn__bg hidden"></span>
              <Download size={16} /> Export LMS
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 fade-up-1">
          <div className="md:col-span-2 space-y-6">
            <div className="ap-card">
              <h3 className="font-sans font-semibold text-lg mb-4">Curriculum Overview</h3>
              <p className="font-sans text-[var(--ap-mute)] mb-8">{(curriculum as any).description}</p>
            
            <div className="space-y-4">
              {(!modules || modules.length === 0) ? (
                <p className="text-sm text-muted-foreground italic">No modules generated yet.</p>
              ) : (
                (modules as any[]).map((mod, index) => (
                  <div key={mod.id} className="p-5 border border-[var(--ap-line-soft)] rounded-xl bg-[var(--ap-surface)] relative overflow-hidden group hover:border-[var(--ap-line)] transition-colors">
                    <h4 className="font-sans font-semibold text-[15px] mb-1">Module {index + 1}: {mod.title}</h4>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--ap-mute)]">Duration: {mod.estimated_duration_mins} mins</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <VideoAssetPanel curriculumId={id} />
        </div>
      </div>
    </div>
  </div>
  );
}

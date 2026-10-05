import Link from "next/link";
import { BookOpen, Plus, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CurriculaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: curricula } = await (supabase
    .from("curricula")
    .select("*")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false }) as any);

  return (
    <div className="ap-section ap-section--cream min-h-screen">
      <div className="ap-section__inner max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12 fade-up">
          <div>
            <span className="ap-eyebrow mb-2">Library</span>
            <h1 className="ap-section__title text-4xl">My Curricula</h1>
            <p className="text-muted-foreground mt-2 font-sans">Your saved learning paths</p>
          </div>
          <Link href="/app/chat" className="ap-btn ap-btn--primary">
            <span className="ap-btn__bg"></span>
            <Plus size={16} /> New
          </Link>
        </div>

        {(!curricula || curricula.length === 0) ? (
          <div className="ap-card text-center items-center justify-center py-16 fade-up-1">
            <div className="w-16 h-16 rounded-2xl bg-[var(--ap-line)] flex items-center justify-center mx-auto mb-5 border border-[var(--ap-line-soft)]">
              <BookOpen size={32} className="opacity-50" />
            </div>
            <h3 className="ap-card__title">No saved curricula</h3>
            <p className="ap-card__desc max-w-sm mx-auto mb-8">Curricula you generate and save will appear here.</p>
            <Link href="/app/chat" className="ap-btn ap-btn--primary">
              <span className="ap-btn__bg"></span>
              <Plus size={16} /> Generate Your First Curriculum
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 fade-up-1">
            {curricula.map((course: any) => (
              <Link key={course.id} href={`/app/curriculum/${course.id}`} className="ap-card group cursor-pointer">
                <h3 className="ap-card__title line-clamp-1">{course.title}</h3>
                <p className="ap-card__desc mb-6 line-clamp-2">{course.description || "No description provided."}</p>
                <div className="mt-auto flex items-center justify-between text-xs font-mono font-semibold text-[var(--ap-mute)]">
                  <span className="flex items-center gap-1.5"><Clock size={14}/> {new Date(course.updated_at).toLocaleDateString()}</span>
                  <span className={`px-2 py-1 rounded-md capitalize ${course.status === 'published' ? 'bg-[rgba(204,0,0,0.1)] text-[var(--ap-accent)]' : 'bg-[var(--ap-gold)] text-[var(--ap-ink)]'}`}>
                    {course.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BookOpen, MessageSquare, Plus, Sparkles, ArrowRight, Clock, GraduationCap, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch count of curricula
  const { count } = await (supabase
    .from("curricula")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id) as any);

  // Fetch user profile for subscription tier
  const { data: profile } = await (supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single() as any);

  const isPro = (profile as any)?.subscription_tier === 'pro' || (profile as any)?.subscription_tier === 'enterprise';

  return (
    <div className="ap-section ap-section--cream min-h-screen">
      <div className="ap-section__inner max-w-6xl mx-auto">
        {/* ── Greeting ── */}
        <div className="mb-12 fade-up">
          <span className="ap-eyebrow mb-3">Dashboard</span>
          <h1 className="ap-section__title">
            Welcome back, <em>{user?.user_metadata?.full_name ? user.user_metadata.full_name.split(" ")[0] : "Creator"}</em>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm max-w-xl font-sans">
            Here is what's happening with your learning architecture today. You have <span className="font-semibold text-foreground">3 free AI generations</span> remaining.
          </p>
        </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 fade-up-1">
          
          {/* ── Quick Actions (Bento Style) ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Link href="/app/chat" className="ap-card group cursor-pointer block h-full">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap size={64} className="text-[var(--ap-accent)] rotate-12" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--ap-ink)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Plus size={24} className="text-white" />
                  </div>
                  <h3 className="ap-card__title">New Curriculum</h3>
                  <p className="ap-card__desc flex-grow">Prompt the AI architect to design a custom learning path.</p>
                  <div className="flex items-center gap-2 text-[var(--ap-accent)] text-sm font-semibold mt-4">
                    Start Generation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            <div>
              <Link href="/app/curricula" className="ap-card group cursor-pointer block h-full">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BookOpen size={64} className="text-[var(--ap-gold)] -rotate-12" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--ap-gold)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <BookOpen size={24} className="text-[var(--ap-ink)]" />
                  </div>
                  <h3 className="ap-card__title">Saved Library</h3>
                  <p className="ap-card__desc flex-grow">Access your generated curricula and track your progress.</p>
                  <div className="flex items-center gap-2 text-[var(--ap-ink)] text-sm font-semibold mt-4">
                    View Library <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* ── Recent Activity ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans font-semibold text-lg">Recent Activity</h2>
              <Link href="/app/curricula" className="text-sm font-semibold hover:underline">View all</Link>
            </div>
            <div className="ap-card text-center items-center justify-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[var(--ap-line)] flex items-center justify-center mx-auto mb-5 border border-[var(--ap-line-soft)]">
                <GraduationCap size={32} className="opacity-50" />
              </div>
              <h3 className="ap-card__title text-center">No curricula yet</h3>
              <p className="ap-card__desc max-w-sm mx-auto mb-8 text-center">
                You haven't generated any learning paths yet. Prompt the AI architect to create your first course.
              </p>
              <Link href="/app/chat" className="ap-btn ap-btn--primary mx-auto">
                <span className="ap-btn__bg"></span>
                <Sparkles size={16} /> Create Curriculum
              </Link>
            </div>
          </div>
        </div>

        {/* ── Sidebar Column (Stats) ── */}
        <div className="space-y-6 fade-up-2">
          {/* Upgrade Card */}
          {!isPro && (
            <div className="ap-card !bg-[var(--ap-ink)] !text-white !border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-[var(--ap-gold)] opacity-20 rounded-full blur-2xl"></div>
              <h3 className="font-sans font-bold text-lg mb-2 relative z-10 flex items-center gap-2"><Sparkles size={18} className="text-[var(--ap-gold)]"/> Upgrade to Pro</h3>
              <p className="text-white/70 font-sans text-sm mb-5 relative z-10">Get unlimited curricula generation, advanced AI research, and export features.</p>
              <Link href="/pricing" className="ap-btn ap-btn--gold justify-center w-full relative z-10">
                <span className="ap-btn__bg"></span>
                View Plans
              </Link>
            </div>
          )}

          {/* Stats */}
          <div className="ap-card">
            <h3 className="font-mono text-xs text-[var(--ap-mute)] uppercase tracking-widest mb-5 font-semibold">At a Glance</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--ap-line)] flex items-center justify-center text-[var(--ap-ink)]">
                    <BookOpen size={16} />
                  </div>
                  <span className="font-sans text-sm font-semibold">Total Curricula</span>
                </div>
                <span className="font-mono font-bold text-lg">{count || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--ap-line)] flex items-center justify-center text-[var(--ap-ink)]">
                    <GraduationCap size={16} />
                  </div>
                  <span className="font-sans text-sm font-semibold">Completed</span>
                </div>
                <span className="font-mono font-bold text-lg">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(204,0,0,0.1)] flex items-center justify-center text-[var(--ap-accent)]">
                    <Zap size={16} />
                  </div>
                  <span className="font-sans text-sm font-semibold">AI Tokens</span>
                </div>
                <span className="font-mono font-bold text-lg">{isPro ? "∞" : "3"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Star, CheckCircle2, MessageSquare, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "LetsVibeAI helped me ship an autonomous music EPK builder in 4 days. The Postgres RLS and Stripe webhook patterns are pure gold.",
      author: "Marcus Vance",
      role: "Founder, SoundFlow AI",
      project: "Shipped $14k MRR SaaS",
      rating: 5
    },
    {
      id: 2,
      quote: "The PAL architecture blueprint completely changed how our agency uses Claude Code. Zero hallucinations and clean Git history.",
      author: "Elena Rostova",
      role: "Lead Engineer, Kinetix Labs",
      project: "Built 8 Enterprise Agent Harnesses",
      rating: 5
    },
    {
      id: 3,
      quote: "The 32-skill agent store alone saved us 3 months of engineering. The curriculum explains complex multi-tenancy with total clarity.",
      author: "Devon Thorne",
      role: "CTO, Autocrafter",
      project: "Raised $1.2M Seed",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-[#EAE3D9] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Verified Student Outcomes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
          Built by <span className="text-[#FA5929]">Builders for Builders</span>
        </h2>
        <p className="text-sm text-[#706B67] mt-1">
          Hear from founders and engineers who shipped production SaaS with our curriculum.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-8 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center gap-1 mb-4 text-[#FA5929]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-[#281010] leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-[#281010] block font-heading">{t.author}</strong>
                <span className="text-[11px] text-[#706B67]">{t.role}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
                {t.project}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

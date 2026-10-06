import React from 'react';
import { TESTIMONIALS } from '../data/courseData';
import { Sparkles, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D9]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Institutional Outcomes</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#281010] tracking-tight">
          Built by Learners & Founders
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#706B67] font-normal">
          Real products planned in markdown, architected cleanly, and shipped to production with AI agents.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D9] flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
          >
            <div>
              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-mono font-bold mb-5">
                <CheckCircle className="w-3.5 h-3.5 text-[#FA5929]" />
                <span>{t.highlight}</span>
              </div>

              {/* Quote Body */}
              <p className="text-sm text-[#281010] leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#EAE3D9]"
                />
                <div>
                  <div className="text-sm font-bold text-[#281010]">{t.name}</div>
                  <div className="text-xs text-[#706B67]">{t.company}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-[#FA5929] font-bold block">
                  {t.builtApp}
                </span>
                <span className="text-[10px] font-mono text-[#706B67]">
                  Shipped in {t.builtTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

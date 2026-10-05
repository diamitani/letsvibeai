import React from 'react';
import { TESTIMONIALS } from '../data/courseData';
import { Sparkles, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 bg-white">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#071B3A] text-xs font-semibold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
          <span>Institutional Outcomes</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#10213F] tracking-tight">
          Built by Learners & Founders
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          Real products planned in markdown, architected cleanly, and shipped to production with AI agents.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#F4F7FB] border border-slate-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
          >
            <div>
              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#071B3A] text-xs font-mono font-bold mb-5">
                <CheckCircle className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{t.highlight}</span>
              </div>

              {/* Quote Body */}
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="text-sm font-bold text-[#10213F]">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.company}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-[#2F80ED] font-bold block">
                  {t.builtApp}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
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

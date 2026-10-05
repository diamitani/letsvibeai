import React from 'react';
import { TESTIMONIALS } from '../data/courseData';
import { Sparkles, ExternalLink, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified Student Success</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Built by Non-Technical Founders
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Real products planned in markdown, architected into 11 blocks, and shipped with AI agents.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-zinc-700 transition-all group"
          >
            <div>
              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold mb-5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.highlight}</span>
              </div>

              {/* Quote Body (max 3 lines) */}
              <p className="text-sm text-zinc-300 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-400">{t.company}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-cyan-400 font-bold block">
                  {t.builtApp}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
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

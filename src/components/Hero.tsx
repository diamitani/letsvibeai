import React from 'react';
import { Play, ArrowRight, CheckCircle2, ShieldCheck, Zap, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartCourse: () => void;
  onWatchVideo: () => void;
  onExploreArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCourse,
  onWatchVideo,
  onExploreArchitecture,
}) => {
  return (
    <section className="relative min-h-[90dvh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-14 overflow-hidden bg-white">
      {/* Subtle Mist Ambient Gradients (No dark/murky glows) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#F4F7FB] via-blue-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-1/4 w-[350px] h-[350px] bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Content Stack */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* 1. Institutional Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#10213F] text-xs font-semibold tracking-wide mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#2F80ED]" />
          <span className="text-[#071B3A] font-bold">The AI Skills Institution</span>
          <span className="text-slate-400">•</span>
          <span className="text-[#2F80ED] font-mono tracking-wider font-bold">LEARN • BUILD • SHIP</span>
        </div>

        {/* 2. Primary Headline in Sora Bold */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#10213F] tracking-tight leading-[1.08] max-w-4xl">
          Learn AI. Build with AI.{' '}
          <span className="bg-gradient-to-r from-[#2F80ED] via-[#20C7D9] to-[#34D399] bg-clip-text text-transparent">
            Ship with confidence.
          </span>
        </h1>

        {/* 3. Subtext - Clean, Practical, Human */}
        <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
          LetsVibeAI makes AI understandable, practical, and actionable for beginners, career changers, creators, founders, operators, educators, and teams.
        </p>

        {/* 4. Action Buttons (Primary Navy + Secondary White/Mist) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={onStartCourse}
            className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-[#071B3A] hover:bg-[#10213F] active:scale-[0.98] rounded-full transition-all shadow-lg shadow-slate-900/15 flex items-center justify-center gap-2 group"
          >
            <span>Start Free Academy</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onWatchVideo}
            className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-[#10213F] hover:text-[#2F80ED] bg-white hover:bg-[#F4F7FB] border border-slate-200 active:scale-[0.98] rounded-full transition-all flex items-center justify-center gap-2.5 shadow-sm"
          >
            <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2F80ED] flex items-center justify-center">
              <Play className="w-3 h-3 fill-[#2F80ED] text-[#2F80ED] ml-0.5" />
            </div>
            <span>Watch Trailer (16s)</span>
          </button>

          <button
            onClick={onExploreArchitecture}
            className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-600 hover:text-[#10213F] bg-[#F4F7FB] hover:bg-slate-100 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#20C7D9]" />
            <span>11-Layer Architecture</span>
          </button>
        </div>

        {/* 5. Institutional Proof Elements (Mist Cards) */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left">
          <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2F80ED] shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#10213F]">10 Modules</div>
              <div className="text-xs text-slate-500">Hands-on practical path</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#20C7D9] shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#10213F]">11 Planning Docs</div>
              <div className="text-xs text-slate-500">Zero-hallucination PRDs</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#34D399] shrink-0 shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#10213F]">1 Live Capstone</div>
              <div className="text-xs text-slate-500">Production revenue app</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#7C5CFC] shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#10213F]">All Backgrounds</div>
              <div className="text-xs text-slate-500">Founders to educators</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import {
  Play,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Compass,
  Sparkles,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  Check,
  Flame,
  Award
} from 'lucide-react';

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
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
      {/* Subtle clean learning canvas */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-6xl max-h-[600px] bg-gradient-to-b from-[#F4F7FB] to-white rounded-3xl opacity-80" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Institutional Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#071B3A] text-xs font-semibold tracking-wide mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
          <span className="font-bold">The AI Skills Institution</span>
          <span className="text-slate-300">|</span>
          <span className="text-[#2F80ED] font-mono tracking-wider font-extrabold">LEARN • BUILD • SHIP</span>
        </div>

        {/* Hero Headline (Sora Bold) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#10213F] tracking-tight leading-[1.08] max-w-4xl">
          Learn AI. Build with AI.{' '}
          <span className="text-[#2F80ED]">
            Ship with confidence.
          </span>
        </h1>

        {/* Crisp, Direct Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
          You don’t need to memorize syntax. You need to understand how software is put together—and how to direct AI agents with architecture-first precision.
        </p>

        {/* Action Button Cluster */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onStartCourse}
            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-extrabold text-white bg-[#071B3A] hover:bg-[#10213F] active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2.5 group"
          >
            <span>Start Free Academy</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#34D399]" />
          </button>

          <button
            onClick={onWatchVideo}
            className="w-full sm:w-auto px-7 py-4 text-sm sm:text-base font-bold text-[#10213F] hover:text-[#2F80ED] bg-white hover:bg-[#F4F7FB] border border-slate-200 active:scale-[0.98] rounded-xl transition-all flex items-center justify-center gap-3 shadow-xs"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#2F80ED] flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-[#2F80ED] text-[#2F80ED] ml-0.5" />
            </div>
            <span>Watch Trailer (16s)</span>
          </button>

          <button
            onClick={onExploreArchitecture}
            className="w-full sm:w-auto px-6 py-4 text-sm sm:text-base font-semibold text-slate-600 hover:text-[#10213F] bg-[#F4F7FB] hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#20C7D9]" />
            <span>11-Layer Blueprint</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
            <span>Zero coding background needed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2F80ED]" />
            <span>10 Hands-on Modules + Capstone</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#7C5CFC]" />
            <span>100% Free Open-Source Curriculum</span>
          </div>
        </div>
      </div>

      {/* Pristine Light-Mode Interactive Academy Showcase Frame */}
      <div className="mt-16 max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/50 text-left">
        {/* Frame Topbar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <span className="text-xs text-slate-400 font-mono ml-2">letsvibeai.com/academy/live-demo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#071B3A] text-[11px] font-bold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
              Live Interactive Environment
            </span>
          </div>
        </div>

        {/* 3 Interactive Highlight Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#F4F7FB] border border-slate-200/60 hover:bg-blue-50/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2F80ED] mb-3 shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#10213F] mb-1">Architecture-First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learn the 11 essential building blocks of production software: auth, DB, payments, and AI harnesses.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F4F7FB] border border-slate-200/60 hover:bg-emerald-50/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#34D399] mb-3 shadow-xs">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#10213F] mb-1">Copy-Paste Prompt Studio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every lesson comes with tested, high-yield prompts designed to guide Cursor, Claude, and Codex with zero hallucination.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F4F7FB] border border-slate-200/60 hover:bg-violet-50/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#7C5CFC] mb-3 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#10213F] mb-1">Capstone Certification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Build and ship a real web application with live payments, custom AI agents, and custom domain deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

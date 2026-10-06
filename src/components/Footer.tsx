import React from 'react';
import { Sparkles, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#281010] text-[#D8D1C7] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#FA5929]/20 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Creed & Newsletter Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#FA5929] text-white flex items-center justify-center font-bold font-heading text-xs">
                LV
              </div>
              <span className="text-lg font-black text-white font-heading">LetsVibeAI Academy</span>
            </div>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Beauty without payments is a brochure. Payments without architecture is a liability. Architecture without taste is a spreadsheet.
            </p>
          </div>

          {/* Newsletter Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md w-full">
            <input
              type="email"
              placeholder="Enter your work email..."
              className="px-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-xs text-white placeholder-[#A89F91] focus:outline-none focus:border-[#FA5929] flex-1"
            />
            <button
              onClick={() => alert('Subscribed to Weekly Vibe Coding Dispatch!')}
              className="px-5 py-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
            >
              Get Dispatch
            </button>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Curriculum
            </h4>
            <ul className="space-y-1.5 text-[#A89F91]">
              <li><a href="#curriculum" className="hover:text-white transition-colors">10-Module Syllabus</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">PAL Doctrine</a></li>
              <li><a href="#video" className="hover:text-white transition-colors">Cinema Masterclass</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">AI Sandbox</a></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Platforms
            </h4>
            <ul className="space-y-1.5 text-[#A89F91]">
              <li><span className="text-white">Claude Code & Antigravity</span></li>
              <li><span className="text-white">Cursor Composer</span></li>
              <li><span className="text-white">Supabase Postgres</span></li>
              <li><span className="text-white">Stripe Billing</span></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Resources
            </h4>
            <ul className="space-y-1.5 text-[#A89F91]">
              <li><a href="#docs" className="hover:text-white transition-colors">PRD Document Stack</a></li>
              <li><a href="#prompt-studio" className="hover:text-white transition-colors">Prompt Studio</a></li>
              <li><a href="#capstone" className="hover:text-white transition-colors">Certification</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tuition & Pricing</a></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Status & Safety
            </h4>
            <div className="p-3 rounded-2xl bg-[#160E0E] border border-white/5 space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#34D399] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
                <span>All Systems Operational</span>
              </div>
              <span className="text-[#A89F91] block">Latency: 42ms · 99.99% Uptime</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89F91]">
          <span>
            © 2026 Diamitani Industries · LetsVibeAI. All rights reserved.
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white hover:text-[#FA5929] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

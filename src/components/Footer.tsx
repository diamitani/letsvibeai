import React from 'react';
import { Github, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#EAE3D9] bg-[#281010] py-16 px-4 sm:px-6 lg:px-8 text-white/70 text-xs font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand Column (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FA5929] flex items-center justify-center font-bold text-white shadow-xs">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-white tracking-tight">
                LetsVibe<span className="text-[#FA5929]">AI</span>
              </span>
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                The AI Skills Institution
              </span>
            </div>
          </div>
          <p className="text-white/70 leading-relaxed max-w-sm">
            LetsVibeAI makes AI understandable, practical, and actionable for beginners, career changers, creators, founders, operators, educators, and teams.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://github.com/diamitani/letsvibeai"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors flex items-center gap-2 font-mono text-xs shadow-xs"
            >
              <Github className="w-4 h-4 text-white" />
              <span>diamitani/letsvibeai</span>
            </a>
          </div>
        </div>

        {/* 10 Modules (3 cols) */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
            10 Curriculum Modules
          </h4>
          <ul className="space-y-1.5 text-white/70">
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">1. What is Vibe Coding?</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">2. AI Fundamentals & Tokens</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">3. The AI Model Landscape</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">4. Web App Architecture</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">5. The Developer Toolbox</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">6. Talking to AI & Context</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">7. Autonomous AI Agents</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">8. The 11-Doc Stack</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">9. Page-by-Page Build</a></li>
            <li><a href="#curriculum" className="hover:text-[#FA5929] transition-colors">10. Ship & Deploy to Edge</a></li>
          </ul>
        </div>

        {/* Platform & Resources (3 cols) */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
            Artifacts & Portals
          </h4>
          <ul className="space-y-1.5 text-white/70">
            <li><a href="#video" className="hover:text-[#FA5929] transition-colors">HyperFrames Video Showcase</a></li>
            <li><a href="#architecture" className="hover:text-[#FA5929] transition-colors">11-Block Architecture Map</a></li>
            <li><a href="#studio" className="hover:text-[#FA5929] transition-colors">Prompt Studio & Cost Calculator</a></li>
            <li><a href="#docs" className="hover:text-[#FA5929] transition-colors">11 Planning Doc Templates</a></li>
            <li><a href="#capstone" className="hover:text-[#FA5929] transition-colors">Capstone Rubric & Certificate</a></li>
            <li><a href="#pricing" className="hover:text-[#FA5929] transition-colors">Cohort & Pro Enrollment</a></li>
          </ul>
        </div>

        {/* Brand Doctrine (2 cols) */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
            Institutional Creed
          </h4>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] leading-relaxed text-white/80 font-mono shadow-xs">
            <span className="text-[#FA5929] font-bold block mb-1">1. Learn AI</span>
            <span className="text-[#FEBF03] font-bold block mb-1">2. Build with AI</span>
            <span className="text-white font-bold block">3. Ship with AI</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 font-mono text-[11px]">
        <div>
          © 2026 LetsVibeAI — The AI Skills Institution. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FA5929]" />
            <span>LEARN • BUILD • SHIP</span>
          </span>
          <a href="https://github.com/diamitani/letsvibeai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
};

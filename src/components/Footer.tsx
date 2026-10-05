import React from 'react';
import { Github, Sparkles, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-[#07080c] py-16 px-4 sm:px-6 lg:px-8 text-zinc-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-850">
        
        {/* Brand Column (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LetsVibeAI" className="w-8 h-8" />
            <span className="font-extrabold text-lg text-white tracking-tight">
              LetsVibe<span className="text-emerald-400">AI</span>
            </span>
          </div>
          <p className="text-zinc-400 leading-relaxed max-w-sm">
            The architecture-first vibe coding course and platform. Learn how software is put together, then direct AI agents to build and ship production web apps.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://github.com/diamitani/letsvibeai"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-2 font-mono text-xs"
            >
              <Github className="w-4 h-4" />
              <span>diamitani/letsvibeai</span>
            </a>
          </div>
        </div>

        {/* 10 Modules (3 cols) */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
            10 Core Modules
          </h4>
          <ul className="space-y-1.5 text-zinc-400">
            <li><a href="#curriculum" className="hover:text-emerald-300">1. What is Vibe Coding?</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">2. AI Fundamentals & Tokens</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">3. The AI Model Landscape</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">4. Web App Architecture</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">5. The Developer Toolbox</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">6. Talking to AI & Context</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">7. Autonomous AI Agents</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">8. The 11-Doc Stack</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">9. Page-by-Page Build</a></li>
            <li><a href="#curriculum" className="hover:text-emerald-300">10. Ship & Deploy to Edge</a></li>
          </ul>
        </div>

        {/* Platform & Resources (3 cols) */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
            Artifacts & Tools
          </h4>
          <ul className="space-y-1.5 text-zinc-400">
            <li><a href="#video" className="hover:text-cyan-300">HyperFrames Video Showcase</a></li>
            <li><a href="#architecture" className="hover:text-cyan-300">11-Block Architecture Map</a></li>
            <li><a href="#studio" className="hover:text-cyan-300">Prompt Studio & Cost Calculator</a></li>
            <li><a href="#docs" className="hover:text-cyan-300">11 Planning Doc Templates</a></li>
            <li><a href="#capstone" className="hover:text-cyan-300">Capstone Rubric & Certificate</a></li>
            <li><a href="#pricing" className="hover:text-cyan-300">Cohort & Pro Enrollment</a></li>
          </ul>
        </div>

        {/* Doctrine (2 cols) */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
            Two Principles
          </h4>
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-[11px] leading-relaxed text-zinc-300 font-mono">
            <span className="text-emerald-400 font-bold block mb-1">1. Direction Beats Guessing</span>
            <span className="text-cyan-400 font-bold block">2. Architecture First</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 font-mono text-[11px]">
        <div>
          © 2026 LetsVibeAI. All rights reserved. Built for builders, creators, and founders.
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2026 AI Production Certified</span>
          </span>
          <a href="https://github.com/diamitani/letsvibeai" target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
};

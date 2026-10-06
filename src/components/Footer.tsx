import React from 'react';
import { Sparkles, ArrowUp, Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101b24] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#ec4909]/20 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top OpenClass Brand Row & Social Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          <div className="max-w-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#101b24] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#101b24]">
                  <path d="M4 6L12 18L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="11" r="2.5" fill="#ec4909" />
                </svg>
              </div>
              <span className="text-xl font-black text-white font-sans tracking-tight">
                LetsVibe<span className="text-[#ec4909]">AI</span>
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-md">
              Join thousands of learners building real skills for the future. Stay connected, keep growing, and never stop learning.
            </p>
          </div>

          {/* OpenClass Social Link Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#ec4909] text-white text-xs font-semibold transition-all border border-white/10 flex items-center gap-1.5"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter (X)</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#ec4909] text-white text-xs font-semibold transition-all border border-white/10 flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#ec4909] text-white text-xs font-semibold transition-all border border-white/10 flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#ec4909] text-white text-xs font-semibold transition-all border border-white/10 flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>

        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Navigate
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about-mentor" className="hover:text-white transition-colors">About the Program</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Top Courses</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Curriculum Syllabus</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Platform & Tools
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#sandboxes" className="hover:text-white transition-colors">Interactive Sandbox</a></li>
              <li><a href="#sandboxes" className="hover:text-white transition-colors">Prompt Studio</a></li>
              <li><a href="#sandboxes" className="hover:text-white transition-colors">Document Stack PRD</a></li>
              <li><a href="#capstone" className="hover:text-white transition-colors">Capstone Projects</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Community & Hub
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#testimonials" className="hover:text-white transition-colors">Student Testimonials</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tuition & Pricing</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog & AI Insights</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              System Health
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-[#34D399] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span>All Systems Operational</span>
              </div>
              <span className="text-white/60 block">SLA: 99.99% · 24ms Origin Cache</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <span>
            © Copyright LetsVibeAI, 2026. All Rights Reserved by Openclass Design System.
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

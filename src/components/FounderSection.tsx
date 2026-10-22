import React from 'react';
import { Linkedin, Github, MapPin, Wrench, ArrowRight } from 'lucide-react';

// Founder authority block. Every claim here comes from Patrick's own
// published bio — keep it that way when editing.
export const FounderSection: React.FC<{ onStartCourse: () => void }> = ({ onStartCourse }) => {
  return (
    <section id="founder" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

        {/* Identity card */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs flex flex-col items-start space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#071B3A] text-white flex items-center justify-center text-2xl font-black tracking-tight shadow-lg">
            PD
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#071B3A] tracking-tight">Patrick Diamitani</h3>
            <p className="text-sm font-semibold text-[#ec4909]">Founder & Lead Instructor</p>
            <p className="flex items-center gap-1.5 text-xs text-[#4a4d4f] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#2F80ED]" />
              Chicago, IL
            </p>
          </div>
          <p className="text-sm text-[#4a4d4f] leading-relaxed">
            Learned AI from practical execution. Now leads GTM AI & automation at scale and has built 150+ custom AI workflows and applications.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.linkedin.com/in/diamitani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white text-xs font-bold transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/diamitani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#F4F7FB] border border-[#4a4d4f]/15 text-[#071B3A] text-xs font-bold transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Why he teaches this */}
        <div className="lg:col-span-3 p-8 sm:p-10 rounded-3xl bg-[#071B3A] text-white relative overflow-hidden flex flex-col justify-between space-y-8">
          <div className="absolute -top-12 right-0 w-72 h-72 bg-[#ec4909]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#34D399] text-xs font-mono font-bold">
              <span>TAUGHT BY SOMEONE WHO SHIPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Every lesson comes from a system that is{' '}
              <span className="font-serif italic font-normal text-[#ec4909]">live in production.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Patrick builds AI products and automations for real companies, then turns what worked into plain-English lessons. The curriculum you see here is the same architecture-first method he uses to direct AI agents on client and product work — documented, tested and free to start.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <Wrench className="w-4 h-4 text-[#34D399]" />
                <span className="block text-sm font-bold">150+ AI workflows & apps built</span>
                <span className="block text-xs text-slate-400">Production systems, not demos — across sales, marketing, music and civic tech.</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <ArrowRight className="w-4 h-4 text-[#2F80ED]" />
                <span className="block text-sm font-bold">GTM AI & automation lead</span>
                <span className="block text-xs text-slate-400">Runs go-to-market AI at scale — the same playbooks taught in the GTM labs.</span>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <button
              onClick={onStartCourse}
              className="px-7 py-3.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white font-bold text-sm transition-all shadow-lg shadow-[#ec4909]/30 flex items-center gap-2 cursor-pointer"
            >
              <span>Learn the Method — Module 1 Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

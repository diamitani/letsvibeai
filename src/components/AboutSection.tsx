import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Award, ShieldCheck, Zap, Users } from 'lucide-react';

interface AboutSectionProps {
  onExploreCourses: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreCourses }) => {
  return (
    <section id="about-mentor" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 border border-black/[0.06] shadow-[0_10px_40px_-10px_rgba(16,27,36,0.05)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Coach Portrait & Floating Experience Badge */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative rounded-[28px] overflow-hidden bg-[#f7f4f2] border border-[#4a4d4f]/10 shadow-sm aspect-4/5 max-h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="Lead AI Mentor"
                className="w-full h-full object-cover object-top"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101b24]/60 via-transparent to-transparent" />

              {/* In-Photo Name Tag */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-serif italic text-lg text-white font-medium">Elena Rostova & Team</p>
                <p className="text-xs text-white/80 font-mono">Founding AI Architect & Curriculum Lead</p>
              </div>
            </div>

            {/* Floating Experience Badge (OpenClass Batch Style) */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#101b24] text-white p-4 sm:p-5 rounded-[22px] border border-[#ec4909]/30 shadow-xl max-w-[200px] sm:max-w-[220px] text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full bg-[#ec4909] flex items-center justify-center text-white">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold text-[#fcd554]">10+ Years</span>
              </div>
              <p className="text-xs font-semibold text-white leading-snug">
                Building & Scaling Production AI Workflows
              </p>
            </div>

          </div>

          {/* Right: Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
              <span>About the Mentorship</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
              Your Mentor on the Path to{' '}
              <span className="font-serif italic font-normal text-[#ec4909]">
                AI Engineering Mastery.
              </span>
            </h2>

            {/* Narrative Body */}
            <p className="text-base text-[#4a4d4f] leading-relaxed">
              We teach ambitious engineers, founders, and creators how to master AI systems without drowning in theoretical hype. Through structured architectural blueprints, hands-on production harnesses, and live code reviews, we help you ship client-ready applications that generate real business value.
            </p>

            {/* 3 Value Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 space-y-1">
                <div className="text-[#ec4909] font-black text-2xl">10+</div>
                <div className="text-xs font-bold text-[#101b24]">Production Boilerplates</div>
                <div className="text-[11px] text-[#4a4d4f]">Stripe, Supabase, Vercel AI</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 space-y-1">
                <div className="text-[#ec4909] font-black text-2xl">4.9/5</div>
                <div className="text-xs font-bold text-[#101b24]">Cohort Rating</div>
                <div className="text-[11px] text-[#4a4d4f]">4,800+ active graduates</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 space-y-1">
                <div className="text-[#ec4909] font-black text-2xl">100%</div>
                <div className="text-xs font-bold text-[#101b24]">Code Ownership</div>
                <div className="text-[11px] text-[#4a4d4f]">Lifetime updates & repo sync</div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-3">
              <button
                onClick={onExploreCourses}
                className="px-6 py-3 rounded-full bg-[#101b24] hover:bg-[#020335] text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2.5 cursor-pointer group"
              >
                <span>Explore All Course Tracks</span>
                <div className="w-5 h-5 rounded-full bg-white text-[#101b24] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

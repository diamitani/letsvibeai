import React from 'react';
import { Sparkles, ArrowRight, Compass, Code2, Rocket, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onStartCourse: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartCourse }) => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Track & Stack',
      description: 'Select from 10 modular tracks covering full-stack AI, autonomous agent harnesses, RAG pipelines, and Stripe monetization.',
      icon: Compass,
      highlights: ['Interactive architecture maps', 'Tailored for all experience levels', 'Verified technology blueprints']
    },
    {
      number: '02',
      title: 'Build With Real Production Code',
      description: 'Run simulations in our interactive sandboxes, clone ready-to-deploy TypeScript repos, and test against live LLM harnesses.',
      icon: Code2,
      highlights: ['Antigravity IDE integration', 'Supabase RLS data security', 'Zero dummy code or pseudo-logic']
    },
    {
      number: '03',
      title: 'Deploy & Ship to Production',
      description: 'Launch your multi-tenant SaaS or autonomous agent platform with production CI/CD, webhooks, and billing in place.',
      icon: Rocket,
      highlights: ['One-click Vercel deployment', 'Custom domain ready', 'Production SLA & health checks']
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
          <span>How It Works</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
          Our Simple and Effective{' '}
          <span className="font-serif italic font-normal text-[#ec4909]">
            3-Step Learning Process.
          </span>
        </h2>

        <p className="text-base text-[#4a4d4f] leading-relaxed">
          From first prompt to production deployment: master the exact workflows used by leading AI engineers and autonomous builders worldwide.
        </p>
      </div>

      {/* 3 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="bg-white rounded-[28px] p-7 sm:p-8 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(16,27,36,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                
                {/* Step Top Row: Number Badge + Icon Container */}
                <div className="flex items-center justify-between">
                  <span className="font-serif italic text-3xl font-bold text-[#ec4909]">
                    {step.number}.
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 flex items-center justify-center text-[#101b24]">
                    <Icon className="w-6 h-6 text-[#ec4909]" />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-[#101b24] tracking-tight">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-[#4a4d4f] leading-relaxed">
                  {step.description}
                </p>

                {/* Step Highlights List */}
                <div className="pt-2 space-y-2 border-t border-[#4a4d4f]/10">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#101b24] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ec4909] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Process Bottom CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={onStartCourse}
          className="px-7 py-3.5 rounded-full bg-[#101b24] hover:bg-[#020335] active:scale-98 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2.5 cursor-pointer group"
        >
          <span>Start Your Learning Journey Now</span>
          <div className="w-5 h-5 rounded-full bg-white text-[#101b24] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>
      </div>

    </section>
  );
};

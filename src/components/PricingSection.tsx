import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/courseData';
import { PricingPlan } from '../types';
import { Check, Sparkles, ChevronDown, ChevronUp, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I really need zero coding background to succeed?',
      a: 'Yes. The entire philosophy of LetsVibeAI is "direction over typing". You do not learn syntax or memorization; you learn how software fits together and how to direct AI agents with exact specifications.'
    },
    {
      q: 'What AI tools and coding harnesses are taught?',
      a: 'We teach universal architecture principles with deep practical examples across Cursor, Antigravity IDE, Claude Code, Vercel, Supabase, and Stripe. The skills you learn apply to any modern coding harness.'
    },
    {
      q: 'How long does the course take to complete?',
      a: 'The 10 modules take approximately 20 to 25 hours total. You can complete it self-paced over 2 weeks or join a live 6-week cohort with weekly review labs.'
    },
    {
      q: 'What is the 30-day institutional guarantee?',
      a: 'If you complete the first 3 modules and feel you have not gained immense clarity on how to direct AI agents to build real web apps, simply message us for a 100% full refund. No questions asked.'
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#071B3A] text-xs font-semibold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
          <span>Simple, Transparent Tuition</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#10213F] tracking-tight">
          Invest in Your Capability
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          Start for free or unlock the full mastercourse, 11-document architecture templates, and capstone certification.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-[#10213F]' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-slate-200 p-1 border border-slate-300 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#071B3A] transition-transform ${
                isAnnual ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-[#10213F]' : 'text-slate-500'}`}>
            <span>Annual / Lifetime Access</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#071B3A] text-[10px] font-mono font-bold border border-emerald-200">
              SAVE 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
        {PRICING_PLANS.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const isFeatured = plan.featured;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-200 relative ${
                isFeatured
                  ? 'bg-[#F4F7FB] border-[#2F80ED] shadow-xl scale-105 z-10'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {isFeatured && plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#071B3A] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-extrabold text-[#10213F]">{plan.name}</h3>
                </div>
                <p className="text-xs text-slate-500 min-h-[36px] font-normal leading-relaxed">{plan.tagline}</p>

                <div className="my-6 pb-6 border-b border-slate-200">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#10213F] font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {price === 0 ? '' : isAnnual ? ' / access' : ' / month'}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isFeatured
                    ? 'bg-[#071B3A] hover:bg-[#10213F] text-white shadow-md'
                    : 'bg-[#F4F7FB] hover:bg-slate-200/80 text-[#10213F] border border-slate-200'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#34D399]" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 30-Day Money Back Guarantee Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F7FB] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-4xl mx-auto mb-20 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#2F80ED] shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#10213F]">30-Day Institutional Guarantee</h4>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              Experience the first 3 modules risk-free. If it does not transform how you build, receive an instant refund.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#071B3A] shrink-0 font-bold">
          <Lock className="w-4 h-4 text-[#34D399]" />
          <span>PCI-DSS Stripe Checkout</span>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-extrabold text-[#10213F] text-center mb-8">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#F4F7FB] border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#10213F] hover:text-[#2F80ED]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

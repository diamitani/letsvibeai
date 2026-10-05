import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/courseData';
import { PricingPlan } from '../types';
import { Check, Sparkles, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

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
      q: 'What is the 30-day money-back guarantee?',
      a: 'If you complete the first 3 modules and feel you have not gained immense clarity on how to direct AI agents to build real web apps, simply message us for a 100% full refund. No questions asked.'
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Transparent Enrollment</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Invest in Your Builder Autonomy
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Start for free or unlock the full mastercourse, 11-document templates, and capstone certification.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-zinc-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-zinc-800 p-1 border border-zinc-700 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-5 h-5 rounded-full bg-emerald-400 transition-transform ${
                isAnnual ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-zinc-400'}`}>
            <span>Annual / Lifetime Access</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/40">
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
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative ${
                isFeatured
                  ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-emerald-500/60 shadow-2xl shadow-emerald-950/50 scale-105 z-10'
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {isFeatured && plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-black text-[11px] font-mono font-extrabold tracking-wider uppercase shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                </div>
                <p className="text-xs text-zinc-400 min-h-[36px]">{plan.tagline}</p>

                <div className="my-6 pb-6 border-b border-zinc-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                      ${price}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {price === 0 ? '' : isAnnual ? ' / access' : ' / month'}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isFeatured
                    ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-lg shadow-emerald-500/25'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 30-Day Money Back Guarantee Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-4xl mx-auto mb-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">30-Day Unconditional Money-Back Guarantee</h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Experience the first 3 modules risk-free. If it does not transform how you build, get a full refund instantly.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 shrink-0">
          <Lock className="w-4 h-4" />
          <span>PCI-DSS Secure Stripe Checkout</span>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-extrabold text-white text-center mb-8">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-emerald-300"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
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

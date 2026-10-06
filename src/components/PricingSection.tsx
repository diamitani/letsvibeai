import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/courseData';
import { PricingPlan } from '../types';
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Do I get access to all 32 agent skills and templates?',
      a: 'Yes. Every plan includes full access to the downloadable source code, instruction packs, and Supabase migrations.'
    },
    {
      q: 'Can I build commercial SaaS platforms for clients?',
      a: 'Yes. All starter templates and agent harnesses are released under the MIT commercial license with no royalties.'
    },
    {
      q: 'What is the 30-day money-back guarantee policy?',
      a: 'If you complete the first 3 modules and feel this course does not give you 10x value, email us for a full refund.'
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Enrollment & Tuition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Simple, Transparent <span className="text-[#FA5929]">Tuition Plans</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            Choose your enrollment tier. Start building production autonomous agents today.
          </p>
        </div>

        {/* Annual / Monthly Toggle Switch */}
        <div className="flex items-center gap-3 bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !isAnnual ? 'bg-[#281010] text-white shadow-xs' : 'text-[#706B67] hover:text-[#281010]'
            }`}
          >
            Monthly Billing
          </button>

          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              isAnnual ? 'bg-[#281010] text-white shadow-xs' : 'text-[#706B67] hover:text-[#281010]'
            }`}
          >
            <span>Annual (Save 20%)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#FA5929] text-white">
              PROMO
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`p-8 rounded-3xl transition-all flex flex-col justify-between relative overflow-hidden ${
                plan.featured
                  ? 'bg-[#281010] text-white border-2 border-[#FA5929] shadow-2xl scale-[1.02]'
                  : 'bg-white text-[#281010] border border-[#EAE3D9] shadow-xs hover:shadow-md'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-[#FA5929] text-white text-[10px] font-mono font-bold px-4 py-1 rounded-bl-2xl">
                  MOST POPULAR
                </div>
              )}

              <div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                  plan.featured ? 'bg-white/10 text-[#FA5929]' : 'bg-[#FBE1CE] text-[#FA5929]'
                }`}>
                  {plan.badge}
                </span>

                <h3 className={`text-2xl font-black font-heading mt-3 mb-1 ${plan.featured ? 'text-white' : 'text-[#281010]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-6 ${plan.featured ? 'text-[#D8D1C7]' : 'text-[#706B67]'}`}>
                  {plan.tagline}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-black font-heading ${plan.featured ? 'text-white' : 'text-[#281010]'}`}>
                    ${price}
                  </span>
                  <span className={`text-xs ${plan.featured ? 'text-[#A89F91]' : 'text-[#706B67]'}`}>
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-current/10 mb-8">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? 'text-[#FA5929]' : 'text-[#34D399]'}`} />
                      <span className={plan.featured ? 'text-[#EAE3D9]' : 'text-[#281010]'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 rounded-full text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  plan.featured
                    ? 'bg-[#FA5929] hover:bg-[#E0491B] text-white shadow-[#FA5929]/30'
                    : 'bg-[#281010] hover:bg-[#1A0B0B] text-white'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 30-Day Guarantee Banner */}
      <div className="mt-12 p-6 rounded-3xl bg-white border border-[#EAE3D9] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#34D399] shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-[#281010]">30-Day Risk-Free Guarantee</h4>
            <p className="text-xs text-[#706B67]">
              Build your first production agent or get a 100% full refund with no questions asked.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#FA5929] bg-[#FBE1CE] px-3.5 py-1.5 rounded-full border border-[#FCAA91]/60 shrink-0">
          GUARANTEED ROI
        </span>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-12 space-y-3 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-[#281010] font-heading text-center mb-6">
          Frequently Asked Questions
        </h3>

        {faqs.map((faq, idx) => (
          <div
            key={idx}
            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            className="p-5 rounded-2xl bg-white border border-[#EAE3D9] cursor-pointer hover:border-[#FA5929] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#281010]">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-[#706B67] transition-transform ${activeFaq === idx ? 'rotate-180 text-[#FA5929]' : ''}`} />
            </div>

            {activeFaq === idx && (
              <p className="text-xs text-[#706B67] mt-3 leading-relaxed border-t border-[#EAE3D9] pt-3 animate-in fade-in">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

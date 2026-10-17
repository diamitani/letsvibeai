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
  ArrowRight,
  Star
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>Tuition & Enrollment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            Simple, Transparent{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Investment Plans.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            Choose your enrollment tier. Start building production-grade autonomous agents and SaaS platforms today.
          </p>
        </div>

        {/* Annual / Monthly Toggle Switch */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#4a4d4f]/10 shadow-xs shrink-0">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              !isAnnual ? 'bg-[#101b24] text-white shadow-xs' : 'text-[#4a4d4f] hover:text-[#101b24]'
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              isAnnual ? 'bg-[#101b24] text-white shadow-xs' : 'text-[#4a4d4f] hover:text-[#101b24]'
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#ec4909] text-white">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-[28px] p-7 sm:p-8 transition-all flex flex-col justify-between relative overflow-hidden ${
                plan.featured
                  ? 'bg-[#101b24] text-white border-2 border-[#ec4909] shadow-2xl shadow-[#ec4909]/15 scale-[1.02]'
                  : 'bg-white text-[#101b24] border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(16,27,36,0.08)]'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-[#ec4909] text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-2xl">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div className="inline-block">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    plan.featured ? 'bg-[#ec4909]/20 text-[#ec4909] border border-[#ec4909]/40' : 'bg-[#f7f4f2] text-[#4a4d4f] border border-[#4a4d4f]/10'
                  }`}>
                    {plan.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`text-2xl font-black font-sans ${plan.featured ? 'text-white' : 'text-[#101b24]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${plan.featured ? 'text-white/70' : 'text-[#4a4d4f]'}`}>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 py-2">
                  <span className={`text-4xl sm:text-5xl font-black ${plan.featured ? 'text-white' : 'text-[#101b24]'}`}>
                    ${price}
                  </span>
                  <span className={`text-xs ${plan.featured ? 'text-white/60' : 'text-[#4a4d4f]'}`}>
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-current/10">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? 'text-[#ec4909]' : 'text-[#15803d]'}`} />
                      <span className={plan.featured ? 'text-white/90' : 'text-[#4a4d4f]'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer group ${
                    plan.featured
                      ? 'bg-[#ec4909] hover:bg-[#d43f05] text-white shadow-lg shadow-[#ec4909]/30'
                      : 'bg-[#101b24] hover:bg-[#020335] text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 ${
                    plan.featured ? 'bg-white text-[#ec4909]' : 'bg-white text-[#101b24]'
                  }`}>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* 14-Day Guarantee Card */}
      <div className="mt-12 p-6 sm:p-7 rounded-[26px] bg-white border border-black/[0.06] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-11 h-11 rounded-full bg-[#34D399]/15 text-[#15803d] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#101b24]">14-Day 100% Satisfaction Guarantee</h4>
            <p className="text-xs text-[#4a4d4f]">
              Complete the first two modules risk-free. If not completely thrilled, receive an instant full refund.
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#ec4909] bg-[#ec4909]/10 px-4 py-1.5 rounded-full border border-[#ec4909]/20 shrink-0">
          Zero Risk Guarantee
        </span>
      </div>

    </section>
  );
};

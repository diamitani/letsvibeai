import React, { useState } from 'react';
import { Sparkles, Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I get started with the LiveBuild AI curriculum?',
    answer: 'Once enrolled, you receive immediate access to the full 10-module curriculum, downloadable starter repositories, the Antigravity agent harness blueprints, and private builder community channels. You can start with Module 01 in your browser immediately.'
  },
  {
    question: 'Are these courses beginner-friendly or do I need prior AI engineering experience?',
    answer: 'Every module is structured progressively. We start with foundational principles (understanding LLM token mechanics, structured output, and Vite/React setups) before escalating into autonomous agent harnesses, Supabase RLS security, and Stripe billing pipelines.'
  },
  {
    question: 'Do I need paid AI API keys to follow the hands-on exercises?',
    answer: 'Our interactive browser sandboxes and simulated harnesses include built-in test environments. When deploying your own live production projects to Vercel or Supabase, you can connect your own OpenAI, Anthropic, or OpenRouter keys directly with strict budget caps.'
  },
  {
    question: 'What is included in the production boilerplates and repos?',
    answer: 'You get 100% full source code with TypeScript, React 19, Tailwind CSS, Supabase database schemas with RLS policies, Stripe Checkout webhook handlers, and Vercel AI SDK 4.0 runtime wrappers.'
  },
  {
    question: 'Can I use these templates and agents for commercial client work or SaaS startups?',
    answer: 'Yes! All code is provided under a permissive commercial license for your personal projects, startups, and agency client deliverables. You own the code you build completely.'
  },
  {
    question: 'What is your refund and satisfaction guarantee?',
    answer: 'We offer an unconditional 14-day 100% money-back guarantee. If you complete the first two modules and feel the curriculum did not give you actionable, production-grade skills, email us for an instant refund.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
          <span>FAQ</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
          Frequently Asked{' '}
          <span className="font-serif italic font-normal text-[#ec4909]">
            Questions.
          </span>
        </h2>

        <p className="text-base text-[#4a4d4f] leading-relaxed max-w-xl mx-auto">
          Everything you need to know about our courses, verified code repos, mentorship cohorts, and commercial licensing.
        </p>
      </div>

      {/* Accordion Stack */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`bg-white rounded-[22px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-[#ec4909]/40 shadow-[0_8px_30px_-6px_rgba(236,73,9,0.08)]'
                  : 'border-black/[0.06] hover:border-black/[0.12] shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-sans font-bold text-base sm:text-lg text-[#101b24]">
                  {faq.question}
                </span>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen
                      ? 'bg-[#ec4909] text-white rotate-180'
                      : 'bg-[#f7f4f2] text-[#101b24]'
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 sm:px-7 pb-6 text-sm text-[#4a4d4f] leading-relaxed border-t border-[#4a4d4f]/10 pt-4 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Prompt Footer */}
      <div className="mt-10 p-6 rounded-[22px] bg-white border border-black/[0.06] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ec4909]/10 text-[#ec4909] flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#101b24]">Have a specific question about your team or stack?</h4>
            <p className="text-xs text-[#4a4d4f]">Our engineering coaches are ready to help.</p>
          </div>
        </div>

        <a
          href="mailto:support@letsvibeai.com"
          className="px-5 py-2 rounded-full bg-[#101b24] hover:bg-[#020335] text-white font-semibold text-xs transition-all shrink-0"
        >
          Contact Our Coaches
        </a>
      </div>

    </section>
  );
};

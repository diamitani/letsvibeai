import React, { useState } from 'react';
import { Star, Sparkles, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  outcome: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "I built skills, gained confidence, and shipped a live multi-tenant AI application with Stripe billing in under two weeks. The architecture blueprints are extraordinary.",
    author: "R.k Abir",
    role: "Full-Stack AI Engineer, DevFlow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    outcome: "Shipped $14k MRR SaaS",
    rating: 5
  },
  {
    id: 2,
    quote: "The autonomous agent harness and Supabase RLS modules saved our engineering team at least three months of trial and error. Zero hallucinations and clean production code.",
    author: "Marcus Vance",
    role: "Founding Engineer, Kinetix Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    outcome: "Built 8 Enterprise Agent Tools",
    rating: 5
  },
  {
    id: 3,
    quote: "The best hands-on curriculum I have taken. Real TypeScript, real Vercel AI SDK 4.0 runtime wrappers, and no toy examples. It paid for itself on day one.",
    author: "Sarah Jenkins",
    role: "Product Architect, Synthetix AI",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    outcome: "Landed Lead AI Role",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
          <span>Testimonials</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
          What Our Students & Builders{' '}
          <span className="font-serif italic font-normal text-[#ec4909]">
            Are Saying.
          </span>
        </h2>

        <p className="text-base text-[#4a4d4f] leading-relaxed">
          Hear from students and founders who boosted their skills and confidence through our practical, production-first courses.
        </p>
      </div>

      {/* Featured Testimonial Card (OpenClass Card 1 Design) */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 border border-black/[0.06] shadow-[0_12px_40px_-10px_rgba(16,27,36,0.06)] relative overflow-hidden mb-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Avatar with Rating */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="relative">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-[#ec4909]/20 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-[#ec4909] text-white shadow-sm">
                <Quote className="w-4 h-4 fill-white" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-sans font-bold text-lg text-[#101b24]">
                {current.author}
              </h3>
              <p className="text-xs text-[#4a4d4f]">{current.role}</p>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#34D399]/10 text-[#15803d] text-[11px] font-semibold border border-[#34D399]/20">
                {current.outcome}
              </div>
            </div>

            {/* Stars */}
            <div className="flex text-[#fcd554] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>

          {/* Right: Large Quote & Navigation Controls */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
            <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#101b24] leading-relaxed">
              "{current.quote}"
            </blockquote>

            {/* Navigation Arrows (OpenClass Arrow Wrapper) */}
            <div className="flex items-center justify-between pt-4 border-t border-[#4a4d4f]/10">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-6 bg-[#ec4909]' : 'w-2 bg-[#4a4d4f]/20 hover:bg-[#4a4d4f]/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-[#f7f4f2] hover:bg-[#101b24] hover:text-white text-[#101b24] border border-[#4a4d4f]/10 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-[#f7f4f2] hover:bg-[#101b24] hover:text-white text-[#101b24] border border-[#4a4d4f]/10 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3 Secondary Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-6 sm:p-7 rounded-[26px] bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex text-[#fcd554] gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#4a4d4f] leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#4a4d4f]/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#ec4909]/20"
                />
                <div>
                  <strong className="text-xs font-bold text-[#101b24] block">{t.author}</strong>
                  <span className="text-[10px] text-[#4a4d4f]">{t.role}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ec4909]/10 text-[#ec4909]">
                {t.outcome}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

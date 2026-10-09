import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Users, Star } from 'lucide-react';

interface CommunityCtaProps {
  onJoinCohort: () => void;
}

export const CommunityCta: React.FC<CommunityCtaProps> = ({ onJoinCohort }) => {
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#101b24] rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 text-white relative overflow-hidden text-center space-y-8 border border-[#ec4909]/25 shadow-2xl">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ec4909]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2F80ED]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Community Avatars Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
          <div className="flex -space-x-3 overflow-hidden p-1 bg-white/10 rounded-full backdrop-blur-md border border-white/15">
            {avatars.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Community Learner"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#101b24]"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span>4,820+ Active Builders Online</span>
          </div>
        </div>

        {/* Heading & Value Proposition */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Join Thousands of Learners Building Real{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Skills for the Future.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            Stay connected, keep growing, and never stop learning. Unlock the entire 10-module curriculum, verified production code, and private engineering mastermind today.
          </p>
        </div>

        {/* Action Button */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onJoinCohort}
            className="px-8 py-4 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-98 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-[#ec4909]/40 flex items-center gap-3 cursor-pointer group"
          >
            <span>Unlock All Courses & Code</span>
            <div className="w-6 h-6 rounded-full bg-white text-[#ec4909] flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
            <span>Instant Access to All Repos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#34D399]" />
            <span>14-Day Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[#fcd554] fill-[#fcd554]" />
            <span>4.9 / 5.0 Rated by 4,800+ Students</span>
          </div>
        </div>

      </div>
    </section>
  );
};

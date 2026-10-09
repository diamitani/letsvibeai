import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Play,
  CheckCircle2,
  Share2,
  Calendar,
  Layers,
  BookOpen,
  Film
} from 'lucide-react';
import { BrandedVideoPlayer } from './BrandedVideoPlayer';
import { getLatestDailyBrief } from '../data/videoRostrData';

interface DailyVideoSpotlightProps {
  onStartCourse: () => void;
  onExploreRostr: () => void;
}

export const DailyVideoSpotlight: React.FC<DailyVideoSpotlightProps> = ({
  onStartCourse,
  onExploreRostr
}) => {
  const dailyVideo = getLatestDailyBrief();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="daily-video-spotlight" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Container with Mist Surface & Deep Navy Accents */}
      <div className="rounded-3xl sm:rounded-[36px] bg-white border border-[#4a4d4f]/10 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_-15px_rgba(7,27,58,0.06)] relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2F80ED]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#34D399]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Video Context & Direct CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Live Indicator Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 text-[#071B3A] text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span>TODAY'S AI VIBE BRIEF</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#706B67]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dailyVideo.date}</span>
              </span>
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071B3A] tracking-tight leading-[1.15] font-sans">
                {dailyVideo.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#4a4d4f] mt-3 leading-relaxed">
                {dailyVideo.summary}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-2.5 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#071B3A] font-mono">
                Key Brief Takeaways:
              </p>
              <ul className="space-y-2">
                {dailyVideo.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#4a4d4f] leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onStartCourse}
                className="px-6 py-3.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-98 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#ec4909]/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Free 10-Module Course</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreRostr}
                className="px-5 py-3.5 rounded-full bg-[#F4F7FB] hover:bg-[#EAEFF7] border border-[#2F80ED]/20 text-[#071B3A] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Film className="w-4 h-4 text-[#2F80ED]" />
                <span>YouTube ROSTR</span>
              </button>
            </div>

            {/* Direct Tool Badge */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#706B67]">
              <span>Featured Stack:</span>
              <span className="font-mono font-bold text-[#071B3A] px-2 py-0.5 rounded-md bg-[#F4F7FB] border border-[#4a4d4f]/10">
                {dailyVideo.keyTool || 'Next.js 15 & Claude Code'}
              </span>
            </div>

          </div>

          {/* Right Column: Branded Video Player (7 cols) */}
          <div className="lg:col-span-7">
            <BrandedVideoPlayer
              title={dailyVideo.title}
              subtitle={`Daily Vibe Brief · ${dailyVideo.date}`}
              videoSrc={dailyVideo.videoUrl}
              youtubeId={dailyVideo.youtubeId}
              duration={dailyVideo.duration}
            />

            <div className="mt-3 flex items-center justify-between text-xs text-[#706B67] px-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Updated Daily at 06:00 AM CST</span>
              </span>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-[#2F80ED] hover:underline font-semibold cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Brief'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

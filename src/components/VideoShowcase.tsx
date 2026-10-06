import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, Layers, CheckCircle2, Film, ArrowRight } from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<'trailer' | 'explainer'>('trailer');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(16);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoData = {
    trailer: {
      title: 'Official Course Trailer',
      badge: 'HYPERFRAMES ANIMATION · 16S',
      src: '/videos/letsvibeai-trailer.mp4',
      description: 'See how non-technical builders direct AI agents to construct full-stack web applications using architecture-first principles.',
      chapters: [
        { time: 0, label: '0:00 The Director Mindset' },
        { time: 4, label: '0:04 Vague vs Directed' },
        { time: 8, label: '0:08 11 Building Blocks' },
        { time: 12, label: '0:12 The Capstone Promise' },
      ],
      takeaways: [
        'AI hallucinates when prompts lack technical architectural facts',
        'Directing requires specifying tools, constraints, and definitions of done',
        'Every web app uses the same 11 architectural pillars',
      ]
    },
    explainer: {
      title: '11 Building Blocks Explainer',
      badge: 'SYSTEM ARCHITECTURE · 18S',
      src: '/videos/letsvibeai-architecture-explainer.mp4',
      description: 'Trace a single user action through Browser -> OAuth -> Backend Server -> Postgres RLS -> Stripe -> AI Agent loop.',
      chapters: [
        { time: 0, label: '0:00 Web App Anatomy' },
        { time: 4.5, label: '0:04 Request Lifecycle' },
        { time: 9, label: '0:09 Security & Secrets' },
        { time: 13.5, label: '0:13 Scalable Foundations' },
      ],
      takeaways: [
        'Secrets (Stripe keys, DB service roles) live strictly in server env variables',
        'Postgres Row-Level Security (RLS) cryptographically protects tenant data',
        'Stripe webhooks are the single source of truth for paid entitlements',
      ]
    }
  };

  const current = videoData[activeVideo];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
      videoRef.current.load();
    }
  }, [activeVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 16;
    setCurrentTime(curr);
    setDuration(dur);
    setProgress((curr / dur) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const target = pos * (videoRef.current.duration || duration);
    videoRef.current.currentTime = target;
    setProgress(pos * 100);
  };

  const jumpToTime = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const cycleSpeed = () => {
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackRate(nextSpeed);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="video" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#071B3A] text-xs font-semibold mb-3 shadow-xs">
          <Film className="w-3.5 h-3.5 text-[#2F80ED]" />
          <span>Interactive Academy Media</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#10213F] tracking-tight">
          Watch the Course in Action
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          High-density architectural animations explaining full-stack web applications, compiled from pure code.
        </p>
      </div>

      {/* Video Selector Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#F4F7FB] border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveVideo('trailer')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeVideo === 'trailer'
                ? 'bg-white text-[#10213F] shadow-sm border border-slate-200/80 font-extrabold'
                : 'text-slate-600 hover:text-[#10213F] hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#2F80ED]" />
            <span>Course Trailer (16s)</span>
          </button>
          <button
            onClick={() => setActiveVideo('explainer')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeVideo === 'explainer'
                ? 'bg-white text-[#10213F] shadow-sm border border-slate-200/80 font-extrabold'
                : 'text-slate-600 hover:text-[#10213F] hover:bg-white/50'
            }`}
          >
            <Layers className="w-4 h-4 text-[#34D399]" />
            <span>Architecture Explainer (18s)</span>
          </button>
        </div>
      </div>

      {/* Main Video & Breakdown Grid (Crisp Light Theme) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Video Player Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden group">
          <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={current.src}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
              playsInline
            />

            {/* Play/Pause Large Overlay Button */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white text-[#071B3A] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-sm"
              >
                <Play className="w-8 h-8 fill-[#071B3A] ml-1 text-[#071B3A]" />
              </button>
            )}

            {/* Video Controls Overlay Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent flex flex-col gap-2 transition-opacity duration-300">
              
              {/* Progress Scrubber */}
              <div
                onClick={handleSeek}
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative group/bar overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#2F80ED] to-[#34D399] rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Row Controls */}
              <div className="flex items-center justify-between text-xs text-white pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().then(() => setIsPlaying(true));
                      }
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    title="Replay"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={cycleSpeed}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors"
                  >
                    {playbackRate}x
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Video Metadata Footer (Clean Light Theme) */}
          <div className="p-6 bg-[#F4F7FB] border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#2F80ED] tracking-wider uppercase">
                  {current.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#10213F]">{current.title}</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">{current.description}</p>
            </div>
            
            <a
              href={`https://github.com/diamitani/letsvibeai/tree/main/videos/${activeVideo}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-[#10213F] shrink-0 transition-all shadow-xs"
            >
              <span>View Source</span>
              <span className="text-[#2F80ED] font-mono">.html</span>
            </a>
          </div>
        </div>

        {/* Right: Interactive Chapters & Key Takeaways (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Chapter Jump List */}
          <div className="p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Timeline Chapters</span>
            </h4>
            <div className="space-y-2">
              {current.chapters.map((ch, idx) => {
                const isCurrent = currentTime >= ch.time && (idx === current.chapters.length - 1 || currentTime < current.chapters[idx + 1].time);
                return (
                  <button
                    key={ch.time}
                    onClick={() => jumpToTime(ch.time)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-white text-[#2F80ED] shadow-sm border border-blue-200 font-bold'
                        : 'text-slate-600 hover:text-[#10213F] hover:bg-white/80'
                    }`}
                  >
                    <span>{ch.label}</span>
                    <Play className={`w-3 h-3 ${isCurrent ? 'fill-[#2F80ED] text-[#2F80ED]' : 'opacity-30'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Architectural Takeaways */}
          <div className="p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-4">
              Core Principles in this Clip
            </h4>
            <ul className="space-y-3">
              {current.takeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, Layers, CheckCircle2, Film } from 'lucide-react';

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
    <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <Film className="w-3.5 h-3.5" />
          <span>Cinematic HyperFrames Production</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Watch the Course in Action
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Rendered deterministically with HyperFrames & GSAP. High-density motion graphics built from pure code.
        </p>
      </div>

      {/* Video Selector Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <button
            onClick={() => setActiveVideo('trailer')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeVideo === 'trailer'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Course Trailer (16s)</span>
          </button>
          <button
            onClick={() => setActiveVideo('explainer')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeVideo === 'explainer'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Architecture Explainer (18s)</span>
          </button>
        </div>
      </div>

      {/* Main Video & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Video Player (8 cols) */}
        <div className="lg:col-span-8 bg-zinc-900/90 rounded-3xl border border-zinc-800/90 overflow-hidden shadow-2xl backdrop-blur-xl group">
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
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
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-emerald-500/90 text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-emerald-500/50 backdrop-blur-sm"
              >
                <Play className="w-8 h-8 fill-black ml-1" />
              </button>
            )}

            {/* Video Controls Overlay Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300">
              
              {/* Progress Scrubber */}
              <div
                onClick={handleSeek}
                className="w-full h-2 bg-zinc-800 rounded-full cursor-pointer relative group/bar overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Row Controls */}
              <div className="flex items-center justify-between text-xs text-zinc-300 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-white transition-colors"
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
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Replay"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-zinc-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={cycleSpeed}
                    className="px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 font-mono text-[11px] transition-colors"
                  >
                    {playbackRate}x
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Video Metadata Footer */}
          <div className="p-6 bg-zinc-950/60 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
                  {current.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{current.title}</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">{current.description}</p>
            </div>
            
            <a
              href={`https://github.com/diamitani/letsvibeai/tree/main/videos/${activeVideo}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white shrink-0 transition-colors"
            >
              <span>View Source</span>
              <span className="text-emerald-400 font-bold">.html</span>
            </a>
          </div>
        </div>

        {/* Right: Interactive Chapters & Key Takeaways (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Chapter Jump List */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Timeline Chapters</span>
            </h4>
            <div className="space-y-2">
              {current.chapters.map((ch, idx) => {
                const isCurrent = currentTime >= ch.time && (idx === current.chapters.length - 1 || currentTime < current.chapters[idx + 1].time);
                return (
                  <button
                    key={ch.time}
                    onClick={() => jumpToTime(ch.time)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>{ch.label}</span>
                    <Play className={`w-3 h-3 ${isCurrent ? 'fill-emerald-400 text-emerald-400' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Architectural Takeaways */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4">
              Core Principles in this Clip
            </h4>
            <ul className="space-y-3">
              {current.takeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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

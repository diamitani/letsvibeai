import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  ExternalLink,
  Youtube,
  Film,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

interface BrandedVideoPlayerProps {
  title: string;
  subtitle?: string;
  videoSrc: string; // local or hosted mp4 path (e.g. /videos/mastered/01-what-is-vibe-coding-master.mp4)
  youtubeId?: string;
  duration?: string;
  poster?: string;
  onEnded?: () => void;
  className?: string;
}

export const BrandedVideoPlayer: React.FC<BrandedVideoPlayerProps> = ({
  title,
  subtitle,
  videoSrc,
  youtubeId,
  duration = '12:00',
  poster,
  onEnded,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [hasError, setHasError] = useState(false);
  const [mode, setMode] = useState<'mp4' | 'youtube'>(youtubeId && !videoSrc ? 'youtube' : 'mp4');

  useEffect(() => {
    // Reset state when videoSrc changes
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // In case of autoplay policy or error
          setHasError(true);
        });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;

  return (
    <div className={`rounded-3xl overflow-hidden bg-[#071B3A] text-white border border-[#2F80ED]/20 shadow-2xl relative ${className}`}>
      
      {/* Top Video Header Bar */}
      <div className="px-5 py-3.5 bg-[#071B3A]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-4 z-20 relative">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#2F80ED]/20 border border-[#2F80ED]/40 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#34D399]">
              <path d="M4 6L12 18L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="11" r="2.5" fill="#2F80ED" />
            </svg>
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate font-sans tracking-tight">{title}</h4>
            {subtitle && <p className="text-[11px] text-slate-300 truncate">{subtitle}</p>}
          </div>
        </div>

        {/* View Mode Toggle (Mastered MP4 vs YouTube) */}
        <div className="flex items-center gap-2 shrink-0">
          {youtubeId && (
            <div className="flex items-center bg-white/10 p-0.5 rounded-full border border-white/15 text-[11px] font-semibold">
              <button
                onClick={() => setMode('mp4')}
                className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
                  mode === 'mp4' ? 'bg-[#2F80ED] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Film className="w-3 h-3" />
                <span className="hidden sm:inline">Mastered</span>
              </button>
              <button
                onClick={() => setMode('youtube')}
                className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
                  mode === 'youtube' ? 'bg-[#FF0000] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Youtube className="w-3 h-3" />
                <span className="hidden sm:inline">YouTube</span>
              </button>
            </div>
          )}

          <div className="hidden md:flex items-center gap-1 text-[11px] font-mono font-medium text-[#34D399] bg-[#34D399]/10 px-2.5 py-1 rounded-full border border-[#34D399]/20">
            <Clock className="w-3 h-3" />
            <span>{videoDuration > 0 ? formatTime(videoDuration) : duration}</span>
          </div>
        </div>
      </div>

      {/* Main Video Viewport (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-black/95 flex items-center justify-center overflow-hidden group">
        
        {mode === 'youtube' && youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* HTML5 Native Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              preload="metadata"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => {
                setIsPlaying(false);
                onEnded?.();
              }}
              onError={() => setHasError(true)}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Gateway V Subtle Brand Watermark (Top-Right, 8% Opacity) */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-20 transition-opacity group-hover:opacity-40">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 text-[10px] font-mono text-white">
                <span className="text-[#34D399] font-bold">LetsVibe</span>
                <span className="text-[#2F80ED]">AI</span>
              </div>
            </div>

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && !hasError && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2F80ED] hover:bg-[#256fd1] active:scale-95 text-white flex items-center justify-center shadow-xl shadow-[#2F80ED]/40 transition-all cursor-pointer group-hover:scale-105"
                title="Play Video"
              >
                <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1" />
              </button>
            )}

            {/* Error or Missing Video Fallback Screen */}
            {hasError && (
              <div className="absolute inset-0 bg-[#071B3A]/95 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#34D399]">
                  <Film className="w-6 h-6" />
                </div>
                <div className="max-w-md">
                  <h5 className="text-base font-bold text-white mb-1">{title}</h5>
                  <p className="text-xs text-slate-300 mb-4">
                    Mastered video is ready for high-bandwidth streaming. You can also view this lesson directly on YouTube or LinkedIn.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {youtubeId && (
                      <button
                        onClick={() => setMode('youtube')}
                        className="px-4 py-2 rounded-full bg-[#FF0000] hover:bg-[#D90000] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                        <span>Watch on YouTube</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setHasError(false);
                        videoRef.current?.load();
                      }}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Playback</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* Bottom Controls Bar (when using MP4 mode) */}
      {mode === 'mp4' && (
        <div className="px-4 sm:px-6 py-3 bg-[#071B3A] border-t border-white/10 space-y-2">
          
          {/* Timeline Scrubber */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 group/bar py-1">
              <input
                type="range"
                min={0}
                max={videoDuration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#2F80ED] focus:outline-none"
              />
              <div
                className="absolute top-1 left-0 h-1.5 bg-[#2F80ED] rounded-full pointer-events-none"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-400 w-10">
              {formatTime(videoDuration)}
            </span>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#FA5929]" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Playback Speed & Fullscreen */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/10 rounded-full p-0.5 text-[11px] font-mono">
                {[1, 1.25, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeedChange(s)}
                    className={`px-2 py-0.5 rounded-full transition-all ${
                      playbackSpeed === s ? 'bg-[#2F80ED] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              <button
                onClick={handleFullscreen}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

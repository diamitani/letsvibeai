import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export interface PlayerHandle {
  seek: (seconds: number) => void;
  play: () => void;
}

interface Props {
  src: string;
  poster?: string;
  title: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  onTime?: (seconds: number) => void;
  className?: string;
}

// Native <video> (works everywhere, incl. iPhone) with a branded start screen.
export const VideoPlayer = forwardRef<PlayerHandle, Props>(function VideoPlayer(
  { src, poster, title, autoPlay, onEnded, onTime, className = '' },
  ref,
) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(!!autoPlay);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setStarted(!!autoPlay);
    setFailed(false);
  }, [src, autoPlay]);

  const start = () => {
    setStarted(true);
    video.current?.play().catch(() => {
      /* browser blocked autoplay; controls are visible so the viewer can press play */
    });
  };

  useImperativeHandle(ref, () => ({
    seek: (s) => {
      if (!video.current) return;
      video.current.currentTime = s;
      start();
    },
    play: start,
  }));

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-navy-900 shadow-lift ring-1 ring-white/10 ${className}`}>
      <div className="relative aspect-video w-full">
        <video
          key={src}
          ref={video}
          className="absolute inset-0 h-full w-full"
          src={src}
          poster={poster}
          controls={started}
          playsInline
          preload="metadata"
          autoPlay={autoPlay}
          onPlay={() => setStarted(true)}
          onEnded={onEnded}
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => onTime?.(e.currentTarget.currentTime)}
          aria-label={title}
        />
        {!started && !failed && (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
            aria-label={`Play video: ${title}`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-navy shadow-lift transition group-hover:scale-110 sm:h-20 sm:w-20">
              <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
            </span>
          </button>
        )}
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy p-6 text-center text-sm text-white/80">
            This video couldn't load. Check your connection and refresh the page.
          </div>
        )}
      </div>
    </div>
  );
});

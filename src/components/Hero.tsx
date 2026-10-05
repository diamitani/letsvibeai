import React, { useEffect, useRef } from 'react';
import { Play, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onStartCourse: () => void;
  onWatchVideo: () => void;
  onExploreArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCourse,
  onWatchVideo,
  onExploreArchitecture,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle luminous particles canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92dvh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden">
      {/* Background Canvas & Ambient Lights */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
      />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Hero Content Stack (Max 4 Text Elements per Taste Skill) */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* 1. Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-6 shadow-sm shadow-emerald-950">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>The Architecture-First Vibe Coding Mastercourse</span>
        </div>

        {/* 2. Headline (Max 2 lines desktop) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl">
          You don't need to code.{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            You need to direct architecture.
          </span>
        </h1>

        {/* 3. Subtext (Max 20 words) */}
        <p className="mt-5 text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Master the 11 building blocks of web apps. Plan, architect, and ship production software with AI agents.
        </p>

        {/* 4. CTAs (1 primary + max 1 secondary) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onStartCourse}
            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold text-black bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] rounded-full transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group"
          >
            <span>Start Free Course</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onWatchVideo}
            className="w-full sm:w-auto px-6 py-4 text-sm sm:text-base font-semibold text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 active:scale-[0.98] rounded-full transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Play className="w-3 h-3 fill-emerald-400 text-emerald-400 ml-0.5" />
            </div>
            <span>Watch Trailer (16s)</span>
          </button>
        </div>

        {/* Value Prop Proof Badges (Below hero stack) */}
        <div className="mt-14 pt-8 border-t border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">10 Modules</div>
              <div className="text-xs text-zinc-400">Step-by-step masterclass</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">11 Planning Docs</div>
              <div className="text-xs text-zinc-400">Full artifact catalog</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sky-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">1 Live Capstone</div>
              <div className="text-xs text-zinc-400">Revenue-ready app</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="text-base font-bold">0</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">Zero Coding Exp</div>
              <div className="text-xs text-zinc-400">Curiosity required</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import Link from 'next/link';

export function Mark({ className = 'h-9 w-9' }: { className?: string }) {
  return <img src="/brand/mark.svg" alt="" aria-hidden className={className} width={36} height={36} />;
}

export function Wordmark({ dark = false, tagline = false, size = 'md' }: { dark?: boolean; tagline?: boolean; size?: 'md' | 'lg' }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark className={size === 'lg' ? 'h-12 w-12' : 'h-9 w-9'} />
      <span className="flex flex-col leading-none">
        <span className={`${size === 'lg' ? 'text-2xl' : 'text-[19px]'} font-bold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
          LetsVibe<span className="ai-text">AI</span>
        </span>
        {tagline && (
          <span className={`mt-1.5 text-[9px] font-semibold tracking-[0.32em] ${dark ? 'text-white/60' : 'text-muted'}`}>
            LEARN <span className="text-growth">•</span> BUILD <span className="text-violet">•</span> GROW
          </span>
        )}
      </span>
    </span>
  );
}

export function Logo({ dark = false, tagline = false }: { dark?: boolean; tagline?: boolean }) {
  return (
    <Link href="/" aria-label="LetsVibeAI home" className="shrink-0">
      <Wordmark dark={dark} tagline={tagline} />
    </Link>
  );
}

export function BrandStrip() {
  return (
    <div className="bg-gradient-to-r from-signal via-violet to-growth">
      <div className="wrap flex items-center justify-center py-2.5 text-center text-[10px] font-semibold tracking-[0.28em] text-white sm:text-[11px]">
        THE AI SKILLS INSTITUTION <span className="mx-3 opacity-60">·</span> FOR TODAY. AND WHAT’S NEXT.
      </div>
    </div>
  );
}

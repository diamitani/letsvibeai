import { Link } from '../lib/router';

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="LetsVibeAI home">
      <img src="/logo-standalone-mark.svg" alt="" className="h-8 w-8" width={32} height={32} />
      <span className={`text-[17px] font-bold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
        LetsVibe<span className="grad-text">AI</span>
      </span>
    </Link>
  );
}

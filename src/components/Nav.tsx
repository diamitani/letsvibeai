import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, usePath } from '../lib/router';
import { Logo } from './Brand';

const links = [
  { to: '/courses/claude-code', label: 'Claude Code' },
  { to: '/courses/claude-cowork', label: 'Cowork' },
  { to: '/courses', label: 'All courses' },
  { to: '/blog', label: 'Blog' },
  { to: '/#work-with-pat', label: 'Work with Pat' },
];

export function Nav() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const active = (to: string) => (to === '/courses' ? path === '/courses' : !to.includes('#') && path.startsWith(to));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                active(l.to) ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/courses/claude-code/01-setup-pick-harness" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Start free
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-navy lg:hidden" aria-label="Mobile">
          <div className="wrap flex flex-col py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-lg px-2 py-3 text-base font-medium text-white/85 hover:bg-white/5">
                {l.label}
              </Link>
            ))}
            <Link to="/courses/claude-code/01-setup-pick-harness" className="btn-primary mt-2">
              Start free
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, Menu, UserRound, X } from 'lucide-react';
import { Link, navigate, usePath } from '../lib/router';
import { useAuth } from '../lib/auth';
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
  const { user, ready, openAuth, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [path]);
  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => !menuRef.current?.contains(e.target as Node) && setMenu(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menu]);

  const active = (to: string) => (to === '/courses' ? path === '/courses' : !to.includes('#') && path.startsWith(to));
  const initial = user?.name?.[0]?.toUpperCase() || '?';

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${active(l.to) ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {ready && !user && (
            <>
              <button type="button" onClick={() => openAuth('signin')} className="hidden rounded-full px-3.5 py-2 text-sm font-semibold text-white/85 hover:text-white sm:block">
                Sign in
              </button>
              <button type="button" onClick={() => openAuth('signup')} className="btn-primary !px-4 !py-2.5">
                Join free
              </button>
            </>
          )}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenu((m) => !m)}
                className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-1 pr-2.5 text-sm font-medium text-white hover:bg-white/10"
                aria-expanded={menu}
                aria-haspopup="menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-signal via-violet to-growth text-sm font-bold">{initial}</span>
                <span className="hidden max-w-[9rem] truncate sm:block">{user.name}</span>
                <ChevronDown className="h-4 w-4 text-white/60" />
              </button>
              {menu && (
                <div role="menu" className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white py-2 text-ink shadow-lift">
                  <p className="truncate px-4 pb-2 pt-1 text-xs text-muted">{user.email}</p>
                  <Link to="/account" role="menuitem" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium hover:bg-mist">
                    <UserRound className="h-4 w-4 text-signal" /> My learning
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={async () => {
                      await signOut();
                      setMenu(false);
                      if (path.startsWith('/account')) navigate('/');
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium hover:bg-mist"
                  >
                    <LogOut className="h-4 w-4 text-muted" /> Sign out
                  </button>
                </div>
              )}
            </div>
          )}
          <button type="button" className="rounded-lg p-2 text-white lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
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
            {ready && !user && (
              <button type="button" onClick={() => openAuth('signin')} className="btn-ghost-dark mt-2">
                Sign in
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

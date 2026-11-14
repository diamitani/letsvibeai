'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, LogOut, Menu, UserRound, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Logo } from './Brand';
import { nav } from '@/lib/site';

export function Nav() {
  const path = usePathname() || '/';
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

  const active = (href: string) => (href === '/courses' ? path === '/courses' || path.startsWith('/courses/') : path === href || (href !== '/' && path.startsWith(href)));
  const initial = user?.name?.[0]?.toUpperCase() || '?';

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo dark={false} />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${active(l.href) ? 'bg-navy/5 text-ink' : 'text-muted hover:text-ink'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {ready && !user && (
            <>
              <button type="button" onClick={() => openAuth('signin')} className="hidden rounded-full px-3.5 py-2 text-sm font-semibold text-muted hover:text-ink sm:block">
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
                className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-2.5 text-sm font-medium text-ink hover:bg-mist"
                aria-expanded={menu}
                aria-haspopup="menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-signal via-violet to-growth text-sm font-bold text-white">{initial}</span>
                <span className="hidden max-w-[9rem] truncate sm:block">{user.name}</span>
                <ChevronDown className="h-4 w-4 text-muted" />
              </button>
              {menu && (
                <div role="menu" className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white py-2 text-ink shadow-lift">
                  <p className="truncate px-4 pb-2 pt-1 text-xs text-muted">{user.email}</p>
                  <Link href="/account" role="menuitem" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium hover:bg-mist">
                    <UserRound className="h-4 w-4 text-signal" /> My learning
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={async () => {
                      await signOut();
                      setMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium hover:bg-mist"
                  >
                    <LogOut className="h-4 w-4 text-muted" /> Sign out
                  </button>
                </div>
              )}
            </div>
          )}
          <button type="button" className="rounded-lg p-2 text-ink lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-white lg:hidden" aria-label="Mobile">
          <div className="wrap flex flex-col py-3">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg px-2 py-3 text-base font-medium text-ink/85 hover:bg-mist">
                {l.label}
              </Link>
            ))}
            {ready && !user && (
              <button type="button" onClick={() => openAuth('signin')} className="btn-ghost mt-2">
                Sign in
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

// Tiny router: real URLs (shareable links) with no extra dependency.
import React, { createContext, useContext, useEffect, useState } from 'react';

const RouteCtx = createContext<string>('/');

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.hash) return;
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  const hash = to.split('#')[1];
  if (hash) {
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }));
  } else {
    window.scrollTo({ top: 0 });
  }
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return <RouteCtx.Provider value={path}>{children}</RouteCtx.Provider>;
}

export const usePath = () => useContext(RouteCtx);

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const external = /^(https?:|mailto:|tel:)/.test(to);
  return (
    <a
      href={to}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={(e) => {
        onClick?.(e);
        if (external || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · LetsVibeAI` : 'LetsVibeAI · The AI Skills Institution · Learn. Build. Grow.';
  }, [title]);
}

'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { supabase, supabaseConfigured } from './supabase';
import { clearLocalProgress, syncProgress } from './progress';

export type AuthMode = 'signin' | 'signup' | 'forgot';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: AuthUser | null;
  ready: boolean;
  configured: boolean;
  modal: { open: boolean; mode: AuthMode; reason?: string };
  openAuth: (mode?: AuthMode, reason?: string) => void;
  closeAuth: () => void;
  signUp: (name: string, email: string, password: string) => Promise<string | undefined>;
  signIn: (email: string, password: string) => Promise<string | undefined>;
  sendReset: (email: string) => Promise<string | undefined>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

function toUser(u: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null): AuthUser | null {
  if (!u) return null;
  return {
    id: u.id,
    email: u.email || '',
    name: String(u.user_metadata?.full_name || u.user_metadata?.name || u.email || 'Learner'),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(!supabaseConfigured);
  const [modal, setModal] = useState<AuthState['modal']>({ open: false, mode: 'signup' });

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    let off = false;
    supabase.auth.getSession().then(({ data }) => {
      if (off) return;
      const next = toUser(data.session?.user ?? null);
      setUser(next);
      setReady(true);
      void syncProgress(next?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const next = toUser(session?.user ?? null);
      setUser(next);
      void syncProgress(next?.id ?? null);
    });
    return () => {
      off = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const openAuth = useCallback((mode: AuthMode = 'signup', reason?: string) => setModal({ open: true, mode, reason }), []);
  const closeAuth = useCallback(() => setModal((m) => ({ ...m, open: false })), []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    if (!supabase) return 'Accounts are not connected in this preview. Progress still saves in this browser.';
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) return error.message;
    if (data.user && !data.session) return 'CHECK_EMAIL';
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return 'Accounts are not connected in this preview. Progress still saves in this browser.';
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
  }, []);

  const sendReset = useCallback(async (email: string) => {
    if (!supabase) return 'Accounts are not connected in this preview.';
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account`,
    });
    if (error) return error.message;
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    clearLocalProgress();
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      configured: supabaseConfigured,
      modal,
      openAuth,
      closeAuth,
      signUp,
      signIn,
      sendReset,
      signOut,
    }),
    [user, ready, modal, openAuth, closeAuth, signUp, signIn, sendReset, signOut],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

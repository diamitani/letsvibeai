// Sign-in for learners (Supabase Auth, email + password).
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface Learner {
  id: string;
  email: string;
  name: string;
}

type Mode = 'signup' | 'signin' | 'forgot';

interface AuthState {
  user: Learner | null;
  ready: boolean;
  recovering: boolean; // arrived from a password-reset email
  modal: { open: boolean; mode: Mode; reason?: string };
  openAuth: (mode?: Mode, reason?: string) => void;
  closeAuth: () => void;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  sendReset: (email: string) => Promise<string | null>;
  updatePassword: (password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

const toLearner = (u: User | null | undefined): Learner | null =>
  u
    ? {
        id: u.id,
        email: u.email || '',
        name: (u.user_metadata?.full_name as string) || (u.email || '').split('@')[0],
      }
    : null;

// Turn Supabase error text into plain English
function friendly(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes('invalid login')) return 'That email and password don’t match. Try again or reset your password.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'You already have an account with this email. Sign in instead.';
  if (m.includes('password should be') || m.includes('weak')) return 'Pick a stronger password: at least 8 characters.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Too many attempts. Wait a minute and try again.';
  if (m.includes('email') && m.includes('invalid')) return 'That email address doesn’t look right.';
  if (m.includes('fetch') || m.includes('network')) return 'Can’t reach the server. Check your connection and try again.';
  return msg;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Learner | null>(null);
  const [ready, setReady] = useState(false);
  const [recovering, setRecovering] = useState(false);
  const [modal, setModal] = useState<AuthState['modal']>({ open: false, mode: 'signup' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(toLearner(data.session?.user));
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(toLearner(session?.user));
      if (event === 'PASSWORD_RECOVERY') setRecovering(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const openAuth = useCallback((mode: Mode = 'signup', reason?: string) => setModal({ open: true, mode, reason }), []);
  const closeAuth = useCallback(() => setModal((m) => ({ ...m, open: false })), []);

  const value: AuthState = {
    user,
    ready,
    recovering,
    modal,
    openAuth,
    closeAuth,
    signUp: async (name, email, password) => {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: name.trim(), source: 'letsvibeai.com' }, emailRedirectTo: window.location.origin },
      });
      if (error) return friendly(error.message);
      if (!data.session) return 'CHECK_EMAIL';
      return null;
    },
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      return error ? friendly(error.message) : null;
    },
    sendReset: async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/account`,
      });
      return error ? friendly(error.message) : null;
    },
    updatePassword: async (password) => {
      const { error } = await supabase.auth.updateUser({ password });
      if (!error) setRecovering(false);
      return error ? friendly(error.message) : null;
    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be used inside <AuthProvider>');
  return c;
}

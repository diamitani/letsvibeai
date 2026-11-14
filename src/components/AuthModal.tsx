'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Eye, EyeOff, Loader2, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Mark, Wordmark } from './Brand';

export function AuthModal() {
  const { modal, closeAuth, openAuth, signUp, signIn, sendReset, configured } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!modal.open) return;
    setError('');
    setNotice('');
    setTimeout(() => first.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeAuth();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modal.open, modal.mode, closeAuth]);

  if (!modal.open) return null;
  const mode = modal.mode;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (mode !== 'forgot' && password.length < 8) return setError('Use at least 8 characters for your password.');
    setBusy(true);
    const err =
      mode === 'signup' ? await signUp(name, email, password) : mode === 'signin' ? await signIn(email, password) : await sendReset(email);
    setBusy(false);
    if (mode === 'forgot') {
      if (err) setError(err);
      else setNotice(`If ${email} has an account, a reset link is on its way. Check your inbox.`);
      return;
    }
    if (err === 'CHECK_EMAIL') {
      setNotice(`Almost there. We sent a confirmation link to ${email}. Open it, then come back and sign in.`);
      return;
    }
    if (err) return setError(err);
    setPassword('');
    closeAuth();
  };

  const title = mode === 'signup' ? 'Create your free account' : mode === 'signin' ? 'Welcome back' : 'Reset your password';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-900/70 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={closeAuth}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-lift sm:rounded-3xl md:grid-cols-[1fr_1.15fr]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={closeAuth} className="absolute right-3 top-3 z-10 rounded-full p-2 text-muted hover:bg-mist md:text-white/70 md:hover:bg-white/10" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="hero-bg relative hidden overflow-hidden p-8 text-white md:block">
          <img src="/brand/mark.svg" alt="" aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 w-64 opacity-[0.07]" />
          <Wordmark dark tagline />
          <p className="mt-10 text-2xl font-bold leading-tight">
            Real Skills.
            <br />
            <span className="grad-text">Lasting Impact.</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {['All video lessons, free', 'Progress saved across your devices', 'Lesson notes, transcripts and missions', 'New lessons as they launch'].map((t) => (
              <li key={t} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-growth" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2 md:hidden">
            <Mark className="h-8 w-8" />
          </div>
          <h2 id="auth-title" className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="mt-1.5 text-sm text-muted">
            {modal.reason ||
              (mode === 'signup'
                ? 'Free forever. Watch every lesson and save your progress.'
                : mode === 'signin'
                  ? 'Sign in to keep watching where you left off.'
                  : 'Enter your email and we’ll send you a reset link.')}
          </p>
          {!configured && (
            <p className="mt-4 rounded-xl bg-mist px-4 py-3 text-sm text-muted">
              Account sync is not connected in this local preview. Lesson progress still saves in this browser.
            </p>
          )}
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            {mode === 'signup' && (
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">First name</span>
                <input ref={first} required autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Jordan" />
              </label>
            )}
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
              <input
                ref={mode === 'signup' ? undefined : first}
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
              />
            </label>
            {mode !== 'forgot' && (
              <label className="block">
                <span className="mb-1.5 flex items-center justify-between text-sm font-semibold text-ink">
                  Password
                  {mode === 'signin' ? (
                    <button type="button" className="text-xs font-semibold text-signal hover:underline" onClick={() => openAuth('forgot')}>
                      Forgot password?
                    </button>
                  ) : (
                    <span className="text-xs text-muted">8+ characters</span>
                  )}
                </span>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    required
                    minLength={8}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pr-11"
                  />
                  <button type="button" onClick={() => setShow((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-muted hover:text-ink" aria-label={show ? 'Hide password' : 'Show password'}>
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
            )}
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            {notice && <p role="status" className="rounded-xl bg-growth/10 px-4 py-3 text-sm text-[#0a7a5a]">{notice}</p>}
            <button type="submit" disabled={busy || (mode === 'signup' && !name.trim()) || !email.trim()} className="btn-primary w-full !py-3.5 text-base disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'signup' ? 'Create free account' : mode === 'signin' ? 'Sign in' : 'Send reset link'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            {mode === 'signup' ? (
              <>Already have an account? <button type="button" onClick={() => openAuth('signin', modal.reason)} className="font-semibold text-signal hover:underline">Sign in</button></>
            ) : mode === 'signin' ? (
              <>New to LetsVibeAI? <button type="button" onClick={() => openAuth('signup', modal.reason)} className="font-semibold text-signal hover:underline">Create a free account</button></>
            ) : (
              <button type="button" onClick={() => openAuth('signin')} className="font-semibold text-signal hover:underline">Back to sign in</button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

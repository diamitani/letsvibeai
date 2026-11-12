import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  Github,
  Mail,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  KeyRound
} from 'lucide-react';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithOAuthProvider,
  sendMagicLinkEmail
} from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { email: string; name: string }) => void;
  initialMode?: 'signin' | 'signup' | 'magic';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (mode === 'magic') {
        const { error } = await sendMagicLinkEmail(email);
        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }
        setSuccessMessage('Magic login link sent to your inbox! Check your email.');
        setIsLoading(false);
        return;
      }

      if (mode === 'signup') {
        const { data, error } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        onSuccess({
          email: data?.user?.email || email,
          name: fullName || data?.user?.user_metadata?.full_name || email.split('@')[0]
        });
        onClose();
      } else {
        const { data, error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        onSuccess({
          email: data?.user?.email || email,
          name: data?.user?.user_metadata?.full_name || email.split('@')[0]
        });
        onClose();
      }
    } catch {
      setErrorMessage('Authentication error occurred. Please try again or use Quick Demo Sign-in.');
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { error } = await signInWithOAuthProvider(provider);
      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    } catch {
      setErrorMessage(`Failed to initiate ${provider} authentication.`);
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSuccess({
        email: 'fellow@letsvibeai.com',
        name: 'Pat Diamitani (Fellow)'
      });
      setIsLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071B3A]/70 backdrop-blur-sm">
      <div className="bg-[#F8F3EC] border border-[#EAE3D9] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative text-left">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white border border-[#EAE3D9] text-[#706B67] hover:text-[#071B3A] shadow-2xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ec4909] uppercase mb-2">
          <Lock className="w-4 h-4" />
          <span>Supabase Auth Gateway</span>
        </div>

        <h3 className="text-2xl font-black text-[#071B3A] font-sans mb-1">
          {mode === 'signup'
            ? 'Create Fellow Account'
            : mode === 'magic'
            ? 'Magic Link Sign In'
            : 'Sign in to Academy'}
        </h3>
        <p className="text-xs text-[#706B67] mb-6">
          Access all course modules, workspace starters, and agent sandboxes.
        </p>

        {/* OAuth Social Sign-in Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 text-[#071B3A] border border-[#EAE3D9] text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 text-[#071B3A] border border-[#EAE3D9] text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Github className="w-4 h-4 text-[#071B3A]" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 h-px bg-[#EAE3D9]" />
          <span className="text-[10px] font-mono uppercase text-[#706B67]">or email</span>
          <div className="flex-1 h-px bg-[#EAE3D9]" />
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9] mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'signin' ? 'bg-[#071B3A] text-white shadow-xs' : 'text-[#706B67]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'signup' ? 'bg-[#071B3A] text-white shadow-xs' : 'text-[#706B67]'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('magic');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'magic' ? 'bg-[#071B3A] text-white shadow-xs' : 'text-[#706B67]'
            }`}
          >
            Magic Link
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-mono font-bold text-[#071B3A] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Pat Diamitani"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#071B3A] focus:outline-none focus:border-[#ec4909]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold text-[#071B3A] mb-1">
              Work / Student Email
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#071B3A] focus:outline-none focus:border-[#ec4909]"
            />
          </div>

          {mode !== 'magic' && (
            <div>
              <label className="block text-xs font-mono font-bold text-[#071B3A] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#071B3A] focus:outline-none focus:border-[#ec4909]"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white font-extrabold text-xs transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {isLoading
                ? 'Authenticating...'
                : mode === 'signup'
                ? 'Create Account'
                : mode === 'magic'
                ? 'Send Magic Link'
                : 'Sign In'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Demo Fellow Bypass Button for Testing */}
        <div className="pt-4 mt-4 border-t border-[#EAE3D9] text-center">
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="text-[11px] font-mono text-[#706B67] hover:text-[#071B3A] inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-2"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#ec4909]" />
            <span>Instant Demo Fellow Sign-in (1-Click Test)</span>
          </button>
        </div>

      </div>
    </div>
  );
};

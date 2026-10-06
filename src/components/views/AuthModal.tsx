import React, { useState } from 'react';
import { X, ArrowRight, Github, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
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
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
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
      setErrorMessage('Authentication error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
      <div className="bg-[#F8F3EC] border border-[#EAE3D9] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative text-left">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white border border-[#EAE3D9] text-[#706B67] hover:text-[#281010] shadow-2xs"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FA5929] uppercase mb-2">
          <Lock className="w-4 h-4" />
          <span>Supabase Auth Gateway</span>
        </div>

        <h3 className="text-2xl font-black text-[#281010] font-heading mb-1">
          {mode === 'signup' ? 'Create Fellow Account' : 'Sign in to Academy'}
        </h3>
        <p className="text-xs text-[#706B67] mb-6">
          Access all course modules, workspace starters, and agent sandboxes.
        </p>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9] mb-6">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'signin' ? 'bg-[#281010] text-white shadow-xs' : 'text-[#706B67]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'signup' ? 'bg-[#281010] text-white shadow-xs' : 'text-[#706B67]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-mono font-bold text-[#281010] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex Rivera"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold text-[#281010] mb-1">
              Work Email
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#281010] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLoading ? 'Authenticating...' : mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PricingPlan } from '../types';
import confetti from 'canvas-confetti';
import { ShieldCheck, Lock, CheckCircle2, CreditCard, Sparkles, X } from 'lucide-react';

interface CheckoutModalProps {
  plan: PricingPlan | null;
  onClose: () => void;
  onEnrollSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  plan,
  onClose,
  onEnrollSuccess
}) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!plan) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsProcessing(true);

    // Simulate Stripe Checkout API & Webhook Entitlement Lifecycle
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        onEnrollSuccess();
        onClose();
      }, 2200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative text-left">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg bg-[#F4F7FB] border border-slate-200 text-slate-400 hover:text-slate-700 shadow-2xs"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2F80ED] uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Enrollment & Checkout</span>
            </div>

            <h3 className="text-2xl font-extrabold text-[#10213F]">
              {plan.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
              {plan.tagline}
            </p>

            {/* Price & Summary Box */}
            <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-mono block">Investment:</span>
                <span className="text-2xl font-extrabold font-mono text-[#10213F]">
                  ${plan.annualPrice > 0 ? plan.annualPrice : 0}
                </span>
              </div>
              <div className="text-right text-xs font-mono text-[#34D399] font-bold">
                ✓ Full 10-Module Access
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-[#10213F] focus:outline-none focus:border-[#2F80ED] font-sans shadow-2xs"
                />
              </div>

              {plan.annualPrice > 0 && (
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Card Details (Simulated Stripe Elements)
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700 shadow-2xs">
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#2F80ED]" />
                      <span>•••• •••• •••• 4242</span>
                    </span>
                    <span className="text-slate-400">12/28 · 123</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-[#071B3A] hover:bg-[#10213F] text-white font-bold text-sm shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isProcessing ? (
                  <span>Securing Entitlement with Stripe...</span>
                ) : (
                  <span>Complete Enrollment (${plan.annualPrice > 0 ? plan.annualPrice : 'Free'})</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#34D399]" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-[#34D399] flex items-center justify-center mx-auto animate-bounce shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#10213F]">Welcome to LetsVibeAI!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your enrollment is active and your student workspace is unlocked. Happy vibe coding!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

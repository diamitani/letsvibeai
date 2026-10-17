import React, { useState } from 'react';
import { PricingPlan } from '../types';
import confetti from 'canvas-confetti';
import { Lock, CheckCircle2, CreditCard, Sparkles, X, ArrowRight } from 'lucide-react';

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

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        onEnrollSuccess();
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
      <div className="bg-[#F8F3EC] border border-[#EAE3D9] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative text-left">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white border border-[#EAE3D9] text-[#706B67] hover:text-[#281010] shadow-2xs"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FA5929] uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Enrollment & Checkout</span>
            </div>

            <h3 className="text-2xl font-black text-[#281010] font-heading mb-1">{plan.name}</h3>
            <p className="text-xs text-[#706B67] mb-6">{plan.tagline}</p>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] mb-6 flex items-baseline justify-between">
              <span className="text-xs font-mono text-[#706B67]">Tuition Amount:</span>
              <span className="text-2xl font-black font-heading text-[#281010]">${plan.monthlyPrice}</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#281010] mb-1">
                  Email Address for Course Access
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-2xs"
                />
              </div>

              <div className="p-3 bg-white rounded-2xl border border-[#EAE3D9] text-xs text-[#706B67] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#34D399] shrink-0" />
                <span>Encrypted 256-bit Stripe Checkout Session</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isProcessing ? 'Processing Entitlement...' : `Confirm & Pay $${plan.monthlyPrice}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#34D399]/20 text-[#34D399] flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-black text-[#281010] font-heading">
              Welcome to the Cohort!
            </h3>
            <p className="text-xs text-[#706B67]">
              Your course entitlement has been activated. Redirecting to curriculum...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

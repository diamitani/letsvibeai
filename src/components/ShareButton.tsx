import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

export function ShareButton({ title, className = 'btn-ghost' }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* cancelled: fall back to copying */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt('Copy this link:', url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={share} className={className}>
      {copied ? <Check className="h-4 w-4 text-growth" /> : <Share2 className="h-4 w-4" />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
}

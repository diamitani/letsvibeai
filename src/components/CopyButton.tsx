'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ text, label = 'Copy prompt' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="btn-ghost !px-3 !py-2 text-xs"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1600);
      }}
    >
      {ok ? <Check className="h-3.5 w-3.5 text-growth" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? 'Copied' : label}
    </button>
  );
}

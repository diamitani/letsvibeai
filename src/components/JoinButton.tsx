'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export function JoinButton({ className = 'btn-primary mt-8 !px-7 !py-3.5 text-base' }: { className?: string }) {
  const { user, openAuth } = useAuth();
  if (user) {
    return (
      <Link href="/account" className={className}>
        Continue learning <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }
  return (
    <button type="button" onClick={() => openAuth('signup')} className={className}>
      Create your free account <ArrowRight className="h-4 w-4" />
    </button>
  );
}

'use client';

import { AuthProvider } from '@/lib/auth';
import { AuthModal } from './AuthModal';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthModal />
      {children}
    </AuthProvider>
  );
}

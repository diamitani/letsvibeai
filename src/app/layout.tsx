import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { pageMeta } from '@/lib/seo';
import { siteUrl } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMeta({
    title: undefined,
    description:
      'Free, plain-English courses that take you from a vibe-coded idea to a shipped product on Lovable, Bolt, v0, Cursor, Claude Code, Windsurf, Supabase, Vercel and Stripe.',
    path: '/',
  }),
  icons: {
    icon: '/brand/app-icon.svg',
    apple: '/brand/app-icon-180.png',
  },
  other: { 'theme-color': '#0B1F44' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Sora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <div id="main" className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

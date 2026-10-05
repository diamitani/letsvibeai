"use client";

import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased cinematic-noise">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

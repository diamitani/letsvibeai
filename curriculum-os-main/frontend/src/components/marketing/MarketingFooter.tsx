"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="ap-foot">
      <div className="ap-foot__grid">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center rounded">
              C
            </div>
            <span className="font-sans font-bold text-lg tracking-tight">CurriculumOS</span>
          </div>
          <p className="ap-foot__brand-line">AI-powered curriculum research and generation platform built on the ROSTR framework.</p>
          <p className="font-mono text-[10px] text-blue-400 mt-3 uppercase tracking-widest">
            Powered by Multi-Agent AI
          </p>
        </div>
        <div>
          <div className="ap-foot__col-title">Platform</div>
          <Link href="/app" className="ap-foot__link">Dashboard</Link>
          <Link href="/features" className="ap-foot__link">Features</Link>
          <Link href="/how-it-works" className="ap-foot__link">How It Works</Link>
          <Link href="/integrations" className="ap-foot__link">Integrations</Link>
        </div>
        <div>
          <div className="ap-foot__col-title">Resources</div>
          <Link href="/docs" className="ap-foot__link">Documentation</Link>
          <Link href="https://github.com/diamitani/curriculum-os" className="ap-foot__link" target="_blank">GitHub</Link>
          <Link href="/docs/rostr" className="ap-foot__link">ROSTR Framework</Link>
          <Link href="/api" className="ap-foot__link">API Reference</Link>
        </div>
        <div>
          <div className="ap-foot__col-title">Company</div>
          <Link href="/pricing" className="ap-foot__link">Pricing</Link>
          <Link href="/about" className="ap-foot__link">About</Link>
          <Link href="/contact" className="ap-foot__link">Contact</Link>
          <Link href="/privacy" className="ap-foot__link">Privacy</Link>
        </div>
      </div>

      <div className="ap-foot__bar">
        <div>&copy; {year} CurriculumOS. MIT License.</div>
        <div className="flex gap-4">
          <Link href="https://github.com/diamitani/curriculum-os" target="_blank" className="text-white hover:text-blue-400 transition-colors">
            <Github size={16} />
          </Link>
          <Link href="#" className="text-white hover:text-blue-400 transition-colors">
            <Twitter size={16} />
          </Link>
        </div>
        <span className="ap-foot__status">⚡ ALL AGENTS OPERATIONAL</span>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`ap-nav ${scrolled ? "is-scrolled" : ""}`} role="navigation">
        <Link href="/" className="ap-nav__brand ap-lift">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">C</span>
          </div>
          CurriculumOS
        </Link>

        <div className="ap-nav__links hidden md:flex">
          <Link href="/features" className="ap-nav__link">Features</Link>
          <Link href="/how-it-works" className="ap-nav__link">How It Works</Link>
          <Link href="/pricing" className="ap-nav__link">Pricing</Link>
          <Link href="/docs" className="ap-nav__link">Docs</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="ap-nav__link !opacity-90 hidden md:block">
            Sign In
          </Link>
          <Link href="/signup" className="ap-btn ap-btn--primary !px-4 !py-2 !text-[13px] hidden md:inline-flex">
            <span className="relative z-[2]">Get Started</span>
            <div className="ap-btn__bg"></div>
          </Link>
          
          <button 
            className="md:hidden p-2 text-current bg-transparent border-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 bg-[#0E0C09] z-[90] p-[80px_6vw] text-white flex flex-col gap-6 text-2xl font-sans font-semibold">
          <Link href="/features" onClick={() => setMobileOpen(false)}>Features</Link>
          <Link href="/how-it-works" onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/docs" onClick={() => setMobileOpen(false)}>Docs</Link>
          <Link href="/signup" className="ap-btn ap-btn--primary justify-center mt-6">
            <span className="relative z-[2]">Get Started</span>
            <div className="ap-btn__bg"></div>
          </Link>
        </div>
      )}
    </>
  );
}

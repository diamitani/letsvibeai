import React, { useState, useEffect } from 'react';
import { Sparkles, Search, BookOpen, Layers, Terminal, Award, ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenSearch: () => void;
  completedModulesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenSearch,
  completedModulesCount
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'video', label: 'Watch Video', icon: Sparkles },
    { id: 'architecture', label: 'Architecture Map', icon: Layers },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'studio', label: 'Prompt Studio', icon: Terminal },
    { id: 'docs', label: 'Document Stack', icon: BookOpen },
    { id: 'capstone', label: 'Capstone & Cert', icon: Award },
    { id: 'pricing', label: 'Pricing', icon: ChevronRight },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-zinc-800/70 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo.svg"
            alt="LetsVibeAI Logo"
            className="w-9 h-9 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              LetsVibe<span className="text-emerald-400">AI</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono tracking-normal">v1.0</span>
            </span>
            <span className="text-[10px] text-zinc-400 tracking-wider uppercase font-mono">Architecture First</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-all group"
            title="Search course & prompts (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            <span>Search</span>
            <kbd className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>

          {/* Progress Pill */}
          <button
            onClick={() => handleNavClick('curriculum')}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-full hover:border-emerald-500/50 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-semibold">{completedModulesCount}/10 Done</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('pricing')}
            className="px-4 py-2 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] rounded-full transition-all shadow-lg shadow-emerald-500/20"
          >
            Start Building
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-full"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-full"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-2 mt-3 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-emerald-400" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </button>
          ))}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full py-3 text-center text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl"
            >
              Enroll in Full Course
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

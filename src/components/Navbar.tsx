import React, { useState, useEffect } from 'react';
import { Sparkles, Search, BookOpen, Layers, Terminal, Award, ChevronRight, Menu, X, Bot, Play, ShoppingBag, Compass, LayoutDashboard, User } from 'lucide-react';

interface NavbarProps {
  currentView: 'saas' | 'marketplace' | 'directory' | 'dashboard';
  setCurrentView: (view: 'saas' | 'marketplace' | 'directory' | 'dashboard') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenAgent: () => void;
  onOpenAuth: () => void;
  completedModulesCount: number;
  user: { email: string; name: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeSection,
  setActiveSection,
  onOpenSearch,
  onOpenAgent,
  onOpenAuth,
  completedModulesCount,
  user
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
    { id: 'video', label: 'Watch Video', icon: Play },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'sandbox', label: 'AI Sandbox', icon: Terminal },
    { id: 'studio', label: 'Prompt Studio', icon: Sparkles },
    { id: 'docs', label: '11 Docs', icon: BookOpen },
    { id: 'capstone', label: 'Capstone', icon: Award },
    { id: 'pricing', label: 'Pricing', icon: ChevronRight },
  ];

  const handleNavClick = (id: string) => {
    if (currentView !== 'saas') {
      setCurrentView('saas');
    }
    setActiveSection(id);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090a0f]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-2.5'
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Standalone Apple Mark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentView('saas');
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
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono">v1.0</span>
            </span>
            <span className="text-[10px] text-zinc-400 tracking-wider uppercase font-mono">Architecture First</span>
          </div>
        </a>

        {/* Center View Selector Pill */}
        <div className="hidden lg:flex items-center bg-zinc-950/80 p-1 rounded-full border border-zinc-800/90 backdrop-blur-md">
          <button
            onClick={() => setCurrentView('saas')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'saas'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Course & SaaS</span>
          </button>

          <button
            onClick={() => setCurrentView('marketplace')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'marketplace'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => setCurrentView('directory')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'directory'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Directory & CRM</span>
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'dashboard'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Right Action Tools */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-all group"
            title="Search course & prompts (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
            <kbd className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>

          {/* AI Coach Button */}
          <button
            onClick={onOpenAgent}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 rounded-full transition-all shadow-sm group"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>ROSTR AI</span>
          </button>

          {/* User Sign In / Profile Button */}
          {user ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 px-3 py-1 text-xs text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-400 text-black flex items-center justify-center font-bold text-[10px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium max-w-[90px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-all"
            >
              Sign In
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('pricing')}
            className="px-4 py-2 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] rounded-full transition-all shadow-lg shadow-emerald-500/20"
          >
            Enroll V1
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenAgent}
            className="p-2 text-cyan-400 bg-cyan-950/60 border border-cyan-800 rounded-full"
            title="Open AI Coach"
          >
            <Bot className="w-4 h-4" />
          </button>
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
        <div className="lg:hidden bg-zinc-950/95 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-3 mt-3 backdrop-blur-xl">
          {/* View Toggles Mobile */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-900">
            <button
              onClick={() => {
                setCurrentView('saas');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'saas' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Course & SaaS</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('marketplace');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'marketplace' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Marketplace</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('directory');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'directory' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Directory & CRM</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'dashboard' ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
              <span>Dashboard</span>
            </button>
          </div>

          {currentView === 'saas' && (
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                </button>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-zinc-900 border border-zinc-800 rounded-xl"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgent();
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-cyan-300 bg-cyan-950 border border-cyan-800 rounded-xl flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Curriculum Agent (ROSTR v2)</span>
            </button>
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


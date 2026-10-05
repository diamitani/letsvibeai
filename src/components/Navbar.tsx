import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Layers, Terminal, Award, ChevronRight, Menu, X, Bot, Play, ShoppingBag, Compass, LayoutDashboard, User } from 'lucide-react';

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
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'video', label: 'Watch Trailer', icon: Play },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'sandbox', label: 'AI Sandbox', icon: Terminal },
    { id: 'docs', label: '11 Docs', icon: BookOpen },
    { id: 'capstone', label: 'Capstone', icon: Award },
    { id: 'pricing', label: 'Tuition', icon: ChevronRight },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Gateway V + LetsVibeAI + Tagline */}
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
            src="/logo-standalone-mark.svg"
            alt="LetsVibeAI Gateway V"
            className="w-8 h-8 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-lg tracking-tight text-[#10213F]">
                LetsVibe<span className="text-[#2F80ED]">AI</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4F7FB] text-[#2F80ED] border border-blue-100 font-mono font-medium">
                Institution
              </span>
            </div>
            <span className="text-[9px] text-slate-500 font-bold tracking-wider mt-0.5 uppercase">
              Learn <span className="text-[#34D399]">•</span> Build <span className="text-[#7C5CFC]">•</span> Ship
            </span>
          </div>
        </a>

        {/* Center View Selector Pill */}
        <div className="hidden lg:flex items-center bg-[#F4F7FB] p-1 rounded-full border border-slate-200">
          <button
            onClick={() => setCurrentView('saas')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'saas'
                ? 'bg-white text-[#10213F] shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2F80ED]" />
            <span>Academy & SaaS</span>
          </button>

          <button
            onClick={() => setCurrentView('marketplace')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'marketplace'
                ? 'bg-white text-[#10213F] shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Marketplace</span>
          </button>

          <button
            onClick={() => setCurrentView('directory')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'directory'
                ? 'bg-white text-[#10213F] shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#20C7D9]" />
            <span>Directory & CRM</span>
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'dashboard'
                ? 'bg-white text-[#10213F] shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Right Action Tools */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-[#F4F7FB] hover:bg-slate-100 border border-slate-200 rounded-full transition-all group"
            title="Search course & prompts (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2F80ED] transition-colors" />
            <kbd className="text-[10px] bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-mono">⌘K</kbd>
          </button>

          {/* AI Coach Button */}
          <button
            onClick={onOpenAgent}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-[#071B3A] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full transition-all shadow-sm group"
          >
            <Bot className="w-3.5 h-3.5 text-[#2F80ED] group-hover:rotate-12 transition-transform" />
            <span>AI Coach (ROSTR)</span>
          </button>

          {/* User Sign In / Profile Button */}
          {user ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 px-3 py-1 text-xs text-[#10213F] bg-[#F4F7FB] hover:bg-slate-100 border border-slate-200 rounded-full transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-[#2F80ED] text-white flex items-center justify-center font-bold text-[10px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold max-w-[90px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#10213F] hover:text-[#2F80ED] bg-white hover:bg-[#F4F7FB] border border-slate-200 rounded-full transition-all"
            >
              Sign In
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('pricing')}
            className="px-4 py-2 text-xs font-bold text-white bg-[#071B3A] hover:bg-[#10213F] active:scale-[0.98] rounded-full transition-all shadow-md shadow-slate-900/10"
          >
            Enroll in V1
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenAgent}
            className="p-2 text-[#2F80ED] bg-blue-50 border border-blue-200 rounded-full"
            title="Open AI Coach"
          >
            <Bot className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-[#10213F] bg-[#F4F7FB] border border-slate-200 rounded-full"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-[#10213F] bg-[#F4F7FB] border border-slate-200 rounded-full"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 mt-2 shadow-lg">
          {/* View Toggles Mobile */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setCurrentView('saas');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'saas' ? 'bg-[#F4F7FB] text-[#10213F] font-bold border border-slate-200' : 'text-slate-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>Academy & SaaS</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('marketplace');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'marketplace' ? 'bg-[#F4F7FB] text-[#10213F] font-bold border border-slate-200' : 'text-slate-600'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Marketplace</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('directory');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'directory' ? 'bg-[#F4F7FB] text-[#10213F] font-bold border border-slate-200' : 'text-slate-600'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#20C7D9]" />
              <span>Directory & CRM</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                currentView === 'dashboard' ? 'bg-[#F4F7FB] text-[#10213F] font-bold border border-slate-200' : 'text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Dashboard</span>
            </button>
          </div>

          {currentView === 'saas' && (
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#10213F] hover:bg-[#F4F7FB] rounded-xl"
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-3.5 h-3.5 text-[#2F80ED]" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-[#10213F] bg-[#F4F7FB] border border-slate-200 rounded-xl"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgent();
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-[#071B3A] bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#2F80ED]" />
              <span>Launch Curriculum Agent (ROSTR v2)</span>
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full py-3 text-center text-sm font-bold text-white bg-[#071B3A] hover:bg-[#10213F] rounded-xl"
            >
              Enroll in Full Course
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

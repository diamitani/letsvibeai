import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Layers,
  Terminal,
  Award,
  ChevronRight,
  Menu,
  X,
  Bot,
  Play,
  ShoppingBag,
  Compass,
  LayoutDashboard,
  User as UserIcon,
  Sparkles,
  Cpu
} from 'lucide-react';

interface NavbarProps {
  currentView: 'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery';
  setCurrentView: (view: 'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery') => void;
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

  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'saas') {
      setCurrentView('saas');
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 pt-4 pb-2 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 pointer-events-auto border ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200/90 shadow-md py-3 px-5 sm:px-6'
            : 'bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xs py-3.5 px-5 sm:px-7'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo - Gateway V + LetsVibeAI */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('saas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#071B3A] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
                <path
                  d="M10 12L24 38L38 12"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="22" r="4" fill="#34D399" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2 leading-none">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#10213F]">
                  LetsVibe<span className="text-[#2F80ED]">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#2F80ED] border border-blue-200/60 font-semibold uppercase tracking-wider">
                  Academy
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider mt-1 uppercase">
                Learn <span className="text-[#2F80ED]">•</span> Build <span className="text-[#34D399]">•</span> Ship
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Spacious, Clean Typography) */}
          <nav className="hidden xl:flex items-center gap-1.5">
            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('curriculum');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'curriculum'
                  ? 'bg-[#F4F7FB] text-[#10213F] font-bold'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              Curriculum (10)
            </button>

            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('architecture');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'architecture'
                  ? 'bg-[#F4F7FB] text-[#10213F] font-bold'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              Architecture Map
            </button>

            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('sandbox');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'sandbox'
                  ? 'bg-[#F4F7FB] text-[#10213F] font-bold'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              AI Sandbox
            </button>

            <button
              onClick={() => setCurrentView('agent-platform')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'agent-platform'
                  ? 'bg-blue-50 text-[#071B3A] border border-blue-200/80 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>Skills Hub</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-[#2F80ED] font-mono font-bold">32</span>
            </button>

            <button
              onClick={() => setCurrentView('harness-mastery')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'harness-mastery'
                  ? 'bg-amber-50 text-[#071B3A] border border-amber-300/80 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-[#E9A93B]" />
              <span>Harnesses</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-[#B8741A] font-mono font-bold">8</span>
            </button>

            <button
              onClick={() => setCurrentView('marketplace')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'marketplace'
                  ? 'bg-emerald-50 text-[#071B3A] border border-emerald-200/80 font-bold'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Marketplace</span>
            </button>

            <button
              onClick={() => setCurrentView('directory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'directory'
                  ? 'bg-cyan-50 text-[#071B3A] border border-cyan-200/80 font-bold'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#20C7D9]" />
              <span>Directory</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-violet-50 text-[#071B3A] border border-violet-200/80 font-bold'
                  : 'text-slate-600 hover:text-[#10213F] hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Console</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs text-slate-500 bg-[#F4F7FB] hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
              title="Search lessons and prompts (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Search</span>
              <kbd className="text-[10px] bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-mono">⌘K</kbd>
            </button>

            {/* AI Copilot Drawer Trigger */}
            <button
              onClick={onOpenAgent}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#071B3A] bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl transition-all shadow-xs"
            >
              <Bot className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>Ask Copilot</span>
            </button>

            {/* User Account / Sign In */}
            {user ? (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#10213F] bg-[#F4F7FB] hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-[#2F80ED] text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-semibold max-w-[100px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-bold text-[#10213F] hover:text-[#2F80ED] bg-white hover:bg-[#F4F7FB] border border-slate-200 rounded-xl transition-all shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('pricing')}
              className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#071B3A] hover:bg-[#10213F] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-slate-900/10"
            >
              Start V1
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-[#10213F] bg-[#F4F7FB] border border-slate-200 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-w-7xl mx-auto mt-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xl pointer-events-auto space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setCurrentView('saas');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'saas' ? 'bg-[#F4F7FB] text-[#10213F] border border-slate-200' : 'text-slate-600'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#2F80ED]" />
              <span>Academy</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('agent-platform');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'agent-platform' ? 'bg-blue-50 text-[#071B3A] border border-blue-200' : 'text-slate-600'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#2F80ED]" />
              <span>Skills Hub (32)</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('harness-mastery');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'harness-mastery' ? 'bg-amber-50 text-[#071B3A] border border-amber-300' : 'text-slate-600'
              }`}
            >
              <Play className="w-4 h-4 text-[#E9A93B]" />
              <span>Harnesses (8)</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('marketplace');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'marketplace' ? 'bg-emerald-50 text-[#071B3A] border border-emerald-200' : 'text-slate-600'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#34D399]" />
              <span>Marketplace</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('directory');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'directory' ? 'bg-cyan-50 text-[#071B3A] border border-cyan-200' : 'text-slate-600'
              }`}
            >
              <Compass className="w-4 h-4 text-[#20C7D9]" />
              <span>Directory</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'dashboard' ? 'bg-violet-50 text-[#071B3A] border border-violet-200' : 'text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#7C5CFC]" />
              <span>Console</span>
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('curriculum')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-700 hover:bg-[#F4F7FB] rounded-xl"
            >
              <span>Course Curriculum (10 Modules)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-700 hover:bg-[#F4F7FB] rounded-xl"
            >
              <span>11-Layer Web Architecture</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('sandbox')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-700 hover:bg-[#F4F7FB] rounded-xl"
            >
              <span>Interactive AI Sandbox</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-slate-700 hover:bg-[#F4F7FB] rounded-xl"
            >
              <span>Tuition & Enrollment</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgent();
              }}
              className="w-full py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-[#071B3A] flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#2F80ED]" />
              <span>Launch Curriculum Copilot</span>
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full py-3 bg-[#071B3A] hover:bg-[#10213F] text-white rounded-xl text-xs font-extrabold shadow-md"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

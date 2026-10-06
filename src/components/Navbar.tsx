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
  currentView: 'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery' | 'skills-library';
  setCurrentView: (view: 'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery' | 'skills-library') => void;
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
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 pointer-events-auto border ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-[#EAE3D9] shadow-[0_8px_30px_rgba(40,16,16,0.08)] py-2.5 px-5 sm:px-6'
            : 'bg-white/90 backdrop-blur-sm border-[#EAE3D9]/80 shadow-[0_4px_20px_rgba(40,16,16,0.04)] py-3 px-5 sm:px-7'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo - Lexio styled Gateway V + LetsVibeAI */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('saas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-[#281010] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
                <path
                  d="M10 12L24 38L38 12"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="22" r="4" fill="#FA5929" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2 leading-none">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#281010]">
                  LetsVibe<span className="text-[#FA5929]">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/50 font-bold uppercase tracking-wider">
                  Academy
                </span>
              </div>
              <span className="text-[10px] text-[#706B67] font-bold tracking-wider mt-1 uppercase">
                Learn <span className="text-[#FA5929]">•</span> Build <span className="text-[#34D399]">•</span> Ship
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Lexio Rounded-Full Pills) */}
          <nav className="hidden xl:flex items-center gap-1.5">
            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('curriculum');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'curriculum'
                  ? 'bg-[#FBE1CE] text-[#FA5929] font-bold border border-[#FCAA91]/60'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              Curriculum (10)
            </button>

            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('architecture');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'architecture'
                  ? 'bg-[#FBE1CE] text-[#FA5929] font-bold border border-[#FCAA91]/60'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              Architecture Map
            </button>

            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('sandbox');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'sandbox'
                  ? 'bg-[#FBE1CE] text-[#FA5929] font-bold border border-[#FCAA91]/60'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              AI Sandbox
            </button>

            <button
              onClick={() => setCurrentView('agent-platform')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'agent-platform'
                  ? 'bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60 font-bold shadow-2xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#FA5929]" />
              <span>Skills Hub</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FBE1CE] text-[#FA5929] font-mono font-bold">32</span>
            </button>

            <button
              onClick={() => setCurrentView('harness-mastery')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'harness-mastery'
                  ? 'bg-amber-100/70 text-[#B8741A] border border-amber-300 font-bold shadow-2xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-[#E9A93B]" />
              <span>Harnesses</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 text-[#B8741A] font-mono font-bold">8</span>
            </button>

            <button
              onClick={() => setCurrentView('skills-library')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'skills-library'
                  ? 'bg-[#E1E3F6] text-[#7C5CFC] border border-[#7C5CFC]/40 font-bold shadow-2xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Skills Lib</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#E1E3F6] text-[#7C5CFC] font-mono font-bold">46</span>
            </button>

            <button
              onClick={() => setCurrentView('marketplace')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'marketplace'
                  ? 'bg-[#C4DAC8]/60 text-[#1B4D2B] border border-[#C4DAC8] font-bold'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Marketplace</span>
            </button>

            <button
              onClick={() => setCurrentView('directory')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'directory'
                  ? 'bg-cyan-50 text-[#0F606B] border border-cyan-200/80 font-bold'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#20C7D9]" />
              <span>Directory</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-violet-50 text-[#4C2889] border border-violet-200/80 font-bold'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Console</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs text-[#706B67] bg-[#F8F3EC] hover:bg-[#EAE3D9]/60 border border-[#EAE3D9] rounded-full transition-all"
              title="Search lessons and prompts (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#706B67]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="text-[10px] bg-white text-[#706B67] px-1.5 py-0.5 rounded-full border border-[#EAE3D9] font-mono">⌘K</kbd>
            </button>

            {/* AI Copilot Drawer Trigger */}
            <button
              onClick={onOpenAgent}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#FA5929] bg-[#FBE1CE] hover:bg-[#fbd3ba] border border-[#FCAA91]/50 rounded-full transition-all shadow-xs"
            >
              <Bot className="w-3.5 h-3.5 text-[#FA5929]" />
              <span>Ask Copilot</span>
            </button>

            {/* User Account / Sign In */}
            {user ? (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#281010] bg-[#F8F3EC] hover:bg-[#EAE3D9]/60 border border-[#EAE3D9] rounded-full transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#FA5929] text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-semibold max-w-[100px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-bold text-[#281010] hover:text-[#FA5929] bg-white hover:bg-[#F8F3EC] border border-[#EAE3D9] rounded-full transition-all shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Primary Action Button (Lexio Coral Flame Pill) */}
            <button
              onClick={() => handleNavClick('pricing')}
              className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#FA5929] hover:bg-[#E0491B] active:scale-[0.98] rounded-full transition-all shadow-md shadow-[#FA5929]/20"
            >
              Start V1
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#706B67] hover:text-[#281010] bg-[#F8F3EC] border border-[#EAE3D9] rounded-full"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#281010]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-w-7xl mx-auto mt-3 bg-white border border-[#EAE3D9] rounded-3xl p-5 shadow-xl pointer-events-auto space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-3 border-b border-[#EAE3D9]/60">
            <button
              onClick={() => {
                setCurrentView('saas');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'saas' ? 'bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60' : 'text-[#706B67]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#FA5929]" />
              <span>Academy</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('agent-platform');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'agent-platform' ? 'bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60' : 'text-[#706B67]'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#FA5929]" />
              <span>Skills Hub (32)</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('harness-mastery');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'harness-mastery' ? 'bg-amber-100 text-[#B8741A] border border-amber-300' : 'text-[#706B67]'
              }`}
            >
              <Play className="w-4 h-4 text-[#E9A93B]" />
              <span>Harnesses (8)</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('skills-library');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'skills-library' ? 'bg-[#E1E3F6] text-[#7C5CFC] border border-[#7C5CFC]/40' : 'text-[#706B67]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#7C5CFC]" />
              <span>Skills Lib (46)</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('marketplace');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'marketplace' ? 'bg-[#C4DAC8]/60 text-[#1B4D2B] border border-[#C4DAC8]' : 'text-[#706B67]'
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
              className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'directory' ? 'bg-cyan-50 text-[#0F606B] border border-cyan-200' : 'text-[#706B67]'
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
              className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'dashboard' ? 'bg-violet-50 text-[#4C2889] border border-violet-200' : 'text-[#706B67]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#7C5CFC]" />
              <span>Console</span>
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('curriculum')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-[#281010] hover:bg-[#F8F3EC] rounded-2xl"
            >
              <span>Course Curriculum (10 Modules)</span>
              <ChevronRight className="w-4 h-4 text-[#706B67]" />
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-[#281010] hover:bg-[#F8F3EC] rounded-2xl"
            >
              <span>11-Layer Web Architecture</span>
              <ChevronRight className="w-4 h-4 text-[#706B67]" />
            </button>
            <button
              onClick={() => handleNavClick('sandbox')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-[#281010] hover:bg-[#F8F3EC] rounded-2xl"
            >
              <span>Interactive AI Sandbox</span>
              <ChevronRight className="w-4 h-4 text-[#706B67]" />
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full flex items-center justify-between p-2.5 text-xs font-semibold text-[#281010] hover:bg-[#F8F3EC] rounded-2xl"
            >
              <span>Tuition & Enrollment</span>
              <ChevronRight className="w-4 h-4 text-[#706B67]" />
            </button>
          </div>

          <div className="pt-3 border-t border-[#EAE3D9] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgent();
              }}
              className="w-full py-3 bg-[#FBE1CE] hover:bg-[#fbd3ba] border border-[#FCAA91]/50 rounded-full text-xs font-bold text-[#FA5929] flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#FA5929]" />
              <span>Launch Curriculum Copilot</span>
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full py-3 bg-[#FA5929] hover:bg-[#E0491B] text-white rounded-full text-xs font-extrabold shadow-md"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

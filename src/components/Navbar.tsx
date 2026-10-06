import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  Play,
  Terminal,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  currentView: 'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery' | 'skills-library';
  setCurrentView: (view: 'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery' | 'skills-library') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenAgent: () => void;
  onOpenAuth: () => void;
  completedModulesCount?: number;
  user?: { email: string; name: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeSection,
  setActiveSection,
  onOpenSearch,
  onOpenAuth,
  completedModulesCount = 1,
  user
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'saas') {
      setCurrentView('saas');
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F3EC]/90 backdrop-blur-xl border border-[#EAE3D9] shadow-lg shadow-black/5 py-2.5 px-4 sm:px-6'
            : 'bg-[#F8F3EC]/70 backdrop-blur-md border border-[#EAE3D9]/80 py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <button
            onClick={() => {
              setCurrentView('saas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#281010] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform relative">
              <span className="font-heading font-black text-sm tracking-tighter">LV</span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FA5929] border-2 border-[#F8F3EC]" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-extrabold text-sm tracking-tight text-[#281010] flex items-center gap-1.5">
                LetsVibeAI
                <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60">
                  ACADEMY
                </span>
              </span>
              <span className="text-[10px] text-[#706B67] font-medium tracking-wide">
                Vibe Coding & Agent Harnesses
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#EDE7DE]/80 p-1.5 rounded-full border border-[#EAE3D9]">
            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('curriculum');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'saas' && activeSection === 'curriculum'
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              Curriculum (10)
            </button>

            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('architecture');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'saas' && activeSection === 'architecture'
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              Architecture
            </button>

            <button
              onClick={() => {
                setCurrentView('agent-platform');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'agent-platform'
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              <span>Skills Hub</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#FBE1CE] text-[#FA5929] font-bold">
                32
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentView('harness-mastery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'harness-mastery'
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              <Play className="w-3 h-3 text-[#FA5929]" />
              <span>Harnesses</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('skills-library');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'skills-library'
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              Library
            </button>

            <button
              onClick={() => {
                setCurrentView('marketplace');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'marketplace'
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              Templates
            </button>

            <button
              onClick={() => {
                setCurrentView('saas');
                handleNavClick('pricing');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentView === 'saas' && activeSection === 'pricing'
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              Tuition
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Search Shortcut */}
            <button
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#EAE3D9] text-[#706B67] hover:text-[#281010] text-xs font-medium shadow-2xs hover:border-[#FA5929] transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#FA5929]" />
              <span className="text-[11px]">Search Academy</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F8F3EC] border border-[#EAE3D9] text-[#706B67]">
                ⌘K
              </kbd>
            </button>

            {/* Auth / Student Dashboard Button */}
            {user ? (
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#EAE3D9] text-xs font-bold text-[#281010] shadow-2xs hover:border-[#FA5929] transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-[#FBE1CE] text-[#FA5929] flex items-center justify-center text-[10px] font-mono">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
                  {completedModulesCount}/10
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-full text-xs font-bold text-[#281010] hover:bg-white/60 transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Primary Action Button (Start V1) */}
            <button
              onClick={() => handleNavClick('pricing')}
              className="px-5 py-2.5 rounded-full text-xs font-extrabold text-white bg-[#FA5929] hover:bg-[#E0491B] active:scale-95 transition-all shadow-md shadow-[#FA5929]/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white border border-[#EAE3D9] text-[#281010] shadow-2xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#EAE3D9] flex flex-col gap-2 pb-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setCurrentView('saas');
                  handleNavClick('curriculum');
                }}
                className="p-3 rounded-2xl bg-white border border-[#EAE3D9] text-xs font-bold text-left flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#FA5929]" />
                <span>Curriculum</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('agent-platform');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-white border border-[#EAE3D9] text-xs font-bold text-left flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-[#FA5929]" />
                <span>Skills Hub (32)</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('harness-mastery');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-white border border-[#EAE3D9] text-xs font-bold text-left flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-[#FA5929]" />
                <span>Harness Academy</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('skills-library');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 rounded-2xl bg-white border border-[#EAE3D9] text-xs font-bold text-left flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#FA5929]" />
                <span>Skills Library</span>
              </button>
            </div>

            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs font-bold text-[#706B67] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#FA5929]" />
              <span>Search All Modules & Prompts</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};

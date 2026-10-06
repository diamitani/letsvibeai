import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  User,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Layers,
  Terminal,
  FileCode,
  ShieldCheck
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
  onOpenAgent,
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border border-[#4a4d4f]/10 shadow-[0_10px_30px_-10px_rgba(16,27,36,0.08)] py-2.5 px-4 sm:px-6'
            : 'bg-white/80 backdrop-blur-md border border-[#4a4d4f]/10 shadow-[0_4px_20px_-4px_rgba(16,27,36,0.04)] py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo - Openclass style with Gateway mark */}
          <button
            onClick={() => {
              setCurrentView('saas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#101b24] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform relative overflow-hidden">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                <path d="M4 6L12 18L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="11" r="2.5" fill="#ec4909" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-black text-base tracking-tight text-[#101b24]">
                  LetsVibe<span className="text-[#ec4909]">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ec4909]/10 text-[#ec4909] border border-[#ec4909]/20">
                  LIVEBUILD
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Menu Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#f7f4f2] p-1.5 rounded-full border border-[#4a4d4f]/10">
            <button
              onClick={() => handleNavClick('hero')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'hero'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about-mentor')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'about-mentor'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('courses')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'courses'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              Courses
            </button>

            <button
              onClick={() => handleNavClick('curriculum')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'curriculum'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              Curriculum (10)
            </button>

            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'how-it-works'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => handleNavClick('sandboxes')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'sandboxes'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              Sandbox
            </button>

            <button
              onClick={() => {
                setCurrentView('agent-platform');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                currentView === 'agent-platform'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#ec4909]" />
              Agent Hub
            </button>

            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentView === 'saas' && activeSection === 'pricing'
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-white/80'
              }`}
            >
              Pricing
            </button>
          </nav>

          {/* Action Buttons: Search, AI Coach, and Primary Openclass CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#f7f4f2] hover:bg-white text-[#4a4d4f] hover:text-[#101b24] border border-[#4a4d4f]/10 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              title="Search curriculum & tools (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline font-mono text-[10px] text-[#4a4d4f]/70 bg-white px-1.5 py-0.5 rounded border border-[#4a4d4f]/10">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Drawer Trigger */}
            <button
              onClick={onOpenAgent}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ec4909]/10 hover:bg-[#ec4909]/20 text-[#ec4909] border border-[#ec4909]/20 text-xs font-semibold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
              <span>AI Coach</span>
            </button>

            {/* User Profile / Auth */}
            <button
              onClick={onOpenAuth}
              className="p-2 rounded-full bg-[#f7f4f2] hover:bg-white text-[#101b24] border border-[#4a4d4f]/10 transition-all cursor-pointer relative"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <User className="w-4 h-4" />
              {user && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ec4909] border-2 border-white" />
              )}
            </button>

            {/* Primary Action Button (OpenClass Signature Orange Pill with White Circle Arrow) */}
            <button
              onClick={() => handleNavClick('pricing')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-98 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#ec4909]/25 flex items-center gap-2 cursor-pointer group"
            >
              <span>Browse Courses</span>
              <div className="w-5 h-5 rounded-full bg-white text-[#ec4909] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#f7f4f2] hover:bg-white text-[#101b24] border border-[#4a4d4f]/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#4a4d4f]/10 flex flex-col gap-1 pb-2">
            <button
              onClick={() => handleNavClick('hero')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about-mentor')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl"
            >
              About the Program
            </button>
            <button
              onClick={() => handleNavClick('courses')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl"
            >
              Top Courses
            </button>
            <button
              onClick={() => handleNavClick('curriculum')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl"
            >
              Curriculum (10 Modules)
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('sandboxes')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl"
            >
              Sandbox & Studio
            </button>
            <button
              onClick={() => {
                setCurrentView('agent-platform');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>Agent Platform Hub</span>
              <Sparkles className="w-4 h-4 text-[#ec4909]" />
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl"
            >
              Pricing & Cohorts
            </button>
          </div>
        )}

      </div>
    </header>
  );
};

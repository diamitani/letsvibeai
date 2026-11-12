import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Youtube,
  Newspaper,
  BookOpen
} from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenAgent: () => void;
  onOpenAuth: () => void;
  onSignOut?: () => void;
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
  onSignOut,
  completedModulesCount = 1,
  user
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [ecosystemMenuOpen, setEcosystemMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const ecosystemMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (ecosystemMenuRef.current && !ecosystemMenuRef.current.contains(event.target as Node)) {
        setEcosystemMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setEcosystemMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            onClick={() => navigateTo('saas')}
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
            {/* 1. Home */}
            <button
              onClick={() => navigateTo('saas')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'saas'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#071B3A] hover:bg-white/80'
              }`}
            >
              Home
            </button>

            {/* 2. All Courses */}
            <button
              onClick={() => navigateTo('courses')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'courses'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#071B3A] hover:bg-white/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>Courses (7)</span>
            </button>

            {/* 3. Vibe Coding 101 (Featured) */}
            <button
              onClick={() => navigateTo('theater')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'theater'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#071B3A] hover:bg-white/80'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span>Vibe Coding 101</span>
            </button>

            {/* 4. Project Labs */}
            <button
              onClick={() => navigateTo('labs')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'labs'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#071B3A] hover:bg-white/80'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#ec4909]" />
              <span>Project Labs</span>
            </button>

            {/* 5. Ecosystem Dropdown */}
            <div className="relative" ref={ecosystemMenuRef}>
              <button
                onClick={() => setEcosystemMenuOpen(!ecosystemMenuOpen)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  ['tools', 'news', 'tutorials', 'portfolio', 'agents', 'directory'].includes(currentView)
                    ? 'bg-[#071B3A] text-white shadow-xs'
                    : 'text-[#4a4d4f] hover:text-[#071B3A] hover:bg-white/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
                <span>Ecosystem</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {ecosystemMenuOpen && (
                <div className="absolute left-0 mt-2 w-60 rounded-2xl bg-white border border-[#EAE3D9] shadow-xl p-2 z-50 text-left animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => navigateTo('tools')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#071B3A] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
                  >
                    <Terminal className="w-4 h-4 text-[#2F80ED]" />
                    <div>
                      <div className="text-xs font-bold text-[#071B3A]">Tools Directory</div>
                      <div className="text-[10px] text-[#706B67] font-normal">Interactive dev sandboxes & PAL</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('news')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#071B3A] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
                  >
                    <Newspaper className="w-4 h-4 text-[#34D399]" />
                    <div>
                      <div className="text-xs font-bold text-[#071B3A]">News & Radar</div>
                      <div className="text-[10px] text-[#706B67] font-normal">Daily industry briefings & articles</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('tutorials')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#071B3A] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
                  >
                    <Youtube className="w-4 h-4 text-[#FF0000]" />
                    <div>
                      <div className="text-xs font-bold text-[#071B3A]">Tutorials ROSTR</div>
                      <div className="text-[10px] text-[#706B67] font-normal">Curated video curriculum & codex</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('portfolio')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#071B3A] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#ec4909]" />
                    <div>
                      <div className="text-xs font-bold text-[#071B3A]">Portfolio & Capstone</div>
                      <div className="text-[10px] text-[#706B67] font-normal">Live student projects & blueprints</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('agents')}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#071B3A] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-[#2F80ED]" />
                    <div>
                      <div className="text-xs font-bold text-[#071B3A]">Agent Platforms & Skills</div>
                      <div className="text-[10px] text-[#706B67] font-normal">Codex, Hermes, OpenClaw, MCP</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 6. Dashboard (if user signed in) */}
            {user && (
              <button
                onClick={() => navigateTo('dashboard')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-[#071B3A] text-white shadow-xs'
                    : 'text-[#4a4d4f] hover:text-[#071B3A] hover:bg-white/80'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#ec4909]" />
                <span>Dashboard</span>
              </button>
            )}
          </nav>

          {/* Action Buttons: Search, AI Coach, and User Profile / Sign In */}
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

            {/* User Profile / Auth Dropdown */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-[#f7f4f2] hover:bg-white text-[#101b24] border border-[#4a4d4f]/10 transition-all cursor-pointer relative"
                  title={`Signed in as ${user.name}`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#071B3A] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#4a4d4f]" />
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#f7f4f2] hover:bg-white text-[#101b24] border border-[#4a4d4f]/10 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  title="Sign In"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {user && userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#EAE3D9] shadow-xl p-2 z-50 text-left animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-2.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-[#071B3A] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#706B67] truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo('dashboard');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-[#071B3A] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#ec4909]" />
                    <span>Fellow Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('theater');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-[#071B3A] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#2F80ED]" />
                    <span>My Courses ({completedModulesCount}/11)</span>
                  </button>

                  {onSignOut && (
                    <button
                      onClick={() => {
                        onSignOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer mt-1 border-t border-slate-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Primary Action Button: Start Free Course */}
            <button
              onClick={() => navigateTo('theater')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-98 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#ec4909]/25 flex items-center gap-2 cursor-pointer group"
            >
              <span>Start Free Course</span>
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
              onClick={() => navigateTo('saas')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>Home / Overview</span>
            </button>
            <button
              onClick={() => navigateTo('courses')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>All 7 Courses & Frontier Platforms</span>
              <span className="text-[10px] bg-[#2F80ED]/10 text-[#2F80ED] px-2 py-0.5 rounded-full font-bold">New</span>
            </button>
            <button
              onClick={() => navigateTo('theater')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>Vibe Coding 101 (10 Modules)</span>
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
            </button>
            <button
              onClick={() => navigateTo('labs')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>Project Labs (Blueprints & Repos)</span>
              <Terminal className="w-4 h-4 text-[#ec4909]" />
            </button>
            <button
              onClick={() => navigateTo('tools')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>Tools Directory & Sandboxes</span>
              <Terminal className="w-4 h-4 text-[#2F80ED]" />
            </button>
            <button
              onClick={() => navigateTo('news')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>News & Daily Briefings</span>
              <Newspaper className="w-4 h-4 text-[#34D399]" />
            </button>
            <button
              onClick={() => navigateTo('tutorials')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>YouTube Tutorials ROSTR</span>
              <Youtube className="w-4 h-4 text-[#FF0000]" />
            </button>
            <button
              onClick={() => navigateTo('portfolio')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>Portfolio & Capstone Showcase</span>
              <Sparkles className="w-4 h-4 text-[#ec4909]" />
            </button>
            <button
              onClick={() => navigateTo('agents')}
              className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl flex items-center justify-between"
            >
              <span>Agent Platforms & Skills Library</span>
              <Layers className="w-4 h-4 text-[#2F80ED]" />
            </button>

            {user ? (
              <button
                onClick={() => navigateTo('dashboard')}
                className="px-4 py-2 text-left text-sm font-semibold text-[#ec4909] bg-[#ec4909]/10 hover:bg-[#ec4909]/20 rounded-xl flex items-center justify-between mt-1"
              >
                <span>Fellow Dashboard ({user.name})</span>
                <LayoutDashboard className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="px-4 py-2 text-left text-sm font-semibold text-[#101b24] hover:bg-[#f7f4f2] rounded-xl mt-1 border-t border-slate-100"
              >
                Sign In / Register
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
};

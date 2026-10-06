import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { VideoShowcase } from './components/VideoShowcase';
import { CourseCatalog } from './components/CourseCatalog';
import { HowItWorks } from './components/HowItWorks';
import { CourseCurriculum } from './components/CourseCurriculum';
import { PortfolioSandbox } from './components/PortfolioSandbox';
import { PromptStudio } from './components/PromptStudio';
import { ArchitectureMap } from './components/ArchitectureMap';
import { DocumentStackViewer } from './components/DocumentStackViewer';
import { CapstoneHub } from './components/CapstoneHub';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { CommunityCta } from './components/CommunityCta';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { CheckoutModal } from './components/CheckoutModal';
import { CurriculumAgentDrawer } from './components/CurriculumAgentDrawer';
import { MarketplaceView } from './components/views/MarketplaceView';
import { DirectoryView } from './components/views/DirectoryView';
import { DashboardView } from './components/views/DashboardView';
import { AgentPlatformView } from './components/views/AgentPlatformView';
import { HarnessMasteryView } from './components/views/HarnessMasteryView';
import { SkillsLibraryView } from './components/views/SkillsLibraryView';
import { AuthModal } from './components/views/AuthModal';
import { supabase } from './lib/supabase';
import { PricingPlan, MarketplaceItem, AgentPlatformSkill } from './types';
import { Sparkles, Layers, Cpu, Terminal, FileCode } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery' | 'skills-library'>('saas');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeSandboxTab, setActiveSandboxTab] = useState<'model-sandbox' | 'prompt-compiler' | 'pal-architecture' | 'doc-stack'>('model-sandbox');
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('letsvibeai_completed_modules');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [agentInitialQuery, setAgentInitialQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    localStorage.setItem('letsvibeai_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  // Sync Supabase Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          email: session.user.email || 'builder@letsvibeai.com',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Vibe Fellow',
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email || 'builder@letsvibeai.com',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Vibe Fellow',
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleToggleCompleteModule = (moduleId: number) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleSelectResult = (targetSection: string, detailId?: string | number) => {
    if (targetSection === 'agent-platform') {
      setCurrentView('agent-platform');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetSection === 'harness-mastery') {
      setCurrentView('harness-mastery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetSection === 'skills-library') {
      setCurrentView('skills-library');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentView !== 'saas') {
      setCurrentView('saas');
    }
    setActiveSection(targetSection);
    setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollTo = (sectionId: string) => {
    if (currentView !== 'saas') {
      setCurrentView('saas');
    }
    setActiveSection(sectionId);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleMarketplaceCheckout = (item: MarketplaceItem) => {
    setSelectedPlan({
      id: item.id,
      name: item.title,
      tagline: item.description.slice(0, 60) + '...',
      monthlyPrice: item.price,
      annualPrice: item.price,
      featured: true,
      badge: item.badge || 'Marketplace Item',
      features: [
        'Complete TypeScript & React 19 source code',
        'Vercel AI SDK 4.0 runtime harness',
        'Supabase schema migrations with RLS policies',
        'One-click Vercel Deploy integration'
      ],
      cta: 'Deploy Now',
      ctaAction: 'checkout'
    });
  };

  const handleSkillCheckout = (skill: AgentPlatformSkill, mode: 'service' | 'skill' | 'package') => {
    const price = mode === 'service' ? skill.servicePrice : mode === 'package' ? 99 : 29;
    setSelectedPlan({
      id: `skill-${skill.id}-${mode}`,
      name: `${skill.name} (${mode === 'service' ? 'Done-For-You' : mode === 'package' ? 'Portable Export' : 'Agent Skill'})`,
      tagline: skill.summary,
      monthlyPrice: price,
      annualPrice: price,
      featured: true,
      badge: mode === 'service' ? 'DFY Service' : mode === 'package' ? 'Code Bundle' : 'Skill Attachment',
      features: [
        `Category: ${skill.cat.toUpperCase()}`,
        '4-Step Execution Runbook included',
        'Portable MCP / Agent instruction format',
        'Direct integration with Supabase & Vercel AI SDK'
      ],
      cta: 'Complete Purchase',
      ctaAction: 'checkout'
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f4f2] text-[#101b24] flex flex-col font-sans selection:bg-[#ec4909] selection:text-white relative">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAgent={() => {
          setAgentInitialQuery('');
          setIsAgentOpen(true);
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
        completedModulesCount={completedModules.length}
        user={user}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'saas' && (
          <div className="animate-in fade-in duration-300">
            
            {/* 1. Hero Section */}
            <Hero
              onStartCourse={() => scrollTo('courses')}
              onWatchVideo={() => scrollTo('video')}
              onExploreArchitecture={() => scrollTo('about-mentor')}
            />

            {/* 2. About Mentor & Program Section */}
            <AboutSection onExploreCourses={() => scrollTo('courses')} />

            {/* 3. Masterclass Video Showcase & Live Coding */}
            <VideoShowcase />

            {/* 4. Top Courses & Tracks Catalog */}
            <CourseCatalog
              onSelectModule={(moduleId) => {
                scrollTo('curriculum');
              }}
              onEnrollPlan={(courseTitle) => {
                scrollTo('pricing');
              }}
            />

            {/* 5. 3-Step Learning Process */}
            <HowItWorks onStartCourse={() => scrollTo('curriculum')} />

            {/* 6. Full 10-Module Syllabus Deep Dive */}
            <CourseCurriculum
              completedModules={completedModules}
              onToggleCompleteModule={handleToggleCompleteModule}
            />

            {/* 7. Interactive Sandboxes & Engineering Tools Section */}
            <section id="sandboxes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
              
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
                  <span>Interactive Engineering Tools</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
                  Test, Benchmark &{' '}
                  <span className="font-serif italic font-normal text-[#ec4909]">
                    Compile In Real Time.
                  </span>
                </h2>

                <p className="text-base text-[#4a4d4f] leading-relaxed">
                  Explore our live interactive toolset: test LLM reasoning, generate prompt instruction packs, inspect PAL pipeline schemas, and browse production PRD documents.
                </p>

                {/* Tab Switcher Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveSandboxTab('model-sandbox')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSandboxTab === 'model-sandbox'
                        ? 'bg-[#101b24] text-white shadow-sm'
                        : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/10 hover:bg-[#f7f4f2]'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#ec4909]" />
                    <span>Model Sandbox</span>
                  </button>

                  <button
                    onClick={() => setActiveSandboxTab('prompt-compiler')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSandboxTab === 'prompt-compiler'
                        ? 'bg-[#101b24] text-white shadow-sm'
                        : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/10 hover:bg-[#f7f4f2]'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#ec4909]" />
                    <span>Prompt Compiler</span>
                  </button>

                  <button
                    onClick={() => setActiveSandboxTab('pal-architecture')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSandboxTab === 'pal-architecture'
                        ? 'bg-[#101b24] text-white shadow-sm'
                        : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/10 hover:bg-[#f7f4f2]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-[#ec4909]" />
                    <span>PAL Architecture</span>
                  </button>

                  <button
                    onClick={() => setActiveSandboxTab('doc-stack')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSandboxTab === 'doc-stack'
                        ? 'bg-[#101b24] text-white shadow-sm'
                        : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/10 hover:bg-[#f7f4f2]'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-[#ec4909]" />
                    <span>PRD Document Stack</span>
                  </button>
                </div>
              </div>

              {/* Active Tab Component */}
              <div className="animate-fadeIn">
                {activeSandboxTab === 'model-sandbox' && <PortfolioSandbox />}
                {activeSandboxTab === 'prompt-compiler' && <PromptStudio />}
                {activeSandboxTab === 'pal-architecture' && <ArchitectureMap />}
                {activeSandboxTab === 'doc-stack' && <DocumentStackViewer />}
              </div>

            </section>

            {/* 8. Capstone Project & Credential */}
            <CapstoneHub />

            {/* 9. Student Testimonials */}
            <Testimonials />

            {/* 10. Blog & Insights */}
            <BlogSection />

            {/* 11. Frequently Asked Questions */}
            <FaqSection />

            {/* 12. Tuition & Pricing */}
            <PricingSection onSelectPlan={(plan) => setSelectedPlan(plan)} />

            {/* 13. Community Call To Action Banner */}
            <CommunityCta onJoinCohort={() => scrollTo('pricing')} />

          </div>
        )}

        {/* Alternate Views */}
        {currentView === 'agent-platform' && (
          <div className="animate-in fade-in duration-300">
            <AgentPlatformView onSelectCheckout={handleSkillCheckout} />
          </div>
        )}

        {currentView === 'harness-mastery' && (
          <div className="animate-in fade-in duration-300">
            <HarnessMasteryView />
          </div>
        )}

        {currentView === 'skills-library' && (
          <div className="animate-in fade-in duration-300">
            <SkillsLibraryView onNavigateToHarness={() => setCurrentView('harness-mastery')} />
          </div>
        )}

        {currentView === 'marketplace' && (
          <div className="animate-in fade-in duration-300">
            <MarketplaceView onSelectCheckout={handleMarketplaceCheckout} />
          </div>
        )}

        {currentView === 'directory' && (
          <div className="animate-in fade-in duration-300">
            <DirectoryView />
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            <DashboardView
              onOpenSandbox={() => {
                setCurrentView('saas');
                scrollTo('sandboxes');
              }}
              onOpenAgent={() => {
                setIsAgentOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectResult}
      />

      <CurriculumAgentDrawer
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
        initialQuery={agentInitialQuery}
      />

      <CheckoutModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onEnrollSuccess={() => {
          setSelectedPlan(null);
          alert('Tuition enrollment confirmed! Welcome to LetsVibeAI LiveBuild Cohort.');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(newUser) => {
          setUser(newUser);
          setIsAuthOpen(false);
        }}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
};

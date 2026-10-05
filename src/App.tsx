import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoShowcase } from './components/VideoShowcase';
import { ArchitectureMap } from './components/ArchitectureMap';
import { CourseCurriculum } from './components/CourseCurriculum';
import { PortfolioSandbox } from './components/PortfolioSandbox';
import { PromptStudio } from './components/PromptStudio';
import { DocumentStackViewer } from './components/DocumentStackViewer';
import { CapstoneHub } from './components/CapstoneHub';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { CheckoutModal } from './components/CheckoutModal';
import { CurriculumAgentDrawer } from './components/CurriculumAgentDrawer';
import { MarketplaceView } from './components/views/MarketplaceView';
import { DirectoryView } from './components/views/DirectoryView';
import { DashboardView } from './components/views/DashboardView';
import { AuthModal } from './components/views/AuthModal';
import { PricingPlan, MarketplaceItem } from './types';
import { Bot, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'saas' | 'marketplace' | 'directory' | 'dashboard'>('saas');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('letsvibeai_completed_modules');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });
  const [user, setUser] = useState<{ email: string; name: string } | null>({
    email: 'founder@letsvibeai.com',
    name: 'Vibe Architect'
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [agentInitialQuery, setAgentInitialQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    localStorage.setItem('letsvibeai_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  const handleToggleCompleteModule = (moduleId: number) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleSelectResult = (targetSection: string, detailId?: string | number) => {
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

  return (
    <div className="min-h-screen bg-white text-[#10213F] flex flex-col font-sans selection:bg-[#2F80ED] selection:text-white relative">
      {/* Top Navbar with View Switcher */}

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
            <Hero
              onStartCourse={() => scrollTo('curriculum')}
              onWatchVideo={() => scrollTo('video')}
              onExploreArchitecture={() => scrollTo('architecture')}
            />

            <VideoShowcase />

            <ArchitectureMap />

            <CourseCurriculum
              completedModules={completedModules}
              onToggleCompleteModule={handleToggleCompleteModule}
            />

            <PortfolioSandbox />

            <PromptStudio />

            <DocumentStackViewer />

            <CapstoneHub />

            <PricingSection onSelectPlan={(plan) => setSelectedPlan(plan)} />

            <Testimonials />
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
                scrollTo('sandbox');
              }}
              onOpenAgent={() => {
                setAgentInitialQuery('');
                setIsAgentOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Floating ROSTR v2 Curriculum Agent Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setAgentInitialQuery('');
            setIsAgentOpen(true);
          }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white font-bold text-xs sm:text-sm shadow-xl shadow-slate-900/20 active:scale-95 transition-all group border border-slate-700/60"
        >
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#20C7D9] group-hover:rotate-12 transition-transform" />
          </div>
          <span>Curriculum Agent (ROSTR)</span>
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
        </button>
      </div>


      {/* Footer */}
      <Footer />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectResult}
      />

      {/* ROSTR v2 Curriculum Agent Drawer */}
      <CurriculumAgentDrawer
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
        initialQuery={agentInitialQuery}
      />

      {/* Auth Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />

      {/* Checkout / Enrollment Modal */}
      <CheckoutModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onEnrollSuccess={() => {
          if (!completedModules.includes(2)) {
            setCompletedModules((prev) => [...prev, 2]);
          }
        }}
      />
    </div>
  );
};


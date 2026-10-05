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
import { PricingPlan } from './types';
import { Bot, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('letsvibeai_completed_modules');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });
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
    setActiveSection(targetSection);
    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAgentWithQuery = (query: string) => {
    setAgentInitialQuery(query);
    setIsAgentOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-black relative">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAgent={() => {
          setAgentInitialQuery('');
          setIsAgentOpen(true);
        }}
        completedModulesCount={completedModules.length}
      />

      {/* Main Content */}
      <main className="flex-1">
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
      </main>

      {/* Floating ROSTR v2 Curriculum Agent Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setAgentInitialQuery('');
            setIsAgentOpen(true);
          }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs sm:text-sm shadow-2xl shadow-cyan-500/40 active:scale-95 transition-all group"
        >
          <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
          </div>
          <span>Curriculum Agent (ROSTR v2)</span>
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
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

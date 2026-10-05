import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoShowcase } from './components/VideoShowcase';
import { ArchitectureMap } from './components/ArchitectureMap';
import { CourseCurriculum } from './components/CourseCurriculum';
import { PromptStudio } from './components/PromptStudio';
import { DocumentStackViewer } from './components/DocumentStackViewer';
import { CapstoneHub } from './components/CapstoneHub';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { CheckoutModal } from './components/CheckoutModal';
import { PricingPlan } from './types';

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

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenSearch={() => setIsSearchOpen(true)}
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

        <PromptStudio />

        <DocumentStackViewer />

        <CapstoneHub />

        <PricingSection onSelectPlan={(plan) => setSelectedPlan(plan)} />

        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectResult}
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

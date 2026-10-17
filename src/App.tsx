import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { CurriculumAgentDrawer } from './components/CurriculumAgentDrawer';
import { AuthModal } from './components/views/AuthModal';
import { IntroHomeView } from './components/views/IntroHomeView';
import { CoursesView } from './components/views/CoursesView';
import { ExtendedDirectoryView } from './components/views/ExtendedDirectoryView';
import { DashboardView } from './components/views/DashboardView';
import { supabase } from './lib/supabase';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'saas' | 'marketplace' | 'directory' | 'dashboard' | 'agent-platform' | 'harness-mastery' | 'skills-library' | 'theater'>('saas');
  const [selectedCourseModule, setSelectedCourseModule] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<string>('hero');
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

  useEffect(() => {
    localStorage.setItem('letsvibeai_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  // Sync Supabase Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          email: session.user.email || 'builder@letsvibeai.com',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Vibe Director',
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email || 'builder@letsvibeai.com',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Vibe Director',
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
    if (targetSection === 'courses' || targetSection === 'curriculum') {
      if (typeof detailId === 'number') {
        setSelectedCourseModule(detailId);
      }
      setCurrentView('theater');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetSection === 'agent-platform' || targetSection === 'harness-mastery' || targetSection === 'skills-library') {
      setCurrentView('directory');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetSection === 'directory' || targetSection === 'marketplace') {
      setCurrentView('directory');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentView('saas');
    setActiveSection(targetSection);
    setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#071B3A] flex flex-col font-sans selection:bg-[#ec4909] selection:text-white relative">
      
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
        {/* VIEW 1: HOME & INTRODUCTION */}
        {currentView === 'saas' && (
          <IntroHomeView
            onStartCourse={(moduleId) => {
              if (moduleId) setSelectedCourseModule(moduleId);
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreDirectory={() => {
              setCurrentView('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 2: ORIGINAL FOUNDATIONAL COURSES (100% FREE) */}
        {currentView === 'theater' && (
          <CoursesView
            initialModuleId={selectedCourseModule}
            completedModules={completedModules}
            onToggleCompleteModule={handleToggleCompleteModule}
            onBackToHome={() => {
              setCurrentView('saas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreDirectory={() => {
              setCurrentView('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 3: EXTENDED DIRECTORY & ECOSYSTEM HUB */}
        {(currentView === 'directory' || currentView === 'marketplace') && (
          <ExtendedDirectoryView
            initialTab="tutorials"
            onNavigateToCourses={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {(currentView === 'agent-platform' || currentView === 'harness-mastery' || currentView === 'skills-library') && (
          <ExtendedDirectoryView
            initialTab="agents"
            onNavigateToCourses={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 4: MEMBER DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            <DashboardView
              onOpenSandbox={() => {
                setCurrentView('directory');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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

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
import { ProjectLabsView } from './components/views/ProjectLabsView';
import { CourseCatalog } from './components/CourseCatalog';
import { supabase } from './lib/supabase';
import { AppView } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('saas');
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSelectResult = (targetSection: string, detailId?: string | number) => {
    if (targetSection === 'courses' || targetSection === 'curriculum') {
      if (typeof detailId === 'number') {
        setSelectedCourseModule(detailId);
        setCurrentView('theater');
      } else {
        setCurrentView('courses');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetSection === 'labs') {
      setCurrentView('labs');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetSection === 'tools' || targetSection === 'news' || targetSection === 'portfolio' || targetSection === 'tutorials') {
      setCurrentView(targetSection as AppView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetSection === 'agent-platform' || targetSection === 'harness-mastery' || targetSection === 'skills-library' || targetSection === 'agents') {
      setCurrentView('agents');
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
        onSignOut={handleSignOut}
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
            onExploreDirectory={(tab) => {
              if (tab) {
                setCurrentView(tab as AppView);
              } else {
                setCurrentView('directory');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToCourses={() => {
              setCurrentView('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToLabs={() => {
              setCurrentView('labs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 2: ALL 7 FRONTIER COURSES CATALOG */}
        {currentView === 'courses' && (
          <div className="pt-24 pb-16 animate-in fade-in duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#071B3A] text-white shadow-xl relative overflow-hidden text-left">
                <div className="max-w-3xl space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4909]/20 border border-[#ec4909]/30 text-[#ec4909] text-xs font-mono font-bold">
                    <span>COMPLETE FRONTIER CURRICULUM</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans">
                    Master Every Frontier AI Builder.
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Zero-syntax visual building on Lovable and Bolt. Sovereign open-weights with Nous Hermes on Bedrock. Terminal autonomous agents with OpenAI Codex and Claude Code. Multi-agent DAG swarms with OpenClaw. 100% free open curriculum.
                  </p>
                </div>
              </div>
            </div>

            <CourseCatalog
              onSelectModule={(moduleId) => {
                setSelectedCourseModule(moduleId);
                setCurrentView('theater');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenLabs={() => {
                setCurrentView('labs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 3: ORIGINAL FOUNDATIONAL COURSES THEATER (100% FREE) */}
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

        {/* VIEW 4: PROJECT LABS & STARTER REPOS */}
        {currentView === 'labs' && (
          <div className="animate-in fade-in duration-300">
            <ProjectLabsView
              onStartCourse={(moduleId) => {
                if (moduleId) setSelectedCourseModule(moduleId);
                setCurrentView('theater');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAgent={() => {
                setIsAgentOpen(true);
              }}
            />
          </div>
        )}

        {/* VIEW 5: EXTENDED DIRECTORY & ECOSYSTEM HUB */}
        {(currentView === 'directory' || currentView === 'marketplace' || currentView === 'tutorials') && (
          <ExtendedDirectoryView
            initialTab="tutorials"
            onNavigateToCourses={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'tools' && (
          <ExtendedDirectoryView
            initialTab="tools"
            onNavigateToCourses={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'news' && (
          <ExtendedDirectoryView
            initialTab="news"
            onNavigateToCourses={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'portfolio' && (
          <ExtendedDirectoryView
            initialTab="portfolio"
            onNavigateToCourses={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {(currentView === 'agents' || currentView === 'agent-platform' || currentView === 'harness-mastery' || currentView === 'skills-library') && (
          <ExtendedDirectoryView
            initialTab="agents"
            onNavigateToCourses={() => {
              setCurrentView('theater');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 6: MEMBER DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            <DashboardView
              user={user}
              completedModules={completedModules}
              onSignOut={handleSignOut}
              onNavigateToCourses={(moduleId) => {
                if (moduleId) setSelectedCourseModule(moduleId);
                setCurrentView('theater');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenSandbox={() => {
                setCurrentView('tools');
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

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  User,
  Settings,
  MessageSquare,
  CheckCircle2,
  Circle,
  CreditCard,
  ExternalLink,
  Bot,
  Send,
  Terminal,
  RefreshCw,
  Plus,
  Cpu,
  Copy,
  Check,
  LogOut,
  Award,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Mail,
  FileCode,
  Edit3,
  Save,
  HelpCircle
} from 'lucide-react';
import { INITIAL_USER_PROFILE, INITIAL_WORKSPACE_PROJECTS } from '../../data/mockData';
import { WorkspaceProject, UserProfile } from '../../types';

interface DashboardViewProps {
  user?: { email: string; name: string } | null;
  completedModules?: number[];
  onOpenSandbox: () => void;
  onOpenAgent: () => void;
  onSignOut?: () => void;
  onNavigateToCourses?: (moduleId?: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  completedModules = [1],
  onOpenSandbox,
  onOpenAgent,
  onSignOut,
  onNavigateToCourses
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'workspaces' | 'profile' | 'settings' | 'chat'>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('letsvibeai_custom_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      ...INITIAL_USER_PROFILE,
      fullName: user?.name || INITIAL_USER_PROFILE.fullName,
      name: user?.name || INITIAL_USER_PROFILE.fullName,
      email: user?.email || INITIAL_USER_PROFILE.email,
    };
  });

  const displayName = userProfile.name || userProfile.fullName || 'Vibe Architect';
  const [projects] = useState<WorkspaceProject[]>(INITIAL_WORKSPACE_PROJECTS);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(displayName);
  const [editedBio, setEditedBio] = useState('Fullstack AI Director & Autonomous Systems Builder');
  const [editedGithub, setEditedGithub] = useState('diamitani');
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Sync incoming user prop if provided
  useEffect(() => {
    if (user) {
      setUserProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
      setEditedName(user.name);
    }
  }, [user]);

  // Onboarding checklist state
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Connect GitHub repository & install Vercel Git App', completed: true },
    { id: 'c2', label: 'Provision Supabase Database with Row-Level Security (RLS)', completed: true },
    { id: 'c3', label: 'Link Stripe webhook & configure Customer Portal', completed: true },
    { id: 'c4', label: 'Initialize SignalWire Voice API credentials', completed: false },
    { id: 'c5', label: 'Deploy V1 production release on Vercel Edge Network', completed: true }
  ]);

  // Chat UI state
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Welcome to your LetsVibeAI Command Center. Connected via the Vercel AI Gateway with full access to your Supabase schema and Sandbox environment. What are we building or shipping today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(userProfile.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...userProfile,
      name: editedName,
    };
    setUserProfile(updated);
    localStorage.setItem('letsvibeai_custom_profile', JSON.stringify(updated));
    setIsEditingProfile(false);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isStreaming) return;

    const userText = inputMessage;
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsStreaming(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Command received: "${userText}". Compiled instruction pack dispatched to active agent harness.`
        }
      ]);
      setIsStreaming(false);
    }, 600);
  };

  const totalCourseModules = 11;
  const completedCount = completedModules.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalCourseModules) * 100));

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left font-sans min-h-screen">
      
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#ec4909] text-xs font-bold mb-3 shadow-xs">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Fellow Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#071B3A] font-sans">
            Student <span className="text-[#ec4909]">Command Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#706B67] mt-1">
            Welcome back, <strong className="text-[#071B3A]">{displayName}</strong>. Manage your deployed workspaces, active agent runs, and learning milestones.
          </p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#071B3A] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#071B3A] hover:bg-white/60'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#071B3A] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#071B3A] hover:bg-white/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Fellow Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('workspaces')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'workspaces'
                ? 'bg-[#071B3A] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#071B3A] hover:bg-white/60'
            }`}
          >
            Workspaces ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#071B3A] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#071B3A] hover:bg-white/60'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-[#ec4909]" />
            <span>Agent Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#071B3A] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#071B3A] hover:bg-white/60'
            }`}
          >
            API Keys
          </button>
        </div>
      </div>

      {profileSavedToast && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'home' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Active Fellowship</span>
              <h3 className="text-xl font-black text-[#071B3A] font-sans">{userProfile.plan}</h3>
              <span className="text-xs font-mono text-[#ec4909]">Full Access Fellow</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Monthly AI Credits</span>
              <h3 className="text-xl font-black text-[#071B3A] font-sans">
                1,850 / 2,000
              </h3>
              <span className="text-xs font-mono text-[#34D399]">150 cr used · Vercel AI</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Workspaces</span>
              <h3 className="text-xl font-black text-[#071B3A] font-sans">{projects.length} Deployed</h3>
              <span className="text-xs font-mono text-[#34D399]">✓ All production healthy</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Curriculum Progress</span>
              <h3 className="text-xl font-black text-[#ec4909] font-sans">
                {completedCount} / {totalCourseModules} Modules
              </h3>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-[#34D399] h-full rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions & Helpdesk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Onboarding Checklist Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#071B3A] font-sans">
                  Production Architecture Checklist
                </h3>
                <span className="text-[11px] font-mono text-[#34D399] font-bold">4/5 Ready</span>
              </div>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className="p-3.5 bg-[#F8F3EC] rounded-2xl border border-[#EAE3D9] text-xs flex items-center justify-between cursor-pointer hover:border-[#ec4909] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#706B67] shrink-0" />
                      )}
                      <span className={item.completed ? 'line-through text-[#706B67]' : 'text-[#071B3A] font-semibold'}>
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-[#071B3A]">
                      {item.completed ? 'DONE' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support & AI Mentor Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
                  <span>24/7 Student Support & Help</span>
                </div>
                <h3 className="text-lg font-bold text-[#071B3A]">Need Guidance or Architecture Review?</h3>
                <p className="text-xs text-[#706B67] leading-relaxed">
                  Your AI Curriculum Coach is powered by the ROSTR runtime with grounding across all 11 course modules, the PAL Compiler, and production checklists.
                </p>

                <div className="p-3.5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#706B67]">Helpdesk Email:</span>
                    <a href="mailto:hello@letsvibeai.com" className="font-bold text-[#ec4909] hover:underline">
                      hello@letsvibeai.com
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#706B67]">Satisfaction Policy:</span>
                    <span className="font-semibold text-[#071B3A]">14-Day 100% Money-Back</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onOpenAgent}
                  className="flex-1 py-2.5 px-4 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Bot className="w-3.5 h-3.5 text-[#ec4909]" />
                  <span>Ask AI Coach</span>
                </button>
                {onNavigateToCourses && (
                  <button
                    onClick={() => onNavigateToCourses(1)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Continue Courses</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: FELLOW PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
          
          {/* Profile Overview Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#071B3A] text-white flex items-center justify-center text-xl font-black font-mono shadow-md">
                  {displayName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-[#071B3A]">{displayName}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#34D399]/20 text-emerald-800 border border-[#34D399]/30">
                      ACTIVE FELLOW
                    </span>
                  </div>
                  <p className="text-xs text-[#706B67]">{userProfile.email}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-4 py-2 rounded-full bg-[#F8F3EC] hover:bg-[#EDE7DE] text-[#071B3A] border border-[#EAE3D9] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#ec4909]" />
                <span>{isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}</span>
              </button>
            </div>

            {/* Editable Profile Form */}
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#071B3A] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#071B3A] focus:outline-none focus:border-[#ec4909]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#071B3A] mb-1">
                      GitHub Username
                    </label>
                    <input
                      type="text"
                      value={editedGithub}
                      onChange={(e) => setEditedGithub(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#071B3A] focus:outline-none focus:border-[#ec4909]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#071B3A] mb-1">
                    Bio / Focus
                  </label>
                  <textarea
                    rows={2}
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#071B3A] focus:outline-none focus:border-[#ec4909]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9]">
                  <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Role & Bio</span>
                  <p className="font-semibold text-[#071B3A]">{editedBio}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9]">
                  <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Connected GitHub</span>
                  <p className="font-mono font-bold text-[#071B3A]">@{editedGithub}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9]">
                  <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Fellowship Status</span>
                  <p className="font-bold text-[#ec4909]">Accredited Fellow Tier</p>
                </div>
              </div>
            )}
          </div>

          {/* Curriculum Accreditation Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ec4909]" />
                <h3 className="text-base font-bold text-[#071B3A]">
                  Course Accreditation & Capstone Credential
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#071B3A]">
                {completedCount} / {totalCourseModules} Modules
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#34D399] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-xs text-[#706B67] leading-relaxed">
              Upon finishing all 11 modules and passing the Capstone Rubric, you are awarded the verifiable LetsVibeAI Certified Vibe Engineer credential.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {onNavigateToCourses && (
                <button
                  onClick={() => onNavigateToCourses(11)}
                  className="px-5 py-2.5 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Award className="w-3.5 h-3.5 text-[#ec4909]" />
                  <span>Go to Capstone Module (Module 11)</span>
                </button>
              )}

              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="px-5 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: WORKSPACES */}
      {activeTab === 'workspaces' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#ec4909] uppercase">
                    {proj.environment}
                  </span>
                  <span className="text-[10px] font-mono text-[#34D399] font-bold">
                    ✓ {proj.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#071B3A]">{proj.name}</h3>
                <p className="text-xs text-[#706B67]">Deployed: {proj.lastDeployed}</p>

                <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#706B67]">Slug: {proj.slug}</span>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#ec4909] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>{proj.url.replace('https://', '')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AGENT TERMINAL */}
      {activeTab === 'chat' && (
        <div className="p-6 rounded-3xl bg-[#071B3A] text-white border border-[#2F80ED]/20 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#ec4909]" />
              <span className="text-xs font-mono font-bold text-slate-200">
                Autonomous Agent Execution Console
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#34D399]">ONLINE</span>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto p-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-xl ${
                  m.role === 'user'
                    ? 'ml-auto bg-[#ec4909] text-white font-medium'
                    : 'bg-[#040e1f] text-slate-200 border border-white/5 font-mono'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask your agent or dispatch a build instruction..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-[#040e1f] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ec4909]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white transition-all shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: API KEYS & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4 max-w-2xl animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-[#071B3A]">
            Developer Credentials & Vault
          </h3>
          <p className="text-xs text-[#706B67]">
            Use your publishable Fellow API key to integrate with external agent harnesses (Cursor, Claude Code, Antigravity).
          </p>

          <div className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] space-y-2">
            <span className="text-[10px] font-mono text-[#706B67] uppercase block">API Secret Key</span>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs font-mono text-[#071B3A]">{userProfile.apiKey}</code>
              <button
                onClick={handleCopyApiKey}
                className="px-3 py-1.5 rounded-full bg-white border border-[#EAE3D9] text-xs font-bold text-[#071B3A] shadow-2xs cursor-pointer"
              >
                {copiedKey ? '✓ Copied' : 'Copy Key'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
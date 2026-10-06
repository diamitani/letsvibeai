import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { INITIAL_USER_PROFILE, INITIAL_WORKSPACE_PROJECTS } from '../../data/mockData';
import { WorkspaceProject, UserProfile } from '../../types';

interface DashboardViewProps {
  onOpenSandbox: () => void;
  onOpenAgent: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onOpenSandbox, onOpenAgent }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'workspaces' | 'profile' | 'settings' | 'chat'>('home');
  const [userProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [projects] = useState<WorkspaceProject[]>(INITIAL_WORKSPACE_PROJECTS);
  const [copiedKey, setCopiedKey] = useState(false);

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

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left font-sans min-h-screen">
      
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Fellow Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Student <span className="text-[#FA5929]">Command Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#706B67] mt-1">
            Manage your deployed SaaS workspaces, active agent runs, and learning milestones.
          </p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('workspaces')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'workspaces'
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            Workspaces ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            Agent Terminal
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            API Keys
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'home' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Active Plan</span>
              <h3 className="text-xl font-black text-[#281010] font-heading">{userProfile.plan}</h3>
              <span className="text-xs font-mono text-[#FA5929]">Renewal: Nov 2026</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Monthly Credits</span>
              <h3 className="text-xl font-black text-[#281010] font-heading">
                640 / 2,000
              </h3>
              <span className="text-xs font-mono text-[#34D399]">1,360 cr remaining</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Workspaces</span>
              <h3 className="text-xl font-black text-[#281010] font-heading">{projects.length} Deployed</h3>
              <span className="text-xs font-mono text-[#706B67]">All production healthy</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-1">Curriculum Progress</span>
              <h3 className="text-xl font-black text-[#FA5929] font-heading">10 / 10 Modules</h3>
              <span className="text-xs font-mono text-[#34D399]">Accredited Vibe Fellow</span>
            </div>
          </div>

          {/* Onboarding Checklist Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#281010] font-heading">
              Production Architecture Checklist
            </h3>

            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className="p-3.5 bg-[#F8F3EC] rounded-2xl border border-[#EAE3D9] text-xs flex items-center justify-between cursor-pointer hover:border-[#FA5929] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#706B67] shrink-0" />
                    )}
                    <span className={item.completed ? 'line-through text-[#706B67]' : 'text-[#281010] font-semibold'}>
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-[#281010]">
                    {item.completed ? 'DONE' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: WORKSPACES */}
      {activeTab === 'workspaces' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929] uppercase">
                    {proj.environment}
                  </span>
                  <span className="text-[10px] font-mono text-[#34D399] font-bold">
                    ✓ {proj.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#281010] font-heading">{proj.name}</h3>
                <p className="text-xs text-[#706B67]">Deployed: {proj.lastDeployed}</p>

                <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#706B67]">Slug: {proj.slug}</span>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FA5929] hover:underline flex items-center gap-1 font-bold"
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

      {/* TAB 3: AGENT TERMINAL */}
      {activeTab === 'chat' && (
        <div className="p-6 rounded-3xl bg-[#281010] text-white border border-[#FA5929]/20 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#FA5929]" />
              <span className="text-xs font-mono font-bold text-[#D8D1C7]">
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
                    ? 'ml-auto bg-[#FA5929] text-white font-medium'
                    : 'bg-[#160E0E] text-[#EAE3D9] border border-white/5 font-mono'
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
              className="flex-1 px-4 py-2.5 rounded-full bg-[#160E0E] border border-white/10 text-xs text-white placeholder-[#A89F91] focus:outline-none focus:border-[#FA5929]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: API KEYS & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4 max-w-2xl animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-[#281010] font-heading">
            Developer Credentials & Vault
          </h3>
          <p className="text-xs text-[#706B67]">
            Use your publishable Fellow API key to integrate with external agent harnesses.
          </p>

          <div className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] space-y-2">
            <span className="text-[10px] font-mono text-[#706B67] uppercase block">API Secret Key</span>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs font-mono text-[#281010]">{userProfile.apiKey}</code>
              <button
                onClick={handleCopyApiKey}
                className="px-3 py-1.5 rounded-full bg-white border border-[#EAE3D9] text-xs font-bold text-[#281010] shadow-2xs"
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

import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  User,
  Settings,
  MessageSquare,
  CheckCircle2,
  Circle,
  Sparkles,
  Zap,
  CreditCard,
  Key,
  Shield,
  ExternalLink,
  Bot,
  Send,
  Terminal,
  RefreshCw,
  Plus,
  Play,
  Cpu,
  Database,
  Radio,
  Share2,
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
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [projects, setProjects] = useState<WorkspaceProject[]>(INITIAL_WORKSPACE_PROJECTS);
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
  const [chatSessions, setChatSessions] = useState([
    { id: 's1', title: 'Vercel AI SDK 4.0 Streaming Setup', date: 'Today' },
    { id: 's2', title: 'Stripe Webhook Idempotency Policy', date: 'Yesterday' },
    { id: 's3', title: 'SignalWire Duplex Audio Latency Tuning', date: '3 days ago' }
  ]);
  const [activeSessionId, setActiveSessionId] = useState('s1');
  const [selectedSubAgent, setSelectedSubAgent] = useState<'rostr' | 'vercel-stack' | 'signalwire' | 'taste'>('vercel-stack');
  const [activeTools, setActiveTools] = useState({
    supabaseDb: true,
    supabaseStorage: true,
    stripePayments: true,
    signalwireVoice: false,
    vercelSandbox: true
  });
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; code?: string }>>([
    {
      role: 'assistant',
      text: 'Welcome to your Vibe AI Command Center. I am connected via the Vercel AI Suite LLM Gateway with full access to your Supabase schema and Sandbox environment. What are we building or debugging today?',
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
      let reply = '';
      let codeSnippet: string | undefined;

      if (userText.toLowerCase().includes('voice') || userText.toLowerCase().includes('signalwire')) {
        reply = `SignalWire Voice API connector active! Duplex audio streaming websocket configured. Here is your low-latency call handler:`;
        codeSnippet = `import { RestClient } from '@signalwire/compatibility-api';
const client = RestClient(process.env.SIGNALWIRE_PROJECT, process.env.SIGNALWIRE_TOKEN);

export async function POST(req: Request) {
  const call = await client.calls.create({
    url: 'https://letsvibeai.com/api/voice/twiml-stream',
    to: '+18005550199',
    from: process.env.SIGNALWIRE_NUMBER
  });
  return Response.json({ callSid: call.sid });
}`;
      } else if (userText.toLowerCase().includes('stripe') || userText.toLowerCase().includes('payment')) {
        reply = `Stripe checkout session initialized with metadata and verified webhook idempotency keys.`;
        codeSnippet = `export async function POST(req: Request) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    client_reference_id: req.headers.get('x-user-id'),
    line_items: [{ price: 'price_vibe_pro_monthly', quantity: 1 }],
    success_url: 'https://letsvibeai.com/checkout/success?session_id={CHECKOUT_SESSION_ID}'
  });
  return Response.json({ url: session.url });
}`;
      } else {
        reply = `I have analyzed your request against the LetsVibeAI architecture standards (11 Docs & ROSTR v2). All schema migrations and Vercel AI SDK route handlers are synchronized.`;
        codeSnippet = `import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are an Apple-grade Vibe Architect.',
    messages,
  });
  return result.toDataStreamResponse();
}`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply, code: codeSnippet }]);
      setIsStreaming(false);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.fullName}
            className="w-14 h-14 rounded-2xl border-2 border-emerald-400 shadow-xl object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">{userProfile.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono uppercase">
                {userProfile.plan} Member
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{userProfile.email} • {userProfile.role}</p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSandbox}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-500/40 rounded-xl transition-all"
          >
            <Terminal className="w-4 h-4" />
            <span>Open Vercel Sandbox</span>
          </button>
          <button
            onClick={onOpenAgent}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Consult AI Coach</span>
          </button>
        </div>
      </div>

      {/* Primary Dashboard Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-zinc-900 scrollbar-none">
        {[
          { id: 'home', label: 'Home & Onboarding', icon: LayoutDashboard },
          { id: 'workspaces', label: 'Workspaces & Deployments', icon: FolderGit2 },
          { id: 'chat', label: 'Vercel AI Chat & Agents', icon: MessageSquare },
          { id: 'profile', label: 'Founder Profile', icon: User },
          { id: 'settings', label: 'Settings & Billing', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HOME & ONBOARDING */}
      {activeTab === 'home' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Live Deployments</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">3 Production</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>100% Vercel Edge Uptime</span>
              </div>
            </div>

            <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Gateway Invocations</div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">142,800</div>
              <div className="text-[10px] text-zinc-500 mt-1">Via Vercel AI Gateway</div>
            </div>

            <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Supabase Records</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">8,920</div>
              <div className="text-[10px] text-zinc-500 mt-1">Encrypted with RLS</div>
            </div>

            <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Monthly Vibe MRR</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">$4,250</div>
              <div className="text-[10px] text-zinc-500 mt-1">Stripe Billing Active</div>
            </div>
          </div>

          {/* Onboarding Checklist Card */}
          <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Step-By-Step Activation
                </div>
                <h3 className="text-xl font-bold text-white">Production Launch Checklist</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Complete these fundamental steps to scale your vibe app from 1 user to millions.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800">
                <span className="text-xs text-zinc-400">Progress:</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {checklist.filter((c) => c.completed).length}/{checklist.length} Completed
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    item.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-zinc-300'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-600 flex-shrink-0" />
                    )}
                    <span className={`text-xs sm:text-sm font-medium ${item.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    {item.completed ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORKSPACES & SUBPAGES */}
      {activeTab === 'workspaces' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Active Workspaces & Projects</h3>
              <p className="text-xs text-zinc-400">Manage environments, deployments, and edge topologies.</p>
            </div>
            <button
              onClick={() => {
                const newProject: WorkspaceProject = {
                  id: `proj_${Date.now()}`,
                  name: `Vibe Sub-Agent ${projects.length + 1}`,
                  slug: `vibe-agent-${projects.length + 1}`,
                  environment: 'staging',
                  status: 'building',
                  lastDeployed: 'Just triggered',
                  url: 'https://preview.letsvibeai.com'
                };
                setProjects([...projects, newProject]);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Workspace</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 bg-zinc-950/80 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      proj.environment === 'production'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {proj.environment}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{proj.status}</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{proj.name}</h4>
                  <p className="text-xs font-mono text-zinc-500 mb-4">{proj.slug}</p>

                  <div className="text-xs text-zinc-400 space-y-1 mb-4">
                    <div>Last Deployed: <span className="text-zinc-200">{proj.lastDeployed}</span></div>
                    <div>Hosting: <span className="text-emerald-400">Vercel Edge Network</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>View Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      alert(`Triggered fresh rebuild for ${proj.name} on Vercel Edge.`);
                    }}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 hover:bg-zinc-800"
                    title="Redeploy"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHAT UI (Vercel AI SDK Chat Interface) */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
          {/* Chat Sessions & Sub-Agents Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sub-Agent Selector */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-3 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Active Sub-Agent</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { id: 'vercel-stack', label: 'Vercel AI Stack Dev', desc: 'SDK 4.0 & Tool Calling' },
                  { id: 'rostr', label: 'ROSTR v2 Architect', desc: 'PAL & NPAO Engine' },
                  { id: 'signalwire', label: 'SignalWire Engineer', desc: 'Voice API & Duplex WebSockets' },
                  { id: 'taste', label: 'Design-Taste Stylist', desc: 'Anti-Slop Apple Aesthetics' }
                ].map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedSubAgent(agent.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all ${
                      selectedSubAgent === agent.id
                        ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <div className="font-semibold">{agent.label}</div>
                    <div className="text-[10px] text-zinc-500">{agent.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tool Connectors */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-3 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tool Connectors</span>
              </div>
              <div className="space-y-2 text-xs">
                {Object.entries(activeTools).map(([toolKey, isEnabled]) => (
                  <label key={toolKey} className="flex items-center justify-between cursor-pointer">
                    <span className="text-zinc-300 font-mono text-[11px] capitalize">
                      {toolKey.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() =>
                        setActiveTools((prev) => ({
                          ...prev,
                          [toolKey]: !isEnabled
                        }))
                      }
                      className="rounded bg-zinc-900 border-zinc-700 text-emerald-400 focus:ring-0"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Sessions List */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-400 uppercase">Chat Sessions</span>
                <button
                  onClick={() => {
                    const newSess = {
                      id: `s_${Date.now()}`,
                      title: `New Session ${chatSessions.length + 1}`,
                      date: 'Just now'
                    };
                    setChatSessions([newSess, ...chatSessions]);
                    setActiveSessionId(newSess.id);
                  }}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg bg-zinc-900"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1">
                {chatSessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`w-full text-left p-2 rounded-xl text-xs transition-all ${
                      activeSessionId === s.id
                        ? 'bg-zinc-900 text-emerald-400 font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="truncate">{s.title}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{s.date}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="lg:col-span-3 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 flex flex-col h-[600px] justify-between">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Vercel AI SDK 4.0 Chatbot Harness</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  Model: gpt-4o-mini via AI Gateway
                </span>
              </div>
              <button
                onClick={onOpenSandbox}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Run in Sandbox</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-2">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-emerald-400 text-black font-medium'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <div>{m.text}</div>
                    {m.code && (
                      <div className="mt-3 p-3 bg-black/80 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-300 overflow-x-auto relative">
                        <pre>{m.code}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isStreaming && (
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Agent streaming tokens through Vercel AI Gateway...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="pt-4 border-t border-zinc-900 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about SignalWire voice, Stripe webhooks, or Vercel edge deployment..."
                className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60"
              />
              <button
                type="submit"
                disabled={isStreaming || !inputMessage.trim()}
                className="p-2.5 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
          <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-1">Founder Profile</h3>
            <p className="text-xs text-zinc-400 mb-6">Manage your public bio, credentials, and API access.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={userProfile.fullName}
                  onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Role / Headline</label>
                <input
                  type="text"
                  value={userProfile.role}
                  onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">API Key (Vercel & Supabase)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    readOnly
                    value={userProfile.apiKey}
                    className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-400"
                  />
                  <button
                    onClick={handleCopyApiKey}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs transition-colors"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => alert('Profile successfully updated.')}
                className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all mt-4"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS & BILLING */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
          {/* Subscription & Stripe Billing */}
          <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Subscription & Invoices</h3>
                <p className="text-xs text-zinc-400">Powered by Stripe Billing & Customer Portal.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono rounded-full font-bold">
                Cohort VIP License
              </span>
            </div>

            <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 text-xs text-zinc-300 space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Billing Period:</span>
                <span className="font-mono text-white">Monthly Auto-Renewal</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-mono text-white">Mastercard •••• 4242</span>
              </div>
              <div className="flex justify-between">
                <span>Next Invoice Date:</span>
                <span className="font-mono text-emerald-400">November 1, 2026</span>
              </div>
            </div>

            <button
              onClick={() => alert('Redirecting to Stripe Customer Portal...')}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Manage Stripe Billing & Invoices</span>
            </button>
          </div>

          {/* Permissions & Security */}
          <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-1">Access Control & Security</h3>
            <p className="text-xs text-zinc-400 mb-6">Supabase Row-Level Security and team roles.</p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div>
                  <div className="font-bold text-white">Owner & Superadmin</div>
                  <div className="text-zinc-500">Unrestricted access to all production deployments & billing</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-mono text-[10px]">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div>
                  <div className="font-bold text-white">Two-Factor Authentication (2FA)</div>
                  <div className="text-zinc-500">Hardware security key or TOTP authenticator</div>
                </div>
                <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded font-mono text-[10px]">
                  ENFORCED
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

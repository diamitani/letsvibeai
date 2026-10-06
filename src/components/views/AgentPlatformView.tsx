import React, { useState } from 'react';
import {
  AGENT_CATEGORIES,
  AGENT_SKILLS,
  INITIAL_ATTACHED_SKILL_IDS,
  INITIAL_SUB_AGENTS,
  INITIAL_AGENT_MEMORY,
  INITIAL_AGENT_RUNS
} from '../../data/agentPlatformData';
import { AgentPlatformSkill, AgentSubAgent, AgentMemoryRecord, AgentRunRecord } from '../../types';
import {
  Zap,
  Briefcase,
  User,
  Music,
  ExternalLink,
  Search,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Download,
  Plus,
  ShieldCheck,
  Sparkles,
  Terminal,
  FileCode,
  X,
  CreditCard,
  Copy,
  FolderGit2,
  Lock,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AgentPlatformViewProps {
  onSelectCheckout?: (skill: AgentPlatformSkill, mode: 'service' | 'skill' | 'package') => void;
}

export const AgentPlatformView: React.FC<AgentPlatformViewProps> = ({ onSelectCheckout }) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'store' | 'agent' | 'subagents' | 'package'>('structure');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [attachedSkillIds, setAttachedSkillIds] = useState<string[]>(INITIAL_ATTACHED_SKILL_IDS);
  const [selectedSkill, setSelectedSkill] = useState<AgentPlatformSkill | null>(null);
  const [subAgents, setSubAgents] = useState<AgentSubAgent[]>(INITIAL_SUB_AGENTS);
  const [memoryRecords, setMemoryRecords] = useState<AgentMemoryRecord[]>(INITIAL_AGENT_MEMORY);
  const [runs, setRuns] = useState<AgentRunRecord[]>(INITIAL_AGENT_RUNS);
  
  // New subagent modal state
  const [isNewSubAgentOpen, setIsNewSubAgentOpen] = useState(false);
  const [newSubAgentName, setNewSubAgentName] = useState('');
  const [newSubAgentKind, setNewSubAgentKind] = useState('Release Rollout');
  const [newSubAgentBrief, setNewSubAgentBrief] = useState('');
  const [newSubAgentBudget, setNewSubAgentBudget] = useState(500);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [purchaseNotification, setPurchaseNotification] = useState<string | null>(null);

  const planCredits = 2000;
  const attachedSkillsList = AGENT_SKILLS.filter((s) => attachedSkillIds.includes(s.id));
  const burnCredits = attachedSkillsList.reduce((acc, s) => acc + s.credits * 3, 0);
  const usedCredits = Math.min(planCredits, 640 + burnCredits);
  const remainingCredits = Math.max(0, planCredits - usedCredits);
  const creditsPct = Math.round((usedCredits / planCredits) * 100);

  // Filter skills
  const filteredSkills = AGENT_SKILLS.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.cat === selectedCategory;
    const catName = AGENT_CATEGORIES[s.cat]?.name || '';
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleToggleAttach = (skillId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAttachedSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleBuyMode = (skill: AgentPlatformSkill, mode: 'service' | 'skill' | 'package') => {
    if (mode === 'skill') {
      handleToggleAttach(skill.id);
      setPurchaseNotification(`Attached "${skill.name}" to your Manager Agent!`);
    } else if (mode === 'service') {
      setPurchaseNotification(`Order initiated for "${skill.name}" Done-For-You Service ($${skill.servicePrice}).`);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      setActiveTab('package');
      setSelectedSkill(null);
      setPurchaseNotification(`Package for "${skill.name}" loaded into Export Package view.`);
    }
    setTimeout(() => setPurchaseNotification(null), 3500);
  };

  const handleCreateSubAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubAgentName.trim() || !newSubAgentBrief.trim()) return;

    const newAgent: AgentSubAgent = {
      id: `sub-${Date.now()}`,
      kind: newSubAgentKind,
      name: newSubAgentName,
      status: 'RUNNING',
      brief: newSubAgentBrief,
      skills: attachedSkillsList.slice(0, 3).map((s) => s.name),
      spentCredits: 0,
      budgetCredits: newSubAgentBudget,
      due: 'Due in 14 days',
      nextAction: 'Agent initialized. Running reconnaissance step.'
    };

    setSubAgents([newAgent, ...subAgents]);
    setIsNewSubAgentOpen(false);
    setNewSubAgentName('');
    setNewSubAgentBrief('');
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
  };

  const manifestJson = JSON.stringify(
    {
      name: 'letsvibeai-agent-skills',
      version: '1.0.0',
      agent: {
        role: 'General Manager Agent',
        memory: 'agent/memory.schema.json',
        auth: 'Supabase RLS Vault'
      },
      skills: attachedSkillsList.map((s) => ({
        id: s.id,
        name: s.name,
        category: AGENT_CATEGORIES[s.cat]?.name,
        tools: s.tools,
        meter: `${s.credits} cr / run`
      })),
      runtime: {
        harness: 'Antigravity IDE / Claude Code',
        protocol: 'mcp/1.0'
      }
    },
    null,
    2
  );

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(manifestJson);
    setCopiedManifest(true);
    setTimeout(() => setCopiedManifest(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white text-left font-sans">
      
      {/* Toast Notification */}
      {purchaseNotification && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-[#071B3A] text-white text-xs font-semibold shadow-xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-[#34D399]" />
          <span>{purchaseNotification}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#071B3A] text-xs font-semibold mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#2F80ED]" />
            <span>LetsVibeAI Agent Platform & Skills System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#10213F]">
            Agent <span className="text-[#2F80ED]">Skills Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            One General Manager Agent. 32 purchasable modular skills. Dynamic project sub-agents.
          </p>
        </div>

        {/* Credits Status Card */}
        <div className="flex items-center gap-4 bg-[#F4F7FB] border border-slate-200 p-3.5 rounded-2xl shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2F80ED] shadow-2xs">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="font-bold text-[#10213F] font-mono">Plan Credits</span>
              <span className="text-[#2F80ED] font-mono font-bold">{remainingCredits.toLocaleString()} cr left</span>
            </div>
            <div className="w-40 h-2 bg-slate-200 rounded-full overflow-hidden my-1">
              <div
                className="h-full bg-gradient-to-r from-[#2F80ED] to-[#34D399] transition-all duration-500"
                style={{ width: `${creditsPct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Manager Plan ({usedCredits} / {planCredits} used)
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#F4F7FB] rounded-2xl border border-slate-200 mb-8 overflow-x-auto shadow-xs">
        <button
          onClick={() => setActiveTab('structure')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'structure'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
          }`}
        >
          <Zap className="w-4 h-4 text-[#2F80ED]" />
          <span>The Model (Structure)</span>
        </button>

        <button
          onClick={() => setActiveTab('store')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'store'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#34D399]" />
          <span>Skill Store</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">32</span>
        </button>

        <button
          onClick={() => setActiveTab('agent')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'agent'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
          }`}
        >
          <User className="w-4 h-4 text-[#20C7D9]" />
          <span>My Agent</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200 font-mono font-bold">
            Active
          </span>
        </button>

        <button
          onClick={() => setActiveTab('subagents')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'subagents'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
          }`}
        >
          <Music className="w-4 h-4 text-[#7C5CFC]" />
          <span>Sub-Agents</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-[#7C5CFC] border border-violet-200 font-mono font-bold">
            {subAgents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('package')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'package'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#10213F] hover:bg-white/60'
          }`}
        >
          <ExternalLink className="w-4 h-4 text-[#EC4899]" />
          <span>Export Package</span>
        </button>
      </div>

      {/* TAB 1: THE MODEL & STRUCTURE */}
      {activeTab === 'structure' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          
          {/* Hero Banner */}
          <div className="bg-[#071B3A] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-slate-800">
            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-wider block mb-2">
                The Architecture Model
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                One agent. Skills you pay for. Sub-agents you spin up per project.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Every founder and creator starts with a general manager agent. Skills are the modular unit — buy one as a done-for-you service, attach it to your agent with credit metering, or export it as a package to run in your own AI harness.
              </p>

              {/* Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-700/80">
                <div>
                  <span className="text-3xl font-extrabold font-mono text-white block">1</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">General Agent</span>
                </div>
                <div>
                  <span className="text-3xl font-extrabold font-mono text-[#2F80ED] block">32</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Purchasable Skills</span>
                </div>
                <div>
                  <span className="text-3xl font-extrabold font-mono text-[#34D399] block">∞</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Project Sub-Agents</span>
                </div>
                <div>
                  <span className="text-3xl font-extrabold font-mono text-[#20C7D9] block">3</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Ways to Buy</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Platform Layers */}
          <div>
            <h3 className="text-2xl font-extrabold text-[#10213F] tracking-tight mb-6">
              Platform Architecture Layers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Layer 1 */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 border-t-4 border-t-[#2F80ED] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Layer 01
                  </span>
                  <h4 className="text-lg font-bold text-[#10213F] mb-2">The Manager Agent</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    One general agent per user. Holds your persistent profile, catalogue, legal entities, and financial context. Routes every request to the right skill.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Persistent entity memory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Skill routing & approvals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Included with every plan</span>
                  </div>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 border-t-4 border-t-[#34D399] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Layer 02
                  </span>
                  <h4 className="text-lg font-bold text-[#10213F] mb-2">Modular Skills</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    The billable unit. Each skill is a defined job with typed inputs, tool schemas, a runbook, and a filed output. Metered in credits or sold as a service.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>8 categories, 32 verified skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Buy once, attach, or export</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Author & publish custom skills</span>
                  </div>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 border-t-4 border-t-[#071B3A] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Layer 03
                  </span>
                  <h4 className="text-lg font-bold text-[#10213F] mb-2">Project Sub-Agents</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Project-scoped agents. Give one a brief, a subset of skills, a credit cap, and a deadline — it autonomously works and reports back to the Manager.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Release, booking, launch, filings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Dedicated budget & guardrails</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Auto-archive when project ships</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 3 Ways to Buy */}
          <div>
            <h3 className="text-2xl font-extrabold text-[#10213F] tracking-tight mb-6">
              Three Ways to Buy a Skill
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200 flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#2F80ED] border border-blue-200 mb-3">
                    SERVICE
                  </span>
                  <h4 className="text-lg font-bold text-[#10213F] mb-2">Done For You</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    One-time price. The skill runs on verified infrastructure with human expert review at the filing step. You receive the artifact and receipt.
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-mono font-bold pt-4 border-t border-slate-200">
                  From $29 · No subscription required
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200 flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200 mb-3">
                    SKILL
                  </span>
                  <h4 className="text-lg font-bold text-[#10213F] mb-2">Attach to Your Agent</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Adds the capability to your Manager Agent and any sub-agent you authorize. Runs on demand, metered in credits, keeping its own memory.
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-mono font-bold pt-4 border-t border-slate-200">
                  Manager Plan $29/mo · 2,000 credits
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200 flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 border border-slate-300 mb-3">
                    PACKAGE
                  </span>
                  <h4 className="text-lg font-bold text-[#10213F] mb-2">Run It Yourself</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Download the skill as a portable package — system prompt, tool schemas, runbook, and evaluation set — to run in your own AI harness.
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-mono font-bold pt-4 border-t border-slate-200">
                  $19 License · Included on Manager Plan
                </div>
              </div>

            </div>
          </div>

          {/* 4-Step Run Pipeline */}
          <div>
            <h3 className="text-2xl font-extrabold text-[#10213F] tracking-tight mb-6">
              How an Autonomous Run Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl bg-[#F4F7FB] border border-slate-200">
              
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#2F80ED] block mb-1">STEP 01</span>
                <h5 className="text-sm font-bold text-[#10213F] mb-1">State the Goal</h5>
                <p className="text-xs text-slate-500 italic">"I need to register these three new tracks with BMI."</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#2F80ED] block mb-1">STEP 02</span>
                <h5 className="text-sm font-bold text-[#10213F] mb-1">Manager Selects Skills</h5>
                <p className="text-xs text-slate-500">Checks attached tools, quotes credits, and provisions missing schemas.</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#2F80ED] block mb-1">STEP 03</span>
                <h5 className="text-sm font-bold text-[#10213F] mb-1">Execute Runbook</h5>
                <p className="text-xs text-slate-500">Typed inputs processed, tool calls dispatched, with human approval gate.</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#34D399] block mb-1">STEP 04</span>
                <h5 className="text-sm font-bold text-[#10213F] mb-1">Output is Filed</h5>
                <p className="text-xs text-slate-500">Artifacts land in encrypted vault, entity records update, receipt logged.</p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SKILL STORE CATALOG */}
      {activeTab === 'store' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 32 skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#10213F] focus:outline-none focus:border-[#2F80ED] shadow-2xs"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#071B3A] text-white shadow-xs'
                    : 'bg-[#F4F7FB] text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                All 32 Skills
              </button>
              {Object.entries(AGENT_CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === key
                      ? 'bg-[#071B3A] text-white shadow-xs'
                      : 'bg-[#F4F7FB] text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => {
              const cat = AGENT_CATEGORIES[skill.cat];
              const isAttached = attachedSkillIds.includes(skill.id);

              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${cat.bg} ${cat.text} ${cat.border} border`}>
                        {cat.name}
                      </span>
                      {isAttached && (
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200">
                          ATTACHED
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-[#10213F] group-hover:text-[#2F80ED] transition-colors mb-1.5">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {skill.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {skill.modes.map((m) => (
                        <span
                          key={m}
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            m === 's'
                              ? 'bg-blue-50 text-[#2F80ED]'
                              : m === 'k'
                              ? 'bg-emerald-50 text-[#34D399]'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {m === 's' ? 'SERVICE' : m === 'k' ? 'SKILL' : 'PKG'}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono font-bold text-[#10213F]">
                      {skill.servicePrice > 0
                        ? `$${skill.servicePrice}`
                        : skill.credits > 0
                        ? `${skill.credits} cr`
                        : 'Included'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 3: MY AGENT (THE MANAGER CONSOLE) */}
      {activeTab === 'agent' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Left Column: Manager Profile & Attached Skills (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Manager Profile Card */}
            <div className="p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#071B3A] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Zap className="w-6 h-6 text-[#34D399]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-[#10213F]">The General Manager</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200">
                    ONLINE & ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Autonomous executive agent for Diamitani Industries. Holds legal entity state, master catalogue, Stripe account keys, and milestone calendar.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Attached</span>
                    <span className="text-sm font-bold font-mono text-[#10213F]">{attachedSkillsList.length} skills</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Monthly Burn</span>
                    <span className="text-sm font-bold font-mono text-[#2F80ED]">{burnCredits} cr</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">30d Executions</span>
                    <span className="text-sm font-bold font-mono text-[#34D399]">148 runs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attached Skills List */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <h4 className="text-sm font-bold text-[#10213F]">Attached Agent Skills</h4>
                <button
                  onClick={() => setActiveTab('store')}
                  className="text-xs font-bold text-[#2F80ED] hover:underline"
                >
                  Browse Store →
                </button>
              </div>

              <div className="space-y-2">
                {attachedSkillsList.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#10213F] block">{skill.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {AGENT_CATEGORIES[skill.cat]?.name} · {skill.credits > 0 ? `${skill.credits} cr / run` : 'No metering'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleAttach(skill.id)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-red-600 text-[11px] font-semibold transition-colors shadow-2xs"
                    >
                      Detach
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Executions Log */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold text-[#10213F] mb-4">Recent Autonomous Runs</h4>
              <div className="space-y-2">
                {runs.map((run) => (
                  <div
                    key={run.id}
                    className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#10213F]">{run.skillName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {run.actor} • {run.timestamp}
                      </div>
                      <div className="text-[11px] text-slate-700 mt-0.5">{run.outputArtifact}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200">
                      {run.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Persistent Memory & Entity Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[#2F80ED]" />
                <h4 className="text-sm font-bold text-[#10213F]">Persistent Agent Memory</h4>
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Shared encrypted context read by every attached skill and sub-agent before dispatching tool calls.
              </p>

              <div className="space-y-2">
                {memoryRecords.map((m, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">{m.key}</span>
                    <span className="text-xs font-semibold text-[#10213F]">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: SUB-AGENTS PROJECT WORKBENCH */}
      {activeTab === 'subagents' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#10213F]">Project-Scoped Sub-Agents</h3>
              <p className="text-xs text-slate-500">Autonomous workers provisioned with an isolated brief, credit cap, and skill permissions.</p>
            </div>
            <button
              onClick={() => setIsNewSubAgentOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#071B3A] hover:bg-[#10213F] text-white font-bold text-xs shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#34D399]" />
              <span>Spin Up Sub-Agent</span>
            </button>
          </div>

          {/* Sub-Agents Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subAgents.map((agent) => {
              const spentPct = Math.round((agent.spentCredits / agent.budgetCredits) * 100);
              return (
                <div
                  key={agent.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-[#7C5CFC] px-2 py-0.5 rounded-full bg-violet-50 border border-violet-200 uppercase">
                        {agent.kind}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200">
                        {agent.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#10213F] mb-2">{agent.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{agent.brief}</p>

                    {/* Budget progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-slate-500">Budget Spent</span>
                        <span className="text-[#10213F] font-bold">{agent.spentCredits} / {agent.budgetCredits} cr ({spentPct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#7C5CFC] rounded-full"
                          style={{ width: `${spentPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Granted Skills */}
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Granted Skills ({agent.skills.length})</span>
                      <div className="flex flex-wrap gap-1">
                        {agent.skills.map((s, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 bg-[#F4F7FB] text-slate-700 rounded-md border border-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span className="font-bold text-slate-700 block">Next Action:</span>
                    <span className="italic">{agent.nextAction}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: EXPORT PACKAGE */}
      {activeTab === 'package' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Left Column: Targets & Integrations (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-[#10213F]">Portable Agent Harnesses</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Export your attached skills and agent configuration as standardized packages to execute in any external harness.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#10213F]">Claude Code & Antigravity IDE</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200">READY</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">Drops into `.agents/skills` or `.claude/skills` as modular folders.</p>
                <code className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 block text-slate-800">
                  npx letsvibeai add --harness antigravity
                </code>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#10213F]">Model Context Protocol (MCP) Server</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200">READY</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">Serves every skill as a standard MCP tool schema with validation.</p>
                <code className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 block text-slate-800">
                  npx letsvibeai serve --mcp
                </code>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#10213F]">OpenAI Assistants / Vercel AI SDK</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#34D399] border border-emerald-200">READY</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">Exports typed JSON function schemas and system prompt files.</p>
                <code className="text-[11px] font-mono bg-white p-2 rounded-lg border border-slate-200 block text-slate-800">
                  npx letsvibeai export --openai
                </code>
              </div>
            </div>
          </div>

          {/* Right Column: Live Manifest Code Viewer (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#F4F7FB] border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-[#2F80ED] uppercase block">
                  skills-manifest.json
                </span>
                <span className="text-[11px] text-slate-500">
                  {attachedSkillsList.length} Attached Skills Export Bundle
                </span>
              </div>

              <button
                onClick={handleCopyManifest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-[#10213F] shadow-2xs"
              >
                {copiedManifest ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span className="text-[#34D399]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-white border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto max-h-[460px] leading-relaxed shadow-2xs">
              {manifestJson}
            </pre>
          </div>

        </div>
      )}

      {/* SKILL DETAIL MODAL (3 WAYS TO BUY) */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${AGENT_CATEGORIES[selectedSkill.cat]?.bg} ${AGENT_CATEGORIES[selectedSkill.cat]?.text} border ${AGENT_CATEGORIES[selectedSkill.cat]?.border}`}>
                    {AGENT_CATEGORIES[selectedSkill.cat]?.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">SKL-{selectedSkill.id.toUpperCase()}</span>
                </div>
                <h3 className="text-2xl font-black text-[#10213F]">{selectedSkill.name}</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">{selectedSkill.summary}</p>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Steps & Schemas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              
              {/* Left: 4-Step Runbook */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  4-Step Autonomous Runbook
                </h5>
                <div className="space-y-2">
                  {selectedSkill.steps.map((st, idx) => (
                    <div key={idx} className="p-3 bg-[#F4F7FB] rounded-xl border border-slate-200 text-xs flex items-start gap-2.5">
                      <span className="font-mono font-bold text-[#2F80ED] shrink-0">0{idx + 1}</span>
                      <span className="text-slate-700">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Inputs, Outputs & Tools */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Input Requirements
                  </h5>
                  <div className="space-y-1">
                    {selectedSkill.inputs.map((inp, idx) => (
                      <div key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2F80ED] shrink-0" />
                        <span>{inp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Filed Deliverables
                  </h5>
                  <div className="space-y-1">
                    {selectedSkill.outputs.map((out, idx) => (
                      <div key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* 3 WAYS TO BUY ACTION BUTTONS */}
            <div className="pt-6 border-t border-slate-200">
              <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                Select Execution / Purchase Mode
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* 1. Service */}
                <button
                  onClick={() => handleBuyMode(selectedSkill, 'service')}
                  className="p-4 rounded-2xl bg-[#F4F7FB] hover:bg-slate-100 border border-slate-200 text-left transition-all group"
                >
                  <span className="text-[10px] font-mono font-bold text-[#2F80ED] uppercase block mb-1">
                    1. Done-For-You Service
                  </span>
                  <div className="text-base font-extrabold text-[#10213F] mb-1">
                    ${selectedSkill.servicePrice > 0 ? selectedSkill.servicePrice : 29}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Human review at filing step. Order one-time.
                  </p>
                </button>

                {/* 2. Attach to Agent */}
                <button
                  onClick={() => handleBuyMode(selectedSkill, 'skill')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    attachedSkillIds.includes(selectedSkill.id)
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-[#F4F7FB] hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-[#34D399] uppercase block mb-1">
                    2. Attach to Agent
                  </span>
                  <div className="text-base font-extrabold text-[#10213F] mb-1">
                    {selectedSkill.credits > 0 ? `${selectedSkill.credits} cr / run` : 'Included'}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {attachedSkillIds.includes(selectedSkill.id) ? 'Click to detach' : 'Click to attach'}
                  </p>
                </button>

                {/* 3. Package */}
                <button
                  onClick={() => handleBuyMode(selectedSkill, 'package')}
                  className="p-4 rounded-2xl bg-[#071B3A] hover:bg-[#10213F] text-white text-left transition-all"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-300 uppercase block mb-1">
                    3. Export Package
                  </span>
                  <div className="text-base font-extrabold text-white mb-1">
                    $19 / License
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Download for Claude Code & Antigravity.
                  </p>
                </button>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* NEW SUB-AGENT MODAL */}
      {isNewSubAgentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-left animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-[#10213F]">Spin Up Project Sub-Agent</h3>
              <button
                onClick={() => setIsNewSubAgentOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubAgent} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Sub-Agent Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q1 Product Launch Agent"
                  value={newSubAgentName}
                  onChange={(e) => setNewSubAgentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#10213F] focus:outline-none focus:border-[#2F80ED] shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Agent Focus / Category
                </label>
                <select
                  value={newSubAgentKind}
                  onChange={(e) => setNewSubAgentKind(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#10213F] focus:outline-none focus:border-[#2F80ED] shadow-2xs"
                >
                  <option value="Release Rollout">Release Rollout & Distribution</option>
                  <option value="Booking & Tour">Booking, Venues & Touring</option>
                  <option value="Merch Drop">Merchandise & Product Drop</option>
                  <option value="Legal & Finance">Legal Entity & Tax Filings</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Project Brief & Objectives
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the exact project milestones, deadlines, and deliverables..."
                  value={newSubAgentBrief}
                  onChange={(e) => setNewSubAgentBrief(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs text-[#10213F] focus:outline-none focus:border-[#2F80ED] shadow-2xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-slate-700">Credit Budget Cap:</span>
                  <span className="text-[#2F80ED] font-bold">{newSubAgentBudget} cr</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="100"
                  value={newSubAgentBudget}
                  onChange={(e) => setNewSubAgentBudget(Number(e.target.value))}
                  className="w-full accent-[#071B3A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#071B3A] hover:bg-[#10213F] text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
              >
                Initialize & Launch Sub-Agent
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

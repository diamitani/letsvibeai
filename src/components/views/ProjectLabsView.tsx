import React, { useState } from 'react';
import {
  Layers,
  Terminal,
  Cpu,
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowRight,
  Code2,
  Play,
  FileCode,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  CreditCard,
  Bot
} from 'lucide-react';
import { PromptStudio } from '../PromptStudio';
import { ArchitectureMap } from '../ArchitectureMap';
import { DocumentStackViewer } from '../DocumentStackViewer';
import { PortfolioSandbox } from '../PortfolioSandbox';
import { AgentHarnessExplorer } from '../AgentHarnessExplorer';

interface ProjectLabsViewProps {
  onStartCourse: (moduleId?: number) => void;
  onOpenAgent: () => void;
}

export const ProjectLabsView: React.FC<ProjectLabsViewProps> = ({
  onStartCourse,
  onOpenAgent
}) => {
  const [activeTab, setActiveTab] = useState<'blueprints' | 'prompt-compiler' | 'architecture' | 'doc-stack' | 'sandbox' | 'harness'>('blueprints');
  const [selectedLabId, setSelectedLabId] = useState<string>('lab-1');

  const LABS = [
    {
      id: 'lab-1',
      title: 'Lab 01: High-Converting SaaS Marketing Website',
      category: 'Frontend & Design System',
      timeEstimate: '2 - 3 hours',
      difficulty: 'Beginner',
      platform: 'Next.js 15 + Tailwind CSS + Lovable / v0',
      description: 'Build a production-grade SaaS landing page with dark/light tokens, responsive navigation, social proof wall, and lead capture waitlist.',
      outcomes: [
        'Atomic design system with zero AI-slop tells',
        'Mobile-first responsive layout (375px to 1440px)',
        'Local state waitlist form with localStorage fallback',
        'Lighthouse performance and accessibility score >= 95'
      ],
      githubStarter: 'https://github.com/diamitani/letsvibeai',
      lovableStarter: 'https://lovable.dev',
      promptSnippet: 'Scaffold a modern SaaS marketing site with high-contrast typography, hero with live badge, interactive 3-tier pricing comparison, and responsive mobile nav drawer.'
    },
    {
      id: 'lab-2',
      title: 'Lab 02: E-Commerce Storefront & Stripe Checkout',
      category: 'Commerce & Payments',
      timeEstimate: '4 - 5 hours',
      difficulty: 'Intermediate',
      platform: 'Lovable + Supabase + Stripe Checkout',
      description: 'Create an e-commerce catalog with dynamic shopping cart, server-side Stripe Checkout session creation, and cryptographic webhook verification.',
      outcomes: [
        'Product catalog with search, category filtering, and inventory counts',
        'Persistent client shopping cart with quantity controls',
        'Server route handler generating Stripe Checkout session with client_reference_id',
        'Verified webhook handler updating order state idempotently'
      ],
      githubStarter: 'https://github.com/diamitani/letsvibeai',
      lovableStarter: 'https://lovable.dev',
      promptSnippet: 'Build an e-commerce catalog with shopping cart state. Integrate Stripe Checkout for one-time purchases with server-side signature verification.'
    },
    {
      id: 'lab-3',
      title: 'Lab 03: Directory Marketplace with Supabase RLS',
      category: 'Database & Multi-Tenancy',
      timeEstimate: '4 - 6 hours',
      difficulty: 'Intermediate',
      platform: 'Lovable / Bolt + Supabase Postgres',
      description: 'Build a searchable directory marketplace with user-submitted listings, image uploads to storage buckets, and strict Row-Level Security policies.',
      outcomes: [
        'Postgres relational schema: profiles, listings, categories, and reviews',
        'Supabase Storage bucket for high-resolution image uploads with size caps',
        'Air-tight Row-Level Security: public read, authenticated author update/delete',
        'Full-text search (FTS) across titles and descriptions'
      ],
      githubStarter: 'https://github.com/diamitani/letsvibeai',
      lovableStarter: 'https://lovable.dev',
      promptSnippet: 'Create a directory marketplace with Supabase Auth, image upload to storage bucket, and strict Postgres RLS policies based on auth.uid().'
    },
    {
      id: 'lab-4',
      title: 'Lab 04: AI SaaS Dashboard & Streaming Chat Assistant',
      category: 'AI Engineering & Streaming',
      timeEstimate: '5 - 7 hours',
      difficulty: 'Advanced',
      platform: 'Next.js 15 + Vercel AI SDK + OpenAI / Claude',
      description: 'Develop an authenticated SaaS dashboard with member role hierarchies, usage credit counters, and a token-streaming AI chat interface.',
      outcomes: [
        'Protected dashboard layout with session verification middleware',
        'Streaming chat UI with useChat hook, markdown code blocks, and auto-scroll',
        'Token usage metering and rate-limiting guards (preventing 429 errors)',
        'Prompt history persistence in Postgres with audit logs'
      ],
      githubStarter: 'https://github.com/diamitani/letsvibeai',
      lovableStarter: 'https://lovable.dev',
      promptSnippet: 'Implement a streaming AI assistant using Vercel AI SDK 4.0. Route requests through a protected server action that checks user credits before calling the model.'
    },
    {
      id: 'lab-5',
      title: 'Lab 05: Autonomous Multi-Agent Swarm with OpenClaw & Hermes',
      category: 'Autonomous Multi-Agent',
      timeEstimate: '6 - 8 hours',
      difficulty: 'Advanced',
      platform: 'Nous Hermes Bedrock + OpenClaw + Antigravity',
      description: 'Orchestrate an autonomous software engineering swarm: coordinator DAG planner, parallel builder subagents, and an independent QA test runner.',
      outcomes: [
        'Middle-Out DAG task breakdown with wave action scheduling',
        'Local or AWS Bedrock execution of Nous Hermes function calling models',
        'Isolated git worktrees so parallel coding agents never create branch collisions',
        'The One Must Act (W = 1.00) verification loop before commit approval'
      ],
      githubStarter: 'https://github.com/diamitani/letsvibeai',
      lovableStarter: 'https://lovable.dev',
      promptSnippet: 'Configure an OpenClaw multi-agent harness with coordinator, researcher, and builder roles. Enforce verification gates before any filesystem mutation.'
    }
  ];

  const currentLab = LABS.find(l => l.id === selectedLabId) || LABS[0];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left font-sans min-h-screen animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#4a4d4f]/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-bold mb-3 shadow-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Labs & Project Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#071B3A] font-sans">
            Backend Labs & <span className="text-[#ec4909]">Project Starters</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#4a4d4f] mt-1 max-w-2xl leading-relaxed">
            Direct real AI coding harnesses with verified project templates. Build on Lovable, Cursor, Bolt, Codex, Hermes, and OpenClaw with live repository sync.
          </p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://github.com/diamitani/letsvibeai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F4F7FB] border border-[#4a4d4f]/15 text-[#071B3A] text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Starter Repos</span>
          </a>

          <button
            onClick={onOpenAgent}
            className="px-5 py-2.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-[#ec4909]/25"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>Open AI Architect Coach</span>
          </button>
        </div>
      </div>

      {/* Lab Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-[#4a4d4f]/10">
        <button
          onClick={() => setActiveTab('blueprints')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'blueprints'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
          }`}
        >
          <Code2 className="w-4 h-4 text-[#ec4909]" />
          <span>Project Blueprints (5 Labs)</span>
        </button>

        <button
          onClick={() => setActiveTab('prompt-compiler')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'prompt-compiler'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
          }`}
        >
          <Terminal className="w-4 h-4 text-[#2F80ED]" />
          <span>PAL Prompt Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'architecture'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#34D399]" />
          <span>11-Block Architecture Map</span>
        </button>

        <button
          onClick={() => setActiveTab('doc-stack')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'doc-stack'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
          }`}
        >
          <FileCode className="w-4 h-4 text-[#ec4909]" />
          <span>11-Doc Planning Stack</span>
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'sandbox'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
          }`}
        >
          <Cpu className="w-4 h-4 text-[#2F80ED]" />
          <span>Model Benchmark Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('harness')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'harness'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#34D399]" />
          <span>Agent Swarm Harness</span>
        </button>
      </div>

      {/* TAB 1: PROJECT BLUEPRINTS */}
      {activeTab === 'blueprints' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Lab Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {LABS.map((lab) => {
              const isSelected = lab.id === currentLab.id;
              return (
                <button
                  key={lab.id}
                  onClick={() => setSelectedLabId(lab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    isSelected
                      ? 'bg-[#071B3A] text-white border-[#071B3A] shadow-sm'
                      : 'bg-white text-[#4a4d4f] border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
                  }`}
                >
                  <span>{lab.title.split(':')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Lab Blueprint Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Blueprint Overview & Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909] border border-[#ec4909]/20">
                    {currentLab.category}
                  </span>

                  <div className="flex items-center gap-3 text-xs font-mono text-[#706B67]">
                    <span>⏱ {currentLab.timeEstimate}</span>
                    <span>·</span>
                    <span className="text-[#34D399] font-bold">{currentLab.difficulty}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#071B3A] tracking-tight">
                  {currentLab.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#4a4d4f] leading-relaxed">
                  {currentLab.description}
                </p>

                {/* Target Stack Pill */}
                <div className="pt-2 flex items-center gap-2 text-xs">
                  <span className="text-[#706B67] font-semibold">Recommended Stack:</span>
                  <span className="font-mono font-bold text-[#071B3A] px-2.5 py-1 rounded-md bg-[#F4F7FB] border border-[#4a4d4f]/10">
                    {currentLab.platform}
                  </span>
                </div>

                {/* Acceptance Criteria */}
                <div className="pt-4 space-y-2.5 border-t border-[#4a4d4f]/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#071B3A] font-mono">
                    Lab Completion Acceptance Gates:
                  </h4>
                  <div className="space-y-2">
                    {currentLab.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4a4d4f] bg-[#F4F7FB] p-3 rounded-xl border border-[#4a4d4f]/10">
                        <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={currentLab.githubStarter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-xs"
                  >
                    <Github className="w-4 h-4" />
                    <span>Clone Starter Repository</span>
                  </a>

                  <a
                    href={currentLab.lovableStarter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm shadow-[#ec4909]/20"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Launch in Lovable / Bolt</span>
                  </a>
                </div>

              </div>

            </div>

            {/* Right Column: Copyable Scaffolding Prompt (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#4a4d4f]/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#2F80ED]" />
                    <h3 className="text-sm font-bold text-[#071B3A]">Director Scaffolding Prompt</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#34D399]/15 text-[#071B3A]">
                    PAL Verified
                  </span>
                </div>

                <p className="text-xs text-[#4a4d4f]">
                  Paste this exact prompt into Lovable, Bolt, Cursor Composer, or Claude Code to scaffold the foundation:
                </p>

                <div className="p-4 rounded-2xl bg-[#071B3A] text-slate-100 font-mono text-xs leading-relaxed border border-white/10 overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{currentLab.promptSnippet}</pre>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentLab.promptSnippet);
                    alert('Copied director scaffolding prompt to clipboard!');
                  }}
                  className="w-full py-2.5 rounded-full bg-[#2F80ED] hover:bg-[#256fd1] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Copy Scaffolding Prompt</span>
                </button>
              </div>

              {/* Related Curriculum Module */}
              <div className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#34D399]">
                  Related Course Lesson
                </span>
                <h4 className="text-sm font-bold text-[#071B3A]">
                  Learn the architectural theory behind this lab
                </h4>
                <p className="text-xs text-[#4a4d4f]">
                  Module 4 covers the 11 software building blocks and Module 9 walks through step-by-step build execution.
                </p>
                <button
                  onClick={() => onStartCourse(4)}
                  className="px-4 py-2 rounded-full bg-[#F4F7FB] hover:bg-[#EAEFF7] border border-[#2F80ED]/20 text-[#071B3A] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Module 04 in Theater</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2F80ED]" />
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: PAL PROMPT STUDIO */}
      {activeTab === 'prompt-compiler' && (
        <div className="animate-in fade-in duration-200">
          <PromptStudio />
        </div>
      )}

      {/* TAB 3: 11-BLOCK ARCHITECTURE MAP */}
      {activeTab === 'architecture' && (
        <div className="animate-in fade-in duration-200">
          <ArchitectureMap />
        </div>
      )}

      {/* TAB 4: 11-DOC PLANNING STACK */}
      {activeTab === 'doc-stack' && (
        <div className="animate-in fade-in duration-200">
          <DocumentStackViewer />
        </div>
      )}

      {/* TAB 5: MODEL BENCHMARK SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="animate-in fade-in duration-200">
          <PortfolioSandbox />
        </div>
      )}

      {/* TAB 6: AGENT HARNESS */}
      {activeTab === 'harness' && (
        <div className="animate-in fade-in duration-200">
          <AgentHarnessExplorer />
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  BookOpen,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
  Code,
  ShieldCheck,
  X,
  Video,
  Play,
  FileCheck,
  Award,
  ExternalLink,
  Github
} from 'lucide-react';
import { courses } from '../content/courses';

export interface CourseCardData {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string;
  rating: string;
  duration: string;
  lessonsCount: number;
  instructorName: string;
  image: string;
  description: string;
  featured?: boolean;
  moduleId: number;
  videoId?: string;
  chapters: { title: string; time: string }[];
  whatYouWillLearn: string[];
  projectRepoUrl?: string;
}

const COURSES: CourseCardData[] = [
  {
    id: 'course-vc-101',
    slug: 'vibe-coding',
    moduleId: 1,
    title: 'Vibe Coding 101: Idea to Shipped App',
    category: 'Flagship Vibe Coding',
    price: '100% Free ($0)',
    rating: '5.0',
    duration: '10 Modules (22m video)',
    lessonsCount: 12,
    instructorName: 'Patrick Diamitani',
    image: '/images/course-vibe-coding-poster.jpg',
    description: 'The definitive architecture-first course: learn how modern apps fit together, direct AI agents with precision, and ship real products.',
    featured: true,
    videoId: 'zjkBMFhNj_g',
    projectRepoUrl: 'https://github.com/diamitani/letsvibeai',
    chapters: [
      { title: 'Module 01: What is Vibe Coding & Direction Over Guessing', time: '00:00' },
      { title: 'Module 04: The 11 Building Blocks of Web Architecture', time: '14:20' },
      { title: 'Module 07: Autonomous Agents, Loops & Harnesses', time: '28:40' },
      { title: 'Module 10: Ship It — Zero-Regression Production Checklist', time: '42:15' }
    ],
    whatYouWillLearn: [
      'Master the 11 software building blocks: front end, back end, auth, database, and payments',
      'The PAL Framework (Parse, Scan, Latent Intent, Expand, Compile) for zero-hallucination prompts',
      'Directing AI coding agents as a film director rather than manual character typing',
      'Ship a live capstone web application on a public URL with verified tests'
    ]
  },
  {
    id: 'course-ship-it',
    slug: 'zero-to-ship',
    moduleId: 2,
    title: 'Ship It: Zero to Production on Every Platform',
    category: 'Rapid Deployment',
    price: '100% Free ($0)',
    rating: '4.9',
    duration: '10 Days (~3.5 hrs)',
    lessonsCount: 10,
    instructorName: 'Patrick Diamitani',
    image: '/images/course-zero-to-ship-poster.jpg',
    description: 'Ten daily hands-on sprints: Lovable, Bolt, Cursor, Windsurf, Supabase, Vercel, Stripe and custom domains.',
    featured: true,
    videoId: '4_Zq_7N5Uko',
    projectRepoUrl: 'https://github.com/diamitani/letsvibeai',
    chapters: [
      { title: 'Day 1 to 3: Scaffold Full-Stack React & Vite App', time: '00:00' },
      { title: 'Day 4 to 6: Supabase Postgres Schema & RLS Security', time: '18:30' },
      { title: 'Day 7 to 8: Server-Side Stripe Checkout & Webhooks', time: '36:10' },
      { title: 'Day 9 to 10: Vercel Deployments & Custom DNS Routing', time: '52:45' }
    ],
    whatYouWillLearn: [
      'Scaffold full-stack web applications from natural language prompts in under 15 minutes',
      'Wire secure Supabase relational databases with automated migration scripts',
      'Implement server-side Stripe Checkout sessions with verified webhook handlers',
      'Configure production DNS records, SSL certificates, and preview deployments'
    ]
  },
  {
    id: 'course-frontier-platforms',
    slug: 'frontier-platforms',
    moduleId: 7,
    title: 'Frontier Agent Platforms: Codex, Hermes, OpenClaw & Claude',
    category: 'Frontier Harnesses',
    price: 'Open Source / Free',
    rating: '5.0',
    duration: '5 Modules (~5 hrs)',
    lessonsCount: 14,
    instructorName: 'Patrick Diamitani',
    image: '/images/course-frontier-platforms-poster.jpg',
    description: 'Orchestrate autonomous agent swarms across OpenAI Codex, Nous Hermes on Bedrock, OpenClaw swarms, and Claude Code CLI.',
    featured: true,
    videoId: 'Yf1o0cx6WKY',
    projectRepoUrl: 'https://github.com/diamitani/letsvibeai',
    chapters: [
      { title: 'OpenAI Codex ASTs & Operator Browser QA Testing', time: '00:00' },
      { title: 'Nous Hermes Function Calling & Bedrock Runtime', time: '16:40' },
      { title: 'OpenClaw Multi-Agent Swarms & Middle-Out DAG Waves', time: '35:20' },
      { title: 'Claude Code CLI, Persistent CLAUDE.md & MCP Adapters', time: '54:10' }
    ],
    whatYouWillLearn: [
      'Decompose monolithic tasks into parallel Middle-Out DAG execution waves',
      'Deploy sovereign open-weights agents with Nous Hermes on AWS Bedrock and local Ollama',
      'Direct terminal agents with persistent operational rules and zero context degradation',
      'Enforce the One Must Act (W = 1.00) foundation wholeness verification loop'
    ]
  },
  {
    id: 'course-lovable-fullstack',
    slug: 'lovable-fullstack',
    moduleId: 4,
    title: 'Full-Stack Vibe Coding with Lovable & Bolt',
    category: 'Visual Full-Stack',
    price: '100% Free ($0)',
    rating: '4.9',
    duration: '5 Modules (~4 hrs)',
    lessonsCount: 12,
    instructorName: 'Patrick Diamitani',
    image: '/images/course-lovable-fullstack-poster.jpg',
    description: 'Instant web application prototyping, Supabase schema sync, Edge Functions, GitHub two-way sync, and production polish.',
    featured: true,
    videoId: '4_Zq_7N5Uko',
    projectRepoUrl: 'https://github.com/diamitani/letsvibeai',
    chapters: [
      { title: 'Natural Language App Scaffolding in Lovable', time: '00:00' },
      { title: 'Supabase Database Integration & Real-Time Sync', time: '15:10' },
      { title: 'Two-Way GitHub Sync & Cursor Composer Polish', time: '32:40' },
      { title: 'Custom Domain Setup & Production SSL Launch', time: '48:30' }
    ],
    whatYouWillLearn: [
      'Build responsive multi-page web applications from prompt to interactive UI in minutes',
      'Connect relational database tables with automatic migration and RLS policies',
      'Surgically refine complex frontend logic using Cursor Composer and Windsurf',
      'Publish high-speed production web apps with zero developer boilerplate'
    ]
  },
  {
    id: 'course-claude-mastery',
    slug: 'claude-coworker',
    moduleId: 8,
    title: 'Claude as Coworker: Skills, MCP & Governance',
    category: 'Enterprise Coworker',
    price: 'Self-Paced Free',
    rating: '4.9',
    duration: '5 Modules (~6 hrs)',
    lessonsCount: 16,
    instructorName: 'Patrick Diamitani',
    image: '/images/course-claude-mastery-poster.jpg',
    description: 'Harness Claude Projects, interactive Artifacts, Model Context Protocol (MCP), custom skills packaging, and team governance.',
    featured: true,
    videoId: '8x8jU_6P9E4',
    projectRepoUrl: 'https://github.com/diamitani/letsvibeai',
    chapters: [
      { title: 'Claude Projects, Custom Instructions & Context Memory', time: '00:00' },
      { title: 'Claude Artifacts & Interactive Side-by-Side Canvas', time: '14:20' },
      { title: 'Authoring Reusable SKILL.md Packaging Modules', time: '30:50' },
      { title: 'Model Context Protocol (MCP) Enterprise Adapters', time: '48:15' }
    ],
    whatYouWillLearn: [
      'Configure Claude Projects with pinned architectural specs and zero context leakage',
      'Author modular SKILL.md files that standardize workflows across engineering teams',
      'Connect Claude to databases, cloud buckets, and GitHub via Model Context Protocol',
      'Implement enterprise security, token quotas, and credential isolation'
    ]
  },
  {
    id: 'course-project-labs',
    slug: 'project-labs',
    moduleId: 9,
    title: 'Vibe Coding Project Labs: Portfolio-Grade Builds',
    category: 'Hands-on Labs',
    price: 'Open Curriculum',
    rating: '5.0',
    duration: '3 Labs (~17 hrs)',
    lessonsCount: 15,
    instructorName: 'Patrick Diamitani',
    image: '/images/course-project-labs-poster.jpg',
    description: 'Build and deploy a marketing site, an e-commerce store, a directory marketplace, and an AI SaaS — portfolio-ready.',
    featured: true,
    videoId: 'zjkBMFhNj_g',
    projectRepoUrl: 'https://github.com/diamitani/letsvibeai',
    chapters: [
      { title: 'Lab 1: High-Converting SaaS Marketing Website', time: '00:00' },
      { title: 'Lab 2: E-Commerce Storefront with Stripe Checkout', time: '22:15' },
      { title: 'Lab 3: Directory Marketplace with Supabase Search', time: '45:30' }
    ],
    whatYouWillLearn: [
      'Complete end-to-end builds with step-by-step blueprints and stretch criteria',
      'Integrate shopping carts, customer authentication, and payment webhooks',
      'Graduate with verified live demo URLs you can show clients and employers',
      'Gain production confidence by shipping realistic full-scale web applications'
    ]
  },
  {
    id: 'course-gtm-automation',
    slug: 'gtm-automation',
    moduleId: 10,
    title: 'Autonomous GTM & Sales Automation Engine',
    category: 'Revenue Systems',
    price: 'Open Curriculum',
    rating: '4.8',
    duration: '10 Workflows (~6 hrs)',
    lessonsCount: 10,
    instructorName: 'Patrick Diamitani',
    image: '/images/course-gtm-automation-poster.jpg',
    description: 'Production workflows for cold outreach, CRM hygiene, DNS deliverability, firmographic enrichment, and revops dashboards.',
    featured: false,
    videoId: 'b_7h2uP5-lI',
    projectRepoUrl: 'https://github.com/diamitani/letsvibeai',
    chapters: [
      { title: 'Workflow 01 to 03: Deliverability, DNS & Firmographic Enrichment', time: '00:00' },
      { title: 'Workflow 04 to 06: Inbound & Outbound Pipeline Automation', time: '20:10' },
      { title: 'Workflow 07 to 08: Pre-Call Briefs & Post-Call CRM Hygiene', time: '38:40' },
      { title: 'Workflow 09 to 10: RevOps Intelligence Dashboard & Reporting', time: '54:20' }
    ],
    whatYouWillLearn: [
      'Automate outbound prospecting and personalized email outreach pipelines',
      'Maintain pristine CRM data with automated enrichment and deduplication',
      'Generate real-time executive GTM intelligence reports with zero manual overhead',
      'Deploy scalable revenue automation using Make.com, n8n, and Google Sheets'
    ]
  }
];

interface CourseCatalogProps {
  onSelectModule: (moduleId: number) => void;
  onEnrollPlan?: (courseTitle: string) => void;
  onOpenLabs?: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectModule,
  onEnrollPlan,
  onOpenLabs
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCourseModal, setActiveCourseModal] = useState<CourseCardData | null>(null);

  const categories = [
    'All',
    'Flagship Vibe Coding',
    'Rapid Deployment',
    'Frontier Harnesses',
    'Visual Full-Stack',
    'Enterprise Coworker',
    'Hands-on Labs',
    'Revenue Systems'
  ];

  const filteredCourses = selectedCategory === 'All'
    ? COURSES
    : COURSES.filter(c => c.category === selectedCategory);

  return (
    <section id="courses" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>Complete Curriculum Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            Explore All Courses &{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Frontier Platforms.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            From zero-syntax vibe coding on Lovable and Cursor to sovereign multi-agent swarms with Codex, Hermes, and OpenClaw. 100% free open curriculum.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#4a4d4f]/10 shadow-xs max-w-full overflow-x-auto">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-[#f7f4f2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectModule(course.moduleId)}
            className="group bg-white rounded-[26px] p-5 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(16,27,36,0.09)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
          >
            
            <div className="space-y-4">
              
              {/* Image & Badges Wrapper */}
              <div className="relative rounded-[20px] overflow-hidden aspect-16/10 bg-[#071B3A]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/60 via-transparent to-transparent" />

                {/* Category Pill Tag (Top Left) */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#071B3A] shadow-xs">
                  {course.category}
                </div>

                {/* Price Tag Pill (Top Right) */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#34D399] text-[#071B3A] text-[11px] font-black shadow-sm">
                  {course.price}
                </div>

                {/* Featured Green Pulse Badge */}
                {course.featured && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#071B3A]/85 backdrop-blur-md text-white text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    <span>FEATURED TRACK</span>
                  </div>
                )}
              </div>

              {/* Author & Verification Row */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#071B3A] flex items-center justify-center text-white text-[10px] font-bold">
                    LV
                  </div>
                  <span className="text-xs text-[#4a4d4f] font-medium">
                    <strong className="text-[#071B3A] font-semibold">{course.instructorName}</strong>
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#34D399] bg-[#34D399]/10 px-2 py-0.5 rounded-md font-semibold">
                  <span>Verified Repo</span>
                </div>
              </div>

              {/* Course Title */}
              <h3 className="font-sans font-bold text-lg text-[#071B3A] leading-snug group-hover:text-[#ec4909] transition-colors line-clamp-2">
                {course.title}
              </h3>

              {/* Course Brief Description */}
              <p className="text-xs text-[#4a4d4f] leading-relaxed line-clamp-2">
                {course.description}
              </p>

            </div>

            {/* Bottom Meta Stats & Action */}
            <div className="pt-4 mt-4 border-t border-[#4a4d4f]/10 space-y-3">
              
              <div className="flex items-center justify-between text-xs text-[#4a4d4f]">
                <div className="flex items-center gap-1 text-[#071B3A] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#fcd554] text-[#fcd554]" />
                  <span>{course.rating}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#4a4d4f]/70" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#4a4d4f]/70" />
                  <span>{course.lessonsCount} Modules</span>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectModule(course.moduleId);
                  }}
                  className="py-2.5 px-3 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shadow-[#ec4909]/20"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start Course</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCourseModal(course);
                  }}
                  className="py-2.5 px-3 rounded-full bg-[#f7f4f2] hover:bg-white border border-[#4a4d4f]/10 text-[#071B3A] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Syllabus & Lab</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* COURSE DETAIL & LAB MODAL */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071B3A]/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-black/10 rounded-[32px] max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#4a4d4f]/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909] border border-[#ec4909]/20">
                    {activeCourseModal.category}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#34D399]/15 text-[#071B3A] border border-[#34D399]/30">
                    {activeCourseModal.price}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#071B3A] font-sans mt-2">
                  {activeCourseModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4a4d4f] pt-1">
                  {activeCourseModal.description}
                </p>
              </div>

              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-2 rounded-full bg-[#f7f4f2] text-[#4a4d4f] hover:text-[#071B3A] border border-[#4a4d4f]/10 cursor-pointer shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-6 space-y-6">
              
              {/* Video Poster Preview */}
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#071B3A] relative group">
                <img
                  src={activeCourseModal.image}
                  alt={activeCourseModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#071B3A]/40 flex items-center justify-center">
                  <button
                    onClick={() => {
                      onSelectModule(activeCourseModal.moduleId);
                      setActiveCourseModal(null);
                    }}
                    className="w-16 h-16 rounded-full bg-[#ec4909] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </button>
                </div>
              </div>

              {/* What You Will Learn */}
              <div>
                <h4 className="text-sm font-bold text-[#071B3A] uppercase tracking-wider font-mono mb-3">
                  Core Skills & Lab Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCourseModal.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4a4d4f] bg-[#F4F7FB] p-3 rounded-xl border border-[#4a4d4f]/10">
                      <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    onSelectModule(activeCourseModal.moduleId);
                    setActiveCourseModal(null);
                  }}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#ec4909]/25"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch Course Theater & Labs</span>
                </button>

                {activeCourseModal.projectRepoUrl && (
                  <a
                    href={activeCourseModal.projectRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-full bg-[#F4F7FB] hover:bg-[#EAEFF7] border border-[#4a4d4f]/15 text-[#071B3A] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};

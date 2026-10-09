import { MarketplaceItem, DirectoryListing, UserProfile, WorkspaceProject } from '../types';

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'tmpl-saas-enterprise',
    title: 'Enterprise AI SaaS Boilerplate',
    category: 'templates',
    price: 99,
    rating: 4.95,
    downloads: 3840,
    author: 'Vibe Engineering Team',
    description: 'Complete production-ready Next.js 15 + Vercel AI SDK 4.0 + Supabase Auth & RLS + Stripe Subscriptions boilerplate with dark obsidian Apple-grade styling.',
    tags: ['Next.js 15', 'Vercel AI SDK', 'Supabase', 'Stripe', 'Tailwind'],
    badge: 'Apple Grade',
    previewUrl: 'https://demo.letsvibeai.com/saas'
  },
  {
    id: 'agent-voice-signalwire',
    title: 'SignalWire Inbound AI Voice Receptionist',
    category: 'agents',
    price: 79,
    rating: 4.88,
    downloads: 1920,
    author: 'TelecomAgent Co',
    description: 'Ultra-low latency duplex voice agent harness with SignalWire Voice API, streaming tool calling, and live call transfer to human operators.',
    tags: ['SignalWire', 'Voice AI', 'WebSockets', 'Tool Calling'],
    badge: 'Bestseller',
    previewUrl: 'https://demo.letsvibeai.com/voice'
  },
  {
    id: 'skill-design-taste',
    title: 'Design-Taste Frontend Skill Pack',
    category: 'skills',
    price: 49,
    rating: 4.98,
    downloads: 5120,
    author: 'Curator Studio',
    description: 'The definitive anti-slop CSS & Tailwind token pack. Subtle micro-interactions, spring physics, obsidian surfaces, and accessible typography.',
    tags: ['Design System', 'Anti-Slop', 'Tailwind', 'Micro-interactions'],
    badge: 'Trending',
    previewUrl: 'https://demo.letsvibeai.com/design'
  },
  {
    id: 'tmpl-elearning-lms',
    title: 'Vibe E-Learning & Course Platform',
    category: 'templates',
    price: 89,
    rating: 4.92,
    downloads: 2450,
    author: 'Alex Rivera',
    description: 'Full video LMS with interactive code sandboxes, capstone grading engine, Stripe paywalls, and embedded AI tutor.',
    tags: ['LMS', 'Video Streaming', 'Code Sandbox', 'Supabase'],
    badge: 'Verified',
    previewUrl: 'https://demo.letsvibeai.com/lms'
  },
  {
    id: 'agent-rostr-curriculum',
    title: 'ROSTR v2 Autonomous Curriculum Architect',
    category: 'agents',
    price: 129,
    rating: 4.99,
    downloads: 3100,
    author: 'LetsVibe Labs',
    description: 'Self-assembling educational agent using the 5-layer PAL, NPAO, and RAG DAL framework. Synthesizes personalized learning paths on demand.',
    tags: ['ROSTR v2', 'PAL Engine', 'RAG DAL', 'Vercel AI SDK'],
    badge: 'Staff Pick',
    previewUrl: 'https://demo.letsvibeai.com/rostr'
  },
  {
    id: 'prompt-master-11docs',
    title: 'The 11-Doc Architecture Prompts Engine',
    category: 'prompts',
    price: 29,
    rating: 4.87,
    downloads: 6200,
    author: 'Chief Architect',
    description: 'Zero-hallucination prompt sequences that generate PRDs, Architecture ADRs, Database Schemas, and Security Threat models in minutes.',
    tags: ['Prompts', 'PRD', 'Architecture', 'ADR', 'Security'],
    badge: 'Popular',
    previewUrl: 'https://demo.letsvibeai.com/prompts'
  }
];

export const DIRECTORY_LISTINGS: DirectoryListing[] = [
  {
    id: 'dir-hyperframe',
    name: 'MotionFrame Studio',
    founder: 'Sophia Chen',
    category: 'B2B Creative Tech',
    mrr: '$28,400 / mo',
    description: 'Browser-native video automation platform for programmatic product promos, built using Vercel AI SDK and HyperFrames render engine.',
    stack: ['Next.js', 'Vercel AI SDK', 'HyperFrames', 'Supabase', 'Stripe'],
    url: 'https://motionframe.io',
    verified: true,
    featured: true
  },
  {
    id: 'dir-voicepulse',
    name: 'VoicePulse AI',
    founder: 'Marcus Vance',
    category: 'Customer Support',
    mrr: '$42,000 / mo',
    description: 'Autonomous voice support agents resolving 78% of inbound calls under 30 seconds with SignalWire Voice API and real-time LLM gateway.',
    stack: ['SignalWire', 'Vercel AI Gateway', 'FastAPI', 'Postgres'],
    url: 'https://voicepulse.ai',
    verified: true,
    featured: true
  },
  {
    id: 'dir-curriculumflow',
    name: 'CurriculumFlow',
    founder: 'Elena Rostova',
    category: 'EdTech',
    mrr: '$19,500 / mo',
    description: 'Adaptive curriculum generator for technical bootcamps, powering automated capstone evaluations and personalized AI office hours.',
    stack: ['React', 'ROSTR v2', 'Vercel Edge', 'Supabase RLS'],
    url: 'https://curriculumflow.com',
    verified: true,
    featured: false
  },
  {
    id: 'dir-promptvault',
    name: 'PromptVault Enterprise',
    founder: 'Devon Miller',
    category: 'Developer Tools',
    mrr: '$54,200 / mo',
    description: 'Version control and security audit registry for enterprise system prompts, preventing prompt injection and data leaks.',
    stack: ['Next.js 15', 'Vercel Sandbox', 'Tailwind', 'Stripe'],
    url: 'https://promptvault.dev',
    verified: true,
    featured: true
  },
  {
    id: 'dir-vibemarket',
    name: 'VibeForge Market',
    founder: 'Tariq Al-Mansoor',
    category: 'Marketplace',
    mrr: '$15,800 / mo',
    description: 'P2P marketplace for curated agent tools, skill definitions, and verified prompt architectures.',
    stack: ['Vercel AI Suite', 'Supabase Storage', 'Stripe Connect'],
    url: 'https://vibeforge.market',
    verified: true,
    featured: false
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_vibe_9921',
  email: 'founder@letsvibeai.com',
  fullName: 'Vibe Architect',
  plan: 'cohort',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Founder & Lead Engineer',
  bio: 'Building autonomous AI systems with clean architecture, Vercel AI SDK, and ROSTR v2.',
  apiKey: 'vibe_live_9a8f27c3e109d448b37e8c12a'
};

export const INITIAL_WORKSPACE_PROJECTS: WorkspaceProject[] = [
  {
    id: 'proj_saas_01',
    name: 'LetsVibeAI Core Platform',
    slug: 'letsvibeai-core',
    environment: 'production',
    status: 'live',
    lastDeployed: 'Just now (v1.0.0)',
    url: 'https://letsvibeai.com'
  },
  {
    id: 'proj_voice_02',
    name: 'SignalWire Receptionist Gateway',
    slug: 'signalwire-voice-gw',
    environment: 'production',
    status: 'live',
    lastDeployed: '12 mins ago',
    url: 'https://voice.letsvibeai.com'
  },
  {
    id: 'proj_sandbox_03',
    name: 'Portfolio Sandbox Runner',
    slug: 'portfolio-sandbox',
    environment: 'staging',
    status: 'live',
    lastDeployed: '45 mins ago',
    url: 'https://sandbox.letsvibeai.com'
  }
];

import { YouTubeRostrItem, DailyBriefVideo } from '../types';

export const DAILY_BRIEF_VIDEOS: DailyBriefVideo[] = [
  {
    id: 'daily-2026-10-08',
    date: 'October 8, 2026',
    title: 'Agent Architecture, Harness Standards & Vibe Coding Production',
    videoUrl: '/videos/daily/ai-daily-brief-2026-10-08.mp4',
    youtubeId: 'b_7h2uP5-lI',
    duration: '3:45',
    summary: 'The daily breakdown of AI agent harnesses, why direct typing is being replaced by architectural direction, and how the One Must Act theorem secures multi-agent execution.',
    highlights: [
      'The Shift to Director: Why vague prompts cause hallucination and how concrete specs route directly to working code.',
      'Agent Harness Topology: Model + Instructions + Tools + Memory + Loop.',
      'Zero Hallucination of External Action: Verification gates before any database write or payment event.',
      'Connecting daily learning directly into the 10-module foundational curriculum.'
    ],
    status: 'live',
    keyTool: 'Claude Code & Antigravity'
  },
  {
    id: 'daily-2026-10-07',
    date: 'October 7, 2026',
    title: 'MCP Tooling Standard & Durable Workflows',
    videoUrl: '/videos/mastered/07-agents-master.mp4',
    youtubeId: 'pOxO4e13mH8',
    duration: '4:12',
    summary: 'Model Context Protocol (MCP) as the universal connector for AI agents, integrating database servers, sandboxes, and file systems.',
    highlights: [
      'MCP as "USB-C for AI": Standardizing tool interfaces across harnesses.',
      'Durable multi-turn execution with state recovery.',
      'Safeguarding secrets and credentials outside client bundles.'
    ],
    status: 'archived',
    keyTool: 'Model Context Protocol'
  }
];

export const YOUTUBE_ROSTR_TUTORIALS: YouTubeRostrItem[] = [
  {
    id: 'yt-01',
    title: 'Building Software by Directing AI: The Vibe Coding Revolution',
    creator: 'Andrej Karpathy',
    creatorUrl: 'https://youtube.com/@AndrejKarpathy',
    youtubeId: 'zjkBMFhNj_g',
    category: 'Fullstack Vibe Coding',
    duration: '18:40',
    level: 'All Levels',
    summary: 'Andrej Karpathy breaks down the fundamental shift in software creation: moving from manual character-by-character syntax entry to high-level English architectural direction.',
    takeaways: [
      'Vibe coding is not guessing; it is high-level specification and rigorous review.',
      'The human builder directs the scene while the AI operator manages the camera and typing.',
      'Why prompt precision determines whether code compiles or collapses.'
    ],
    tags: ['Vibe Coding', 'Software 2.0', 'Foundations', 'Karpathy'],
    featured: true,
    publishedDate: 'Feb 2025'
  },
  {
    id: 'yt-02',
    title: 'Claude Code CLI: Architecture, File Editing & Agent Workflows',
    creator: 'Anthropic',
    creatorUrl: 'https://youtube.com/@AnthropicAI',
    youtubeId: 'Yf1o0cx6WKY',
    category: 'Harness Setup',
    duration: '14:25',
    level: 'Intermediate',
    summary: 'A deep architectural walkthrough of Claude Code terminal agent: how it inspects directories, runs tests, reads project rules from CLAUDE.md, and creates clean git commits.',
    takeaways: [
      'How to structure CLAUDE.md for zero-regression agent memory.',
      'Scoped tool permissions: read-only vs bash command execution.',
      'Automated git branching and commit practices.'
    ],
    tags: ['Claude Code', 'CLI', 'Agent Harness', 'Anthropic'],
    featured: true,
    publishedDate: '2025'
  },
  {
    id: 'yt-03',
    title: 'Cursor Rules & Composer: Complete Masterclass',
    creator: 'Cursor Community',
    creatorUrl: 'https://youtube.com',
    youtubeId: 'Z1BCujX3pw8',
    category: 'Harness Setup',
    duration: '22:15',
    level: 'Beginner',
    summary: 'Master the .cursorrules specification, multi-file Composer editing, and context indexing across large enterprise codebases.',
    takeaways: [
      'Writing effective .cursorrules that enforce TypeScript strictness.',
      'Using @symbols to target exact documentation and files.',
      'Avoiding context window saturation by keeping rule files focused.'
    ],
    tags: ['Cursor', 'Composer', 'IDE', 'Rules'],
    featured: true,
    publishedDate: '2025'
  },
  {
    id: 'yt-04',
    title: 'Vercel AI SDK 4.0: Streaming, AI Gateway & Tool Calling',
    creator: 'Vercel',
    creatorUrl: 'https://youtube.com/@VercelHQ',
    youtubeId: 'jA_n4xGqKuo',
    category: 'Agent Workflows & MCP',
    duration: '16:50',
    level: 'Advanced',
    summary: 'Build high-performance streaming AI user interfaces with useChat, streamText, Zod tool schemas, and Vercel AI Gateway load balancing.',
    takeaways: [
      'Zero-latency token streaming with React Server Components.',
      'Type-safe function calling with Zod schemas.',
      'Resilient multi-model fallbacks using AI Gateway.'
    ],
    tags: ['Vercel AI SDK', 'Next.js', 'Streaming', 'AI Gateway'],
    featured: true,
    publishedDate: '2025'
  },
  {
    id: 'yt-05',
    title: 'Model Context Protocol (MCP) Explained: USB-C for AI Agents',
    creator: 'Anthropic / MCP Open Standard',
    creatorUrl: 'https://modelcontextprotocol.io',
    youtubeId: '8x8jU_6P9E4',
    category: 'Agent Workflows & MCP',
    duration: '12:10',
    level: 'Intermediate',
    summary: 'Learn why MCP is replacing fragmented custom tool adapters. Discover how to configure local and remote MCP servers for databases, file systems, and SaaS platforms.',
    takeaways: [
      'The three MCP primitives: Resources, Prompts, and Tools.',
      'Connecting Supabase, GitHub, and Slack via MCP servers.',
      'Least-privilege security and local credential isolation.'
    ],
    tags: ['MCP', 'Model Context Protocol', 'Tools', 'Anthropic'],
    featured: true,
    publishedDate: '2025'
  },
  {
    id: 'yt-06',
    title: 'Supabase Postgres Row Level Security (RLS) & Auth in Next.js',
    creator: 'Supabase',
    creatorUrl: 'https://youtube.com/@Supabase',
    youtubeId: 'r5b0UP77O2k',
    category: 'Database & Auth',
    duration: '19:30',
    level: 'Intermediate',
    summary: 'The essential database security foundation for vibe coders. Prevent data leakage by enforcing row-level security policies based on auth.uid().',
    takeaways: [
      'Why front-end auth checks are never enough: security happens at the database layer.',
      'Writing airtight RLS policies for multi-tenant SaaS tables.',
      'Using Supabase Auth with Google OAuth and email magic links.'
    ],
    tags: ['Supabase', 'Postgres', 'RLS', 'Auth', 'Security'],
    featured: false,
    publishedDate: '2025'
  },
  {
    id: 'yt-07',
    title: 'Prompt Architecture & The PAL Pipeline: Parse, Scan, Expand, Compile',
    creator: 'LetsVibeAI / Artispreneur',
    creatorUrl: 'https://letsvibeai.com',
    youtubeId: 'b_7h2uP5-lI',
    category: 'Prompt Architecture & PAL',
    duration: '15:45',
    level: 'Intermediate',
    summary: 'How professional AI architects compile complex user intentions into typed manifests with explicit constraints, negative examples, and completion criteria.',
    takeaways: [
      'The 5 PAL stages: Parse, Ambiguity Scan, Latent Intent, Expand, Compile.',
      'Stripping conversational hedges to prevent model hesitation.',
      'Building immutable manifests that guide multi-agent execution.'
    ],
    tags: ['PAL', 'Prompt Architecture', 'PRD', 'Specification'],
    featured: true,
    publishedDate: '2026'
  },
  {
    id: 'yt-08',
    title: 'Stripe Checkout & Webhook Security in Next.js App Router',
    creator: 'Stripe Developers',
    creatorUrl: 'https://youtube.com/@StripeDevelopers',
    youtubeId: 'b_r_N3U5Oqo',
    category: 'Database & Auth',
    duration: '17:15',
    level: 'Intermediate',
    summary: 'Safely charge customers and handle subscription lifecycles. Learn how to verify webhook signatures so your database stays the true mirror of Stripe billing.',
    takeaways: [
      'Creating server-side Stripe Checkout sessions with client_reference_id.',
      'Verifying Stripe-Signature headers in route handlers.',
      'Idempotent database entitlement updates on checkout.session.completed.'
    ],
    tags: ['Stripe', 'Billing', 'Webhooks', 'Next.js'],
    featured: false,
    publishedDate: '2025'
  },
  {
    id: 'yt-09',
    title: 'Fullstack Next.js 15 & Tailwind: Complete Vibe Coding Build',
    creator: 'Theo - t3.gg',
    creatorUrl: 'https://youtube.com/@t3dotgg',
    youtubeId: '4_Zq_7N5Uko',
    category: 'Fullstack Vibe Coding',
    duration: '28:10',
    level: 'All Levels',
    summary: 'Step-by-step creation of a full-stack web application from a blank folder to deployed production URL using Cursor and Next.js 15 App Router.',
    takeaways: [
      'Setting up Server Components and isolating Client Component leaves.',
      'Tailwind CSS tokens, layout discipline, and mobile responsiveness.',
      'Deploying instantly to Vercel with zero-configuration Git workflows.'
    ],
    tags: ['Next.js 15', 'Fullstack', 'Cursor', 'React 19'],
    featured: false,
    publishedDate: '2025'
  },
  {
    id: 'yt-10',
    title: 'Git Versioning, Instant Rollbacks & Production Deployment',
    creator: 'Fireship',
    creatorUrl: 'https://youtube.com/@Fireship',
    youtubeId: 'hw-nBsmO2i4',
    category: 'Deployment & Scale',
    duration: '11:20',
    level: 'Beginner',
    summary: 'Why Git is your ultimate undo button when coding with agents. How preview URLs and Vercel rollbacks let you ship fearlessly.',
    takeaways: [
      'Commit after every single working unit before asking the agent for the next feature.',
      'Instant rollbacks on Vercel take under 3 seconds.',
      'Environment variables and secret management in production.'
    ],
    tags: ['Git', 'Vercel', 'DevOps', 'Deployment'],
    featured: false,
    publishedDate: '2025'
  },
  {
    id: 'yt-11',
    title: 'The 11 Planning Documents: Writing PRDs & Specs with AI',
    creator: 'LetsVibeAI Learning Hub',
    creatorUrl: 'https://letsvibeai.com',
    youtubeId: 'zjkBMFhNj_g',
    category: 'Prompt Architecture & PAL',
    duration: '13:50',
    level: 'Intermediate',
    summary: 'How to generate the 11 foundational planning documents (PRD, System Architecture, Tech Stack Key Sheet, Brand Guidelines) before writing a single line of application code.',
    takeaways: [
      'Why documentation is the agent’s brain: every prompt references /docs.',
      'The AWS Well-Architected Framework applied to modern fullstack apps.',
      'Moving from brain dump to 11 verified specs in under 30 minutes.'
    ],
    tags: ['PRD', 'Document Stack', 'Planning', 'SDLC'],
    featured: true,
    publishedDate: '2026'
  },
  {
    id: 'yt-12',
    title: 'Google Antigravity & Agentic Pair Programming Standards',
    creator: 'Google DeepMind Engineers',
    creatorUrl: 'https://deepmind.google',
    youtubeId: 'b_7h2uP5-lI',
    category: 'Harness Setup',
    duration: '21:00',
    level: 'Advanced',
    summary: 'An inside look at agentic pair programming: multi-turn reasoning, terminal sub-agents, memory persistence, and the One Must Act theorem.',
    takeaways: [
      'Law of the Whole: W = 1.00 before expanding to multipliers.',
      'Subagent delegation with specialized briefs and scoped tools.',
      'Jev quality evaluation gates for verified task completion.'
    ],
    tags: ['Antigravity', 'DeepMind', 'Multi-Agent', 'Pair Programming'],
    featured: false,
    publishedDate: '2026'
  }
];

export const TUTORIAL_CATEGORIES = [
  'All',
  'Harness Setup',
  'Fullstack Vibe Coding',
  'Agent Workflows & MCP',
  'Prompt Architecture & PAL',
  'Database & Auth',
  'Deployment & Scale'
] as const;

export function getLatestDailyBrief(): DailyBriefVideo {
  return DAILY_BRIEF_VIDEOS[0];
}

export function getTutorialsByCategory(category: string): YouTubeRostrItem[] {
  if (!category || category === 'All') return YOUTUBE_ROSTR_TUTORIALS;
  return YOUTUBE_ROSTR_TUTORIALS.filter((t) => t.category === category);
}

export function searchTutorials(query: string, category: string = 'All'): YouTubeRostrItem[] {
  const q = query.toLowerCase().trim();
  return YOUTUBE_ROSTR_TUTORIALS.filter((item) => {
    const matchesCat = category === 'All' || item.category === category;
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.creator.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });
}

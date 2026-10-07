import { CourseModule, ArchitectureBlock, DocTemplate, CapstoneDeliverable } from '../types';

export const ARCHITECTURE_BLOCKS: ArchitectureBlock[] = [
  {
    id: 'frontend',
    name: 'Front End',
    role: 'The public website and interactive UI users see and interact with in their browser.',
    analogy: 'The Storefront Window',
    analogyIcon: '🏬',
    defaultTool: 'Next.js App Router (React) + Tailwind CSS',
    alternatives: ['Vite + React', 'Remix', 'Nuxt.js'],
    securityNote: 'Never store secret API keys, payment keys, or database service roles in client bundles.',
    promptExample: 'Build a responsive landing page with dark mode, hero with dynamic CTA, and interactive feature grid using Tailwind CSS.',
    layer: 'client',
    connections: ['auth', 'server', 'chatui']
  },
  {
    id: 'dashboard',
    name: 'Dashboard UI',
    role: 'The authenticated private app area where members perform their core job.',
    analogy: 'The Back Office',
    analogyIcon: '🏢',
    defaultTool: 'Next.js App Routes / Protected Layouts',
    alternatives: ['React Router Protected Routes', 'TanStack Router'],
    securityNote: 'Always verify authentication session before rendering protected data.',
    promptExample: 'Create a dashboard layout with collapsible sidebar, real-time analytics stats cards, and project table.',
    layer: 'client',
    connections: ['auth', 'server', 'database']
  },
  {
    id: 'chatui',
    name: 'Chat & Agent UI',
    role: 'The conversational interface where users interact with AI agents in real-time.',
    analogy: 'The Help Desk & Concierge',
    analogyIcon: '💬',
    defaultTool: 'Vercel AI SDK (useChat) + AI Elements',
    alternatives: ['Assistant UI', 'Custom SSE Stream Handler'],
    securityNote: 'All chat requests must route through backend API routes that enforce token rate limits.',
    promptExample: 'Implement a streaming chat interface with markdown code rendering, copy buttons, and auto-scroll.',
    layer: 'client',
    connections: ['server', 'agent']
  },
  {
    id: 'auth',
    name: 'Authentication (Auth & OAuth)',
    role: 'Sign-up, sign-in, Google/GitHub OAuth, session cookies, and security tokens.',
    analogy: 'The Keycard Entry Gate',
    analogyIcon: '🔑',
    defaultTool: 'Supabase Auth (OAuth + Email Magic Links)',
    alternatives: ['Clerk', 'Auth.js', 'WorkOS'],
    securityNote: 'Use httpOnly secure cookies; avoid storing raw JWT tokens in browser localStorage.',
    promptExample: 'Configure Google OAuth and email magic link sign-in with automatic user profile creation in Postgres.',
    layer: 'gateway',
    connections: ['server', 'database']
  },
  {
    id: 'server',
    name: 'Backend API & Domain Logic',
    role: 'Server routes that authenticate requests, execute business rules, call AI models, and talk to Stripe.',
    analogy: 'The Secure Engine Room',
    analogyIcon: '⚙️',
    defaultTool: 'Next.js Server Actions & Route Handlers',
    alternatives: ['Express/Node.js', 'FastAPI', 'Cloudflare Workers'],
    securityNote: 'Holds all environment variables (STRIPE_SECRET_KEY, OPENAI_API_KEY, SUPABASE_SERVICE_ROLE).',
    promptExample: 'Write a protected POST API route with Zod schema validation that deducts user credits and calls the agent.',
    layer: 'server',
    connections: ['database', 'storage', 'payments', 'agent']
  },
  {
    id: 'database',
    name: 'Database (Postgres + RLS)',
    role: 'Relational data store organizing users, subscriptions, projects, messages, and audit logs.',
    analogy: 'The Master Ledger / Vault',
    analogyIcon: '🗄️',
    defaultTool: 'Postgres via Supabase with Row Level Security',
    alternatives: ['Neon Postgres', 'AWS RDS', 'PlanetScale'],
    securityNote: 'Always enable Row Level Security (RLS) so users can strictly only access their own records.',
    promptExample: 'Create the schema with users, projects, and entitlements tables, with RLS policies based on auth.uid().',
    layer: 'persistence',
    connections: ['server']
  },
  {
    id: 'storage',
    name: 'Object File Storage',
    role: 'Secure cloud bucket holding uploaded images, PDFs, avatars, and audio files.',
    analogy: 'The Digital Filing Cabinet',
    analogyIcon: '📁',
    defaultTool: 'Supabase Storage / AWS S3',
    alternatives: ['Vercel Blob', 'Cloudflare R2'],
    securityNote: 'Use signed upload URLs and enforce bucket security policies with file size caps.',
    promptExample: 'Implement drag-and-drop file upload that uploads directly to an S3-compatible bucket via presigned URL.',
    layer: 'persistence',
    connections: ['server']
  },
  {
    id: 'payments',
    name: 'Payments & Subscriptions',
    role: 'Checkout sessions, card processing, subscription life cycles, taxes, and webhook verifications.',
    analogy: 'The Cash Register & Billing Desk',
    analogyIcon: '💳',
    defaultTool: 'Stripe Billing + Stripe Checkout',
    alternatives: ['Lemon Squeezy', 'Paddle'],
    securityNote: 'Stripe webhooks are the single source of truth. Always verify webhook signatures before updating DB.',
    promptExample: 'Create a Stripe checkout session API and handle checkout.session.completed webhook idempotently.',
    layer: 'external',
    connections: ['server', 'database']
  },
  {
    id: 'agent',
    name: 'Agent Harness & AI Gateway',
    role: 'System prompt orchestration, tool execution, model selection, reasoning loops, and memory.',
    analogy: 'The Intelligent Employee Handbook',
    analogyIcon: '🤖',
    defaultTool: 'Vercel AI SDK + Claude 3.7 / OpenAI / Gemini',
    alternatives: ['LangChain / LangGraph', 'OpenAI Assistants API'],
    securityNote: 'Clamp max tokens per call, set circuit breakers for cost control, and validate tool call parameters.',
    promptExample: 'Build an agent harness with a database search tool and calculator tool, streaming responses via SSE.',
    layer: 'external',
    connections: ['server']
  },
  {
    id: 'versioning',
    name: 'Versioning (Git & GitHub)',
    role: 'Track every commit, branch, pull request, and rollback point for your application codebase.',
    analogy: 'Video Game Save Points & Time Machine',
    analogyIcon: '🌲',
    defaultTool: 'Git + GitHub',
    alternatives: ['GitLab', 'Bitbucket'],
    securityNote: 'Never commit .env files; add .env, .env.local, and node_modules to .gitignore.',
    promptExample: 'Initialize git repository, create standard .gitignore for Next.js, and push initial commit to GitHub.',
    layer: 'external',
    connections: ['deployment']
  },
  {
    id: 'deployment',
    name: 'Deployment & Hosting',
    role: 'Automated CI/CD that deploys preview branches and production releases to high-speed global edge servers.',
    analogy: 'The Moving Truck & Worldwide Real Estate',
    analogyIcon: '🚀',
    defaultTool: 'Vercel Edge Platform',
    alternatives: ['AWS Amplify', 'Netlify', 'Cloudflare Pages'],
    securityNote: 'Inject environment variables securely via the hosting control plane.',
    promptExample: 'Configure Vercel deployment with preview branches, custom domain, and automated HTTPS certificates.',
    layer: 'external',
    connections: ['server']
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: 'What is Vibe Coding?',
    slug: 'what-is-vibe-coding',
    tagline: 'From Idea to Software in Plain English',
    takeaway: 'Explain vibe coding and its two governing principles: Direction beats Guessing & Architecture First.',
    deliverable: 'Your app idea distilled into a crystal-clear one-paragraph specification.',
    estimatedHours: '1.5 hrs',
    icon: 'Sparkles',
    analogy: {
      title: 'The Film Director Analogy',
      description: "You are the film director, not the camera operator. You don't need to know how the lens works internally, but you must know what the scene requires."
    },
    lessons: [
      {
        id: '1.1',
        title: 'From idea to software, in words',
        summary: 'How software creation shifted from manual syntax typing to architectural direction.',
        content: 'Traditional coding requires learning syntax rules and translating concepts line by line. In vibe coding, you describe the system, the AI generates the code, and you review and steer.'
      },
      {
        id: '1.2',
        title: 'Principle 1: Direction beats guessing',
        summary: 'Why vague prompts trigger hallucinations and how structured specs guarantee success.',
        content: 'AI is pattern-completion. When your prompt is vague ("make a login page"), it invents details that break. When you specify auth provider, redirect paths, and error handling, it builds flawlessly.'
      },
      {
        id: '1.3',
        title: 'Principle 2: Every app has an architecture',
        summary: 'Understanding the building blocks before asking AI to code.',
        content: 'A house needs foundation, framing, plumbing, and electrical before painting walls. An app needs front end, auth, database, and backend APIs before UI polish.'
      },
      {
        id: '1.4',
        title: 'The 5-Step Vibe Coding Method',
        summary: 'Describe -> Document -> Architect -> Build -> Check & Ship.',
        content: '1. Describe idea. 2. Document with 11 docs. 3. Architect into 11 blocks. 4. Build page-by-page. 5. Check against pre-launch checklists and ship.'
      }
    ],
    copyPrompt: {
      title: 'Product Manager & Architect Intake Interview',
      prompt: `I want to build a web app. Here is my idea in my own words: [brain dump].
Before writing any code, ask me up to 10 questions that a senior product manager
and a software architect would need answered. Ask them one at a time.`,
      targetDoc: '/context/00-project-brief.md'
    },
    exercise: 'Write your app idea in one paragraph: who it is for, the problem it solves, what users do inside the app, and how it generates revenue. Run the intake prompt and save the Q&A.',
    quiz: [
      {
        id: 'q1-1',
        question: 'What fundamentally causes AI hallucination when coding?',
        options: [
          'The AI is intentionally being deceptive',
          'Vague prompts force pattern-completion to fill in missing technical facts with plausible guesses',
          'The programming language syntax is too new',
          'The computer ran out of memory'
        ],
        correctIndex: 1,
        explanation: 'AI models are next-token predictors. Without concrete constraints, they fill gaps with plausible but ungrounded guesses.'
      },
      {
        id: 'q1-2',
        question: 'What is the role of a human builder in vibe coding?',
        options: [
          'A typist who memorizes syntax',
          'A film director who specifies the scene, constraints, and architecture',
          'A passive spectator who accepts the first output',
          'A manual compiler'
        ],
        correctIndex: 1,
        explanation: 'Your job shifts from typist to director: setting clear intent, architecture, and verification criteria.'
      },
      {
        id: 'q1-3',
        question: 'Why must architecture precede coding?',
        options: [
          'Because AI will happily build UI rooms that collapse without a database and auth foundation',
          'Because modern browsers refuse to run code without an architectural permit',
          'Because Tailwind CSS requires 10 modules to compile',
          'It is only needed for enterprise teams with 100+ engineers'
        ],
        correctIndex: 0,
        explanation: 'Building UI without a data model and auth foundation creates throwaway code that has to be rewritten.'
      }
    ]
  },
  {
    id: 2,
    title: 'AI Fundamentals: ML, LLMs, Tokens & GPUs',
    slug: 'ai-fundamentals',
    tagline: 'Under the Hood of Machine Intelligence',
    takeaway: 'Explain how models predict tokens, manage context windows, and calculate monthly token budgets.',
    deliverable: 'A precise monthly token and cost budget for your target application.',
    estimatedHours: '2 hrs',
    icon: 'Cpu',
    analogy: {
      title: 'The Super-Fast Book Reader Analogy',
      description: 'An LLM is like a speed reader who has memorized every book on earth, but can only hold the last 50 pages in their active short-term memory at any given second.'
    },
    lessons: [
      {
        id: '2.1',
        title: 'Machine Learning vs Large Language Models',
        summary: 'How neural networks learn patterns across billions of parameters.',
        content: 'Traditional software is explicit rules (IF/THEN). Machine learning finds statistical relationships in vast datasets. LLMs apply this to language and code.'
      },
      {
        id: '2.2',
        title: 'Tokens: The Currency of AI',
        summary: 'How words convert to numerical tokens (1,000 tokens ≈ 750 words).',
        content: 'Models do not read letters; they process token chunks. Input tokens are read; output tokens are generated. Pricing is metered per million tokens.'
      },
      {
        id: '2.3',
        title: 'Context Windows & Working Memory',
        summary: 'Managing active memory limits (128k to 2M tokens) without degrading reasoning quality.',
        content: 'The context window is the active working memory. Too much irrelevant context causes "needle in a haystack" degradation. Context engineering is the art of curating exact facts.'
      },
      {
        id: '2.4',
        title: 'GPUs, Inference Speed & Latency',
        summary: 'Why AI compute costs money and how to balance speed vs reasoning power.',
        content: 'Inference runs on high-bandwidth memory GPUs. Fast models (Gemini Flash, Claude Haiku) return quick responses; reasoning models (Claude 3.7 Sonnet, DeepSeek R1) take time to think.'
      }
    ],
    copyPrompt: {
      title: 'Token Cost & Usage Modeling Prompt',
      prompt: `My web app idea: [app description].
Target user activity: [number of daily active users] performing [core action, e.g. 5 AI queries/day].
1. Calculate the estimated input and output tokens per user session.
2. Estimate the monthly token volume.
3. Compare monthly API costs across Claude 3.7 Sonnet, GPT-4o, and Gemini 2.5 Flash.`,
      targetDoc: '/docs/02-product-specs.md'
    },
    exercise: 'Calculate your application token budget based on 100 active users making 10 requests per day with 1,500 token average prompt size.',
    quiz: [
      {
        id: 'q2-1',
        question: 'Approximately how many words are in 1,000 tokens in English text?',
        options: ['100 words', '750 words', '2,500 words', '10,000 words'],
        correctIndex: 1,
        explanation: 'A general rule of thumb is that 1 token is approximately 0.75 words, so 1,000 tokens is about 750 words.'
      },
      {
        id: 'q2-2',
        question: 'What is a context window in an LLM?',
        options: [
          'The visual browser tab where the user chats',
          'The maximum amount of combined input and output tokens the model can process in a single request',
          'The operating system window running the python server',
          'The database table holding user passwords'
        ],
        correctIndex: 1,
        explanation: 'The context window represents the model active short-term memory during an API invocation.'
      },
      {
        id: 'q2-3',
        question: 'Why is it better to use a lightweight model for classification and a frontier model for reasoning?',
        options: [
          'Lightweight models are faster and 10x-50x cheaper for simple tasks, saving massive operating costs',
          'Frontier models cannot understand short words',
          'Lightweight models have unlimited GPUs',
          'There is no difference between models'
        ],
        correctIndex: 0,
        explanation: 'Model routing routes simple routing tasks to fast, low-cost models while preserving high-tier models for heavy synthesis.'
      }
    ]
  },
  {
    id: 3,
    title: 'The AI Landscape: Model Providers & Platforms',
    slug: 'ai-landscape',
    tagline: 'Choosing the Right Brain for Every Task',
    takeaway: 'Navigate OpenAI, Anthropic, Google, open-source models, and AI gateways.',
    deliverable: 'Your Model Provider Shortlist with primary and fallback models.',
    estimatedHours: '2 hrs',
    icon: 'Layers',
    analogy: {
      title: 'The Specialist Consulting Firm Analogy',
      description: "You don't hire a neurosurgeon to draft a standard invoice. Pick specialized models: fast analysts for routing, deep thinkers for code generation."
    },
    lessons: [
      {
        id: '3.1',
        title: 'The Big Three: Anthropic, OpenAI, Google',
        summary: 'Comparing Claude (code & taste), GPT-4o (versatility), and Gemini (massive context & multimodal).',
        content: 'Anthropic Claude excels at long-form coding and nuanced reasoning; OpenAI GPT-4o offers wide ecosystem support; Google Gemini provides massive 2M token context windows.'
      },
      {
        id: '3.2',
        title: 'Open Source & Reasoning Models: DeepSeek & Llama',
        summary: 'High-performance cost-effective alternatives and self-hosted inference.',
        content: 'DeepSeek R1 and Meta Llama 3 offer frontier capabilities at extreme cost efficiency for privacy-conscious or high-volume workflows.'
      },
      {
        id: '3.3',
        title: 'AI Gateways & Fallback Routing',
        summary: 'Why production apps route through gateways to prevent provider outages and rate limits.',
        content: 'Never hardcode a single model provider in production. An AI Gateway automatically retries failed calls, manages caching, and routes to fallback models.'
      }
    ],
    copyPrompt: {
      title: 'Model Selection Matrix Prompt',
      prompt: `My app features: [list of features, e.g. text summarizer, SQL query generator, chat assistant].
Recommend the primary model and fallback model for each feature, factoring in latency, cost per 1M tokens, and output quality.`,
      targetDoc: '/docs/03-tech-stack-key-sheet.md'
    },
    exercise: 'Create your 3-tier model strategy: Tier 1 (Background Classification), Tier 2 (User Interactive Chat), Tier 3 (Complex Code/Data Analysis).',
    quiz: [
      {
        id: 'q3-1',
        question: 'What is the primary role of an AI Gateway in a web application?',
        options: [
          'To generate SVG graphics automatically',
          'To manage model routing, fallback on provider errors, rate limiting, and caching',
          'To replace PostgreSQL database tables',
          'To run CSS animations in the browser'
        ],
        correctIndex: 1,
        explanation: 'AI Gateways provide resilience, automatic failover when a provider returns 429 or 500 errors, and usage observability.'
      },
      {
        id: 'q3-2',
        question: 'Which model family is widely recognized for superior nuance in complex coding and instruction following?',
        options: ['Anthropic Claude', 'Legacy Word 97 macro engine', 'Basic regex matcher', 'Unigram counter'],
        correctIndex: 0,
        explanation: 'Anthropic Claude (e.g. Claude 3.7 Sonnet) is known for state-of-the-art coding and agentic reasoning.'
      },
      {
        id: 'q3-3',
        question: 'What is the risk of hardcoding a single AI provider with no fallback?',
        options: [
          'If the provider has downtime or rate limits (HTTP 429), your app is completely broken for users',
          'Your CSS styles will fail to load',
          'Your Stripe account will be closed',
          'Nothing, AI providers never experience outages'
        ],
        correctIndex: 0,
        explanation: 'A resilient architecture includes fallback models so unexpected rate limits do not cause user-facing errors.'
      }
    ]
  },
  {
    id: 4,
    title: 'Web App Architecture: The 11 Building Blocks',
    slug: 'web-app-architecture',
    tagline: 'The Master Blueprint of Production Software',
    takeaway: 'Map all 11 building blocks to tools and trace a user click from browser to database and AI model.',
    deliverable: 'Your complete System Architecture Map with request flow diagrams.',
    estimatedHours: '2.5 hrs',
    icon: 'Network',
    analogy: {
      title: 'The Commercial Building Blueprint Analogy',
      description: 'Front end is the storefront, Auth is the security desk, Backend is the staff hallway, Database is the secure vault, and Stripe is the register.'
    },
    lessons: [
      {
        id: '4.1',
        title: 'The 11 Building Blocks Overview',
        summary: 'Front end, Dashboard, Chat UI, Storage, Database, Auth, Payments, Agent, Git, Deployment, Hosting.',
        content: 'Every modern software business uses these exact same 11 pillars. Understanding their boundaries is 90% of architectural literacy.'
      },
      {
        id: '4.2',
        title: 'Front End vs Back End Security Boundary',
        summary: 'The Golden Rule: Secrets NEVER exist on the front end.',
        content: 'Browsers are untrusted public environments. Any API key in client code can be stolen in seconds. Secret keys belong exclusively in server environment variables.'
      },
      {
        id: '4.3',
        title: 'Tracing One Click Through the System',
        summary: 'Detailed request path when a user submits a prompt in the chat window.',
        content: 'User clicks Send -> Browser sends JSON -> Auth verifies cookie -> Server checks DB entitlement -> Server calls AI API -> Stream chunks back to UI -> Log saved to DB.'
      },
      {
        id: '4.4',
        title: 'Stateless Servers & Row-Level Security',
        summary: 'Designing for effortless scale from 1 user to 1,000,000 users.',
        content: 'Keep servers stateless so compute instances can scale up or down automatically. Enforce Row-Level Security in Postgres so tenant data is cryptographically isolated.'
      }
    ],
    copyPrompt: {
      title: 'System Architecture Mapping Prompt',
      prompt: `Act as a senior software architect. For this app idea: [one-paragraph idea].
1. Map each of the 11 blocks to a specific tool and explain why.
2. List the database tables with columns and foreign keys.
3. Draw the step-by-step request flow for the primary user action.`,
      targetDoc: '/docs/04-system-architecture.md'
    },
    exercise: 'Draw your app architecture on paper: 11 boxes, labeled tools, and numbered arrows showing how data flows on a paid user action.',
    quiz: [
      {
        id: 'q4-1',
        question: 'Where must the Stripe Secret Key and Database Service Role Key live?',
        options: [
          'In the client-side JavaScript React component',
          'In server-side environment variables only',
          'In a public GitHub README.md file',
          'In the browser localStorage'
        ],
        correctIndex: 1,
        explanation: 'Secret keys must strictly live in backend environment variables. Placing them in frontend code exposes your billing and database to the public.'
      },
      {
        id: 'q4-2',
        question: 'What is the purpose of Postgres Row-Level Security (RLS)?',
        options: [
          'To format text in uppercase',
          'To guarantee that a logged-in user can only query and mutate their own records',
          'To speed up CSS styling animations',
          'To send welcome emails via Resend'
        ],
        correctIndex: 1,
        explanation: 'RLS policies check `auth.uid() = user_id` at the database engine level, preventing unauthorized access across tenants.'
      },
      {
        id: 'q4-3',
        question: 'Why are subscriptions verified via Stripe Webhooks rather than trusting the success redirect URL?',
        options: [
          'Because a user could manually type the success URL into their browser without paying',
          'Because webhooks are slower',
          'Because Next.js forbids redirect URLs',
          'Because Stripe requires credit card numbers to be emailed'
        ],
        correctIndex: 0,
        explanation: 'Never trust client-side URLs. Stripe cryptographically signed webhooks are the sole verified source of truth for payment status.'
      }
    ]
  },
  {
    id: 5,
    title: 'The Toolbox: Coding Harnesses, Cloud & Hosting',
    slug: 'the-toolbox',
    tagline: 'Equipping Your High-Velocity AI Stack',
    takeaway: 'Pick and configure your IDE, coding harness (Cursor, Antigravity, Claude Code), and cloud hosts.',
    deliverable: 'Your Tech Stack Key Sheet with all environment keys and provider choices.',
    estimatedHours: '2 hrs',
    icon: 'Wrench',
    analogy: {
      title: 'The Formula 1 Pit Crew Analogy',
      description: 'Your coding harness is the high-tech cockpit; your cloud providers are the precision engine and pit crew keeping the car flying around the track.'
    },
    lessons: [
      {
        id: '5.1',
        title: 'Choosing Your Coding Harness',
        summary: 'Comparing Cursor, Antigravity IDE, Claude Code, and Windsurf.',
        content: 'Modern coding harnesses give AI agentic tool access: viewing files, executing terminals, running browsers, and applying atomic diffs.'
      },
      {
        id: '5.2',
        title: 'Cloud & Database Setup: Supabase & Vercel',
        summary: 'Setting up managed Postgres, auth providers, and serverless hosting in under 10 minutes.',
        content: 'Using modern serverless platforms eliminates server maintenance, manual OS patches, and manual SSL configuration.'
      },
      {
        id: '5.3',
        title: 'Environment Variables & Key Management',
        summary: 'Setting up .env.example, local secrets, and production secret variables.',
        content: 'Create a clean `.env.example` that lists required key names without actual secret values for safe onboarding and repository storage.'
      }
    ],
    copyPrompt: {
      title: 'Tech Stack Key Sheet Generator',
      prompt: `Create a Tech Stack Key Sheet for my project: [app description].
Include:
1. Every service and provider chosen with justification.
2. Required environment variables with mock safe examples for .env.example.
3. Free tier limits vs paid upgrade triggers for each tool.`,
      targetDoc: '/docs/03-tech-stack-key-sheet.md'
    },
    exercise: 'Draft your project .env.example with placeholders for NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, and AI_API_KEY.',
    quiz: [
      {
        id: 'q5-1',
        question: 'What is the purpose of a .env.example file in a project repository?',
        options: [
          'To store your live credit card numbers',
          'To provide a safe template of all required environment variable names without exposing real secrets',
          'To tell CSS how many pixels wide the screen is',
          'To deploy the app to the Google Play Store'
        ],
        correctIndex: 1,
        explanation: '`.env.example` serves as documentation for developers and agents on what keys are needed, while real values stay in ignored `.env.local`.'
      },
      {
        id: 'q5-2',
        question: 'What is the key difference between an Anon Key and a Service Role Key in Supabase?',
        options: [
          'Anon key is safe for client browsers and respects RLS; Service Role Key bypasses RLS and must NEVER be exposed to clients',
          'Anon key is for paid users; Service role is for free users',
          'Anon key is only used in Python',
          'They are identical'
        ],
        correctIndex: 0,
        explanation: 'The Supabase Anon Key is designed for client use and is governed by RLS policies; the Service Role Key bypasses all RLS.'
      },
      {
        id: 'q5-3',
        question: 'Why should .env and .env.local always be listed in .gitignore?',
        options: [
          'To make git download faster',
          'To prevent accidental leak of sensitive production API keys and database credentials to GitHub',
          'Because git cannot read files starting with a dot',
          'To make the app run in dark mode'
        ],
        correctIndex: 1,
        explanation: 'Adding secret files to `.gitignore` ensures credentials are never pushed to public or private version control.'
      }
    ]
  },
  {
    id: 6,
    title: 'Talking to AI: Prompting, Chains & Context Engineering',
    slug: 'talking-to-ai',
    tagline: 'Mastering the Art of Precision Technical Prompts',
    takeaway: 'Write production-grade system prompts, multi-step prompt chains, and curated context packs.',
    deliverable: 'A complete /context pack for your application.',
    estimatedHours: '2.5 hrs',
    icon: 'MessageSquare',
    analogy: {
      title: 'The Architectural Specification Analogy',
      description: "When building a skyscraper, the blueprints specify exact steel grades and bolt diameters. Precise context gives the AI unambiguous blueprints."
    },
    lessons: [
      {
        id: '6.1',
        title: 'The Anatomy of a Production Prompt',
        summary: 'Role + Objective + Context + Constraints + Output Schema + Definition of Done.',
        content: 'High-performing prompts structure the mission clearly: who the AI is acting as, what success looks like, what tools are permitted, and the exact format required.'
      },
      {
        id: '6.2',
        title: 'Context Engineering: Curating Facts Over Fluff',
        summary: 'Building the /context folder: 00-project-brief, 01-brand, 02-data-model, 03-apis.',
        content: 'Do not dump 100 pages of unstructured text. Split context into modular files that the AI can reference specifically as needed.'
      },
      {
        id: '6.3',
        title: 'Chain Prompting: Breaking Complex Tasks into Atomic Steps',
        summary: 'Why asking AI to do 10 things at once fails, and how sequential chains guarantee 100% accuracy.',
        content: 'Complex tasks should be executed in order: Step 1 (Schema) -> Step 2 (Server Action) -> Step 3 (Component) -> Step 4 (Tests). Test at each milestone.'
      }
    ],
    copyPrompt: {
      title: 'Context Pack Verification Prompt',
      prompt: `Read everything in the /context folder.
1. Summarize the application in 5 concise bullets.
2. Identify any missing technical specifications or contradictory requirements.
3. List the 3 questions you need answered before implementing [feature name].`,
      targetDoc: '/context/05-current-status.md'
    },
    exercise: 'Create a /context folder with 00-project-brief.md and 02-data-model.md. Run the verification prompt.',
    quiz: [
      {
        id: 'q6-1',
        question: 'Why does splitting a large feature into sequential prompt steps yield higher quality code?',
        options: [
          'Because AI models can focus attention on one layer at a time without cognitive overload',
          'Because it uses fewer characters in the terminal',
          'Because git only allows one commit per day',
          'Because CSS cannot compile alongside TypeScript'
        ],
        correctIndex: 0,
        explanation: 'Step-by-step chain prompting allows the agent to reason through each technical boundary cleanly.'
      },
      {
        id: 'q6-2',
        question: 'What is the most effective way to provide project knowledge to a coding agent?',
        options: [
          'Paste 50,000 lines of unrelated blog posts',
          'Provide a structured /context directory with concise, modular documents (brief, schema, stack, status)',
          'Ask the AI to guess the project requirements',
          'Only use voice messages'
        ],
        correctIndex: 1,
        explanation: 'Structured, concise context packs give the model high-signal facts without noise.'
      },
      {
        id: 'q6-3',
        question: 'What is a "Definition of Done" in a technical prompt?',
        options: [
          'The exact criteria and verification steps required to confirm the task is complete and working',
          'The date when the builder plans to retire',
          'The final line of a CSS file',
          'The credit card expiration date'
        ],
        correctIndex: 0,
        explanation: 'A Definition of Done specifies exact test criteria so both agent and builder can verify functionality.'
      }
    ]
  },
  {
    id: 7,
    title: 'Agents: Harness, Skills, Tools, Loops, Goals & Graphs',
    slug: 'agents',
    tagline: 'Orchestrating Autonomous AI Teammates',
    takeaway: 'Design and deploy AI agents with custom skills, tool schemas, reflection loops, and safety guardrails.',
    deliverable: 'A working /agent folder with AGENTS.md, skills, and tool definitions.',
    estimatedHours: '3 hrs',
    icon: 'Bot',
    analogy: {
      title: 'The Specialized Agency Staff Analogy',
      description: 'An agent is not just a chat window; it is a specialist employee with a job description (harness), training manual (skills), toolbox (tools), and quality checklist (loop).'
    },
    lessons: [
      {
        id: '7.1',
        title: 'The Anatomy of an AI Agent',
        summary: 'LLM + System Instructions + Tool Calling + Execution Loop + Memory.',
        content: 'Agents differ from standard chat because they can take actions: reading files, searching databases, querying APIs, and executing code iteratively.'
      },
      {
        id: '7.2',
        title: 'Skills & Tools: Giving Agents Real Power',
        summary: 'Defining JSON schemas for tools and modular skill folders (SKILL.md).',
        content: 'Skills are modular instruction sets; tools are typed functions the model can execute. Tools must have rigorous error handling and validation.'
      },
      {
        id: '7.3',
        title: 'Loops, Goals & Reflection',
        summary: 'How agents evaluate their own work, catch errors, and iterate until the goal is verified.',
        content: 'Agents use ReAct (Reason + Act) loops: analyze state -> plan next step -> execute tool -> inspect result -> adjust if needed.'
      },
      {
        id: '7.4',
        title: 'Guardrails & Safety Limits',
        summary: 'Setting iteration limits, budget caps, read-only modes, and human-in-the-loop gates.',
        content: 'Never allow unbounded autonomous loops without max_iterations and spending circuit breakers. Critical side effects (payments, deletes) require explicit confirmation.'
      }
    ],
    copyPrompt: {
      title: 'Agent Architecture & Skill Authoring Prompt',
      prompt: `Act as a principal AI agent architect. For my app: [app description].
Design an autonomous agent named "[AgentName]" that performs: [core task].
1. Write the AGENTS.md system instructions with role, mission, denied tools, and quality gates.
2. Define 2 custom tool schemas with TypeScript types and Zod validation.
3. Write a complete SKILL.md file with YAML frontmatter.`,
      targetDoc: '/agent/AGENTS.md'
    },
    exercise: 'Create an /agent folder with AGENTS.md and skills/researcher/SKILL.md containing YAML frontmatter and step-by-step instructions.',
    quiz: [
      {
        id: 'q7-1',
        question: 'What distinguishes an autonomous AI agent from a standard chat prompt?',
        options: [
          'An agent has tools to interact with external environments, observe results, and iterate in a loop toward a goal',
          'An agent uses more emojis',
          'An agent runs only on mobile phones',
          'An agent cannot write code'
        ],
        correctIndex: 0,
        explanation: 'Tool execution and iterative feedback loops enable agents to solve multi-step problems autonomously.'
      },
      {
        id: 'q7-2',
        question: 'Why are guardrails like max_iterations and budget caps essential for agents?',
        options: [
          'To prevent runaway infinite loops that waste thousands of dollars in API token costs',
          'Because AI models get physically tired',
          'Because GitHub limits repositories to 10 files',
          'To make the UI look more technical'
        ],
        correctIndex: 0,
        explanation: 'Guardrails protect against endless loops when an agent encounters an unexpected error condition.'
      },
      {
        id: 'q7-3',
        question: 'What is a SKILL.md file in modern agent frameworks?',
        options: [
          'A modular instruction document with YAML frontmatter that teaches an agent a specialized workflow on-demand',
          'A video game achievements list',
          'A database backup file',
          'A compiled C++ binary'
        ],
        correctIndex: 0,
        explanation: 'Skills are modular knowledge packets loaded dynamically when an agent needs domain-specific guidance.'
      }
    ]
  },
  {
    id: 8,
    title: 'The Document Stack: 11 Planning Docs Written with AI',
    slug: 'document-stack',
    tagline: 'The Professional Artifact Catalog Before Code',
    takeaway: 'Generate the complete 11-document specification stack with AI in a single afternoon.',
    deliverable: 'A complete /docs folder with all 11 planning artifacts.',
    estimatedHours: '3 hrs',
    icon: 'FileText',
    analogy: {
      title: 'The Engineering Binder Analogy',
      description: 'NASA never launches a rocket without a flight manual. The 11-doc stack is your complete engineering binder that guarantees seamless execution.'
    },
    lessons: [
      {
        id: '8.1',
        title: 'Why Documents Precede Code',
        summary: 'The cheapest time to fix a fatal product flaw is in a markdown file.',
        content: 'Rewriting a database schema or business flow in code takes days; fixing it in a PRD takes 30 seconds. Planning is the ultimate accelerator.'
      },
      {
        id: '8.2',
        title: 'The 11 Planning Documents Breakdown',
        summary: 'PRD, Specs, Tech Stack, Architecture, IA, Well-Architected, SDLC, Roadmap, Brand, Design, GTM.',
        content: 'Each document answers a specific question: 01 Problem/Solution, 04 Request Flows, 05 Sitemap, 06 Security/Reliability, 10 UI Tokens.'
      },
      {
        id: '8.3',
        title: 'The Sequential Document Generation Pipeline',
        summary: 'Prompting AI to generate all 11 docs sequentially with consistency checks.',
        content: 'Feed the project brief into AI, generate Doc 01, review, then pass Doc 01 to generate Doc 02. Each doc builds on verified previous truth.'
      }
    ],
    copyPrompt: {
      title: '11-Document Stack Master Generation Prompt',
      prompt: `You are a product team in one: PM, software architect, UI designer, security engineer, and GTM lead.
Project brief: read /context/00-project-brief.md.
Generate doc 01-prd.md following standard artifact structure (Problem, Solution, Scope, Non-Goals, FRs, NFRs, Success Metrics).
Once approved, we will proceed sequentially through all 11 documents.`,
      targetDoc: '/docs/01-prd.md'
    },
    exercise: 'Generate 01-prd.md and 04-system-architecture.md for your project using the master prompt template.',
    quiz: [
      {
        id: 'q8-1',
        question: 'Why is it recommended to generate the 11 planning docs sequentially rather than all at once in a single prompt?',
        options: [
          'Sequential generation ensures each subsequent document builds upon approved, consistent facts without truncation',
          'Because markdown only supports 1 document per hour',
          'Because the computer keyboard will overheat',
          'Because AI cannot understand numbers higher than 1'
        ],
        correctIndex: 0,
        explanation: 'Sequential generation allows human review at each gate and prevents context window truncation.'
      },
      {
        id: 'q8-2',
        question: 'What is the role of 06-well-architected.md in the document stack?',
        options: [
          'It evaluates the system against the 6 pillars: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability',
          'It designs the company logo in Photoshop',
          'It manages Google Ads campaigns',
          'It stores user passwords'
        ],
        correctIndex: 0,
        explanation: 'Well-Architected reviews ensure the product is secure, resilient, cost-effective, and operationally sound from Day 1.'
      },
      {
        id: 'q8-3',
        question: 'What should be included in the "Non-Goals" section of a PRD?',
        options: [
          'Features and scope that are deliberately NOT being built in V1 to keep focus and speed high',
          'Things the company hates',
          'List of competing companies',
          'The Wi-Fi password'
        ],
        correctIndex: 0,
        explanation: 'Defining Non-Goals prevents scope creep and keeps the V1 release lean and fast.'
      }
    ]
  },
  {
    id: 9,
    title: 'The Build Process: Front End to Back End to Agent Review',
    slug: 'build-process',
    tagline: 'Building Page-by-Page with Precision',
    takeaway: 'Execute the build in correct order: Scaffolding -> UI -> Database -> Auth -> Stripe -> Agents.',
    deliverable: 'Your complete V1 web app running and functional on localhost.',
    estimatedHours: '4 hrs',
    icon: 'Hammer',
    analogy: {
      title: 'The Modular Assembly Line Analogy',
      description: 'Assemble the car chassis, bolt the engine, connect the electrical harness, test the brakes, and finally buff the paint. Never paint before the engine is in.'
    },
    lessons: [
      {
        id: '9.1',
        title: 'The Golden Build Order',
        summary: 'Step 1: Scaffolding -> Step 2: Database -> Step 3: Auth -> Step 4: Core Job -> Step 5: Payments.',
        content: 'Following the verified build sequence prevents cyclic dependency bugs and ensures every feature has its required foundation ready.'
      },
      {
        id: '9.2',
        title: 'Building with Taste: design-taste-frontend',
        summary: 'Avoiding AI slop: typography hierarchy, color calibration, anti-center bias, and tactile feedback.',
        content: 'Professional UI avoids generic AI purple gradients and equal cards. Use intentional typography, high-contrast accents, and polished responsive layouts.'
      },
      {
        id: '9.3',
        title: 'Automated Agent Code Review Passes',
        summary: 'Running specialized review agents for security, accessibility, and performance before merging.',
        content: 'Dispatch automated reviewer agents: Security Agent audits secret leaks and RLS; A11y Agent checks WCAG contrast; Performance Agent audits bundle sizes.'
      }
    ],
    copyPrompt: {
      title: 'Section Build & Verification Prompt',
      prompt: `You are an elite frontend and systems engineer with high design taste.
Read /docs/04-system-architecture.md and /docs/10-design-specs.md.
Build [Feature/Page Name]:
1. Implement clean TypeScript types with Zod validation.
2. Build responsive UI component with Tailwind CSS (dark mode foundation, luminous accents).
3. Connect server action with error boundaries and toast notifications.
4. Verify there are 0 console errors and 0 type errors.`,
      targetDoc: '/prompts/01-build-feature.md'
    },
    exercise: 'Build the core value-prop feature of your app, connect it to a mock server action, and verify mobile responsiveness.',
    quiz: [
      {
        id: 'q9-1',
        question: 'Why should you build the database schema and auth before polishing UI micro-animations?',
        options: [
          'Because UI components depend on real data types and user session state to function',
          'Because animations take 24 hours to render',
          'Because Stripe requires animations to be disabled',
          'Because React cannot run without CSS'
        ],
        correctIndex: 0,
        explanation: 'Data models define the contract for the UI. Building UI on top of finalized data models prevents painful refactoring.'
      },
      {
        id: 'q9-2',
        question: 'According to design-taste-frontend rules, what is considered an "AI Tell" to avoid?',
        options: [
          'Generic centered heroes with purple/blue glowing blobs and 3 identical card containers',
          'Clean responsive typography',
          'High contrast buttons with active tactile scale feedback',
          'Using SVGs from established icon libraries'
        ],
        correctIndex: 0,
        explanation: 'Generic purple gradients, centered text over dark mesh, and 3 equal cards are classic AI clichés that look unpolished.'
      },
      {
        id: 'q9-3',
        question: 'What is the role of an automated Security Review Agent before shipping?',
        options: [
          'To audit code for exposed API secrets, missing RLS policies, unvalidated inputs, and CSRF vulnerabilities',
          'To purchase domain names on GoDaddy',
          'To post on Twitter/X',
          'To format CSS files'
        ],
        correctIndex: 0,
        explanation: 'A security review agent systematically scans the codebase for vulnerability patterns before deployment.'
      }
    ]
  },
  {
    id: 10,
    title: 'Ship It: Versioning, Deployment, Hosting & Launch',
    slug: 'ship-it',
    tagline: 'Going Live to the World with Confidence',
    takeaway: 'Deploy to Vercel/Cloudflare, configure custom domains, verify pre-launch checklists, and launch.',
    deliverable: 'A live production HTTPS URL passing all pre-launch verification checks.',
    estimatedHours: '2 hrs',
    icon: 'Rocket',
    analogy: {
      title: 'The Grand Opening Analogy',
      description: 'Unlock the doors, turn on the neon sign, test the credit card reader with a real dollar, and welcome your first customers.'
    },
    lessons: [
      {
        id: '10.1',
        title: 'Git Versioning & Release Hygiene',
        summary: 'Clean commit messages, release tags, and branch protection.',
        content: 'Create clear semantic commit messages (feat:, fix:, docs:, chore:) so rollbacks and change history are effortless.'
      },
      {
        id: '10.2',
        title: 'Deploying to Production with Vercel & Supabase',
        summary: 'Connecting GitHub repo, setting production environment variables, and automated builds.',
        content: 'Every push to `main` automatically triggers an immutable production deployment with instant rollback capabilities.'
      },
      {
        id: '10.3',
        title: 'Pre-Launch Checklist & Live Payment Smoke Test',
        summary: 'Running the 15-point launch checklist and verifying a live $1 Stripe transaction.',
        content: 'Run a live smoke test: sign up as a new user, test OAuth, complete a real checkout, verify webhook activation, and test core agent loop.'
      }
    ],
    copyPrompt: {
      title: 'Pre-Launch Audit & Verification Prompt',
      prompt: `Audit the entire project against /checklists/pre-launch.md.
Check:
1. Are all production environment variables configured?
2. Are all public routes passing SEO meta tag checks?
3. Are error boundaries and 404 pages styled?
4. Are database RLS policies enabled on every table?
Output a pass/fail table and list any blockers.`,
      targetDoc: '/checklists/pre-launch.md'
    },
    exercise: 'Deploy your project to Vercel, attach a custom domain or .vercel.app URL, and complete a full sign-up and payment smoke test.',
    quiz: [
      {
        id: 'q10-1',
        question: 'Why should you perform a live $1 Stripe smoke test before announcing your launch?',
        options: [
          'To verify that live webhook keys, customer portal redirects, and database entitlement updates work end-to-end',
          'To pay Vercel for hosting',
          'Because Stripe requires an opening balance',
          'To register the copyright'
        ],
        correctIndex: 0,
        explanation: 'A live test ensures real production webhook signing secrets and fulfillment logic work flawlessly.'
      },
      {
        id: 'q10-2',
        question: 'What happens when you push a new commit to the main branch on a connected Vercel project?',
        options: [
          'Vercel automatically runs a production build and deploys it to the global edge network with zero downtime',
          'The server reboots and goes offline for 30 minutes',
          'You receive a phone call from GitHub',
          'All database records are deleted'
        ],
        correctIndex: 0,
        explanation: 'Modern Git-driven CI/CD automatically creates an immutable release preview and transitions production traffic with zero downtime.'
      },
      {
        id: 'q10-3',
        question: 'What is the primary benefit of immutable preview deployments for pull requests?',
        options: [
          'You can share a live working URL of new features for testing before merging to production',
          'It deletes old branches automatically',
          'It speeds up typing speed in VS Code',
          'It turns off dark mode'
        ],
        correctIndex: 0,
        explanation: 'Preview deployments give builders and stakeholders an exact live sandbox to test changes before merging to production.'
      }
    ]
  }
];

export const DOC_TEMPLATES: DocTemplate[] = [
  {
    id: '01-prd',
    num: '01',
    title: 'Product Requirements Document (PRD)',
    owner: 'Product',
    filename: '01-prd.md',
    purpose: 'Defines the core problem, user personas, MVP scope, non-goals, and success metrics.',
    keySections: ['Problem Statement', 'Target Users & JTBD', 'Scope v1 & Non-Goals', 'Functional Requirements', 'Success Metrics'],
    samplePrompt: 'Draft 01-prd.md for my app idea focusing on solving [core pain point] for [target audience] with a lean V1 scope.',
    contentTemplate: `# 01: Product Requirements Document (PRD)

## 1. Problem Statement
Who hurts, how often, and why current solutions fall short.

## 2. Target Users & Jobs To Be Done (JTBD)
- **Primary Persona:** Creator / Founder / Builder wanting to ship without coding.
- **Core Job:** "When I have a product idea, I want to describe it and get a working web app so that I can validate revenue immediately."

## 3. Scope V1 (Must Ship) vs Non-Goals
### In V1:
- Marketing landing page & pricing
- Google OAuth & Supabase Auth
- Stripe Checkout for 1 paid tier
- Core AI Agent loop with streaming response
- User dashboard with history

### Non-Goals for V1:
- Enterprise SSO / SAML
- Multi-language localization
- Complex third-party plugin marketplace

## 4. Functional Requirements (FR)
- **FR-01:** User can sign in with Google in under 15 seconds.
- **FR-02:** User can run the core agent tool and receive a streamed answer.
- **FR-03:** Stripe webhook automatically updates user entitlement to \`pro\`.

## 5. Success Metrics
- 70% activation rate on day 1.
- < 2 second time-to-first-token on streaming AI responses.`
  },
  {
    id: '02-product-specs',
    num: '02',
    title: 'Product & Non-Functional Specifications',
    owner: 'Engineering',
    filename: '02-product-specs.md',
    purpose: 'Binds numeric SLOs, API performance thresholds, uptime targets, and data classifications.',
    keySections: ['SLOs & Uptime', 'API Latency Targets', 'Data Classification', 'Error Budgets'],
    samplePrompt: 'Generate 02-product-specs.md establishing 99.9% uptime, <300ms p95 API response times, and PII data classifications.',
    contentTemplate: `# 02: Product & Non-Functional Specifications

## 1. Performance SLOs
- **Availability:** 99.9% monthly uptime.
- **API Response (p95):** < 300ms for edge routes, < 800ms for database origin.
- **Time to First Token (AI Stream):** < 1.5s p75.
- **Lighthouse Score:** ≥ 90 Performance, ≥ 95 Accessibility.

## 2. Data Classification & Privacy
- **Public:** Marketing copy, documentation, public templates.
- **Confidential:** User emails, project briefs, prompt history (Protected by RLS).
- **Restricted:** Stripe secret keys, Supabase service keys (Strictly backend env only).`
  },
  {
    id: '03-tech-stack',
    num: '03',
    title: 'Tech Stack Key Sheet',
    owner: 'Architecture',
    filename: '03-tech-stack-key-sheet.md',
    purpose: 'Official system of record for all chosen frameworks, libraries, APIs, and environment keys.',
    keySections: ['Core Stack', 'UI & Styling', 'AI Infrastructure', 'Environment Keys'],
    samplePrompt: 'Create 03-tech-stack-key-sheet.md mapping Next.js, Supabase, Tailwind, Stripe, and Vercel AI SDK.',
    contentTemplate: `# 03: Tech Stack Key Sheet

## 1. Core Architecture
- **Framework:** Next.js App Router (TypeScript)
- **Styling:** Tailwind CSS + Lucide Icons
- **Animation:** Motion (framer-motion) + GSAP for timeline pinning
- **Database & Auth:** Supabase (Postgres with RLS + GoTrue Auth)
- **Payments:** Stripe Billing & Checkout
- **AI Gateway:** Vercel AI SDK + Anthropic Claude 3.7 Sonnet / OpenAI GPT-4o
- **Deployment & Hosting:** Vercel Edge Platform

## 2. Environment Variables Specification
\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=secret-service-key-here
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
AI_GATEWAY_KEY=secret-ai-token
\`\`\``
  },
  {
    id: '04-system-architecture',
    num: '04',
    title: 'System Architecture & Request Flows',
    owner: 'Engineering',
    filename: '04-system-architecture.md',
    purpose: 'C4 component diagrams, logical layers, database schema ERDs, and request lifecycles.',
    keySections: ['Layered Topology', 'Database ERD', 'Request Flow Traces', 'Failure Modes'],
    samplePrompt: 'Produce 04-system-architecture.md with detailed request flow for paid agent execution.',
    contentTemplate: `# 04: System Architecture

## 1. Logical Architecture
\`\`\`
Browser (Client)
   │
   ▼
Edge / CDN (Vercel)
   │
   ▼
Next.js App Server (Server Actions / Route Handlers)
   ├── Auth Check (Supabase Auth Session)
   ├── Database (Supabase Postgres + RLS)
   ├── Storage (S3 / Blob)
   ├── Payments (Stripe API & Webhooks)
   └── AI Agent Harness (Vercel AI SDK -> Model Provider)
\`\`\`

## 2. Database Schema (Postgres)
- **profiles:** id (uuid PK references auth.users), email (text), full_name (text), plan (text), created_at
- **projects:** id (uuid PK), user_id (uuid FK), title (text), context (jsonb), created_at
- **messages:** id (uuid PK), project_id (uuid FK), role (text), content (text), tokens (int)`
  },
  {
    id: '05-information-architecture',
    num: '05',
    title: 'Information Architecture & Sitemap',
    owner: 'Design',
    filename: '05-information-architecture.md',
    purpose: 'Complete URL hierarchy, navigation taxonomy, and permission matrix.',
    keySections: ['Marketing Sitemap', 'Application Sitemap', 'Permission Matrix', '3-Click Rule'],
    samplePrompt: 'Draft 05-information-architecture.md with marketing routes, app routes, and role access control.',
    contentTemplate: `# 05: Information Architecture & Sitemap

## 1. Sitemap Hierarchy
- \`/\` - Marketing Landing Page (Public)
- \`/pricing\` - Plans, Feature Comparison, FAQ (Public)
- \`/login\` & \`/signup\` - Authentication Gate (Public)
- \`/dashboard\` - User Command Center (Auth Required)
- \`/dashboard/projects/[id]\` - Active Project Workspace (Auth Required)
- \`/dashboard/settings\` - Profile & Billing Management (Auth Required)

## 2. Permission Matrix
| Role | View Public | Access Dashboard | Run AI Agent | Manage Billing |
| --- | --- | --- | --- | --- |
| Visitor | Yes | No | No | No |
| Free Member | Yes | Yes | 5 queries/day | No |
| Pro Member | Yes | Yes | Unlimited | Yes |`
  },
  {
    id: '06-well-architected',
    num: '06',
    title: 'Well-Architected Review (AWS 6 Pillars)',
    owner: 'Engineering',
    filename: '06-well-architected.md',
    purpose: 'Audit against Operational Excellence, Security, Reliability, Performance, Cost, and Sustainability.',
    keySections: ['Security Pillar', 'Reliability Pillar', 'Cost Optimization', 'Operational Excellence'],
    samplePrompt: 'Review the application against the 6 Well-Architected pillars and document remediations.',
    contentTemplate: `# 06: Well-Architected Framework Review

## 1. Operational Excellence
- Infrastructure as Code (IaC) with automated Vercel & Supabase migrations.
- Structured logging with Sentry error tracking and OpenTelemetry metrics.

## 2. Security Pillar
- Row-Level Security enabled on 100% of Postgres tables.
- Zero client-side secret leakage; automated GitHub Secret Scanning enabled.
- Webhook signature validation on all incoming Stripe events.

## 3. Reliability Pillar
- Automated health checks on \`/api/health\`.
- Circuit breakers and fallback model routing on AI provider 429 rate limits.`
  },
  {
    id: '07-sdlc-checklist',
    num: '07',
    title: 'SDLC & Quality Gate Checklist',
    owner: 'QA / Eng',
    filename: '07-sdlc-checklist.md',
    purpose: 'Quality gates for every stage from planning to deployment and rollback.',
    keySections: ['Planning Gate', 'Build Gate', 'Security Gate', 'Rollback Runbook'],
    samplePrompt: 'Create 07-sdlc-checklist.md with strict definition of done for feature branches.',
    contentTemplate: `# 07: SDLC & Quality Gate Checklist

## 1. Code Quality Gates
- [ ] TypeScript compilation passes with zero errors (\`tsc --noEmit\`).
- [ ] ESLint passes with zero warnings.
- [ ] Mobile responsive check verified at 375px, 768px, and 1440px.

## 2. Security Gates
- [ ] RLS policies verified: user A cannot query user B's records.
- [ ] All forms validate inputs with Zod schemas.
- [ ] No API keys in client-side code bundles.`
  },
  {
    id: '08-roadmap',
    num: '08',
    title: 'Product Roadmap (Now / Next / Later)',
    owner: 'Product',
    filename: '08-roadmap.md',
    purpose: 'Sequenced feature releases mapped to customer traction and scale stages.',
    keySections: ['Now (V1 MVP)', 'Next (V1.1 Growth)', 'Later (V2 Scale)'],
    samplePrompt: 'Generate 08-roadmap.md with Now/Next/Later horizons for our vibe coding app.',
    contentTemplate: `# 08: Product Roadmap

## Horizon 1: Now (V1 MVP - Days 1-7)
- Core landing page, interactive curriculum, and capstone project hub.
- Google OAuth, Supabase database, and Stripe payment integration.
- AI Agent harness with prompt playground and token calculator.

## Horizon 2: Next (V1.1 - Month 1)
- Live cohort community forums and peer review rooms.
- Voice agent interactive tutor integration (ElevenLabs).
- Team workspace invites and multi-seat billing.

## Horizon 3: Later (V2 - Quarter 2)
- Autonomous multi-agent review teams with GitHub PR bot integration.
- Custom enterprise LMS integrations (Canvas, Blackboard).`
  },
  {
    id: '09-brand-guidelines',
    num: '09',
    title: 'Brand Guidelines & Tone of Voice',
    owner: 'Design / Brand',
    filename: '09-brand-guidelines.md',
    purpose: 'Brand personality, typography rules, color palettes, and tone of voice.',
    keySections: ['Brand Identity', 'Color Tokens', 'Typography Hierarchy', 'Tone of Voice'],
    samplePrompt: 'Write 09-brand-guidelines.md for LetsVibeAI: confident, empowering, architecturally sound.',
    contentTemplate: `# 09: Brand Guidelines & Tone of Voice

## 1. Brand Mission
"Democratizing software creation through architecture-first AI direction."

## 2. Color System
- **Obsidian Dark (Base):** \`#090a0f\` (Background), \`#12151f\` (Surfaces)
- **Luminous Emerald (Primary Accent):** \`#10b981\` (Success, CTAs, Direction)
- **Electric Cyan (Secondary Accent):** \`#06b6d4\` (AI, Data Flow, Intelligence)
- **Border Neutral:** \`rgba(255, 255, 255, 0.08)\`

## 3. Tone of Voice
- **Authoritative yet Accessible:** Clear, empowering, analogies over jargon.
- **No Fluff:** Direct, actionable prompts and concrete architecture.`
  },
  {
    id: '10-design-specs',
    num: '10',
    title: 'Design Specifications & UI Tokens',
    owner: 'Design',
    filename: '10-design-specs.md',
    purpose: 'Exact CSS tokens, spacing scales, button states, and animation spring configs.',
    keySections: ['Spacing Scale', 'Button System', 'Animation Spring Physics', 'Accessibility WCAG'],
    samplePrompt: 'Draft 10-design-specs.md following design-taste-frontend anti-slop guidelines.',
    contentTemplate: `# 10: Design Specifications & UI Tokens

## 1. Button System
- **Primary CTA:** \`bg-emerald-500 text-black font-bold px-6 py-3 rounded-full hover:bg-emerald-400 active:scale-[0.98] transition-all\`
- **Secondary Ghost:** \`border border-zinc-700 bg-zinc-900/60 text-white hover:bg-zinc-800 rounded-full px-6 py-3\`

## 2. Motion Tokens (Spring Physics)
- **Standard Spring:** \`{ type: "spring", stiffness: 100, damping: 20 }\`
- **Snappy Hover:** \`{ duration: 0.2, ease: "easeOut" }\`
- **Reduced Motion:** Honor \`prefers-reduced-motion\` by degrading to instant opacity.`
  },
  {
    id: '11-gtm-plan',
    num: '11',
    title: 'Go-To-Market & Launch Strategy',
    owner: 'Marketing / Growth',
    filename: '11-gtm-plan.md',
    purpose: 'Audience acquisition, launch channels, pricing strategy, and referral loops.',
    keySections: ['Launch Channels', 'Pricing Strategy', 'Growth Loops', 'Conversion Funnel'],
    samplePrompt: 'Create 11-gtm-plan.md detailing ProductHunt, X/Twitter, and YouTube launch strategy.',
    contentTemplate: `# 11: Go-To-Market & Launch Plan

## 1. Launch Channels
- **X / Twitter & LinkedIn:** Video teaser demo showing architecture-to-code in 60 seconds.
- **ProductHunt & Hacker News:** Launch day campaign emphasizing "Architecture First Vibe Coding".
- **YouTube & TikTok:** 5-minute video tutorials building real SaaS apps without coding.

## 2. Pricing & Conversion
- **Self-Paced Starter:** $0 (Modules 1-3 Free, prompts, and architecture map).
- **Master Builder Pro:** $149 lifetime (All 10 modules, capstone rubric, certificate, templates).
- **Live 6-Week Cohort:** $499 (Live weekly review calls, 1-on-1 capstone grading).`
  }
];

export const CAPSTONE_DELIVERABLES: CapstoneDeliverable[] = [
  {
    id: 'cap-1',
    moduleRef: 'Module 6 & 8',
    title: '/context Pack & All 11 Planning Docs',
    description: 'Complete project brief, architecture specs, PRD, and tech stack sheets saved in /docs.',
    points: 20
  },
  {
    id: 'cap-2',
    moduleRef: 'Module 4 & 5',
    title: '11 Building Blocks Architecture Map',
    description: 'Every block mapped to an exact tool with clear request flow and security boundaries.',
    points: 25
  },
  {
    id: 'cap-3',
    moduleRef: 'Module 7',
    title: 'Autonomous Agent with Skill & Tool',
    description: 'One working agent with AGENTS.md instructions, at least 1 typed tool, and 1 custom skill.',
    points: 15
  },
  {
    id: 'cap-4',
    moduleRef: 'Module 9',
    title: 'End-to-End Working App (Auth + DB + Stripe)',
    description: 'Live sign-in, database storage, paid entitlement gate, and AI agent execution.',
    points: 30
  },
  {
    id: 'cap-5',
    moduleRef: 'Module 10',
    title: 'Clean GitHub Repo & 5-Min Video Demo',
    description: 'Clean commit history, public GitHub repository, and video demo explaining the architecture.',
    points: 10
  }
];

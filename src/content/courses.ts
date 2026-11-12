// ─────────────────────────────────────────────────────────────
// Course catalog. Lesson text lives in src/content/courses/<slug>/*.md
// and is ordered by the number prefix (01-, 02-, …).
// ─────────────────────────────────────────────────────────────

export interface Course {
  slug: string;
  title: string;
  heroTitle: string;
  summary: string;
  image: string;
  video?: string;
  videoPoster?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  unit: string; // what a lesson is called: Module, Day, Lab
  featured: boolean;
  intro: { heading: string; body: string };
  approach: string[];
  helpsWith: string[];
  benefits: string[];
  whoFor: string;
  closing: string;
  projectLinks?: { label: string; url: string }[];
}

export const courses: Course[] = [
  {
    slug: 'vibe-coding',
    title: 'Vibe Coding: Idea to Shipped App',
    heroTitle: 'Vibe Coding 101: Idea to Shipped App',
    summary: 'The flagship architecture-first course: learn how modern software fits together, direct AI agents with precision, and ship real production products.',
    image: '/images/course-foundations.jpg',
    video: '/videos/mastered/01-what-is-vibe-coding-master.mp4',
    videoPoster: '/images/course-vibe-coding-poster.jpg',
    level: 'Beginner',
    duration: '10 Modules (22 min video + labs)',
    unit: 'Module',
    featured: true,
    intro: {
      heading: "You Don't Need to Learn to Code — You Need to Learn How Software Fits Together",
      body: 'Traditional courses teach syntax. This one teaches you to be the film director, not the camera operator: describe the system, give AI the architecture, and review what it builds. Ten modules take you from your first idea to a deployed, revenue-ready web app.',
    },
    approach: [
      'Plain-English lessons with a real-world analogy for every idea.',
      'A copy-paste prompt in every module that produces a real document.',
      'A hands-on exercise and a 3-question knowledge check per module.',
      'The 11 building blocks and 11-document planning stack as your map.',
      'A capstone project graded on a clear 100-point rubric.',
    ],
    helpsWith: [
      'Turning a vague idea into a buildable spec.',
      'Understanding front end, back end, auth, data and payments.',
      'Choosing tools and talking to AI agents with precision.',
      'Shipping safely with a pre-launch checklist.',
    ],
    benefits: [
      'Fewer "the AI broke it" moments — direction beats guessing.',
      'A full planning stack you can reuse on every future project.',
      'A deployed capstone app and a public GitHub repo.',
      'The vocabulary to work with developers, vendors and agents.',
    ],
    whoFor: 'Founders, operators, marketers, creators, educators and career changers who want to build real software with AI — without a computer-science background.',
    closing: 'Every app has an architecture. Learn it once and every AI tool gets easier. Start Module 1 today — it is 100% free.',
    projectLinks: [
      { label: 'GitHub Repository', url: 'https://github.com/diamitani/letsvibeai' },
      { label: 'Starter Blueprint', url: 'https://github.com/diamitani/letsvibeai/tree/main/modules' },
    ]
  },
  {
    slug: 'zero-to-ship',
    title: 'Ship It: Zero to Production on Every Platform',
    heroTitle: 'Ship It: Zero to Production in 10 Days',
    summary: 'Ten daily hands-on sprints: Lovable, Bolt, Cursor, Windsurf, Supabase, Vercel, Stripe and custom domains.',
    image: '/images/course-zero-to-ship.jpg',
    video: '/videos/mastered/10-ship-it-master.mp4',
    videoPoster: '/images/course-zero-to-ship-poster.jpg',
    level: 'Beginner',
    duration: '10 Days (~3.5 hours)',
    unit: 'Day',
    featured: true,
    intro: {
      heading: 'Your First Real AI Builds, One Day at a Time',
      body: 'Zero to Ship is a 10-day sprint where every lesson builds on the last. You start with scaffolding and finish with your own live app on your custom domain with payments and authentication.',
    },
    approach: [
      'Short daily lessons you can finish in 15–25 minutes.',
      'Chain Prompting: big builds broken into small, simple prompts.',
      'Project-based — almost every day produces something you can deploy.',
      'Real tools: Lovable, Bolt, Cursor, Supabase, Vercel, and Stripe.',
    ],
    helpsWith: [
      'Scaffolding full-stack apps in minutes.',
      'Configuring Supabase Postgres and Row Level Security.',
      'Integrating Stripe Checkout sessions and verified webhooks.',
      'Connecting custom domains and SSL on Vercel.',
    ],
    benefits: [
      'Confidence using AI for real production software.',
      'A portfolio of working projects deployed in ten days.',
      'A repeatable deployment method for any future build.',
    ],
    whoFor: 'Anyone curious — or a little intimidated — by AI who wants quick, practical wins before going deeper.',
    closing: 'Ten days from now you can be the person on your team who ships with AI. Start Day 1 today.',
    projectLinks: [
      { label: 'Lovable Starter', url: 'https://lovable.dev' },
      { label: 'Vercel Deploy Guide', url: 'https://vercel.com' },
    ]
  },
  {
    slug: 'frontier-platforms',
    title: 'Frontier Agent Platforms: Codex, Hermes & OpenClaw',
    heroTitle: 'Frontier Multi-Agent Platforms & Harnesses',
    summary: 'Master OpenAI Codex, Nous Hermes on Bedrock, OpenClaw swarms, and Claude Code terminal agents with strict verification gates.',
    image: '/images/course-foundations.jpg',
    video: '/videos/mastered/07-agents-master.mp4',
    videoPoster: '/images/course-frontier-platforms-poster.jpg',
    level: 'Intermediate',
    duration: '5 Modules (~5 hours)',
    unit: 'Module',
    featured: true,
    intro: {
      heading: 'Beyond Single Prompts: Directing Frontier Autonomous Agent Swarms',
      body: 'The frontier of AI coding is multi-agent orchestration. Learn how OpenAI Codex ASTs, Nous Hermes function-calling models, OpenClaw DAG swarms, and Claude Code CLI coordinate together to build enterprise systems.',
    },
    approach: [
      'Architectural breakdowns of frontier harnesses (Codex, Hermes, OpenClaw, Claude Code).',
      'Model Context Protocol (MCP) tool integration and security scoping.',
      'Middle-Out DAG wave scheduling for parallel subagents.',
      'The One Must Act (W = 1.00) verification theorem.',
    ],
    helpsWith: [
      'Running sovereign open-weights agents with Nous Hermes.',
      'Configuring terminal agents with persistent CLAUDE.md memory.',
      'Preventing hallucinations and token budget exhaustion.',
      'Implementing automated QA testing subagents.',
    ],
    benefits: [
      'Mastery of every major frontier agent platform, not just one vendor.',
      'Ability to build complex autonomous coding swarms.',
      'Strict quality gates that guarantee zero-regression builds.',
    ],
    whoFor: 'Technical founders, senior developers, and ambitious AI directors ready to orchestrate autonomous multi-agent engineering teams.',
    closing: 'Move from prompt guessing to verified autonomous execution. Start Module 1 today.',
    projectLinks: [
      { label: 'OpenClaw Repository', url: 'https://github.com' },
      { label: 'Hermes Agent Docs', url: 'https://nousresearch.com' },
    ]
  },
  {
    slug: 'lovable-fullstack',
    title: 'Full-Stack Vibe Coding with Lovable & Bolt',
    heroTitle: 'Prompt to Full-Stack Web App with Lovable',
    summary: 'Instant web application prototyping, Supabase schema sync, Edge Functions, GitHub two-way sync, and production polish.',
    image: '/images/course-zero-to-ship.jpg',
    video: '/videos/mastered/04-web-app-architecture-master.mp4',
    videoPoster: '/images/course-lovable-fullstack-poster.jpg',
    level: 'Beginner',
    duration: '5 Modules (~4 hours)',
    unit: 'Module',
    featured: true,
    intro: {
      heading: 'Zero Syntax, Full Power: The New Way to Build Web Apps',
      body: 'Tools like Lovable and Bolt let you describe complex relational web applications and watch them compile in real-time. Learn how to steer these visual tools with precision, connect relational databases, and export to GitHub for pro developer polish.',
    },
    approach: [
      'Prompt patterns that generate clean component hierarchies.',
      'Connecting Lovable to Supabase with automatic table migration.',
      'Pairing Lovable with Cursor Composer for surgical code edits.',
      'One-click deploys to custom domains with full SSL.',
    ],
    helpsWith: [
      'Building responsive SaaS MVPs in hours instead of months.',
      'Avoiding frontend spaghetti code with structured design tokens.',
      'Wiring real relational tables with foreign keys and RLS.',
    ],
    benefits: [
      'Ship client projects 10x faster with zero boilerplate.',
      'Professional two-way GitHub repository synchronization.',
      'Clean handoffs between visual designers and developers.',
    ],
    whoFor: 'Product designers, indie hackers, agency builders, and entrepreneurs launching commercial web apps.',
    closing: 'Build your next full-stack application before the weekend is over.',
    projectLinks: [
      { label: 'Lovable Platform', url: 'https://lovable.dev' },
      { label: 'Supabase Database', url: 'https://supabase.com' },
    ]
  },
  {
    slug: 'claude-coworker',
    title: 'Claude as Coworker: Skills, MCP & Governance',
    heroTitle: 'Claude as Coworker & Enterprise Skills Suite',
    summary: 'Leverage Claude Projects, interactive Artifacts, Model Context Protocol (MCP), custom skills packaging, and team governance.',
    image: '/images/course-project-labs.jpg',
    video: '/videos/mastered/08-the-document-stack-master.mp4',
    videoPoster: '/images/course-claude-mastery-poster.jpg',
    level: 'Intermediate',
    duration: '5 Modules (~6 hours)',
    unit: 'Module',
    featured: true,
    intro: {
      heading: 'Transform Claude into Your Long-Term Operating Partner',
      body: 'Claude is more than a chatbot — when configured with Projects, Artifacts, MCP connectors, and reusable SKILL.md packages, it becomes an autonomous coworker that remembers your architecture, writes tested code, and enforces team standards.',
    },
    approach: [
      'Project-level context engineering and instruction tuning.',
      'Interactive prototype generation with Claude Artifacts.',
      'Authoring production SKILL.md packages for reusable tasks.',
      'Model Context Protocol integration with enterprise systems.',
    ],
    helpsWith: [
      'Building team-wide AI skills libraries.',
      'Automating repetitive pull request reviews and documentation.',
      'Enforcing privacy and credential security guardrails.',
    ],
    benefits: [
      'Zero prompt repetition across team members.',
      'Permanent institutional agent memory that survives chat resets.',
      'High-trust AI execution in enterprise environments.',
    ],
    whoFor: 'Engineering leads, technical project managers, and power users building organizational AI capability.',
    closing: 'Turn individual AI use into an organizational superpower. Start Module 1 today.',
    projectLinks: [
      { label: 'Anthropic MCP Guide', url: 'https://modelcontextprotocol.io' },
      { label: 'Skills Catalog', url: 'https://github.com/diamitani/letsvibeai' },
    ]
  },
  {
    slug: 'project-labs',
    title: 'Vibe Coding Project Labs',
    heroTitle: 'Three Hands-On Project Labs',
    summary: 'Build and deploy a marketing site, an e-commerce store, a directory marketplace, and an AI SaaS — portfolio-ready.',
    image: '/images/course-project-labs.jpg',
    video: '/videos/mastered/09-the-build-process-master.mp4',
    videoPoster: '/images/course-project-labs-poster.jpg',
    level: 'Intermediate',
    duration: '3 Labs (~17 hours)',
    unit: 'Lab',
    featured: true,
    intro: {
      heading: 'Turn What You Know Into Shipped Products',
      body: 'Each lab is a complete build with steps, stretch goals and assessment criteria. You finish each one with a live URL you can show clients, employers or investors.',
    },
    approach: [
      'Step-by-step build plans with time estimates.',
      'Hosted builders like Lovable, v0 and Bolt.',
      'Stretch goals for when you want more.',
      'Clear criteria so you know when it is done.',
    ],
    helpsWith: [
      'Scaffolding multi-page sites from a single prompt.',
      'Adding carts, checkout and authentication.',
      'Designing a database and a search experience.',
    ],
    benefits: [
      'Three portfolio projects you can demo.',
      'Experience with real-world app features.',
      'Confidence to take on client or side-project work.',
    ],
    whoFor: 'Learners who have finished Vibe Coding or Zero to Ship and want bigger, more realistic projects.',
    closing: 'The best way to learn is to ship. Pick a lab and start building.',
    projectLinks: [
      { label: 'Marketing Site Lab', url: '#labs' },
      { label: 'E-Commerce Lab', url: '#labs' },
      { label: 'Directory Lab', url: '#labs' }
    ]
  },
  {
    slug: 'gtm-automation',
    title: 'Autonomous GTM & Sales Automation Engine',
    heroTitle: 'AI Automation for Sales & Marketing',
    summary: 'Build 10 production revenue workflows: cold outreach, CRM hygiene, DNS deliverability, and revops dashboards.',
    image: '/images/course-gtm-automation.jpg',
    video: '/videos/mastered/11-capstone-master.mp4',
    videoPoster: '/images/course-gtm-automation-poster.jpg',
    level: 'Intermediate',
    duration: '10 Workflows (~6 hours)',
    unit: 'Lab',
    featured: false,
    intro: {
      heading: 'Put AI to Work on Pipeline',
      body: 'GTM engineering is building AI and automation for sales and marketing. These labs walk you through systems used by modern revenue teams — built with Make.com, n8n, Google Sheets and AI.',
    },
    approach: [
      'Real workflows from working high-scale GTM teams.',
      'DNS and email deliverability best practices built in.',
      'Verification steps so no outreach fires unchecked.',
    ],
    helpsWith: [
      'Automated personalized email outreach pipelines.',
      'AI-assisted LinkedIn content scheduling and engagement.',
      'Firmographic enrichment and pre-call intelligence briefs.',
    ],
    benefits: [
      'Hours saved every week on manual outreach.',
      'More personal messages at higher volume.',
      'A skill set high-growth tech companies are actively hiring for.',
    ],
    whoFor: 'Sales reps, marketers, founders and RevOps teams who want to automate prospecting and content.',
    closing: 'Automate the busywork and spend your time on conversations that close.',
    projectLinks: [
      { label: 'GTM Workflow Templates', url: 'https://github.com/diamitani/letsvibeai' },
      { label: 'Make.com Blueprints', url: 'https://make.com' }
    ]
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

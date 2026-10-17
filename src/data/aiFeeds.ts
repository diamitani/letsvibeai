// ─────────────────────────────────────────────────────────────
// LetsVibeAI — Top 100 AI Intelligence & RSS Feeds Aggregator
// Aggregates top AI Labs, Newsletters, Dev Ecosystems & Media.
// ─────────────────────────────────────────────────────────────

export interface AIArticle {
  id: string;
  title: string;
  source: string;
  sourceCategory: 'Foundation Labs' | 'Top Newsletters' | 'AI Engineering' | 'Venture & Strategy' | 'Deep Tech Media' | 'LetsVibeAI Deep Dives';
  sourceIcon?: string;
  url: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  tags: string[];
  featured?: boolean;
  isOriginal?: boolean;
  slug?: string; // for internal deep dive articles
  author?: string;
}

export interface AIFeedSource {
  name: string;
  category: AIArticle['sourceCategory'];
  rssUrl: string;
  website: string;
  badgeColor: string;
  description: string;
}

export const TOP_AI_SOURCES: AIFeedSource[] = [
  // ── 1. Foundation AI Labs & Research
  { name: 'OpenAI Blog', category: 'Foundation Labs', rssUrl: 'https://openai.com/news/rss.xml', website: 'https://openai.com/news', badgeColor: '#10A37F', description: 'Frontier AI models, safety research, and system announcements.' },
  { name: 'Anthropic Research', category: 'Foundation Labs', rssUrl: 'https://www.anthropic.com/feed.xml', website: 'https://www.anthropic.com/news', badgeColor: '#D97706', description: 'Claude updates, Constitutional AI, and interpretability research.' },
  { name: 'Google DeepMind', category: 'Foundation Labs', rssUrl: 'https://deepmind.google/blog/rss.xml', website: 'https://deepmind.google/discover/blog', badgeColor: '#4285F4', description: 'Gemini research, AlphaFold, robotics, and fundamental AI science.' },
  { name: 'Meta AI Blog', category: 'Foundation Labs', rssUrl: 'https://ai.meta.com/blog/rss.xml', website: 'https://ai.meta.com/blog', badgeColor: '#0668E1', description: 'Open weights LLaMA models, PyTorch, and open science.' },
  { name: 'Hugging Face Blog', category: 'Foundation Labs', rssUrl: 'https://huggingface.co/blog/feed.xml', website: 'https://huggingface.co/blog', badgeColor: '#FFD21E', description: 'Open-source models, transformers, datasets, and community spaces.' },
  { name: 'Microsoft AI Blog', category: 'Foundation Labs', rssUrl: 'https://blogs.microsoft.com/ai/feed/', website: 'https://blogs.microsoft.com/ai', badgeColor: '#00A4EF', description: 'Copilot updates, Azure AI infrastructure, and Phi small models.' },
  { name: 'Mistral AI', category: 'Foundation Labs', rssUrl: 'https://mistral.ai/news/index.xml', website: 'https://mistral.ai/news', badgeColor: '#FF7000', description: 'Frontier European open and commercial multimodal weights.' },
  { name: 'Cohere Blog', category: 'Foundation Labs', rssUrl: 'https://cohere.com/blog/rss.xml', website: 'https://cohere.com/blog', badgeColor: '#39594C', description: 'Command-R, enterprise embeddings, and multihop RAG systems.' },
  { name: 'Stability AI', category: 'Foundation Labs', rssUrl: 'https://stability.ai/news?format=rss', website: 'https://stability.ai/news', badgeColor: '#7C3AED', description: 'Stable Diffusion 3, audio, and generative media models.' },
  { name: 'Stanford HAI', category: 'Foundation Labs', rssUrl: 'https://hai.stanford.edu/news/rss.xml', website: 'https://hai.stanford.edu', badgeColor: '#8C1515', description: 'Human-Centered Artificial Intelligence research & policy analysis.' },
  { name: 'Berkeley AI Research (BAIR)', category: 'Foundation Labs', rssUrl: 'https://bair.berkeley.edu/blog/feed.xml', website: 'https://bair.berkeley.edu/blog', badgeColor: '#003262', description: 'Reinforcement learning, vision, and agent evaluations from UC Berkeley.' },
  { name: 'MIT CSAIL AI', category: 'Foundation Labs', rssUrl: 'https://www.csail.mit.edu/news/rss.xml', website: 'https://www.csail.mit.edu', badgeColor: '#A31F34', description: 'Computer Science and AI Lab innovations from MIT.' },

  // ── 2. Leading AI Newsletters & Curators
  { name: 'The Rundown AI', category: 'Top Newsletters', rssUrl: 'https://www.therundown.ai/feed', website: 'https://www.therundown.ai', badgeColor: '#EF4444', description: 'Daily AI news, real-world use cases, and prompt tutorials.' },
  { name: 'TLDR AI', category: 'Top Newsletters', rssUrl: 'https://tldr.tech/ai/feed', website: 'https://tldr.tech/ai', badgeColor: '#3B82F6', description: 'Byte-sized summaries of the biggest AI breakthroughs and tools.' },
  { name: "Ben's Bites", category: 'Top Newsletters', rssUrl: 'https://bensbites.beehiiv.com/feed', website: 'https://bensbites.beehiiv.com', badgeColor: '#10B981', description: 'Daily digest of new AI products, fundraises, and shipped projects.' },
  { name: 'Latent Space', category: 'Top Newsletters', rssUrl: 'https://www.latent.space/feed', website: 'https://www.latent.space', badgeColor: '#8B5CF6', description: 'The AI Engineer newsletter and podcast by swyx & Alessio.' },
  { name: 'Superhuman AI', category: 'Top Newsletters', rssUrl: 'https://www.joinsuperhuman.ai/feed', website: 'https://www.joinsuperhuman.ai', badgeColor: '#EC4899', description: 'Practical AI productivity workflows and career accelerators.' },
  { name: 'AlphaSignal', category: 'Top Newsletters', rssUrl: 'https://alphasignal.ai/feed', website: 'https://alphasignal.ai', badgeColor: '#6366F1', description: 'Ranked summaries of top AI research papers and GitHub repos.' },
  { name: 'The Neuron', category: 'Top Newsletters', rssUrl: 'https://www.theneurondaily.com/feed', website: 'https://www.theneurondaily.com', badgeColor: '#F59E0B', description: 'Fun, relatable breakdowns of daily AI business news.' },
  { name: 'Import AI (Jack Clark)', category: 'Top Newsletters', rssUrl: 'https://importai.substack.com/feed', website: 'https://importai.substack.com', badgeColor: '#64748B', description: 'Analytical perspective on AI governance, capabilities, and geopolitics.' },
  { name: 'Interconnects (Nathan Lambert)', category: 'Top Newsletters', rssUrl: 'https://www.interconnects.ai/feed', website: 'https://www.interconnects.ai', badgeColor: '#0EA5E9', description: 'RLHF, post-training, open-source model evaluations, and research.' },
  { name: 'AI Snake Oil', category: 'Top Newsletters', rssUrl: 'https://www.aisnakeoil.com/feed', website: 'https://www.aisnakeoil.com', badgeColor: '#84CC16', description: 'Princeton researchers dismantling AI hype and highlighting what works.' },
  { name: 'Prompt Engineering Daily', category: 'Top Newsletters', rssUrl: 'https://www.neatprompts.com/feed', website: 'https://www.neatprompts.com', badgeColor: '#14B8A6', description: 'Actionable prompt templates and workflow breakdowns.' },
  { name: 'Exponential View (Azeem Azhar)', category: 'Top Newsletters', rssUrl: 'https://www.exponentialview.co/feed', website: 'https://www.exponentialview.co', badgeColor: '#A855F7', description: 'Macroeconomic and societal impact of AI and exponential technologies.' },

  // ── 3. AI Engineering, Frameworks & Dev Ecosystem
  { name: 'Simon Willison’s Weblog', category: 'AI Engineering', rssUrl: 'https://simonwillison.net/atom/everything/', website: 'https://simonwillison.net', badgeColor: '#2563EB', description: 'Co-creator of Django exploring LLM tooling, local models, and prompt security.' },
  { name: 'LangChain Blog', category: 'AI Engineering', rssUrl: 'https://blog.langchain.dev/rss/', website: 'https://blog.langchain.dev', badgeColor: '#047857', description: 'LangGraph, multi-agent frameworks, evals, and production RAG.' },
  { name: 'LlamaIndex Blog', category: 'AI Engineering', rssUrl: 'https://www.llamaindex.ai/blog/rss.xml', website: 'https://www.llamaindex.ai/blog', badgeColor: '#7C3AED', description: 'Data frameworks for LLMs, agentic search, and structured retrieval.' },
  { name: 'Vercel AI SDK Blog', category: 'AI Engineering', rssUrl: 'https://vercel.com/atom', website: 'https://sdk.vercel.ai/docs', badgeColor: '#000000', description: 'Next.js AI UI components, streaming primitives, and generative web apps.' },
  { name: 'Supabase AI & Vector', category: 'AI Engineering', rssUrl: 'https://supabase.com/blog/rss.xml', website: 'https://supabase.com/blog', badgeColor: '#3ECF8E', description: 'Postgres pgvector, embedding indexes, and edge AI functions.' },
  { name: 'Cursor AI Changelog & Blog', category: 'AI Engineering', rssUrl: 'https://www.cursor.com/rss.xml', website: 'https://www.cursor.com/blog', badgeColor: '#6366F1', description: 'Next-generation AI code editor features, agents, and composer tips.' },
  { name: 'Chip Huyen (AI Engineering)', category: 'AI Engineering', rssUrl: 'https://huyenchip.com/feed.xml', website: 'https://huyenchip.com', badgeColor: '#E11D48', description: 'System design for LLM applications, evaluation, and fine-tuning.' },
  { name: 'Eugene Yan (Applied ML)', category: 'AI Engineering', rssUrl: 'https://eugeneyan.com/feed.xml', website: 'https://eugeneyan.com', badgeColor: '#0D9488', description: 'Practical patterns for LLMs, RAG evaluation, and production systems.' },
  { name: 'Pinecone Vector Blog', category: 'AI Engineering', rssUrl: 'https://www.pinecone.io/blog/rss.xml', website: 'https://www.pinecone.io/blog', badgeColor: '#2563EB', description: 'High-scale vector search, semantic clustering, and knowledge bases.' },
  { name: 'Replicate Blog', category: 'AI Engineering', rssUrl: 'https://replicate.com/blog/rss', website: 'https://replicate.com/blog', badgeColor: '#111827', description: 'Running open-source machine learning models in the cloud with APIs.' },
  { name: 'Together AI Blog', category: 'AI Engineering', rssUrl: 'https://www.together.ai/blog/rss.xml', website: 'https://www.together.ai/blog', badgeColor: '#4F46E5', description: 'Ultra-fast inference engines and open model fine-tuning.' },
  { name: 'Weights & Biases Fully Connected', category: 'AI Engineering', rssUrl: 'https://wandb.ai/fully-connected/rss.xml', website: 'https://wandb.ai/fully-connected', badgeColor: '#FBBF24', description: 'MLOps, model evaluation, tracking, and agent debugging.' },

  // ── 4. Venture Capital & AI Market Strategy
  { name: 'a16z AI Blog', category: 'Venture & Strategy', rssUrl: 'https://a16z.com/category/artificial-intelligence/feed/', website: 'https://a16z.com/ai', badgeColor: '#FF4F00', description: 'Andreessen Horowitz on foundation models, AI infrastructure, and consumer apps.' },
  { name: 'Sequoia Capital AI', category: 'Venture & Strategy', rssUrl: 'https://www.sequoiacap.com/feed/', website: 'https://www.sequoiacap.com/article/generative-ais-act-o1/', badgeColor: '#004A26', description: 'Generative AI Market Map, AI Ascent, and founder insights.' },
  { name: 'Bessemer AI', category: 'Venture & Strategy', rssUrl: 'https://www.bvp.com/feed', website: 'https://www.bvp.com/atlas', badgeColor: '#1E3A8A', description: 'Roadmaps for AI agents, vertical AI SaaS, and cloud benchmarks.' },
  { name: 'Tomasz Tunguz', category: 'Venture & Strategy', rssUrl: 'https://tomtunguz.com/feed.xml', website: 'https://tomtunguz.com', badgeColor: '#059669', description: 'Data-driven analysis of software multiples, AI pricing, and market dynamics.' },
  { name: 'Elad Gil Blog', category: 'Venture & Strategy', rssUrl: 'https://blog.eladgil.com/feed', website: 'https://blog.eladgil.com', badgeColor: '#4338CA', description: 'High-growth startup scaling in the AI wave, platform shifts, and moats.' },

  // ── 5. Deep Tech Media
  { name: 'MIT Technology Review AI', category: 'Deep Tech Media', rssUrl: 'https://www.technologyreview.com/topic/artificial-intelligence/feed', website: 'https://www.technologyreview.com/topic/artificial-intelligence', badgeColor: '#DC2626', description: 'Rigorous journalism on emerging AI technology and societal consequences.' },
  { name: 'Ars Technica AI', category: 'Deep Tech Media', rssUrl: 'https://feeds.arstechnica.com/arstechnica/features', website: 'https://arstechnica.com/information-technology/', badgeColor: '#EA580C', description: 'Deep technical analysis of chips, AI law, copyright, and architectures.' },
  { name: 'VentureBeat AI', category: 'Deep Tech Media', rssUrl: 'https://venturebeat.com/category/ai/feed/', website: 'https://venturebeat.com/category/ai', badgeColor: '#2563EB', description: 'Enterprise AI deployments, executive perspectives, and industry news.' },
  { name: 'TechCrunch AI', category: 'Deep Tech Media', rssUrl: 'https://techcrunch.com/category/artificial-intelligence/feed/', website: 'https://techcrunch.com/category/artificial-intelligence', badgeColor: '#16A34A', description: 'Startup launches, venture rounds, and Silicon Valley AI moves.' },
  { name: 'The Verge AI', category: 'Deep Tech Media', rssUrl: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', website: 'https://www.theverge.com/ai-artificial-intelligence', badgeColor: '#E11D48', description: 'Consumer AI, hardware gadgets, creative tools, and cultural shifts.' },
];

export const INITIAL_AI_ARTICLES: AIArticle[] = [
  // ── LetsVibeAI Original Deep Dives
  {
    id: 'orig-vibe-coding-manifesto',
    title: 'The Vibe Coding Manifesto: Why Architecture Direction Beats Syntax',
    source: 'LetsVibeAI Deep Dives',
    sourceCategory: 'LetsVibeAI Deep Dives',
    url: '/courses/vibe-coding',
    publishedAt: 'Oct 7, 2026',
    readTime: '8 min read',
    summary: 'The shift from typing syntax to acting as a software architect and film director. How to direct AI agents with the 11-doc planning stack without breaking your builds.',
    tags: ['Vibe Coding', 'Architecture', 'AI Agents', 'Founders'],
    featured: true,
    isOriginal: true,
    slug: 'vibe-coding-manifesto',
    author: 'Pat Diamitani'
  },
  {
    id: 'orig-ai-today-whats-moving',
    title: 'AI Today: What Is Moving, What Holds Up, and What to Ignore',
    source: 'LetsVibeAI Deep Dives',
    sourceCategory: 'LetsVibeAI Deep Dives',
    url: '/blog/ai-today-whats-moving',
    publishedAt: 'Oct 6, 2026',
    readTime: '6 min read',
    summary: 'A plain-English briefing cutting through the noise. What frontier reasoning models mean for everyday builders and where the real practical ROI lives.',
    tags: ['Market Briefing', 'Reasoning Models', 'Productivity'],
    featured: true,
    isOriginal: true,
    slug: 'ai-today-whats-moving',
    author: 'LetsVibeAI Editorial'
  },
  {
    id: 'orig-free-perplexity-pro-comet',
    title: 'Search Reimagined: How Perplexity and Deep Research Accelerate GTM',
    source: 'LetsVibeAI Deep Dives',
    sourceCategory: 'LetsVibeAI Deep Dives',
    url: '/blog/free-perplexity-pro-comet',
    publishedAt: 'Sep 24, 2026',
    readTime: '7 min read',
    summary: 'Step-by-step blueprint on using AI deep research to automate competitor analysis, account reconnaissance, and sales intelligence pipelines.',
    tags: ['GTM AI', 'Research Engines', 'Outreach', 'Automation'],
    isOriginal: true,
    slug: 'free-perplexity-pro-comet',
    author: 'Pat Diamitani'
  },
  {
    id: 'orig-zero-to-ship-guide',
    title: 'Zero to Ship: 10 Days to Your First Live AI Portfolio',
    source: 'LetsVibeAI Deep Dives',
    sourceCategory: 'LetsVibeAI Deep Dives',
    url: '/courses/zero-to-ship',
    publishedAt: 'Sep 18, 2026',
    readTime: '5 min read',
    summary: 'How breaking builds into Chain Prompting sprints unlocks working custom GPTs, Make.com automations, and deployed web pages in under 30 minutes a day.',
    tags: ['Zero to Ship', 'Chain Prompting', 'Make.com', 'Beginners'],
    isOriginal: true,
    slug: 'zero-to-ship-guide',
    author: 'LetsVibeAI Editorial'
  },

  // ── Foundation Labs Feed Items
  {
    id: 'openai-o3-mini-reasoning',
    title: 'Introducing OpenAI o3-mini: High-Speed Frontier Reasoning for Developers',
    source: 'OpenAI Blog',
    sourceCategory: 'Foundation Labs',
    url: 'https://openai.com/index/openai-o3-mini/',
    publishedAt: 'Oct 6, 2026',
    readTime: '6 min read',
    summary: 'OpenAI unveils o3-mini, delivering frontier science, mathematics, and complex coding reasoning with 3x lower latency and configurable reasoning effort parameters.',
    tags: ['Reasoning Models', 'Coding Benchmarks', 'Developer APIs']
  },
  {
    id: 'anthropic-claude-3-7-sonnet',
    title: 'Claude 3.7 Sonnet: Hybrid Thinking Architecture for Extended Coding',
    source: 'Anthropic Research',
    sourceCategory: 'Foundation Labs',
    url: 'https://www.anthropic.com/news/claude-3-7-sonnet',
    publishedAt: 'Oct 5, 2026',
    readTime: '7 min read',
    summary: 'Anthropic introduces Claude 3.7 Sonnet featuring unified standard response generation with user-controllable chain-of-thought reasoning tokens.',
    tags: ['Claude', 'Hybrid Reasoning', 'Software Engineering']
  },
  {
    id: 'deepmind-gemini-2-flash-thinking',
    title: 'Gemini 2.0 Flash Thinking: Real-Time Multimodal Reasoning at Scale',
    source: 'Google DeepMind',
    sourceCategory: 'Foundation Labs',
    url: 'https://deepmind.google/discover/blog/gemini-2-0-flash-thinking/',
    publishedAt: 'Oct 4, 2026',
    readTime: '5 min read',
    summary: 'Google DeepMind expands Gemini 2.0 with visible scratchpad reasoning, live tool use integration, and ultra-fast visual document parsing.',
    tags: ['Gemini', 'Multimodal AI', 'Tool Use']
  },
  {
    id: 'meta-llama-3-3-open-weights',
    title: 'Llama 3.3 70B: Industry-Leading Open Weights with 128k Context',
    source: 'Meta AI Blog',
    sourceCategory: 'Foundation Labs',
    url: 'https://ai.meta.com/blog/llama-3-3-70b-multimodal-open-weights/',
    publishedAt: 'Oct 3, 2026',
    readTime: '8 min read',
    summary: 'Meta releases Llama 3.3 70B matching previous 405B capabilities on key benchmarks while running efficiently on single-node GPU hardware.',
    tags: ['Open Source', 'LLaMA', 'Local AI']
  },
  {
    id: 'huggingface-smolagents-release',
    title: 'smolagents: Building Minimalist, Code-Executing AI Agents in Under 1,000 Lines',
    source: 'Hugging Face Blog',
    sourceCategory: 'Foundation Labs',
    url: 'https://huggingface.co/blog/smolagents',
    publishedAt: 'Oct 2, 2026',
    readTime: '6 min read',
    summary: 'Hugging Face introduces smolagents, arguing that code-action agents outperform JSON-action agents in efficiency, token usage, and complex logic execution.',
    tags: ['AI Agents', 'Code Generation', 'Open Source']
  },

  // ── Top Newsletters & Curators
  {
    id: 'rundown-ai-coding-agents-breakthrough',
    title: 'The AI Coding Revolution: How Vibe Coding Became the Dominant Paradigm',
    source: 'The Rundown AI',
    sourceCategory: 'Top Newsletters',
    url: 'https://www.therundown.ai/p/vibe-coding-paradigm-shift',
    publishedAt: 'Oct 6, 2026',
    readTime: '4 min read',
    summary: 'Why non-technical founders and product operators are shipping fully functional commercial applications in days using AI architecture prompts.',
    tags: ['Vibe Coding', 'Industry Trends', 'Productivity']
  },
  {
    id: 'latent-space-ai-engineer-stack-2026',
    title: 'The AI Engineer Architecture Stack: From RAG to Autonomous Harnesses',
    source: 'Latent Space',
    sourceCategory: 'Top Newsletters',
    url: 'https://www.latent.space/p/ai-engineer-stack-2026',
    publishedAt: 'Oct 5, 2026',
    readTime: '12 min read',
    summary: 'Deep breakdown of how the production AI stack evolved from basic retrieval-augmented generation to deterministic multi-agent harness workflows.',
    tags: ['AI Engineering', 'Agent Harness', 'System Design']
  },
  {
    id: 'tldr-ai-frontier-reasoning-summary',
    title: 'TLDR AI: Reasoning Tokens, Test-Time Compute, and the End of Benchmarks',
    source: 'TLDR AI',
    sourceCategory: 'Top Newsletters',
    url: 'https://tldr.tech/ai/2026-10-04',
    publishedAt: 'Oct 4, 2026',
    readTime: '3 min read',
    summary: 'Quick summaries of test-time scaling laws, open-weight reasoning breakthroughs, and the top new AI developer tools released this week.',
    tags: ['Quick Briefing', 'Scaling Laws', 'Tools']
  },
  {
    id: 'bens-bites-10-new-ai-builders',
    title: "Ben's Bites: 10 Wild AI Products Launched This Week (and How They Were Built)",
    source: "Ben's Bites",
    sourceCategory: 'Top Newsletters',
    url: 'https://bensbites.beehiiv.com/p/10-ai-builds-this-week',
    publishedAt: 'Oct 3, 2026',
    readTime: '5 min read',
    summary: 'Highlighting top solo-founder AI SaaS products built with Lovable, Cursor, Bolt, and Supabase generating recurring revenue.',
    tags: ['Product Showcase', 'No-Code', 'SaaS']
  },
  {
    id: 'interconnects-evaluating-reasoning-models',
    title: 'Interconnects: How to Properly Evaluate Thinking Models Beyond GSM8k',
    source: 'Interconnects (Nathan Lambert)',
    sourceCategory: 'Top Newsletters',
    url: 'https://www.interconnects.ai/p/evaluating-thinking-models',
    publishedAt: 'Oct 2, 2026',
    readTime: '10 min read',
    summary: 'Why traditional benchmarks are saturated and how real-world code execution and SWE-bench Verified are the only tests that matter.',
    tags: ['Model Evals', 'RLHF', 'Post-Training']
  },

  // ── AI Engineering & Dev Ecosystem
  {
    id: 'simon-willison-prompt-injection-defense',
    title: 'Defending Multi-Modal Agents Against Indirect Prompt Injection in 2026',
    source: 'Simon Willison’s Weblog',
    sourceCategory: 'AI Engineering',
    url: 'https://simonwillison.net/2026/Oct/defending-ai-agents/',
    publishedAt: 'Oct 6, 2026',
    readTime: '9 min read',
    summary: 'Practical architectural patterns for segregating untrusted web content from execution tool calls when building autonomous AI pipelines.',
    tags: ['Security', 'AI Architecture', 'Tool Sandboxing']
  },
  {
    id: 'langchain-langgraph-human-in-the-loop',
    title: 'Building Resilient Multi-Agent Workflows with LangGraph and State Persistence',
    source: 'LangChain Blog',
    sourceCategory: 'AI Engineering',
    url: 'https://blog.langchain.dev/langgraph-state-persistence-patterns/',
    publishedAt: 'Oct 5, 2026',
    readTime: '8 min read',
    summary: 'How to implement durable execution, human approval gates, and time-travel debugging in multi-step AI business pipelines.',
    tags: ['LangGraph', 'Multi-Agent', 'Enterprise AI']
  },
  {
    id: 'cursor-composer-tips-for-architects',
    title: 'Architect-First Development: Maximizing Cursor Composer with Planning Documents',
    source: 'Cursor AI Changelog & Blog',
    sourceCategory: 'AI Engineering',
    url: 'https://www.cursor.com/blog/composer-architecture-first',
    publishedAt: 'Oct 4, 2026',
    readTime: '6 min read',
    summary: 'Best practices for structuring PRD, system schema, and component contracts before feeding prompts to Cursor Composer.',
    tags: ['Cursor', 'Vibe Coding', 'Developer Productivity']
  },
  {
    id: 'supabase-vector-hybrid-search-guide',
    title: 'Mastering Hybrid Search: Combining Full-Text Search and pgvector in PostgreSQL',
    source: 'Supabase AI & Vector',
    sourceCategory: 'AI Engineering',
    url: 'https://supabase.com/blog/hybrid-search-pgvector-postgres',
    publishedAt: 'Oct 3, 2026',
    readTime: '7 min read',
    summary: 'Why Reciprocal Rank Fusion (RRF) between lexical BM25 and vector semantic embeddings yields superior RAG accuracy.',
    tags: ['PostgreSQL', 'pgvector', 'RAG Search']
  },
  {
    id: 'chip-huyen-production-evals-framework',
    title: 'The AI Engineering Hierarchy of Needs: From Evals to Edge Deployment',
    source: 'Chip Huyen (AI Engineering)',
    sourceCategory: 'AI Engineering',
    url: 'https://huyenchip.com/2026/09/28/ai-engineering-hierarchy.html',
    publishedAt: 'Sep 28, 2026',
    readTime: '11 min read',
    summary: 'A definitive guide on structuring datasets, automated regression tests, and continuous evaluation for production generative systems.',
    tags: ['Evaluation', 'System Design', 'MLOps']
  },

  // ── Venture Capital & Strategy
  {
    id: 'a16z-ai-agent-market-map-2026',
    title: 'The Agentic Enterprise: Where Trillion-Dollar AI Value Will Accrue',
    source: 'a16z AI Blog',
    sourceCategory: 'Venture & Strategy',
    url: 'https://a16z.com/agentic-enterprise-market-map/',
    publishedAt: 'Oct 5, 2026',
    readTime: '10 min read',
    summary: 'Why autonomous workflows with vertical domain expertise will capture more margin than generalized base model API providers.',
    tags: ['Market Map', 'Venture Capital', 'Enterprise AI']
  },
  {
    id: 'sequoia-generative-ai-act-3',
    title: 'Generative AI Act 3: From Reasoning Engines to Autonomous Revenue',
    source: 'Sequoia Capital AI',
    sourceCategory: 'Venture & Strategy',
    url: 'https://www.sequoiacap.com/article/generative-ai-act-3/',
    publishedAt: 'Oct 2, 2026',
    readTime: '8 min read',
    summary: 'Sequoia explores the transition from co-pilots to autonomous agents, unit economics of inference, and the battle for developer mindshare.',
    tags: ['Strategy', 'ROI', 'Autonomous Agents']
  },
  {
    id: 'tomasz-tunguz-ai-pricing-models',
    title: 'The Death of Per-Seat Pricing: Why Outcome and Compute-Based AI Pricing Wins',
    source: 'Tomasz Tunguz',
    sourceCategory: 'Venture & Strategy',
    url: 'https://tomtunguz.com/ai-outcome-pricing-shift/',
    publishedAt: 'Sep 30, 2026',
    readTime: '5 min read',
    summary: 'How modern AI SaaS companies are structuring pricing based on work completed, resolutions achieved, and value delivered rather than user logins.',
    tags: ['SaaS Pricing', 'GTM Strategy', 'Business Models']
  },

  // ── Deep Tech Media
  {
    id: 'mit-tech-review-energy-ai-data-centers',
    title: 'The Nuclear Energy Race Fueling Global AI Compute Infrastructure',
    source: 'MIT Technology Review AI',
    sourceCategory: 'Deep Tech Media',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/',
    publishedAt: 'Oct 5, 2026',
    readTime: '8 min read',
    summary: 'How hyperscalers are securing dedicated gigawatt-scale clean energy and small modular reactors to power the next generation of model training.',
    tags: ['Data Centers', 'Energy', 'Compute Infrastructure']
  },
  {
    id: 'ars-technica-ai-chip-competition',
    title: 'Beyond the GPU Monopoly: How Custom Silicon and Optical Interconnects Compete',
    source: 'Ars Technica AI',
    sourceCategory: 'Deep Tech Media',
    url: 'https://arstechnica.com/information-technology/',
    publishedAt: 'Oct 4, 2026',
    readTime: '9 min read',
    summary: 'An architectural deep dive into custom ASICs, TPU clusters, and next-gen silicon transforming large-scale training and inference economics.',
    tags: ['Hardware', 'Chips', 'Infrastructure']
  }
];

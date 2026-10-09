export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  content: string;
}

export interface CourseModule {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  takeaway: string;
  deliverable: string;
  estimatedHours: string;
  icon: string;
  analogy: {
    title: string;
    description: string;
  };
  lessons: Lesson[];
  copyPrompt: {
    title: string;
    prompt: string;
    targetDoc: string;
  };
  exercise: string;
  quiz: QuizQuestion[];
  videoUrl?: string;
  youtubeId?: string;
  duration?: string;
  chapters?: Array<{ time: string; title: string }>;
}

export interface YouTubeRostrItem {
  id: string;
  title: string;
  creator: string;
  creatorUrl?: string;
  youtubeId: string;
  category: 'Harness Setup' | 'Fullstack Vibe Coding' | 'Agent Workflows & MCP' | 'Prompt Architecture & PAL' | 'Database & Auth' | 'Deployment & Scale';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  summary: string;
  takeaways: string[];
  tags: string[];
  featured?: boolean;
  publishedDate?: string;
}

export interface DailyBriefVideo {
  id: string;
  date: string;
  title: string;
  videoUrl: string;
  youtubeId?: string;
  duration: string;
  summary: string;
  highlights: string[];
  status: 'live' | 'archived';
  keyTool?: string;
}

export interface ArchitectureBlock {
  id: string;
  name: string;
  role: string;
  analogy: string;
  analogyIcon: string;
  defaultTool: string;
  alternatives: string[];
  securityNote: string;
  promptExample: string;
  layer: 'client' | 'gateway' | 'server' | 'persistence' | 'external';
  connections: string[];
}

export interface DocTemplate {
  id: string;
  num: string;
  title: string;
  owner: string;
  filename: string;
  purpose: string;
  keySections: string[];
  samplePrompt: string;
  contentTemplate: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  featured: boolean;
  badge?: string;
  features: string[];
  cta: string;
  ctaAction: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  highlight: string;
  builtApp: string;
  builtTime: string;
}

export interface CapstoneDeliverable {
  id: string;
  moduleRef: string;
  title: string;
  description: string;
  points: number;
}

// Marketplace Item Specification
export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'templates' | 'skills' | 'agents' | 'prompts';
  price: number;
  rating: number;
  downloads: number;
  author: string;
  description: string;
  tags: string[];
  badge?: string;
  previewUrl?: string;
}

// Directory Listing Specification
export interface DirectoryListing {
  id: string;
  name: string;
  founder: string;
  category: string;
  mrr: string;
  description: string;
  stack: string[];
  url: string;
  verified: boolean;
  featured: boolean;
}

// User Profile & Workspace
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  plan: 'free' | 'pro' | 'cohort';
  avatarUrl: string;
  role: string;
  bio: string;
  apiKey: string;
}

export interface WorkspaceProject {
  id: string;
  name: string;
  slug: string;
  environment: 'development' | 'staging' | 'production';
  status: 'live' | 'building' | 'draft';
  lastDeployed: string;
  url: string;
}

// Agent Platform & Skills Hub Specification
export interface AgentPlatformSkill {
  id: string;
  name: string;
  cat: 'form' | 'pub' | 'dist' | 'brand' | 'content' | 'merch' | 'strat' | 'build';
  modes: Array<'s' | 'k' | 'p'>; // service, skill (attach), package
  servicePrice: number;
  credits: number;
  runtime: string;
  summary: string;
  inputs: string[];
  outputs: string[];
  steps: string[];
  tools: string[];
}

export interface AgentSubAgent {
  id: string;
  kind: string;
  name: string;
  status: 'RUNNING' | 'WAITING' | 'DRAFT' | 'COMPLETED';
  brief: string;
  skills: string[];
  spentCredits: number;
  budgetCredits: number;
  due: string;
  nextAction: string;
}

export interface AgentMemoryRecord {
  key: string;
  value: string;
  category?: string;
}

export interface AgentRunRecord {
  id: string;
  skillName: string;
  actor: string;
  timestamp: string;
  outputArtifact: string;
  status: 'DONE' | 'REVIEW' | 'ACTION' | 'FAILED';
}

// GencyAI Agent Harness Mastery Specification
export interface HarnessLesson {
  id: string;
  num: string;
  title: string;
  dur: string;
  desc: string;
  src?: string;
  isAvailable: boolean;
}

export interface HarnessPractice {
  n: string;
  title: string;
  desc: string;
}

export interface HarnessConceptTrack {
  key: string;
  name: string;
  meta: string;
  desc: string;
  ship: string;
  modules: string[];
}

export interface HarnessFormatEntry {
  title: string;
  note: string;
  harnesses: Record<string, { path: string; code: string }>;
}

// GencyAI Skills Library Specification
export interface GencyLibrarySkill {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  core: boolean;
  github: string;
  raw: string;
  repo: string;
  install: string;
  compat: string[];
  triggers: string[];
}




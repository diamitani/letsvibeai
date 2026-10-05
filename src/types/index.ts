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

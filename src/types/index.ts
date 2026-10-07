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

export interface CapstoneDeliverable {
  id: string;
  moduleRef: string;
  title: string;
  description: string;
  points: number;
}

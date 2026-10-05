export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";
export type LearningStyle = "project-based" | "theory-first" | "balanced";
export type ResourceType =
  | "video"
  | "article"
  | "course"
  | "paper"
  | "interactive"
  | "code"
  | "podcast"
  | "documentation";

export interface Resource {
  id: string;
  title: string;
  url: string;
  platform: string;
  resource_type: ResourceType;
  source_tier: 1 | 2 | 3;
  credibility_score: number;
  author?: string;
  description?: string;
  duration_minutes?: number;
  difficulty?: Difficulty;
  topics: string[];
  prerequisites: string[];
}

export interface Lesson {
  id: string;
  title: string;
  order: number;
  objectives: string[];
  resource_ids: string[];
  custom_content?: string;
  exercises: string[];
  estimated_minutes: number;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  estimated_hours: number;
  objectives: string[];
  lessons: Lesson[];
}

export interface Curriculum {
  id: string;
  learner_id: string;
  topic: string;
  generated_at: string;
  total_estimated_hours: number;
  learning_objectives: string[];
  modules: Module[];
  assessment_milestones: string[];
  coverage_gaps: string[];
  recommended_next_topics: string[];
}

export interface LearnerProfile {
  topic: string;
  current_level: Difficulty;
  goals: string[];
  available_time_hours: number;
  learning_style: LearningStyle;
  preferred_formats: ResourceType[];
  constraints: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  curriculum?: Curriculum;
  timestamp: number;
}

export type SetupStep =
  | "greeting"
  | "topic"
  | "level"
  | "goals"
  | "time"
  | "style"
  | "formats"
  | "generating"
  | "done";

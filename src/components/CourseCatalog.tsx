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
  ShieldCheck
} from 'lucide-react';

export interface CourseCardData {
  id: string;
  title: string;
  category: string;
  price: string;
  rating: string;
  duration: string;
  lessonsCount: number;
  instructorName: string;
  instructorAvatar: string;
  image: string;
  description: string;
  featured?: boolean;
  moduleId: number;
}

const COURSES: CourseCardData[] = [
  {
    id: 'course-1',
    moduleId: 1,
    title: 'Full-Stack Vibe Coding & React 19 Architecture',
    category: 'Full-Stack AI',
    price: '$59 USD',
    rating: '4.9',
    duration: '4h 30m',
    lessonsCount: 12,
    instructorName: 'Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description: 'Master fast prototyping with Vite, TypeScript, Tailwind, and React 19 server components.',
    featured: true
  },
  {
    id: 'course-2',
    moduleId: 2,
    title: 'Autonomous Agent Harness & Multi-Tool Orchestration',
    category: 'Autonomous Agents',
    price: '$88 USD',
    rating: '5.0',
    duration: '6h 15m',
    lessonsCount: 16,
    instructorName: 'Dr. Alex Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: 'Build agent loops, tool schemas, rate-limiting guards, and self-healing error circuits.',
    featured: true
  },
  {
    id: 'course-3',
    moduleId: 3,
    title: 'Supabase Row-Level Security & Multi-Tenant Data Vaults',
    category: 'Data & Security',
    price: '$65 USD',
    rating: '4.8',
    duration: '5h 00m',
    lessonsCount: 14,
    instructorName: 'Marcus Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'Deploy battle-tested database migrations, encrypted vaults, and workspace tenant boundaries.',
    featured: false
  },
  {
    id: 'course-4',
    moduleId: 4,
    title: 'Production Stripe Billing, Usage Metering & Webhooks',
    category: 'Monetization',
    price: '$79 USD',
    rating: '4.9',
    duration: '5h 45m',
    lessonsCount: 15,
    instructorName: 'Sarah Jenkins',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    description: 'Implement idempotent webhook handlers, metered AI credit packs, and dunning workflows.',
    featured: false
  },
  {
    id: 'course-5',
    moduleId: 5,
    title: 'Advanced RAG, Vector Search & Knowledge Retrieval',
    category: 'RAG & Search',
    price: '$95 USD',
    rating: '4.9',
    duration: '7h 10m',
    lessonsCount: 18,
    instructorName: 'Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    description: 'Ground AI agents in pgvector embeddings, dynamic chunking, and hybrid BM25 search.',
    featured: true
  },
  {
    id: 'course-6',
    moduleId: 6,
    title: 'Enterprise Capstone: Build & Ship a Complete AI SaaS',
    category: 'Capstone Project',
    price: '$120 USD',
    rating: '5.0',
    duration: '8h 30m',
    lessonsCount: 22,
    instructorName: 'Dr. Alex Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: 'End-to-end multi-tenant platform with custom domain routing, team invites, and production CI/CD.',
    featured: true
  }
];

interface CourseCatalogProps {
  onSelectModule: (moduleId: number) => void;
  onEnrollPlan: (courseTitle: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectModule,
  onEnrollPlan
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack AI', 'Autonomous Agents', 'Data & Security', 'Monetization', 'Capstone Project'];

  const filteredCourses = selectedCategory === 'All'
    ? COURSES
    : COURSES.filter(c => c.category === selectedCategory);

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header: OpenClass Top Stack with Tag and Filter Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>Course Highlights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            Explore Our Top Courses &{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Specialized Tracks.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            Every course includes complete verified source code, architecture diagrams, production tests, and lifetime repo access.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#4a4d4f]/10 shadow-xs">
          {categories.slice(0, 4).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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

      {/* Course Cards Grid - OpenClass Exact Frame Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group bg-white rounded-[26px] p-5 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(16,27,36,0.09)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            
            <div className="space-y-4">
              
              {/* Image & Badges Wrapper */}
              <div className="relative rounded-[20px] overflow-hidden aspect-16/10 bg-[#101b24]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101b24]/40 via-transparent to-transparent" />

                {/* Category Pill Tag (Top Left) */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#101b24] shadow-xs">
                  {course.category}
                </div>

                {/* Price Tag Pill (Top Right) */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#ec4909] text-white text-[11px] font-black shadow-sm">
                  {course.price}
                </div>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-2.5 pt-1">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-[#ec4909]/30"
                />
                <span className="text-xs text-[#4a4d4f] font-medium">
                  Author: <strong className="text-[#101b24] font-semibold">{course.instructorName}</strong>
                </span>
              </div>

              {/* Course Title */}
              <h3 className="font-sans font-bold text-lg text-[#101b24] leading-snug group-hover:text-[#ec4909] transition-colors line-clamp-2">
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
                <div className="flex items-center gap-1 text-[#101b24] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#fcd554] text-[#fcd554]" />
                  <span>{course.rating}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#4a4d4f]/70" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#4a4d4f]/70" />
                  <span>{course.lessonsCount} Lessons</span>
                </div>
              </div>

              {/* Card Action Button */}
              <button
                onClick={() => onSelectModule(course.moduleId)}
                className="w-full py-2.5 px-4 rounded-full bg-[#f7f4f2] hover:bg-[#ec4909] hover:text-white text-[#101b24] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <span>View Full Curriculum & Code</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

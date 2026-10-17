import React from 'react';
import { Sparkles, ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}

const POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: '5 Architectural Patterns to Stop AI Hallucinations in Production',
    category: 'Architecture',
    date: 'February 22, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'How to implement structured output schemas, dynamic context pruning, and automated eval circuits before user delivery.'
  },
  {
    id: 'post-2',
    title: 'From Vibe Coding to Shipping Enterprise Multi-Tenant SaaS',
    category: 'Engineering',
    date: 'February 15, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Transitioning from casual AI prompts to rigorous software development lifecycles with Supabase RLS and Stripe webhooks.'
  },
  {
    id: 'post-3',
    title: 'Building Autonomous Agent Workflows with Self-Healing Tools',
    category: 'Agent Harness',
    date: 'January 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    excerpt: 'A deep dive into tool call sandboxes, rate-limit retries, and token-cost optimization for high-volume agents.'
  }
];

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>Blog & Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            Your Guide to Growth &{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              AI Engineering.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            Discover technical breakdowns, agent design patterns, and case studies to accelerate your development.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-full bg-white hover:bg-[#f7f4f2] text-[#101b24] border border-[#4a4d4f]/15 font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0">
          <span>View All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3-Column Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-[26px] p-5 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(16,27,36,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-4">
              
              {/* Image Container */}
              <div className="relative rounded-[20px] overflow-hidden aspect-16/10 bg-[#101b24]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#101b24] shadow-xs">
                  {post.category}
                </div>
              </div>

              {/* Date & Read Time */}
              <div className="flex items-center gap-3 text-xs text-[#4a4d4f]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#ec4909]" />
                  {post.date}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              {/* Post Title */}
              <h3 className="font-sans font-bold text-lg text-[#101b24] leading-snug group-hover:text-[#ec4909] transition-colors">
                {post.title}
              </h3>

              {/* Post Excerpt */}
              <p className="text-xs text-[#4a4d4f] leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

            </div>

            {/* Read Article Action */}
            <div className="pt-4 mt-4 border-t border-[#4a4d4f]/10 flex items-center justify-between text-xs font-semibold text-[#101b24] group-hover:text-[#ec4909] transition-colors">
              <span>Read Full Article</span>
              <div className="w-6 h-6 rounded-full bg-[#f7f4f2] group-hover:bg-[#ec4909] group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
};

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Calendar, Mail, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../lib/blog';
import { Markdown } from '../lib/Markdown';

const INITIAL_COUNT = 3;

const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) return;

    if (!endpoint) {
      // No form backend configured: hand off to the visitor's email app.
      window.location.href = `mailto:hello@letsvibeai.com?subject=${encodeURIComponent('Daily Vibe signup')}&body=${encodeURIComponent(`Please add ${trimmed} to the Daily Vibe list.`)}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'daily-vibe-newsletter' }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mt-10 rounded-[26px] bg-[#071B3A] text-white p-8 sm:p-10 relative overflow-hidden">
      <div className="absolute -top-10 right-10 w-56 h-56 bg-[#ec4909]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-[#34D399] text-xs font-mono font-bold">
            <Mail className="w-4 h-4" />
            <span>THE DAILY VIBE, IN YOUR INBOX</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">One practical AI briefing a day.</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            What moved in AI, one tool worth trying, and one build idea — written for operators, not researchers. Free.
          </p>
        </div>

        {status === 'done' ? (
          <div className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/10 border border-[#34D399]/40 text-sm font-bold text-[#34D399]">
            <CheckCircle2 className="w-5 h-5" />
            <span>You are on the list.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#34D399] w-full sm:w-64"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-6 py-3.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] disabled:opacity-60 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{status === 'sending' ? 'Joining...' : 'Get the Daily Vibe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
      {status === 'error' && (
        <div className="relative z-10 mt-4 flex items-center gap-2 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4" />
          <span>Something went wrong. Email us at hello@letsvibeai.com and we will add you.</span>
        </div>
      )}
    </div>
  );
};

const PostModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-3xl w-full border border-black/10 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-md rounded-t-3xl p-5 flex items-start justify-between gap-4 border-b border-[#4a4d4f]/10 z-10">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#706B67]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ec4909]/10 text-[#ec4909] font-bold">{post.type}</span>
              {post.date && <span>{post.date}</span>}
              {post.readTime && <span>· {post.readTime}</span>}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#071B3A] tracking-tight leading-snug">{post.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F4F7FB] hover:bg-[#ec4909] hover:text-white text-[#071B3A] transition-colors cursor-pointer shrink-0"
            aria-label="Close article"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <Markdown source={post.body} />
        </div>
      </div>
    </div>
  );
};

export const BlogSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const posts = showAll ? BLOG_POSTS : BLOG_POSTS.slice(0, INITIAL_COUNT);

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 fill-[#ec4909]" />
            <span>The Daily Vibe</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            AI News, Tool Guides &{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Build Notes.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            Every piece has a job: help you understand what moved in AI, what to try next, and what to build with it. Written by the LetsVibeAI desk — no filler.
          </p>
        </div>

        {BLOG_POSTS.length > INITIAL_COUNT && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#f7f4f2] text-[#101b24] border border-[#4a4d4f]/15 font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>{showAll ? 'Show Fewer' : `View All ${BLOG_POSTS.length} Articles`}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showAll ? '-rotate-90' : ''}`} />
          </button>
        )}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            onClick={() => setActivePost(post)}
            className="group bg-white rounded-[26px] p-6 border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(16,27,36,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#4a4d4f]">
                <span className="px-3 py-1 rounded-full bg-[#ec4909]/10 text-[11px] font-bold text-[#ec4909]">
                  {post.type}
                </span>
              </div>

              {post.date && (
                <div className="flex items-center gap-3 text-xs text-[#4a4d4f]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#ec4909]" />
                    {post.date}
                  </span>
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>
              )}

              <h3 className="font-sans font-bold text-lg text-[#101b24] leading-snug group-hover:text-[#ec4909] transition-colors">
                {post.title}
              </h3>

              <p className="text-xs text-[#4a4d4f] leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#4a4d4f]/10 flex items-center justify-between text-xs font-semibold text-[#101b24] group-hover:text-[#ec4909] transition-colors">
              <span>Read Full Article</span>
              <div className="w-6 h-6 rounded-full bg-[#f7f4f2] group-hover:bg-[#ec4909] group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <NewsletterCard />

      {activePost && <PostModal post={activePost} onClose={() => setActivePost(null)} />}
    </section>
  );
};

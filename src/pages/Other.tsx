import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useTitle } from '../lib/router';
import { catalog } from '../content/catalog';
import { CourseCard } from '../components/Cards';
import { parseDoc, renderMarkdown } from '../lib/markdown';

export function CoursesPage() {
  useTitle('All courses');
  const video = catalog.filter((c) => c.kind === 'video');
  const reading = catalog.filter((c) => c.kind === 'reading');
  return (
    <>
      <PageHeader eyebrow="Courses" title="Every course is free" body="Start with a two-minute video. Go as deep as you like." />
      <section className="wrap py-12 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight">Video courses</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {video.map((c) => <CourseCard key={c.slug} course={c} large />)}
        </div>
        <h2 className="mt-16 text-2xl font-bold tracking-tight">Reading courses</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reading.map((c) => <CourseCard key={c.slug} course={c} />)}
        </div>
      </section>
    </>
  );
}

const blogFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
export const posts = Object.entries(blogFiles)
  .map(([path, raw]) => {
    const { meta, body } = parseDoc(raw);
    return { slug: path.split('/').pop()!.replace(/\.md$/, ''), title: meta.title || 'Untitled', date: meta.date || '', description: meta.description || '', body };
  })
  .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));

export function BlogPage() {
  useTitle('Blog');
  return (
    <>
      <PageHeader eyebrow="Blog" title="The Daily Vibe" body="What moved in AI, translated for people who build." />
      <section className="wrap grid gap-5 py-12 sm:py-16 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="card group p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
            <p className="font-mono text-xs text-muted">{p.date}</p>
            <h2 className="mt-2 text-lg font-bold group-hover:text-signal">{p.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{p.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-signal">Read <ArrowRight className="h-4 w-4" /></span>
          </Link>
        ))}
      </section>
    </>
  );
}

export function BlogPost({ slug }: { slug: string }) {
  const post = posts.find((p) => p.slug === slug);
  useTitle(post?.title || 'Not found');
  const html = useMemo(() => (post ? renderMarkdown(post.body) : ''), [post]);
  if (!post) return <NotFound />;
  return (
    <>
      <PageHeader eyebrow={post.date} title={post.title} body={post.description} />
      <article className="wrap max-w-3xl py-12 sm:py-16">
        <div className="card p-6 sm:p-10">
          <div className="prose-lv" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <Link to="/blog" className="btn-ghost mt-8">← All posts</Link>
      </article>
    </>
  );
}

export function NotFound() {
  useTitle('Page not found');
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow text-signal">404</p>
      <h1 className="mt-3 text-3xl font-bold">We couldn't find that page</h1>
      <p className="mt-3 text-muted">The link may be old. The courses are all still here.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn-ghost">Home</Link>
        <Link to="/courses" className="btn-primary">Browse courses</Link>
      </div>
    </section>
  );
}

export function PageHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <div className="ribbons" aria-hidden />
      <div className="wrap relative py-14 sm:py-20">
        <p className="eyebrow text-growth">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {body && <p className="mt-4 max-w-2xl text-white/70 sm:text-lg">{body}</p>}
      </div>
    </section>
  );
}

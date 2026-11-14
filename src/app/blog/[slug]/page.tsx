import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/Markdown';
import { getPost, getPosts } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return pageMeta({ title: 'Blog', path: `/blog/${slug}` });
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <article className="wrap py-12 sm:py-16">
      <p className="eyebrow text-signal">
        <Link href="/blog" className="hover:underline">The Daily Vibe</Link>
        <span className="mx-2 text-line">/</span>
        {post.date}
      </p>
      <h1 className="mt-4 max-w-3xl text-display">{post.title}</h1>
      {post.type && <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">{post.type}{post.readTime ? ` · ${post.readTime}` : ''}</p>}
      <div className="mt-10 max-w-prose">
        <Markdown content={post.body} />
      </div>
    </article>
  );
}

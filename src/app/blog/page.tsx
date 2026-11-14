import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'The Daily Vibe',
  description: 'What moved in AI, translated for people who build.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getPosts();
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">Journal</p>
      <h1 className="mt-3 text-display">The Daily Vibe</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">What moved in AI, translated for people who build.</p>
      <ol className="mt-14 divide-y divide-line border-y border-line">
        {posts.map((p) => (
          <li key={p.slug} className="py-8">
            <Link href={`/blog/${p.slug}`} className="group grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-10">
              <div className="text-sm text-muted">
                <p>{p.date}</p>
                {p.type && <p className="mt-1 font-mono text-[11px] uppercase tracking-wider">{p.type}</p>}
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight group-hover:text-signal sm:text-2xl">{p.title}</h2>
                {p.description && <p className="mt-2 max-w-2xl leading-7 text-muted">{p.description}</p>}
                {p.readTime && <p className="mt-3 font-mono text-[11px] text-muted">{p.readTime}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

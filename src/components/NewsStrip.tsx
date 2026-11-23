import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCurated, getNewsArticles } from '@/lib/news';
import { ArticleCard, CuratedCard } from './NewsCards';

export function NewsStrip() {
  const latest = getNewsArticles()[0];
  const picks = getCurated().slice(0, latest ? 2 : 3);
  if (!latest && picks.length === 0) return null;
  return (
    <section className="wrap py-16 sm:py-20" aria-labelledby="vibe-news-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow text-signal">Courses + News</p>
          <h2 id="vibe-news-heading" className="mt-3 text-display">
            Latest from Vibe News
          </h2>
          <p className="mt-3 text-muted">Today’s AI moves, translated into what to build, fix or try next.</p>
        </div>
        <Link href="/news" className="btn-ghost shrink-0">
          All news <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {latest && (
          <div className="lg:col-span-1 lg:row-span-1">
            <ArticleCard article={latest} featured />
          </div>
        )}
        {picks.map((p) => (
          <CuratedCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Rss } from 'lucide-react';
import { getNewsFeed } from '@/lib/news';
import { pageMeta } from '@/lib/seo';
import { siteUrl } from '@/lib/utils';
import { NewsFeed } from './NewsFeed';

const base = pageMeta({
    title: 'Vibe News',
    description:
      'Daily AI news for people who build: original daily articles plus curated picks from the best AI feeds and newsletters, each with a takeaway for vibe coders.',
    path: '/news',
});

export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    types: { 'application/rss+xml': [{ url: `${siteUrl}/news/rss.xml`, title: 'LetsVibeAI · Vibe News' }] },
  },
};

export default function NewsPage() {
  const items = getNewsFeed();
  return (
    <div className="wrap py-16 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-signal">Courses + News</p>
          <h1 className="mt-3 text-display">Vibe News</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            What moved in AI today, and what it means for what you’re building. Original daily articles, plus hand-picked stories from
            the feeds and newsletters builders actually read.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/courses" className="btn-ghost">
            Browse courses
          </Link>
          <a href="/news/rss.xml" className="btn-ghost" aria-label="Vibe News RSS feed">
            <Rss className="h-4 w-4" /> RSS
          </a>
        </div>
      </div>
      <div className="mt-12">
        <NewsFeed items={items} />
      </div>
      <p className="mt-14 max-w-3xl text-xs leading-5 text-muted">
        Curated picks link to the original publisher. Headlines belong to their publishers; the “Why it matters for builders” notes are
        written by LetsVibeAI.
      </p>
    </div>
  );
}

import Link from 'next/link';
import { Rss } from 'lucide-react';
import { getNewsFeed, getNewsletterSourcesWithCounts, getRssSourcesWithCounts } from '@/lib/news';
import { pageMeta } from '@/lib/seo';
import { siteUrl } from '@/lib/utils';
import { NewsFeed } from './NewsFeed';

const base = pageMeta({
    title: 'Vibe News',
    description:
      'Daily AI news for people who build: original daily articles, a directory of the AI newsletters and RSS feeds we track, and curated picks with a takeaway for vibe coders.',
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
  const rssSources = getRssSourcesWithCounts();
  const newsletterSources = getNewsletterSourcesWithCounts();
  return (
    <div className="wrap py-16 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-signal">Courses + News</p>
          <h1 className="mt-3 text-display">Vibe News</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            What moved in AI today, and what it means for what you’re building. Original daily articles, plus the newsletters and RSS
            feeds we follow — each pick comes with a takeaway for builders.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/news/sources" className="btn-ghost">
            Sources &amp; feeds
          </Link>
          <Link href="/courses" className="btn-ghost">
            Browse courses
          </Link>
          <a href="/news/rss.xml" className="btn-ghost" aria-label="Vibe News RSS feed">
            <Rss className="h-4 w-4" /> RSS
          </a>
        </div>
      </div>
      <div className="mt-12">
        <NewsFeed items={items} rssSources={rssSources} newsletterSources={newsletterSources} />
      </div>
      <p className="mt-14 max-w-3xl text-xs leading-5 text-muted">
        Curated picks link to the original publisher. Headlines belong to their publishers; the “Why it matters for builders” notes are
        written by LetsVibeAI. Follow any source directly from the directory — we never republish full third-party article text.
      </p>
    </div>
  );
}

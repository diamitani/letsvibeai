import Link from 'next/link';
import { ArrowLeft, Rss } from 'lucide-react';
import { SourceDirectory } from '@/components/NewsCards';
import { getNewsletterSourcesWithCounts, getRssSourcesWithCounts } from '@/lib/news';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'News sources & feeds',
  description:
    'The full directory of AI newsletters and RSS feeds tracked by LetsVibe AI — name, focus, category, site, RSS link, and how many stories we’ve pulled.',
  path: '/news/sources',
});

export default function NewsSourcesPage() {
  const rssSources = getRssSourcesWithCounts();
  const newsletterSources = getNewsletterSourcesWithCounts();
  const total = rssSources.length + newsletterSources.length;

  return (
    <div className="wrap py-16 sm:py-20">
      <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Vibe News
      </Link>
      <p className="eyebrow mt-8 text-signal">Sources &amp; Feeds</p>
      <h1 className="mt-3 text-display">Newsletters and RSS feeds we track</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        {total} verified sources behind Vibe News. Subscribe or add the RSS feed yourself — then come back for the builder takeaway
        on the stories we pick.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/news?type=newsletter" className="btn-ghost">
          Newsletter picks
        </Link>
        <Link href="/news?type=rss" className="btn-ghost">
          Feed stories
        </Link>
        <a href="/news/rss.xml" className="btn-ghost" aria-label="Vibe News RSS feed">
          <Rss className="h-4 w-4" /> Our RSS
        </a>
      </div>

      <div className="mt-14 space-y-16">
        <SourceDirectory
          id="newsletters"
          sources={newsletterSources}
          title="AI Newsletters"
          description="Independent newsletters we read for builders. Visit the site to subscribe; use the RSS link when they publish one."
        />
        <SourceDirectory
          id="feeds"
          sources={rssSources}
          title="RSS Feeds"
          description="Official blogs and changelogs we pull from every weekday. Each card links to the site and the raw feed."
        />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Newspaper, Rss } from 'lucide-react';
import type { NewsFeedItem, NewsSourceWithCount } from '@/lib/news-types';
import { ArticleCard, CuratedCard, SourceDirectory } from '@/components/NewsCards';

const tabs = [
  { key: 'all', label: 'All', Icon: Newspaper },
  { key: 'article', label: 'Daily AI Articles', Icon: Newspaper },
  { key: 'rss', label: 'RSS Feeds', Icon: Rss },
  { key: 'newsletter', label: 'Newsletters', Icon: Mail },
] as const;

type TabKey = (typeof tabs)[number]['key'];
const isTab = (v: string | null): v is TabKey => !!v && tabs.some((t) => t.key === v);

export function NewsFeed({
  items,
  rssSources,
  newsletterSources,
}: {
  items: NewsFeedItem[];
  rssSources: NewsSourceWithCount[];
  newsletterSources: NewsSourceWithCount[];
}) {
  const [tab, setTab] = useState<TabKey>('all');

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('type');
    if (isTab(t)) setTab(t);
  }, []);

  const select = (key: TabKey) => {
    setTab(key);
    const url = new URL(window.location.href);
    if (key === 'all') url.searchParams.delete('type');
    else url.searchParams.set('type', key);
    window.history.replaceState(null, '', url.toString());
  };

  const counts = Object.fromEntries(
    tabs.map((t) => [t.key, t.key === 'all' ? items.length : items.filter((i) => i.kind === t.key).length]),
  ) as Record<TabKey, number>;
  const shown = tab === 'all' ? items : items.filter((i) => i.kind === tab);

  return (
    <>
      <div role="tablist" aria-label="Filter news" className="flex flex-wrap gap-2 border-b border-line pb-5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => select(t.key)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.key ? 'bg-navy text-white' : 'border border-line bg-white text-muted hover:text-ink'
            }`}
          >
            <t.Icon className="h-3.5 w-3.5" aria-hidden />
            {t.label}
            <span className={`font-mono text-[11px] ${tab === t.key ? 'text-white/60' : 'text-muted/70'}`}>{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {(tab === 'all' || tab === 'rss' || tab === 'newsletter') && (
        <div className="mt-10 space-y-12">
          {tab === 'all' && (
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-signal">Sources &amp; Feeds</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Follow the newsletters and feeds we track</h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted">
                  A curated directory of AI newsletters and RSS feeds. Visit each source, subscribe via RSS, or jump into our builder
                  takeaways.
                </p>
              </div>
              <Link href="/news/sources" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-signal hover:underline">
                Full directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          {(tab === 'all' || tab === 'newsletter') && (
            <SourceDirectory
              id="newsletters"
              sources={newsletterSources}
              title="AI Newsletters"
              description="Independent newsletters we read for builders — subscribe on their site, or follow the RSS link when they publish one."
            />
          )}
          {(tab === 'all' || tab === 'rss') && (
            <SourceDirectory
              id="feeds"
              sources={rssSources}
              title="RSS Feeds"
              description="Official blogs and changelogs we pull from every weekday, with a two-sentence takeaway on why each pick matters."
            />
          )}
        </div>
      )}

      <div className="mt-14">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            {tab === 'article' ? 'Daily AI Articles' : tab === 'rss' ? 'Latest from our feeds' : tab === 'newsletter' ? 'Newsletter picks' : 'Latest'}
          </h2>
          {tab !== 'all' && (
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {shown.length} {shown.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
        {shown.length === 0 ? (
          <p className="py-16 text-center text-muted">Nothing here yet. Check back tomorrow morning.</p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) =>
              item.kind === 'article' ? (
                <li key={`a-${item.slug}`} className="md:col-span-2 lg:col-span-3">
                  <ArticleCard article={item} featured />
                </li>
              ) : (
                <li key={item.id}>
                  <CuratedCard item={item} />
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    </>
  );
}

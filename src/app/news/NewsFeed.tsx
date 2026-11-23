'use client';

import { useEffect, useState } from 'react';
import type { NewsFeedItem } from '@/lib/news-types';
import { ArticleCard, CuratedCard } from '@/components/NewsCards';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'article', label: 'Daily Articles' },
  { key: 'rss', label: 'RSS & Feeds' },
  { key: 'newsletter', label: 'Newsletters' },
] as const;

type TabKey = (typeof tabs)[number]['key'];
const isTab = (v: string | null): v is TabKey => !!v && tabs.some((t) => t.key === v);

export function NewsFeed({ items }: { items: NewsFeedItem[] }) {
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
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.key ? 'bg-navy text-white' : 'border border-line bg-white text-muted hover:text-ink'
            }`}
          >
            {t.label}
            <span className={`ml-2 font-mono text-[11px] ${tab === t.key ? 'text-white/60' : 'text-muted/70'}`}>{counts[t.key]}</span>
          </button>
        ))}
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
    </>
  );
}

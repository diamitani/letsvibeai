import Link from 'next/link';
import { ArrowUpRight, Mail, Newspaper, Rss } from 'lucide-react';
import type { CuratedItem, NewsArticle } from '@/lib/news-types';
import { formatNewsDate } from '@/lib/news-types';

export function SourceBadge({ type, source }: { type: 'article' | 'rss' | 'newsletter'; source?: string }) {
  const map = {
    article: { label: 'Daily Article', Icon: Newspaper, cls: 'bg-signal/10 text-signal' },
    rss: { label: 'RSS', Icon: Rss, cls: 'bg-growth/10 text-[#0b8f70]' },
    newsletter: { label: 'Newsletter', Icon: Mail, cls: 'bg-violet/10 text-violet' },
  } as const;
  const { label, Icon, cls } = map[type];
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider ${cls}`}>
        <Icon className="h-3 w-3" aria-hidden /> {label}
      </span>
      {source && <span className="text-xs font-semibold text-ink">{source}</span>}
    </span>
  );
}

export function CuratedCard({ item }: { item: CuratedItem }) {
  return (
    <article className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <SourceBadge type={item.type} source={item.source} />
        <time dateTime={item.date} className="shrink-0 font-mono text-[11px] text-muted">
          {formatNewsDate(item.date)}
        </time>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-ink">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
          {item.title}
        </a>
      </h3>
      <div className="mt-3 flex-1 rounded-xl bg-mist px-4 py-3">
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-signal">Why it matters for builders</p>
        <p className="mt-1.5 text-sm leading-6 text-ink/85">{item.takeaway}</p>
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:underline"
      >
        Read at {item.source} <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </article>
  );
}

export function ArticleCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${
        featured ? 'hero-bg text-white' : 'border border-line bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-signal">
          <Newspaper className="h-3 w-3" aria-hidden /> Daily Article
        </span>
        <time dateTime={article.date} className={`font-mono text-[11px] ${featured ? 'text-white/60' : 'text-muted'}`}>
          {formatNewsDate(article.date)} · {article.readTime}
        </time>
      </div>
      <h3 className={`mt-5 font-bold tracking-tight ${featured ? 'text-2xl leading-tight sm:text-3xl' : 'text-xl leading-snug text-ink'}`}>
        <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      {article.description && (
        <p className={`mt-3 flex-1 leading-7 ${featured ? 'text-white/75' : 'text-muted'}`}>{article.description}</p>
      )}
      {article.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {article.tags.slice(0, 4).map((t) => (
            <li
              key={t}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${featured ? 'bg-white/10 text-white/80' : 'bg-navy/5 text-ink/70'}`}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${featured ? 'text-growth' : 'text-signal'}`}>
        Read the article <ArrowUpRight className="h-4 w-4" aria-hidden />
      </span>
    </article>
  );
}

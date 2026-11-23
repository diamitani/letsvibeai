import Link from 'next/link';
import { ArrowUpRight, Mail, Newspaper, Rss } from 'lucide-react';
import type { CuratedItem, NewsArticle, NewsSourceWithCount } from '@/lib/news-types';
import { formatNewsDate, storyLabel } from '@/lib/news-types';

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

export function SourceCard({ source }: { source: NewsSourceWithCount }) {
  const isNewsletter = source.kind === 'newsletter';
  return (
    <article className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift" id={source.id}>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider ${
            isNewsletter ? 'bg-violet/10 text-violet' : 'bg-growth/10 text-[#0b8f70]'
          }`}
        >
          {isNewsletter ? <Mail className="h-3 w-3" aria-hidden /> : <Rss className="h-3 w-3" aria-hidden />}
          {source.category}
        </span>
        <span className="shrink-0 font-mono text-[11px] text-muted">{storyLabel(source.storyCount)} pulled</span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-ink">{source.name}</h3>
      {source.description && <p className="mt-2 flex-1 text-sm leading-6 text-muted">{source.description}</p>}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
        <a href={source.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-signal hover:underline">
          Visit site <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        {source.url ? (
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ink hover:underline">
            <Rss className="h-3.5 w-3.5" aria-hidden /> RSS
          </a>
        ) : (
          <span className="font-medium text-muted">Subscribe on their site</span>
        )}
        {source.storyCount > 0 && (
          <Link href={`/news?type=${source.kind}`} className="text-muted hover:text-ink hover:underline">
            See our picks
          </Link>
        )}
      </div>
    </article>
  );
}

export function SourceDirectory({
  sources,
  title,
  description,
  id,
}: {
  sources: NewsSourceWithCount[];
  title: string;
  description?: string;
  id?: string;
}) {
  if (sources.length === 0) return null;
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
          {description && <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted">{description}</p>}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{sources.length} sources</p>
      </div>
      <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <li key={source.id}>
            <SourceCard source={source} />
          </li>
        ))}
      </ul>
    </section>
  );
}

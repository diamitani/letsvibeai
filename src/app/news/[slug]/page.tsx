import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Markdown } from '@/components/Markdown';
import { CuratedCard } from '@/components/NewsCards';
import { getCourse } from '@/lib/catalog';
import { formatNewsDate, getCurated, getNewsArticle, getNewsArticles } from '@/lib/news';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { siteUrl } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  return getNewsArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getNewsArticle(slug);
  if (!a) return pageMeta({ title: 'Vibe News', path: `/news/${slug}` });
  const base = pageMeta({ title: a.title, description: a.description, path: `/news/${a.slug}` });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: 'article', publishedTime: a.date, tags: a.tags },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const courses = (article.relatedCourses.length ? article.relatedCourses : ['vibe-coding'])
    .map((s) => getCourse(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const picks = getCurated().slice(0, 3);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: site.name, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/news/${article.slug}`,
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <article className="wrap py-12 sm:py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="mx-auto max-w-prose">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Vibe News
          </Link>
          <p className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-signal">Daily AI Article</p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">{article.title}</h1>
          {article.description && <p className="mt-5 text-lg leading-8 text-muted">{article.description}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-4 font-mono text-xs text-muted">
            <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
            <span aria-hidden className="text-line">/</span>
            <span>{article.readTime}</span>
            <span aria-hidden className="text-line">/</span>
            <span>{article.author}</span>
          </div>
          {article.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <li key={t} className="rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-medium text-ink/70">
                  {t}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10">
            <Markdown content={article.body} className="prose-lv prose-news" />
          </div>
        </div>
      </article>

      {courses.length > 0 && (
        <section className="hero-bg relative overflow-hidden text-white">
          <div className="wrap relative py-14">
            <p className="eyebrow text-growth">Turn the news into skills</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight">Go from reading about it to shipping it</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                      {c.level} · {c.lessons.length} lessons
                    </p>
                    <p className="mt-2 text-xl font-bold">{c.title}</p>
                    <p className="mt-2 flex-1 text-sm leading-6 text-white/70">{c.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-growth">
                      Start free <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {picks.length > 0 && (
        <section className="wrap py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">More from Vibe News</h2>
            <Link href="/news" className="text-sm font-semibold text-signal hover:underline">
              See all news
            </Link>
          </div>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {picks.map((p) => (
              <li key={p.id}>
                <CuratedCard item={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

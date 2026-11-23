import fs from 'fs';
import path from 'path';
import { parseDoc, firstHeading } from './markdown';
import type { CuratedItem, NewsArticle, NewsFeedItem, NewsSource, NewsSourceWithCount } from './news-types';

export * from './news-types';

const newsRoot = path.join(process.cwd(), 'content/news');

const sortKey = (date: string) => {
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
};

const list = (v?: string) =>
  (v || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export function readingTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 225))} min read`;
}

export function getNewsArticles(): NewsArticle[] {
  const dir = path.join(newsRoot, 'articles');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const { meta, body } = parseDoc(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        slug,
        title: meta.title || firstHeading(body) || slug,
        description: meta.description || '',
        date: meta.date || slug.slice(0, 10),
        tags: list(meta.tags),
        author: meta.author || 'LetsVibeAI Editorial',
        relatedCourses: list(meta.relatedCourses),
        readTime: meta.readTime || readingTime(body),
        body,
      };
    })
    .sort((a, b) => sortKey(b.date) - sortKey(a.date));
}

export function getNewsArticle(slug: string) {
  return getNewsArticles().find((a) => a.slug === slug);
}

export function getCurated(): CuratedItem[] {
  const file = path.join(newsRoot, 'curated.json');
  if (!fs.existsSync(file)) return [];
  const items = JSON.parse(fs.readFileSync(file, 'utf8')) as CuratedItem[];
  return items
    .filter((i) => i && i.title && i.url && /^https?:\/\//.test(i.url))
    .sort((a, b) => sortKey(b.date) - sortKey(a.date));
}

export function getNewsFeed(): NewsFeedItem[] {
  const articles: NewsFeedItem[] = getNewsArticles().map((a) => ({ kind: 'article', ...a }));
  const curated: NewsFeedItem[] = getCurated().map((c) => ({ kind: c.type, ...c }));
  return [...articles, ...curated].sort((a, b) => {
    const d = sortKey(b.date) - sortKey(a.date);
    if (d !== 0) return d;
    return a.kind === 'article' ? -1 : b.kind === 'article' ? 1 : 0;
  });
}

interface FeedsFile {
  rss?: Array<Omit<NewsSource, 'kind'> & { url?: string }>;
  newsletters?: Array<Omit<NewsSource, 'kind'> & { url?: string; via?: 'rss' | 'gmail' }>;
}

function normalizeSource(entry: Omit<NewsSource, 'kind'> & { url?: string; via?: 'rss' | 'gmail' }, kind: 'rss' | 'newsletter'): NewsSource {
  return {
    id: entry.id,
    kind,
    name: entry.name,
    site: entry.site,
    category: entry.category || (kind === 'newsletter' ? 'Newsletter' : 'Feed'),
    description: entry.description || '',
    url: entry.url,
    via: entry.via || (kind === 'newsletter' ? (entry.url ? 'rss' : 'gmail') : 'rss'),
  };
}

export function getNewsSources(): NewsSource[] {
  const file = path.join(newsRoot, 'feeds.json');
  if (!fs.existsSync(file)) return [];
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as FeedsFile;
  const rss = (data.rss || []).map((s) => normalizeSource(s, 'rss'));
  const newsletters = (data.newsletters || []).map((s) => normalizeSource(s, 'newsletter'));
  return [...newsletters, ...rss];
}

export function getRssSources(): NewsSource[] {
  return getNewsSources().filter((s) => s.kind === 'rss');
}

export function getNewsletterSources(): NewsSource[] {
  return getNewsSources().filter((s) => s.kind === 'newsletter');
}

export function withStoryCounts(sources: NewsSource[], curated: CuratedItem[] = getCurated()): NewsSourceWithCount[] {
  const counts = new Map<string, number>();
  for (const item of curated) {
    counts.set(item.source, (counts.get(item.source) || 0) + 1);
  }
  return sources.map((s) => ({ ...s, storyCount: counts.get(s.name) || 0 }));
}

export function getRssSourcesWithCounts() {
  return withStoryCounts(getRssSources());
}

export function getNewsletterSourcesWithCounts() {
  return withStoryCounts(getNewsletterSources());
}

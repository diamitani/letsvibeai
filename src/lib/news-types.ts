// Shared, client-safe news types and helpers (no Node APIs).

export type NewsType = 'article' | 'rss' | 'newsletter';

export interface NewsArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  relatedCourses: string[];
  readTime: string;
  body: string;
}

export interface CuratedItem {
  id: string;
  type: 'rss' | 'newsletter';
  source: string;
  title: string;
  url: string;
  date: string;
  takeaway: string;
  tags?: string[];
}

export interface NewsSource {
  id: string;
  kind: 'rss' | 'newsletter';
  name: string;
  site: string;
  category: string;
  description: string;
  /** Public RSS/Atom URL, when the source publishes one. */
  url?: string;
  via?: 'rss' | 'gmail';
}

export interface NewsSourceWithCount extends NewsSource {
  storyCount: number;
}

export type NewsFeedItem =
  | ({ kind: 'article' } & NewsArticle)
  | ({ kind: 'rss' | 'newsletter' } & CuratedItem);

export function formatNewsDate(date: string) {
  const t = Date.parse(`${date}T12:00:00Z`);
  if (Number.isNaN(t)) return date;
  return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function storyLabel(count: number) {
  return `${count} ${count === 1 ? 'story' : 'stories'}`;
}

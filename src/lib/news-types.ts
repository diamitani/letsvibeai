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

export type NewsFeedItem =
  | ({ kind: 'article' } & NewsArticle)
  | ({ kind: 'rss' | 'newsletter' } & CuratedItem);

export function formatNewsDate(date: string) {
  const t = Date.parse(`${date}T12:00:00Z`);
  if (Number.isNaN(t)) return date;
  return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

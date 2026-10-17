export interface RSSArticle {
  id: string;
  title: string;
  summary: string;
  link: string;
  feedName: string;
  publishedAt: string;
  image?: string;
  aiRelevanceScore?: number;
  credibilityScore?: number;
}

export interface RSSFeed {
  name: string;
  url: string;
  category: 'ai-news' | 'machine-learning' | 'developer-tools' | 'research' | 'startup';
}

export interface CuratedArticle {
  article: RSSArticle;
  rankingScore: number;
  reason: string;
}

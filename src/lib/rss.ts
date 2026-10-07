// ─────────────────────────────────────────────────────────────
// LetsVibeAI — Live RSS & AI Intelligence Feed Client
// Fetches, normalizes, and filters AI news from top 100 sources.
// ─────────────────────────────────────────────────────────────

import { INITIAL_AI_ARTICLES, TOP_AI_SOURCES, type AIArticle, type AIFeedSource } from '../data/aiFeeds';

const CACHE_KEY = 'letsvibeai_rss_articles_v1';
const CACHE_TIMESTAMP_KEY = 'letsvibeai_rss_timestamp_v1';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function fetchLiveAIFeeds(): Promise<AIArticle[]> {
  // Check localStorage cache in browser
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp, 10);
        if (age < CACHE_DURATION_MS) {
          return JSON.parse(cached) as AIArticle[];
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // Select top active RSS endpoints for dynamic live polling
  const liveFeeds = TOP_AI_SOURCES.slice(0, 6);
  const liveArticles: AIArticle[] = [];

  const fetchPromises = liveFeeds.map(async (source) => {
    try {
      // Use rss2json free conversion endpoint
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.rssUrl)}`,
        { signal: AbortSignal.timeout(4000) }
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items)) {
        for (const item of data.items.slice(0, 3)) {
          const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
          const cleanSummary = (item.description || item.content || '')
            .replace(/<[^>]*>?/gm, '')
            .replace(/&nbsp;/g, ' ')
            .trim()
            .slice(0, 180);

          liveArticles.push({
            id: `live-${source.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            title: item.title?.trim() || 'Untitled AI Briefing',
            source: source.name,
            sourceCategory: source.category,
            url: item.link || source.website,
            publishedAt: pubDate,
            readTime: '4 min read',
            summary: cleanSummary ? (cleanSummary.endsWith('.') ? cleanSummary : cleanSummary + '...') : source.description,
            tags: [source.category.replace('Top ', ''), 'AI News', 'Live Feed'],
          });
        }
      }
    } catch {
      // Gracefully continue if network/CORS error
    }
  });

  try {
    await Promise.allSettled(fetchPromises);
  } catch {
    // Ignore all fetch failures
  }

  // Merge live items with curated database
  const combined = [...liveArticles, ...INITIAL_AI_ARTICLES];
  
  // Deduplicate by URL or title
  const seen = new Set<string>();
  const uniqueArticles: AIArticle[] = [];
  for (const art of combined) {
    const key = art.url.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueArticles.push(art);
    }
  }

  // Save to cache
  if (typeof window !== 'undefined' && uniqueArticles.length > 0) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(uniqueArticles));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch {
      // Ignore storage errors
    }
  }

  return uniqueArticles.length > 0 ? uniqueArticles : INITIAL_AI_ARTICLES;
}

export function filterArticles(
  articles: AIArticle[],
  options: {
    category?: string;
    searchQuery?: string;
    selectedSource?: string;
    onlyOriginals?: boolean;
  }
): AIArticle[] {
  const { category, searchQuery, selectedSource, onlyOriginals } = options;
  const q = (searchQuery || '').trim().toLowerCase();

  return articles.filter((a) => {
    if (onlyOriginals && !a.isOriginal) return false;
    
    if (category && category !== 'All Intelligence') {
      if (a.sourceCategory !== category) return false;
    }

    if (selectedSource && a.source !== selectedSource) {
      return false;
    }

    if (q) {
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchSummary = a.summary.toLowerCase().includes(q);
      const matchSource = a.source.toLowerCase().includes(q);
      const matchTags = a.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchSource && !matchTags) {
        return false;
      }
    }

    return true;
  });
}

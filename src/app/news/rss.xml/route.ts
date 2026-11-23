import { getNewsFeed } from '@/lib/news';
import { site } from '@/lib/site';
import { siteUrl } from '@/lib/utils';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const rfc822 = (date: string) => {
  const t = Date.parse(`${date}T12:00:00Z`);
  return new Date(Number.isNaN(t) ? Date.now() : t).toUTCString();
};

export function GET() {
  const items = getNewsFeed()
    .slice(0, 50)
    .map((i) => {
      const isArticle = i.kind === 'article';
      const link = isArticle ? `${siteUrl}/news/${i.slug}` : i.url;
      const guid = isArticle ? link : `${siteUrl}/news#${i.id}`;
      const desc = isArticle ? i.description : `${i.takeaway} (via ${i.source})`;
      const cat = isArticle ? 'Daily Article' : i.kind === 'rss' ? `RSS · ${i.source}` : `Newsletter · ${i.source}`;
      return `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="${isArticle}">${esc(guid)}</guid>
      <pubDate>${rfc822(i.date)}</pubDate>
      <category>${esc(cat)}</category>
      <description>${esc(desc)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${site.name} · Vibe News`)}</title>
    <link>${siteUrl}/news</link>
    <atom:link href="${siteUrl}/news/rss.xml" rel="self" type="application/rss+xml" />
    <description>Daily AI news for people who build: original articles plus curated picks for vibe coders.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}

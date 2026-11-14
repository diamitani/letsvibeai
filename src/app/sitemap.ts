import type { MetadataRoute } from 'next';
import { catalog } from '@/lib/catalog';
import { getPosts } from '@/lib/blog';
import { getLibraryItems } from '@/lib/library';
import { siteUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/paths', '/courses', '/library', '/blog', '/workshops', '/pricing', '/about', '/account'];
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
  for (const c of catalog) {
    entries.push({ url: `${siteUrl}/courses/${c.slug}`, changeFrequency: 'monthly', priority: 0.8 });
    for (const l of c.lessons) {
      entries.push({ url: `${siteUrl}/courses/${c.slug}/${l.slug}`, changeFrequency: 'monthly', priority: 0.6 });
    }
  }
  for (const p of getPosts()) {
    entries.push({ url: `${siteUrl}/blog/${p.slug}`, changeFrequency: 'yearly', priority: 0.5 });
  }
  for (const item of getLibraryItems()) {
    entries.push({ url: `${siteUrl}/library/${item.kind}/${item.slug}`, changeFrequency: 'monthly', priority: 0.5 });
  }
  return entries;
}

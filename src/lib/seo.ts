import type { Metadata } from 'next';
import { site } from './site';
import { siteUrl } from './utils';

export function pageMeta({
  title,
  description,
  path = '/',
  image = '/images/og-cover.jpg',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · Idea to shipped product`;
  const desc =
    description ||
    'Free, plain-English courses that take you from a vibe-coded idea to a shipped product — on Lovable, Bolt, v0, Cursor, Claude Code, Windsurf, and the platforms that host it.';
  const url = `${siteUrl}${path}`;
  const og = image.startsWith('http') ? image : `${siteUrl}${image}`;
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: fullTitle,
      description: desc,
      url,
      images: [{ url: og, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [og],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

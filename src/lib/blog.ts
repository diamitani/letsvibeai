// ─────────────────────────────────────────────────────────────
// Blog loader — reads the real posts in src/content/blog/*.md
// at build time. No hardcoded posts: add a markdown file and it
// appears on the site.
// ─────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
  readTime: string;
  body: string;
}

const rawPosts = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) data[key] = value;
  }
  return { data, body: match[2].trim() };
}

function parseDate(value: string): number {
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

export const BLOG_POSTS: BlogPost[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path;
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? '',
      type: data.type ?? 'Article',
      readTime: data.readTime ?? '',
      body,
    };
  })
  .sort((a, b) => parseDate(b.date) - parseDate(a.date));

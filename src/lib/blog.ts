import fs from 'fs';
import path from 'path';
import { parseDoc, firstHeading } from './markdown';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
  readTime: string;
  body: string;
}

function dateSortKey(date: string) {
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
}

export function getPosts(): Post[] {
  const dir = path.join(process.cwd(), 'content/blog');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { meta, body } = parseDoc(raw);
      return {
        slug,
        title: meta.title || firstHeading(body) || slug,
        description: meta.description || '',
        date: meta.date || '',
        type: meta.type || 'Article',
        readTime: meta.readTime || '',
        body,
      };
    })
    .sort((a, b) => dateSortKey(b.date) - dateSortKey(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

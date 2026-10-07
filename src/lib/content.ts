// Loads course lessons, blog posts and toolkit docs from markdown files
// at build time (Vite bundles them as plain strings).
import { marked } from 'marked';
import { COURSE_MODULES } from '../data/courseData';
import type { CourseModule } from '../types';

const lessonFiles = import.meta.glob('/src/content/courses/*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const postFiles = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const resourceFiles = import.meta.glob(['/resources/*.md', '/checklists/*.md'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export interface Lesson {
  slug: string;
  title: string;
  duration: string;
  description: string;
  body: string;
  module?: CourseModule; // extra content for the Vibe Coding course (analogy, prompt, quiz…)
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  type: string;
  readTime: string;
  description: string;
  image: string;
  body: string;
}

function frontmatter(raw: string) {
  const meta: Record<string, string> = {};
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta, body: raw };
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: raw.slice(m[0].length) };
}

const fileSlug = (path: string) => path.split('/').pop()!.replace(/\.md$/, '').replace(/^\d+-/, '');

const cache: Record<string, Lesson[]> = {};

export function getLessons(courseSlug: string): Lesson[] {
  if (cache[courseSlug]) return cache[courseSlug];
  const prefix = `/src/content/courses/${courseSlug}/`;
  const lessons = Object.keys(lessonFiles)
    .filter((p) => p.startsWith(prefix))
    .sort()
    .map((path, i) => {
      const { meta, body } = frontmatter(lessonFiles[path]);
      const mod = courseSlug === 'vibe-coding' ? COURSE_MODULES[i] : undefined;
      const h1 = body.match(/^#\s+(?:Module \d+\s*[—-]\s*)?(.+)$/m)?.[1]?.trim() ?? '';
      return {
        slug: fileSlug(path),
        title: mod?.title || meta.title || h1,
        duration: mod?.estimatedHours || meta.duration || '',
        description: mod?.tagline || meta.description || '',
        body: body.replace(/^#\s+.*\n/, '').replace(/\n---\s*\n+\[Course home\][\s\S]*$/, '\n'),
        module: mod,
      };
    });
  cache[courseSlug] = lessons;
  return lessons;
}

export function getLesson(courseSlug: string, lessonSlug: string) {
  const lessons = getLessons(courseSlug);
  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return null;
  return { lesson: lessons[index], index, lessons, prev: lessons[index - 1], next: lessons[index + 1] };
}

export const totalLessons = () =>
  Object.keys(lessonFiles).length;

const postImages: Record<string, string> = {
  'ai-today-whats-moving': '/images/features-bg.jpg',
  'livebuildai-october-6': '/images/features-bg.jpg',
  'livebuildai-september-9': '/images/about-hero.jpg',
  'livebuildai-september-8': '/images/event-group.jpg',
  'free-perplexity-pro-comet': '/images/build-outreach.jpg',
};

export function getPosts(): Post[] {
  return Object.keys(postFiles)
    .map((path) => {
      const slug = fileSlug(path);
      const { meta, body } = frontmatter(postFiles[path]);
      return {
        slug,
        title: meta.title,
        date: meta.date,
        type: meta.type || 'Article',
        readTime: meta.readTime || '',
        description: meta.description || excerpt(body),
        image: postImages[slug] || '/images/hero.jpg',
        body,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function getResource(name: string) {
  const key = Object.keys(resourceFiles).find((k) => k.endsWith(`/${name}.md`));
  return key ? resourceFiles[key] : '';
}

export function toHtml(markdown: string) {
  return marked.parse(markdown, { async: false }) as string;
}

export function excerpt(markdown: string, length = 150) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#.*$/gm, '')
    .replace(/[*_`>#|]/g, '')
    .replace(/^\s*-\s+/gm, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > length ? text.slice(0, length).replace(/\s\S*$/, '') + '…' : text;
}

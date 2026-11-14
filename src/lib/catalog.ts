import fs from 'fs';
import path from 'path';
import { courses as legacy } from './courses-legacy';
import { parseDoc, firstHeading } from './markdown';
import videoMeta from '../../content/videos.json';

export interface Lesson {
  slug: string;
  number: number;
  title: string;
  summary: string;
  minutes: number;
  duration: string;
  videoId?: string;
  notes: string;
}

export interface Course {
  slug: string;
  folder: string;
  title: string;
  short: string;
  tagline: string;
  summary: string;
  level: string;
  unit: string;
  kind: 'video' | 'reading';
  accent: string;
  trailerId?: string;
  trailerSrc?: string;
  poster: string;
  outcomes: string[];
  whoFor: string;
  lessons: Lesson[];
}

const contentRoot = path.join(process.cwd(), 'content');
const meta = videoMeta as Record<string, { seconds: number }>;

export const videoSrc = (id: string) => `/videos/lessons/${id}.mp4`;
export const posterSrc = (id: string) => `/images/lessons/${id}.jpg`;
export const transcriptSrc = (id: string) => `/transcripts/${id}.json`;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

function readMinutes(front: Record<string, string>, body: string) {
  const d = front.duration?.match(/(\d+(?:\.\d+)?)\s*(min|hour|hr)/i);
  if (d) return Math.round(parseFloat(d[1]) * (/h/i.test(d[2]) ? 60 : 1));
  return Math.max(3, Math.round(body.split(/\s+/).length / 200));
}

function loadLessons(folder: string, videoFor?: (fileSlug: string) => string | undefined): Lesson[] {
  const dir = path.join(contentRoot, 'courses', folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const number = parseInt(slug, 10) || 0;
      const { meta: m, body } = parseDoc(raw);
      const videoId = videoFor?.(slug);
      const secs = videoId ? meta[videoId]?.seconds : undefined;
      const minutes = secs ? Math.max(1, Math.round(secs / 60)) : readMinutes(m, body);
      return {
        slug,
        number,
        title: m.title || firstHeading(body)?.replace(/^(Module|Day|Lab)\s*\d+\s*[—:-]\s*/i, '') || slug,
        summary: m.description || '',
        minutes,
        duration: secs ? clock(secs) : m.duration || `~${minutes} min`,
        videoId: videoId && meta[videoId] ? videoId : undefined,
        notes: body,
      };
    });
}

const vibe: Course = {
  slug: 'vibe-coding',
  folder: 'vibe-coding',
  title: 'Vibe Coding: Idea to Shipped App',
  short: 'Vibe Coding',
  tagline: "You Don't Need to Learn to Code — You Need to Learn How Software Fits Together",
  summary:
    'The flagship architecture-first course: learn how modern software fits together, direct AI agents with precision, and ship a real production product.',
  level: 'Beginner',
  unit: 'Module',
  kind: 'video',
  accent: 'from-signal via-violet to-growth',
  trailerSrc: '/videos/letsvibeai-course-vibe-coding.mp4',
  poster: '/images/course-vibe-coding-poster.jpg',
  outcomes: [
    'Turn a vague idea into a buildable, production-ready specification',
    'Master the 11 software building blocks: front end, back end, auth, database, and payments',
    'Direct AI agents with precision using architecture maps and PRDs',
    'Ship safely with a pre-launch checklist on your custom domain',
  ],
  whoFor:
    'Founders, operators, marketers, creators, educators and career changers who want to build real software with AI — without a computer-science background.',
  lessons: loadLessons('vibe-coding', (s) => `vc-${s}`),
};

const claude: Course = {
  slug: 'claude-code',
  folder: 'claude-mastery',
  title: 'Claude Code Mastery',
  short: 'Claude Code',
  tagline: 'Stop typing code. Start directing an AI agent.',
  summary:
    'Ten short video lessons that take you from installing an agent harness to running subagents and rolling Claude out to a team, in plain English.',
  level: 'Beginner → Intermediate',
  unit: 'Lesson',
  kind: 'video',
  accent: 'from-signal via-violet to-growth',
  trailerId: 'cm-00-promo',
  poster: '/images/course-claude-mastery-poster.jpg',
  outcomes: [
    'Install Claude Code (or any harness) and know the five layers under the hood',
    'Write CLAUDE.md context files so every session starts smart',
    'Package your expertise as reusable skills and slash commands',
    'Plug Claude into your tools with connectors and MCP',
    'Plan, build and ship with agents and subagents',
    'Set up guardrails so a whole team can use it safely',
  ],
  whoFor:
    'Founders, operators, marketers and career changers who want AI to do real work, without a computer-science background.',
  lessons: loadLessons('claude-mastery', (s) => (s.startsWith('00') ? 'cm-00-promo' : `cm-${s}`)),
};

const cowork: Course = {
  slug: 'claude-cowork',
  folder: 'claude-cowork',
  title: 'Claude Cowork: Your AI Coworker',
  short: 'Cowork',
  tagline: 'Hand Claude the busywork. Keep the judgment.',
  summary:
    'Ten video lessons on Claude Cowork: set it up, organise work in projects, build artifacts, add skills, connectors and plugins, run agents and automations, and use it safely at work.',
  level: 'Beginner',
  unit: 'Lesson',
  kind: 'video',
  accent: 'from-growth via-signal to-violet',
  trailerId: 'cw-00-trailer',
  poster: '/images/course-frontier-platforms-poster.jpg',
  outcomes: [
    'Know what Cowork is and when to use it instead of chat',
    'Set up projects that remember your files and instructions',
    'Turn requests into finished artifacts: docs, decks, sheets and pages',
    'Extend Cowork with skills, connectors and plugins',
    'Delegate multi-step work to agents and scheduled automations',
    'Keep company data safe and show the skill on your résumé',
  ],
  whoFor:
    'Anyone who works on a computer: sales, marketing, ops, HR, finance, students and job seekers. No coding needed.',
  lessons: loadLessons('claude-cowork', (s) => (s.startsWith('00') ? 'cw-00-trailer' : `cw-${s}`)),
};

const legacyAccents = ['from-violet to-signal', 'from-growth to-growth', 'from-signal to-growth', 'from-violet to-growth'];

const readingCourses: Course[] = legacy
  .filter((c) => c.slug !== 'vibe-coding')
  .map((c, i) => ({
    slug: c.slug,
    folder: c.slug,
    title: c.title,
    short: c.title.split(':')[0],
    tagline: c.intro.heading,
    summary: c.summary,
    level: c.level,
    unit: c.unit,
    kind: 'reading' as const,
    accent: legacyAccents[i % legacyAccents.length],
    trailerSrc: c.video,
    poster: c.videoPoster || c.image,
    outcomes: c.helpsWith,
    whoFor: c.whoFor,
    lessons: loadLessons(c.slug),
  }));

export const catalog: Course[] = [vibe, claude, cowork, ...readingCourses];
export const videoCourses = catalog.filter((c) => c.kind === 'video');
export const readingCatalog = catalog.filter((c) => c.kind === 'reading');

export const getCourse = (slug: string) =>
  catalog.find((c) => c.slug === slug) || (slug === 'claude-mastery' ? claude : undefined);

export const courseMinutes = (c: Course) => c.lessons.reduce((n, l) => n + l.minutes, 0);

export const totalVideoLessons = videoCourses.reduce((n, c) => n + c.lessons.filter((l) => l.videoId).length, 0);

export const videoMinutesTotal = videoCourses.reduce((n, c) => n + courseMinutes(c), 0);

export function hoursLabel(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.round((minutes / 60) * 10) / 10;
  return `${h} hr`;
}

/** Serializable course summary for client components (no lesson notes). */
export function slimCourse(c: Course) {
  return {
    slug: c.slug,
    title: c.title,
    short: c.short,
    summary: c.summary,
    level: c.level,
    unit: c.unit,
    kind: c.kind,
    poster: c.poster,
    lessonCount: c.lessons.length,
    minutes: courseMinutes(c),
    lessons: c.lessons.map((l) => ({
      slug: l.slug,
      number: l.number,
      title: l.title,
      duration: l.duration,
      minutes: l.minutes,
      videoId: l.videoId,
    })),
  };
}

export type SlimCourse = ReturnType<typeof slimCourse>;

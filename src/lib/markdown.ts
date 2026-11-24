import { marked } from 'marked';

export interface Doc {
  meta: Record<string, string>;
  body: string;
}

export function parseDoc(raw: string): Doc {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: raw.slice(m[0].length) };
}

export const renderMarkdown = (md: string) => marked.parse(md, { async: false }) as string;

export const firstHeading = (md: string) => md.match(/^#\s+(.+)$/m)?.[1]?.trim();

/**
 * Lesson markdown is authored as a GitHub-style curriculum, so its footer links point at
 * sibling files (`./02-ai-fundamentals.md`, `../README.md`, `../capstone/README.md`).
 * On the site those resolve to dead URLs like `/courses/vibe-coding/02-ai-fundamentals.md`.
 * Rewrite every relative link to its real route before rendering.
 */
export function resolveLessonLinks(md: string, courseSlug: string, lessonSlugs: string[]) {
  const courseHome = `/courses/${courseSlug}`;
  const map = (target: string) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(target)) return target; // absolute, protocol, or anchor
    const [file, hash = ''] = target.split('#');
    const anchor = hash ? `#${hash}` : '';
    const clean = file.replace(/^\.\//, '');
    if (/^\.\.\/capstone(?:\/|$)/i.test(clean)) return `/library/checklists/capstone${anchor}`;
    if (/^\.\.\/(?:README(?:\.md)?)?$/i.test(clean) || /^README(?:\.md)?$/i.test(clean)) return `${courseHome}${anchor}`;
    const name = clean.split('/').pop()?.replace(/\.md$/i, '') ?? '';
    if (!clean.includes('../') && lessonSlugs.includes(name)) return `${courseHome}/${name}${anchor}`;
    return courseHome;
  };
  return md.replace(/(!?\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g, (all, open: string, target: string, close: string) =>
    open.startsWith('!') ? all : `${open}${map(target)}${close}`,
  );
}

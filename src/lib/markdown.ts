import { marked } from 'marked';

export interface Doc {
  meta: Record<string, string>;
  body: string;
}

// Reads the `--- key: value ---` block at the top of a markdown file.
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

// Content is written by us (repo files), so rendering HTML from it is safe.
export const renderMarkdown = (md: string) => marked.parse(md, { async: false }) as string;

// First "# Heading" in a file, used as a title fallback.
export const firstHeading = (md: string) => md.match(/^#\s+(.+)$/m)?.[1]?.trim();

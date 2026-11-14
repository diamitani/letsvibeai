import fs from 'fs';
import path from 'path';
import { parseDoc, firstHeading } from './markdown';

export type LibraryKind = 'prompts' | 'templates' | 'checklists' | 'glossary';

export interface LibraryItem {
  kind: LibraryKind;
  slug: string;
  title: string;
  summary: string;
  source: string;
  body: string;
  prompt?: string;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function firstParagraph(md: string) {
  const lines = md
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && !l.startsWith('```') && !l.startsWith('|'));
  return (lines[0] || '').replace(/^[-*]\s+/, '').slice(0, 220);
}

function loadMarkdownFile(rel: string, kind: LibraryKind, slug: string, titleHint?: string, source?: string): LibraryItem {
  const raw = fs.readFileSync(path.join(process.cwd(), rel), 'utf8');
  const { meta, body } = parseDoc(raw);
  return {
    kind,
    slug,
    title: titleHint || meta.title || firstHeading(body) || slug,
    summary: meta.description || firstParagraph(body),
    source: source || rel.replace(/^content\//, ''),
    body: body.trim(),
  };
}

function loadPrompts(): LibraryItem[] {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content/resources/prompt-library.md'), 'utf8');
  const parts = raw.split(/\n(?=## )/);
  const items: LibraryItem[] = [];
  for (const part of parts) {
    if (!part.startsWith('## ')) continue;
    const title = part.split('\n')[0].replace(/^##\s+/, '').trim();
    const body = part.split('\n').slice(1).join('\n').trim();
    const fence = body.match(/```[a-z]*\n([\s\S]*?)```/);
    items.push({
      kind: 'prompts',
      slug: slugify(title),
      title,
      summary: firstParagraph(body.replace(/```[\s\S]*?```/g, '')),
      source: 'resources/prompt-library.md',
      body,
      prompt: fence ? fence[1].trim() : undefined,
    });
  }
  return items;
}

function loadDir(rel: string, kind: LibraryKind, prefix = ''): LibraryItem[] {
  const dir = path.join(process.cwd(), rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => {
      const slug = slugify(`${prefix}${file.replace(/\.md$/, '')}`);
      return loadMarkdownFile(path.join(rel, file), kind, slug, undefined, path.join(rel, file).replace(/^.*?content\//, ''));
    });
}

let cache: LibraryItem[] | null = null;

export function getLibraryItems(): LibraryItem[] {
  if (cache) return cache;
  const docs = loadDir('content/templates/docs', 'templates', 'doc-');
  const ctx = loadDir('content/templates/context', 'templates', 'context-');
  const checks = loadDir('content/checklists', 'checklists');
  const glossary = loadMarkdownFile(
    'content/resources/glossary.md',
    'glossary',
    'glossary',
    'Glossary',
    'resources/glossary.md',
  );
  cache = [...loadPrompts(), ...docs, ...ctx, ...checks, glossary];
  return cache;
}

export function getLibraryItem(kind: string, slug: string) {
  return getLibraryItems().find((i) => i.kind === kind && i.slug === slug);
}

export const libraryKinds: { kind: LibraryKind; label: string; blurb: string }[] = [
  { kind: 'prompts', label: 'Prompts', blurb: 'Copy-paste prompts from the courses, in build order.' },
  { kind: 'templates', label: 'Templates', blurb: 'The 11-document planning stack and project context files.' },
  { kind: 'checklists', label: 'Checklists', blurb: 'Pre-launch, capstone, and agent-review checklists.' },
  { kind: 'glossary', label: 'Glossary', blurb: 'Plain-English terms used across the curriculum.' },
];

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyButton } from '@/components/CopyButton';
import { Markdown } from '@/components/Markdown';
import { getLibraryItem, getLibraryItems } from '@/lib/library';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return getLibraryItems().map((i) => ({ kind: i.kind, slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  const item = getLibraryItem(kind, slug);
  if (!item) return pageMeta({ title: 'Library', path: `/library/${kind}/${slug}` });
  return pageMeta({
    title: item.title,
    description: item.summary || item.title,
    path: `/library/${item.kind}/${item.slug}`,
  });
}

export default async function LibraryItemPage({ params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  const item = getLibraryItem(kind, slug);
  if (!item) notFound();
  return (
    <div className="wrap py-12 sm:py-16">
      <p className="eyebrow text-signal">
        <Link href="/library" className="hover:underline">Library</Link>
        <span className="mx-2 text-line">/</span>
        {item.kind}
      </p>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <h1 className="max-w-3xl text-display">{item.title}</h1>
        {item.prompt && <CopyButton text={item.prompt} />}
      </div>
      <p className="mt-3 font-mono text-xs text-muted">Source: {item.source}</p>
      <article className="mt-10 max-w-prose">
        <Markdown content={item.body} />
      </article>
    </div>
  );
}

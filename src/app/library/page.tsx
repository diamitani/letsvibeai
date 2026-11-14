import Link from 'next/link';
import { getLibraryItems, libraryKinds } from '@/lib/library';
import { CopyButton } from '@/components/CopyButton';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Library',
  description: 'Prompts, planning templates, and checklists from the LetsVibeAI curriculum — ready to copy into Cursor, Claude Code, Lovable, Bolt or v0.',
  path: '/library',
});

export default function LibraryPage() {
  const items = getLibraryItems();
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">Library</p>
      <h1 className="mt-3 text-display">Templates, prompts, and checklists</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Everything here is from the open curriculum. Browse, copy a prompt, or open a planning doc and use it on your next build.
      </p>
      <div className="mt-10 flex flex-wrap gap-2">
        {libraryKinds.map((k) => (
          <a key={k.kind} href={`#${k.kind}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-signal/40">
            {k.label} · {items.filter((i) => i.kind === k.kind).length}
          </a>
        ))}
      </div>
      {libraryKinds.map((k) => {
        const group = items.filter((i) => i.kind === k.kind);
        return (
          <section key={k.kind} id={k.kind} className="scroll-mt-24 mt-16">
            <h2 className="text-2xl font-bold tracking-tight">{k.label}</h2>
            <p className="mt-2 text-muted">{k.blurb}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.map((item) => (
                <article key={item.slug} className="card flex flex-col p-5">
                  <p className="eyebrow text-signal">{k.label}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">
                    <Link href={`/library/${item.kind}/${item.slug}`} className="hover:text-signal">
                      {item.title}
                    </Link>
                  </h3>
                  {item.summary && <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">{item.summary}</p>}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <Link href={`/library/${item.kind}/${item.slug}`} className="text-sm font-semibold text-signal hover:underline">
                      Open
                    </Link>
                    {item.prompt && <CopyButton text={item.prompt} />}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

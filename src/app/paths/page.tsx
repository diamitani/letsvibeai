import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCourse } from '@/lib/catalog';
import { processSteps } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Idea to shipped product',
  description: 'The LetsVibeAI path: describe the idea, document the architecture, build with AI agents, and ship on a live URL — on any platform.',
  path: '/paths',
});

const stages = [
  {
    ...processSteps[0],
    courses: ['vibe-coding'],
    lessons: [{ course: 'vibe-coding', slug: '01-what-is-vibe-coding', label: 'What is vibe coding?' }],
    platforms: ['Claude', 'ChatGPT'],
  },
  {
    ...processSteps[1],
    courses: ['vibe-coding'],
    lessons: [{ course: 'vibe-coding', slug: '08-document-stack', label: 'The 11-document planning stack' }],
    platforms: ['The 11 building blocks', 'Library templates'],
  },
  {
    ...processSteps[2],
    courses: ['lovable-fullstack', 'claude-code', 'frontier-platforms'],
    lessons: [],
    platforms: ['Lovable', 'Bolt', 'v0', 'Cursor', 'Claude Code', 'Windsurf'],
  },
  {
    ...processSteps[3],
    courses: ['zero-to-ship', 'project-labs'],
    lessons: [{ course: 'vibe-coding', slug: '10-ship-it', label: 'Ship it' }],
    platforms: ['Supabase', 'Vercel', 'Stripe', 'Custom domains'],
  },
];

export default function PathsPage() {
  return (
    <>
      <section className="border-b border-line bg-white py-16 sm:py-20">
        <div className="wrap max-w-3xl">
          <p className="eyebrow text-signal">The path</p>
          <h1 className="mt-3 text-display">From a vibe-coded idea to a shipped product</h1>
          <p className="mt-4 text-lg leading-7 text-muted">
            You don’t need to learn syntax. You need a clear path: describe the idea, document how the software fits together,
            direct an AI agent, then check and ship on a live URL. These four moves come from the curriculum itself.
          </p>
        </div>
      </section>
      <section className="wrap py-16 sm:py-20">
        <ol className="space-y-10">
          {stages.map((s, i) => (
            <li key={s.title} className="card grid gap-8 p-8 lg:grid-cols-[7rem_1fr]">
              <div>
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{s.title}</h2>
                <p className="mt-2 max-w-2xl leading-7 text-muted">{s.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.platforms.map((p) => (
                    <span key={p} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink">
                      {p}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.courses.map((slug) => {
                    const c = getCourse(slug);
                    if (!c) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/courses/${slug}`} className="font-medium text-signal hover:underline">
                          {c.title} <ArrowRight className="inline h-3.5 w-3.5" />
                        </Link>
                      </li>
                    );
                  })}
                  {s.lessons.map((l) => (
                    <li key={l.slug}>
                      <Link href={`/courses/${l.course}/${l.slug}`} className="text-muted hover:text-signal">
                        Lesson: {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/courses/vibe-coding" className="btn-primary">
            Start the flagship course
          </Link>
          <Link href="/library" className="btn-ghost">
            Open the library
          </Link>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { ArrowRight, Clapperboard, Hammer, PlayCircle, Rocket } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';
import { JoinButton } from '@/components/JoinButton';
import { VideoPlayer } from '@/components/VideoPlayer';
import { catalog, posterSrc, readingCatalog, totalVideoLessons, videoCourses, videoMinutesTotal } from '@/lib/catalog';
import { offers, processSteps, site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  description:
    'Don’t learn syntax — learn how modern software fits together. Direct AI agents, master the 11 building blocks, and ship a revenue-ready web app. Free curriculum.',
  path: '/',
});

export default function HomePage() {
  const preview = videoCourses.flatMap((c) =>
    c.lessons
      .filter((l) => l.number > 0 && l.videoId)
      .slice(0, 3)
      .map((l) => ({ c, l })),
  );

  return (
    <>
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="ribbons" aria-hidden />
        <div className="watermark -left-24 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 lg:block" aria-hidden />
        <div className="wrap relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
              <img src="/brand/mark.svg" alt="" className="h-4 w-4" /> From idea to shipped product
            </p>
            <h1 className="mt-6 text-hero">
              You bring the idea.
              <br />
              <span className="grad-text">We guide you to ship it.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Don’t learn syntax — learn how modern software fits together. Direct AI agents with architectural precision,
              master the 11 building blocks, and ship a revenue-ready web app in 10 hands-on modules — on Lovable, Bolt, v0,
              Cursor, Claude Code, Windsurf, and the platforms that host it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/paths" className="btn-primary !px-6 !py-3.5 text-base">
                See the path <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/courses/vibe-coding" className="btn-ghost-dark !px-6 !py-3.5 text-base">
                Start Vibe Coding course
              </Link>
            </div>
            <p className="mt-8 text-xs font-semibold tracking-[0.32em] text-white/60">
              LEARN <span className="text-growth">•</span> BUILD <span className="text-violet">•</span> GROW
            </p>
          </div>
          <div>
            <VideoPlayer
              src="/videos/letsvibeai-course-vibe-coding.mp4"
              poster="/images/course-vibe-coding-poster.jpg"
              title="Vibe Coding: Idea to Shipped App"
            />
            <p className="mt-3 flex items-center gap-2 text-sm text-white/55">
              <PlayCircle className="h-4 w-4 text-growth" /> Watch the Vibe Coding trailer · 100% free curriculum
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <dl className="wrap grid grid-cols-2 gap-y-6 py-8 text-center md:grid-cols-4">
          {[
            [String(totalVideoLessons), 'video lessons'],
            [`${videoMinutesTotal} min`, 'of focused video'],
            [String(catalog.length), 'free courses'],
            ['100%', 'Open curriculum'],
          ].map(([n, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{n}</dd>
              <dd className="mt-1 text-sm text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow text-signal">The path</p>
        <h2 className="mt-3 max-w-2xl text-display">From typist to director in four moves</h2>
        <p className="mt-3 max-w-2xl text-muted">The method from the curriculum, in the order you will actually work.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <div key={s.title} className="card p-6">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
            </div>
          ))}
        </div>
        <Link href="/paths" className="btn-ghost mt-8">
          Walk the full journey <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="eyebrow text-signal">Flagship curriculum</p>
            <h2 className="mt-3 text-display">Pick your learning path</h2>
            <p className="mt-3 text-muted">
              Start with our flagship Vibe Coding curriculum to master software architecture and direct AI agents, or level up with specialized agent training in Claude Code and Cowork.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videoCourses.map((c) => (
              <CourseCard key={c.slug} course={c} large />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-signal">Watch now</p>
            <h2 className="mt-3 text-display">Every lesson is one click away</h2>
          </div>
          <Link href="/courses" className="btn-ghost self-start sm:self-auto">
            All courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map(({ c, l }) => (
            <Link key={c.slug + l.slug} href={`/courses/${c.slug}/${l.slug}`} className="group">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-navy shadow-card">
                <img src={posterSrc(l.videoId!)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-navy">
                    <PlayCircle className="h-6 w-6" />
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-navy/85 px-1.5 py-0.5 font-mono text-[11px] text-white">{l.duration}</span>
              </div>
              <p className="mt-3 font-mono text-[11px] text-muted">
                {c.short} · Lesson {l.number}
              </p>
              <p className="mt-0.5 font-semibold tracking-tight text-ink group-hover:text-signal">{l.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="wrap">
          <p className="eyebrow text-signal">How it works</p>
          <h2 className="mt-3 max-w-2xl text-display">Watch, do the mission, ship</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Clapperboard, title: 'Watch', body: 'A two-minute video explains one idea with a real-world analogy. No jargon, no fluff.' },
              { icon: Hammer, title: 'Do the mission', body: 'Every lesson ends with a hands-on task. Open Claude next to the video and try it right away.' },
              { icon: Rocket, title: 'Ship', body: 'Stack the lessons and you have a working setup, real automations and a skill you can show at work.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-signal via-violet to-growth text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-bg relative overflow-hidden text-white">
        <div className="ribbons" aria-hidden />
        <div className="wrap relative grid items-center gap-10 py-16 sm:py-20 md:grid-cols-[auto_1fr]">
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-signal via-violet to-growth p-1 shadow-lift sm:h-56 sm:w-56">
            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-navy-900 p-8">
              <img src="/brand/app-icon.svg" alt="LetsVibeAI Academy" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="max-w-2xl">
            <p className="eyebrow text-growth">The LetsVibeAI Standard</p>
            <h2 className="mt-3 text-display">Built by Operators for Builders</h2>
            <p className="mt-1 text-white/60">Practical AI Curriculum & Architecture · {site.location}</p>
            <p className="mt-5 leading-7 text-white/80">
              Our curriculum is crafted by engineers and go-to-market operators who have built more than 150 production
              AI workflows and web applications. We teach the architecture-first approach: you learn by shipping real things,
              not by memorizing syntax. You are the film director; the AI agent is your crew.
            </p>
            <p className="mt-4 text-sm text-white/60">100% open curriculum. Real code, real databases, real deployments.</p>
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow text-signal">Specialized labs & deep dives</p>
        <h2 className="mt-3 text-display">Go deeper: build apps and automations</h2>
        <p className="mt-3 max-w-2xl text-muted">Step-by-step written lessons with prompts you can copy, exercises and projects.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {readingCatalog.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      <section id="workshops" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="wrap">
          <p className="eyebrow text-signal">Live programs</p>
          <h2 className="mt-3 text-display">Workshops & Private Mentorship</h2>
          <p className="mt-3 max-w-2xl text-muted">
            The curriculum is 100% free online. When you want a live room, 1:1 project coaching or private workforce training for your team, explore our programs.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {offers.map((o) => (
              <div key={o.title} className="card flex flex-col p-6">
                <span className="eyebrow self-start rounded-full bg-violet/10 px-2.5 py-1 text-violet">{o.badge}</span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{o.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{o.description}</p>
                <div className="mt-5 border-t border-line/70 pt-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-growth">{o.format}</span>
                </div>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(o.title)}`} className="btn-ghost mt-4">
                  Inquire & Apply
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <div className="hero-bg relative overflow-hidden rounded-3xl px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="ribbons" aria-hidden />
          <div className="relative">
            <h2 className="text-display">Your first lesson takes two minutes.</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Master vibe coding and AI agent directing. One free account unlocks all video lessons, transcripts, and missions.
            </p>
            <JoinButton />
            <p className="mt-6 text-xs font-semibold tracking-[0.32em] text-white/50">LEARN • BUILD • GROW</p>
          </div>
        </div>
      </section>
    </>
  );
}

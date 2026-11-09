import { ArrowRight, Clapperboard, Hammer, PlayCircle, Rocket, Sparkles } from 'lucide-react';
import { Link, useTitle } from '../lib/router';
import { VideoPlayer } from '../components/VideoPlayer';
import { CourseCard, hours } from '../components/Cards';
import { catalog, courseMinutes, getCourse, posterSrc, totalVideoLessons, videoCourses, videoSrc } from '../content/catalog';
import { offers, site } from '../content/site';

export function Home() {
  useTitle('');
  const claude = getCourse('claude-code')!;
  const reading = catalog.filter((c) => c.kind === 'reading');
  const videoMinutes = videoCourses.reduce((n, c) => n + courseMinutes(c), 0);
  const preview = [...videoCourses.flatMap((c) => c.lessons.filter((l) => l.number > 0).slice(0, 3).map((l) => ({ c, l })))];

  return (
    <>
      {/* HERO */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="ribbons" aria-hidden />
        <div className="wrap relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-cyan" /> New: Claude Cowork course, 11 videos
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              Stop typing. <br className="hidden sm:block" />
              Start <span className="grad-text">directing AI.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Free, plain-English video courses on Claude Code and Claude Cowork. Two-minute lessons, a hands-on mission
              in each one, and no coding background needed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/courses/claude-code/01-setup-pick-harness" className="btn-primary !px-6 !py-3.5 text-base">
                Start lesson 1 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/courses/claude-cowork" className="btn-ghost-dark !px-6 !py-3.5 text-base">
                Explore Cowork
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <li>✓ 100% free</li>
              <li>✓ Watch on any device</li>
              <li>✓ No sign-up to start</li>
            </ul>
          </div>
          <div>
            <VideoPlayer src={videoSrc('cm-00-promo')} poster={posterSrc('cm-00-promo')} title="Claude Code Mastery trailer" />
            <p className="mt-3 flex items-center gap-2 text-sm text-white/55">
              <PlayCircle className="h-4 w-4 text-cyan" /> Course trailer · 1 min
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-line bg-white">
        <dl className="wrap grid grid-cols-2 gap-y-6 py-8 text-center md:grid-cols-4">
          {[
            [String(totalVideoLessons), 'video lessons'],
            [`${videoMinutes} min`, 'of focused video'],
            [String(catalog.length), 'free courses'],
            ['$0', 'to start, forever'],
          ].map(([n, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-2xl font-bold text-ink sm:text-3xl">{n}</dd>
              <dd className="mt-1 text-sm text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* FLAGSHIP COURSES */}
      <section className="wrap py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-signal">Video courses</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pick your path</h2>
          <p className="mt-3 text-muted">
            Building software with an agent? Start with Claude Code. Want Claude to handle your everyday work? Start with
            Cowork. Each lesson is short enough to watch on a coffee break.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {videoCourses.map((c) => (
            <CourseCard key={c.slug} course={c} large />
          ))}
        </div>
      </section>

      {/* LESSON PREVIEW */}
      <section className="bg-white py-16 sm:py-20">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-signal">Watch now</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Every lesson is one click away</h2>
            </div>
            <Link to="/courses" className="btn-ghost self-start sm:self-auto">
              All courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map(({ c, l }) => (
              <Link key={c.slug + l.slug} to={`/courses/${c.slug}/${l.slug}`} className="group">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-navy shadow-card">
                  <img src={posterSrc(l.videoId!)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
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
                <p className="mt-0.5 font-semibold text-ink group-hover:text-signal">{l.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow text-signal">How it works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">From typist to director in three moves</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Clapperboard, title: 'Watch', body: 'A two-minute video explains one idea with a real-world analogy. No jargon, no fluff.' },
            { icon: Hammer, title: 'Do the mission', body: 'Every lesson ends with a hands-on task. Open Claude next to the video and try it right away.' },
            { icon: Rocket, title: 'Ship', body: 'Stack the lessons and you have a working setup, real automations and a skill you can show at work.' },
          ].map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-signal to-violet text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-muted">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="ribbons" aria-hidden />
        <div className="wrap relative grid items-center gap-10 py-16 sm:py-20 md:grid-cols-[auto_1fr]">
          <div className="mx-auto h-56 w-56 overflow-hidden rounded-full bg-gradient-to-br from-signal via-violet to-cyan p-1 sm:h-64 sm:w-64">
            <img src="/images/pat.png" alt="Patrick Diamitani" className="h-full w-full rounded-full bg-navy-800 object-cover object-top" />
          </div>
          <div className="max-w-2xl">
            <p className="eyebrow text-cyan">Your instructor</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Patrick Diamitani</h2>
            <p className="mt-1 text-white/60">Founder & Lead Instructor, LetsVibeAI · {site.location}</p>
            <p className="mt-5 leading-7 text-white/80">
              Pat leads go-to-market AI and automation work, and has built more than 150 custom AI workflows and
              applications. He learned AI by shipping real things, not by studying syntax, and he teaches the same way:
              you're the film director, not the camera operator.
            </p>
            <p className="mt-4 text-sm text-white/60">Also founded Artispreneur and SalesGency.</p>
          </div>
        </div>
      </section>

      {/* MORE COURSES */}
      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow text-signal">Reading courses</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Go deeper: build apps and automations</h2>
        <p className="mt-3 max-w-2xl text-muted">Step-by-step written lessons with prompts you can copy, exercises and projects.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reading.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* WORK WITH PAT */}
      <section id="work-with-pat" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <div className="wrap">
          <p className="eyebrow text-signal">Work with Pat</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Want help building it?</h2>
          <p className="mt-3 max-w-2xl text-muted">
            The courses are free. When you want a live room, a coach or a workshop for your team, here's how.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {offers.map((o) => (
              <div key={o.title} className="card flex flex-col p-6">
                <span className="eyebrow self-start rounded-full bg-violet/10 px-2.5 py-1 text-violet">{o.badge}</span>
                <h3 className="mt-4 text-lg font-bold">{o.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{o.description}</p>
                <p className="mt-5 text-3xl font-bold">
                  {o.price} <span className="text-sm font-medium text-muted">{o.per}</span>
                </p>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(o.title)}`} className="btn-ghost mt-5">
                  Ask about this
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="wrap py-16 sm:py-20">
        <div className="hero-bg relative overflow-hidden rounded-3xl px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="ribbons" aria-hidden />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your first lesson takes two minutes.</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              {claude.lessons.length - 1} lessons. {hours(courseMinutes(claude))} total. Free, forever.
            </p>
            <Link to="/courses/claude-code/01-setup-pick-harness" className="btn-primary mt-8 !px-7 !py-3.5 text-base">
              Start Claude Code Mastery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

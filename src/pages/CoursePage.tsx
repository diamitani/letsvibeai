import { ArrowRight, BookOpen, CheckCircle2, Clock, PlayCircle, Signal } from 'lucide-react';
import { Link, useTitle } from '../lib/router';
import { useProgress } from '../lib/progress';
import { useAuth } from '../lib/auth';
import { Course, courseMinutes, posterSrc, videoSrc } from '../content/catalog';
import { VideoPlayer } from '../components/VideoPlayer';
import { LessonRow, hours } from '../components/Cards';
import { ShareButton } from '../components/ShareButton';

export function CoursePage({ course }: { course: Course }) {
  useTitle(course.title);
  const { done } = useProgress(course.slug);
  const { user, ready, openAuth } = useAuth();
  const next = course.lessons.find((l) => l.number > 0 && !done.includes(l.slug)) || course.lessons[0];
  const started = done.length > 0;
  const pct = Math.round((done.length / course.lessons.length) * 100);
  const videoCount = course.lessons.filter((l) => l.videoId).length;

  const trailer = course.trailerId
    ? { src: videoSrc(course.trailerId), poster: posterSrc(course.trailerId) }
    : course.trailerSrc
      ? { src: course.trailerSrc, poster: course.poster }
      : null;

  return (
    <>
      <section className="hero-bg relative overflow-hidden text-white">
        <div className="ribbons" aria-hidden />
        <div className="wrap relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <nav className="text-sm text-white/55" aria-label="Breadcrumb">
              <Link to="/courses" className="hover:text-white">Courses</Link> <span className="mx-1.5">/</span>
              <span className="text-white/80">{course.short}</span>
            </nav>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{course.title}</h1>
            <p className="mt-4 text-lg font-medium text-growth">{course.tagline}</p>
            <p className="mt-4 max-w-xl leading-7 text-white/75">{course.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li className="inline-flex items-center gap-1.5">
                {course.kind === 'video' ? <PlayCircle className="h-4 w-4 text-growth" /> : <BookOpen className="h-4 w-4 text-growth" />}
                {course.kind === 'video' ? `${videoCount} videos` : `${course.lessons.length} ${course.unit.toLowerCase()}s`}
              </li>
              <li className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-growth" /> {hours(courseMinutes(course))}</li>
              <li className="inline-flex items-center gap-1.5"><Signal className="h-4 w-4 text-growth" /> {course.level}</li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={`/courses/${course.slug}/${next.slug}`} className="btn-primary !px-6 !py-3.5 text-base">
                {started ? `Continue: ${course.unit} ${next.number}` : `Start ${course.unit.toLowerCase()} ${next.number}`}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ShareButton title={course.title} className="btn-ghost-dark !px-6 !py-3.5 text-base" />
            </div>
            {ready && !user && course.kind === 'video' && (
              <p className="mt-4 text-sm text-white/60">
                The trailer is free. <button type="button" className="font-semibold text-white underline decoration-white/30 underline-offset-2 hover:decoration-white" onClick={() => openAuth('signup')}>Create a free account</button> to watch every lesson.
              </p>
            )}
            {started && (
              <div className="mt-6 max-w-sm">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Your progress</span>
                  <span>{done.length}/{course.lessons.length} · {pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-growth to-growth" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}
          </div>
          {trailer && <VideoPlayer src={trailer.src} poster={trailer.poster} title={`${course.title} trailer`} />}
        </div>
      </section>

      <section className="wrap grid grid-cols-1 gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Course lessons</h2>
          <div className="card mt-5 divide-y divide-line/70 p-2 sm:p-3">
            {course.lessons.map((l) => (
              <LessonRow key={l.slug} course={course} lesson={l} />
            ))}
          </div>
        </div>
        <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h3 className="font-bold">What you'll be able to do</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-growth" />
                  <span className="text-ink/85">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-bold">Who it's for</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{course.whoFor}</p>
          </div>
        </aside>
      </section>
    </>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, FileText, ListVideo, ScrollText } from 'lucide-react';
import { Link, navigate, useTitle } from '../lib/router';
import { useProgress } from '../lib/progress';
import { renderMarkdown } from '../lib/markdown';
import { Course, Lesson, posterSrc, transcriptSrc, videoSrc } from '../content/catalog';
import { PlayerHandle, VideoPlayer } from '../components/VideoPlayer';
import { LessonRow } from '../components/Cards';
import { ShareButton } from '../components/ShareButton';

interface Seg { s: number; e: number; t: string }

const stamp = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function LessonPage({ course, lesson }: { course: Course; lesson: Lesson }) {
  useTitle(`${lesson.title} · ${course.short}`);
  const { isDone, set, done } = useProgress(course.slug);
  const idx = course.lessons.findIndex((l) => l.slug === lesson.slug);
  const prev = course.lessons[idx - 1];
  const next = course.lessons[idx + 1];
  const player = useRef<PlayerHandle>(null);
  const [tab, setTab] = useState<'notes' | 'transcript'>('notes');
  const [time, setTime] = useState(0);
  const [segs, setSegs] = useState<Seg[] | null>(null);
  const [upNext, setUpNext] = useState<number | null>(null);
  const autoPlay = useMemo(() => new URLSearchParams(window.location.search).has('autoplay'), [lesson.slug]);

  const html = useMemo(() => renderMarkdown(lesson.notes), [lesson.notes]);

  useEffect(() => {
    setTab('notes');
    setSegs(null);
    setUpNext(null);
    setTime(0);
    if (!lesson.videoId) return;
    let alive = true;
    fetch(transcriptSrc(lesson.videoId))
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setSegs(d))
      .catch(() => alive && setSegs(null));
    return () => {
      alive = false;
    };
  }, [lesson.slug, lesson.videoId]);

  // "Up next" countdown after a video ends
  useEffect(() => {
    if (upNext === null || !next) return;
    if (upNext <= 0) {
      navigate(`/courses/${course.slug}/${next.slug}?autoplay`);
      return;
    }
    const t = setTimeout(() => setUpNext((n) => (n === null ? null : n - 1)), 1000);
    return () => clearTimeout(t);
  }, [upNext, next, course.slug]);

  const finished = isDone(lesson.slug);
  const pct = Math.round((done.length / course.lessons.length) * 100);

  return (
    <div className="bg-mist">
      <div className="wrap grid gap-8 py-6 sm:py-8 lg:grid-cols-[1fr_360px]">
        <main className="min-w-0">
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted" aria-label="Breadcrumb">
            <Link to="/courses" className="hover:text-signal">Courses</Link>
            <span>/</span>
            <Link to={`/courses/${course.slug}`} className="hover:text-signal">{course.short}</Link>
            <span>/</span>
            <span className="text-ink">{lesson.number === 0 ? 'Welcome' : `${course.unit} ${lesson.number}`}</span>
          </nav>

          {lesson.videoId ? (
            <div className="relative">
              <VideoPlayer
                ref={player}
                src={videoSrc(lesson.videoId)}
                poster={posterSrc(lesson.videoId)}
                title={lesson.title}
                autoPlay={autoPlay}
                onTime={setTime}
                onEnded={() => {
                  set(lesson.slug, true);
                  if (next) setUpNext(6);
                }}
              />
              {upNext !== null && next && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-navy/90 p-6 text-center text-white">
                  <div>
                    <p className="eyebrow text-cyan">Up next in {upNext}s</p>
                    <p className="mt-2 text-xl font-bold sm:text-2xl">{next.title}</p>
                    <div className="mt-5 flex justify-center gap-3">
                      <button type="button" className="btn-primary" onClick={() => setUpNext(0)}>
                        Play now <ArrowRight className="h-4 w-4" />
                      </button>
                      <button type="button" className="btn-ghost-dark" onClick={() => setUpNext(null)}>
                        Stay here
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${course.accent} p-8 text-white shadow-lift sm:p-12`}>
              <p className="eyebrow text-white/80">{course.title}</p>
              <p className="mt-3 text-5xl font-bold opacity-90">{String(lesson.number).padStart(2, '0')}</p>
              <p className="mt-2 text-sm text-white/80">Reading lesson · {lesson.duration}</p>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted">
                {lesson.number === 0 ? 'Welcome' : `${course.unit} ${lesson.number} of ${course.lessons.length - (course.lessons[0].number === 0 ? 1 : 0)}`} · {lesson.duration}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
              {lesson.summary && <p className="mt-2 text-muted">{lesson.summary}</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => set(lesson.slug, !finished)}
                className={finished ? 'btn border border-growth/40 bg-growth/10 text-[#0f8a5f]' : 'btn-ghost'}
                aria-pressed={finished}
              >
                {finished ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                {finished ? 'Completed' : 'Mark complete'}
              </button>
              <ShareButton title={`${lesson.title} · LetsVibeAI`} />
            </div>
          </div>

          {/* Tabs */}
          <div className="card mt-6">
            <div className="flex border-b border-line px-2" role="tablist">
              <TabBtn active={tab === 'notes'} onClick={() => setTab('notes')} icon={<FileText className="h-4 w-4" />}>
                Lesson notes
              </TabBtn>
              {lesson.videoId && segs && segs.length > 0 && (
                <TabBtn active={tab === 'transcript'} onClick={() => setTab('transcript')} icon={<ScrollText className="h-4 w-4" />}>
                  Transcript
                </TabBtn>
              )}
            </div>
            <div className="p-5 sm:p-8">
              {tab === 'notes' ? (
                <article className="prose-lv" dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <div className="space-y-1">
                  <p className="mb-4 text-sm text-muted">Click any line to jump to that moment in the video.</p>
                  {segs?.map((s) => {
                    const on = time >= s.s && time < s.e;
                    return (
                      <button
                        key={s.s}
                        type="button"
                        onClick={() => {
                          player.current?.seek(s.s);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex w-full gap-4 rounded-lg px-3 py-2 text-left text-[15px] leading-6 transition ${
                          on ? 'bg-signal/10 text-ink' : 'text-ink/80 hover:bg-mist'
                        }`}
                      >
                        <span className="w-10 shrink-0 pt-0.5 font-mono text-xs text-signal">{stamp(s.s)}</span>
                        <span>{s.t}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Prev / next */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link to={`/courses/${course.slug}/${prev.slug}`} className="card group flex items-center gap-3 p-4 hover:border-signal/40">
                <ArrowLeft className="h-5 w-5 text-muted group-hover:text-signal" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Previous</span>
                  <span className="block truncate font-semibold">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/courses/${course.slug}/${next.slug}`}
                onClick={() => set(lesson.slug, true)}
                className="card group flex items-center justify-end gap-3 p-4 text-right hover:border-signal/40"
              >
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Next lesson</span>
                  <span className="block truncate font-semibold">{next.title}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-muted group-hover:text-signal" />
              </Link>
            ) : (
              <Link to="/courses" onClick={() => set(lesson.slug, true)} className="card group flex items-center justify-end gap-3 p-4 text-right hover:border-signal/40">
                <span>
                  <span className="block text-xs text-muted">You finished the course</span>
                  <span className="block font-semibold">Pick your next course</span>
                </span>
                <ArrowRight className="h-5 w-5 text-muted group-hover:text-signal" />
              </Link>
            )}
          </div>
        </main>

        {/* Playlist */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <div className="border-b border-line p-4">
              <p className="flex items-center gap-2 text-sm font-bold">
                <ListVideo className="h-4 w-4 text-signal" /> {course.title}
              </p>
              <div className="mt-3 flex justify-between text-xs text-muted">
                <span>{done.length}/{course.lessons.length} complete</span>
                <span>{pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-line">
                <div className="h-full rounded-full bg-gradient-to-r from-growth to-cyan" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div className="max-h-[70vh] space-y-0.5 overflow-y-auto p-2">
              {course.lessons.map((l) => (
                <LessonRow key={l.slug} course={course} lesson={l} current={l.slug === lesson.slug} compact />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition ${
        active ? 'border-signal text-signal' : 'border-transparent text-muted hover:text-ink'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

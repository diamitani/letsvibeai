import { ArrowRight, BookOpen, CheckCircle2, Clock, Lock, PlayCircle } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Link } from '../lib/router';
import { useProgress } from '../lib/progress';
import { Course, Lesson, courseMinutes, posterSrc } from '../content/catalog';

export const hours = (min: number) => (min < 60 ? `${min} min` : `${(min / 60).toFixed(min < 600 ? 1 : 0)} hrs`);

export function CourseCard({ course, large = false }: { course: Course; large?: boolean }) {
  const { done } = useProgress(course.slug);
  const videos = course.lessons.filter((l) => l.videoId).length;
  const pct = Math.round((done.length / course.lessons.length) * 100);
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group card flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className={`relative ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'} overflow-hidden bg-navy`}>
        <img
          src={course.poster}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${course.accent}`} />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {course.kind === 'video' ? <PlayCircle className="h-3.5 w-3.5 text-growth" /> : <BookOpen className="h-3.5 w-3.5 text-growth" />}
          {course.kind === 'video' ? `${videos} videos` : `${course.lessons.length} lessons`}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow text-signal">{course.level}</p>
        <h3 className={`mt-2 font-bold leading-snug text-ink ${large ? 'text-2xl' : 'text-lg'}`}>{course.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{course.summary}</p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Clock className="h-4 w-4" /> {hours(courseMinutes(course))}
            {pct > 0 && <span className="ml-2 font-semibold text-growth">· {pct}% done</span>}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-signal">
            {pct > 0 ? 'Continue' : 'Start'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function LessonRow({
  course,
  lesson,
  current = false,
  compact = false,
}: {
  course: Course;
  lesson: Lesson;
  current?: boolean;
  compact?: boolean;
}) {
  const { isDone } = useProgress(course.slug);
  const { user, ready } = useAuth();
  const finished = isDone(lesson.slug);
  const locked = ready && !user && !!lesson.videoId && lesson.number > 0;
  return (
    <Link
      to={`/courses/${course.slug}/${lesson.slug}`}
      aria-current={current ? 'page' : undefined}
      className={`group flex items-center gap-3 rounded-xl p-2.5 transition ${
        current ? 'bg-signal/10 ring-1 ring-signal/30' : 'hover:bg-mist'
      }`}
    >
      {lesson.videoId ? (
        <div className={`relative shrink-0 overflow-hidden rounded-lg bg-navy ${compact ? 'h-12 w-20' : 'h-16 w-28'}`}>
          <img src={posterSrc(lesson.videoId)} alt="" loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute bottom-1 right-1 rounded bg-navy/85 px-1 font-mono text-[10px] text-white">{lesson.duration}</span>
          {locked && (
            <span className="absolute left-1 top-1 rounded bg-navy/85 p-0.5 text-white" aria-label="Sign in to watch">
              <Lock className="h-3 w-3" />
            </span>
          )}
        </div>
      ) : (
        <div className={`flex shrink-0 items-center justify-center rounded-lg bg-navy font-mono text-sm font-bold text-white ${compact ? 'h-12 w-12' : 'h-14 w-14'}`}>
          {String(lesson.number).padStart(2, '0')}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] text-muted">
          {lesson.number === 0 ? 'Welcome' : `${course.unit} ${lesson.number}`}
          {!lesson.videoId && ` · ${lesson.duration}`}
        </p>
        <p className={`truncate font-semibold ${current ? 'text-signal' : 'text-ink group-hover:text-signal'} ${compact ? 'text-sm' : ''}`}>
          {lesson.title}
        </p>
        {!compact && lesson.summary && <p className="truncate text-sm text-muted">{lesson.summary}</p>}
      </div>
      {finished ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-growth" aria-label="Completed" />
      ) : (
        <span className="h-5 w-5 shrink-0 rounded-full border-2 border-line" aria-hidden />
      )}
    </Link>
  );
}

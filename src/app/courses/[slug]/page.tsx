import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { CourseProgressBar } from '@/components/LessonProgress';
import { catalog, courseMinutes, getCourse, hoursLabel, posterSrc, videoSrc } from '@/lib/catalog';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return catalog.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return pageMeta({ title: 'Course', path: `/courses/${slug}` });
  return pageMeta({
    title: course.title,
    description: course.summary,
    path: `/courses/${course.slug}`,
    image: course.poster,
  });
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const trailer = course.trailerId
    ? { src: videoSrc(course.trailerId), poster: posterSrc(course.trailerId) }
    : course.trailerSrc
      ? { src: course.trailerSrc, poster: course.poster }
      : null;
  const first = course.lessons[0];

  return (
    <div className="wrap py-12 sm:py-16">
      <p className="eyebrow text-signal">
        <Link href="/courses" className="hover:underline">Courses</Link>
        <span className="mx-2 text-line">/</span>
        {course.kind === 'video' ? 'Video' : 'Reading'} · {course.level}
      </p>
      <div className="mt-5 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-display">{course.title}</h1>
          <p className="mt-4 max-w-xl text-lg leading-7 text-muted">{course.tagline}</p>
          <p className="mt-3 max-w-xl leading-7 text-muted">{course.summary}</p>
          <p className="mt-4 font-mono text-xs text-muted">
            {course.lessons.length} {course.unit.toLowerCase()}s · {hoursLabel(courseMinutes(course))}
          </p>
          {first && (
            <Link href={`/courses/${course.slug}/${first.slug}`} className="btn-primary mt-8">
              Start {course.unit.toLowerCase()}  {first.number || 1} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        {trailer && (
          <div>
            <VideoPlayer src={trailer.src} poster={trailer.poster} title={`${course.title} trailer`} />
          </div>
        )}
      </div>

      <div className="mt-10 max-w-md">
        <CourseProgressBar course={course.slug} slugs={course.lessons.map((l) => l.slug)} />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lessons</h2>
          <ol className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {course.lessons.map((l) => (
              <li key={l.slug}>
                <Link href={`/courses/${course.slug}/${l.slug}`} className="flex items-center gap-4 px-5 py-4 hover:bg-mist">
                  <span className="w-8 shrink-0 font-mono text-xs text-muted">{String(l.number).padStart(2, '0')}</span>
                  {l.videoId ? (
                    <span className="relative hidden h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-navy sm:block">
                      <img src={posterSrc(l.videoId)} alt="" className="h-full w-full object-cover" />
                      <PlayCircle className="absolute inset-0 m-auto h-5 w-5 text-white" />
                    </span>
                  ) : null}
                  <span className="flex-1">
                    <span className="block font-semibold tracking-tight text-ink">{l.title}</span>
                    {l.summary && <span className="mt-0.5 block text-sm text-muted line-clamp-1">{l.summary}</span>}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{l.duration}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <aside className="space-y-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">You will learn to</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/80">
              {course.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Who it’s for</h2>
            <p className="mt-3 text-sm leading-6 text-ink/80">{course.whoFor}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

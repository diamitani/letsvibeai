import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Markdown } from '@/components/Markdown';
import { VideoPlayer } from '@/components/VideoPlayer';
import { LessonProgress } from '@/components/LessonProgress';
import { catalog, getCourse, posterSrc, videoSrc } from '@/lib/catalog';
import { pageMeta } from '@/lib/seo';
import fs from 'fs';
import path from 'path';

export function generateStaticParams() {
  return catalog.flatMap((c) => c.lessons.map((l) => ({ slug: c.slug, lesson: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson: lessonSlug } = await params;
  const course = getCourse(slug);
  const lesson = course?.lessons.find((l) => l.slug === lessonSlug);
  if (!course || !lesson) return pageMeta({ title: 'Lesson', path: `/courses/${slug}/${lessonSlug}` });
  return pageMeta({
    title: `${lesson.title} · ${course.short}`,
    description: lesson.summary || course.summary,
    path: `/courses/${course.slug}/${lesson.slug}`,
    image: lesson.videoId ? posterSrc(lesson.videoId) : course.poster,
  });
}

function loadTranscript(id: string) {
  const file = path.join(process.cwd(), 'content/../public/transcripts', `${id}.json`);
  // public is symlinked; read from public
  const alt = path.join(process.cwd(), 'public/transcripts', `${id}.json`);
  const target = fs.existsSync(alt) ? alt : file;
  if (!fs.existsSync(target)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(target, 'utf8')) as { text?: string; segments?: { text: string; start?: number }[] };
    if (data.text) return data.text;
    if (data.segments) return data.segments.map((s) => s.text).join(' ');
  } catch {
    return null;
  }
  return null;
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson: lessonSlug } = await params;
  const course = getCourse(slug);
  const lesson = course?.lessons.find((l) => l.slug === lessonSlug);
  if (!course || !lesson) notFound();
  const idx = course.lessons.findIndex((l) => l.slug === lesson.slug);
  const prev = course.lessons[idx - 1];
  const next = course.lessons[idx + 1];
  const transcript = lesson.videoId ? loadTranscript(lesson.videoId) : null;

  return (
    <div className="wrap py-10 sm:py-14">
      <p className="eyebrow text-signal">
        <Link href={`/courses/${course.slug}`} className="hover:underline">
          {course.short}
        </Link>
        <span className="mx-2 text-line">/</span>
        {course.unit} {lesson.number}
      </p>
      <h1 className="mt-3 max-w-3xl text-display">{lesson.title}</h1>
      {lesson.summary && <p className="mt-3 max-w-2xl text-muted">{lesson.summary}</p>}

      {lesson.videoId && (
        <div className="mt-8 max-w-4xl">
          <VideoPlayer src={videoSrc(lesson.videoId)} poster={posterSrc(lesson.videoId)} title={lesson.title} />
        </div>
      )}

      <div className="mt-6">
        <LessonProgress course={course.slug} lesson={lesson.slug} />
      </div>

      <article className="mt-10 max-w-prose">
        <Markdown content={lesson.notes} />
      </article>

      {transcript && (
        <details className="mt-10 max-w-prose rounded-2xl border border-line bg-white p-5">
          <summary className="cursor-pointer font-semibold">Transcript</summary>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted">{transcript}</p>
        </details>
      )}

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        {prev ? (
          <Link href={`/courses/${course.slug}/${prev.slug}`} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/courses/${course.slug}/${next.slug}`} className="btn-primary">
            {next.title} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link href="/courses" className="btn-primary">
            Back to courses
          </Link>
        )}
      </nav>
    </div>
  );
}

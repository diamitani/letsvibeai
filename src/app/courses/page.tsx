import { CourseCard } from '@/components/CourseCard';
import { catalog, readingCatalog, videoCourses } from '@/lib/catalog';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Courses',
  description: 'Every LetsVibeAI course is free. Start with a two-minute video, or go deep with written labs that ship a live product.',
  path: '/courses',
});

export default function CoursesPage() {
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">Catalog</p>
      <h1 className="mt-3 text-display">Every course is free</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">Start with a two-minute video. Go as deep as you like. {catalog.length} courses, all open.</p>

      <h2 className="mt-14 text-2xl font-bold tracking-tight">Video courses</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videoCourses.map((c) => (
          <CourseCard key={c.slug} course={c} large />
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Reading courses</h2>
      <p className="mt-2 text-muted">Step-by-step written lessons with prompts you can copy, exercises and projects.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {readingCatalog.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </div>
  );
}

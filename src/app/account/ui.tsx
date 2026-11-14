'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useProgress } from '@/lib/progress';
import type { SlimCourse } from '@/lib/catalog';
import { hoursLabel } from '@/lib/catalog-client';

function CourseRow({ course }: { course: SlimCourse }) {
  const { done } = useProgress(course.slug);
  const n = course.lessons.filter((l) => done.includes(l.slug)).length;
  const next = course.lessons.find((l) => !done.includes(l.slug)) || course.lessons[0];
  const pct = course.lessons.length ? Math.round((n / course.lessons.length) * 100) : 0;
  return (
    <li className="card overflow-hidden sm:flex">
      <img src={course.poster} alt="" className="h-36 w-full object-cover sm:h-auto sm:w-52" />
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-bold tracking-tight">{course.title}</h2>
        <p className="mt-1 text-sm text-muted">
          {n} of {course.lessonCount} lessons · {hoursLabel(course.minutes)}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-gradient-to-r from-signal via-violet to-growth" style={{ width: `${pct}%` }} />
        </div>
        {next && (
          <Link href={`/courses/${course.slug}/${next.slug}`} className="btn-ghost mt-4 self-start !py-2 text-sm">
            {n ? 'Continue' : 'Start'}: {next.title}
          </Link>
        )}
      </div>
    </li>
  );
}

export function AccountClient({ courses }: { courses: SlimCourse[] }) {
  const { user, ready, openAuth, configured } = useAuth();
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">My learning</p>
      <h1 className="mt-3 text-display">{user ? `Welcome back, ${user.name.split(' ')[0]}.` : 'Your lessons, saved here.'}</h1>
      <p className="mt-3 max-w-xl text-muted">
        Your lessons, progress and missions, saved to your free account.
        {!configured && ' In this local preview, progress is stored in this browser only until Supabase is connected.'}
      </p>
      {ready && !user && (
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => openAuth('signup')} className="btn-primary">
            Create your free account
          </button>
          <button type="button" onClick={() => openAuth('signin')} className="btn-ghost">
            Sign in
          </button>
        </div>
      )}
      <ol className="mt-12 space-y-5">
        {courses.map((c) => (
          <CourseRow key={c.slug} course={c} />
        ))}
      </ol>
    </div>
  );
}

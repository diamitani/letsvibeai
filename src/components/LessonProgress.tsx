'use client';

import { useProgress } from '@/lib/progress';

export function LessonProgress({ course, lesson }: { course: string; lesson: string }) {
  const { isDone, set } = useProgress(course);
  const done = isDone(lesson);
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => set(lesson, e.target.checked)}
        className="h-4 w-4 rounded border-line text-signal focus:ring-signal"
      />
      {done ? 'Marked complete' : 'Mark lesson complete'}
    </label>
  );
}

export function CourseProgressBar({ course, slugs }: { course: string; slugs: string[] }) {
  const { done } = useProgress(course);
  const n = slugs.filter((s) => done.includes(s)).length;
  const pct = slugs.length ? Math.round((n / slugs.length) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {n} of {slugs.length} lessons
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-gradient-to-r from-signal via-violet to-growth" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

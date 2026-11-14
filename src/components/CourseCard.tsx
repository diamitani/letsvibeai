import Link from 'next/link';
import type { Course } from '@/lib/catalog';
import { courseMinutes, hoursLabel } from '@/lib/catalog';

export function CourseCard({ course, large = false }: { course: Course; large?: boolean }) {
  const mins = courseMinutes(course);
  return (
    <Link href={`/courses/${course.slug}`} className="group card flex h-full flex-col overflow-hidden transition hover:shadow-lift">
      <div className={`relative overflow-hidden bg-navy ${large ? 'aspect-[16/9]' : 'aspect-video'}`}>
        <img
          src={course.poster}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-navy">
          {course.kind === 'video' ? 'Video' : 'Reading'} · {course.level}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] text-muted">
          {course.lessons.length} {course.unit.toLowerCase()}s · {hoursLabel(mins)}
        </p>
        <h3 className={`mt-1.5 font-bold tracking-tight text-ink group-hover:text-signal ${large ? 'text-xl' : 'text-lg'}`}>{course.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">{course.summary}</p>
      </div>
    </Link>
  );
}

import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../content/courses';
import { getLesson, toHtml } from '../lib/content';
import { Quiz, useProgress } from '../components/learning';
import { Button, Icon, Markdown, usePageTitle } from '../components/ui';
import { NotFound } from './NotFound';

export function Lesson() {
  const { slug = '', lesson: lessonSlug = '' } = useParams();
  const course = getCourse(slug);
  const data = course ? getLesson(slug, lessonSlug) : null;
  const { done, mark } = useProgress(slug);
  const html = useMemo(() => (data ? toHtml(data.lesson.body) : ''), [data?.lesson.slug, slug]); // eslint-disable-line react-hooks/exhaustive-deps
  usePageTitle(data ? `${data.lesson.title} — ${course?.title}` : 'Lesson', data?.lesson.description);
  if (!course || !data) return <NotFound />;

  const { lesson, index, lessons, prev, next } = data;
  const mod = lesson.module;
  const isDone = done.includes(lesson.slug);
  const pct = Math.round((done.length / lessons.length) * 100);

  return (
    <section className="section section--white" style={{ paddingTop: 128 }}>
      <div className="container lesson">
        <aside className="lesson__side" aria-label="Course lessons">
          <Link to={`/courses/${course.slug}`} className="text-link" style={{ fontSize: 'var(--fs-xs)' }}>
            <Icon name="chevron" size={14} /> Course overview
          </Link>
          <h2 style={{ marginTop: 12 }}>{course.title}</h2>
          <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress"><div style={{ width: `${pct}%` }} /></div>
          <p className="muted" style={{ fontSize: 'var(--fs-xs)' }}>{done.length} of {lessons.length} complete</p>
          <ol className="lesson__nav">
            {lessons.map((l, i) => (
              <li key={l.slug}>
                <Link to={`/courses/${course.slug}/${l.slug}`} className={`${l.slug === lesson.slug ? 'active' : ''} ${done.includes(l.slug) ? 'done' : ''}`} aria-current={l.slug === lesson.slug ? 'page' : undefined}>
                  <Icon name={done.includes(l.slug) ? 'check-circle' : 'circle'} />
                  <span>{course.unit} {i + 1}: {l.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>

        <article>
          <header className="lesson__head">
            <p className="eyebrow">{course.unit} {index + 1} of {lessons.length}</p>
            <h1 className="h1">{lesson.title}</h1>
            {lesson.description && <p className="lead" style={{ marginTop: 12 }}>{lesson.description}</p>}
            <div className="meta">
              {lesson.duration && <span><Icon name="clock" />{lesson.duration}</span>}
              <span><Icon name="signal" />{course.level}</span>
              {mod && <span><Icon name="award" />Deliverable included</span>}
            </div>
          </header>

          <Markdown html={html} />

          {mod && (
            <>
              <div className="callout callout--sky">
                <h3><Icon name="award" />Your Deliverable</h3>
                <p>{mod.deliverable}</p>
              </div>
              <Quiz questions={mod.quiz} onPass={() => mark(lesson.slug)} />
            </>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 40 }}>
            {isDone
              ? <button className="btn btn--outline btn--sm" onClick={() => mark(lesson.slug, false)}><Icon name="check-circle" />Completed — undo</button>
              : <button className="btn btn--navy btn--sm" onClick={() => mark(lesson.slug)}><Icon name="check" />Mark as complete</button>}
            {next && <Button href={`/courses/${course.slug}/${next.slug}`} size="sm" arrow>Next {course.unit.toLowerCase()}</Button>}
            {!next && <Button href="/contact?topic=Live%20Cohort" size="sm">Get your capstone reviewed</Button>}
          </div>

          <nav className="lesson__pager" aria-label="Lesson navigation">
            {prev && <Link to={`/courses/${course.slug}/${prev.slug}`}><span>← Previous</span><strong>{prev.title}</strong></Link>}
            {next && <Link className="next" to={`/courses/${course.slug}/${next.slug}`}><span>Next →</span><strong>{next.title}</strong></Link>}
          </nav>
        </article>
      </div>
    </section>
  );
}

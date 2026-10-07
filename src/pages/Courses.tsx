import { Link, useParams } from 'react-router-dom';
import { courses, getCourse } from '../content/courses';
import { CAPSTONE_DELIVERABLES } from '../data/courseData';
import { getLessons } from '../lib/content';
import { useProgress } from '../components/learning';
import { ContactSection, CourseCard, CtaStrip, FaqSection } from '../components/sections';
import { Button, Icon, Reveal, SectionHead, usePageTitle } from '../components/ui';
import { NotFound } from './NotFound';

export function Courses() {
  usePageTitle('Courses', 'Free, hands-on AI courses for beginners: vibe coding, automation, AI assistants and real project labs.');
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__media" aria-hidden="true"><img src="/images/course-project-labs.jpg" alt="" /></div>
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">Free · Self-paced · Beginner friendly</p></Reveal>
          <Reveal delay={100}><h1 className="h1">Our AI Courses</h1></Reveal>
          <Reveal delay={200}><p>Pick a path, build something real in every lesson and go at your own pace. No credit card, no code background.</p></Reveal>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container">
          <div className="grid-2">
            {courses.map((c, i) => <Reveal key={c.slug} delay={(i % 2) * 120}><CourseCard course={c} /></Reveal>)}
          </div>
          <CtaStrip text="Not sure which course fits? Tell us your goal and we'll map your path." />
        </div>
      </section>
      <FaqSection />
    </>
  );
}

function List({ items }: { items: string[] }) {
  return <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>;
}

export function CourseDetail() {
  const { slug = '' } = useParams();
  const course = getCourse(slug);
  const lessons = course ? getLessons(course.slug) : [];
  const { done } = useProgress(slug);
  usePageTitle(course?.title || 'Course', course?.summary);
  if (!course) return <NotFound />;

  const first = lessons[0];
  const nextUp = lessons.find((l) => !done.includes(l.slug)) || first;
  const started = done.length > 0;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__media" aria-hidden="true"><img src={course.image} alt="" /></div>
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">{course.level} · {lessons.length} {course.unit}s · {course.duration}</p></Reveal>
          <Reveal delay={100}><h1 className="h1">{course.heroTitle}</h1></Reveal>
          <Reveal delay={200}><p>{course.summary}</p></Reveal>
          <Reveal delay={300} className="hero__actions" style={{ justifyContent: 'center', marginTop: 32 }}>
            <Button href={`/courses/${course.slug}/${nextUp.slug}`}>{started ? `Continue: ${course.unit} ${lessons.indexOf(nextUp) + 1}` : `Start ${course.unit} 1`}</Button>
          </Reveal>
        </div>
      </section>

      <section className="section section--white">
        <div className="container container--narrow">
          <Reveal className="detail-figure"><img src={course.image} alt="" /></Reveal>
          <div className="prose">
            <h2>{course.intro.heading}</h2>
            <p>{course.intro.body}</p>
            <h2>Our Hands-On, Results-Driven Approach</h2>
            <List items={course.approach} />
          </div>
          <div className="detail-split" style={{ marginTop: 48 }}>
            <img src="/images/event-build-night.jpg" alt="Learners at a LetsVibeAI Build Night" loading="lazy" />
            <div className="prose"><h2 style={{ marginTop: 0 }}>What This Course Helps With</h2><List items={course.helpsWith} /></div>
          </div>
          <div className="prose" style={{ marginTop: 48 }}>
            <h2>Benefits You Can Expect</h2>
            <List items={course.benefits} />
            <h2>Who This Course Is For</h2>
            <p>{course.whoFor}</p>
          </div>

          <div style={{ marginTop: 64 }}>
            <SectionHead title="Course Curriculum" text={`${lessons.length} ${course.unit.toLowerCase()}s · ${done.length} completed`} />
            <ol className="curriculum" style={{ listStyle: 'none' }}>
              {lessons.map((l, i) => (
                <li key={l.slug}>
                  <Link to={`/courses/${course.slug}/${l.slug}`} className={`curriculum__item${done.includes(l.slug) ? ' done' : ''}`}>
                    <span className="curriculum__num">{done.includes(l.slug) ? <Icon name="check" size={18} /> : String(i + 1).padStart(2, '0')}</span>
                    <span><h3>{l.title}</h3>{l.description && <p>{l.description}</p>}</span>
                    <span className="curriculum__dur">{l.duration}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {course.slug === 'vibe-coding' && (
            <div style={{ marginTop: 64 }}>
              <SectionHead title="Capstone Project" text="Ship a real app and grade it on a clear 100-point rubric." />
              <div className="grid-2">
                {CAPSTONE_DELIVERABLES.map((d) => (
                  <div className="block-card" key={d.id}>
                    <div className="block-card__top"><span className="chip">{d.moduleRef}</span><strong style={{ color: 'var(--blue-strong)' }}>{d.points} pts</strong></div>
                    <h3 className="h5">{d.title}</h3>
                    <p>{d.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="prose" style={{ marginTop: 64 }}>
            <h2>Start Today</h2>
            <p>{course.closing}</p>
          </div>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Button href={`/courses/${course.slug}/${nextUp.slug}`}>{started ? 'Continue Learning' : 'Start Learning Free'}</Button>
            <Button href="/contact?topic=1%3A1%20Coaching" variant="outline">Get 1:1 Coaching</Button>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}

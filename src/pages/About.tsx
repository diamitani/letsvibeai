import { courses } from '../content/courses';
import { principles, processSteps, site } from '../content/site';
import { totalLessons } from '../lib/content';
import { ContactSection, GuidesSection } from '../components/sections';
import { Icon, Reveal, SectionHead, usePageTitle } from '../components/ui';

const stepColors = ['var(--blue-strong)', 'var(--violet)', 'var(--cyan)', 'var(--success)'];

export function About() {
  usePageTitle('About', site.description);
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__media" aria-hidden="true"><img src="/images/about-hero.jpg" alt="" /></div>
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">{site.descriptor}</p></Reveal>
          <Reveal delay={100}><h1 className="h1">Our Approach to Learning AI</h1></Reveal>
          <Reveal delay={200}><p>We make AI understandable, practical and actionable — then turn learning into real projects, workshops and workforce outcomes.</p></Reveal>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHead title="Build with AI, Confidently" text="There's still fear and intimidation around AI. Our job is to replace it with skill — one real project at a time." />
          <Reveal className="stats">
            <div className="stat"><strong>{totalLessons()}</strong><span>Free lessons</span></div>
            <div className="stat"><strong>{courses.length}</strong><span>Hands-on courses</span></div>
            <div className="stat"><strong>1M</strong><span>People we aim to help build with AI</span></div>
          </Reveal>
          <Reveal className="quote-feature" style={{ marginTop: 48 }}>
            <div className="quote-feature__img"><img src="/images/event-build-night.jpg" alt="A LetsVibeAI Build Night in Chicago" loading="lazy" /></div>
            <div>
              <blockquote>“You don't need to learn to code. You need to learn how software is put together — and how to tell AI exactly what to build.”</blockquote>
              <cite><strong>Pat Diamitani</strong> — Founder, LetsVibeAI</cite>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <SectionHead center title="Why Learn with LetsVibeAI" />
          <div className="grid-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} className="info-card">
                <span className={`icon-tile${i === 1 ? ' icon-tile--violet' : i === 2 ? ' icon-tile--green' : ''}`}><Icon name={p.icon} /></span>
                <h3 className="h5">{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHead center title="How You'll Learn" text="A simple, structured method that takes you from an idea in your head to a live product — with AI doing the typing." />
          <div className="steps">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="step" style={{ background: 'var(--mist)' }}>
                <p className="step__num" style={{ color: stepColors[i] }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 className="h5">{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GuidesSection />
      <ContactSection />
    </>
  );
}

// Contact and Pricing pages.
import { plans, site } from '../content/site';
import { ContactSection, CtaStrip, FaqSection, OffersSection } from '../components/sections';
import { Button, Icon, Reveal, usePageTitle } from '../components/ui';

export function Contact() {
  usePageTitle('Contact', 'Book a build call, a Live Build Night, 1:1 coaching or a team workshop with LetsVibeAI.');
  return (
    <>
      <section className="page-hero page-hero--plain">
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">We reply within two business days</p></Reveal>
          <Reveal delay={100}><h1 className="h1">Let's Build Something Together</h1></Reveal>
          <Reveal delay={200}><p>Questions about a course, coaching, a cohort or training your team? Send us a note.</p></Reveal>
          <Reveal delay={300} className="hero__actions" style={{ justifyContent: 'center', marginTop: 28 }}>
            <Button href={`mailto:${site.email}`} variant="ghost-light">{site.email}</Button>
          </Reveal>
        </div>
      </section>
      <ContactSection />
      <FaqSection />
    </>
  );
}

export function Pricing() {
  usePageTitle('Pricing', 'Every LetsVibeAI course is free. Add a live cohort, coaching or a team program when you want a guide.');
  return (
    <>
      <section className="page-hero page-hero--plain">
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">Simple, honest pricing</p></Reveal>
          <Reveal delay={100}><h1 className="h1">Learn Free. Add a Guide When You're Ready.</h1></Reveal>
          <Reveal delay={200}><p>Every course and lesson is free. Pay only for live, human help.</p></Reveal>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container">
          <div className="grid-3" style={{ alignItems: 'stretch' }}>
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 120} className={`plan${p.featured ? ' plan--featured' : ''}`}>
                {p.badge && <span className="badge">{p.badge}</span>}
                <h2 className="h4">{p.name}</h2>
                <p className="muted small" style={{ marginTop: 8 }}>{p.tagline}</p>
                <div className="price"><strong>{p.price}</strong><span>{p.per}</span></div>
                <ul>{p.features.map((f) => <li key={f}><Icon name="check" />{f}</li>)}</ul>
                <Button href={p.href} variant={p.featured ? 'primary' : 'outline'} className="btn--block">{p.cta}</Button>
              </Reveal>
            ))}
          </div>
          <CtaStrip text="Running a workforce, school or city program? We'll build a plan around your people." />
        </div>
      </section>
      <OffersSection />
      <FaqSection />
    </>
  );
}

export function NotFound() {
  usePageTitle('Page not found');
  return (
    <section className="page-hero page-hero--plain" style={{ minHeight: '80vh' }}>
      <div className="container page-hero__inner">
        <p className="eyebrow">404</p>
        <h1 className="h1">This page took a wrong turn.</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <div className="hero__actions" style={{ justifyContent: 'center', marginTop: 28 }}>
          <Button href="/" variant="ghost-light">Back Home</Button>
          <Button href="/courses">Browse Courses</Button>
        </div>
      </div>
    </section>
  );
}

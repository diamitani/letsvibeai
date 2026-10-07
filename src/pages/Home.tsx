import { courses } from '../content/courses';
import { primaryCta, site } from '../content/site';
import { BentoSection, BuildsCarousel, ContactSection, CourseCard, FaqSection, GlassFeatures, GuidesSection, OffersSection } from '../components/sections';
import { Button, IconStack, Reveal, SectionHead, usePageTitle } from '../components/ui';

export function Home() {
  usePageTitle('', site.description);
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media" aria-hidden="true">
          <img src="/images/hero.jpg" alt="" fetchPriority="high" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content">
            <Reveal className="hero__proof">
              <IconStack />
              <div>
                <strong>Free to start · No code required</strong>
                <span>Built for beginners, career changers and teams</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="h-hero hero__title" id="hero-title">Learn AI.<br />Build with AI.<br />Grow with AI.</h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="hero__sub">Plain-English courses that take you from “I've never coded” to shipping your own AI tools, automations and apps.</p>
            </Reveal>
            <Reveal delay={360} className="hero__actions">
              <Button href="/courses" variant="ghost-light">Explore Courses</Button>
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
            </Reveal>
          </div>
        </div>
      </section>

      <OffersSection />

      {/* Courses */}
      <section className="section section--mist" aria-labelledby="courses-title">
        <div className="container">
          <SectionHead center title={<span id="courses-title">Explore Our Hands-On<br />AI Courses Today</span>} />
          <div className="grid-3">
            {courses.filter((c) => c.featured).map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}><CourseCard course={c} /></Reveal>
            ))}
          </div>
          <Reveal className="center" style={{ marginTop: 48 }}>
            <Button href="/courses" variant="outline">View All Courses</Button>
          </Reveal>
        </div>
      </section>

      <GlassFeatures />
      <BentoSection />
      <GuidesSection />
      <BuildsCarousel />
      <FaqSection />
      <ContactSection />
    </>
  );
}

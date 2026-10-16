import { courses } from '../content/courses';
import { primaryCta, site } from '../content/site';
import { BentoSection, BuildsCarousel, ContactSection, CourseCard, FaqSection, GlassFeatures, GuidesSection, OffersSection } from '../components/sections';
import { HeroShowcase, PracticesSection } from '../components/home';
import { Button, Icon, Reveal, SectionHead, usePageTitle } from '../components/ui';

export function Home() {
  usePageTitle('', site.description);
  return (
    <>
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="container">
          <Reveal><p className="pill"><Icon name="spark" />The AI Skills Institution for Work &amp; Life</p></Reveal>
          <Reveal delay={100}>
            <h1 className="h-hero" id="hero-title">Learn AI. Build with AI.<br /><em>Lead the agents.</em></h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="lead">Free, plain-English courses that take you from “I've never coded” to directing AI agents that build your tools, automations and apps.</p>
          </Reveal>
          <Reveal delay={300} className="hero__actions">
            <Button href={primaryCta.href}>Start Free</Button>
            <Button href="/courses" variant="ghost">Browse Courses</Button>
          </Reveal>
          <HeroShowcase />
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="courses-title">
        <div className="container">
          <SectionHead center title={<span id="courses-title">Explore Our Hands-On<br /><em>AI Courses</em> Today</span>} />
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

      <PracticesSection />
      <OffersSection />
      <GlassFeatures />
      <BentoSection />
      <GuidesSection />
      <BuildsCarousel />
      <FaqSection />
      <ContactSection />
    </>
  );
}

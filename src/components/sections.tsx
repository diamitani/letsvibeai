// Page sections — each mirrors a Lexio section, rebuilt with LetsVibeAI content.
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { builds, faqs, features, guides, meetingCta, offers, site } from '../content/site';
import type { Course } from '../content/courses';
import { getLessons } from '../lib/content';
import { Button, Icon, IconStack, Reveal, SectionHead, SmartLink } from './ui';

/* ── Countdown ─────────────────────────────────────────── */
function useCountdown(target: string) {
  const end = useMemo(() => (target ? new Date(target).getTime() : 0), [target]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!end) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [end]);
  const left = Math.max(0, end - now);
  return {
    done: !end || left === 0,
    days: Math.floor(left / 864e5),
    hours: Math.floor(left / 36e5) % 24,
    min: Math.floor(left / 6e4) % 60,
    sec: Math.floor(left / 1e3) % 60,
  };
}

export function Countdown() {
  const t = useCountdown(site.offerDeadline);
  if (t.done) return null;
  const units = [
    ...(t.days > 0 ? [['Days', t.days]] : []),
    ['Hours', t.hours], ['Min', t.min], ['Sec', t.sec],
  ] as [string, number][];
  return (
    <div className="countdown" role="timer" aria-label={site.offerDeadlineLabel}>
      <p className="countdown__label">{site.offerDeadlineLabel}</p>
      <div className="countdown__row">
        {units.map(([label, value], i) => (
          <div key={label} style={{ display: 'contents' }}>
            {i > 0 && <span className="countdown__sep">:</span>}
            <div className="countdown__unit"><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Offers (Lexio "Limited Time Offers") ──────────────── */
export function OffersSection() {
  return (
    <section className="section section--white" aria-labelledby="offers-title">
      <div className="container">
        <Reveal className="offers-head">
          <div>
            <h2 className="h2" id="offers-title">Ways to Learn Faster</h2>
            <p className="lead">Every course is free. When you want a guide in the room, these are the fastest ways to go from idea to shipped.</p>
          </div>
          <Countdown />
        </Reveal>
        <div className="grid-3">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 120}>
              <Link to={o.href} className="offer-card">
                <div className="offer-card__top">
                  <span className="offer-card__num">{String(i + 1).padStart(2, '0')}<sup>No</sup></span>
                  <span className="badge"><Icon name={o.badgeIcon} />{o.badge}</span>
                </div>
                <h3 className="h4">{o.title}</h3>
                <p>{o.description}</p>
                <div className="offer-card__art"><Icon name={o.art} strokeWidth={0.6} /></div>
                <div className="offer-card__foot">
                  <div>
                    <p className="small" style={{ marginTop: 0 }}>Starting at just</p>
                    <div className="price"><strong>{o.price}</strong><span>{o.per}</span></div>
                  </div>
                  <span className="btn-circle btn-circle--soft" aria-hidden="true"><Icon name="arrow" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Course card (Lexio "Explore Our Courses") ─────────── */
export function CourseCard({ course, light }: { course: Course; light?: boolean }) {
  const count = getLessons(course.slug).length;
  return (
    <Link to={`/courses/${course.slug}`} className={`course-card${light ? ' course-card--light' : ''}`}>
      <div className="course-card__img"><img src={course.image} alt="" loading="lazy" /></div>
      <div className="course-card__body">
        <h3 className="h4">{course.title}</h3>
        <p className="course-card__summary">{course.summary}</p>
        <div className="course-card__meta">
          <span><Icon name="book" />{count} {course.unit}s</span>
          <span><Icon name="clock" />{course.duration}</span>
          <span className="push"><Icon name="signal" />{course.level}</span>
        </div>
        <div className="course-card__foot">
          <div className="price"><strong>Free</strong><span>/ Self-paced</span></div>
          <span className="text-link">Learn More <Icon name="chevron" /></span>
        </div>
      </div>
    </Link>
  );
}

/* ── Glass features over blurred photo ─────────────────── */
export function GlassFeatures() {
  return (
    <section className="glass-section" aria-labelledby="glass-title">
      <div className="glass-section__bg" aria-hidden="true"><img src="/images/features-bg.jpg" alt="" loading="lazy" /></div>
      <div className="container">
        <Reveal className="glass-panel">
          <h2 className="h2" id="glass-title">Practical AI, Made for Real Life</h2>
          {features.map((f) => (
            <div className="glass-item" key={f.title}>
              <span className="icon-tile"><Icon name={f.icon} /></span>
              <div><h3>{f.title}</h3><p>{f.body}</p></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Bento (Lexio "Designed for Real English Communication") ── */
export function BentoSection() {
  return (
    <section className="section section--mist" aria-labelledby="bento-title">
      <div className="container">
        <SectionHead title={<span id="bento-title">Designed for Real-World Builders</span>} text="Real tools, real projects and a real community — so AI stops feeling like magic and starts feeling like a skill." />
        <div className="bento">
          <Reveal className="bento__photo">
            <img src="/images/event-build-night.jpg" alt="Learners building with laptops at a LetsVibeAI Build Night in Chicago" loading="lazy" />
            <div className="bento__pills"><span>Learn AI</span><span>by Building Real Things</span></div>
          </Reveal>
          <Reveal className="bento__card bento__card--sky" delay={100}>
            <Icon name="calendar" className="bento__icon" />
            <div><p className="big">10 Modules</p><p className="muted small">From first idea to a deployed, revenue-ready app</p></div>
          </Reveal>
          <Reveal className="bento__card bento__card--green" delay={200}>
            <Icon name="layers" className="bento__icon" />
            <div><p className="big">Built for Real Work</p><p className="muted small">Sales, marketing, operations, education and side projects</p></div>
          </Reveal>
          <Reveal className="bento__card bento__card--violet" delay={150}>
            <Icon name="quote" className="bento__icon" />
            <div>
              <p className="bento__quote">“I learned AI from YouTube videos. Now I run AI and automation for a 500-person company. You can absolutely do this.”</p>
              <p style={{ marginTop: 16 }}><strong style={{ color: 'var(--ink)' }}>Pat Diamitani</strong></p>
              <p className="muted small">— Founder, LetsVibeAI</p>
            </div>
          </Reveal>
          <Reveal className="bento__stat" delay={250}>
            <img src="/images/event-group.jpg" alt="" loading="lazy" />
            <div><strong>1,000,000</strong><p>People we're on a mission to help build tools, systems and businesses with AI.</p></div>
          </Reveal>
        </div>
        <CtaStrip />
      </div>
    </section>
  );
}

export function CtaStrip({ text = 'Still unsure where to start? Get a personal AI build plan.' }: { text?: string }) {
  return (
    <Reveal className="cta-strip">
      <IconStack />
      <p>{text}</p>
      <Button href={meetingCta.href}>{meetingCta.label}</Button>
    </Reveal>
  );
}

/* ── Guides (Lexio "Meet Our Expert Instructors") ──────── */
export function GuidesSection({ background = 'sky' }: { background?: 'sky' | 'mist' }) {
  return (
    <section className={`section section--${background}`} aria-labelledby="guides-title">
      <div className="container">
        <SectionHead center title={<span id="guides-title">Meet Your Guides</span>} />
        <div className="grid-3">
          {guides.map((g, i) => (
            <Reveal key={g.name} delay={i * 120} className="guide-card">
              <div className="guide-card__img">
                {g.image
                  ? <img src={g.image} alt={g.name} loading="lazy" />
                  : <div className="guide-card__mono"><img src="/logo-monochrome-light.svg" alt="" />{g.initials}</div>}
              </div>
              <p className="guide-card__bio">{g.bio}</p>
              <div className="guide-card__info">
                <div><h3 className="h5">{g.name}</h3><p>{g.role}</p></div>
                <div className="socials">
                  {g.links.map((l) => (
                    <SmartLink key={l.href} href={l.href} aria-label={l.label}><Icon name={l.kind} /></SmartLink>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Builds carousel (Lexio testimonial slider) ────────── */
export function BuildsCarousel() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1.7);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth <= 680 ? 1 : window.innerWidth <= 1024 ? 1.18 : 1.7);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const max = Math.max(0, builds.length - Math.round(perView));
  const go = (d: number) => setIndex((i) => Math.min(max, Math.max(0, i + d)));
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const card = trackRef.current?.children[Math.min(index, max)] as HTMLElement | undefined;
    setOffset(card ? card.offsetLeft : 0);
  }, [index, max, perView]);

  return (
    <section className="section section--mist" aria-labelledby="builds-title" aria-roledescription="carousel">
      <div className="container">
        <SectionHead
          title={<span id="builds-title">Don't Just Learn It —<br />See What You'll Ship</span>}
          aside={
            <div style={{ display: 'flex', gap: 16 }}>
              <button className="btn-circle" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous project"><ArrowLeft /></button>
              <button className="btn-circle" onClick={() => go(1)} disabled={index >= max} aria-label="Next project"><ArrowRight /></button>
            </div>
          }
        />
        <div className="carousel">
          <div className="carousel__track" ref={trackRef} style={{ transform: `translateX(${-offset}px)` }}>
            {builds.map((b, i) => (
              <article className="build-card" key={b.title} aria-label={`${i + 1} of ${builds.length}`} aria-hidden={i < index || i > index + Math.ceil(perView) - 1}>
                <div className="build-card__img"><img src={b.image} alt="" loading="lazy" /></div>
                <div className="build-card__body">
                  <span className="eyebrow">{b.tag}</span>
                  <h3 className="h4" style={{ marginTop: 12 }}>{b.title}</h3>
                  <p>{b.body}</p>
                  <div className="build-card__foot">{b.tools.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ (Lexio accordion) ─────────────────────────────── */
export function FaqSection({ items = faqs, title = 'Frequently Asked Questions' }: { items?: { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section--white" aria-labelledby="faq-title">
      <div className="container faq">
        <Reveal className="faq__aside">
          <h2 className="h2" id="faq-title">{title}</h2>
          <div className="faq__help">
            <IconStack />
            <p className="h5">Got questions? Let's get you building with confidence.</p>
            <Button href="/contact">Contact Now</Button>
          </div>
        </Reveal>
        <div className="faq__list">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 60} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-item__q" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="faq-item__icon"><Plus /></span>
                {f.q}
              </button>
              <div className="faq-item__a" id={`faq-${i}`} role="region">
                <div><p>{f.a}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact (Lexio "Contact us today!") ───────────────── */
export function ContactSection() {
  const [params] = useSearchParams();
  const topic = params.get('topic') || '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!site.contactEndpoint) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\nTopic: ${data.topic || '-'}\n\n${data.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`LetsVibeAI — ${data.topic || 'Hello'}`)}&body=${encodeURIComponent(body)}`;
      setStatus('ok');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(site.contactEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      setStatus(res.ok ? 'ok' : 'err');
      if (res.ok) e.currentTarget?.reset();
    } catch { setStatus('err'); }
  }

  return (
    <section className="section section--mist" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal className="contact__form">
          <h2 className="h3" id="contact-title">Contact us today!</h2>
          <form onSubmit={onSubmit}>
            <div className="field"><label htmlFor="c-name">Your Name</label><input className="input" id="c-name" name="name" required placeholder="Enter your name" autoComplete="name" /></div>
            <div className="field"><label htmlFor="c-email">Email Address</label><input className="input" id="c-email" name="email" type="email" required placeholder="Enter your email address" autoComplete="email" /></div>
            <div className="field"><label htmlFor="c-phone">Your Number <span className="muted">(optional)</span></label><input className="input" id="c-phone" name="phone" type="tel" placeholder="Enter your phone number" autoComplete="tel" /></div>
            <div className="field">
              <label htmlFor="c-topic">I'm interested in</label>
              <select className="select input" id="c-topic" name="topic" defaultValue={topic}>
                <option value="">Just saying hello</option>
                {['Live Build Night', '1:1 Coaching', 'Live Cohort', 'Team Workshop', 'Teams & Programs', 'Guest instructor'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="field"><label htmlFor="c-msg">Your Message</label><textarea className="textarea" id="c-msg" name="message" required placeholder="Tell us what you want to build" /></div>
            <div className="form-row">
              <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Start Building Today'}</button>
              <button className="btn btn--primary" type="submit" aria-label="Send" disabled={status === 'sending'}><ArrowRight /></button>
            </div>
            {status === 'ok' && <p className="form-note form-note--ok" role="status">Thanks! We'll get back to you within two business days.</p>}
            {status === 'err' && <p className="form-note form-note--err" role="alert">Something went wrong. Email us at {site.email}.</p>}
          </form>
        </Reveal>
        <Reveal className="contact__side" delay={150}>
          <h2 className="h2">Let's Start Your AI Building Journey</h2>
          <div className="contact__img">
            <img src="/images/contact.jpg" alt="Friends learning together on laptops" loading="lazy" />
            <div className="contact__pill"><span>Learn AI. Build with AI. Grow with AI.</span><img src="/logo-monochrome-light.svg" alt="" /></div>
          </div>
          <p>Want to know how LetsVibeAI can help you or your team build with AI?</p>
        </Reveal>
      </div>
    </section>
  );
}

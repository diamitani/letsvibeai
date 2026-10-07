import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { nav, primaryCta, site } from '../content/site';
import { courses } from '../content/courses';
import { Button, Icon } from './ui';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`logo${light ? ' logo--light' : ''}`} aria-label="LetsVibeAI home">
      <img src={light ? '/logo-monochrome-light.svg' : '/logo-standalone-mark.svg'} alt="" width={34} height={34} />
      <span>LetsVibe<span className="logo__ai">AI</span></span>
    </Link>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav-wrap">
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main">
        <Logo />
        <div className="nav__links">
          {nav.map((item) => (
            <NavLink key={item.href} to={item.href} className="nav__link">{item.label}</NavLink>
          ))}
        </div>
        <Button href={primaryCta.href} size="sm" className="nav__cta">{primaryCta.label}</Button>
        <button className="nav__toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div className="nav__mobile" hidden={!open}>
        {nav.map((item) => <NavLink key={item.href} to={item.href}>{item.label}</NavLink>)}
        <NavLink to="/contact">Contact</NavLink>
        <Button href={primaryCta.href} className="btn--block">{primaryCta.label}</Button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>{site.descriptor}. {site.promise}</p>
            <div className="socials">
              {site.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><Icon name={s.kind} /></a>
              ))}
              <a href={`mailto:${site.email}`} aria-label="Email"><Icon name="mail" /></a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3>Our Courses</h3>
            <ul>
              {courses.map((c) => <li key={c.slug}><Link to={`/courses/${c.slug}`}>{c.title.split(':')[0]}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
              <li><Link to="/toolkit">Builder Toolkit</Link></li>
              <li><Link to="/toolkit?tab=docs">11-Doc Planning Stack</Link></li>
              <li><Link to="/toolkit?tab=prompts">Prompt Library</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__contact">
          <a href={`mailto:${site.email}`}><Icon name="mail" /> {site.email}</a>
          <span><Icon name="pin" /> {site.location}</span>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} LetsVibeAI. {site.descriptor}.</span>
          <span>All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  );
}

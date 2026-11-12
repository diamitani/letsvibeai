import { Link } from '../lib/router';
import { BrandStrip, Logo } from './Brand';
import { catalog } from '../content/catalog';
import { site } from '../content/site';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white/70">
      <BrandStrip />
      <div className="watermark -right-16 top-16 hidden h-80 w-80 md:block" aria-hidden />
      <div className="wrap relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo tagline />
          <p className="mt-4 text-sm leading-6">
            <strong className="text-white">Real skills. Lasting impact.</strong> LetsVibeAI teaches people how to use AI
            confidently in their jobs and lives, then turns learning into real projects, workshops and community outcomes.
          </p>
          <p className="mt-4 text-sm">
            <a className="text-white hover:text-growth" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span className="mx-2 text-white/30">·</span>
            {site.location}
          </p>
        </div>
        <div>
          <p className="eyebrow text-white/40">Courses</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {catalog.map((c) => (
              <li key={c.slug}>
                <Link to={`/courses/${c.slug}`} className="hover:text-white">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-white/40">LetsVibeAI</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/account" className="hover:text-white">My learning</Link></li>
            <li><Link to="/#workshops" className="hover:text-white">Workshops & Mentorship</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            {site.socials.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className="hover:text-white">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} LetsVibeAI · The AI Skills Institution. Learn. Build. Grow.</span>
          <span>Made in Chicago.</span>
        </div>
      </div>
    </footer>
  );
}

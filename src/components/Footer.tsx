import { Link } from '../lib/router';
import { Logo } from './Brand';
import { catalog } from '../content/catalog';
import { site } from '../content/site';

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-6">
            The AI Skills Institution. Free, plain-English courses that take you from “I’ve never coded” to shipping real
            work with AI.
          </p>
          <p className="mt-4 text-sm">
            <a className="text-white hover:text-cyan" href={`mailto:${site.email}`}>
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
            <li><Link to="/#work-with-pat" className="hover:text-white">Work with Pat</Link></li>
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
          <span>© {new Date().getFullYear()} LetsVibeAI. Learn AI. Build with AI. Grow with AI.</span>
          <span>Made in Chicago.</span>
        </div>
      </div>
    </footer>
  );
}

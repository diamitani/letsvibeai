import { offers, site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Workshops & mentorship',
  description: 'The curriculum is 100% free online. Live Build Nights, 1:1 coaching, and team workshops for when you want a guide in the room.',
  path: '/workshops',
});

export default function WorkshopsPage() {
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">Live programs</p>
      <h1 className="mt-3 text-display">Workshops & Private Mentorship</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-muted">
        The curriculum is 100% free online. When you want a live room, 1:1 project coaching or private workforce training for your team, explore our programs.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {offers.map((o) => (
          <div key={o.title} className="card flex flex-col p-6">
            <span className="eyebrow self-start rounded-full bg-violet/10 px-2.5 py-1 text-violet">{o.badge}</span>
            <h2 className="mt-4 text-xl font-bold tracking-tight">{o.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted">{o.description}</p>
            <div className="mt-5 border-t border-line/70 pt-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-growth">{o.format}</span>
            </div>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent(o.title)}`} className="btn-ghost mt-4">
              Inquire & Apply
            </a>
          </div>
        ))}
      </div>
      <p className="mt-12 max-w-xl text-sm text-muted">
        These programs do not list a public price in the source site content. Write to {site.email} and we will put together a plan.
      </p>
    </div>
  );
}

import Link from 'next/link';
import { plans } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Pricing',
  description: 'Every course on LetsVibeAI is free. Live cohorts and team programs are for when you want a guide in the room.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">Pricing</p>
      <h1 className="mt-3 text-display">Learn free. Add a guide when you want one.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Every lesson on this site is free to read and follow. Live cohorts and team workshops are paid — for when you want a guide in the room.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`card flex flex-col p-7 ${p.featured ? 'border-signal shadow-lift ring-2 ring-signal/20' : ''}`}
          >
            {p.badge ? <span className="eyebrow self-start rounded-full bg-signal/10 px-2.5 py-1 text-signal">{p.badge}</span> : <span className="h-6" />}
            <h2 className="mt-4 text-xl font-bold tracking-tight">{p.name}</h2>
            <p className="mt-1 text-sm text-muted">{p.tagline}</p>
            <p className="mt-6 text-4xl font-bold tracking-tight">
              {p.price}
              {p.per && <span className="text-base font-medium text-muted">{p.per}</span>}
            </p>
            <ul className="mt-6 flex-1 space-y-2 text-sm leading-6 text-ink/80">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link href={p.href} className={p.featured ? 'btn-primary mt-8' : 'btn-ghost mt-8'}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-sm text-muted">
        These plan names, prices, and features are taken from the existing site content file (<code className="font-mono text-xs">src/content/site.ts</code> in the source repo). The current live site does not show a public pricing page; treat the paid figures as source-of-record copy pending a final publish decision.
      </p>
    </div>
  );
}

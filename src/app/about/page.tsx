import { faqs, guides, principles, site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About',
  description: site.description,
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">About</p>
      <h1 className="mt-3 max-w-3xl text-display">{site.promise}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-7 text-muted">{site.description}</p>
      <p className="mt-3 text-sm text-muted">{site.location} · {site.email}</p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {principles.map((p) => (
          <div key={p.title} className="card p-6">
            <h2 className="text-lg font-bold tracking-tight">{p.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Who builds it</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {guides.map((g) => (
          <div key={g.name} className="card p-6">
            <p className="font-mono text-xs text-muted">{g.initials}</p>
            <h3 className="mt-2 text-lg font-bold tracking-tight">{g.name}</h3>
            <p className="text-sm text-signal">{g.role}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{g.bio}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {g.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-medium text-signal hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">Questions</h2>
      <dl className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <div key={f.q} className="py-5">
            <dt className="font-semibold tracking-tight">{f.q}</dt>
            <dd className="mt-2 leading-7 text-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

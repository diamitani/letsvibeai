import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useTitle } from '../lib/router';
import { useAuth } from '../lib/auth';
import { useProgress } from '../lib/progress';
import { Course, catalog, posterSrc } from '../content/catalog';
import { PageHeader } from './Other';

export function Account() {
  useTitle('My learning');
  const { user, ready, recovering, openAuth, signOut } = useAuth();

  if (!ready) return <div className="min-h-[50vh]" />;
  if (recovering && user) return <NewPassword />;
  if (!user)
    return (
      <>
        <PageHeader eyebrow="My learning" title="Sign in to see your progress" body="Your lessons, progress and missions, saved to your free account." />
        <section className="wrap flex gap-3 py-12">
          <button type="button" className="btn-primary" onClick={() => openAuth('signin')}>Sign in</button>
          <button type="button" className="btn-ghost" onClick={() => openAuth('signup')}>Create free account</button>
        </section>
      </>
    );

  return (
    <>
      <PageHeader eyebrow="My learning" title={`Welcome back, ${user.name}`} body="Pick up where you left off. Your progress is saved to your account on every device." />
      <section className="wrap py-12 sm:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {catalog.map((c) => (
            <CourseProgress key={c.slug} course={c} />
          ))}
        </div>
        <div className="card mt-10 flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">Account</p>
            <p className="text-sm text-muted">{user.email}</p>
          </div>
          <button type="button" className="btn-ghost" onClick={() => signOut()}>Sign out</button>
        </div>
      </section>
    </>
  );
}

function CourseProgress({ course }: { course: Course }) {
  const { done } = useProgress(course.slug);
  const total = course.lessons.length;
  const pct = Math.round((done.length / total) * 100);
  const next = course.lessons.find((l) => !done.includes(l.slug) && (l.number > 0 || done.length === 0)) || course.lessons[0];
  const complete = done.length >= total;
  const thumb = course.kind === 'video' && next.videoId ? posterSrc(next.videoId) : course.poster;
  return (
    <div className="card flex gap-4 p-4 sm:p-5">
      <img src={thumb} alt="" className="hidden h-24 w-40 shrink-0 rounded-xl bg-navy object-cover sm:block" loading="lazy" />
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-signal">{course.kind === 'video' ? 'Video course' : 'Reading course'}</p>
        <p className="mt-1 truncate font-bold">{course.title}</p>
        <div className="mt-3 flex justify-between text-xs text-muted">
          <span>{done.length}/{total} complete</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-line">
          <div className="h-full rounded-full bg-gradient-to-r from-signal to-growth" style={{ width: `${pct}%` }} />
        </div>
        <Link to={complete ? `/courses/${course.slug}` : `/courses/${course.slug}/${next.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-signal">
          {complete ? (
            <><CheckCircle2 className="h-4 w-4 text-growth" /> Completed · review</>
          ) : (
            <>{done.length ? 'Continue' : 'Start'}: {next.title} <ArrowRight className="h-4 w-4" /></>
          )}
        </Link>
      </div>
    </div>
  );
}

function NewPassword() {
  const { updatePassword } = useAuth();
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <>
      <PageHeader eyebrow="Account" title="Choose a new password" />
      <section className="wrap max-w-md py-12">
        <form
          className="card space-y-4 p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            if (pw.length < 8) return setMsg({ ok: false, text: 'Use at least 8 characters.' });
            setBusy(true);
            const err = await updatePassword(pw);
            setBusy(false);
            setMsg(err ? { ok: false, text: err } : { ok: true, text: 'Password updated. You’re signed in.' });
          }}
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">New password</span>
            <input type="password" autoComplete="new-password" className="input" value={pw} onChange={(e) => setPw(e.target.value)} />
          </label>
          {msg && <p className={`rounded-xl px-4 py-3 text-sm ${msg.ok ? 'bg-growth/10 text-[#0a7a5a]' : 'bg-red-50 text-red-700'}`}>{msg.text}</p>}
          <button className="btn-primary w-full" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save password
          </button>
        </form>
      </section>
    </>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <p className="eyebrow text-signal">404</p>
      <h1 className="mt-3 text-display">The link may be old.</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">The courses are all still here. Try the catalog, or start with the flagship path.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/courses" className="btn-primary">All courses</Link>
        <Link href="/paths" className="btn-ghost">Idea to shipped product</Link>
      </div>
    </div>
  );
}

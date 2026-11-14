import { site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import { ContactForm } from './form';

export const metadata = pageMeta({
  title: 'Contact',
  description: `Write to ${site.email} about a live build night, coaching, or a team workshop.`,
  path: '/contact',
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const topic = (await searchParams).topic || '';
  return (
    <div className="wrap py-16 sm:py-20">
      <p className="eyebrow text-signal">Contact</p>
      <h1 className="mt-3 text-display">Tell us what you want to build.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Without a form endpoint, this opens your email app addressed to {site.email}. If a contact endpoint is configured, the message is sent directly.
      </p>
      <div className="mt-10 max-w-lg">
        <ContactForm defaultTopic={topic} email={site.email} endpoint={site.contactEndpoint} />
      </div>
    </div>
  );
}

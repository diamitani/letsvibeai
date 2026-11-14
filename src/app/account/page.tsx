import { catalog, slimCourse } from '@/lib/catalog';
import { pageMeta } from '@/lib/seo';
import { AccountClient } from './ui';

export const metadata = pageMeta({
  title: 'My learning',
  description: 'Your lessons, progress and missions, saved to your free account.',
  path: '/account',
  noIndex: true,
});

export default function AccountPage() {
  return <AccountClient courses={catalog.map(slimCourse)} />;
}

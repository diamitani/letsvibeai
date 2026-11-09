import { RouterProvider, usePath } from './lib/router';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CoursePage } from './pages/CoursePage';
import { LessonPage } from './pages/LessonPage';
import { BlogPage, BlogPost, CoursesPage, NotFound } from './pages/Other';
import { getCourse } from './content/catalog';

// Old addresses that people may have saved or shared
const redirects: Record<string, string> = {
  '/courses/claude-mastery': '/courses/claude-code',
  '/claude': '/courses/claude-code',
  '/cowork': '/courses/claude-cowork',
  '/about': '/#work-with-pat',
  '/pricing': '/#work-with-pat',
  '/contact': '/#work-with-pat',
};

function Routes() {
  const raw = usePath().replace(/\/+$/, '') || '/';
  const path = redirects[raw] ?? raw.replace(/^\/courses\/claude-mastery\//, '/courses/claude-code/');
  if (path !== raw) window.history.replaceState({}, '', path);
  const parts = path.split('/').filter(Boolean);

  if (parts.length === 0) return <Home />;
  if (parts[0] === 'courses') {
    if (parts.length === 1) return <CoursesPage />;
    const course = getCourse(parts[1]);
    if (!course) return <NotFound />;
    if (parts.length === 2) return <CoursePage key={course.slug} course={course} />;
    const lesson = course.lessons.find((l) => l.slug === parts[2]);
    return lesson ? <LessonPage key={lesson.slug} course={course} lesson={lesson} /> : <NotFound />;
  }
  if (parts[0] === 'blog') return parts[1] ? <BlogPost slug={parts[1]} /> : <BlogPage />;
  return <NotFound />;
}

export function App() {
  return (
    <RouterProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <div id="main" className="flex-1">
          <Routes />
        </div>
        <Footer />
      </div>
    </RouterProvider>
  );
}

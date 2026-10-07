import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Courses, CourseDetail } from './pages/Courses';
import { Lesson } from './pages/Lesson';
import { About } from './pages/About';
import { Blog, BlogPost } from './pages/Blog';
import { Toolkit } from './pages/Toolkit';
import { Contact, NotFound, Pricing } from './pages/Other';

// Information architecture — see docs/DESIGN_SYSTEM.md#sitemap
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:slug" element={<CourseDetail />} />
          <Route path="courses/:slug/:lesson" element={<Lesson />} />
          <Route path="toolkit" element={<Toolkit />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

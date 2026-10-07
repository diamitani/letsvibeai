import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost, getPosts, toHtml } from '../lib/content';
import { ContactSection, CtaStrip } from '../components/sections';
import { Button, Icon, Markdown, Reveal, usePageTitle } from '../components/ui';
import { NotFound } from './NotFound';

export function Blog() {
  usePageTitle('Blog', 'AI news briefings, tool guides and build notes from LetsVibeAI and LiveBuildAI.');
  const posts = getPosts();
  return (
    <>
      <section className="page-hero page-hero--plain">
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">LiveBuildAI briefings & guides</p></Reveal>
          <Reveal delay={100}><h1 className="h1">The LetsVibeAI Blog</h1></Reveal>
          <Reveal delay={200}><p>What's moving in AI, what it means for builders, and the tools worth your time — in plain English.</p></Reveal>
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <div className="grid-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100}>
                <Link to={`/blog/${p.slug}`} className="post-card">
                  <div className="post-card__img"><img src={p.image} alt="" loading="lazy" /></div>
                  <div className="post-card__meta"><span className="chip">{p.type.split('+')[0].trim()}</span><span>{p.date}</span></div>
                  <h2 className="h5">{p.title}</h2>
                  <p>{p.description}</p>
                  <span className="text-link">Read More <Icon name="chevron" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
          <CtaStrip text="Want these briefings turned into a plan for your work? Let's talk." />
        </div>
      </section>
    </>
  );
}

export function BlogPost() {
  const { slug = '' } = useParams();
  const post = getPost(slug);
  const html = useMemo(() => (post ? toHtml(post.body) : ''), [post?.slug]); // eslint-disable-line react-hooks/exhaustive-deps
  usePageTitle(post?.title || 'Blog', post?.description);
  if (!post) return <NotFound />;
  const more = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__media" aria-hidden="true"><img src={post.image} alt="" /></div>
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">{post.type} · {post.date}</p></Reveal>
          <Reveal delay={100}><h1 className="h1">{post.title}</h1></Reveal>
          <Reveal delay={200}><p>{post.description}</p></Reveal>
        </div>
      </section>
      <section className="section section--white">
        <div className="container container--narrow">
          <Markdown html={html} />
          <div style={{ marginTop: 48 }}><Button href="/courses" variant="navy">Turn This Into Skills — Start a Course</Button></div>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container">
          <h2 className="h3" style={{ marginBottom: 32 }}>More from the blog</h2>
          <div className="grid-3">
            {more.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="post-card">
                <div className="post-card__img"><img src={p.image} alt="" loading="lazy" /></div>
                <div className="post-card__meta"><span>{p.date}</span></div>
                <h3 className="h5">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}

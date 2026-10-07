import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost, getPosts, toHtml } from '../lib/content';
import { ContactSection, CtaStrip } from '../components/sections';
import { Button, Icon, Markdown, Reveal, usePageTitle } from '../components/ui';
import { NotFound } from './NotFound';
import { TOP_AI_SOURCES, type AIArticle } from '../data/aiFeeds';
import { fetchLiveAIFeeds, filterArticles } from '../lib/rss';

const CATEGORIES = [
  'All Intelligence',
  'LetsVibeAI Deep Dives',
  'Foundation Labs',
  'Top Newsletters',
  'AI Engineering',
  'Venture & Strategy',
  'Deep Tech Media',
] as const;

export function Blog() {
  usePageTitle('AI Intelligence & Feeds', 'Curated feeds and briefings from the top 100 AI newsletters, foundation research labs, engineering blogs, and LetsVibeAI.');

  const [articles, setArticles] = useState<AIArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Intelligence');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [showSourcesList, setShowSourcesList] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchLiveAIFeeds().then((data) => {
      if (mounted) {
        setArticles(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const filteredArticles = useMemo(() => {
    return filterArticles(articles, {
      category: selectedCategory,
      searchQuery,
      selectedSource: selectedSource || undefined,
      onlyOriginals: selectedCategory === 'LetsVibeAI Deep Dives',
    });
  }, [articles, selectedCategory, searchQuery, selectedSource]);

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of articles) {
      counts[a.sourceCategory] = (counts[a.sourceCategory] || 0) + 1;
    }
    return counts;
  }, [articles]);

  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="page-hero page-hero--plain" style={{ paddingBottom: 40 }}>
        <div className="container page-hero__inner">
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 18px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 9999, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399', display: 'inline-block' }}></span>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#38bdf8' }}>
                AI Intelligence Radar · Top 100 Sources
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}><h1 className="h1">AI Intelligence &amp; Feeds</h1></Reveal>
          <Reveal delay={200}>
            <p style={{ maxWidth: 780, margin: '0 auto' }}>
              Real-time briefings, research breakdowns, and actionable guides curated from the top 100 AI newsletters, frontier labs, developer platforms, and LetsVibeAI deep dives.
            </p>
          </Reveal>

          {/* Search bar & quick filters */}
          <Reveal delay={280} style={{ maxWidth: 680, margin: '36px auto 0' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 100+ AI newsletters, labs, tools, or topics..."
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 48px',
                  fontSize: 16,
                  borderRadius: 14,
                  border: '1px solid var(--border-soft, #cbd5e1)',
                  background: '#ffffff',
                  boxShadow: '0 4px 20px rgba(8, 16, 40, 0.06)',
                  color: '#081028',
                }}
              />
              <span style={{ position: 'absolute', left: 18, color: '#64748b', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <Icon name="spark" size={18} />
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 14 }}
                >
                  Clear
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Filter Bar & Content ────────────────────────── */}
      <section className="section section--white" style={{ paddingTop: 20 }}>
        <div className="container">
          
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 32, justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const count = cat === 'All Intelligence' ? articles.length : (sourceCounts[cat] || 0);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setSelectedCategory(cat); setSelectedSource(''); }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: active ? '1px solid var(--blue-strong, #2f80ed)' : '1px solid #e2e8f0',
                    background: active ? 'var(--blue-strong, #2f80ed)' : '#f8fafc',
                    color: active ? '#ffffff' : '#334155',
                    boxShadow: active ? '0 4px 14px rgba(47, 128, 237, 0.25)' : 'none',
                  }}
                >
                  {cat} {count > 0 && <span style={{ opacity: active ? 0.9 : 0.6, fontSize: 12, marginLeft: 4 }}>({count})</span>}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setShowSourcesList(!showSourcesList)}
              style={{
                padding: '8px 18px',
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px dashed #94a3b8',
                background: showSourcesList ? '#0f172a' : 'transparent',
                color: showSourcesList ? '#ffffff' : '#475569',
              }}
            >
              {showSourcesList ? 'Hide Source Index ▲' : 'Browse Top 100 Sources ▼'}
            </button>
          </div>

          {/* Top 100 Sources Directory Accordion / Grid */}
          {showSourcesList && (
            <Reveal className="source-directory-card" style={{
              background: '#081028',
              color: '#ffffff',
              borderRadius: 20,
              padding: '32px 28px',
              marginBottom: 48,
              boxShadow: '0 20px 40px rgba(8, 16, 40, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: 22, fontWeight: 700, margin: 0 }}>
                    The Top 100 AI Intelligence Directory
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>
                    Curated feeds covering frontier research, developer frameworks, newsletters, and venture strategy.
                  </p>
                </div>
                <div style={{ fontSize: 13, color: '#34d399', fontWeight: 600, background: 'rgba(52, 211, 153, 0.15)', padding: '6px 14px', borderRadius: 9999 }}>
                  ✦ All 100+ Feeds Monitored
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                {TOP_AI_SOURCES.map((src) => {
                  const isFiltered = selectedSource === src.name;
                  return (
                    <div
                      key={src.name}
                      style={{
                        background: isFiltered ? 'rgba(47, 128, 237, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        border: isFiltered ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 12,
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: src.badgeColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {src.category.replace('Top ', '')}
                        </span>
                        <a href={src.website} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', fontSize: 12, textDecoration: 'none' }} title="Visit source website">
                          <Icon name="arrow" size={14} />
                        </a>
                      </div>
                      <strong style={{ color: '#f8fafc', fontSize: 15 }}>{src.name}</strong>
                      <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.4, margin: 0 }}>{src.description}</p>
                      <button
                        type="button"
                        onClick={() => { setSelectedSource(isFiltered ? '' : src.name); setShowSourcesList(false); }}
                        style={{
                          marginTop: 6,
                          background: isFiltered ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                          color: isFiltered ? '#081028' : '#cbd5e1',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        {isFiltered ? 'Clear Filter' : 'Filter Feed'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* Active Filter Indicator */}
          {selectedSource && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '10px 16px', background: '#e0f2fe', borderRadius: 10, color: '#0369a1', fontSize: 14 }}>
              <span>Filtering by source: <strong>{selectedSource}</strong></span>
              <button
                type="button"
                onClick={() => setSelectedSource('')}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#0284c7', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Show all sources
              </button>
            </div>
          )}

          {/* Articles Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <p>Fetching real-time intelligence from top AI feeds...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <h3 className="h4" style={{ marginBottom: 12 }}>No articles found</h3>
              <p>Try clearing your search query or selecting a different category.</p>
              <div style={{ marginTop: 24 }}>
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All Intelligence'); setSelectedSource(''); }} variant="outline">
                  Reset Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid-3" style={{ rowGap: 36 }}>
              {filteredArticles.map((art, i) => {
                const isOriginal = art.isOriginal;
                return (
                  <Reveal key={art.id} delay={(i % 3) * 80}>
                    <div
                      className="post-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        border: isOriginal ? '2px solid rgba(47, 128, 237, 0.4)' : '1px solid #e2e8f0',
                        borderRadius: 18,
                        overflow: 'hidden',
                        background: '#ffffff',
                        boxShadow: '0 8px 24px rgba(8, 16, 40, 0.04)',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {/* Card Header & Source Badge */}
                      <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          className="chip"
                          style={{
                            background: isOriginal ? 'rgba(47, 128, 237, 0.1)' : '#f1f5f9',
                            color: isOriginal ? '#2f80ed' : '#334155',
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        >
                          {art.source}
                        </span>
                        <span style={{ fontSize: 13, color: '#94a3b8' }}>{art.publishedAt}</span>
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h2 className="h5" style={{ fontSize: 19, lineHeight: 1.35, marginBottom: 12, color: '#081028' }}>
                          {isOriginal && art.slug ? (
                            <Link to={`/blog/${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                              {art.title}
                            </Link>
                          ) : (
                            <a href={art.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                              {art.title}
                            </a>
                          )}
                        </h2>

                        <p style={{ fontSize: 14, lineHeight: 1.55, color: '#475569', marginBottom: 20, flex: 1 }}>
                          {art.summary}
                        </p>

                        {/* Tags */}
                        {art.tags && art.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                            {art.tags.map((tag) => (
                              <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: '#64748b', background: '#f8fafc', padding: '3px 8px', borderRadius: 6 }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Action Link */}
                        <div style={{ paddingTop: 12, borderTop: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 12, color: '#94a3b8' }}>{art.readTime}</span>
                          {isOriginal && art.slug ? (
                            <Link to={`/blog/${art.slug}`} className="text-link" style={{ fontSize: 14, fontWeight: 700, color: '#2f80ed' }}>
                              Read Deep Dive <Icon name="chevron" size={16} />
                            </Link>
                          ) : (
                            <a href={art.url} target="_blank" rel="noreferrer" className="text-link" style={{ fontSize: 14, fontWeight: 700, color: '#2f80ed', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              Read Source <Icon name="arrow" size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 64 }}>
            <CtaStrip text="Want these AI breakthroughs turned into working tools and software? Start our free courses." />
          </div>
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
          <h2 className="h3" style={{ marginBottom: 32 }}>More from the intelligence radar</h2>
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

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ARCHITECTURE_BLOCKS, DOC_TEMPLATES } from '../data/courseData';
import { getResource, toHtml } from '../lib/content';
import { CopyBlock } from '../components/learning';
import { CtaStrip } from '../components/sections';
import { Markdown, Reveal, SectionHead, usePageTitle } from '../components/ui';

const tabs = [
  { id: 'blocks', label: '11 Building Blocks' },
  { id: 'docs', label: '11-Doc Planning Stack' },
  { id: 'prompts', label: 'Prompt Library' },
  { id: 'checklists', label: 'Checklists' },
  { id: 'glossary', label: 'Glossary' },
];

const layerLabel: Record<string, string> = {
  client: 'Client', gateway: 'Gateway', server: 'Server', persistence: 'Data', external: 'Platform',
};

export function Toolkit() {
  usePageTitle('Builder Toolkit', 'The 11 building blocks, 11-document planning stack, prompt library, checklists and glossary for building with AI.');
  const [params, setParams] = useSearchParams();
  const active = tabs.some((t) => t.id === params.get('tab')) ? params.get('tab')! : 'blocks';

  const md = useMemo(() => ({
    prompts: toHtml(getResource('prompt-library')),
    glossary: toHtml(getResource('glossary')),
    checklists: ['pre-launch', 'review-agent-team', 'capstone'].map((n) => toHtml(getResource(n))),
  }), []);

  return (
    <>
      <section className="page-hero page-hero--plain">
        <div className="container page-hero__inner">
          <Reveal><p className="eyebrow">Free resources</p></Reveal>
          <Reveal delay={100}><h1 className="h1">The Builder Toolkit</h1></Reveal>
          <Reveal delay={200}><p>The maps, templates and prompts we use to plan and ship every app. Copy them, download them and make them yours.</p></Reveal>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Toolkit sections">
            {tabs.map((t) => (
              <button key={t.id} role="tab" className="tab" aria-selected={active === t.id} aria-controls={`panel-${t.id}`}
                onClick={() => setParams(t.id === 'blocks' ? {} : { tab: t.id }, { replace: true })}>
                {t.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${active}`}>
            {active === 'blocks' && (
              <>
                <SectionHead title="Every App Has an Architecture" text="Pick one tool for each block, connect them in the right order, and you have a foundation that scales." />
                <Reveal className="detail-figure" style={{ aspectRatio: 'auto', background: 'var(--mist)' }}>
                  <img src="/images/architecture.png" alt="Diagram of the 11 web app building blocks and how they connect" style={{ objectFit: 'contain' }} />
                </Reveal>
                <div className="grid-3">
                  {ARCHITECTURE_BLOCKS.map((b) => (
                    <article className="block-card" key={b.id}>
                      <div className="block-card__top">
                        <h3 className="h5">{b.analogyIcon} {b.name}</h3>
                        <span className="chip">{layerLabel[b.layer]}</span>
                      </div>
                      <p>{b.role}</p>
                      <dl>
                        <div><dt>Analogy</dt><dd>{b.analogy}</dd></div>
                        <div><dt>Start with</dt><dd>{b.defaultTool}</dd></div>
                        <div><dt>Alternatives</dt><dd>{b.alternatives.join(' · ')}</dd></div>
                        <div><dt>Security</dt><dd>{b.securityNote}</dd></div>
                      </dl>
                      <CopyBlock label="Example prompt" text={b.promptExample} />
                    </article>
                  ))}
                </div>
              </>
            )}

            {active === 'docs' && (
              <>
                <SectionHead title="The 11-Document Planning Stack" text="Write these before you build. Give them to your AI agent and it builds the right thing the first time." />
                <div className="grid-2">
                  {DOC_TEMPLATES.map((d) => (
                    <article className="block-card" key={d.id}>
                      <div className="block-card__top">
                        <h3 className="h5">{d.num}. {d.title}</h3>
                        <span className="chip">{d.owner}</span>
                      </div>
                      <p>{d.purpose}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{d.keySections.map((k) => <span key={k} className="chip">{k}</span>)}</div>
                      <CopyBlock label="Prompt" text={d.samplePrompt} />
                      <details>
                        <summary className="text-link" style={{ cursor: 'pointer' }}>View template ({d.filename})</summary>
                        <div style={{ marginTop: 12 }}><CopyBlock label={d.filename} text={d.contentTemplate} filename={d.filename} /></div>
                      </details>
                    </article>
                  ))}
                </div>
              </>
            )}

            {active === 'prompts' && <div className="container--narrow" style={{ marginInline: 'auto' }}><Markdown html={md.prompts} /></div>}
            {active === 'glossary' && <div className="container--narrow" style={{ marginInline: 'auto' }}><Markdown html={md.glossary} /></div>}
            {active === 'checklists' && (
              <div className="grid-3">
                {md.checklists.map((html, i) => <div className="block-card" key={i}><Markdown html={html} /></div>)}
              </div>
            )}
          </div>
          <CtaStrip text="Want a second pair of eyes on your plan? Book a build call." />
        </div>
      </section>
    </>
  );
}

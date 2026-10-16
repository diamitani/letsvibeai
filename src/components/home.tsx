// Homepage-only pieces: hero showcase (video + code) and the 8 core practices.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { practices } from '../content/site';
import { Button, Icon, Reveal, SectionHead } from './ui';

const SNIPPET = `# Project rules

Stack: Next.js, TypeScript, pnpm.

## Always
- Run \`pnpm test\` before saying done
- Small commits, clear messages

## Never
- Edit files in /dist
- Commit .env files`;

function highlight(line: string) {
  if (line.startsWith('#')) return <span className="k">{line}</span>;
  if (line.startsWith('- ')) return <><span className="n">- </span>{line.slice(2)}</>;
  return <>{line}</>;
}

export function HeroShowcase() {
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(SNIPPET); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* blocked */ }
  }
  return (
    <Reveal className="showcase" delay={200}>
      <div className="showcase__left">
        <div className="video-card">
          {playing ? (
            <video src="/videos/letsvibeai-trailer.mp4" poster="/images/trailer-poster.jpg" controls autoPlay playsInline />
          ) : (
            <>
              <img src="/images/trailer-poster.jpg" alt="" />
              <div className="video-card__shade" />
              <span className="video-card__tag">Course trailer · 0:16</span>
              <button className="video-card__play" onClick={() => setPlaying(true)} aria-label="Play the course trailer"><Play /></button>
              <div className="video-card__meta">
                <strong>Direction beats guessing.</strong>
                <span>The idea behind every LetsVibeAI course.</span>
              </div>
            </>
          )}
        </div>
        <div className="float-quote">
          <img src="/images/pat.png" alt="" />
          <div><p>“From typist to director.”</p><span>Pat Diamitani, Founder</span></div>
        </div>
      </div>
      <div className="code-card">
        <div className="code-card__head">
          <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="code-card__file">CLAUDE.md · Lesson 2</span>
        </div>
        <pre aria-label="Example CLAUDE.md file"><code>{SNIPPET.split('\n').map((l, i) => <div key={i}>{highlight(l) || '\u00a0'}</div>)}</code></pre>
        <div className="code-card__foot">
          <p>Write your rules once. Every agent session starts informed.</p>
          <span style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--ghost btn--sm" onClick={copy} aria-live="polite"><Icon name={copied ? 'check' : 'copy'} />{copied ? 'Copied' : 'Copy'}</button>
            <Button href="/courses/claude-mastery/context-files" size="sm">Open Lesson</Button>
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export function PracticesSection() {
  return (
    <section className="section section--white" aria-labelledby="practices-title">
      <div className="container">
        <SectionHead
          title={<span id="practices-title">8 Core Practices for <em>Working with AI Agents</em></span>}
          text="Field-tested habits that make agent sessions predictable and safe. Each one is a lesson in Claude Mastery."
        />
        <div className="practices">
          {practices.map((p, i) => (
            <Reveal key={p.n} delay={(i % 4) * 90}>
              <Link to={`/courses/claude-mastery/${p.to}`} className="practice" style={{ height: '100%' }}>
                <span className="practice__n">RULE {p.n}</span>
                <h3 className="h5">{p.title}</h3>
                <p>{p.body}</p>
                <span className="text-link">See the lesson <Icon name="chevron" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

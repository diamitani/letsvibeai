// Interactive learning pieces used on lesson pages.
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import type { QuizQuestion } from '../types';
import { Icon } from './ui';

/** Copyable prompt / template block with optional .md download. */
export function CopyBlock({ label, text, filename }: { label: string; text: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: filename });
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span>{label}</span>
        <span style={{ display: 'flex', gap: 6 }}>
          {filename && <button onClick={download}><Icon name="download" />Download</button>}
          <button onClick={copy} aria-live="polite"><Icon name={copied ? 'check' : 'copy'} />{copied ? 'Copied' : 'Copy'}</button>
        </span>
      </div>
      {text}
    </div>
  );
}

/** 3-question knowledge check with instant feedback. */
export function Quiz({ questions, onPass }: { questions: QuizQuestion[]; onPass?: () => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  useEffect(() => { setAnswers({}); setChecked(false); }, [questions]);

  function check() {
    setChecked(true);
    if (score === questions.length) {
      onPass?.();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        confetti({ particleCount: 120, spread: 75, origin: { y: 0.7 }, colors: ['#2F80ED', '#34D399', '#7C5CFC', '#20C7D9'] });
      }
    }
  }

  return (
    <div className="quiz">
      <p className="eyebrow">Knowledge check</p>
      <h3 className="h4" style={{ margin: '8px 0 24px' }}>Test what you learned</h3>
      {questions.map((q, qi) => (
        <fieldset className="quiz__q" key={q.id} style={{ border: 0 }}>
          <legend className="sr-only">Question {qi + 1}</legend>
          <h4>{qi + 1}. {q.question}</h4>
          <div className="quiz__opts">
            {q.options.map((opt, oi) => {
              const selected = answers[q.id] === oi;
              const state = checked ? (oi === q.correctIndex ? ' correct' : selected ? ' wrong' : '') : '';
              return (
                <button key={oi} className={`quiz__opt${selected ? ' selected' : ''}${state}`} disabled={checked}
                  aria-pressed={selected} onClick={() => setAnswers({ ...answers, [q.id]: oi })}>
                  <span className="dot" />{opt}
                </button>
              );
            })}
          </div>
          {checked && <p className="quiz__exp"><strong>{answers[q.id] === q.correctIndex ? 'Correct. ' : 'Not quite. '}</strong>{q.explanation}</p>}
        </fieldset>
      ))}
      <div className="quiz__foot">
        {checked
          ? <p role="status"><strong>{score} / {questions.length} correct.</strong> {score === questions.length ? 'Module complete!' : 'Review the lesson and try again.'}</p>
          : <p className="muted small">Answer all {questions.length} questions to check.</p>}
        {checked
          ? <button className="btn btn--outline btn--sm" onClick={() => { setAnswers({}); setChecked(false); }}>Try Again</button>
          : <button className="btn btn--primary btn--sm" onClick={check} disabled={!allAnswered}>Check Answers</button>}
      </div>
    </div>
  );
}

/** Lesson completion stored in the browser (no account needed). */
const KEY = 'letsvibeai_progress_v2';
export function useProgress(courseSlug: string) {
  const read = (): string[] => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}')[courseSlug] || []; } catch { return []; }
  };
  const [done, setDone] = useState<string[]>(read);
  useEffect(() => setDone(read()), [courseSlug]); // eslint-disable-line react-hooks/exhaustive-deps
  function mark(lesson: string, value = true) {
    setDone((prev) => {
      const next = value ? Array.from(new Set([...prev, lesson])) : prev.filter((l) => l !== lesson);
      try {
        const all = JSON.parse(localStorage.getItem(KEY) || '{}');
        localStorage.setItem(KEY, JSON.stringify({ ...all, [courseSlug]: next }));
      } catch { /* storage unavailable */ }
      return next;
    });
  }
  return { done, mark };
}

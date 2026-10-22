// ─────────────────────────────────────────────────────────────
// Minimal markdown renderer for blog posts and lessons.
// Handles headings, bold, links, lists, code fences, tables and
// horizontal rules. No dangerouslySetInnerHTML.
// ─────────────────────────────────────────────────────────────

import React from 'react';

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  // Split on **bold** first, then links inside each segment.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    const content = boldMatch ? boldMatch[1] : part;
    const linkParts = content.split(/(\[[^\]]+\]\([^)]+\))/g).map((seg, j) => {
      const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (!linkMatch) return seg;
      return (
        <a
          key={`${key}-${j}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2F80ED] underline underline-offset-2 hover:text-[#ec4909]"
        >
          {linkMatch[1]}
        </a>
      );
    });
    return boldMatch ? <strong key={key} className="font-bold text-[#071B3A]">{linkParts}</strong> : <React.Fragment key={key}>{linkParts}</React.Fragment>;
  });
}

export const Markdown: React.FC<{ source: string; className?: string }> = ({ source, className }) => {
  const lines = source.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const k = `b${key++}`;

    if (line.trim() === '') { i++; continue; }

    if (line.trim() === '---') {
      blocks.push(<hr key={k} className="my-6 border-[#4a4d4f]/15" />);
      i++; continue;
    }

    if (line.startsWith('```')) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { buf.push(lines[i]); i++; }
      i++;
      blocks.push(
        <pre key={k} className="my-4 p-4 rounded-2xl bg-[#071B3A] text-slate-100 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
          {buf.join('\n')}
        </pre>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(<h3 key={k} className="mt-6 mb-2 text-lg font-black text-[#071B3A] tracking-tight">{renderInline(line.slice(4), k)}</h3>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      blocks.push(<h2 key={k} className="mt-8 mb-3 text-2xl font-black text-[#071B3A] tracking-tight">{renderInline(line.slice(3), k)}</h2>);
      i++; continue;
    }
    if (line.startsWith('# ')) {
      blocks.push(<h1 key={k} className="mt-8 mb-3 text-3xl font-black text-[#071B3A] tracking-tight">{renderInline(line.slice(2), k)}</h1>);
      i++; continue;
    }

    // Tables: render as a preformatted block (keeps content readable, no fake structure)
    if (line.trim().startsWith('|')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { buf.push(lines[i]); i++; }
      const rows = buf
        .filter((r) => !/^\|[\s\-|:]+\|$/.test(r.trim()))
        .map((r) => r.trim().slice(1, -1).split('|').map((c) => c.trim()));
      blocks.push(
        <div key={k} className="my-4 overflow-x-auto rounded-2xl border border-[#4a4d4f]/10">
          <table className="w-full text-xs text-left">
            <tbody>
              {rows.map((cells, ri) => (
                <tr key={ri} className={ri === 0 ? 'bg-[#F4F7FB] font-bold text-[#071B3A]' : 'border-t border-[#4a4d4f]/10 text-[#4a4d4f]'}>
                  {cells.map((c, ci) => (
                    <td key={ci} className="px-3 py-2 align-top">{renderInline(c, `${k}-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*] /, '')); i++; }
      blocks.push(
        <ul key={k} className="my-3 space-y-1.5 list-disc pl-5 text-sm text-[#4a4d4f] leading-relaxed">
          {items.map((item, ii) => <li key={ii}>{renderInline(item, `${k}-${ii}`)}</li>)}
        </ul>
      );
      continue;
    }

    if (/^\s*\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\. /, '')); i++; }
      blocks.push(
        <ol key={k} className="my-3 space-y-1.5 list-decimal pl-5 text-sm text-[#4a4d4f] leading-relaxed">
          {items.map((item, ii) => <li key={ii}>{renderInline(item, `${k}-${ii}`)}</li>)}
        </ol>
      );
      continue;
    }

    // Paragraph: merge consecutive plain lines
    const buf: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,3} |```|---|\s*[-*] |\s*\d+\. |\|)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    blocks.push(
      <p key={k} className="my-3 text-sm sm:text-base text-[#4a4d4f] leading-relaxed">
        {renderInline(buf.join(' '), k)}
      </p>
    );
  }

  return <div className={className}>{blocks}</div>;
};

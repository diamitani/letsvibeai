import { renderMarkdown } from '@/lib/markdown';

export function Markdown({ content, className = 'prose-lv' }: { content: string; className?: string }) {
  const html = renderMarkdown(content);
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

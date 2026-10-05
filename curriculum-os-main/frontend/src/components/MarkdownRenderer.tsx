"use client";

import React from "react";

// Simple inline markdown renderer — avoids heavy deps
export default function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeKey = 0;

  lines.forEach((line, i) => {
    const key = `line-${i}`;

    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${codeKey++}`}
            className="bg-secondary/50 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono"
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.trim() === "") {
      elements.push(<div key={key} className="h-2" />);
      return;
    }

    // Process inline formatting
    let processed = line;

    // Bold
    processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // Inline code
    processed = processed.replace(/`([^`]+)`/g, '<code class="bg-secondary/50 px-1 py-0.5 rounded text-xs font-mono">$1</code>');

    // Links
    processed = processed.replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-primary underline" target="_blank" rel="noopener">$1</a>'
    );

    // Headers
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key} className="text-sm font-semibold mt-3 mb-1">
          <span dangerouslySetInnerHTML={{ __html: processed.replace("### ", "") }} />
        </h3>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key} className="text-base font-semibold mt-3 mb-1">
          <span dangerouslySetInnerHTML={{ __html: processed.replace("## ", "") }} />
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key} className="text-lg font-bold mt-4 mb-2">
          <span dangerouslySetInnerHTML={{ __html: processed.replace("# ", "") }} />
        </h1>
      );
    } else if (line.trim().startsWith("- ")) {
      elements.push(
        <div key={key} className="flex gap-2 ml-1">
          <span className="text-muted-foreground">•</span>
          <span
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: processed.replace(/^-\s*/, "") }}
          />
        </div>
      );
    } else if (/^\d+\.\s/.test(line.trim())) {
      const num = line.trim().match(/^(\d+)\./)?.[1];
      elements.push(
        <div key={key} className="flex gap-2 ml-1">
          <span className="text-muted-foreground min-w-[1.25rem]">{num}.</span>
          <span
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: processed.replace(/^\d+\.\s*/, "") }}
          />
        </div>
      );
    } else {
      elements.push(
        <p key={key} className="text-sm leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: processed }} />
        </p>
      );
    }
  });

  // Close unclosed code block
  if (inCodeBlock && codeLines.length > 0) {
    elements.push(
      <pre
        key={`code-${codeKey++}`}
        className="bg-secondary/50 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono"
      >
        <code>{codeLines.join("\n")}</code>
      </pre>
    );
  }

  return <>{elements}</>;
}

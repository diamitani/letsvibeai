"use client";

import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { CurriculumDisplay } from "./CurriculumDisplay";
import ReactMarkdown from "./MarkdownRenderer";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-primary text-xs font-bold">CO</span>
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border border-border rounded-bl-md"
        )}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown content={message.content} />
        </div>

        {message.curriculum && (
          <div className="mt-4 border-t border-border pt-4">
            <CurriculumDisplay curriculum={message.curriculum} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-primary-foreground text-xs font-bold">You</span>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Module as ModuleType } from "@/types";
import { ChevronDown, ChevronUp, Clock, BookOpen } from "lucide-react";

interface ModuleCardProps {
  module: ModuleType;
  moduleNumber: number;
}

export function ModuleCard({ module, moduleNumber }: ModuleCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-colors hover:border-primary/20">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/20 transition-colors"
      >
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
          {moduleNumber}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">
            {module.title}
          </h4>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={10} />
              {module.estimated_hours}h
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <BookOpen size={10} />
              {module.lessons.length} lessons
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border px-4 py-3 space-y-3 bg-secondary/10">
          {/* Objectives */}
          {module.objectives.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Objectives
              </p>
              <ul className="space-y-0.5">
                {module.objectives.map((obj, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground/70 flex gap-1.5"
                  >
                    <span className="text-primary">•</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lessons */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Lessons
            </p>
            <div className="space-y-2">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-secondary/30 rounded-lg p-2.5"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground">
                      {moduleNumber}.{lesson.order} {lesson.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {lesson.estimated_minutes} min
                    </span>
                  </div>
                  {lesson.objectives.length > 0 && (
                    <ul className="space-y-0.5 mb-1.5">
                      {lesson.objectives.slice(0, 2).map((obj, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-muted-foreground flex gap-1"
                        >
                          <span>◦</span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  )}
                  {lesson.exercises.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {lesson.exercises.map((ex, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  )}
                  {lesson.custom_content && (
                    <div className="mt-1.5 text-[11px] text-emerald-400 flex items-center gap-1">
                      <span>✨</span> Custom PAL-generated content available
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Curriculum } from "@/types";
import { ModuleCard } from "./ModuleCard";
import {
  BookOpen,
  Target,
  Clock,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CurriculumDisplayProps {
  curriculum: Curriculum;
}

export function CurriculumDisplay({ curriculum }: CurriculumDisplayProps) {
  const [showAll, setShowAll] = useState(false);
  const { modules, learning_objectives, assessment_milestones, coverage_gaps, recommended_next_topics, total_estimated_hours } =
    curriculum;

  const visibleModules = showAll ? modules : modules.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Summary card */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-secondary/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock size={14} />
            <span className="text-xs font-medium">Total Time</span>
          </div>
          <p className="text-lg font-bold text-foreground">{total_estimated_hours}h</p>
        </div>
        <div className="bg-secondary/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <BookOpen size={14} />
            <span className="text-xs font-medium">Modules</span>
          </div>
          <p className="text-lg font-bold text-foreground">{modules.length}</p>
        </div>
      </div>

      {/* Learning Objectives */}
      {learning_objectives.length > 0 && (
        <div className="bg-secondary/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              Learning Objectives
            </span>
          </div>
          <ul className="space-y-1">
            {learning_objectives.map((obj, i) => (
              <li key={i} className="text-sm text-foreground/80 flex gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modules */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Modules
          </h3>
          {modules.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              {showAll ? (
                <>
                  Show less <ChevronUp size={12} />
                </>
              ) : (
                <>
                  Show all {modules.length} <ChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </div>
        <div className="space-y-3">
          {visibleModules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} moduleNumber={mod.order} />
          ))}
        </div>
      </div>

      {/* Coverage Gaps */}
      {coverage_gaps.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-xs font-semibold text-amber-400">
              Coverage Gaps
            </span>
          </div>
          <ul className="space-y-1">
            {coverage_gaps.map((gap, i) => (
              <li key={i} className="text-sm text-amber-300/80 flex gap-2">
                <span>•</span>
                {gap}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assessment Milestones */}
      {assessment_milestones.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">
              Assessment Milestones
            </span>
          </div>
          <ul className="space-y-1">
            {assessment_milestones.slice(0, 3).map((m, i) => (
              <li key={i} className="text-sm text-primary/80 flex gap-2">
                <span>•</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Topics */}
      {recommended_next_topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1">
            <ArrowRight size={12} />
            Next:
          </span>
          {recommended_next_topics.map((t, i) => (
            <span
              key={i}
              className="text-xs bg-secondary/50 rounded-full px-2 py-0.5 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

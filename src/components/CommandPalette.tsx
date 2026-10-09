import React, { useState, useEffect } from 'react';
import { COURSE_MODULES, ARCHITECTURE_BLOCKS, DOC_TEMPLATES } from '../data/courseData';
import { AGENT_SKILLS } from '../data/agentPlatformData';
import { HARNESS_LESSONS } from '../data/harnessMasteryData';
import { GENCY_SKILLS_LIBRARY } from '../data/skillsLibraryData';
import { Search, BookOpen, Layers, FileText, ArrowRight, X, Cpu, Play } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (targetSection: string, detailId?: string | number) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  // Handle keyboard navigation & Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results
  const moduleResults = COURSE_MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(normalizedQuery) ||
      m.tagline.toLowerCase().includes(normalizedQuery) ||
      m.lessons.some((l) => l.title.toLowerCase().includes(normalizedQuery))
  );

  const blockResults = ARCHITECTURE_BLOCKS.filter(
    (b) =>
      b.name.toLowerCase().includes(normalizedQuery) ||
      b.role.toLowerCase().includes(normalizedQuery) ||
      b.defaultTool.toLowerCase().includes(normalizedQuery)
  );

  const docResults = DOC_TEMPLATES.filter(
    (d) =>
      d.title.toLowerCase().includes(normalizedQuery) ||
      d.filename.toLowerCase().includes(normalizedQuery) ||
      d.purpose.toLowerCase().includes(normalizedQuery)
  );

  const skillResults = AGENT_SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(normalizedQuery) ||
      s.summary.toLowerCase().includes(normalizedQuery) ||
      s.cat.toLowerCase().includes(normalizedQuery)
  );

  const harnessResults = HARNESS_LESSONS.filter(
    (h) =>
      h.title.toLowerCase().includes(normalizedQuery) ||
      h.desc.toLowerCase().includes(normalizedQuery) ||
      'harness'.includes(normalizedQuery)
  );

  const skillsLibResults = GENCY_SKILLS_LIBRARY.filter(
    (s) =>
      s.name.toLowerCase().includes(normalizedQuery) ||
      s.tagline.toLowerCase().includes(normalizedQuery) ||
      s.category.toLowerCase().includes(normalizedQuery) ||
      s.triggers.some((t) => t.toLowerCase().includes(normalizedQuery))
  );

  const handleItemClick = (section: string, detailId?: string | number) => {
    onSelectResult(section, detailId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-[#281010]/60 backdrop-blur-sm">
      <div className="bg-white border border-[#EAE3D9] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-left">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EAE3D9] flex items-center gap-3 bg-[#F8F3EC]">
          <Search className="w-5 h-5 text-[#FA5929] shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search modules, architecture blocks, planning docs, prompts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#281010] placeholder-[#706B67] focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#706B67] hover:text-[#281010] rounded-full bg-white border border-[#EAE3D9] shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-3 max-h-[420px] overflow-y-auto space-y-4">
          
          {/* Modules Group */}
          {moduleResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-[#706B67] uppercase px-3 py-1">
                Course Modules ({moduleResults.length})
              </div>
              <div className="space-y-1">
                {moduleResults.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleItemClick('curriculum', m.id)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F8F3EC] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-[#FA5929] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#281010] group-hover:text-[#FA5929]">
                          Module {m.id}: {m.title}
                        </div>
                        <div className="text-[11px] text-[#706B67]">{m.tagline}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#706B67] group-hover:text-[#FA5929]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Blocks Group */}
          {blockResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-[#706B67] uppercase px-3 py-1">
                Architecture Blocks ({blockResults.length})
              </div>
              <div className="space-y-1">
                {blockResults.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleItemClick('architecture', b.id)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F8F3EC] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-[#FA5929] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#281010] group-hover:text-[#FA5929]">
                          {b.name} ({b.defaultTool.split('+')[0]})
                        </div>
                        <div className="text-[11px] text-[#706B67]">Analogy: {b.analogy}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#706B67] group-hover:text-[#FA5929]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents Group */}
          {docResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-[#706B67] uppercase px-3 py-1">
                11 Planning Docs ({docResults.length})
              </div>
              <div className="space-y-1">
                {docResults.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleItemClick('docs', d.id)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F8F3EC] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#FA5929] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#281010] group-hover:text-[#FA5929]">
                          Doc {d.num}: {d.title}
                        </div>
                        <div className="text-[11px] text-[#706B67]">{d.filename}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#706B67] group-hover:text-[#FA5929]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Agent Skills Group */}
          {skillResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-[#706B67] uppercase px-3 py-1">
                Modular Agent Skills ({skillResults.length})
              </div>
              <div className="space-y-1">
                {skillResults.slice(0, 6).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleItemClick('agent-platform', s.id)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F8F3EC] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-[#FA5929] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#281010] group-hover:text-[#FA5929]">
                          {s.name} <span className="text-[10px] text-[#706B67] font-mono">({s.cat})</span>
                        </div>
                        <div className="text-[11px] text-[#706B67] line-clamp-1">{s.summary}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#706B67] group-hover:text-[#FA5929]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Harness Lessons Group */}
          {harnessResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-[#706B67] uppercase px-3 py-1">
                Agent Harness Mastery Lessons ({harnessResults.length})
              </div>
              <div className="space-y-1">
                {harnessResults.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleItemClick('harness-mastery', h.id)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F8F3EC] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Play className="w-4 h-4 text-[#FA5929] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#281010] group-hover:text-[#FA5929]">
                          Lesson {h.num}: {h.title} <span className="text-[10px] text-[#706B67] font-mono">({h.dur})</span>
                        </div>
                        <div className="text-[11px] text-[#706B67] line-clamp-1">{h.desc}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#706B67] group-hover:text-[#FA5929]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Skills Library Group */}
          {skillsLibResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-[#706B67] uppercase px-3 py-1">
                Skills Library ({skillsLibResults.length})
              </div>
              <div className="space-y-1">
                {skillsLibResults.slice(0, 6).map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => handleItemClick('skills-library', s.slug)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F8F3EC] flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-[#FA5929] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#281010] group-hover:text-[#FA5929]">
                          {s.name} <span className="text-[10px] text-[#706B67] font-mono">({s.category})</span>
                        </div>
                        <div className="text-[11px] text-[#706B67] line-clamp-1">{s.tagline}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#706B67] group-hover:text-[#FA5929]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {moduleResults.length === 0 && blockResults.length === 0 && docResults.length === 0 && skillResults.length === 0 && harnessResults.length === 0 && skillsLibResults.length === 0 && (
            <div className="p-8 text-center text-xs text-[#706B67] font-mono">
              No matching modules, architecture nodes, documents, skills, harness lessons, or library skills found for "{query}".
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-[#F8F3EC] border-t border-[#EAE3D9] text-[11px] font-mono text-[#706B67] flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#EAE3D9] text-[#281010] font-bold">ESC to close</span>
        </div>

      </div>
    </div>
  );
};

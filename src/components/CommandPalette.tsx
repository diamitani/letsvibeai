import React, { useState, useEffect } from 'react';
import { COURSE_MODULES, ARCHITECTURE_BLOCKS, DOC_TEMPLATES } from '../data/courseData';
import { Search, BookOpen, Layers, FileText, ArrowRight, X } from 'lucide-react';

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

  const handleItemClick = (section: string, detailId?: string | number) => {
    onSelectResult(section, detailId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search modules, architecture blocks, planning docs, prompts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-3 max-h-[420px] overflow-y-auto space-y-4">
          
          {/* Modules Group */}
          {moduleResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase px-3 py-1">
                Course Modules ({moduleResults.length})
              </div>
              <div className="space-y-1">
                {moduleResults.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleItemClick('curriculum', m.id)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-800 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                          Module {m.id}: {m.title}
                        </div>
                        <div className="text-[11px] text-zinc-400">{m.tagline}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Blocks Group */}
          {blockResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase px-3 py-1">
                Architecture Blocks ({blockResults.length})
              </div>
              <div className="space-y-1">
                {blockResults.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleItemClick('architecture', b.id)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-800 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                          {b.name} ({b.defaultTool.split('+')[0]})
                        </div>
                        <div className="text-[11px] text-zinc-400">Analogy: {b.analogy}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents Group */}
          {docResults.length > 0 && (
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase px-3 py-1">
                11 Planning Docs ({docResults.length})
              </div>
              <div className="space-y-1">
                {docResults.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleItemClick('docs', d.id)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-zinc-800 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-sky-300">
                          Doc {d.num}: {d.title}
                        </div>
                        <div className="text-[11px] text-zinc-400">{d.filename}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-sky-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {moduleResults.length === 0 && blockResults.length === 0 && docResults.length === 0 && (
            <div className="p-8 text-center text-xs text-zinc-500 font-mono">
              No matching modules, architecture nodes, or documents found for "{query}".
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
};

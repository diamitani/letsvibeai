import React, { useState, useMemo } from 'react';
import { GENCY_SKILLS_LIBRARY } from '../../data/skillsLibraryData';
import { GencyLibrarySkill } from '../../types';
import {
  Search,
  Download,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  X,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SkillsLibraryViewProps {
  initialSlug?: string | null;
  onNavigateToHarness?: () => void;
}

const ITEMS_PER_PAGE = 12;

export const SkillsLibraryView: React.FC<SkillsLibraryViewProps> = ({
  initialSlug,
  onNavigateToHarness
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [coreOnly, setCoreOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'core' | 'az'>('core');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);

  const categoryNames = useMemo(() => {
    const cats = Array.from(new Set(GENCY_SKILLS_LIBRARY.map((s) => s.category)));
    return ['All', ...cats];
  }, []);

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GENCY_SKILLS_LIBRARY.filter((s) => {
      const matchesCore = !coreOnly || s.core;
      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.triggers.some((t) => t.toLowerCase().includes(q));
      return matchesCore && matchesCat && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'az') {
        return a.name.localeCompare(b.name);
      }
      return (b.core ? 1 : 0) - (a.core ? 1 : 0);
    });
  }, [query, selectedCategory, coreOnly, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredSkills.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const currentSkills = filteredSkills.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const activeSkill: GencyLibrarySkill | undefined = selectedSlug
    ? GENCY_SKILLS_LIBRARY.find((s) => s.slug === selectedSlug)
    : undefined;

  const handleCopyInstallPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
  };

  const handleDownloadSkill = (skill: GencyLibrarySkill, e: React.MouseEvent) => {
    e.stopPropagation();
    const blob = new Blob(
      [
        `---\nname: ${skill.name}\ndescription: ${skill.tagline}\n---\n\n# ${skill.name}\n\n${skill.description}\n`
      ],
      { type: 'text/markdown' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skill.slug}.SKILL.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left font-sans min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Standardized Agent Skills</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            GencyAI <span className="text-[#FA5929]">Skills Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#706B67] mt-1 max-w-xl">
            Browse and download standardized SKILL.md packages formatted for Claude Code and Antigravity.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#706B67] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills & triggers..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-2xs"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9] mb-8 overflow-x-auto">
        {categoryNames.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSkills.map((skill) => (
          <div
            key={skill.slug}
            onClick={() => setSelectedSlug(skill.slug)}
            className="p-6 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#FA5929] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60">
                  {skill.category}
                </span>
                {skill.core && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#34D399]/20 text-[#281010]">
                    CORE
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#281010] group-hover:text-[#FA5929] transition-colors mb-1.5 font-heading">
                {skill.name}
              </h3>
              <p className="text-xs text-[#706B67] line-clamp-2 leading-relaxed mb-4">
                {skill.tagline}
              </p>
            </div>

            <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between text-xs">
              <button
                onClick={(e) => handleDownloadSkill(skill, e)}
                className="text-xs font-bold text-[#706B67] hover:text-[#FA5929] flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>

              <span className="text-xs font-bold text-[#281010] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={activePage === 1}
            className="px-4 py-2 rounded-full bg-white border border-[#EAE3D9] text-xs font-bold text-[#706B67] disabled:opacity-30"
          >
            Previous
          </button>
          <span className="text-xs font-mono font-bold text-[#281010]">
            Page {activePage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={activePage === totalPages}
            className="px-4 py-2 rounded-full bg-[#FA5929] text-white text-xs font-bold disabled:opacity-30 shadow-xs"
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {activeSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
          <div className="bg-[#F8F3EC] border border-[#EAE3D9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#EAE3D9]">
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
                  {activeSkill.category}
                </span>
                <h3 className="text-2xl font-black text-[#281010] font-heading mt-1">
                  {activeSkill.name}
                </h3>
                <p className="text-xs text-[#706B67] mt-1">{activeSkill.tagline}</p>
              </div>

              <button
                onClick={() => setSelectedSlug(null)}
                className="p-2 rounded-full bg-white text-[#706B67] hover:text-[#281010] border border-[#EAE3D9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-6 space-y-4">
              <p className="text-xs text-[#281010] leading-relaxed">
                {activeSkill.description}
              </p>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#706B67] uppercase mb-2">
                  Activation Triggers
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.triggers.map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white border border-[#EAE3D9] text-[#281010]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                onClick={() => handleCopyInstallPrompt(`npx letsvibeai add skill ${activeSkill.slug}`)}
                className="px-5 py-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs font-bold transition-all shadow-md"
              >
                {copiedInstall ? '✓ Copied Command' : 'Copy Install Command'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

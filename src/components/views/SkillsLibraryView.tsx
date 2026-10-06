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
  X
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

  // Categories list
  const categoryNames = useMemo(() => {
    const cats = Array.from(new Set(GENCY_SKILLS_LIBRARY.map((s) => s.category)));
    return ['All', ...cats];
  }, []);

  // Filter and sort skills
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

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredSkills.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const currentSkills = filteredSkills.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Active selected skill for detail view
  const activeSkill: GencyLibrarySkill | undefined = selectedSlug
    ? GENCY_SKILLS_LIBRARY.find((s) => s.slug === selectedSlug)
    : undefined;

  // Related skills
  const relatedSkills: GencyLibrarySkill[] = activeSkill
    ? GENCY_SKILLS_LIBRARY.filter(
        (s) => s.category === activeSkill.category && s.slug !== activeSkill.slug
      ).slice(0, 3)
    : [];

  const handleCopyInstallPrompt = (promptText: string) => {
    try {
      navigator.clipboard.writeText(promptText);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Failed to copy install prompt:', err);
    }
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
    a.download = 'SKILL.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 1. DETAIL VIEW
  if (activeSkill) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] text-[#281010] font-sans pb-24 pt-24 selection:bg-[#FA5929] selection:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#706B67] mb-8 flex-wrap">
            <button
              onClick={() => setSelectedSlug(null)}
              className="text-[#706B67] hover:text-[#FA5929] flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Skills</span>
            </button>
            <span>/</span>
            <span>{activeSkill.category}</span>
            <span>/</span>
            <span className="text-[#281010] font-bold">{activeSkill.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Skill Information */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60 text-xs font-mono font-bold uppercase tracking-wider">
                  {activeSkill.category}
                </span>
                {activeSkill.core && (
                  <span className="px-3 py-1 rounded-full bg-[#281010] text-white font-mono text-xs font-bold uppercase">
                    CORE SKILL
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-white border border-[#EAE3D9] text-[#281010] font-mono text-xs font-bold uppercase shadow-2xs">
                  FREE OPEN SOURCE
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-[#281010] tracking-tight leading-tight">
                {activeSkill.name}
              </h1>

              <p className="mt-4 text-lg sm:text-xl text-[#706B67] leading-relaxed max-w-2xl font-medium">
                {activeSkill.tagline}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap mt-8">
                <button
                  onClick={(e) => handleDownloadSkill(activeSkill, e)}
                  className="px-6 py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-sm font-extrabold shadow-md flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download SKILL.md — Free</span>
                </button>
                <a
                  href={activeSkill.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-white hover:bg-[#F8F3EC] border border-[#EAE3D9] text-[#281010] text-sm font-bold shadow-xs flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-[#706B67]" />
                  <span>View on GitHub</span>
                </a>
              </div>

              {/* What It Does */}
              <div className="mt-12 pt-8 border-t border-[#EAE3D9]">
                <h2 className="text-2xl font-bold font-display text-[#281010] mb-4">What it does</h2>
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs text-sm sm:text-base text-[#281010] leading-relaxed whitespace-pre-line">
                  {activeSkill.description}
                </div>
              </div>

              {/* Say this to trigger it */}
              {activeSkill.triggers && activeSkill.triggers.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold font-display text-[#281010] mb-3">Say this to trigger it</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeSkill.triggers.map((trig, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full bg-white border border-[#EAE3D9] font-mono text-xs text-[#281010] shadow-2xs"
                      >
                        "{trig}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Install in Two Minutes */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold font-display text-[#281010] mb-4">Install in two minutes</h2>
                <div className="space-y-3">
                  <div className="p-5 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#FA5929] shrink-0 mt-0.5">
                      01
                    </span>
                    <div className="text-xs sm:text-sm text-[#281010] leading-relaxed">
                      <b>Claude App:</b> Download the file, then navigate to <i>Settings → Capabilities → Skills</i> and upload `SKILL.md`.
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#FA5929] shrink-0 mt-0.5">
                      02
                    </span>
                    <div className="text-xs sm:text-sm text-[#281010] leading-relaxed">
                      <b>Claude Code & Antigravity:</b> Save it to{' '}
                      <code className="px-2 py-0.5 rounded-full bg-[#F8F3EC] text-[#FA5929] font-mono text-xs border border-[#EAE3D9]">
                        ~/.claude/skills/{activeSkill.name}/SKILL.md
                      </code>{' '}
                      or{' '}
                      <code className="px-2 py-0.5 rounded-full bg-[#F8F3EC] text-[#FA5929] font-mono text-xs border border-[#EAE3D9]">
                        .agents/skills/{activeSkill.name}/SKILL.md
                      </code>.
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex items-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#FA5929] shrink-0 mt-0.5">
                      03
                    </span>
                    <div className="text-xs sm:text-sm text-[#281010] leading-relaxed">
                      <b>Any other agent (Cursor, Windsurf, Copilot, Hermes):</b> Copy and paste the install prompt directly into a new chat.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Install Sidebar */}
            <div className="lg:col-span-4 sticky top-28 space-y-5">
              
              {/* Install Prompt Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#281010] text-white shadow-xl border border-[#3D1E1E]">
                <div className="text-xs font-mono font-bold text-[#FA5929] uppercase tracking-wider mb-2">
                  AGENT INSTALL PROMPT
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-white/80 break-all leading-relaxed my-3">
                  {activeSkill.install}
                </div>

                <button
                  onClick={() => handleCopyInstallPrompt(activeSkill.install)}
                  className="w-full py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {copiedInstall ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Install Prompt</span>
                    </>
                  )}
                </button>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider mb-2">
                    WORKS WITH
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {activeSkill.compat.map((c, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Teaser */}
              <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs">
                <h3 className="font-bold text-base text-[#281010] mb-1.5">
                  Want this customized for your team?
                </h3>
                <p className="text-xs sm:text-sm text-[#706B67] leading-relaxed mb-4">
                  LetsVibeAI adapts skills to your proprietary databases, tools, and workflows, then deploys them with deterministic testing gates.
                </p>
                <a
                  href="mailto:contact@letsvibeai.com"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FA5929] hover:underline"
                >
                  <span>Request Custom Skill Deployment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#EAE3D9]">
              <h2 className="text-2xl font-bold font-display text-[#281010] mb-6">
                More in {activeSkill.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedSkills.map((rel) => (
                  <div
                    key={rel.slug}
                    onClick={() => {
                      setSelectedSlug(rel.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-6 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#FA5929]/50 cursor-pointer shadow-xs hover:shadow-md transition-all group"
                  >
                    <div className="font-bold text-base text-[#281010] group-hover:text-[#FA5929] transition-colors">
                      {rel.name}
                    </div>
                    <p className="text-xs text-[#706B67] line-clamp-2 mt-2 leading-relaxed">
                      {rel.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. MAIN LIST VIEW
  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#281010] font-sans pb-24 pt-24 selection:bg-[#FA5929] selection:text-white">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-mono font-bold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FA5929] animate-pulse" />
          <span>Skills Library · {GENCY_SKILLS_LIBRARY.length} Free Production Skills · No Sign-Up</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#281010] leading-[1.05] max-w-4xl">
          Skills you can drop into <br className="hidden sm:inline" />
          <span className="text-[#FA5929]">Claude & AI Agents today.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#706B67] leading-relaxed max-w-2xl">
          Production-tested `SKILL.md` packages from verified client builds. Download any skill, add it
          to Claude Code, Antigravity, or Cursor, and your agent immediately knows how to complete the job.
        </p>

        {/* Global Search Bar */}
        <div className="mt-8 max-w-2xl bg-white rounded-full border border-[#EAE3D9] p-2 shadow-xs flex items-center gap-3">
          <Search className="w-5 h-5 text-[#706B67] ml-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search skills — context-engine, session-overview, n8n, cap table, prompt-studio..."
            className="flex-1 bg-transparent text-sm text-[#281010] placeholder-[#706B67] focus:outline-none py-2 font-sans"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setCurrentPage(1);
              }}
              className="p-1.5 rounded-full text-[#706B67] hover:text-[#281010] hover:bg-[#F8F3EC] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="p-4 bg-white rounded-3xl border border-[#EAE3D9] shadow-xs flex items-center justify-between gap-4 flex-wrap">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categoryNames.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? GENCY_SKILLS_LIBRARY.length
                  : GENCY_SKILLS_LIBRARY.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#281010] text-white shadow-2xs'
                      : 'bg-[#F8F3EC] hover:bg-[#FBE1CE] text-[#281010]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-70 font-mono">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Core Toggle and Sort */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setCoreOnly(!coreOnly);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                coreOnly
                  ? 'bg-[#FBE1CE] border-[#FCAA91]/60 text-[#FA5929]'
                  : 'bg-white border-[#EAE3D9] text-[#706B67] hover:bg-[#F8F3EC]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${coreOnly ? 'bg-[#FA5929]' : 'bg-slate-300'}`} />
              <span>Core only</span>
            </button>

            <button
              onClick={() => setSortBy(sortBy === 'core' ? 'az' : 'core')}
              className="px-4 py-2 rounded-full bg-white border border-[#EAE3D9] text-xs font-mono font-bold text-[#281010] hover:bg-[#F8F3EC] shadow-2xs"
            >
              Sort: {sortBy === 'core' ? 'Core First' : 'A–Z'}
            </button>
          </div>
        </div>

        <div className="py-3 text-xs font-mono text-[#706B67]">
          Showing {filteredSkills.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredSkills.length)} of {filteredSkills.length} skills
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        {filteredSkills.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#EAE3D9] shadow-xs">
            <div className="text-xl font-bold text-[#281010]">No skills match your search query.</div>
            <p className="text-sm text-[#706B67] mt-2">
              Try searching for different keywords or reset your filters.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
                setCoreOnly(false);
                setCurrentPage(1);
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#281010] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentSkills.map((skill) => (
              <div
                key={skill.slug}
                onClick={() => {
                  setSelectedSlug(skill.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-6 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#FA5929]/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#706B67]">
                      {skill.category}
                    </span>
                    {skill.core && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60 font-mono text-[10px] font-bold">
                        CORE
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#281010] group-hover:text-[#FA5929] transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#706B67] leading-relaxed mt-2.5 line-clamp-3">
                    {skill.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE3D9] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-[#706B67]">
                    {skill.compat.length} platforms
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDownloadSkill(skill, e)}
                      title="Download SKILL.md"
                      className="p-2 rounded-full bg-[#F8F3EC] hover:bg-[#FBE1CE] text-[#281010] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1.5 rounded-full bg-[#281010] group-hover:bg-[#FA5929] text-white text-xs font-bold transition-colors">
                      View Skill
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className="px-4 py-2 rounded-full bg-white border border-[#EAE3D9] text-xs font-bold text-[#281010] disabled:opacity-40 hover:bg-[#F8F3EC] shadow-2xs"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pgNum) => (
              <button
                key={pgNum}
                onClick={() => {
                  setCurrentPage(pgNum);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className={`w-9 h-9 rounded-full font-mono text-xs font-bold transition-all ${
                  pgNum === activePage
                    ? 'bg-[#FA5929] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F8F3EC] border border-[#EAE3D9] text-[#281010]'
                }`}
              >
                {pgNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className="px-4 py-2 rounded-full bg-white border border-[#EAE3D9] text-xs font-bold text-[#281010] disabled:opacity-40 hover:bg-[#F8F3EC] shadow-2xs"
            >
              Next →
            </button>
          </div>
        )}
      </section>

      {/* Bottom Video Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-[#281010] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#3D1E1E] flex items-center justify-between gap-8 flex-wrap">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              New to authoring skills? Watch the free video course.
            </h2>
            <p className="mt-2 text-white/70 text-xs sm:text-sm leading-relaxed">
              Lesson 04 of our Agent Harness Mastery course walks step-by-step through writing, testing,
              and trigger-tuning your own custom `SKILL.md` from scratch.
            </p>
          </div>

          <button
            onClick={onNavigateToHarness}
            className="px-6 py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
          >
            <span>Watch Lesson 04 (Free)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

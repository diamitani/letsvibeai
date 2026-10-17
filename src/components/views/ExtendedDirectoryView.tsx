import React, { useState } from 'react';
import {
  Search,
  Film,
  Youtube,
  ExternalLink,
  Clock,
  Layers,
  Terminal,
  Cpu,
  FileCode,
  Newspaper,
  Sparkles,
  Bot,
  Filter,
  CheckCircle2,
  Play,
  X,
  PlusCircle,
  Copy,
  Check,
  Tag,
  ArrowRight
} from 'lucide-react';
import {
  YOUTUBE_ROSTR_TUTORIALS,
  TUTORIAL_CATEGORIES,
  DAILY_BRIEF_VIDEOS,
  searchTutorials
} from '../../data/videoRostrData';
import { YouTubeRostrItem } from '../../types';
import { BrandedVideoPlayer } from '../BrandedVideoPlayer';
import { PortfolioSandbox } from '../PortfolioSandbox';
import { PromptStudio } from '../PromptStudio';
import { ArchitectureMap } from '../ArchitectureMap';
import { DocumentStackViewer } from '../DocumentStackViewer';
import { BlogSection } from '../BlogSection';
import { AgentHarnessExplorer } from '../AgentHarnessExplorer';
import { SkillsLibraryView } from './SkillsLibraryView';

interface ExtendedDirectoryViewProps {
  initialTab?: 'tutorials' | 'tools' | 'news' | 'agents';
  onNavigateToCourses: () => void;
}

export const ExtendedDirectoryView: React.FC<ExtendedDirectoryViewProps> = ({
  initialTab = 'tutorials',
  onNavigateToCourses
}) => {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'tools' | 'news' | 'agents'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSandbox, setActiveSandbox] = useState<'model-sandbox' | 'prompt-compiler' | 'pal-architecture' | 'doc-stack'>('prompt-compiler');
  const [selectedVideoModal, setSelectedVideoModal] = useState<YouTubeRostrItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitUrl, setSubmitUrl] = useState('');
  const [submitCategory, setSubmitCategory] = useState<string>('Fullstack Vibe Coding');
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const filteredTutorials = searchTutorials(searchQuery, selectedCategory);

  const handleGenerateRostrEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitUrl) return;

    let youtubeId = submitUrl;
    if (submitUrl.includes('v=')) {
      youtubeId = submitUrl.split('v=')[1]?.split('&')[0] || '';
    } else if (submitUrl.includes('youtu.be/')) {
      youtubeId = submitUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    }

    const template = {
      id: `yt-${Date.now().toString().slice(-4)}`,
      title: "New Community Tutorial Submission",
      creator: "Community Builder",
      youtubeId: youtubeId || "dQw4w9WgXcQ",
      category: submitCategory,
      duration: "15:00",
      level: "Intermediate",
      summary: "Curated community walkthrough on modern AI engineering and vibe coding workflows.",
      takeaways: [
        "Step-by-step architectural breakdown.",
        "Production invariants and security guardrails.",
        "Verified deployment execution."
      ],
      tags: ["Community", submitCategory.split(' ')[0]],
      featured: false,
      publishedDate: "2026"
    };

    setGeneratedJson(JSON.stringify(template, null, 2));
  };

  const handleCopyJson = () => {
    if (generatedJson) {
      navigator.clipboard.writeText(generatedJson);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left font-sans min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#4a4d4f]/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2F80ED]/10 border border-[#2F80ED]/20 text-[#2F80ED] text-xs font-bold mb-3 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>LetsVibeAI Ecosystem Hub & Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#071B3A] font-sans">
            The Extended <span className="text-[#2F80ED]">ROSTR & Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#4a4d4f] mt-1 max-w-2xl leading-relaxed">
            Curated YouTube tutorials across the vibe coding landscape, interactive developer sandboxes, industry insights, and agent platform harnesses — all built on the same unified design system.
          </p>
        </div>

        {/* Quick Navigation to Free Courses */}
        <button
          onClick={onNavigateToCourses}
          className="px-5 py-2.5 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <span>Watch Foundational Courses (Free)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Tab Navigation Strip */}
      <div className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-[#4a4d4f]/10">
        <button
          onClick={() => setActiveTab('tutorials')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tutorials'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB] hover:text-[#071B3A]'
          }`}
        >
          <Youtube className={`w-4 h-4 ${activeTab === 'tutorials' ? 'text-[#FF0000]' : 'text-slate-400'}`} />
          <span>YouTube Tutorial ROSTR</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
            {YOUTUBE_ROSTR_TUTORIALS.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tools'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB] hover:text-[#071B3A]'
          }`}
        >
          <Terminal className="w-4 h-4 text-[#2F80ED]" />
          <span>Tools & Sandboxes</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'news'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB] hover:text-[#071B3A]'
          }`}
        >
          <Newspaper className="w-4 h-4 text-[#34D399]" />
          <span>Articles & Daily Briefs</span>
        </button>

        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'agents'
              ? 'bg-[#071B3A] text-white shadow-xs'
              : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB] hover:text-[#071B3A]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#ec4909]" />
          <span>Agent Platforms & Skills</span>
        </button>
      </div>

      {/* TAB 1: YOUTUBE TUTORIAL ROSTR */}
      {activeTab === 'tutorials' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Controls Bar: Search & Category Pills */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tutorials by title, creator, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-[#4a4d4f]/15 text-xs text-[#071B3A] placeholder-slate-400 focus:outline-none focus:border-[#2F80ED] shadow-2xs"
              />
            </div>

            {/* Submit / Add Tutorial CTA */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 rounded-full bg-[#F4F7FB] hover:bg-[#EAEFF7] border border-[#2F80ED]/30 text-[#071B3A] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>Update / Suggest ROSTR Tutorial</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {TUTORIAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#2F80ED] text-white shadow-2xs'
                    : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tutorials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs flex flex-col justify-between hover:border-[#2F80ED]/40 hover:shadow-lg transition-all group"
              >
                <div>
                  
                  {/* Category & Duration Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2F80ED]/10 text-[#2F80ED]">
                      {tutorial.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                      <Clock className="w-3 h-3 text-[#34D399]" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>

                  {/* Title & Creator */}
                  <h3 className="text-base font-bold text-[#071B3A] tracking-tight leading-snug mb-1.5 group-hover:text-[#2F80ED] transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    By <span className="text-[#071B3A] font-bold">{tutorial.creator}</span>
                  </p>

                  <p className="text-xs text-[#4a4d4f] leading-relaxed mb-4">
                    {tutorial.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="space-y-1.5 mb-4 pt-2 border-t border-slate-100">
                    {tutorial.takeaways.slice(0, 2).map((takeaway, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tutorial.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4F7FB] text-slate-600 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedVideoModal(tutorial)}
                    className="px-4 py-1.5 rounded-full bg-[#071B3A] hover:bg-[#2F80ED] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Watch Tutorial</span>
                  </button>

                  <a
                    href={`https://youtube.com/watch?v=${tutorial.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-[#FF0000] flex items-center gap-1 transition-colors"
                    title="Open on YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom ROSTR Process Runbook Banner */}
          <div className="p-6 rounded-3xl bg-[#071B3A] text-white border border-[#2F80ED]/30 space-y-3">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-[#34D399]" />
              <h3 className="text-sm font-bold">How the ROSTR Video Pipeline Works</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              The YouTube Tutorial ROSTR is managed as code via typed manifests (<code className="text-[#34D399] font-mono">src/data/videoRostrData.ts</code>) and automated scripts (<code className="text-[#2F80ED] font-mono">scripts/update_video_rostr.py</code>). To synchronize daily briefs or add new YouTube lectures, run the CLI tool or paste the video URL in the submit drawer.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-[#34D399]" />
              <span>CLI: python3 scripts/update_video_rostr.py --url &quot;https://youtu.be/...&quot; --category &quot;Fullstack Vibe Coding&quot;</span>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: INTERACTIVE TOOLS & SANDBOXES */}
      {activeTab === 'tools' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Sub-tool Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSandbox('prompt-compiler')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSandbox === 'prompt-compiler'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>PAL Prompt Compiler</span>
            </button>

            <button
              onClick={() => setActiveSandbox('model-sandbox')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSandbox === 'model-sandbox'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Model Reasoning Sandbox</span>
            </button>

            <button
              onClick={() => setActiveSandbox('pal-architecture')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSandbox === 'pal-architecture'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>PAL Architecture Map</span>
            </button>

            <button
              onClick={() => setActiveSandbox('doc-stack')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSandbox === 'doc-stack'
                  ? 'bg-[#071B3A] text-white shadow-xs'
                  : 'bg-white text-[#4a4d4f] border border-[#4a4d4f]/15 hover:bg-[#F4F7FB]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-[#ec4909]" />
              <span>PRD Document Stack Viewer</span>
            </button>
          </div>

          {/* Active Tool Viewport */}
          <div className="bg-white rounded-3xl border border-[#4a4d4f]/10 p-6 sm:p-8 shadow-xs">
            {activeSandbox === 'prompt-compiler' && <PromptStudio />}
            {activeSandbox === 'model-sandbox' && <PortfolioSandbox />}
            {activeSandbox === 'pal-architecture' && <ArchitectureMap />}
            {activeSandbox === 'doc-stack' && <DocumentStackViewer />}
          </div>

        </div>
      )}

      {/* TAB 3: ARTICLES & DAILY BRIEFS */}
      {activeTab === 'news' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          
          {/* Daily Brief Archives */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#4a4d4f]/10">
              <Film className="w-4 h-4 text-[#34D399]" />
              <h2 className="text-lg font-bold text-[#071B3A]">Daily Vibe Brief Video Archive</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DAILY_BRIEF_VIDEOS.map((brief) => (
                <div key={brief.id} className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#071B3A]">
                      {brief.date}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{brief.duration}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#071B3A]">{brief.title}</h3>
                  <p className="text-xs text-[#4a4d4f] leading-relaxed">{brief.summary}</p>

                  <BrandedVideoPlayer
                    title={brief.title}
                    subtitle={`Daily Brief · ${brief.date}`}
                    videoSrc={brief.videoUrl}
                    youtubeId={brief.youtubeId}
                    duration={brief.duration}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Blog & Intelligence Radar */}
          <div className="pt-6">
            <BlogSection />
          </div>

        </div>
      )}

      {/* TAB 4: AGENT PLATFORMS & HARNESSES */}
      {activeTab === 'agents' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          <AgentHarnessExplorer />
          <div className="pt-6">
            <SkillsLibraryView onNavigateToHarness={() => {}} />
          </div>
        </div>
      )}

      {/* Video Playback Modal (when clicking a card in ROSTR) */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071B3A] rounded-3xl max-w-4xl w-full border border-white/10 overflow-hidden shadow-2xl relative text-left">
            <div className="p-4 bg-[#071B3A] flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <Youtube className="w-5 h-5 text-[#FF0000] shrink-0" />
                <h3 className="text-sm font-bold text-white truncate">{selectedVideoModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedVideoModal(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 space-y-3 bg-[#071B3A]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Creator: <strong className="text-white">{selectedVideoModal.creator}</strong></span>
                <span className="text-xs font-mono text-[#34D399]">{selectedVideoModal.duration} · {selectedVideoModal.level}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedVideoModal.summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit / Add Tutorial Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#4a4d4f]/15 shadow-2xl relative text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#2F80ED]" />
                <h3 className="text-lg font-bold text-[#071B3A]">Add Tutorial to ROSTR</h3>
              </div>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  setGeneratedJson(null);
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#4a4d4f]">
              Paste any YouTube video link below to generate a typed manifest entry for <code className="font-mono text-[#2F80ED]">videoRostrData.ts</code>.
            </p>

            <form onSubmit={handleGenerateRostrEntry} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#071B3A] block mb-1">YouTube URL or Video ID</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={submitUrl}
                  onChange={(e) => setSubmitUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#2F80ED]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#071B3A] block mb-1">Category</label>
                <select
                  value={submitCategory}
                  onChange={(e) => setSubmitCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#2F80ED]"
                >
                  {TUTORIAL_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#2F80ED] hover:bg-[#256fd1] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Compile ROSTR Manifest Entry
              </button>
            </form>

            {generatedJson && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500">Manifest Code Snippet:</span>
                  <button
                    onClick={handleCopyJson}
                    className="px-2.5 py-1 rounded-md bg-[#071B3A] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedJson ? <Check className="w-3 h-3 text-[#34D399]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedJson ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] max-h-48 overflow-y-auto leading-relaxed">
                  {generatedJson}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

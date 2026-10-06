import React, { useState, useEffect } from 'react';
import {
  HARNESS_OPTIONS,
  HARNESS_LESSONS,
  HARNESS_PRACTICES,
  HARNESS_CONCEPT_TRACKS,
  HARNESS_FORMAT_GUIDES
} from '../../data/harnessMasteryData';
import { HarnessLesson, HarnessConceptTrack, HarnessFormatEntry } from '../../types';
import {
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  Copy,
  Check,
  X,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HarnessMasteryViewProps {
  onOpenConsult?: () => void;
}

export const HarnessMasteryView: React.FC<HarnessMasteryViewProps> = () => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(6); // Default to available lesson 07
  const [selectedTrackKey, setSelectedTrackKey] = useState<string>('context');
  const [activeHarnessKey, setActiveHarnessKey] = useState<string>('claude');
  
  // Format guide modal state
  const [activeGuideKey, setActiveGuideKey] = useState<string | null>(null);
  const [guideHarnessKey, setGuideHarnessKey] = useState<string>('claude');
  const [copiedCode, setCopiedCode] = useState(false);

  // Email subscribe state
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try {
      return localStorage.getItem('letsvibeai_harness_subscribed') === 'true';
    } catch {
      return false;
    }
  });
  const [subscribing, setSubscribing] = useState(false);

  const currentLesson: HarnessLesson = HARNESS_LESSONS[selectedLessonIndex] || HARNESS_LESSONS[0];
  const currentTrack: HarnessConceptTrack =
    HARNESS_CONCEPT_TRACKS.find((t) => t.key === selectedTrackKey) || HARNESS_CONCEPT_TRACKS[0];

  // Helper for YouTube embed extraction
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1` : '';
  };

  const handleOpenGuide = (key: string) => {
    setActiveGuideKey(key);
    setGuideHarnessKey(activeHarnessKey);
    setCopiedCode(false);
  };

  const handleCopyCode = (code: string) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribing(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setSubscribing(false);
      try {
        localStorage.setItem('letsvibeai_harness_subscribed', 'true');
      } catch {}
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }, 600);
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeGuideKey) {
        setActiveGuideKey(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGuideKey]);

  const activeGuideEntry: HarnessFormatEntry | null = activeGuideKey
    ? HARNESS_FORMAT_GUIDES[activeGuideKey] || null
    : null;
  const currentCodeSnippet =
    activeGuideEntry?.harnesses[guideHarnessKey] || { path: '', code: '' };

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#281010] font-sans pb-24 pt-24 selection:bg-[#FA5929] selection:text-white">
      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-mono font-bold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FA5929] animate-pulse" />
          <span>Agent Harness Mastery · 100% Free · Any Harness</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#281010] leading-[1.05] max-w-4xl">
          Learn the agent. <br className="hidden sm:inline" />
          <span className="text-[#FA5929]">Not the brand.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-end">
          <p className="lg:col-span-8 text-base sm:text-lg text-[#706B67] leading-relaxed max-w-3xl">
            Context, skills, artifacts, markdown files, and agents exist in every modern harness. Learn
            the universal principles once, then inspect exact file formats for <b>Claude Code</b>,{' '}
            <b>Codex</b>, <b>Hermes</b>, <b>Antigravity</b>, <b>VS Code</b>, and <b>Cursor</b>.
          </p>

          <div className="lg:col-span-4 flex items-center gap-3 flex-wrap">
            <a
              href="#video-theater"
              className="px-6 py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95"
            >
              Start Watching (8 Lessons)
            </a>
            <a
              href="#concepts"
              className="px-5 py-3.5 rounded-full bg-white hover:bg-[#F8F3EC] border border-[#EAE3D9] text-[#281010] text-xs sm:text-sm font-bold transition-all shadow-xs"
            >
              Core Concepts
            </a>
          </div>
        </div>

        {/* Harness Selector Pills */}
        <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t border-[#EAE3D9]">
          <span className="text-xs font-mono font-bold text-[#706B67] uppercase mr-2">Target Harness:</span>
          {HARNESS_OPTIONS.map((h) => {
            const isActive = activeHarnessKey === h.key;
            return (
              <button
                key={h.key}
                onClick={() => {
                  setActiveHarnessKey(h.key);
                  setGuideHarnessKey(h.key);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#281010] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F8F3EC] text-[#281010] border border-[#EAE3D9]'
                }`}
              >
                <span>{h.name}</span>
                {isActive && <Check className="w-3 h-3 text-[#FA5929]" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. VIDEO THEATER & LESSON PLAYLIST */}
      <section id="video-theater" className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Video Screen */}
          <div className="lg:col-span-7 bg-[#281010] rounded-3xl overflow-hidden shadow-xl border border-[#3D1E1E] flex flex-col">
            <div className="relative aspect-video w-full bg-[#1A0B0B] flex items-center justify-center">
              {currentLesson.src && getYouTubeEmbedUrl(currentLesson.src) ? (
                <iframe
                  src={getYouTubeEmbedUrl(currentLesson.src)}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-4">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60 text-xs font-mono font-bold uppercase tracking-wider">
                    Lesson {currentLesson.num} · In Production
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white max-w-md font-display">
                    This video drops soon. Get notified the day it goes live.
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
                    <a
                      href="#newsletter"
                      className="px-5 py-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs font-bold transition-all shadow-md"
                    >
                      Notify Me
                    </a>
                    <button
                      onClick={() => setSelectedLessonIndex(6)}
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-[#FA5929]" />
                      <span>Watch Lesson 07 (Available Now)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Video Metadata Box */}
            <div className="p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 text-xs font-mono text-white/60 mb-2">
                <span className="text-[#FA5929] font-bold">LESSON {currentLesson.num}</span>
                <span>•</span>
                <span>{currentLesson.dur}</span>
                {currentLesson.isAvailable ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FA5929]/20 text-[#FA5929] font-bold text-[10px]">
                    LIVE
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/60 font-bold text-[10px]">
                    SOON
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                {currentLesson.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                {currentLesson.desc}
              </p>
            </div>
          </div>

          {/* Lesson Playlist */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#EAE3D9]">
              <div>
                <h3 className="text-lg font-bold font-display text-[#281010]">Curriculum Library</h3>
                <p className="text-xs text-[#706B67]">8 Modules · Full Agent Lifecycle</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60">
                100% Free
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1">
              {HARNESS_LESSONS.map((l, idx) => {
                const isSelected = selectedLessonIndex === idx;
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLessonIndex(idx)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-start gap-3.5 group ${
                      isSelected
                        ? 'bg-[#F8F3EC] border border-[#FA5929]/40 text-[#281010] shadow-2xs'
                        : 'hover:bg-[#F8F3EC] border border-transparent text-[#706B67]'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-[#FA5929] text-white'
                          : 'bg-[#F8F3EC] text-[#706B67] group-hover:bg-[#FBE1CE]'
                      }`}
                    >
                      {l.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-xs sm:text-sm text-[#281010] truncate">
                          {l.title}
                        </div>
                        <span className="text-[11px] font-mono text-[#706B67] shrink-0">{l.dur}</span>
                      </div>
                      <p className="text-[11px] text-[#706B67] line-clamp-1 mt-0.5">{l.desc}</p>
                    </div>

                    {l.isAvailable ? (
                      <span className="w-2 h-2 rounded-full bg-[#FA5929] shrink-0 mt-2" title="Available now" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-1.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MCP Connectors Banner */}
        <div className="mt-6 p-6 sm:p-8 bg-white rounded-3xl border border-[#EAE3D9] shadow-xs flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FBE1CE] text-[#FA5929] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#281010]">
                Connecting tools (Model Context Protocol)
              </div>
              <div className="text-xs text-[#706B67]">
                MCP server configuration schemas and environment variables differ across harnesses.
              </div>
            </div>
          </div>

          <button
            onClick={() => handleOpenGuide('library')}
            className="px-5 py-2.5 rounded-full bg-[#281010] hover:bg-[#3D1E1E] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Config Formats by Harness</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FA5929]" />
          </button>
        </div>
      </section>

      {/* 3. THE 5-LAYER SYSTEM ARCHITECTURE */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="bg-[#281010] text-white rounded-3xl p-8 sm:p-12 border border-[#3D1E1E] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5">
              <div className="text-xs font-mono font-bold text-[#FA5929] uppercase tracking-wider mb-2">
                System Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight">
                Five layers. <br />
                Every harness has them.
              </h2>
              <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
                Directory names, file keys, and CLI switches differ between vendors. The five core
                architectural layers do not. Learn what each layer is responsible for and you can migrate
                between harnesses seamlessly.
              </p>

              <button
                onClick={() => handleOpenGuide('stack')}
                className="mt-6 px-6 py-3 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs sm:text-sm font-extrabold transition-all shadow-md flex items-center gap-2"
              >
                <span>Folder Layout by Harness</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Layer Stack */}
            <div className="lg:col-span-7 space-y-3">
              {[
                {
                  num: '05',
                  name: 'Orchestration',
                  desc: 'Sub-agents, hooks, multi-step workflows, and scheduled cron jobs — work that executes in parallel or on timers.'
                },
                {
                  num: '04',
                  name: 'Surfaces',
                  desc: 'Chat interfaces to brainstorm, terminal CLIs or editors to build, and manager consoles to coordinate.'
                },
                {
                  num: '03',
                  name: 'Capabilities',
                  desc: 'Skills package your institutional know-how. MCP servers give the agent access to real production tools.'
                },
                {
                  num: '02',
                  name: 'Context & Rules',
                  desc: 'Project rules (AGENTS.md), reference docs, style guides, and memory vaults — say it once, reuse forever.'
                },
                {
                  num: '01',
                  name: 'Model Foundation',
                  desc: 'The underlying frontier intelligence (Claude 3.7 Sonnet, Gemini 2.5 Pro, GPT-4.5) chosen for accuracy and budget.'
                }
              ].map((layer) => (
                <div
                  key={layer.num}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 hover:border-white/20 transition-colors"
                >
                  <div className="font-mono text-sm font-bold text-[#FA5929] shrink-0 mt-0.5">
                    {layer.num}
                  </div>
                  <div>
                    <div className="font-bold text-base text-white">{layer.name}</div>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                      {layer.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. EIGHT HABITS OF REAL OUTPUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <div className="text-xs font-mono font-bold text-[#FA5929] uppercase tracking-wider mb-1">
              Practitioner Playbook
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-[#281010] tracking-tight">
              Eight habits of builders who ship real output.
            </h2>
          </div>

          <button
            onClick={() => handleOpenGuide('context')}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#F8F3EC] border border-[#EAE3D9] text-[#281010] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Where to Write the Rules →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HARNESS_PRACTICES.map((p) => (
            <div
              key={p.n}
              className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="font-mono text-xs font-bold text-[#FA5929] mb-3">HABIT {p.n}</div>
                <h3 className="font-bold text-base text-[#281010] mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-[#706B67] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CORE CONCEPTS TRACKS */}
      <section id="concepts" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-xs font-mono font-bold text-[#FA5929] uppercase tracking-wider mb-2">
          Conceptual Deep Dives
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-display text-[#281010] tracking-tight mb-8">
          Five concepts to master before building agents.
        </h2>

        {/* Concept Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {HARNESS_CONCEPT_TRACKS.map((t) => {
            const isActive = selectedTrackKey === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setSelectedTrackKey(t.key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#281010] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F8F3EC] text-[#281010] border border-[#EAE3D9]'
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        {/* Active Concept Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3D9] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#FA5929] uppercase tracking-wider mb-2">
                {currentTrack.meta}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#281010] tracking-tight mb-4">
                {currentTrack.name}
              </h3>
              <p className="text-[#706B67] text-sm sm:text-base leading-relaxed mb-6">
                {currentTrack.desc}
              </p>

              <div className="p-5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] mb-6">
                <div className="text-[10px] font-mono font-bold text-[#706B67] uppercase mb-1">
                  WHEN TO USE THIS
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#281010]">{currentTrack.ship}</div>
              </div>
            </div>

            <button
              onClick={() => handleOpenGuide(currentTrack.key)}
              className="px-6 py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2 self-start"
            >
              <span>How {currentTrack.name} is formatted per harness →</span>
            </button>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-mono font-bold text-[#706B67] uppercase pb-2 border-b border-[#EAE3D9]">
              Module Breakdown (5 Core Topics)
            </div>
            {currentTrack.modules.map((mod, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#FBE1CE] text-[#FA5929] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#281010]">{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER SUBSCRIBE / FREE RESOURCES */}
      <section id="newsletter" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="bg-[#281010] rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#3D1E1E]">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight">
              Want more free agent playbooks?
            </h2>
            <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
              Receive updates whenever new lessons drop, plus open-source `SKILL.md` templates and
              cross-harness config files. 100% free, zero marketing spam.
            </p>
          </div>

          <div className="lg:col-span-5">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@agency.com"
                  className="px-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm focus:outline-none flex-1 shadow-xs placeholder-white/50"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-6 py-3.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs sm:text-sm font-extrabold transition-all shadow-md shrink-0 disabled:opacity-50"
                >
                  {subscribing ? 'Sending...' : 'Send Me Updates'}
                </button>
              </form>
            ) : (
              <div className="p-5 rounded-2xl bg-white/10 text-white flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#FA5929] shrink-0" />
                <div>
                  <div className="font-bold text-sm">You are subscribed!</div>
                  <div className="text-xs text-white/70">
                    You'll receive lesson drops and skill packages as soon as they are published.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. CROSS-HARNESS CODE FORMAT MODAL */}
      {activeGuideKey && activeGuideEntry && (
        <div
          onClick={() => setActiveGuideKey(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/70 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#EAE3D9] animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EAE3D9]">
              <div>
                <div className="text-[11px] font-mono font-bold text-[#FA5929] uppercase tracking-wider">
                  Cross-Harness Format Guide
                </div>
                <h3 className="text-2xl font-black font-display text-[#281010] tracking-tight mt-1">
                  {activeGuideEntry.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveGuideKey(null)}
                className="p-2 rounded-full text-[#706B67] hover:text-[#281010] bg-[#F8F3EC] hover:bg-[#FBE1CE] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#706B67] leading-relaxed mt-4 mb-6">
              {activeGuideEntry.note}
            </p>

            {/* Harness Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
              {HARNESS_OPTIONS.map((h) => {
                const isActive = guideHarnessKey === h.key;
                return (
                  <button
                    key={h.key}
                    onClick={() => {
                      setGuideHarnessKey(h.key);
                      setCopiedCode(false);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#281010] text-white shadow-xs'
                        : 'bg-[#F8F3EC] hover:bg-[#FBE1CE] text-[#281010]'
                    }`}
                  >
                    {h.name}
                  </button>
                );
              })}
            </div>

            {/* Code & Path Preview Box */}
            <div className="rounded-2xl bg-[#281010] border border-[#3D1E1E] overflow-hidden shadow-md">
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-black/40 border-b border-white/10">
                <span className="font-mono text-xs text-[#FA5929] truncate">
                  {currentCodeSnippet.path}
                </span>
                <button
                  onClick={() => handleCopyCode(currentCodeSnippet.code)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#FA5929]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/70" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 sm:p-5 font-mono text-xs text-white/90 overflow-x-auto whitespace-pre leading-relaxed max-h-[380px]">
                {currentCodeSnippet.code}
              </pre>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#706B67]">
              <span>Standard conforms across Anthropic, OpenAI, DeepMind & Cursor standards</span>
              <button
                onClick={() => setActiveGuideKey(null)}
                className="text-[#281010] font-bold hover:underline"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

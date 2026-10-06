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
  Zap,
  Terminal,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HarnessMasteryViewProps {
  onOpenConsult?: () => void;
}

export const HarnessMasteryView: React.FC<HarnessMasteryViewProps> = () => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(6);
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

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left font-sans min-h-screen">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>Agent Harness Academy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Agent Harness <span className="text-[#FA5929]">Mastery Course</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#706B67] mt-1 max-w-xl">
            Learn the 5-layer agent architecture stack, 8 elite habits, and cross-harness configurations.
          </p>
        </div>

        {/* Harness Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          {HARNESS_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveHarnessKey(opt.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeHarnessKey === opt.key
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Theater & Lesson List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Cinema Video Theater (7 cols) */}
        <div className="lg:col-span-7 bg-[#281010] rounded-3xl p-6 text-white border border-[#FA5929]/20 shadow-2xl space-y-4">
          <div className="aspect-video bg-[#160E0E] rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
            {currentLesson.src ? (
              <iframe
                src={getYouTubeEmbedUrl(currentLesson.src)}
                title={currentLesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-6">
                <Play className="w-12 h-12 text-[#FA5929] mx-auto mb-2" />
                <h4 className="text-base font-bold text-white font-heading">{currentLesson.title}</h4>
                <p className="text-xs text-[#A89F91] mt-1">{currentLesson.desc}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#FA5929] uppercase block">
                Lesson {currentLesson.num}
              </span>
              <h3 className="text-lg font-bold text-white font-heading">{currentLesson.title}</h3>
            </div>
            <span className="text-xs font-mono text-[#D8D1C7] bg-white/10 px-3 py-1 rounded-full">
              {currentLesson.dur}
            </span>
          </div>

          <p className="text-xs text-[#D8D1C7] leading-relaxed">
            {currentLesson.desc}
          </p>
        </div>

        {/* Lesson List (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-[#281010] font-heading pb-2 border-b border-[#EAE3D9]">
            8-Lesson Syllabus
          </h4>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {HARNESS_LESSONS.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLessonIndex(idx)}
                className={`w-full p-3 rounded-2xl text-left transition-all border text-xs flex items-center justify-between cursor-pointer ${
                  selectedLessonIndex === idx
                    ? 'bg-[#FBE1CE] border-[#FCAA91] text-[#281010] font-bold shadow-xs'
                    : 'bg-[#F8F3EC] border-[#EAE3D9] text-[#706B67] hover:border-[#FA5929]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    selectedLessonIndex === idx ? 'bg-[#FA5929] text-white' : 'bg-white text-[#281010]'
                  }`}>
                    {lesson.num}
                  </span>
                  <span className="line-clamp-1">{lesson.title}</span>
                </div>
                <span className="text-[10px] font-mono shrink-0 text-[#706B67]">{lesson.dur}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 5-Layer Architecture Stack */}
      <div className="space-y-6 mb-16">
        <h3 className="text-2xl font-black text-[#281010] font-heading">
          The 5-Layer Agent Architecture Stack
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {HARNESS_CONCEPT_TRACKS.map((track) => (
            <div
              key={track.key}
              onClick={() => handleOpenGuide(track.key)}
              className="p-5 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#FA5929] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FA5929] uppercase block mb-1">
                  {track.meta}
                </span>
                <h4 className="text-sm font-bold text-[#281010] mb-2 font-heading">{track.name}</h4>
                <p className="text-xs text-[#706B67] leading-relaxed mb-4">{track.desc}</p>
              </div>

              <span className="text-xs font-bold text-[#FA5929] hover:underline flex items-center gap-1">
                <span>View Schema</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Format Guide Modal */}
      {activeGuideEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
          <div className="bg-[#F8F3EC] border border-[#EAE3D9] rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#EAE3D9]">
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
                  FORMAT SCHEMA
                </span>
                <h3 className="text-2xl font-black text-[#281010] font-heading mt-1">
                  {activeGuideEntry.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveGuideKey(null)}
                className="p-2 rounded-full bg-white text-[#706B67] hover:text-[#281010] border border-[#EAE3D9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-6 space-y-4">
              <div className="text-xs text-[#706B67] mb-2 font-mono">
                File: <strong className="text-[#281010]">{activeGuideEntry.harnesses[guideHarnessKey]?.path || 'AGENTS.md'}</strong>
              </div>
              <pre className="p-4 rounded-2xl bg-[#281010] font-mono text-xs text-[#EAE3D9] overflow-x-auto leading-relaxed max-h-[340px]">
                {activeGuideEntry.harnesses[guideHarnessKey]?.code || '// Schema configuration'}
              </pre>
            </div>

            <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                onClick={() => handleCopyCode(activeGuideEntry.harnesses[guideHarnessKey]?.code || '')}
                className="px-5 py-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs font-bold transition-all shadow-md"
              >
                {copiedCode ? '✓ Copied Schema' : 'Copy Harness Config'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

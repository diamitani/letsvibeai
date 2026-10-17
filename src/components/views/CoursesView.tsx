import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Copy,
  Check,
  HelpCircle,
  Award,
  Film,
  Play,
  RotateCcw,
  Share2,
  CheckCircle,
  Circle,
  FileCode,
  Terminal,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BrandedVideoPlayer } from '../BrandedVideoPlayer';
import { COURSE_MODULES } from '../../data/courseData';
import { CourseModule } from '../../types';

interface CoursesViewProps {
  initialModuleId?: number;
  completedModules: number[];
  onToggleCompleteModule: (moduleId: number) => void;
  onBackToHome: () => void;
  onExploreDirectory: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  initialModuleId = 1,
  completedModules,
  onToggleCompleteModule,
  onBackToHome,
  onExploreDirectory
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(initialModuleId);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialModuleId) {
      setSelectedModuleId(initialModuleId);
    }
  }, [initialModuleId]);

  const activeModule: CourseModule =
    COURSE_MODULES.find((m) => m.id === selectedModuleId) || COURSE_MODULES[0];

  const isCompleted = completedModules.includes(activeModule.id);

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowQuizResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleToggleComplete = () => {
    onToggleCompleteModule(activeModule.id);
    if (!isCompleted) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const currentIndex = COURSE_MODULES.findIndex((m) => m.id === activeModule.id);
  const prevModule = currentIndex > 0 ? COURSE_MODULES[currentIndex - 1] : null;
  const nextModule = currentIndex < COURSE_MODULES.length - 1 ? COURSE_MODULES[currentIndex + 1] : null;

  const completionPercentage = Math.round((completedModules.length / COURSE_MODULES.length) * 100);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left font-sans min-h-screen">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#4a4d4f]/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f7f4f2] text-[#071B3A] border border-[#4a4d4f]/15 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2F80ED]/10 border border-[#2F80ED]/20 text-[#2F80ED] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 fill-[#2F80ED]" />
            <span>Foundational Curriculum · 100% Free</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-[#071B3A]">
              {completedModules.length} of {COURSE_MODULES.length} Completed ({completionPercentage}%)
            </span>
            <div className="w-36 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#34D399] transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={onExploreDirectory}
            className="px-3.5 py-1.5 rounded-full bg-[#F4F7FB] hover:bg-[#EAEFF7] border border-[#2F80ED]/20 text-[#071B3A] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Ecosystem Hub</span>
            <ChevronRight className="w-3 h-3 text-[#2F80ED]" />
          </button>
        </div>
      </div>

      {/* Module Selector Pill Strip */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          {COURSE_MODULES.map((m) => {
            const isSelected = m.id === activeModule.id;
            const isDone = completedModules.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedModuleId(m.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#071B3A] text-white border-[#071B3A] shadow-sm'
                    : isDone
                    ? 'bg-[#34D399]/15 text-[#071B3A] border-[#34D399]/30 hover:bg-[#34D399]/25'
                    : 'bg-white text-[#4a4d4f] border-[#4a4d4f]/15 hover:bg-[#F4F7FB] hover:text-[#071B3A]'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isSelected ? 'bg-[#2F80ED] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {m.id}
                  </span>
                )}
                <span>{m.title.split(':')[0].replace('Module ', 'M')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Video & Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Video Theater Player & Key Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Mastered Video Player */}
          <BrandedVideoPlayer
            title={activeModule.title}
            subtitle={activeModule.tagline}
            videoSrc={activeModule.videoUrl || `/videos/mastered/0${activeModule.id}-what-is-vibe-coding-master.mp4`}
            duration={activeModule.duration || '15:00'}
            onEnded={() => {
              if (!isCompleted) {
                handleToggleComplete();
              }
            }}
          />

          {/* Module Banner Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F80ED]/10 border border-[#2F80ED]/20 text-[#2F80ED] text-xs font-bold font-mono">
                <span>MODULE {activeModule.id < 10 ? `0${activeModule.id}` : activeModule.id} OF 11</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeModule.estimatedHours}
                </span>
              </div>

              {/* Complete Toggle Button */}
              <button
                onClick={handleToggleComplete}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCompleted
                    ? 'bg-[#34D399] text-white shadow-xs'
                    : 'bg-[#F4F7FB] hover:bg-[#EAEFF7] text-[#071B3A] border border-[#4a4d4f]/15'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
              </button>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#071B3A] tracking-tight font-sans">
                {activeModule.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#4a4d4f] font-medium mt-1">
                {activeModule.tagline}
              </p>
            </div>

            {/* Core Analogy Callout Box */}
            {activeModule.analogy && (
              <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-[#2F80ED]/20 space-y-1 text-xs">
                <span className="font-bold text-[#071B3A] flex items-center gap-1.5 font-mono">
                  <span className="text-[#2F80ED]">💡</span>
                  <span>{activeModule.analogy.title}</span>
                </span>
                <p className="text-[#4a4d4f] leading-relaxed">
                  {activeModule.analogy.description}
                </p>
              </div>
            )}

            {/* Takeaway & Deliverable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="font-bold text-[#071B3A] block mb-1">Key Takeaway</span>
                <p className="text-[#4a4d4f] leading-snug">{activeModule.takeaway}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="font-bold text-[#071B3A] block mb-1">Module Deliverable</span>
                <p className="text-[#4a4d4f] leading-snug">{activeModule.deliverable}</p>
              </div>
            </div>

          </div>

          {/* Prompt to Copy Card */}
          {activeModule.copyPrompt && (
            <div className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#2F80ED]" />
                  <h3 className="text-xs sm:text-sm font-bold text-[#071B3A]">
                    {activeModule.copyPrompt.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleCopyPrompt(activeModule.copyPrompt.prompt)}
                  className="px-3 py-1 rounded-full bg-[#2F80ED] hover:bg-[#256fd1] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#071B3A] text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto border border-white/10">
                <pre className="whitespace-pre-wrap">{activeModule.copyPrompt.prompt}</pre>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#706B67]">
                <FileCode className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Target artifact destination: </span>
                <code className="font-mono text-[#071B3A] font-bold bg-[#F4F7FB] px-1.5 py-0.5 rounded border border-[#4a4d4f]/10">
                  {activeModule.copyPrompt.targetDoc}
                </code>
              </div>
            </div>
          )}

          {/* Hands-on Exercise */}
          {activeModule.exercise && (
            <div className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-2">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#ec4909] flex items-center gap-1.5">
                <span>🎯</span>
                <span>Hands-on Director Exercise</span>
              </span>
              <p className="text-xs sm:text-sm text-[#4a4d4f] leading-relaxed">
                {activeModule.exercise}
              </p>
            </div>
          )}

        </div>

        {/* Right Column: Lessons Deep Dive & Interactive Quiz (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Detailed Lessons Accordion / Breakdown */}
          <div className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#4a4d4f]/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2F80ED]" />
                <h3 className="text-sm font-bold text-[#071B3A]">Lesson Outline</h3>
              </div>
              <span className="text-xs font-mono text-[#706B67]">
                {activeModule.lessons.length} Core Sections
              </span>
            </div>

            <div className="space-y-4">
              {activeModule.lessons.map((lesson) => (
                <div key={lesson.id} className="p-4 rounded-2xl bg-[#F4F7FB] border border-[#4a4d4f]/10 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#071B3A] text-white text-[10px] font-mono font-bold">
                      {lesson.id}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#071B3A]">
                      {lesson.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#4a4d4f] leading-relaxed">
                    {lesson.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Self-Check Quiz */}
          {activeModule.quiz && activeModule.quiz.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#4a4d4f]/10">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#34D399]" />
                  <h3 className="text-sm font-bold text-[#071B3A]">Check Yourself Quiz</h3>
                </div>
                <span className="text-xs font-mono text-[#706B67]">
                  Instant Feedback
                </span>
              </div>

              <div className="space-y-5">
                {activeModule.quiz.map((q, qIndex) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = showQuizResults[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div key={q.id} className="space-y-2.5 text-xs">
                      <p className="font-bold text-[#071B3A] leading-snug">
                        {qIndex + 1}. {q.question}
                      </p>

                      <div className="space-y-1.5">
                        {q.options.map((option, optIdx) => {
                          const isOptionSelected = selectedOpt === optIdx;
                          let btnStyle = 'bg-[#F4F7FB] hover:bg-[#EAEFF7] text-[#4a4d4f] border-[#4a4d4f]/10';

                          if (isAnswered) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-[#34D399]/20 text-[#071B3A] border-[#34D399] font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-100 text-rose-800 border-rose-300';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {isAnswered && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Reveal */}
                      {isAnswered && (
                        <div className={`p-3 rounded-xl text-[11px] leading-relaxed ${
                          isCorrect ? 'bg-[#34D399]/10 text-[#071B3A] border border-[#34D399]/30' : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          <span className="font-bold block mb-0.5">
                            {isCorrect ? '✓ Correct!' : 'Explanation:'}
                          </span>
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Module Navigation Footer */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {prevModule ? (
              <button
                onClick={() => {
                  setSelectedModuleId(prevModule.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F4F7FB] border border-[#4a4d4f]/15 text-[#071B3A] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev: Module {prevModule.id}</span>
              </button>
            ) : <div />}

            {nextModule ? (
              <button
                onClick={() => {
                  setSelectedModuleId(nextModule.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ml-auto"
              >
                <span>Next: Module {nextModule.id}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onExploreDirectory}
                className="px-5 py-2.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ml-auto"
              >
                <span>Explore Ecosystem Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';
import { CourseModule, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  Copy,
  Check,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Cpu,
  Layers,
  Network,
  Wrench,
  MessageSquare,
  Bot,
  FileText,
  Hammer,
  Rocket
} from 'lucide-react';

interface CourseCurriculumProps {
  completedModules: number[];
  onToggleCompleteModule: (moduleId: number) => void;
}

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  completedModules,
  onToggleCompleteModule
}) => {
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(1);
  const [activeQuizModule, setActiveQuizModule] = useState<CourseModule | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);

  const getModuleIcon = (slug: string) => {
    switch (slug) {
      case 'what-is-vibe-coding': return Sparkles;
      case 'ai-fundamentals': return Cpu;
      case 'ai-landscape': return Layers;
      case 'web-app-architecture': return Network;
      case 'the-toolbox': return Wrench;
      case 'talking-to-ai': return MessageSquare;
      case 'agents': return Bot;
      case 'document-stack': return FileText;
      case 'build-process': return Hammer;
      case 'ship-it': return Rocket;
      default: return BookOpen;
    }
  };

  const handleCopyPrompt = (promptText: string, moduleId: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(moduleId);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const openQuiz = (mod: CourseModule) => {
    setActiveQuizModule(mod);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const selectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const submitQuiz = () => {
    if (!activeQuizModule) return;
    setQuizSubmitted(true);

    const questions = activeQuizModule.quiz;
    let correctCount = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === questions.length) {
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (!completedModules.includes(activeQuizModule.id)) {
        onToggleCompleteModule(activeQuizModule.id);
      }
    }
  };

  return (
    <section id="curriculum" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete 10-Module Syllabus</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          From Concept to Production App
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Each module includes plain-English theory, a real-world analogy, copy-paste prompts, an exercise, and an interactive 3-question knowledge check.
        </p>
      </div>

      {/* Modules Accordion List */}
      <div className="space-y-4 max-w-5xl mx-auto">
        {COURSE_MODULES.map((mod) => {
          const isExpanded = expandedModuleId === mod.id;
          const isCompleted = completedModules.includes(mod.id);
          const Icon = getModuleIcon(mod.slug);

          return (
            <div
              key={mod.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-zinc-900 border-zinc-700/80 shadow-2xl'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              {/* Module Top Row Summary */}
              <div
                onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        MODULE {mod.id}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {mod.estimatedHours}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white mt-1 truncate">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 hidden sm:block">
                      {mod.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuiz(mod);
                    }}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Quiz</span>
                  </button>

                  <div className="p-2 text-zinc-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Module Expanded Details */}
              {isExpanded && (
                <div className="px-5 sm:px-8 pb-8 pt-2 border-t border-zinc-800/80 space-y-6">
                  
                  {/* Real World Analogy Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{mod.analogy.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                      "{mod.analogy.description}"
                    </p>
                  </div>

                  {/* Lessons Grid */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                      Lesson Breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800/60">
                          <div className="text-xs font-mono text-emerald-400 font-bold mb-1">
                            Lesson {lesson.id}
                          </div>
                          <div className="text-sm font-bold text-white mb-1.5">
                            {lesson.title}
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            {lesson.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Copy Prompt for Module */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                          {mod.copyPrompt.title}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          → Saves to {mod.copyPrompt.targetDoc}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyPrompt(mod.copyPrompt.prompt, mod.id)}
                        className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-mono"
                      >
                        {copiedPromptId === mod.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPromptId === mod.id ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                      </button>
                    </div>
                    <pre className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                      {mod.copyPrompt.prompt}
                    </pre>
                  </div>

                  {/* Action Bar (Exercise, Quiz, Completion) */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-zinc-400">
                      <strong className="text-white font-mono">Exercise:</strong> {mod.exercise}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => openQuiz(mod)}
                        className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Take 3-Question Quiz</span>
                      </button>

                      <button
                        onClick={() => onToggleCompleteModule(mod.id)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'Marked Done' : 'Mark as Done'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Quiz Modal */}
      {activeQuizModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Module {activeQuizModule.id} Knowledge Check
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeQuizModule.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizModule(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Questions List */}
            <div className="mt-6 space-y-6">
              {activeQuizModule.quiz.map((q, qIndex) => {
                const selected = quizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="text-sm font-bold text-white mb-3">
                      {qIndex + 1}. {q.question}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const isThisSelected = selected === optIndex;
                        let optionStyle = 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700';

                        if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            optionStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-semibold';
                          } else if (isThisSelected && !isCorrect) {
                            optionStyle = 'border-rose-500 bg-rose-950/60 text-rose-200';
                          }
                        } else if (isThisSelected) {
                          optionStyle = 'border-cyan-500 bg-cyan-950/60 text-cyan-200 font-semibold';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => selectAnswer(q.id, optIndex)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIndex === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submission */}
                    {quizSubmitted && (
                      <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                        isCorrect ? 'bg-emerald-950/40 text-emerald-300' : 'bg-rose-950/40 text-rose-300'
                      }`}>
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Bottom Submit / Result */}
            <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
              {quizSubmitted ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm font-mono text-zinc-300">
                    Score: <strong className="text-white">
                      {Object.keys(quizAnswers).filter(k => {
                        const q = activeQuizModule.quiz.find(x => x.id === k);
                        return q && quizAnswers[k] === q.correctIndex;
                      }).length} / {activeQuizModule.quiz.length}
                    </strong>
                  </div>
                  <button
                    onClick={() => setActiveQuizModule(null)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-400 text-black font-bold text-xs"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < activeQuizModule.quiz.length}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                >
                  Submit & Check Answers
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

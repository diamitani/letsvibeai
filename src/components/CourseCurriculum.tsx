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
    <section id="curriculum" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] border-t border-[#EAE3D9]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Complete 10-Module Syllabus</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#281010] tracking-tight font-display">
          From Concept to Production App
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#706B67] font-normal">
          Each module includes plain-English theory, a real-world analogy, copy-paste prompts, an exercise, and an interactive 3-question knowledge check.
        </p>
      </div>

      {/* Modules Accordion List */}
      <div className="space-y-4 max-w-5xl mx-auto text-left">
        {COURSE_MODULES.map((mod) => {
          const isExpanded = expandedModuleId === mod.id;
          const isCompleted = completedModules.includes(mod.id);
          const Icon = getModuleIcon(mod.slug);

          return (
            <div
              key={mod.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white border-[#FA5929] shadow-lg ring-1 ring-[#FA5929]'
                  : 'bg-white border-[#EAE3D9] hover:border-[#FA5929]/50 shadow-xs'
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
                        ? 'bg-[#C4DAC8]/50 text-[#1B4D2B] border-[#C4DAC8]'
                        : 'bg-[#F8F3EC] text-[#FA5929] border-[#EAE3D9] shadow-2xs'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6 text-[#34D399]" /> : <Icon className="w-6 h-6 text-[#FA5929]" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#FA5929]">
                        MODULE {mod.id}
                      </span>
                      <span className="text-xs text-[#706B67] font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {mod.estimatedHours}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#C4DAC8]/60 text-[#1B4D2B] border border-[#C4DAC8] font-bold uppercase">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-[#281010] mt-1 truncate">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#706B67] mt-0.5 hidden sm:block">
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
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F8F3EC] hover:bg-[#FAF7F2] border border-[#EAE3D9] text-xs font-bold text-[#281010] shadow-2xs transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#FA5929]" />
                    <span>Quiz</span>
                  </button>

                  <div className="p-2 text-[#706B67]">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#FA5929]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Module Expanded Details */}
              {isExpanded && (
                <div className="px-5 sm:px-8 pb-8 pt-2 border-t border-[#EAE3D9] space-y-6 bg-white">
                  
                  {/* Real World Analogy Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9]">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FA5929] uppercase mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{mod.analogy.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#706B67] leading-relaxed italic">
                      "{mod.analogy.description}"
                    </p>
                  </div>

                  {/* Lessons Grid */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#706B67] uppercase tracking-wider mb-3">
                      Lesson Breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] shadow-2xs">
                          <div className="text-xs font-mono text-[#FA5929] font-bold mb-1">
                            Lesson {lesson.id}
                          </div>
                          <div className="text-sm font-bold text-[#281010] mb-1.5">
                            {lesson.title}
                          </div>
                          <p className="text-xs text-[#706B67] leading-relaxed">
                            {lesson.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Copy Prompt for Module */}
                  <div className="p-5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#FA5929] uppercase">
                          {mod.copyPrompt.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#706B67]">
                          → Saves to {mod.copyPrompt.targetDoc}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyPrompt(mod.copyPrompt.prompt, mod.id)}
                        className="flex items-center gap-1.5 text-xs text-[#281010] hover:text-[#FA5929] font-bold"
                      >
                        {copiedPromptId === mod.id ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPromptId === mod.id ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                      </button>
                    </div>
                    <pre className="p-3.5 rounded-xl bg-white border border-[#EAE3D9] text-xs font-mono text-[#281010] whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-2xs">
                      {mod.copyPrompt.prompt}
                    </pre>
                  </div>

                  {/* Action Bar (Exercise, Quiz, Completion) */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#706B67]">
                      <strong className="text-[#281010] font-mono">Exercise:</strong> {mod.exercise}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => openQuiz(mod)}
                        className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold text-white bg-[#FA5929] hover:bg-[#E0491B] rounded-full transition-all flex items-center justify-center gap-2 shadow-xs"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Take 3-Question Quiz</span>
                      </button>

                      <button
                        onClick={() => onToggleCompleteModule(mod.id)}
                        className={`px-5 py-2.5 text-xs font-bold rounded-full border transition-all flex items-center justify-center gap-2 shadow-xs ${
                          isCompleted
                            ? 'bg-[#C4DAC8]/60 text-[#1B4D2B] border-[#C4DAC8]'
                            : 'bg-white hover:bg-[#FAF7F2] text-[#281010] border-[#EAE3D9]'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#EAE3D9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EAE3D9]">
              <div>
                <span className="text-xs font-mono font-bold text-[#FA5929] uppercase">
                  Module {activeQuizModule.id} Knowledge Check
                </span>
                <h3 className="text-xl font-bold text-[#281010] mt-1 font-display">
                  {activeQuizModule.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizModule(null)}
                className="p-1.5 rounded-full bg-[#F8F3EC] text-[#706B67] hover:text-[#281010]"
              >
                ✕
              </button>
            </div>

            {/* Questions List */}
            <div className="mt-6 space-y-6">
              {activeQuizModule.quiz.map((q, qIndex) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9]">
                    <div className="text-sm font-bold text-[#281010] mb-3">
                      {qIndex + 1}. {q.question}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const isThisSelected = selected === optIndex;
                        let optionStyle = 'border-[#EAE3D9] bg-white text-[#706B67] hover:border-[#FA5929]/50';

                        if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            optionStyle = 'border-emerald-500 bg-[#C4DAC8]/40 text-[#1B4D2B] font-semibold';
                          } else if (isThisSelected && !isCorrect) {
                            optionStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                          }
                        } else if (isThisSelected) {
                          optionStyle = 'border-[#FA5929] bg-[#FBE1CE] text-[#FA5929] font-semibold';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => selectAnswer(q.id, optIndex)}
                            className={`w-full text-left p-3 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIndex === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submission */}
                    {quizSubmitted && (
                      <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${
                        isCorrect ? 'bg-[#C4DAC8]/40 text-[#1B4D2B] border border-[#C4DAC8]' : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Bottom Submit / Result */}
            <div className="mt-8 pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              {quizSubmitted ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm font-mono text-[#706B67]">
                    Score: <strong className="text-[#281010]">
                      {Object.keys(quizAnswers).filter(k => {
                        const q = activeQuizModule.quiz.find(x => x.id === k);
                        return q && quizAnswers[k] === q.correctIndex;
                      }).length} / {activeQuizModule.quiz.length}
                    </strong>
                  </div>
                  <button
                    onClick={() => setActiveQuizModule(null)}
                    className="px-5 py-2.5 rounded-full bg-[#281010] hover:bg-[#3D1E1E] text-white font-bold text-xs shadow-xs"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < activeQuizModule.quiz.length}
                  className="w-full py-3 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
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

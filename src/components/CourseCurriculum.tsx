import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';
import { CourseModule, QuizQuestion } from '../types';
import {
  CheckCircle,
  Play,
  FileCode,
  HelpCircle,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  ChevronDown,
  X,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseCurriculumProps {
  completedModules: number[];
  onToggleCompleteModule: (moduleId: number) => void;
}

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  completedModules,
  onToggleCompleteModule
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModuleModal, setActiveModuleModal] = useState<CourseModule | null>(null);
  const [activeQuizModule, setActiveQuizModule] = useState<CourseModule | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All 10 Modules' },
    { id: 'foundation', name: 'Core Vibe Coding' },
    { id: 'harness', name: 'Agent Harnesses' },
    { id: 'data', name: 'Postgres & RLS' },
    { id: 'commerce', name: 'Stripe & Scale' }
  ];

  const filteredModules = COURSE_MODULES.filter((mod) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'foundation') return mod.id <= 3;
    if (selectedCategory === 'harness') return mod.id === 4 || mod.id === 5;
    if (selectedCategory === 'data') return mod.id === 6 || mod.id === 7;
    if (selectedCategory === 'commerce') return mod.id >= 8;
    return true;
  });

  const handleStartQuiz = (module: CourseModule, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveQuizModule(module);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectQuizAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleEvaluateQuiz = () => {
    if (!activeQuizModule) return;
    let correctCount = 0;
    activeQuizModule.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / activeQuizModule.quiz.length) * 100);
    setQuizScore(finalScore);
    setQuizSubmitted(true);

    if (finalScore >= 70) {
      if (!completedModules.includes(activeQuizModule.id)) {
        onToggleCompleteModule(activeQuizModule.id);
      }
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <section id="curriculum" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mastery Syllabus</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101b24] tracking-tight leading-[1.15]">
            10-Module Production{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              Curriculum Syllabus.
            </span>
          </h2>

          <p className="text-base text-[#4a4d4f] leading-relaxed">
            From foundational prompting to autonomous agent loops, database isolation, and Stripe monetization.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 flex-wrap bg-white p-1.5 rounded-full border border-[#4a4d4f]/10 shadow-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#101b24] text-white shadow-xs'
                  : 'text-[#4a4d4f] hover:text-[#101b24] hover:bg-[#f7f4f2]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
        {filteredModules.map((mod) => {
          const isCompleted = completedModules.includes(mod.id);

          return (
            <div
              key={mod.id}
              onClick={() => setActiveModuleModal(mod)}
              className="p-6 sm:p-7 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(16,27,36,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(16,27,36,0.09)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Top Badge & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909] border border-[#ec4909]/20">
                    MODULE 0{mod.id}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#4a4d4f] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ec4909]" />
                      {mod.estimatedHours}
                    </span>
                    {isCompleted && (
                      <span className="w-5 h-5 rounded-full bg-[#34D399]/20 text-[#15803d] flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Module Title */}
                <h3 className="text-lg font-bold text-[#101b24] group-hover:text-[#ec4909] transition-colors mb-2 font-sans leading-snug">
                  {mod.title}
                </h3>

                {/* Module Tagline */}
                <p className="text-xs text-[#4a4d4f] leading-relaxed mb-4 line-clamp-2">
                  {mod.tagline}
                </p>

                {/* Key Deliverable Box */}
                <div className="p-3.5 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 mb-4">
                  <span className="text-[10px] font-mono text-[#4a4d4f]/80 uppercase block font-bold mb-0.5">
                    Core Output Artifact
                  </span>
                  <span className="text-xs font-bold text-[#101b24] line-clamp-1">
                    {mod.deliverable}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#4a4d4f]/10 flex items-center justify-between">
                <button
                  onClick={(e) => handleStartQuiz(mod, e)}
                  className="text-xs font-semibold text-[#ec4909] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Knowledge Check</span>
                </button>

                <span className="text-xs font-bold text-[#101b24] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ec4909]" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODULE DETAIL MODAL */}
      {activeModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101b24]/60 backdrop-blur-sm">
          <div className="bg-white border border-black/10 rounded-[32px] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-fadeIn">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#4a4d4f]/10">
              <div>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909] border border-[#ec4909]/20">
                  MODULE 0{activeModuleModal.id}
                </span>
                <h3 className="text-2xl font-black text-[#101b24] font-sans mt-2">
                  {activeModuleModal.title}
                </h3>
                <p className="text-xs text-[#4a4d4f] mt-1">{activeModuleModal.tagline}</p>
              </div>

              <button
                onClick={() => setActiveModuleModal(null)}
                className="p-2 rounded-full bg-[#f7f4f2] text-[#4a4d4f] hover:text-[#101b24] border border-[#4a4d4f]/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Detailed Lessons List */}
            <div className="my-6 space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#4a4d4f] uppercase tracking-wider">
                Lessons & Production Workflows
              </h4>
              <div className="space-y-2">
                {activeModuleModal.lessons.map((lesson, idx) => (
                  <div key={idx} className="p-3.5 bg-[#f7f4f2] rounded-2xl border border-[#4a4d4f]/10 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white text-[#101b24] font-mono font-bold flex items-center justify-center text-[11px] shadow-xs">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-[#101b24]">{lesson.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#4a4d4f]">Video + Repo Code</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 mt-4">
                <span className="text-[10px] font-mono text-[#ec4909] font-bold uppercase block mb-1">
                  Deliverable Artifact
                </span>
                <p className="text-xs font-bold text-[#101b24]">{activeModuleModal.deliverable}</p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#4a4d4f]/10 flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleCompleteModule(activeModuleModal.id);
                  setActiveModuleModal(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  completedModules.includes(activeModuleModal.id)
                    ? 'bg-[#34D399] text-white'
                    : 'bg-[#f7f4f2] text-[#101b24] border border-[#4a4d4f]/10 hover:bg-white'
                }`}
              >
                {completedModules.includes(activeModuleModal.id) ? '✓ Marked Completed' : 'Mark as Complete'}
              </button>

              <button
                onClick={() => {
                  const target = activeModuleModal;
                  setActiveModuleModal(null);
                  handleStartQuiz(target);
                }}
                className="px-5 py-2.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Take Module Knowledge Check
              </button>
            </div>

          </div>
        </div>
      )}

      {/* INTERACTIVE MODULE QUIZ MODAL */}
      {activeQuizModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101b24]/60 backdrop-blur-sm">
          <div className="bg-white border border-black/10 rounded-[32px] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-fadeIn">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#4a4d4f]/10">
              <div>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909]">
                  KNOWLEDGE CHECK
                </span>
                <h3 className="text-xl font-bold text-[#101b24] font-sans mt-2">
                  Module 0{activeQuizModule.id}: {activeQuizModule.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizModule(null)}
                className="p-2 rounded-full bg-[#f7f4f2] text-[#4a4d4f] hover:text-[#101b24] border border-[#4a4d4f]/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quiz Questions */}
            <div className="my-6 space-y-6">
              {activeQuizModule.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-xs font-bold text-[#101b24]">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let btnStyle = 'bg-[#f7f4f2] border-[#4a4d4f]/10 text-[#101b24]';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#34D399]/20 border-[#34D399] text-[#101b24] font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-red-50 border-red-300 text-red-700';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-[#ec4909]/10 border-[#ec4909] text-[#ec4909] font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizAnswer(qIdx, oIdx)}
                          className={`w-full p-3 rounded-2xl border text-xs text-left transition-all cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quiz Results */}
            {quizScore !== null && (
              <div className="p-4 rounded-2xl bg-[#f7f4f2] border border-[#4a4d4f]/10 mb-4 text-center">
                <span className="text-xs font-mono text-[#4a4d4f] uppercase block">Quiz Result</span>
                <span className={`text-2xl font-black font-sans ${quizScore >= 70 ? 'text-[#15803d]' : 'text-[#ec4909]'}`}>
                  {quizScore}% Score
                </span>
                <p className="text-xs text-[#4a4d4f] mt-1">
                  {quizScore >= 70 ? '✓ Mastery verified! Module completed.' : 'Review topics and retry.'}
                </p>
              </div>
            )}

            {/* Quiz Submit Button */}
            <div className="pt-4 border-t border-[#4a4d4f]/10">
              {!quizSubmitted ? (
                <button
                  onClick={handleEvaluateQuiz}
                  disabled={Object.keys(quizAnswers).length < activeQuizModule.quiz.length}
                  className="w-full py-3 rounded-full bg-[#ec4909] hover:bg-[#d43f05] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Submit for Evaluation
                </button>
              ) : (
                <button
                  onClick={() => setActiveQuizModule(null)}
                  className="w-full py-3 rounded-full bg-[#101b24] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

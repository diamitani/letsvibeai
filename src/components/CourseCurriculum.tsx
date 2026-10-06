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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mastery Syllabus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            10-Module Production <span className="text-[#FA5929]">Curriculum</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            From zero to building autonomous agent systems, database isolation, and Stripe commerce.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#281010] text-white shadow-xs'
                  : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((mod) => {
          const isCompleted = completedModules.includes(mod.id);

          return (
            <div
              key={mod.id}
              onClick={() => setActiveModuleModal(mod)}
              className="p-6 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#FA5929] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Top Badge & Duration */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60">
                    MODULE 0{mod.id}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#706B67] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.estimatedHours}
                    </span>
                    {isCompleted && (
                      <span className="w-5 h-5 rounded-full bg-[#34D399]/20 text-[#34D399] flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Module Title */}
                <h3 className="text-lg font-bold text-[#281010] group-hover:text-[#FA5929] transition-colors mb-2 font-heading">
                  {mod.title}
                </h3>

                {/* Module Tagline */}
                <p className="text-xs text-[#706B67] leading-relaxed mb-4 line-clamp-2">
                  {mod.tagline}
                </p>

                {/* Key Deliverable Pill */}
                <div className="p-3 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] mb-4">
                  <span className="text-[10px] font-mono text-[#706B67] uppercase block mb-0.5">
                    Core Output
                  </span>
                  <span className="text-xs font-bold text-[#281010] line-clamp-1">
                    {mod.deliverable}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
                <button
                  onClick={(e) => handleStartQuiz(mod, e)}
                  className="text-xs font-bold text-[#FA5929] hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Knowledge Check</span>
                </button>

                <span className="text-xs font-bold text-[#281010] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODULE DETAIL DRAWER / MODAL */}
      {activeModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
          <div className="bg-[#F8F3EC] border border-[#EAE3D9] rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#EAE3D9]">
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60">
                  MODULE 0{activeModuleModal.id}
                </span>
                <h3 className="text-2xl font-black text-[#281010] font-heading mt-1">
                  {activeModuleModal.title}
                </h3>
                <p className="text-xs text-[#706B67] mt-1">{activeModuleModal.tagline}</p>
              </div>

              <button
                onClick={() => setActiveModuleModal(null)}
                className="p-2 rounded-full bg-white text-[#706B67] hover:text-[#281010] border border-[#EAE3D9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Detailed Lessons List */}
            <div className="my-6 space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#706B67] uppercase tracking-wider">
                Lessons & Production Workflows
              </h4>
              <div className="space-y-2">
                {activeModuleModal.lessons.map((lesson, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-2xl border border-[#EAE3D9] text-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F8F3EC] text-[#281010] font-mono font-bold flex items-center justify-center text-[11px]">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-[#281010]">{lesson.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#706B67]">Video + Code</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] mt-4">
                <span className="text-[10px] font-mono text-[#FA5929] font-bold uppercase block mb-1">
                  Deliverable Artifact
                </span>
                <p className="text-xs font-bold text-[#281010]">{activeModuleModal.deliverable}</p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleCompleteModule(activeModuleModal.id);
                  setActiveModuleModal(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  completedModules.includes(activeModuleModal.id)
                    ? 'bg-[#34D399] text-white'
                    : 'bg-white text-[#281010] border border-[#EAE3D9]'
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
                className="px-5 py-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white text-xs font-bold transition-all shadow-md"
              >
                Take Module Quiz
              </button>
            </div>

          </div>
        </div>
      )}

      {/* INTERACTIVE MODULE QUIZ MODAL */}
      {activeQuizModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
          <div className="bg-[#F8F3EC] border border-[#EAE3D9] rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-left animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D9]">
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
                  KNOWLEDGE CHECK
                </span>
                <h3 className="text-xl font-bold text-[#281010] font-heading mt-1">
                  Module 0{activeQuizModule.id}: {activeQuizModule.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuizModule(null)}
                className="p-2 rounded-full bg-white text-[#706B67] hover:text-[#281010] border border-[#EAE3D9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quiz Questions */}
            <div className="my-6 space-y-6">
              {activeQuizModule.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-xs font-bold text-[#281010]">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let btnStyle = 'bg-white border-[#EAE3D9] text-[#281010]';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#34D399]/20 border-[#34D399] text-[#281010] font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-red-50 border-red-300 text-red-700';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-[#FBE1CE] border-[#FA5929] text-[#FA5929] font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizAnswer(qIdx, oIdx)}
                          className={`w-full p-3 rounded-2xl border text-xs text-left transition-all ${btnStyle}`}
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
              <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] mb-4 text-center">
                <span className="text-xs font-mono text-[#706B67] uppercase block">Quiz Result</span>
                <span className={`text-2xl font-black font-heading ${quizScore >= 70 ? 'text-[#34D399]' : 'text-[#FA5929]'}`}>
                  {quizScore}% Score
                </span>
                <p className="text-xs text-[#706B67] mt-1">
                  {quizScore >= 70 ? '✓ Mastery verified! Module completed.' : 'Review topics and retry.'}
                </p>
              </div>
            )}

            {/* Quiz Submit Button */}
            <div className="pt-4 border-t border-[#EAE3D9]">
              {!quizSubmitted ? (
                <button
                  onClick={handleEvaluateQuiz}
                  disabled={Object.keys(quizAnswers).length < activeQuizModule.quiz.length}
                  className="w-full py-3 rounded-full bg-[#FA5929] hover:bg-[#E0491B] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Submit for Evaluation
                </button>
              ) : (
                <button
                  onClick={() => setActiveQuizModule(null)}
                  className="w-full py-3 rounded-full bg-[#281010] text-white text-xs font-bold transition-all"
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

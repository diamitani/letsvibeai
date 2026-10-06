import React, { useState } from 'react';
import { CAPSTONE_DELIVERABLES } from '../data/courseData';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, Printer } from 'lucide-react';

export const CapstoneHub: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([
    'cap-1',
    'cap-2',
    'cap-3'
  ]);
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [certDate] = useState('October 2026');
  const [certCode] = useState('LV-2026-8941-ARCH');

  const toggleItem = (id: string) => {
    setCompletedItems((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (next.length === CAPSTONE_DELIVERABLES.length) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  const totalScore = CAPSTONE_DELIVERABLES.reduce((sum, item) => {
    return sum + (completedItems.includes(item.id) ? item.points : 0);
  }, 0);

  const isPassing = totalScore >= 70;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="capstone" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D9] text-left">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
          <Award className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Final Milestone & Accreditation</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#281010] tracking-tight">
          The Capstone Project & Certificate
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#706B67] font-normal">
          Complete the 5 deliverables of your live web app to achieve 70+ points and generate your accredited LetsVibeAI Vibe Architect Certificate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 5 Deliverables Checklist (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
            <div>
              <h3 className="text-base font-extrabold text-[#281010]">
                Capstone Deliverables Checklist
              </h3>
              <p className="text-xs text-[#706B67] mt-0.5">
                Click each milestone as you build and deploy your app.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black font-mono text-[#FA5929]">{totalScore}/100</div>
              <div className="text-[10px] text-[#706B67] font-medium">Points Required: 70</div>
            </div>
          </div>

          <div className="space-y-3">
            {CAPSTONE_DELIVERABLES.map((item) => {
              const isDone = completedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-[#F8F3EC] border-[#FA5929]/40 shadow-xs'
                      : 'bg-white border-[#EAE3D9] hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isDone
                        ? 'bg-[#FA5929] text-white'
                        : 'border border-[#EAE3D9] bg-white'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#281010]">{item.title}</h4>
                      <span className="text-[10px] font-mono font-bold text-[#FA5929] bg-[#FBE1CE] px-2.5 py-0.5 rounded-full border border-[#FCAA91]/40">
                        +{item.points} pts
                      </span>
                    </div>
                    <p className="text-xs text-[#706B67] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Real-time Institutional Certificate Preview (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#EAE3D9] shadow-xl relative overflow-hidden text-center">
            {/* Certificate Header Lockup */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#281010] flex items-center justify-center shadow-xs">
                <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M10 12L24 38L38 12"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="22" r="4" fill="#FA5929" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-base font-extrabold text-[#281010]">LetsVibeAI Academy</div>
                <div className="text-[10px] text-[#706B67] font-mono tracking-widest uppercase">
                  Institutional Credential
                </div>
              </div>
            </div>

            <div className="text-xs font-mono uppercase tracking-widest text-[#FA5929] font-bold mb-2">
              Certificate of Architectural Mastery
            </div>

            <div className="text-xs text-[#706B67] mb-2">This is proudly awarded to</div>

            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="text-2xl sm:text-3xl font-black text-[#281010] text-center w-full bg-transparent border-b border-dashed border-[#EAE3D9] focus:outline-none focus:border-[#FA5929] pb-1 mb-4 font-display"
            />

            <p className="text-xs text-[#706B67] max-w-md mx-auto leading-relaxed mb-6">
              for successfully designing, planning, building, and deploying a production-grade full-stack web application with AI agents, verified through the 11-Layer Architecture Stack.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EAE3D9] text-xs text-[#706B67] font-mono">
              <div>
                <div className="text-[#706B67] text-[10px]">Date Issued</div>
                <div className="font-bold text-[#281010]">{certDate}</div>
              </div>
              <div>
                <div className="text-[#706B67] text-[10px]">Verification ID</div>
                <div className="font-bold text-[#281010]">{certCode}</div>
              </div>
            </div>

            {/* Passing Ribbon Indicator */}
            {isPassing ? (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBE1CE] text-[#FA5929] text-xs font-bold border border-[#FCAA91]/60">
                <CheckCircle2 className="w-4 h-4 text-[#FA5929]" />
                <span>Accredited Vibe Architect • Ready to Export</span>
              </div>
            ) : (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
                <span>Earn {70 - totalScore} more points to unlock certificate</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrint}
              disabled={!isPassing}
              className="flex-1 py-3.5 px-6 bg-[#281010] hover:bg-[#3D1E1E] disabled:opacity-40 text-white font-extrabold text-xs rounded-full transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Verified PDF</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

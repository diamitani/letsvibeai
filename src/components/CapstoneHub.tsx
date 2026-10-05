import React, { useState } from 'react';
import { CAPSTONE_DELIVERABLES } from '../data/courseData';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, ShieldCheck, Printer, Sparkles, ExternalLink, UserCheck } from 'lucide-react';

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
    <section id="capstone" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Final Milestone & Accreditation</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The Capstone Project & Certificate
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Ship one live web app with sign-in, database, payments, and an AI agent. Passing unlocks the LetsVibeAI Certified Architect credential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Capstone Rubric (6 cols) */}
        <div className="lg:col-span-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">100-Point Scoring Rubric</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Capstone Deliverables</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-extrabold text-emerald-400">
                {totalScore} <span className="text-xs text-zinc-500 font-normal">/ 100</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                {isPassing ? '✓ Passing Threshold Met' : 'Need 70+ to Certify'}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500"
              style={{ width: `${totalScore}%` }}
            />
          </div>

          {/* Checklist items */}
          <div className="space-y-3">
            {CAPSTONE_DELIVERABLES.map((item) => {
              const isChecked = completedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isChecked
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-white'
                      : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-emerald-400 border-emerald-400 text-black' : 'border-zinc-700 bg-zinc-900'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 font-bold">{item.moduleRef}</span>
                        <span className="text-sm font-bold text-white">{item.title}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-zinc-400 shrink-0">
                    +{item.points} pts
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
            <strong className="text-white">Sample Capstone Ideas:</strong> AI tutor for specific professions, niche directory with semantic search, automated client portal with Stripe subscriptions, voice-agent booking assistant.
          </div>
        </div>

        {/* Right: Live Certificate Generator Preview (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Certificate Customizer Inputs */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-zinc-400">Student Name:</span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
            />
            <button
              onClick={handlePrint}
              disabled={!isPassing}
              className="px-4 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs flex items-center gap-1.5 disabled:opacity-40"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>

          {/* Certificate Visual Artifact */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-emerald-500/40 shadow-2xl overflow-hidden text-center text-white">
            
            {/* Ambient gold glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
              <span className="font-extrabold text-lg tracking-tight">
                LetsVibe<span className="text-emerald-400">AI</span>
              </span>
            </div>

            <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
              Official Certificate of Mastery
            </div>

            <p className="text-xs text-zinc-400 italic mb-2">This is to certify that</p>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight underline decoration-emerald-500/60 decoration-2 underline-offset-8 mb-4">
              {studentName || 'Student Name'}
            </h3>

            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed mb-6">
              has successfully planned, architected, and deployed a production-grade full-stack web application with autonomous AI agents, Postgres Row-Level Security, and Stripe payments.
            </p>

            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold mb-6">
              Certified AI Software Architect
            </div>

            {/* Certificate Footer Metadata */}
            <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between text-left text-[11px] font-mono text-zinc-400">
              <div>
                <div>Issued: <span className="text-white">{certDate}</span></div>
                <div>Status: <span className="text-emerald-400 font-bold">Verified & Active</span></div>
              </div>

              <div className="text-right">
                <div>Credential ID:</div>
                <div className="text-cyan-400 font-bold">{certCode}</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

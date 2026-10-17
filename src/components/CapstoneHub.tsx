import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Download,
  Share2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CapstoneHub: React.FC = () => {
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [isGenerated, setIsGenerated] = useState(false);

  const deliverables = [
    { name: 'Live Production SaaS URL', status: 'Deployed on Vercel' },
    { name: 'Supabase RLS Database Schema', status: 'Verified with 0 Leaks' },
    { name: 'Stripe Webhook Handler & Portal', status: 'Test Webhook Passed' },
    { name: 'Agent Harness & Skill Manifest', status: 'Exported & Formatted' }
  ];

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setIsGenerated(true);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <section id="capstone" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#4a4d4f]/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Accredited Certification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#101b24] font-sans">
            Capstone Project & <span className="text-[#ec4909]">Credential</span>
          </h2>
          <p className="text-sm text-[#4a4d4f] max-w-xl">
            Complete the 4 capstone deliverables to unlock your verifiable LetsVibeAI Vibe Engineer Certificate.
          </p>
        </div>
      </div>

      {/* Grid: Deliverables Checklist + Certificate Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Deliverables Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-black/[0.06] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#101b24]">
              Required Deliverable Gate
            </h3>

            <div className="space-y-2.5">
              {deliverables.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#f7f4f2] rounded-2xl border border-[#4a4d4f]/10 text-xs flex items-center justify-between">
                  <span className="font-semibold text-[#101b24]">{item.name}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#34D399]/20 text-[#15803d]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleGenerateCertificate} className="pt-4 border-t border-[#4a4d4f]/10 space-y-3">
              <label className="block text-xs font-mono font-bold text-[#4a4d4f] uppercase">
                Student Name for Certificate
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#f7f4f2] border border-[#4a4d4f]/10 text-xs text-[#101b24] focus:outline-none focus:border-[#ec4909]"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-95 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Generate Verified Credential
              </button>
            </form>
          </div>
        </div>

        {/* Certificate Preview Frame (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-[32px] bg-white border-2 border-[#ec4909]/30 shadow-xl text-center space-y-6 relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-full bg-[#101b24] text-[#ec4909] flex items-center justify-center mx-auto text-sm font-black">
            LV
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ec4909] font-bold">
              CERTIFICATE OF COMPLETION
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif italic text-[#101b24]">
              {studentName || 'Alex Rivera'}
            </h4>
            <p className="text-xs text-[#4a4d4f] max-w-md mx-auto pt-2">
              has successfully compiled all 10 modules, verified multi-tenant Supabase RLS security, deployed autonomous agent harnesses, and shipped a live capstone application.
            </p>
          </div>

          <div className="pt-6 border-t border-[#4a4d4f]/10 flex items-center justify-between text-xs text-[#4a4d4f]">
            <div>
              <span className="block font-bold text-[#101b24]">Dr. Alex Vance</span>
              <span className="text-[10px]">Lead AI Architect</span>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-[#15803d] font-bold block">
                ID: LV-2026-ENG
              </span>
              <span className="text-[10px]">Verified Credential</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

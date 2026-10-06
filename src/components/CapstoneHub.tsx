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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Accredited Certification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Capstone Project & <span className="text-[#FA5929]">Credential</span>
          </h2>
          <p className="text-sm text-[#706B67] mt-1 max-w-xl">
            Complete the 4 capstone deliverables to unlock your verifiable LetsVibeAI Vibe Engineer Certificate.
          </p>
        </div>
      </div>

      {/* Grid: Deliverables Checklist + Certificate Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Deliverables Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#281010] font-heading">
              Required Deliverable Gate
            </h3>

            <div className="space-y-2.5">
              {deliverables.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#F8F3EC] rounded-2xl border border-[#EAE3D9] text-xs flex items-center justify-between">
                  <span className="font-semibold text-[#281010]">{item.name}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#34D399]/20 text-[#281010]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleGenerateCertificate} className="pt-4 border-t border-[#EAE3D9] space-y-3">
              <label className="block text-xs font-mono font-bold text-[#706B67] uppercase">
                Student Name for Certificate
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929]"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#FA5929] hover:bg-[#E0491B] active:scale-95 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Generate Verified Credential
              </button>
            </form>
          </div>
        </div>

        {/* Certificate Preview Frame (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border-2 border-[#FA5929]/30 shadow-xl text-center space-y-6 relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-full bg-[#281010] text-[#FA5929] flex items-center justify-center mx-auto text-sm font-black font-heading">
            LV
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#706B67] uppercase block">
              Official Certification of Completion
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#281010] font-heading">
              Autonomous Systems & Vibe Engineering
            </h3>
            <p className="text-xs text-[#706B67]">This certificate verifies that</p>
            <h4 className="text-2xl font-serif italic text-[#FA5929] py-1 border-b border-[#EAE3D9] max-w-sm mx-auto">
              {studentName}
            </h4>
            <p className="text-xs text-[#706B67] max-w-md mx-auto leading-relaxed">
              has completed all 10 modules, passed the architectural invariants assessment, and deployed a production-grade autonomous agent SaaS.
            </p>
          </div>

          <div className="pt-6 border-t border-[#EAE3D9] flex items-center justify-between text-xs text-[#706B67]">
            <div className="text-left">
              <span className="font-bold text-[#281010] block font-heading">LetsVibeAI Academy</span>
              <span className="text-[10px] font-mono">ID: LV-2026-CERT-8842</span>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-[#34D399] font-bold block">✓ Verified On-Chain</span>
              <span className="text-[10px]">Issued: Oct 2026</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

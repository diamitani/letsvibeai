import React from 'react';
import { AgentHarnessExplorer } from '../AgentHarnessExplorer';
import { Sparkles, ArrowLeft, Cpu } from 'lucide-react';

interface HarnessMasteryViewProps {
  onBackToHome?: () => void;
}

export const HarnessMasteryView: React.FC<HarnessMasteryViewProps> = ({ onBackToHome }) => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#f7f4f2] text-left font-sans min-h-screen">
      
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#4a4d4f]/10">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#101b24] hover:text-white text-[#101b24] text-xs font-bold border border-[#4a4d4f]/15 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4909]/10 border border-[#ec4909]/20 text-[#ec4909] text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Standalone Course View</span>
          </div>
        </div>

        <span className="text-xs font-mono text-[#4a4d4f]">
          Source: GencyAI Agent Harness Mastery
        </span>
      </div>

      {/* Render the full interactive Harness Explorer */}
      <AgentHarnessExplorer />

    </div>
  );
};

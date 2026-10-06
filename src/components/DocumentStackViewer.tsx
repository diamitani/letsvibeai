import React, { useState } from 'react';
import { DOC_TEMPLATES } from '../data/courseData';
import { DocTemplate } from '../types';
import { FileText, Copy, Check, Download } from 'lucide-react';

export const DocumentStackViewer: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocTemplate>(DOC_TEMPLATES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (doc: DocTemplate) => {
    const blob = new Blob([doc.contentTemplate], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="docs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D9] text-left">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
          <FileText className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Module 8 Artifact Catalog</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#281010] tracking-tight">
          The 11-Document Planning Stack
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#706B67] font-normal">
          The exact technical documents professional builders generate with AI before writing a single line of production code.
        </p>
      </div>

      {/* Docs Grid & Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 11 Docs Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {DOC_TEMPLATES.map((doc) => {
            const isSelected = selectedDoc.id === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-white border-[#FA5929] shadow-md ring-1 ring-[#FA5929]'
                    : 'bg-white border-[#EAE3D9] hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono text-[#FA5929] font-bold">
                    {doc.num} · {doc.filename}
                  </div>
                  <h4 className="text-xs font-bold text-[#281010] mt-0.5">{doc.title}</h4>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] font-mono text-[#706B67] shadow-xs">
                  {doc.owner}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Document Markdown Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAE3D9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#FA5929] uppercase">
                  {selectedDoc.filename}
                </span>
                <span className="text-[#EAE3D9]">•</span>
                <span className="text-xs font-medium text-[#706B67]">
                  Owner: {selectedDoc.owner}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#281010]">{selectedDoc.title}</h3>
              <p className="text-xs text-[#706B67] mt-0.5">{selectedDoc.purpose}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(selectedDoc.contentTemplate)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F8F3EC] hover:bg-[#FBE1CE] border border-[#EAE3D9] rounded-full text-xs font-bold text-[#281010] shadow-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#FA5929]" />
                    <span className="text-[#FA5929]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownload(selectedDoc)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FA5929] hover:bg-[#E0491B] text-white rounded-full text-xs font-bold shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs font-mono text-[#281010] leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px] shadow-xs">
            {selectedDoc.contentTemplate}
          </pre>
        </div>

      </div>
    </section>
  );
};

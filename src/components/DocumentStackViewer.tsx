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
    <section id="docs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-slate-200 text-left">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#071B3A] text-xs font-semibold mb-3 shadow-xs">
          <FileText className="w-3.5 h-3.5 text-[#2F80ED]" />
          <span>Module 8 Artifact Catalog</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#10213F] tracking-tight">
          The 11-Document Planning Stack
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
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
                className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-white border-[#071B3A] shadow-md ring-1 ring-[#071B3A]'
                    : 'bg-[#F4F7FB] border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono text-[#2F80ED] font-bold">
                    {doc.num} · {doc.filename}
                  </div>
                  <h4 className="text-xs font-bold text-[#10213F] mt-0.5">{doc.title}</h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 font-mono text-slate-500 shadow-xs">
                  {doc.owner}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Document Markdown Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-[#F4F7FB] border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#2F80ED] uppercase">
                  {selectedDoc.filename}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-medium text-slate-500">
                  Owner: {selectedDoc.owner}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#10213F]">{selectedDoc.title}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{selectedDoc.purpose}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(selectedDoc.contentTemplate)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#10213F] shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span className="text-[#34D399]">Copied</span>
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#071B3A] hover:bg-[#10213F] text-white rounded-xl text-xs font-bold shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-white border border-slate-200 rounded-2xl text-xs font-mono text-slate-800 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px] shadow-xs">
            {selectedDoc.contentTemplate}
          </pre>
        </div>

      </div>
    </section>
  );
};


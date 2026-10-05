import React, { useState } from 'react';
import { DOC_TEMPLATES } from '../data/courseData';
import { DocTemplate } from '../types';
import { FileText, Copy, Check, Sparkles, Download, Layers } from 'lucide-react';

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
    <section id="docs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Module 8 Artifact Catalog</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The 11-Document Planning Stack
        </h2>
        <p className="mt-3 text-base sm:text-lg text-zinc-400">
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
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-md'
                    : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 hover:bg-zinc-850'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-emerald-400 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {doc.num}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-zinc-500 uppercase">{doc.owner}</div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-emerald-300">
                      {doc.title}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Document Preview (8 cols) */}
        <div className="lg:col-span-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          
          {/* Doc Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Doc {selectedDoc.num} · Owner: {selectedDoc.owner}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  ({selectedDoc.filename})
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedDoc.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                {selectedDoc.purpose}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy(selectedDoc.contentTemplate)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => handleDownload(selectedDoc)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-black transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          </div>

          {/* Key Sections Tags */}
          <div className="my-5 flex items-center gap-2 flex-wrap text-xs">
            <span className="font-mono text-zinc-500">Key Sections:</span>
            {selectedDoc.keySections.map((sec, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                {sec}
              </span>
            ))}
          </div>

          {/* Sample AI Generation Prompt */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 mb-6">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Prompt to Generate this Doc</span>
            </div>
            <p className="text-xs text-zinc-300 font-mono italic">
              "{selectedDoc.samplePrompt}"
            </p>
          </div>

          {/* Document Markdown Content Preview */}
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800/80 p-5 overflow-x-auto max-h-[380px] overflow-y-auto">
            <pre className="font-mono text-xs text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
              {selectedDoc.contentTemplate}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};

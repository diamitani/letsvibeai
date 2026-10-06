import React, { useState, useEffect, useRef } from 'react';
import { CurriculumAgentRuntime, AgentResponse } from '../lib/rostr/curriculumAgent';
import { NpaoScheduler } from '../lib/rostr/npaoScheduler';
import { ContextEngine } from '../lib/rostr/contextEngine';
import { PalManifest, NpaoTask, ContextEngineLogEntry } from '../lib/rostr/types';
import {
  Bot,
  Send,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  FileCode,
  X
} from 'lucide-react';

interface CurriculumAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const CurriculumAgentDrawer: React.FC<CurriculumAgentDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'manifest' | 'npao' | 'contextengine'>('chat');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent'; text: string; data?: AgentResponse }>>([
    {
      role: 'agent',
      text: 'Hello! I am your LetsVibeAI Curriculum Agent powered by ROSTR v2 (PAL · RAG DAL · NPAO · ContextEngine). Ask me anything about course lessons, prompt engineering, or share your app idea to compile an executable PAL Manifest!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentManifest, setCurrentManifest] = useState<PalManifest | null>(null);
  const [npaoTasks, setNpaoTasks] = useState<NpaoTask[]>([]);
  const [contextLogs, setContextLogs] = useState<ContextEngineLogEntry[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNpaoTasks(NpaoScheduler.sequence(NpaoScheduler.getDefaultCapstoneTasks()));
    setContextLogs(ContextEngine.getLogs());
  }, []);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg = query.trim();
    if (!textToSend) setInput('');

    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await CurriculumAgentRuntime.query(userMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text: response.answer,
          data: response
        }
      ]);

      if (response.manifest) {
        setCurrentManifest(response.manifest);
      }
      setContextLogs(ContextEngine.getLogs());
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text: 'An error occurred while running the ROSTR v2 engine. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#281010]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border-l border-[#EAE3D9] h-full flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D9] bg-[#F8F3EC] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60 flex items-center justify-center shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#281010]">Curriculum Agent</h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929] border border-[#FCAA91]/60 font-bold">
                  ROSTR v2 Runtime
                </span>
              </div>
              <p className="text-[11px] text-[#706B67]">PAL · RAG DAL Grounding · NPAO Scheduling</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-[#EAE3D9] text-[#706B67] hover:text-[#281010] shadow-2xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-[#F8F3EC] border-b border-[#EAE3D9] text-xs font-mono">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 rounded-full text-center transition-all ${
              activeTab === 'chat'
                ? 'bg-[#281010] text-white font-bold shadow-2xs'
                : 'text-[#706B67] hover:text-[#281010]'
            }`}
          >
            Chat & Coach
          </button>

          <button
            onClick={() => setActiveTab('manifest')}
            className={`flex-1 py-2 rounded-full text-center transition-all flex items-center justify-center gap-1 ${
              activeTab === 'manifest'
                ? 'bg-[#281010] text-white font-bold shadow-2xs'
                : 'text-[#706B67] hover:text-[#281010]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>PAL Manifest</span>
            {currentManifest && <span className="w-1.5 h-1.5 rounded-full bg-[#FA5929]" />}
          </button>

          <button
            onClick={() => setActiveTab('npao')}
            className={`flex-1 py-2 rounded-full text-center transition-all flex items-center justify-center gap-1 ${
              activeTab === 'npao'
                ? 'bg-[#281010] text-white font-bold shadow-2xs'
                : 'text-[#706B67] hover:text-[#281010]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>NPAO Tasks</span>
          </button>

          <button
            onClick={() => setActiveTab('contextengine')}
            className={`flex-1 py-2 rounded-full text-center transition-all flex items-center justify-center gap-1 ${
              activeTab === 'contextengine'
                ? 'bg-[#281010] text-white font-bold shadow-2xs'
                : 'text-[#706B67] hover:text-[#281010]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Trace Logs</span>
          </button>
        </div>

        {/* Tab Content: Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-[#281010] text-white font-medium shadow-xs'
                        : 'bg-[#F8F3EC] border border-[#EAE3D9] text-[#281010]'
                    }`}
                  >
                    {m.text}

                    {/* Citations if available */}
                    {m.data?.ragResult && m.data.ragResult.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#EAE3D9] text-[11px] text-[#706B67] font-mono">
                        <div className="text-[#FA5929] font-bold mb-1 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#FA5929]" />
                          <span>RAG DAL Grounding ({Math.round(m.data.ragResult.confidenceScore * 100)}% Confidence):</span>
                        </div>
                        <ul className="space-y-1">
                          {m.data.ragResult.citations.map((c, i) => (
                            <li key={i} className="flex items-center gap-1.5 truncate">
                              <span className="text-[#706B67]">[{c.tier.toUpperCase()}]</span>
                              <span className="text-[#281010]">{c.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View Manifest Shortcut */}
                    {m.data?.manifest && (
                      <button
                        onClick={() => setActiveTab('manifest')}
                        className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE3D9] text-[#FA5929] text-[11px] font-mono hover:bg-[#FBE1CE] transition-colors shadow-2xs font-bold"
                      >
                        <FileCode className="w-3 h-3" />
                        <span>Inspect Compiled PAL Manifest (Ambiguity: {m.data.manifest.intent.ambiguity_score})</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#FA5929] p-2">
                  <div className="w-2 h-2 rounded-full bg-[#FA5929] animate-ping" />
                  <span>ROSTR v2 RAG DAL converging across knowledge tiers...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-[#F8F3EC] border-t border-[#EAE3D9] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask curriculum coach or describe an app idea..."
                className="flex-1 bg-white border border-[#EAE3D9] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-2xs font-sans"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-[#FA5929] hover:bg-[#E0491B] disabled:opacity-40 text-white font-bold rounded-full transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: PAL Manifest */}
        {activeTab === 'manifest' && (
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white">
            {currentManifest ? (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
                  <span className="text-xs font-mono font-bold text-[#FA5929] uppercase">
                    Manifest ID: {currentManifest.id}
                  </span>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] font-bold">
                    Ambiguity Score: {currentManifest.intent.ambiguity_score}
                  </span>
                </div>

                <div className="mt-4 p-4 rounded-3xl bg-[#F8F3EC] border border-[#EAE3D9] space-y-3">
                  <div>
                    <span className="text-[11px] font-mono text-[#706B67] block uppercase">Agent Runtime</span>
                    <span className="text-xs font-bold text-[#281010] font-mono">
                      {currentManifest.runtime.agent_type.toUpperCase()} · Model: {currentManifest.runtime.model} · Temp: {currentManifest.runtime.temperature}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#706B67] block uppercase">Task Description</span>
                    <p className="text-xs text-[#281010] leading-relaxed font-sans mt-0.5">
                      {currentManifest.instructions.task_description}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#706B67] block uppercase">Completion Criteria</span>
                    <ul className="space-y-1 mt-1">
                      {currentManifest.instructions.completion_criteria.map((c, i) => (
                        <li key={i} className="text-xs text-[#281010] flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FA5929] shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#706B67]">Escalation Policy:</span>
                    <span className="text-[#FA5929] font-bold">{currentManifest.instructions.escalation_policy}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#706B67]">Allowed Tools:</span>
                    <span className="text-[#281010] font-bold">{currentManifest.tools_enabled.allow.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-mono text-[#706B67] block mb-1">YAML Manifest Output:</span>
                  <pre className="p-4 rounded-3xl bg-[#F8F3EC] border border-[#EAE3D9] font-mono text-[11px] text-[#281010] overflow-x-auto whitespace-pre leading-relaxed shadow-2xs">
{`runtime:
  agent_type: ${currentManifest.runtime.agent_type}
  model: ${currentManifest.runtime.model}
  temperature: ${currentManifest.runtime.temperature}
instructions:
  task_description: "${currentManifest.instructions.task_description}"
  completion_criteria:
${currentManifest.instructions.completion_criteria.map(c => `    - "${c}"`).join('\n')}
  definition_of_done: "${currentManifest.instructions.definition_of_done}"
tools_enabled:
  allow: [${currentManifest.tools_enabled.allow.join(', ')}]
  deny: [${currentManifest.tools_enabled.deny.join(', ')}]`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#706B67] font-mono text-xs">
                No active PAL Manifest. Share your app idea in the Chat tab to compile a manifest!
              </div>
            )}
          </div>
        )}

        {/* Tab Content: NPAO Tasks */}
        {activeTab === 'npao' && (
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white">
            <div className="pb-3 border-b border-[#EAE3D9] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#FA5929] uppercase">
                NPAO 5D Phase Sequencer
              </span>
              <span className="text-[10px] font-mono text-[#706B67]">
                Necessity → Anxiety → Priority → Opportunity
              </span>
            </div>

            <div className="space-y-2.5">
              {npaoTasks.map((t) => (
                <div
                  key={t.id}
                  className={`p-4 rounded-3xl border transition-all ${
                    t.completed
                      ? 'bg-[#F8F3EC] border-[#EAE3D9] opacity-60'
                      : t.category === 'necessity'
                      ? 'bg-[#FBE1CE] border-[#FCAA91]/60'
                      : 'bg-white border-[#EAE3D9] shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          t.category === 'necessity'
                            ? 'bg-[#281010] text-white'
                            : 'bg-[#F8F3EC] text-[#281010] border border-[#EAE3D9]'
                        }`}>
                          {t.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#706B67]">
                          Phase: {t.phase}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#281010]">
                        {t.title}
                      </div>
                      <p className="text-[11px] text-[#706B67] mt-1 leading-relaxed">{t.reason}</p>
                    </div>

                    <span className="text-xs font-mono text-[#706B67] shrink-0 font-bold">
                      {t.completed ? '✓ Done' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: ContextEngine Logs */}
        {activeTab === 'contextengine' && (
          <div className="flex-1 p-5 overflow-y-auto space-y-3 font-mono bg-white">
            <div className="pb-3 border-b border-[#EAE3D9] flex items-center justify-between text-xs">
              <span className="font-bold text-[#281010] uppercase">
                ContextEngine Append-Only Ledger
              </span>
              <button
                onClick={() => {
                  ContextEngine.clear();
                  setContextLogs(ContextEngine.getLogs());
                }}
                className="text-[10px] text-[#706B67] hover:text-[#281010] underline"
              >
                Clear Logs
              </button>
            </div>

            <div className="space-y-2 text-[11px]">
              {contextLogs.map((entry, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F8F3EC] border border-[#EAE3D9] shadow-2xs">
                  <div className="flex items-center justify-between text-[#706B67] mb-1">
                    <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    <span className="text-[#FA5929] font-bold">{entry.run_id}</span>
                  </div>
                  <div className="text-[#281010] font-bold">{entry.actor}</div>
                  <div className="text-[#706B67] mt-0.5">{entry.action}</div>
                  {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#EAE3D9] text-[10px] text-[#FA5929]">
                      Metadata: {JSON.stringify(entry.metadata)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

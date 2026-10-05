"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { Send, Sparkles } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hi! I'm your autonomous Curriculum AI Architect. What do you want to master or build today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(async (content: string, currentMessages: ChatMessage[]) => {
    if (!content.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content };
    const newMessages = [...currentMessages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const byok = localStorage.getItem("curriculumos_byok");
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (byok) {
        headers['x-byok-key'] = byok;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: "" };
      setMessages(prev => [...prev, aiMsg]);

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\\n');
        
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const content = JSON.parse(line.substring(2));
              aiMsg.content += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...aiMsg };
                return updated;
              });
            } catch (e) {
              // Ignore parse errors on partial chunks
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), role: 'system', content: 'An error occurred while generating the response.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Handle pending prompt from Hero
  useEffect(() => {
    const pendingPrompt = sessionStorage.getItem("pendingPrompt");
    if (pendingPrompt) {
      sessionStorage.removeItem("pendingPrompt");
      sendMessage(pendingPrompt, messages);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input, messages);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background font-sans relative">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6 scroll-smooth z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-3xl px-6 py-4 shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-foreground text-background border-foreground rounded-br-sm' 
                  : msg.role === 'system'
                  ? 'bg-destructive/10 text-destructive border-destructive/20 rounded-bl-sm'
                  : 'bg-white border-border/80 text-foreground rounded-bl-sm'
              }`}>
                <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-border/80 rounded-3xl rounded-bl-sm px-6 py-4 shadow-sm flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <Sparkles size={14} className="text-primary"/> Architecting Curriculum...
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-6 bg-white/70 backdrop-blur-2xl border-t border-border/50 z-20 sticky bottom-0">
        <form 
          onSubmit={handleSubmit}
          className="relative max-w-4xl mx-auto flex items-end gap-3 bg-white border border-border/80 rounded-3xl p-3 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/50 transition-all shadow-sm"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What course do you want to build today?"
            className="flex-1 max-h-48 min-h-[50px] bg-transparent border-none resize-none focus:outline-none focus:ring-0 px-4 py-3 text-[16px] text-foreground placeholder:text-muted-foreground/60"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-12 w-12 rounded-2xl bg-foreground hover:bg-foreground/90 disabled:opacity-50 text-background flex items-center justify-center transition-all shadow-lg flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-4">
          CurriculumOS Architect can occasionally hallucinate. Verify critical claims.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { cn, generateId } from "@/lib/utils";
import type { ChatMessage, Curriculum, LearnerProfile } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Helper to extract learner profile from conversation
function extractProfile(messages: ChatMessage[]): Partial<LearnerProfile> {
  const allText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n")
    .toLowerCase();

  const profile: Partial<LearnerProfile> = {};

  // Extract topic
  const topicPatterns = [
    /(?:learn|study|master)\s+(?:about\s+)?(.+?)(?:\.|$|\n)/i,
    /(?:i want to|i'd like to|i need to)\s+(?:learn|study|understand|master)\s+(?:about\s+)?(.+?)(?:\.|$|\n)/i,
    /topic(?:\s+is)?\s+(.+?)(?:\.|$|\n)/i,
  ];
  for (const p of topicPatterns) {
    const m = p.exec(allText);
    if (m) {
      profile.topic = m[1].trim().replace(/\.$/, "");
      break;
    }
  }
  if (!profile.topic) {
    // Take first substantial message as topic
    const first = messages.find((m) => m.role === "user");
    if (first) profile.topic = first.content.slice(0, 80);
  }

  // Extract level
  if (/\b(beginner|new|start|no experience|novice)\b/i.test(allText))
    profile.current_level = "beginner";
  else if (/\b(expert|advanced|experienced|senior|professional)\b/i.test(allText))
    profile.current_level = "advanced";
  else profile.current_level = "intermediate";

  // Extract time
  const timeMatch = /(\d+)\s*(?:hours|hrs|h)/i.exec(allText);
  profile.available_time_hours = timeMatch ? parseInt(timeMatch[1]) : 20;

  // Extract style
  if (/\b(project.based|hands.on|building|practical)\b/i.test(allText))
    profile.learning_style = "project-based";
  else if (/\b(theory|theoretical|conceptual|understanding|fundamentals)\b/i.test(allText))
    profile.learning_style = "theory-first";
  else profile.learning_style = "balanced";

  // Extract goals
  profile.goals = [];
  const goalMatch = /(?:goals?|want to|objectives?)\s*(?::|are|is)?\s*(.+?)(?:\.|$|\n)/gi;
  let gm: RegExpExecArray | null;
  while ((gm = goalMatch.exec(allText)) !== null) {
    profile.goals.push(gm[1].trim());
  }
  if (profile.goals.length === 0 && profile.topic) {
    profile.goals = [`Master ${profile.topic}`];
  }

  // Extract format preferences
  profile.preferred_formats = [];
  if (/\bvideo/i.test(allText)) profile.preferred_formats.push("video");
  if (/\barticle|reading|book/i.test(allText)) profile.preferred_formats.push("article");
  if (/\bcourse/i.test(allText)) profile.preferred_formats.push("course");
  if (/\bcode|programming|practice|interactive/i.test(allText)) profile.preferred_formats.push("code");

  return profile;
}

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Curriculum Architect. I'll help you build a personalized learning path.\n\nTo get started, tell me: **What do you want to learn?**",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"topic" | "level" | "goals" | "time" | "generate">("topic");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function generateCurriculum(profile: LearnerProfile) {
    setIsLoading(true);

    const genMsg: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: `🔍 Researching **${profile.topic}**...\n📊 Building resource index...\n🧠 Generating your personalized curriculum...`,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, genMsg]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: profile.topic,
          learner_level: profile.current_level,
          learner_goals: profile.goals,
          available_time_hours: profile.available_time_hours,
          learning_style: profile.learning_style,
          preferred_formats: profile.preferred_formats,
        }),
      });

      if (!res.ok) {
        throw new Error(`Backend responded with ${res.status}`);
      }

      const data = await res.json();
      const curriculum: Curriculum = data.curriculum;

      // Replace loading message with result
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: generateId(),
          role: "assistant",
          content: `✅ Here's your personalized curriculum for **${profile.topic}**:`,
          curriculum,
          timestamp: Date.now(),
        };
        return updated;
      });

      setStep("generate");
    } catch (err) {
      const errorMsg =
        "⚠️ Could not reach the backend server. Make sure it's running on port 8000.\n\n" +
        "Start it with:\n```bash\ncd backend && python3 run_server.py\n```";

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: generateId(),
          role: "assistant",
          content: errorMsg,
          timestamp: Date.now(),
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSend(text: string) {
    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Determine next step based on conversation
    const allMsgs = [...messages, userMsg];
    const userCount = allMsgs.filter((m) => m.role === "user").length;

    if (userCount === 1) {
      // First response = topic, now ask about level
      const topic = text.slice(0, 60);
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: `Got it! You want to learn about **${topic}**.\n\nWhat's your current skill level?\n- 🟢 **Beginner** — I'm just starting out\n- 🟡 **Intermediate** — I know the basics\n- 🟠 **Advanced** — I'm comfortable with most concepts\n- 🔴 **Expert** — I want to master the cutting edge`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStep("level");
    } else if (userCount === 2) {
      // Level response, ask for goals
      const level = text.toLowerCase().includes("beginner")
        ? "beginner"
        : text.toLowerCase().includes("advanced") || text.toLowerCase().includes("expert")
          ? "advanced"
          : "intermediate";

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: `Great — I'll tailor your curriculum for a **${level}** learner.\n\nWhat are your specific learning goals? For example:\n- "I want to build web apps with React"\n- "I need to pass the AWS certification"\n- "I want to switch careers into data science"`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStep("goals");
    } else if (userCount === 3) {
      // Goals response, ask about time
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content:
          "Perfect — those are clear goals!\n\nHow much time can you dedicate to this? **How many total hours** do you have available?\n\n(e.g., \"20 hours\", \"40 hours\", \"10 hours\")",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStep("time");
    } else if (userCount === 4) {
      // Time response, now generate
      const timeMatch = text.match(/(\d+)/);
      const hours = timeMatch ? parseInt(timeMatch[1]) : 20;

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: `**${hours} hours** — that's a solid learning window! I'll structure your curriculum to maximize that time.\n\nThen let me also ask one last thing... \n\nHow do you prefer to learn?\n- 🛠️ **Project-based** — build things as you go\n- 📚 **Theory-first** — understand the fundamentals deeply first\n- ⚖️ **Balanced** — mix of theory and hands-on practice`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStep("time"); // One more round for style
    } else {
      // Last user message before generation — extract full profile and generate
      const profile = extractProfile(allMsgs) as LearnerProfile;

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: `Here's what I've gathered:\n\n📋 **Topic:** ${profile.topic}\n📊 **Level:** ${profile.current_level}\n🎯 **Goals:** ${profile.goals.join(", ")}\n⏱️ **Time:** ${profile.available_time_hours} hours\n🎨 **Style:** ${profile.learning_style}\n\nGenerating your personalized curriculum now...`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);

      await generateCurriculum(profile);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">CO</span>
        </div>
        <div>
          <h1 className="font-semibold text-foreground">CurriculumOS</h1>
          <p className="text-xs text-muted-foreground">AI Curriculum Architect</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
            </div>
            <span className="text-sm text-muted-foreground">Generating your curriculum...</span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

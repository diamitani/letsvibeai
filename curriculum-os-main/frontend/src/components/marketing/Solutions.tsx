"use client";

import { Search, MessageSquare, TrendingUp, Shield, Store, Inbox } from "lucide-react";

const solutions = [
  {
    icon: Search,
    title: "Research Automation",
    description: "Discover and evaluate learning resources across the web with 3-tier credibility scoring (academic, editorial, community sources).",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: MessageSquare,
    title: "Smart Curriculum Chat",
    description: "Natural language interface powered by PAL (Prompt Abstraction Layer) — describe what you want to learn, get a structured curriculum instantly.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    title: "Live Resource Insights",
    description: "Real-time taxonomy building with master index generation. See knowledge gaps, cross-references, and prerequisite chains visualized.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Quality Monitor",
    description: "Multi-pass RAG DAL retrieval ensures ≥0.8 confidence threshold across all curriculum resources with automatic gap-filling.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Store,
    title: "Agent Marketplace",
    description: "Extensible ROSTR framework with pluggable agents: Research, Index Builder, Curriculum Generator, Gap Filler — deploy custom learning workflows.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Inbox,
    title: "Curriculum Automation",
    description: "End-to-end pipeline from user intent → researched resources → structured index → personalized lesson plans with zero manual curation.",
    gradient: "from-pink-500 to-rose-500"
  }
];

export function Solutions() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
            Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Everything you need to build{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              intelligent curricula
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Powered by multi-agent orchestration with phase-aware workflow management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
              >
                {/* Gradient accent */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${solution.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {solution.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-6 inline-flex items-center text-sm font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

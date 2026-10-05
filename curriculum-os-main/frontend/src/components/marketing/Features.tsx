"use client";

import { Brain, Wrench, Bot, Database, Rocket } from "lucide-react";
import { useState } from "react";

const features = [
  {
    id: "research",
    icon: Brain,
    title: "Smart Research Agent",
    description: "Web-scale resource discovery with multi-pass retrieval",
    details: [
      "3-tier source credibility (Tier 1: Academic/Official, Tier 2: Editorial, Tier 3: Community)",
      "Multi-pass retrieval with confidence scoring",
      "Automatic deduplication and relevance filtering",
      "Coverage validation ≥0.8 threshold"
    ],
    color: "blue"
  },
  {
    id: "builder",
    icon: Wrench,
    title: "Custom Curriculum Builder",
    description: "Phase-aware orchestration with intelligent routing",
    details: [
      "5D phase taxonomy: PreD → Design → Development → Deployment → Debug",
      "4D priority allocation scoring",
      "Personalized learning paths based on goals and background",
      "Automatic gap detection and content synthesis"
    ],
    color: "purple"
  },
  {
    id: "chatbot",
    icon: Bot,
    title: "Smart Learning Chatbot",
    description: "PAL-compiled natural language interface",
    details: [
      "Intent extraction from conversational input",
      "Context injection from knowledge bases",
      "Semantic enhancement for precise scoping",
      "Real-time progress tracking and recommendations"
    ],
    color: "green"
  },
  {
    id: "insights",
    icon: Database,
    title: "Knowledge Insight Engine",
    description: "Hierarchical taxonomy with cross-reference mapping",
    details: [
      "Master index with topic hierarchies",
      "Cross-reference linking between resources",
      "Prerequisite chain visualization",
      "Coverage validation across all topics"
    ],
    color: "orange"
  },
  {
    id: "deploy",
    icon: Rocket,
    title: "Auto-Deploy Agent",
    description: "One-command deployment with monitoring",
    details: [
      "Single-script deployment (./start.sh)",
      "Vercel-ready frontend + FastAPI backend",
      "Health monitoring endpoints",
      "Simulated mode + LLM-powered mode"
    ],
    color: "pink"
  }
];

const colorClasses: Record<string, { gradient: string; bg: string; text: string }> = {
  blue: { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10", text: "text-blue-600" },
  purple: { gradient: "from-purple-500 to-pink-500", bg: "bg-purple-500/10", text: "text-purple-600" },
  green: { gradient: "from-green-500 to-emerald-500", bg: "bg-green-500/10", text: "text-green-600" },
  orange: { gradient: "from-orange-500 to-red-500", bg: "bg-orange-500/10", text: "text-orange-600" },
  pink: { gradient: "from-pink-500 to-rose-500", bg: "bg-pink-500/10", text: "text-pink-600" }
};

export function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const active = features.find(f => f.id === activeFeature) || features[0];
  const Icon = active.icon;
  const colors = colorClasses[active.color];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-4">
            Core Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Production-grade{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              multi-agent framework
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Built on ROSTR architecture for knowledge compounding and persistent state management
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Feature Tabs */}
            <div className="lg:col-span-2 space-y-3">
              {features.map((feature) => {
                const FeatureIcon = feature.icon;
                const isActive = activeFeature === feature.id;
                const featureColors = colorClasses[feature.color];

                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl scale-105"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${isActive ? "bg-white/10" : featureColors.bg}`}>
                        <FeatureIcon className={`w-5 h-5 ${isActive ? "text-white" : featureColors.text}`} />
                      </div>
                      <div>
                        <h3 className={`font-bold mb-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-sm ${isActive ? "text-slate-300" : "text-slate-600"}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feature Details */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl min-h-[500px]">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colors.gradient} mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  {active.title}
                </h3>

                <p className="text-slate-300 text-lg mb-8">
                  {active.description}
                </p>

                <ul className="space-y-4">
                  {active.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient} flex-shrink-0`} />
                      <span className="text-slate-300 leading-relaxed">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <a
                    href="/docs"
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                  >
                    View documentation →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

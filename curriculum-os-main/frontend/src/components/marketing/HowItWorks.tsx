"use client";

import { MessageSquare, Cog, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Connect Your Learning Goal",
    description: "Use the chat UI to describe what you want to learn in natural language.",
    example: '"I want to learn machine learning with a focus on computer vision, starting from Python basics."',
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    icon: Cog,
    title: "Deploy Research Agents",
    description: "PAL compiles your intent into agent manifests. Research agents discover resources across academic, editorial, and community sources. Index builder creates a master taxonomy with cross-references.",
    details: [
      "Intent extraction & compilation",
      "Multi-tier resource discovery",
      "Hierarchical taxonomy building"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track & Improve",
    description: "Curriculum generator produces personalized lesson plans with adaptive recommendations. Monitor progress, adjust priorities, and let the system fill knowledge gaps automatically.",
    details: [
      "Personalized curriculum generation",
      "Real-time progress tracking",
      "Automatic gap-filling"
    ],
    gradient: "from-green-500 to-emerald-500"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-semibold mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            From intent to curriculum in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              3 simple steps
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Multi-agent orchestration powered by the ROSTR framework
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-20" />

            <div className="grid lg:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={index} className="relative">
                    {/* Card */}
                    <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 h-full">
                      {/* Number Badge */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} text-white font-bold text-xl mb-6 shadow-lg`}>
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${step.gradient} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Example or Details */}
                      {step.example && (
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <div className="text-sm font-mono text-slate-700 italic">
                            {step.example}
                          </div>
                        </div>
                      )}

                      {step.details && (
                        <ul className="space-y-2">
                          {step.details.map((detail, dIndex) => (
                            <li key={dIndex} className="flex items-start gap-2">
                              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`} />
                              <span className="text-sm text-slate-700">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Arrow (desktop only) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-32 -right-4 w-8 h-8">
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-slate-300">
                          <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Try it now →
          </a>
        </div>
      </div>
    </section>
  );
}

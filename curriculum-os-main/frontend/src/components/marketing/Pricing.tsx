"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for individual educators and course creators",
    features: [
      "50 curriculum generations/month",
      "Basic research agent (Tier 2-3 sources)",
      "Standard chat UI",
      "Community support",
      "Simulated mode only",
      "Web resource discovery",
      "Master index builder",
      "Basic curriculum generator",
      "27 test cases included"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Growth",
    price: 79,
    description: "For professional learning platforms and teams",
    features: [
      "500 curriculum generations/month",
      "Full 3-tier research (Academic + Editorial + Community)",
      "Advanced PAL compilation",
      "Priority support",
      "DeepSeek API integration",
      "All Starter features",
      "LLM-powered gap filling",
      "Custom agent deployment",
      "Vercel deployment guide",
      "Multi-pass RAG DAL retrieval",
      "Analytics dashboard"
    ],
    cta: "Upgrade to Growth",
    popular: true
  },
  {
    name: "Pro",
    price: 299,
    description: "Enterprise-grade for institutions and large teams",
    badge: "Save 20%",
    features: [
      "Unlimited curriculum generations",
      "Enterprise-grade ROSTR framework",
      "Custom agent marketplace access",
      "White-label options",
      "Dedicated support + SLA",
      "All Growth features",
      "API access for custom integrations",
      "Multi-org knowledge bases",
      "Team collaboration tools",
      "Custom model selection (Opus/Sonnet/Haiku)",
      "NPAO orchestration dashboard",
      "99.9% uptime SLA",
      "Composio integration (coming soon)"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-semibold mb-4">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose the plan that{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              fits your needs
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 ${
                plan.popular
                  ? "ring-2 ring-blue-600 scale-105 shadow-2xl"
                  : "hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Save Badge */}
              {plan.badge && !plan.popular && (
                <div className="absolute -top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-slate-900">
                      ${plan.price}
                    </span>
                    <span className="text-slate-600">/month</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={plan.cta === "Contact Sales" ? "/contact" : "/signup"}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${
                        plan.popular ? "text-blue-600" : "text-green-600"
                      }`} />
                      <span className="text-slate-700 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4">
            Have questions about pricing?
          </p>
          <Link
            href="#faq"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            View FAQ →
          </Link>
        </div>
      </div>
    </section>
  );
}

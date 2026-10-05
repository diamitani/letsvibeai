import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import Link from "next/link";
import { Search, Brain, BookOpen, Target, ArrowRight } from "lucide-react";

const steps = [
  { num: "1", icon: Search, title: "Tell us what you want to learn", desc: "Describe your topic in plain English — 'I want to learn machine learning', 'Teach me React', 'Help me pass the AWS exam'. Our PAL compiler extracts your true intent." },
  { num: "2", icon: Brain, title: "AI researches the best resources", desc: "Our RAG DAL engine searches across YouTube, Coursera, arXiv, blogs, documentation, and more — ranking every resource by credibility tier and relevance." },
  { num: "3", icon: BookOpen, title: "Get your personalized curriculum", desc: "Modules, lessons, exercises, and milestones — sequenced for your level, tailored to your goals, and optimized for your available time." },
  { num: "4", icon: Target, title: "Learn with confidence", desc: "Track your progress, revisit saved curricula, and let the AI recommend what to learn next. Your learning journey never stops." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-lg text-muted-foreground">From intent to curriculum in four steps.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon size={22} className="text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">{s.num}</span>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Try It Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

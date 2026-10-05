import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import Link from "next/link";
import { Brain, Search, BookOpen, Target, Zap, Shield, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "PAL Intent Compiler", desc: "Natural language input is parsed into structured learning intent — our AI understands what you actually need, not just what you said." },
  { icon: Search, title: "RAG DAL Knowledge Engine", desc: "Three-tier source credibility system searches academic papers, professional courses, and community content — ranked and weighted." },
  { icon: BookOpen, title: "Master Index Builder", desc: "Every resource is classified by difficulty, format, platform, and prerequisites. Organized into a searchable, cross-referenced taxonomy." },
  { icon: Target, title: "Curriculum Generator", desc: "Generates sequenced modules, lessons, exercises, and assessments — personalized to your level, goals, and available time." },
  { icon: Zap, title: "Gap Detection & Filling", desc: "Identifies missing prerequisite knowledge and auto-generates custom bridging content so your learning path never has holes." },
  { icon: Shield, title: "Progress Tracking", desc: "Save curricula, mark lessons complete, track your learning journey, and get recommendations for what to learn next." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Everything you need to learn anything</h1>
          <p className="text-lg text-muted-foreground">Powered by the ROSTR multi-agent framework — four specialized AI agents working together.</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><f.icon size={20} className="text-primary" /></div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">Start Learning <ArrowRight size={18} /></Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

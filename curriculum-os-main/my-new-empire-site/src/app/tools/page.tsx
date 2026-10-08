import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import Link from "next/link";

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Learning Resources & Tools</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Comprehensive directory of AI development tools, learning platforms, accelerators, and educational resources.
          </p>
          
          {/* Tool Categories */}
          <div className="space-y-12">
            {/* AI Development Tools */}
            <div>
              <h2 className="text-2xl font-bold mb-6">AI Development Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Cursor</h3>
                  <p className="text-muted-foreground mb-3">
                    AI-powered code editor with intelligent autocomplete and refactoring suggestions.
                  </p>
                  <Link href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">GitHub Copilot</h3>
                  <p className="text-muted-foreground mb-3">
                    AI pair programmer that helps you write code faster and with fewer errors.
                  </p>
                  <Link href="https://copilot.github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Replit</h3>
                  <p className="text-muted-foreground mb-3">
                    Collaborative online IDE with AI-powered code assistance and deployment.
                  </p>
                  <Link href="https://replit.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Vercel AI SDK</h3>
                  <p className="text-muted-foreground mb-3">
                    Build AI-powered applications with React, Next.js, and other frameworks.
                  </p>
                  <Link href="https://sdk.vercel.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Learning Platforms */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Learning Platforms</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Coursera</h3>
                  <p className="text-muted-foreground mb-3">
                    University-backed courses and specializations in AI, data science, and technology.
                  </p>
                  <Link href="https://coursera.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Udemy</h3>
                  <p className="text-muted-foreground mb-3">
                    Practical, hands-on courses for developers and technology professionals.
                  </p>
                  <Link href="https://udemy.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">edX</h3>
                  <p className="text-muted-foreground mb-3">
                    Academic courses from top universities including Harvard, MIT, and more.
                  </p>
                  <Link href="https://edx.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">fast.ai</h3>
                  <p className="text-muted-foreground mb-3">
                    Practical deep learning courses with a focus on real-world applications.
                  </p>
                  <Link href="https://fast.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Accelerators & Programs */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Accelerators & Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Y Combinator</h3>
                  <p className="text-muted-foreground mb-3">
                    Premier startup accelerator with strong focus on AI and technology companies.
                  </p>
                  <Link href="https://ycombinator.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">AI2 Incubator</h3>
                  <p className="text-muted-foreground mb-3">
                    Allen Institute for AI's incubator program for early-stage AI startups.
                  </p>
                  <Link href="https://allenai.org/incubator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Hugging Face</h3>
                  <p className="text-muted-foreground mb-3">
                    The AI community platform with models, datasets, and collaboration tools.
                  </p>
                  <Link href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Lambda Labs</h3>
                  <p className="text-muted-foreground mb-3">
                    GPU cloud computing and AI research resources for startups and researchers.
                  </p>
                  <Link href="https://lambdalabs.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Visit <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Newsletters & Communities */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Newsletters & Communities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Import AI</h3>
                  <p className="text-muted-foreground mb-3">
                    Jack Clark's weekly newsletter covering the most important AI developments.
                  </p>
                  <Link href="https://jack-clark.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Subscribe <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">AlphaSignal</h3>
                  <p className="text-muted-foreground mb-3">
                    Technical deep-dives on the latest AI research papers and breakthroughs.
                  </p>
                  <Link href="https://alphasignal.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Subscribe <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Last Week in AI</h3>
                  <p className="text-muted-foreground mb-3">
                    Weekly roundup of AI news, research, and industry developments.
                  </p>
                  <Link href="https://lastweekin.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Subscribe <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">AI Breakfast</h3>
                  <p className="text-muted-foreground mb-3">
                    Weekly newsletter covering AI industry news, research, and applications.
                  </p>
                  <Link href="https://aibreakfast.co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    Subscribe <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">Discover More Resources</h2>
            <p className="text-muted-foreground mb-6">
              Our AI-powered recommendation system helps you find the perfect tools and resources for your learning journey.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium transition-colors hover:bg-primary/90">
              Get Personalized Recommendations <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}

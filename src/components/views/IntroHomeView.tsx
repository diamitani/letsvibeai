import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock,
  Layers,
  Terminal,
  Cpu,
  Bot,
  FileCode,
  Hammer,
  Rocket,
  Award,
  BookOpen,
  Zap
} from 'lucide-react';
import { DailyVideoSpotlight } from '../DailyVideoSpotlight';
import { COURSE_MODULES } from '../../data/courseData';

interface IntroHomeViewProps {
  onStartCourse: (moduleId?: number) => void;
  onExploreDirectory: () => void;
}

export const IntroHomeView: React.FC<IntroHomeViewProps> = ({
  onStartCourse,
  onExploreDirectory
}) => {
  const scrollToDailyVideo = () => {
    const el = document.getElementById('daily-video-spotlight');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getModuleIcon = (id: number) => {
    switch (id) {
      case 1: return <Sparkles className="w-4 h-4 text-[#ec4909]" />;
      case 2: return <Cpu className="w-4 h-4 text-[#2F80ED]" />;
      case 3: return <Layers className="w-4 h-4 text-[#34D399]" />;
      case 4: return <Zap className="w-4 h-4 text-[#ec4909]" />;
      case 5: return <Terminal className="w-4 h-4 text-[#2F80ED]" />;
      case 6: return <BookOpen className="w-4 h-4 text-[#34D399]" />;
      case 7: return <Bot className="w-4 h-4 text-[#ec4909]" />;
      case 8: return <FileCode className="w-4 h-4 text-[#2F80ED]" />;
      case 9: return <Hammer className="w-4 h-4 text-[#34D399]" />;
      case 10: return <Rocket className="w-4 h-4 text-[#ec4909]" />;
      case 11: return <Award className="w-4 h-4 text-[#34D399]" />;
      default: return <Sparkles className="w-4 h-4 text-[#2F80ED]" />;
    }
  };

  return (
    <div className="text-left font-sans animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION: Institutional Introduction */}
      <section className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Institutional Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#2F80ED]/20 text-[#071B3A] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2F80ED] animate-pulse" />
            <span className="font-mono text-[11px] text-[#2F80ED] uppercase tracking-wider">LETSVIBEAI INSTITUTION</span>
            <span className="text-[#4a4d4f]/40">·</span>
            <span>Learn. Build. Grow.</span>
          </div>

          {/* Display H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#071B3A] leading-[1.08] font-sans">
            Build Real Software With AI.{' '}
            <span className="font-serif italic font-normal text-[#ec4909]">
              From Typist to Director.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#4a4d4f] leading-relaxed max-w-2xl mx-auto">
            Vibe coding is building production software by describing what you want in plain language and directing AI agents. Master the 11 building blocks with our 100% free, open curriculum.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onStartCourse(1)}
              className="px-7 py-3.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] active:scale-98 text-white font-bold text-sm transition-all shadow-lg shadow-[#ec4909]/25 flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Start Free Course (10 Modules)</span>
              <div className="w-6 h-6 rounded-full bg-white text-[#ec4909] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            <button
              onClick={scrollToDailyVideo}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F4F7FB] border border-[#4a4d4f]/15 text-[#071B3A] font-bold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#2F80ED] fill-[#2F80ED]" />
              <span>Watch Today's Vibe Brief</span>
            </button>
          </div>

          {/* Trust Metric Strip */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#706B67] font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
              <span>100% Free Open Access</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
              <span>10 Mastered Video Lessons</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
              <span>Zero Syntax Memorization</span>
            </span>
          </div>

        </div>
      </section>

      {/* 2. DAILY VIDEO SPOTLIGHT (The Anchor Moment for Social Traffic) */}
      <DailyVideoSpotlight
        onStartCourse={() => onStartCourse(1)}
        onExploreRostr={onExploreDirectory}
      />

      {/* 3. WHAT IS VIBE CODING & THE TWO INVARIABLE LAWS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4909]/10 text-[#ec4909] text-xs font-bold font-mono">
              <span>PHILOSOPHY & FOUNDATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071B3A] tracking-tight font-sans">
              What is Vibe Coding?
            </h2>
            <p className="text-sm sm:text-base text-[#4a4d4f] leading-relaxed">
              The term was coined by AI researcher Andrej Karpathy in February 2025: <em className="text-[#071B3A] font-semibold">&ldquo;You vibe with your ideas; the agent does the typing.&rdquo;</em> Traditional coding requires translating concepts line by line into programming syntax. In vibe coding, you describe the idea, the AI writes the code, and your job shifts from <strong>typist</strong> to <strong>film director</strong>.
            </p>
          </div>

          {/* Two Invariable Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Principle 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#ec4909]/10 border border-[#ec4909]/20 flex items-center justify-center text-[#ec4909] font-black font-mono">
                01
              </div>
              <h3 className="text-xl font-black text-[#071B3A] tracking-tight">
                Principle 1: Direction Beats Guessing
              </h3>
              <p className="text-xs sm:text-sm text-[#4a4d4f] leading-relaxed">
                AI models are pattern completion engines. When your request is vague (&ldquo;Make a login page&rdquo;), it fills gaps with plausible guesses (hallucinations). When you give concrete architectural direction (provider, redirect paths, error handling), it builds flawlessly.
              </p>

              <div className="pt-2 space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-rose-50 text-rose-900 border border-rose-200">
                  <span className="font-bold block mb-0.5">✕ Vague (Invites Hallucination):</span>
                  <span>&ldquo;Make me a login page and add Stripe payments.&rdquo;</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                  <span className="font-bold block mb-0.5">✓ Directed (Guarantees Success):</span>
                  <span>&ldquo;Build sign-in using Supabase Auth with Google OAuth. Add Stripe Checkout at $29/mo, updating user entitlement via verified webhook.&rdquo;</span>
                </div>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="p-8 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#2F80ED]/10 border border-[#2F80ED]/20 flex items-center justify-center text-[#2F80ED] font-black font-mono">
                02
              </div>
              <h3 className="text-xl font-black text-[#071B3A] tracking-tight">
                Principle 2: Every App Has An Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[#4a4d4f] leading-relaxed">
                A house needs a foundation, framing, plumbing, and electrical before painting walls. An app needs front end, auth, database, and backend APIs before UI polish. If you skip the foundation, the AI will build rooms that collapse.
              </p>

              <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-[#2F80ED]/20 space-y-2 text-xs">
                <span className="font-bold text-[#071B3A] block">The 5-Step Vibe Coding Method:</span>
                <ol className="space-y-1 text-[#4a4d4f]">
                  <li><strong>1. Describe</strong> your idea in plain English.</li>
                  <li><strong>2. Document</strong> with 11 planning docs (PRD, Specs, SDLC).</li>
                  <li><strong>3. Architect</strong> into 11 building blocks.</li>
                  <li><strong>4. Build</strong> page-by-page with an agent harness.</li>
                  <li><strong>5. Check</strong> against checklists, then ship.</li>
                </ol>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. THE 10 FOUNDATIONAL MODULES (Bento Syllabus Preview) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34D399]/15 text-[#071B3A] text-xs font-bold font-mono mb-2">
                <span>FOUNDATIONAL SYLLABUS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#071B3A] tracking-tight font-sans">
                The 10-Module Free Curriculum
              </h2>
              <p className="text-xs sm:text-sm text-[#4a4d4f] mt-1 max-w-xl">
                Every module includes a mastered video lesson, core analogy, production copy-prompt, hands-on exercise, and self-check quiz.
              </p>
            </div>

            <button
              onClick={() => onStartCourse(1)}
              className="px-5 py-2.5 rounded-full bg-[#071B3A] hover:bg-[#10213F] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto shrink-0"
            >
              <span>Open Course Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Module Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSE_MODULES.map((module) => (
              <div
                key={module.id}
                onClick={() => onStartCourse(module.id)}
                className="p-6 rounded-3xl bg-white border border-[#4a4d4f]/10 shadow-xs flex flex-col justify-between hover:border-[#2F80ED]/40 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F4F7FB] text-[#071B3A] border border-[#4a4d4f]/10 flex items-center gap-1.5">
                      {getModuleIcon(module.id)}
                      <span>MODULE {module.id < 10 ? `0${module.id}` : module.id}</span>
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#706B67]">
                      <Clock className="w-3 h-3 text-[#34D399]" />
                      <span>{module.estimatedHours}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#071B3A] tracking-tight leading-snug group-hover:text-[#2F80ED] transition-colors">
                    {module.title}
                  </h3>

                  <p className="text-xs text-[#4a4d4f] leading-relaxed line-clamp-2">
                    {module.tagline}
                  </p>

                  <div className="p-3 rounded-xl bg-[#F4F7FB] text-[11px] text-[#4a4d4f] space-y-1">
                    <span className="font-bold text-[#071B3A] block">Deliverable:</span>
                    <p className="line-clamp-2">{module.deliverable}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2F80ED] group-hover:translate-x-1 transition-transform">
                  <span>Start Module {module.id}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ABOUT THE INSTITUTION & PATRICK DIAMITANI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl sm:rounded-[36px] bg-[#071B3A] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#34D399] text-xs font-mono font-bold">
              <span>LETSVIBEAI INSTITUTION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              The AI Skills Institution For Work and Life.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded by Patrick Diamitani, LetsVibeAI turns AI from an intimidating technical obstacle into practical, actionable capability. Whether you are a creator, founder, career changer, or operator, we teach you how to direct agents with confidence and ship real projects that endure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div>
                <span className="text-2xl font-black text-white font-sans">100% Free</span>
                <p className="text-xs text-slate-400 mt-0.5">Foundational education open to all</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#34D399] font-sans">Production</span>
                <p className="text-xs text-slate-400 mt-0.5">Real code, real databases, real Stripe</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#2F80ED] font-sans">Director Mindset</span>
                <p className="text-xs text-slate-400 mt-0.5">Direction beats guessing every time</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onStartCourse(1)}
                className="px-7 py-3.5 rounded-full bg-[#ec4909] hover:bg-[#d43f05] text-white font-bold text-sm transition-all shadow-lg shadow-[#ec4909]/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Begin Module 1 (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDirectory}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-all border border-white/20 cursor-pointer"
              >
                <span>Browse Ecosystem ROSTR</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

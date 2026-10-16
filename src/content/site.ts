// ─────────────────────────────────────────────────────────────
// LetsVibeAI — site content
// Change copy, prices, links and FAQs here. Pages read from this file.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'LetsVibeAI',
  descriptor: 'The AI Skills Institution',
  promise: 'Learn AI. Build with AI. Grow with AI.',
  description:
    'LetsVibeAI teaches people how to use AI confidently in their jobs and lives — then turns learning into real projects, workshops and workforce outcomes.',
  email: 'hello@letsvibeai.com',
  location: 'Chicago, IL',
  // Optional: set VITE_CONTACT_ENDPOINT (e.g. a Formspree URL) in Vercel to
  // receive form submissions. Without it, the form opens the visitor's email app.
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '',
  // Countdown on the "Ways to learn" section. Set to '' to hide it.
  offerDeadline: '2026-10-31T23:59:59-05:00',
  offerDeadlineLabel: 'Founding pricing ends in',
  socials: [
    { kind: 'linkedin', href: 'https://www.linkedin.com/in/diamitani', label: 'LinkedIn' },
    { kind: 'github', href: 'https://github.com/diamitani/letsvibeai', label: 'GitHub' },
  ],
};

export const nav = [
  { label: 'Courses', href: '/courses' },
  { label: 'Toolkit', href: '/toolkit' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export const primaryCta = { label: 'Start Free', href: '/courses/claude-mastery' };
export const meetingCta = { label: 'Book a Build Call', href: '/contact' };

// "Ways to learn" — paid offers. Edit prices any time.
export const offers = [
  {
    badge: 'Popular',
    badgeIcon: 'crown',
    title: 'Live Build Nights',
    description: 'Build alongside other beginners in a guided, hands-on session — in Chicago or online.',
    price: '$49',
    per: '/ Session',
    href: '/contact?topic=Live%20Build%20Night',
    art: 'laptop',
  },
  {
    badge: 'New',
    badgeIcon: 'zap',
    title: '1:1 AI Build Coaching',
    description: 'Bring your idea. Leave with a working tool, a clear plan and the prompts to keep going.',
    price: '$149',
    per: '/ Hour',
    href: '/contact?topic=1%3A1%20Coaching',
    art: 'spark',
  },
  {
    badge: 'Teams',
    badgeIcon: 'users',
    title: 'Team & Workforce Workshops',
    description: 'A half-day workshop that gets your sales, marketing, ops or public-service team building with AI.',
    price: '$1,500',
    per: '/ Workshop',
    href: '/contact?topic=Team%20Workshop',
    art: 'building',
  },
];

export const features = [
  {
    icon: 'hammer',
    title: 'Learn by Building',
    body: 'Every module ends with something real — a spec, a working tool, an automation or a live web app you can share.',
  },
  {
    icon: 'message',
    title: 'Plain-English Lessons',
    body: "Clear before clever. Analogies, checklists and diagrams — no computer-science degree required.",
  },
  {
    icon: 'layers',
    title: 'Architecture-First Method',
    body: 'Learn how software fits together so you can direct AI agents precisely — and ship apps that hold up.',
  },
];

export const guides = [
  {
    name: 'Pat Diamitani',
    role: 'Founder & Lead Instructor',
    bio: 'Learned AI from YouTube. Now leads GTM AI & automation at a 500+ person company and has built 150+ custom GPTs.',
    image: '/images/pat.png',
    initials: 'PD',
    links: [
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/diamitani', label: 'Pat on LinkedIn' },
      { kind: 'github', href: 'https://github.com/diamitani', label: 'Pat on GitHub' },
    ],
  },
  {
    name: 'Sebastian Mertens',
    role: 'Guest Expert · Make.com',
    bio: 'Head of Applied AI at Make.com. Featured on LiveBuildAI, sharing how real teams put AI automation to work.',
    image: '/images/guide-sebastian.jpg',
    initials: 'SM',
    links: [{ kind: 'web', href: 'https://www.make.com', label: 'Make.com' }],
  },
  {
    name: 'Your Seat Is Open',
    role: 'Guest Instructor',
    bio: 'Built something great with AI? Teach a Build Night and share it with the community.',
    image: '',
    initials: '+',
    links: [{ kind: 'mail', href: 'mailto:hello@letsvibeai.com?subject=Guest%20instructor', label: 'Email us' }],
  },
];

// Carousel of real projects from the courses (no invented testimonials)
export const builds = [
  {
    image: '/images/build-portfolio.jpg',
    tag: 'Vibe Coding · Module 1',
    title: 'A crystal-clear app spec',
    body: 'Turn a messy idea into a one-paragraph specification an AI agent can actually build from.',
    tools: ['Claude', 'ChatGPT'],
  },
  {
    image: '/images/build-gpt.jpg',
    tag: 'Zero to Ship · Day 3',
    title: 'Your own AI Content Writer',
    body: 'Design, test and publish a custom GPT that writes in your voice — without a line of code.',
    tools: ['ChatGPT', 'Chain Prompting'],
  },
  {
    image: '/images/build-automation.jpg',
    tag: 'Zero to Ship · Day 5',
    title: 'An AI news digest that runs itself',
    body: 'Pull articles from RSS, summarize them with AI and drop a clean digest in your inbox every morning.',
    tools: ['Make.com', 'OpenAI'],
  },
  {
    image: '/images/build-assistant.jpg',
    tag: 'Claude Mastery · Lesson 2',
    title: 'A CLAUDE.md that remembers for you',
    body: 'Write your stack, rules and checks once — and every agent session starts informed.',
    tools: ['Claude Code', 'Markdown'],
  },
  {
    image: '/images/build-monitor.jpg',
    tag: 'Claude Mastery · Lesson 7',
    title: 'A team of agents: plan, build, ship',
    body: 'Delegate to a researcher, a builder and a reviewer — then verify with tests before you ship.',
    tools: ['Subagents', 'Git'],
  },
  {
    image: '/images/build-portfolio.jpg',
    tag: 'Project Labs · Lab 2',
    title: 'An e-commerce store',
    body: 'Catalog, cart, checkout and sign-in — built and deployed with hosted AI builders.',
    tools: ['Lovable', 'Stripe'],
  },
  {
    image: '/images/build-outreach.jpg',
    tag: 'GTM Automation Labs',
    title: 'A personalized outreach engine',
    body: 'Research every prospect with AI and write emails that sound like you did the homework.',
    tools: ['Perplexity', 'Make.com'],
  },
];

export const faqs = [
  {
    q: 'Do I need to know how to code?',
    a: "No. Every course is written for people who've never coded. You learn how software fits together and how to tell AI exactly what to build — the AI writes the code.",
  },
  {
    q: 'Are the courses really free?',
    a: 'Yes. Every lesson on this site is free to read and follow. Live Build Nights, 1:1 coaching, cohorts and team workshops are paid — for when you want a guide in the room.',
  },
  {
    q: 'What tools do I need?',
    a: 'A laptop and a web browser. Most lessons use free tiers of tools like Claude, ChatGPT, Make.com, Lovable and Vercel. We call out anything paid before you start.',
  },
  {
    q: 'How long until I build something real?',
    a: 'Your first deliverable comes at the end of Module 1. Most learners ship their first live project within two weeks of steady practice.',
  },
  {
    q: 'Can you train my team or program?',
    a: 'Yes. Our workshops scale from a single team to workforce and community programs. Tell us about your group and we will put together a plan.',
  },
];

export const principles = [
  { icon: 'heart', title: "Teach, Don't Intimidate", body: 'AI is a skill, not a gatekeeper. We start where you are and skip the fear-based hype.' },
  { icon: 'route', title: 'Show the Path', body: 'Clear modules, checklists and next steps — you always know what to do next.' },
  { icon: 'users', title: 'People Before Technology', body: 'Tools change every month. Judgment, clarity and good process last.' },
];

export const processSteps = [
  { title: 'Describe', body: 'Put your idea into plain words: who it is for, the problem, and what success looks like.' },
  { title: 'Document & Architect', body: 'Turn the idea into a planning stack and the 11 building blocks every app needs.' },
  { title: 'Build With AI', body: 'Direct AI agents page by page, with copy-paste prompts and clear definitions of done.' },
  { title: 'Check & Ship', body: 'Run the pre-launch checklist, deploy to a live URL and share what you built.' },
];

export const plans = [
  {
    name: 'Free Learner',
    tagline: 'Every course, at your own pace.',
    price: '$0',
    per: '/ Forever',
    featured: false,
    badge: '',
    features: [
      'All 5 courses and every lesson',
      'Knowledge checks with instant feedback',
      'The full Toolkit: 11 blocks, 11 docs, prompt library',
      'Progress saved in your browser',
    ],
    cta: 'Start Learning',
    href: '/courses/claude-mastery',
  },
  {
    name: 'Live Cohort',
    tagline: 'Six weeks of building with a guide and a group.',
    price: '$499',
    per: '/ Cohort',
    featured: true,
    badge: 'Limited seats',
    features: [
      'Everything in Free Learner',
      'Weekly live build & architecture reviews',
      'Capstone feedback and certificate of completion',
      'Small group of fellow builders',
      'Office hours with the instructor',
    ],
    cta: 'Reserve a Seat',
    href: '/contact?topic=Live%20Cohort',
  },
  {
    name: 'Teams & Programs',
    tagline: 'For companies, schools and workforce programs.',
    price: 'Custom',
    per: '',
    featured: false,
    badge: '',
    features: [
      'Workshops tailored to your team’s real work',
      'Role-based learning paths',
      'Capstone projects on your own use cases',
      'Progress reporting for program leads',
    ],
    cta: 'Talk to Us',
    href: '/contact?topic=Teams%20%26%20Programs',
  },
];

// "8 Core Practices" — each links to the lesson that teaches it
export const practices = [
  { n: '01', title: 'Start in a project', body: 'Never work in a bare chat. Give every workstream its own rules and tracked files.', to: 'setup-pick-harness' },
  { n: '02', title: 'Write context once', body: 'A tight rules file in the repo beats re-explaining your stack in every prompt.', to: 'context-files' },
  { n: '03', title: 'Plan before you build', body: 'Ask for a plan, correct it, then execute. Planning is far cheaper than fixing bad code.', to: 'prompts-production' },
  { n: '04', title: 'Package repeat work', body: 'Done a process three times? Turn it into a skill so it runs the same way every time.', to: 'skills-package-expertise' },
  { n: '05', title: "Connect, don't paste", body: 'Use MCP for live data and grant the least access that works.', to: 'connectors-mcp' },
  { n: '06', title: 'Keep context clean', body: 'Reset between tasks and hand research to subagents so your main thread stays sharp.', to: 'agents-subagents' },
  { n: '07', title: 'Verify automatically', body: 'Tests, hooks and checks catch mistakes before they reach production.', to: 'commands-workflows' },
  { n: '08', title: 'Review before you ship', body: 'The agent drafts. You own accuracy, tone, security and customer data.', to: 'governance-teams' },
];

// ─────────────────────────────────────────────────────────────
// Course catalog. Lesson text lives in src/content/courses/<slug>/*.md
// and is ordered by the number prefix (01-, 02-, …).
// ─────────────────────────────────────────────────────────────

export interface Course {
  slug: string;
  title: string;
  heroTitle: string;
  summary: string;
  image: string;
  level: 'Beginner' | 'Intermediate';
  duration: string;
  unit: string; // what a lesson is called: Module, Day, Lab
  featured: boolean;
  intro: { heading: string; body: string };
  approach: string[];
  helpsWith: string[];
  benefits: string[];
  whoFor: string;
  closing: string;
}

export const courses: Course[] = [
  {
    slug: 'vibe-coding',
    title: 'Vibe Coding: Idea to Shipped App',
    heroTitle: 'Vibe Coding: Idea to Shipped App',
    summary: 'The architecture-first course: learn how apps fit together, direct AI agents precisely and ship a real product.',
    image: '/images/course-foundations.jpg',
    level: 'Beginner',
    duration: '~25 hours',
    unit: 'Module',
    featured: true,
    intro: {
      heading: "You Don't Need to Learn to Code — You Need to Learn How Software Fits Together",
      body: 'Traditional courses teach syntax. This one teaches you to be the film director, not the camera operator: describe the system, give AI the architecture, and review what it builds. Ten modules take you from your first idea to a deployed, revenue-ready web app.',
    },
    approach: [
      'Plain-English lessons with a real-world analogy for every idea.',
      'A copy-paste prompt in every module that produces a real document.',
      'A hands-on exercise and a 3-question knowledge check per module.',
      'The 11 building blocks and 11-document planning stack as your map.',
      'A capstone project graded on a clear 100-point rubric.',
    ],
    helpsWith: [
      'Turning a vague idea into a buildable spec.',
      'Understanding front end, back end, auth, data and payments.',
      'Choosing tools and talking to AI agents with precision.',
      'Shipping safely with a pre-launch checklist.',
    ],
    benefits: [
      'Fewer "the AI broke it" moments — direction beats guessing.',
      'A full planning stack you can reuse on every future project.',
      'A deployed capstone app and a public GitHub repo.',
      'The vocabulary to work with developers, vendors and agents.',
    ],
    whoFor: 'Founders, operators, marketers, creators, educators and career changers who want to build real software with AI — without a computer-science background.',
    closing: 'Every app has an architecture. Learn it once and every AI tool gets easier. Start Module 1 today — it is free.',
  },
  {
    slug: 'zero-to-ship',
    title: 'Build with AI: Zero to Ship',
    heroTitle: 'Zero to Ship in 10 Days',
    summary: 'Ten short daily lessons: a custom GPT, two automations, an AI assistant and a live portfolio site.',
    image: '/images/course-zero-to-ship.jpg',
    level: 'Beginner',
    duration: '~3.5 hours',
    unit: 'Day',
    featured: true,
    intro: {
      heading: 'Your First Real AI Builds, One Day at a Time',
      body: 'Zero to Ship is a 10-day sprint where every lesson builds on the last. You start with a custom GPT and finish with your own AI portfolio site live on the internet — all with no-code tools and the Chain Prompting method.',
    },
    approach: [
      'Short daily lessons you can finish in 15–25 minutes.',
      'Chain Prompting: big builds broken into small, simple prompts.',
      'Project-based — almost every day produces something you can use.',
      'Real tools: ChatGPT, Make.com, the Assistants API, v0 and Vercel.',
    ],
    helpsWith: [
      'Building and publishing your first custom GPT.',
      'Automating repetitive work with Make.com.',
      'Designing a production-ready AI assistant.',
      'Turning an idea into a live web page.',
    ],
    benefits: [
      'Confidence using AI for real work, not just chat.',
      'A small portfolio of working projects in ten days.',
      'A repeatable method for any future build.',
    ],
    whoFor: 'Anyone curious — or a little intimidated — by AI who wants quick, practical wins before going deeper.',
    closing: 'Ten days from now you can be the person on your team who builds with AI. Start Day 1 today.',
  },
  {
    slug: 'project-labs',
    title: 'Vibe Coding Project Labs',
    heroTitle: 'Three Hands-On Project Labs',
    summary: 'Build and deploy a marketing site, an e-commerce store and a directory marketplace — portfolio-ready.',
    image: '/images/course-project-labs.jpg',
    level: 'Intermediate',
    duration: '~17 hours',
    unit: 'Lab',
    featured: true,
    intro: {
      heading: 'Turn What You Know Into Shipped Products',
      body: 'Each lab is a complete build with steps, stretch goals and assessment criteria. You finish each one with a live URL you can show clients, employers or investors.',
    },
    approach: [
      'Step-by-step build plans with time estimates.',
      'Hosted builders like Lovable, v0 and Bolt.',
      'Stretch goals for when you want more.',
      'Clear criteria so you know when it is done.',
    ],
    helpsWith: [
      'Scaffolding multi-page sites from a single prompt.',
      'Adding carts, checkout and authentication.',
      'Designing a database and a search experience.',
    ],
    benefits: [
      'Three portfolio projects you can demo.',
      'Experience with real-world app features.',
      'Confidence to take on client or side-project work.',
    ],
    whoFor: 'Learners who have finished Vibe Coding or Zero to Ship and want bigger, more realistic projects.',
    closing: 'The best way to learn is to ship. Pick a lab and start building.',
  },
  {
    slug: 'gtm-automation',
    title: 'GTM Automation Labs',
    heroTitle: 'AI Automation for Sales & Marketing',
    summary: 'Build the email, LinkedIn and outreach automations that go-to-market teams actually use.',
    image: '/images/course-gtm-automation.jpg',
    level: 'Intermediate',
    duration: '~6 hours',
    unit: 'Lab',
    featured: false,
    intro: {
      heading: 'Put AI to Work on Pipeline',
      body: 'GTM engineering is building AI and automation for sales and marketing. These labs walk you through systems used by modern revenue teams — built with Make.com, Google Sheets and AI.',
    },
    approach: [
      'Real workflows from a working GTM team.',
      'Deliverability best practices built in.',
      'Review steps so nothing goes out unchecked.',
    ],
    helpsWith: [
      'Automated email outreach pipelines.',
      'AI-assisted LinkedIn content calendars.',
      'Research-driven personalized cold email.',
    ],
    benefits: [
      'Hours saved every week on manual outreach.',
      'More personal messages at higher volume.',
      'A skill set companies are hiring for now.',
    ],
    whoFor: 'Sales reps, marketers, founders and RevOps teams who want to automate prospecting and content.',
    closing: 'Automate the busywork and spend your time on conversations that close.',
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

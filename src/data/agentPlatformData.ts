import { AgentPlatformSkill, AgentSubAgent, AgentMemoryRecord, AgentRunRecord } from '../types';

export const AGENT_CATEGORIES = {
  form:    { name: 'Formation & Finance', color: '#FA5929', bg: 'bg-[#FBE1CE]', text: 'text-[#FA5929]', border: 'border-[#FCAA91]/60' },
  pub:     { name: 'Publishing & Rights', color: '#7C5CFC', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  dist:    { name: 'Distribution & Royalties', color: '#20C7D9', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  brand:   { name: 'Brand & Identity', color: '#FA5929', bg: 'bg-[#FBE1CE]', text: 'text-[#FA5929]', border: 'border-[#FCAA91]/60' },
  content: { name: 'Content & Social', color: '#FA5929', bg: 'bg-[#FBE1CE]', text: 'text-[#FA5929]', border: 'border-[#FCAA91]/60' },
  merch:   { name: 'Merch & Product', color: '#FA5929', bg: 'bg-[#FBE1CE]', text: 'text-[#FA5929]', border: 'border-[#FCAA91]/60' },
  strat:   { name: 'Strategy', color: '#281010', bg: 'bg-[#EDE7DE]', text: 'text-[#281010]', border: 'border-[#EAE3D9]' },
  build:   { name: 'Agent Builder', color: '#FA5929', bg: 'bg-[#FBE1CE]', text: 'text-[#FA5929]', border: 'border-[#FCAA91]/60' }
};

export const AGENT_SKILLS: AgentPlatformSkill[] = [
  {
    id: 'get-ein',
    name: 'Get an E.I.N.',
    cat: 'form',
    modes: ['s', 'k'],
    servicePrice: 99,
    credits: 40,
    runtime: '2–5 business days',
    summary: 'Apply for the federal Employer Identification Number that every business needs before banking, publishing, or payroll.',
    inputs: ['Legal name and address', 'Entity type and formation date', 'Responsible party SSN or ITIN'],
    outputs: ['EIN confirmation letter (CP 575)', 'EIN stored in the business vault', 'Bank-ready entity summary'],
    steps: ['Confirm entity type and eligibility', 'Prepare and review Form SS-4', 'File with the IRS and capture the notice', 'File the EIN to memory for every other skill'],
    tools: ['IRS SS-4 channel', 'Document vault', 'Identity verification']
  },
  {
    id: 'create-llc',
    name: 'Create an LLC',
    cat: 'form',
    modes: ['s'],
    servicePrice: 299,
    credits: 0,
    runtime: '5–10 business days',
    summary: 'Form the LLC that holds your masters, software IP, publishing income, and expenses with an operating agreement.',
    inputs: ['State of formation', 'Member list and ownership split', 'Registered agent preference'],
    outputs: ['Articles of Organization', 'Operating agreement, signed', 'State filing receipt'],
    steps: ['Name availability and trademark check', 'File articles with the state', 'Draft and e-sign operating agreement', 'Appoint registered agent and calendar annual report'],
    tools: ['State registry filings', 'E-signature', 'Registered agent network']
  },
  {
    id: 'create-ccorp',
    name: 'Create a C-Corp',
    cat: 'form',
    modes: ['s'],
    servicePrice: 499,
    credits: 0,
    runtime: '7–14 business days',
    summary: 'Incorporate when you are raising venture money or issuing equity to collaborators, partners, or founding team.',
    inputs: ['State of incorporation', 'Share structure and founders', 'Vesting preferences'],
    outputs: ['Certificate of Incorporation', 'Bylaws and stock ledger', '83(b) election checklist'],
    steps: ['Confirm C-Corp vehicle match', 'File certificate of incorporation', 'Issue founder shares and ledger', 'Prepare 83(b) filings and board consents'],
    tools: ['State registry filings', 'Cap table ledger', 'E-signature']
  },
  {
    id: 'bank-account',
    name: 'Open Business Bank Account',
    cat: 'form',
    modes: ['s', 'k'],
    servicePrice: 0,
    credits: 15,
    runtime: '1–2 business days',
    summary: 'Open the account that separates business income from personal money, wired to your bookkeeping from day one.',
    inputs: ['EIN letter and formation docs', 'Photo ID', 'Preferred banking partner'],
    outputs: ['Funded business account', 'Routing details in the vault', 'Bookkeeping feed connected'],
    steps: ['Match you to a partner bank', 'Submit KYB with entity documents', 'Verify and fund the account', 'Connect transaction feed to expenses'],
    tools: ['Partner bank APIs', 'KYB verification', 'Bookkeeping ledger']
  },
  {
    id: 'file-taxes',
    name: 'File Business Taxes',
    cat: 'form',
    modes: ['s'],
    servicePrice: 349,
    credits: 0,
    runtime: 'Seasonal, 5 days',
    summary: 'Close the year out: reconcile income across DSPs, Stripe, App Stores, and merch, then file the business return.',
    inputs: ['EIN and prior-year return', 'Stripe, DSP, and merch statements', 'Expense ledger and 1099s'],
    outputs: ['Filed federal and state return', 'Schedule C or Form 1120 copy', 'Filing receipt and confirmation'],
    steps: ['Reconcile all income sources', 'Classify deductions and write-offs', 'Prepare return for review', 'File and archive confirmation'],
    tools: ['Bookkeeping ledger', '1099 aggregation', 'E-file channel']
  },
  {
    id: 'manage-expenses',
    name: 'Manage Business Expenses',
    cat: 'form',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 25,
    runtime: 'Continuous',
    summary: 'Every transaction categorized against chart of accounts, with receipts matched and a monthly P&L generated.',
    inputs: ['Bank or card feed', 'Receipt uploads', 'Category preferences'],
    outputs: ['Categorized ledger', 'Monthly profit and loss', 'Deduction-ready expense report'],
    steps: ['Ingest and dedupe transactions', 'Categorize against chart of accounts', 'Match receipts and flag gaps', 'Publish monthly P&L'],
    tools: ['Bank feed', 'Receipt OCR', 'Ledger export']
  },
  {
    id: 'split-sheet',
    name: 'Create Split Sheet Agreement',
    cat: 'form',
    modes: ['s', 'k', 'p'],
    servicePrice: 29,
    credits: 15,
    runtime: 'Same day',
    summary: 'Lock ownership on a collaborative session before anyone leaves the room — writers, producers, developers, percentages.',
    inputs: ['Project/Track title and date', 'Contributors, roles and affiliations', 'Agreed percentages'],
    outputs: ['Signed split sheet PDF', 'Splits written to catalogue', 'Signature audit trail'],
    steps: ['Collect contributor and affiliation details', 'Validate splits total 100.00%', 'Generate agreement for signature', 'File to vault and notify all parties'],
    tools: ['E-signature', 'Catalogue database', 'PRO lookup']
  },

  // Publishing & Rights
  {
    id: 'pro-register',
    name: 'Register With a P.R.O.',
    cat: 'pub',
    modes: ['s'],
    servicePrice: 75,
    credits: 0,
    runtime: '3–10 business days',
    summary: 'Affiliate as both writer and publisher so performance royalties have somewhere legitimate to land.',
    inputs: ['Legal name and EIN or SSN', 'Publisher entity name', 'Catalogue overview'],
    outputs: ['Writer and publisher accounts', 'IPI/CAE numbers', 'Affiliation confirmation'],
    steps: ['Recommend ASCAP, BMI, or SESAC', 'Reserve unique publisher name', 'Submit both affiliations', 'Store IPI numbers for registrations'],
    tools: ['PRO portals', 'Publisher name search', 'Document vault']
  },
  {
    id: 'pro-register-tracks',
    name: 'Register Works With a P.R.O.',
    cat: 'pub',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 30,
    runtime: '1–2 days per batch',
    summary: 'Register works so every spin, stream, sync, and public performance pays out to the right creators.',
    inputs: ['Track/Work metadata and ISRCs', 'Writer splits and IPI numbers', 'Publisher information'],
    outputs: ['Work registrations with confirmations', 'ISWC codes', 'Registration log in catalogue'],
    steps: ['Pull metadata and splits from catalogue', 'Validate writer shares against split sheets', 'Submit work registrations in batch', 'Reconcile confirmations and ISWCs'],
    tools: ['PRO portals', 'Catalogue database', 'Split sheet records']
  },
  {
    id: 'pro-claim-tracks',
    name: 'Claim Tracks With a P.R.O.',
    cat: 'pub',
    modes: ['s', 'k'],
    servicePrice: 0,
    credits: 45,
    runtime: '2–6 weeks',
    summary: 'Find royalties already sitting unclaimed against your name and file legal claims to recover them.',
    inputs: ['Discography and aliases', 'PRO account access', 'Known collaborators'],
    outputs: ['Filed claims per work', 'Dispute and correspondence log', 'Recovered royalty estimate'],
    steps: ['Search unclaimed and unmatched works', 'Match against catalogue and aliases', 'File claims with proof of authorship', 'Track disputes through resolution'],
    tools: ['PRO claim portals', 'MLC lookup', 'Catalogue database']
  },
  {
    id: 'extract-metadata',
    name: 'Extract Metadata From Audio',
    cat: 'pub',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 10,
    runtime: 'Under 2 minutes',
    summary: 'Analyze audio waveforms, extract embedded ID3/BWF tags, and generate clean compliant metadata sheets.',
    inputs: ['Audio file (WAV, AIFF, MP3)', 'Known credits'],
    outputs: ['Full metadata sheet', 'Embedded ID3 and BWF tags', 'Flags for missing required fields'],
    steps: ['Analyze audio for BPM, key, duration, loudness', 'Read embedded tags and existing ISRC', 'Fill gaps from catalogue and credits', 'Write clean tags back to the file'],
    tools: ['Audio analysis', 'Tag writer', 'Catalogue database']
  },
  {
    id: 'upload-catalogue',
    name: 'Upload to Master Catalogue',
    cat: 'pub',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 5,
    runtime: 'Instant',
    summary: 'The single source of truth every other agent skill reads from: masters, versions, splits, rights, and delivery logs.',
    inputs: ['Audio file and artwork', 'Title, version, and credits', 'Rights and splits'],
    outputs: ['Catalogue entry with asset stored', 'Rights map for the work', 'Version history'],
    steps: ['Store master and derivatives in S3/Supabase', 'Attach metadata and credits', 'Link splits and rights holders', 'Index for distribution and registration'],
    tools: ['Asset storage', 'Catalogue database', 'Rights map']
  },

  // Distribution & Royalties
  {
    id: 'setup-dsp',
    name: 'Set Up DSP & Store Profiles',
    cat: 'dist',
    modes: ['s', 'k'],
    servicePrice: 0,
    credits: 20,
    runtime: '2–4 business days',
    summary: 'Claim and verify artist and publisher profiles that streaming platforms and digital stores treat as your storefront.',
    inputs: ['Distributor account or preference', 'Brand imagery and bio', 'Existing profile links'],
    outputs: ['Verified Spotify, Apple, and Tidal profiles', 'Distributor account connected', 'Profile styling checklist'],
    steps: ['Select or connect distributor', 'Claim profiles across DSPs', 'Submit verification and imagery', 'Set up analytics access'],
    tools: ['Distributor API', 'Spotify for Artists', 'Apple Music for Artists']
  },
  {
    id: 'release-dsp',
    name: 'Release Music / Apps on DSPs',
    cat: 'dist',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 50,
    runtime: 'Delivery in 24h',
    summary: 'Ship a release with verified audio QC, metadata, artwork specs, embargo dates, editorial pitch, and pre-save landing page.',
    inputs: ['Master and artwork', 'Release metadata and credits', 'Release date and territories'],
    outputs: ['Delivery receipt and store links', 'Editorial pitch submitted', 'Pre-save landing page'],
    steps: ['Run audio and artwork QC', 'Assemble metadata, ISRC, and UPC', 'Deliver to stores with dates and pitch', 'Confirm live links and log release'],
    tools: ['Distributor API', 'Audio QC', 'Pre-save pages']
  },
  {
    id: 'track-royalties',
    name: 'Track Royalties & Store Payouts',
    cat: 'dist',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 20,
    runtime: 'Continuous',
    summary: 'One consolidated dashboard for what you earned across every DSP and store, with variance flags for underpayments.',
    inputs: ['Distributor and DSP statements', 'PRO and MLC statements', 'Splits from catalogue'],
    outputs: ['Unified royalty dashboard', 'Monthly statement by source', 'Discrepancy and underpayment flags'],
    steps: ['Ingest statements from every source', 'Normalize to track and territory', 'Apply splits and compute net per party', 'Flag variances against streaming counts'],
    tools: ['Distributor statements', 'PRO and MLC feeds', 'Analytics']
  },
  {
    id: 'collab-playlist',
    name: 'Pitch to Curators & Playlists',
    cat: 'dist',
    modes: ['s', 'k'],
    servicePrice: 0,
    credits: 15,
    runtime: '3–7 days',
    summary: 'Identify vetted curator, collaborative, and community playlists, craft personalized pitches, and log responses.',
    inputs: ['Track and one-line pitch', 'Genre and comparable artists', 'Target territories'],
    outputs: ['Pitch log with responses', 'Confirmed placements', 'Follower reach estimate'],
    steps: ['Build target list by genre and size', 'Personalize and send pitches', 'Track adds, saves, and skips', 'Report placements and next targets'],
    tools: ['Curator database', 'Playlist analytics', 'Outreach CRM']
  },
  {
    id: 'youtube-video',
    name: 'Upload & Monetize Video on YouTube',
    cat: 'dist',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 15,
    runtime: 'Same day',
    summary: 'Publish video content with SEO metadata, Content ID asset registration, and chapters to maximize algorithmic reach.',
    inputs: ['Video file and thumbnail', 'Credits and description copy', 'Release timing'],
    outputs: ['Published video with SEO metadata', 'Content ID asset registered', 'Chapters and end screens'],
    steps: ['Prepare title, description, and tags', 'Register asset for Content ID', 'Schedule premiere or publish', 'Attach cards, chapters, and playlists'],
    tools: ['YouTube Data API', 'Content ID', 'Thumbnail specs']
  },

  // Brand & Identity
  {
    id: 'create-epk',
    name: 'Create Electronic Press Kit (EPK)',
    cat: 'brand',
    modes: ['s', 'k', 'p'],
    servicePrice: 149,
    credits: 60,
    runtime: '2–3 days',
    summary: 'The single link you send to venues, press, investors, and labels: bio, music, press clippings, live proof, and contact routing.',
    inputs: ['Bio and press quotes', 'High-res photos and logo', 'Streaming and video links'],
    outputs: ['Hosted EPK page with analytics', 'Print-ready one-sheet PDF', 'Shareable short link'],
    steps: ['Pull assets from brand and catalogue', 'Write and tier bio copy', 'Lay out responsive page and one-sheet', 'Publish with tracking and contact routing'],
    tools: ['EPK builder', 'Asset library', 'Link analytics']
  },
  {
    id: 'artist-bio',
    name: 'Create Multi-Tier Brand Bio',
    cat: 'brand',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 25,
    runtime: 'Same day',
    summary: 'Three lengths of the same authentic story — long-form for press kits, short for platform profiles, and one-liner for posters.',
    inputs: ['Career facts and milestones', 'Press mentions and quotes', 'Voice preferences'],
    outputs: ['Long, short, and social bios', 'Press boilerplate', 'Pull quotes'],
    steps: ['Interview memory for the real story', 'Draft long-form bio', 'Cut down to short and one-line versions', 'Fact-check dates, names, and credits'],
    tools: ['Brand voice profile', 'Press archive', 'Catalogue database']
  },
  {
    id: 'brand-guidelines',
    name: 'Write Full Brand Guidelines',
    cat: 'brand',
    modes: ['s', 'p'],
    servicePrice: 199,
    credits: 0,
    runtime: '4–6 days',
    summary: 'Define once how the project looks and sounds so every asset, landing page, and social post is completely unified.',
    inputs: ['Logo and existing assets', 'Reference artists/products and moodboard', 'Voice and audience notes'],
    outputs: ['Brand guide PDF', 'Color and type CSS tokens', 'Voice and usage rules'],
    steps: ['Audit existing assets and references', 'Define palette, typography, and imagery rules', 'Write voice, tone, and negative constraints', 'Ship guide and exportable tokens'],
    tools: ['Asset library', 'Token export', 'Design review']
  },
  {
    id: 'brand-logo',
    name: 'Design Scalable Brand Logo',
    cat: 'brand',
    modes: ['s'],
    servicePrice: 249,
    credits: 0,
    runtime: '5–8 days',
    summary: 'A geometric mark and wordmark engineered to survive a festival billboard, app favicon, and merchandise tag.',
    inputs: ['Project name and references', 'Genre and audience notes', 'Usage contexts'],
    outputs: ['Logo pack in SVG and PNG', 'Lockups and monochrome versions', 'Favicon and avatar crops'],
    steps: ['Explore three distinct concepts', 'Refine chosen concept with math grid', 'Build lockups and monochrome variants', 'Export full production asset pack'],
    tools: ['Design pipeline', 'Asset library', 'Trademark screen']
  },

  // Content & Social
  {
    id: 'video-treatment',
    name: 'Write Video Production Treatment',
    cat: 'content',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 35,
    runtime: '2 days',
    summary: 'A structured treatment directors and video teams actually read: narrative concept, visual references, shot list, and budget model.',
    inputs: ['Track/App story and lyrics/copy', 'Visual references', 'Budget range'],
    outputs: ['Treatment document', 'Shot list and moodboard', 'Budget bracket and crew list'],
    steps: ['Interpret themes and messaging', 'Build concept and visual language', 'Draft shot list and locations', 'Attach budget bracket and references'],
    tools: ['Reference library', 'Budget model', 'Document export']
  },
  {
    id: 'lyric-video',
    name: 'Create Kinetic Lyric / Promo Video',
    cat: 'content',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 40,
    runtime: '1–2 days',
    summary: 'Kinetic typography video that strictly obeys brand tokens and typography, rendered for 16:9, 9:16, and 1:1 aspect ratios.',
    inputs: ['Master audio', 'Timed lyrics or script', 'Brand typography and palette'],
    outputs: ['1080p horizontal cut', 'Vertical Reels/TikTok cuts', 'Project file for edits'],
    steps: ['Sync copy to audio waveform', 'Apply brand typography and motion easing', 'Render all aspect ratios with HyperFrames', 'Deliver with subtitles and metadata'],
    tools: ['Motion renderer', 'Brand tokens', 'Caption export']
  },
  {
    id: 'transcribe-lyrics',
    name: 'Transcribe & Align Lyrics / Speech',
    cat: 'content',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 8,
    runtime: 'Under 5 minutes',
    summary: 'Accurately transcribed and millisecond-aligned text in LRC and JSON formats ready for streaming DSPs and video subtitles.',
    inputs: ['Master audio', 'Draft lyrics/script'],
    outputs: ['Timed lyrics in LRC and JSON', 'Platform-ready lyric sheet', 'Explicit-content flags'],
    steps: ['Transcribe and align to waveform', 'Correct against draft', 'Mark structural sections and adlibs', 'Export platform formats'],
    tools: ['Speech alignment', 'Lyric platforms', 'Catalogue database']
  },
  {
    id: 'content-calendar',
    name: 'Create 30-Day Content Calendar',
    cat: 'content',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 20,
    runtime: 'Continuous',
    summary: 'Thirty days of high-converting social posts tied to release milestones, each with an exact brief instead of vague reminders.',
    inputs: ['Release and launch milestones', 'Platform priorities', 'Production capacity'],
    outputs: ['30-day interactive calendar', 'Per-post brief and asset list', 'Reminder schedule'],
    steps: ['Map launch and promotional milestones', 'Assign formats to target platforms', 'Write creative brief per slot', 'Publish calendar and notifications'],
    tools: ['Calendar sync', 'Analytics', 'Asset library']
  },
  {
    id: 'social-content',
    name: 'Generate Social Media Content Batches',
    cat: 'content',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 15,
    runtime: 'Same day',
    summary: 'Captions, hooks, and short-form video cutdowns in your distinct voice, batched per platform and ready to schedule.',
    inputs: ['Source assets and clips', 'Campaign focus', 'Voice profile'],
    outputs: ['Caption sets per platform', 'Short-form cutdowns', 'Hook variations to test'],
    steps: ['Read voice profile and brand rules', 'Draft hooks and captions per platform', 'Cut clips to exact aspect ratio', 'Queue for approval and scheduling'],
    tools: ['Brand voice profile', 'Clip editor', 'Scheduler']
  },
  {
    id: 'social-analytics',
    name: 'Analyze Social & Marketing Engagement',
    cat: 'content',
    modes: ['s', 'k', 'p'],
    servicePrice: 0,
    credits: 12,
    runtime: 'Continuous',
    summary: 'Granular telemetry on what moved the needle — by format, posting hour, and hook — to optimize the next campaign batch.',
    inputs: ['Connected platform accounts', 'Post history', 'Growth goals'],
    outputs: ['Engagement report by format', 'Best-time-to-post map', 'Follower growth projection'],
    steps: ['Pull metrics across platforms', 'Cluster by format, hook, and hour', 'Rank top and bottom performers', 'Recommend next creative batch'],
    tools: ['Platform analytics APIs', 'Cohort model', 'Report export']
  },

  // Merch & Product
  {
    id: 'merch-designs',
    name: 'Create Print-Ready Merch Designs',
    cat: 'merch',
    modes: ['s', 'p'],
    servicePrice: 179,
    credits: 0,
    runtime: '4–7 days',
    summary: 'Designs crafted specifically for garment screen-printing, embroidery, and DTG that strictly honor brand guidelines.',
    inputs: ['Brand guide and logo', 'Product types and apparel blanks', 'Print method preference'],
    outputs: ['Print-ready vector separations', 'Photorealistic mockups', 'Print spec sheet'],
    steps: ['Pull brand tokens and references', 'Design across product types', 'Prepare vector separations', 'Render photorealistic mockups for store'],
    tools: ['Design pipeline', 'Print specs', 'Mockup renderer']
  },
  {
    id: 'merch-dropship',
    name: 'Set Up Merch Drop-Shipping Store',
    cat: 'merch',
    modes: ['s', 'k'],
    servicePrice: 99,
    credits: 0,
    runtime: '3–5 business days',
    summary: 'An automated print-on-demand storefront that prints and ships globally with profit margins you pre-approve.',
    inputs: ['Designs and product catalog', 'Target price points', 'Store platform preference'],
    outputs: ['Connected print-on-demand store', 'Live product listings', 'Margin and pricing sheet'],
    steps: ['Select POD partner and garments', 'Upload designs and configure variants', 'Price against cost and margin target', 'Connect store, tax, and fulfillment'],
    tools: ['Print-on-demand APIs', 'Store platform', 'Tax settings']
  },

  // Strategy
  {
    id: 'business-plan',
    name: 'Write Institutional Business Plan',
    cat: 'strat',
    modes: ['s', 'p'],
    servicePrice: 199,
    credits: 0,
    runtime: '5–7 days',
    summary: 'The comprehensive document that makes banks, grant committees, and venture investors take your venture seriously.',
    inputs: ['Income history and catalogue/IP', 'Strategic goals and timeline', 'Cost model and team'],
    outputs: ['Business plan document', '12-month financial forecast', 'Funding one-pager'],
    steps: ['Model current revenue and unit economics', 'Define strategy and key milestones', 'Build 12-month pro-forma forecast', 'Package executive plan and one-pager'],
    tools: ['Ledger data', 'Royalty history', 'Forecast model']
  },

  // Agent Builder
  {
    id: 'build-agent',
    name: 'Compose Autonomous Sub-Agent',
    cat: 'build',
    modes: ['k', 'p'],
    servicePrice: 0,
    credits: 0,
    runtime: 'Under 10 minutes',
    summary: 'Compose a dedicated sub-agent for a single project: brief, granted skills, memory scope, credit cap, and guardrails.',
    inputs: ['Project brief and deadline', 'Skills to grant', 'Credit cap and approval rules'],
    outputs: ['Live autonomous sub-agent', 'Run policy and guardrails', 'Reporting schedule'],
    steps: ['Name project and write brief', 'Grant skills from attached library', 'Scope memory and set credit cap', 'Define approvals and reporting cadence'],
    tools: ['Agent runtime', 'Skill registry', 'Budget controls']
  },
  {
    id: 'build-skill',
    name: 'Author and Publish Custom Skill',
    cat: 'build',
    modes: ['k', 'p'],
    servicePrice: 0,
    credits: 0,
    runtime: 'Hours',
    summary: 'Author your own agent skill — system prompt, tool schemas, input contract, evals — then keep it private or sell it on the Store.',
    inputs: ['Job description and runbook', 'Tools and API access', 'Test evaluation cases'],
    outputs: ['Versioned skill package', 'Evaluation results', 'Private or Store listing'],
    steps: ['Define job, inputs, and outputs', 'Write system prompt and runbook', 'Declare tool schemas and permissions', 'Run evals, version, and publish'],
    tools: ['Skill SDK', 'Eval harness', 'Store publishing']
  }
];

export const INITIAL_ATTACHED_SKILL_IDS = [
  'upload-catalogue',
  'extract-metadata',
  'pro-register-tracks',
  'track-royalties',
  'social-content',
  'content-calendar',
  'manage-expenses',
  'artist-bio'
];

export const INITIAL_SUB_AGENTS: AgentSubAgent[] = [
  {
    id: 'sub-nocturne',
    kind: 'Release Rollout',
    name: 'NOCTURNE Rollout Agent',
    status: 'RUNNING',
    brief: 'Ship the six-track project on Oct 3: registration, DSP delivery, editorial pitch, and a 30-day social content campaign.',
    skills: ['Release Music / Apps on DSPs', 'Register Works With a P.R.O.', 'Create 30-Day Content Calendar', 'Generate Social Media Content Batches', 'Create Kinetic Lyric / Promo Video'],
    spentCredits: 640,
    budgetCredits: 1200,
    due: 'Due Oct 3',
    nextAction: 'Editorial pitch closes in 4 days — requires operator sign-off.'
  },
  {
    id: 'sub-tour',
    kind: 'Booking & Tour',
    name: 'Fall Tour Booking Agent',
    status: 'WAITING',
    brief: 'Fourteen venues across the Midwest and East Coast. EPKs delivered, guarantees tracked, and split agreements signed.',
    skills: ['Create Electronic Press Kit (EPK)', 'Create Multi-Tier Brand Bio', 'Create Split Sheet Agreement'],
    spentCredits: 210,
    budgetCredits: 800,
    due: 'Due Sep 15',
    nextAction: 'Waiting on two venue replies; scheduled follow-up for Friday.'
  },
  {
    id: 'sub-merch',
    kind: 'Merch Drop',
    name: 'Q4 Merch Capsule Agent',
    status: 'DRAFT',
    brief: 'Tour-tied merchandise capsule of four pieces, print-on-demand, live one week prior to the first show date.',
    skills: ['Create Print-Ready Merch Designs', 'Set Up Merch Drop-Shipping Store', 'Generate Social Media Content Batches'],
    spentCredits: 0,
    budgetCredits: 600,
    due: 'Starts Sep 1',
    nextAction: 'Grant the merch skills to activate this sub-agent.'
  }
];

export const INITIAL_AGENT_MEMORY: AgentMemoryRecord[] = [
  { key: 'Entity Legal Name', value: 'Diamitani Industries LLC · DE', category: 'Legal' },
  { key: 'Federal EIN', value: '88-••••231 (Verified CP 575)', category: 'Legal' },
  { key: 'P.R.O. Affiliation', value: 'BMI · Writer & Publisher (IPI #89201)', category: 'Publishing' },
  { key: 'Master Catalogue', value: '31 Masters, 12 Registered with MLC', category: 'Catalogue' },
  { key: 'DSP Distribution', value: 'Connected & Verified (Spotify + Apple)', category: 'Distribution' },
  { key: 'Stripe Merchant ID', value: 'acct_1NvVibeMasterLive', category: 'Finance' },
  { key: 'Next Strategic Milestone', value: 'Q4 Product Launch · Oct 15', category: 'Milestone' }
];

export const INITIAL_AGENT_RUNS: AgentRunRecord[] = [
  {
    id: 'run-01',
    skillName: 'Register Works With a P.R.O.',
    actor: 'NOCTURNE Rollout Agent',
    timestamp: '2 hours ago',
    outputArtifact: '3 works registered with BMI (CP-892)',
    status: 'DONE'
  },
  {
    id: 'run-02',
    skillName: 'Generate Social Media Content Batches',
    actor: 'The Manager',
    timestamp: 'Yesterday',
    outputArtifact: '12 captions, 4 vertical cutdowns',
    status: 'REVIEW'
  },
  {
    id: 'run-03',
    skillName: 'Get an E.I.N.',
    actor: 'Service Run',
    timestamp: 'Aug 11',
    outputArtifact: 'IRS CP 575 confirmation filed to vault',
    status: 'DONE'
  },
  {
    id: 'run-04',
    skillName: 'Track Royalties & Store Payouts',
    actor: 'The Manager',
    timestamp: 'Aug 9',
    outputArtifact: '2 store payout discrepancies flagged',
    status: 'ACTION'
  },
  {
    id: 'run-05',
    skillName: 'Create Electronic Press Kit (EPK)',
    actor: 'Fall Tour Booking Agent',
    timestamp: 'Aug 4',
    outputArtifact: 'EPK page published with custom short link',
    status: 'DONE'
  }
];

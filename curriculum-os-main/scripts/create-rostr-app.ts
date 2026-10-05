#!/usr/bin/env node

/**
 * create-rostr-app.ts
 * 
 * Scaffold a Premium Site Empire OS (ROSTR) web application.
 * Follows the PAL, NPAO, and 5D Lifecycle paradigms natively with Vercel AI SDK.
 * 
 * Usage:
 * npx tsx scripts/create-rostr-app.ts <project-name>
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const projectName = args[0] || 'my-rostr-app';
const projectPath = path.join(process.cwd(), projectName);

console.log(`\n🚀 Initializing ROSTR Empire OS: ${projectName}\n`);

// 1. Scaffold base Next.js app
if (!fs.existsSync(projectPath)) {
  console.log(`📦 Scaffolding Next.js App Router (Turbopack, Tailwind, TS)...`);
  execSync(`npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`, { stdio: 'inherit' });
} else {
  console.log(`⚠️  Directory ${projectName} already exists. Attempting to inject ROSTR framework...`);
}

// 2. Install standard Empire OS dependencies
console.log(`\n📦 Installing ROSTR dependencies (Vercel AI, Supabase, Stripe, etc)...`);
execSync(`npm install ai @ai-sdk/openai @ai-sdk/anthropic @supabase/supabase-js stripe zod`, { cwd: projectPath, stdio: 'inherit' });

// 3. Create ROSTR Directory Structure
console.log(`\n📂 Scaffolding ROSTR Agent Harness architecture...`);
const rostrDirs = [
  'src/lib/rostr-os/agents',
  'src/lib/rostr-os/sub-agents',
  'src/lib/rostr-os/skills',
  'src/lib/rostr-os/tools',
  'src/lib/rostr-os/functions',
  'src/lib/rostr-os/knowledge',
  'src/lib/rostr-os/memory',
  'src/lib/rostr-os/instructions',
  'src/lib/rostr-os/harness',
  'src/lib/rostr-os/runtime',
  'src/lib/rostr-os/gateway',
  'src/lib/rostr-os/sandbox',
];

rostrDirs.forEach(dir => {
  const dirPath = path.join(projectPath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    // Create a .gitkeep so empty folders are tracked
    fs.writeFileSync(path.join(dirPath, '.gitkeep'), '');
  }
});

// 4. Create Page Structure (from buildprocess.md)
console.log(`\n📂 Scaffolding Site Structure (Marketing, App, Chat)...`);
const pages = [
  { path: 'src/app/(marketing)/page.tsx', name: 'LandingPage' },
  { path: 'src/app/(marketing)/pricing/page.tsx', name: 'PricingPage' },
  { path: 'src/app/(auth)/login/page.tsx', name: 'LoginPage' },
  { path: 'src/app/(auth)/signup/page.tsx', name: 'SignupPage' },
  { path: 'src/app/app/page.tsx', name: 'DashboardHome' },
  { path: 'src/app/app/settings/page.tsx', name: 'SettingsPage' },
  { path: 'src/app/app/chat/page.tsx', name: 'ChatUI' },
];

pages.forEach(page => {
  const fullPath = path.join(projectPath, page.path);
  const dirPath = path.dirname(fullPath);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  
  const content = `export default function ${page.name}() {\n  return (\n    <div className="min-h-screen p-8">\n      <h1 className="text-2xl font-bold">${page.name}</h1>\n      <p>Scaffolded by ROSTR Empire OS.</p>\n    </div>\n  );\n}\n`;
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
  }
});

// 5. Inject core ROSTR files (Gateway, PAL, NPAO router)
console.log(`\n⚙️  Injecting Vercel AI SDK Gateway & PAL Runtime...`);

const gatewayContent = `
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

// Central Gateway for LLMs
export const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Default ROSTR recommended model
export const defaultModel = anthropic('claude-3-5-sonnet-20240620');
`;
fs.writeFileSync(path.join(projectPath, 'src/lib/rostr-os/gateway/index.ts'), gatewayContent.trim());

const palContent = `
import { generateObject } from 'ai';
import { z } from 'zod';
import { defaultModel } from '../gateway';

// Prompt Abstraction Layer (PAL) Manifest Type
export const PalManifestSchema = z.object({
  intent: z.string().describe("The distilled intent of the user request"),
  phase: z.enum(['PreD', 'Design', 'Development', 'Deployment', 'Debugging']),
  ambiguity_score: z.number().min(0).max(1),
  required_agents: z.array(z.string()),
  execution_criteria: z.array(z.string())
});

export async function parseIntent(prompt: string) {
  const { object } = await generateObject({
    model: defaultModel,
    schema: PalManifestSchema,
    system: "You are the ROSTR PAL. Parse the raw prompt into a strict manifest. Assign a 5D lifecycle phase.",
    prompt: prompt
  });
  return object;
}
`;
fs.writeFileSync(path.join(projectPath, 'src/lib/rostr-os/runtime/pal.ts'), palContent.trim());


console.log(`\n======================================================`);
console.log(`✅ ROSTR Empire OS Scaffolded Successfully!`);
console.log(`======================================================`);
console.log(`Next steps:`);
console.log(`1. cd ${projectName}`);
console.log(`2. cp .env.example .env.local (Add OPENAI_API_KEY, STRIPE, SUPABASE)`);
console.log(`3. npm run dev`);
console.log(`\nHappy building!`);

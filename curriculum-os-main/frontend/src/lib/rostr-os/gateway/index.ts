import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

// Central Gateway for LLMs in ROSTR OS
export const openai = createOpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export const anthropic = createAnthropic({ 
  apiKey: process.env.ANTHROPIC_API_KEY 
});

// The ROSTR OS Default Model recommended for agentic reasoning
export const defaultModel = anthropic('claude-3-5-sonnet-20240620');

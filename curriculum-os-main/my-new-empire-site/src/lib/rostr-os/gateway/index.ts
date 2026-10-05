import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

// Central Gateway for LLMs
export const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Default ROSTR recommended model
export const defaultModel = anthropic('claude-3-5-sonnet-20240620');
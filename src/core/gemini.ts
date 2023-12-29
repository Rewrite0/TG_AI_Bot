import { config } from '@config';
import { GeminiBot } from '@/utils/ai';

const { apiKey } = config;
export const gemini = new GeminiBot(apiKey);

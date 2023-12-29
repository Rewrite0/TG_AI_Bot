import process from 'node:process';
import dotenv from 'dotenv';
import type { Config } from '#/config';

dotenv.config();

export const config: Config = {
  apiKey: process.env.API_KEY!,
  botToken: process.env.BOT_TOKEN!,
  chatId: JSON.parse(process.env.CHAT_ID!),
  adminId: JSON.parse(process.env.ADMIN_ID!),
  proxy: process.env.PROXY || '',
};

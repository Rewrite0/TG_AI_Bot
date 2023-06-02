import { Bot } from 'grammy';
import { config } from '@config';
import type { MyContext } from '#/bot';
import { createProxy } from '@/utils/proxy';

export const bot = new Bot<MyContext>(config.tgToken, {
  client: {
    baseFetchConfig: {
      agent: createProxy(),
      compress: true,
    },
  },
});

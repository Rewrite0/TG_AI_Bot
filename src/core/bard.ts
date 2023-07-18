import { config } from '@config';
import { Bard } from 'googlebard';
import { createProxy } from '@/utils/proxy';

const cookies = `__Secure-1PSID=${config.bardCookie}`;

export const bard = new Bard(cookies, {
  inMemory: false,
  savePath: 'conversations.json',
  proxy: createProxy(),
});

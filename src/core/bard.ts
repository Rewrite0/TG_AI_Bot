import { Bard } from 'googlebard';
import { config } from '@config';
import { getProxy } from '@/utils/proxy';

const cookies = `__Secure-1PSID=${config.bardCookie}`;

const proxy = getProxy();

export const bard = new Bard(cookies, {
  inMemory: false,
  // 用于存储聊天上下文信息
  savePath: 'conversations.json',
  proxy,
});

import { type Context, session } from 'grammy';
import { FileAdapter } from '@grammyjs/storage-file';
import type { SessionData } from '#/bot';

export const sessionFileStore = session<SessionData, Context>({
  initial: () => ({
    isUse: false,
  }),
  storage: new FileAdapter({
    dirName: 'sessions',
  }),
});

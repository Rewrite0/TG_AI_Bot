import process from 'node:process';
import { run } from '@grammyjs/runner';
import { config } from '@config';
import {
  handleCommand,
  handleGroup,
  handlePrivate,
  setCommands,
} from './handle';
import { sessionFileStore } from './plugin';
import { bot } from '@/core/bot';

export async function runBot() {
  // plugins
  bot.use(sessionFileStore);

  // handles
  bot.use(handleCommand);
  bot.use(handleGroup);
  bot.use(handlePrivate);

  bot.catch((err) => {
    console.log(`Bot Error: \n${err}`);
  });

  await setCommands();

  const handle = run(bot);

  console.log('bot is running...');

  config.adminId.forEach((id) => {
    bot.api.sendMessage(id, 'bot 已启动!');
  });

  handle.task()?.then(() => {
    handle.stop();
  });

  process.once('SIGINT', () => handle.stop());
  process.once('SIGTERM', () => handle.stop());
}

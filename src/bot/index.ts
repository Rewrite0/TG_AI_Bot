import { run } from '@grammyjs/runner';
import { handleCommand, handleGroup, handlePrivate } from './handle';
import { sessionFileStore } from './plugin';
import { bot } from '@/core/bot';

export async function runBot() {
  // plugins
  bot.use(sessionFileStore);

  await bot.api.setMyCommands([
    { command: 'help', description: '帮助' },
    { command: 'reset', description: '重置对话' },
  ]);

  // handles
  bot.use(handleCommand);
  bot.use(handleGroup);
  bot.use(handlePrivate);

  bot.catch((err) => {
    console.log(`Error: \n${err}`);
  });

  // run
  const handle = run(bot);
  handle.task()?.then(() => {
    handle.stop();
  });

  process.once('SIGINT', () => handle.stop());
  process.once('SIGTERM', () => handle.stop());
}

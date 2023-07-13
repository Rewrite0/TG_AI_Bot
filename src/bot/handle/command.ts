import { Composer } from 'grammy';
import type { MyContext } from '#/bot';
import { bard } from '@/core/bard';
import { useBot } from '@/utils/useBot';

export const handleCommand = new Composer<MyContext>();

// 监听命令
handleCommand.command('reset', async (ctx) => {
  const type = ctx.chat.type;
  const isPrivate = type === 'private';

  if (type === 'group' || type === 'supergroup') {
    if (ctx.from && ctx.from.id) {
      bard.resetConversation(ctx.from.id.toString());
    }
  }
  if (type === 'private') {
    bard.resetConversation(ctx.chat.id.toString());
  }

  await ctx.reply('对话已重置!', {
    reply_to_message_id: isPrivate ? undefined : ctx.msg.message_id,
  });
});

handleCommand.command('start', async (ctx) => {
  if (useBot('private', ctx.chat.id)) {
    await ctx.reply('发送消息即可和 Bard 聊天!');
  }
});

handleCommand.command('help', async (ctx) => {
  const type = ctx.chat.type;
  const isPrivate = type === 'private';

  await ctx.reply(
    `这是一个可以与 Google Bard 对话的 bot. \n\n每个人有独立的对话上下文. \n\n- 使用 /reset 可以重置对话.`,
    {
      parse_mode: 'Markdown',
      reply_to_message_id: isPrivate ? undefined : ctx.msg.message_id,
    }
  );
});

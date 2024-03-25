import { Composer } from 'grammy';
import type { MyContext } from '#/bot';
import { useBot } from '@/utils/useBot';
import { chat } from '@/utils/chat';

export const handlePrivate = new Composer<MyContext>();

// 监听私聊
handlePrivate.on('message:text', async (ctx) => {
  const message = ctx.message;
  const type = message.chat.type;
  const id = ctx.chat.id;

  // 限制为私聊
  if (type !== 'private') return;
  // 限制访问人员
  if (!useBot('private', id)) return;

  const msg = message.text;

  const m = await ctx.reply('请等待...');

  const final = await chat(msg, ctx, id);

  await ctx.api.deleteMessage(m.chat.id, m.message_id);

  try {
    await ctx.reply(final, {
      parse_mode: 'MarkdownV2',
    });
  } catch (error) {
    await ctx.reply(final);
  }
});

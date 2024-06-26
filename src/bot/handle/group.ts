import { Composer } from 'grammy';
import type { MyContext } from '#/bot';
import { useBot } from '@/utils/useBot';
import { chat } from '@/utils/chat';

export const handleGroup = new Composer<MyContext>();

// 监听加入群组
handleGroup.on(':new_chat_members:me', async (ctx) => {
  const session = ctx.session;
  // 添加人id
  const fromId = ctx.from?.id ?? 0;

  // 添加人是管理员时可用
  if (useBot('group', fromId)) {
    session.isUse = true;
    console.log('bot 可用');
  }
});

// 监听@
handleGroup.on('message::mention', async (ctx) => {
  console.log('监听@', ctx.session);

  // 判断是否可用
  if (!ctx.session.isUse) return;
  const message = ctx.message;
  const name = ctx.me.username;

  if (message.text && message.text.startsWith(`@${name}`)) {
    /** 剔除 @botusername 字符, 仅获取信息 */
    const text = message.text.replace(/@\w+\s/g, '');
    const id = ctx.from.id;

    const m = await ctx.reply('请等待...', {
      reply_to_message_id: ctx.msg.message_id,
    });
    const final = await chat(text, ctx, id);

    await ctx.api.deleteMessage(m.chat.id, m.message_id);

    try {
      await ctx.reply(final, {
        reply_to_message_id: ctx.msg.message_id,
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      await ctx.reply(final, {
        reply_to_message_id: ctx.msg.message_id,
      });
    }
  }
});

// 对回复做出响应
handleGroup.on('message').filter(
  async (ctx) => {
    return ctx.me.id === ctx.message?.reply_to_message?.from?.id;
  },
  async (ctx) => {
    if (!ctx.session.isUse) return;
    const message = ctx.message;
    const text = message.text;
    const id = ctx.from.id;

    if (!text) return;

    const m = await ctx.reply('请等待...', {
      reply_to_message_id: ctx.msg.message_id,
    });
    const final = await chat(text, ctx, id);

    await ctx.api.deleteMessage(m.chat.id, m.message_id);

    try {
      await ctx.reply(final, {
        reply_to_message_id: ctx.msg.message_id,
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      await ctx.reply(final, {
        reply_to_message_id: ctx.msg.message_id,
      });
    }
  }
);

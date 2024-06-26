import { Composer } from 'grammy';
import type { MyContext } from '#/bot';
import { isAdminUser, isChatUser, useBot } from '@/utils/useBot';
import { bot } from '@/core/bot';

export const handleCommand = new Composer<MyContext>();

export async function setCommands() {
  try {
    console.log('await set commands...');
    await bot.api.setMyCommands([
      { command: 'help', description: '帮助' },
      { command: 'reset', description: '重置对话' },
      { command: 'allow', description: '仅管理员可用, 允许该群组使用Bot' },
      {
        command: 'not_allow',
        description: '仅管理员可用, 禁止该群组使用Bot',
      },
      {
        command: 'status',
        description: '查看当前群组是否可使用',
      },
    ]);
    console.log('set commands success!');
  } catch (error) {
    console.log('set commands fail!');
    console.log(`Error: \n${error}`);
  }
}

// 监听命令
handleCommand.command('reset', async (ctx) => {
  const type = ctx.chat.type;
  const isPrivate = type === 'private';

  if (type === 'group' || type === 'supergroup') {
    if (ctx.from && ctx.from.id) {
      ctx.session.history[ctx.from.id] = undefined;
    }
  }
  if (type === 'private') {
    ctx.session.history[ctx.chat.id] = undefined;
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

  const message = `Google Gemini Bot.
可在受允许的私聊和群组中使用.
当前模型: gemini-1.5-flash-latest

- 使用 /reset 可以重置对话.
- 使用 /status 查看当前群组是否可用.
- 使用 /allow 仅管理员可用, 允许当前群组使用.
- 使用 /not_allow 仅管理员可用, 禁止当前群组使用.`;

  await ctx.reply(message, {
    reply_to_message_id: isPrivate ? undefined : ctx.msg.message_id,
  });
});

handleCommand.command('allow', async (ctx) => {
  const type = ctx.chat.type;
  const isPrivate = type === 'private';
  const session = ctx.session;
  const fromId = ctx.from?.id;

  if (isPrivate) {
    await ctx.reply('仅群组中可用!');
  } else {
    if (fromId && isAdminUser(fromId)) {
      session.isUse = true;
      await ctx.reply('已允许该群组使用!', {
        reply_to_message_id: ctx.msg.message_id,
      });
    } else {
      await ctx.reply('仅管理员可使用此命令!', {
        reply_to_message_id: ctx.msg.message_id,
      });
    }
  }
});

handleCommand.command('not_allow', async (ctx) => {
  const type = ctx.chat.type;
  const isPrivate = type === 'private';
  const session = ctx.session;
  const fromId = ctx.from?.id;

  if (isPrivate) {
    await ctx.reply('仅群组中可用!');
  } else {
    if (fromId && isAdminUser(fromId)) {
      session.isUse = false;
      await ctx.reply('已禁止该群组使用!', {
        reply_to_message_id: ctx.msg.message_id,
      });
    } else {
      await ctx.reply('仅管理员可使用此命令!', {
        reply_to_message_id: ctx.msg.message_id,
      });
    }
  }
});

handleCommand.command('status', async (ctx) => {
  const type = ctx.chat.type;
  const isPrivate = type === 'private';
  const session = ctx.session;

  if (isPrivate) {
    if (isChatUser(ctx.chat.id)) {
      await ctx.reply('当前私聊可使用!');
    } else {
      await ctx.reply('当前私聊不可使用!');
    }
    return;
  }

  if (session.isUse) {
    await ctx.reply('当前群组可使用!', {
      reply_to_message_id: ctx.msg.message_id,
    });
  } else {
    await ctx.reply('当前群组不可使用!', {
      reply_to_message_id: ctx.msg.message_id,
    });
  }
});

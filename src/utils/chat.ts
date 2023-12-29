import { gemini } from '@/core/gemini';
import type { MyContext } from '#/bot';

function myConsole(msg: string) {
  console.log('========================');
  console.log(`My: ${msg}`);
  console.log('====');
}

function bardConsole(msg: string) {
  console.log(`Bard: ${msg}`);
  console.log('========================');
}

/**
 * Bard 对话
 * @param message 聊天信息
 * @param id 聊天人的id, 私聊是 chat.id 群组是 from.id
 */
export async function chat(message: string, ctx: MyContext, id: number) {
  myConsole(message);

  const { history, lastTime } = ctx.session;
  const { init, getHistory, sendMessage } = gemini.useChat();

  // 超过一天重置对话
  if (lastTime === 0 || Date.now() - lastTime > 1000 * 60 * 60 * 24) {
    ctx.session.history[id] = undefined;
  }

  init({
    history: history?.[id],
  });

  try {
    const reply = await sendMessage(message);
    bardConsole(reply);

    ctx.session.lastTime = Date.now();

    ctx.session.history[id] = await getHistory();

    return reply;
  } catch (error) {
    console.log(`Chat Error: \n\n ${error}`);
    return '回复时出现错误, 请查看日志。';
  }
}

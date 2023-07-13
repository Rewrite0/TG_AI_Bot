import { bard } from '@/core/bard';

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
 * @param chatId 聊天人的id, 私聊是 chat.id 群组是 from.id
 */
export async function chat(message: string, chatId: number) {
  myConsole(message);

  try {
    const reply = await bard.ask(message, chatId.toString());
    bardConsole(reply);
    return reply;
  } catch (error) {
    return `Error: \n\n ${error}`;
  }
}

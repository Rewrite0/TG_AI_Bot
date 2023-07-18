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
 * @param id 聊天人的id, 私聊是 chat.id 群组是 from.id
 */
export async function chat(message: string, id: number) {
  myConsole(message);

  try {
    const reply = (await bard.ask(message, `id-${id}`)) as string;

    bardConsole(reply);

    return reply;
  } catch (error) {
    console.log(`Chat Error: \n\n ${error}`);
    return '回复时出现错误, 请查看日志。';
  }
}

import { useConversations } from './bardConversations';
import { Bard } from '@/core/bard';

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
    const conversation = useConversations(id);
    const ids = conversation.get();

    const bardChat = new Bard.Chat(ids);

    const reply = (await bardChat.ask(message)) as string;

    bardConsole(reply);

    const data = bardChat.export();

    if (data) {
      conversation.save(data);
    }

    return reply;
  } catch (error) {
    return `Chat Error: \n\n ${error}`;
  }
}

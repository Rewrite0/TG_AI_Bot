import { bard } from '@/core/bard';
import { en2zh, zh2en } from '@/core/translator';

function myPart(msg: string, msgEn: string) {
  console.log('========================');
  console.log(`My: ${msg}\n--------------\n${msgEn}`);
  console.log('====');
}

function BardPart(msg: string, msgZh: string) {
  const final = `${msg}\n-------------\n${msgZh}`;
  console.log(`Bard: ${final}`);
  console.log('========================');

  return final;
}

/**
 * Bard 对话
 * @param message 聊天信息
 * @param chatId 聊天人的id, 私聊是 chat.id 群组是 from.id
 */
export async function chat(message: string, chatId: number) {
  const enMsg = await zh2en(message);

  myPart(message, enMsg);

  const reply = await bard.ask(enMsg, chatId.toString());
  const zhReply = await en2zh(reply);

  return BardPart(reply, zhReply);
}

import { config } from '@config';

export function useBot(type: 'group' | 'private', id: number) {
  switch (type) {
    case 'group':
      return config.adminId.includes(id);
    case 'private':
      return config.chatId.includes(id);
    default:
      return false;
  }
}

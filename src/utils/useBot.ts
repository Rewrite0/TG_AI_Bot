import { config } from '@config';

export function isAdminUser(id: number) {
  return config.adminId.includes(id);
}

export function isChatUser(id: number) {
  return config.chatId.includes(id) || isAdminUser(id);
}

export function useBot(type: 'group' | 'private', id: number) {
  switch (type) {
    case 'group':
      return isAdminUser(id);
    case 'private':
      return isChatUser(id);
    default:
      return false;
  }
}

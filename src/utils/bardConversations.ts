import fs from 'node:fs';
import type { IdsT } from 'bard-ai';

const path = 'conversations.json';

export interface Conversations {
  [id: number]: IdsT | Record<string, string> | undefined;
}

export function useConversations(userId: number) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
  }

  function save(ids?: IdsT | Record<string, string>) {
    const all = read();

    all[userId] = ids;

    fs.writeFileSync(path, JSON.stringify(all));
  }

  function read() {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return data as Conversations;
  }

  function get() {
    const all = read();
    return all?.[userId];
  }

  function del() {
    save();
  }

  return {
    save,
    read,
    get,
    del,
  };
}

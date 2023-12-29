import type { Context, SessionFlavor } from 'grammy';
import { type InputContent } from '@google/generative-ai';

export interface SessionData {
  /** group 中是否可用 */
  isUse: boolean;
  /** 对话历史 */
  history: {
    [id: number]: InputContent[] | undefined;
  };
  /** 最后对话时间，超时后重置对话 */
  lastTime: number;
}

export type MyContext = Context & SessionFlavor<SessionData>;

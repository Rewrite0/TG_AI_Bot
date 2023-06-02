import type { Context, SessionFlavor } from 'grammy';

export interface SessionData {
  /** group 中是否可用 */
  isUse: boolean;
}

export type MyContext = Context & SessionFlavor<SessionData>;

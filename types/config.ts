export interface Config {
  /**
   * Google Bard Cookie
   * 查看 https://github.com/PawanOsman/GoogleBard#prerequisite---how-to-get-cookies
   */
  bardCookie: string;
  /**
   * Telegram Bot Token
   */
  tgToken: string;
  /**
   * Telegram User Id, 多个以 , 分隔
   * 仅数组中的用户可私聊使用
   */
  chatId: number[];
  /**
   * 管理id, 仅管理添加bot进入群组时可用
   */
  adminId: number[];
  /** 代理, 仅支持 http 代理 */
  proxy: string;
}

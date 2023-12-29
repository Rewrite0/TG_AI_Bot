export interface Config {
  /**
   * Google gemini api key
   * 从 https://makersuite.google.com/app/apikey 获取
   */
  apiKey: string;
  /**
   * Telegram Bot Token
   */
  botToken: string;
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

import { GoogleGenerativeAI } from '@google/generative-ai';
import type {
  ChatSession,
  GenerativeModel,
  StartChatParams,
} from '@google/generative-ai';

export type HandleStream = (chunkText: string) => void;
export type HandleStreamFn = (callback: HandleStream) => Promise<void>;

export class GeminiBot {
  model: GenerativeModel;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async singleChat(prompt: string): Promise<string>;
  async singleChat(
    prompt: string,
    opts: { stream: true }
  ): Promise<HandleStreamFn>;
  async singleChat(prompt: string, opts: { stream?: boolean } = {}) {
    const { stream } = opts;

    if (stream) {
      const result = await this.model.generateContentStream([prompt]);
      return async (callback: HandleStream) => {
        for await (const chunk of result.stream) {
          callback(chunk.text());
        }
      };
    } else {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    }
  }

  useChat() {
    const { model } = this;

    let chat: ChatSession | undefined;

    async function init(params?: StartChatParams) {
      chat = model.startChat(params);
    }

    function getHistory() {
      if (!chat)
        throw new Error(
          'Chat session not initialized, call init() before getHistory'
        );
      return chat.getHistory();
    }

    async function sendMessage(message: string): Promise<string>;
    async function sendMessage(
      message: string,
      opts: { stream: true }
    ): Promise<HandleStreamFn>;
    async function sendMessage(
      message: string,
      opts: { stream?: boolean } = {}
    ) {
      if (!chat)
        throw new Error(
          'Chat session not initialized, call init() before sendMessage'
        );

      const { stream } = opts;

      if (stream) {
        const result = await chat.sendMessageStream(message);

        return async (callback: HandleStream) => {
          for await (const chunk of result.stream) {
            callback(chunk.text());
          }
        };
      } else {
        const result = await chat.sendMessage(message);
        return result.response.text();
      }
    }

    return {
      chat,
      init,
      sendMessage,
      getHistory,
    };
  }
}

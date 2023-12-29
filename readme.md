# Telegram AI Chat Bot

## 说明

该 Telegram Bot 可以与生成式 AI 对话, 每个人都有独立的上下文.

> 当前模型: [Google Gemini-pro](https://ai.google.dev/)

## 使用

在使用前, 请确保安装了 `nodejs` 以及 `pnpm`.

并在 https://makersuite.google.com/app/apikey 获取 Gemini-pro 的 apikey

### 安装

1. 克隆该仓库

   ```shell
   git clone https://github.com/Rewrite0/TG_AI_Bot
   ```

2. 安装依赖

   ```shell
   pnpm i
   ```

3. 更改配置

   将目录下的 `.env.example` 复制一份并改名为 `.env`, 然后根据注释填写相关信息.

4. 启动

   ```shell
   pnpm pm2:start
   ```

5. 管理

   ```shell
   pnpm pm2:ls // 查看进程
   pnpm pm2:del // 删除进程
   pnpm pm2:logs // 查看 log
   ```

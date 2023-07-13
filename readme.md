# Bard Bot

## 说明

该 Telegram Bot 可以在私聊以及群聊中使用, 通过该 bot 可以与 [Google Bard](https://bard.google.com/) 进行对话, 并且每个人都有独立的上下文.

## 使用

请在使用前, 确保安装了 `nodejs` 以及 `pnpm`

### 安装

1. 克隆该仓库

   ```shell
   git clone https://github.com/Rewrite0/BardBot
   ```

2. 安装依赖

   ```shell
   pnpm i
   ```

3. 更改配置
   将目录下的 `config.example.ts` 复制一份并改名为 `config.ts`.
   然后按照 [type 文件](./types/config.ts) 的注释, 在 `config.ts` 中填写相关信息.

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

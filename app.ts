import { runBot } from '@/bot';
import { BardInit } from '@/core/bard';
import { setProxyEnv } from '@/utils/proxy';

setProxyEnv();

(async () => {
  await BardInit();
  runBot();
})();

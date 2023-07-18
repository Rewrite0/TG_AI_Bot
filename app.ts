import { runBot } from '@/bot';
import { setProxyEnv } from '@/utils/proxy';

setProxyEnv();
runBot();

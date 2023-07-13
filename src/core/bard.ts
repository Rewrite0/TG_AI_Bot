import Bard from 'bard-ai';
import { config } from '@config';

async function BardInit() {
  const cookies = config.bardCookie;
  await Bard.init(cookies);
  console.log('Bard init');
}

export { BardInit, Bard };

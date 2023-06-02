import { GoogleTranslatorTokenFree } from '@translate-tools/core/translators/GoogleTranslator';
import { config } from '@config';

process.env.http_proxy = config.proxy;
process.env.https_proxy = config.proxy;
process.env.all_proxy = config.proxy;

const translator = new GoogleTranslatorTokenFree({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
  },
});

export async function en2zh(text: string) {
  return translator.translate(text, 'en', 'zh');
}

export function zh2en(text: string) {
  return translator.translate(text, 'zh', 'en');
}

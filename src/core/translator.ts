import { GoogleTranslatorTokenFree } from '@translate-tools/core/translators/GoogleTranslator';

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

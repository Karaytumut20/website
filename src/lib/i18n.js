import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'tr'];

export default getRequestConfig(async ({locale}) => {
  // Gelen dil desteklenmiyorsa 404
  if (!locales.includes(locale)) notFound();

  return {
    // DÜZELTME: '../../' yerine '../' kullanıyoruz çünkü src/lib içindeyiz.
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
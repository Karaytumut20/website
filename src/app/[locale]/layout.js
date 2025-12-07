'use client';

import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import useScroll from '@/hooks/useScroll'; // Smooth scroll başlatıcı
import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer'; // Footer'ı sonra ekleriz

export default function LocaleLayout({ children, params: { locale } }) {
  // Smooth scroll'u başlat
  useScroll();

  // Dil dosyasını yükle (Server Component olmadığı için burada import ediyoruz)
  // Not: Normalde server component'te await import yapardık ama 'use client' kullandığımız için
  // ve Lenis client-side olduğu için burada require veya provider kullanıyoruz.
  // Basitlik adına mesajları layout'a prop olarak geçmek yerine
  // page.js seviyesinde de alabiliriz ama standart Next-Intl yapısı için:
  
  let messages;
  try {
    messages = require(`../../messages/${locale}.json`);
  } catch (error) {
    messages = require(`../../messages/en.json`);
  }

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          
          <Header />
          
          <main className="relative z-10 min-h-screen">
            {children}
          </main>

          {/* <Footer /> */}
          
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
'use client';

import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import useScroll from '@/hooks/useScroll';
import Header from '@/components/layout/Header';
import Preloader from '@/components/animation/Preloader';

export default function LocaleLayout({ children, params: { locale } }) {
  useScroll(); // Smooth scroll

  // Hata önleme amaçlı basit mesaj yükleme
  let messages;
  try { messages = require(`../../messages/${locale}.json`); } 
  catch (error) { messages = require(`../../messages/en.json`); }

  return (
    <html lang={locale}>
      <body className="antialiased bg-[#e3e3db] overflow-hidden"> {/* Başlangıçta scroll kapalı */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          
          <Preloader />
          <Header />
          
          <main className="relative z-10 min-h-screen">
            {children}
          </main>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
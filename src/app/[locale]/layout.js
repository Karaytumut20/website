'use client';

import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ViewTransitions } from 'next-view-transitions'; // EKLENDİ
import useScroll from '@/hooks/useScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer'; // EKLENDİ
import Preloader from '@/components/animation/Preloader';

export default function LocaleLayout({ children, params: { locale } }) {
  useScroll();

  let messages;
  try { messages = require(`../../messages/${locale}.json`); } 
  catch (error) { messages = require(`../../messages/en.json`); }

  return (
    <ViewTransitions> {/* Sayfa Geçişlerini Sarmala */}
      <html lang={locale}>
        <body className="antialiased bg-[#e3e3db]">
          <NextIntlClientProvider locale={locale} messages={messages}>
            
            <Preloader />
            <Header />
            
            <main className="relative z-10 min-h-screen">
              {children}
            </main>

            <Footer /> {/* Footer Eklendi */}

          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
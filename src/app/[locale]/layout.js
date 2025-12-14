'use client';

import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import useScroll from '@/hooks/useScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/animation/Preloader';
import PageTransition from '@/components/layout/PageTransition'; // Yeni import
import { TransitionProvider } from '@/context/TransitionContext'; // Yeni import

export default function LocaleLayout({ children, params: { locale } }) {
  useScroll(); // Lenis burada çalışmaya devam ediyor

  let messages;
  try { messages = require(`../../messages/${locale}.json`); } 
  catch (error) { messages = require(`../../messages/en.json`); }

  return (
    <html lang={locale}>
      <body className="antialiased bg-[#e3e3db] text-black">
        <NextIntlClientProvider locale={locale} messages={messages}>
          
          <TransitionProvider> {/* Context tüm app'i sarmalı */}
            
            <Preloader />
            <PageTransition /> {/* Her sayfa değişiminde çalışacak perde */}
            
            <Header />
            
            <main className="relative z-10 min-h-screen">
              {children}
            </main>

            <Footer />

          </TransitionProvider>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
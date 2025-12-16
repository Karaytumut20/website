'use client';

import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import useScroll from '@/hooks/useScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/animation/Preloader';
import PageTransition from '@/components/layout/PageTransition'; 
import NavigationLoader from '@/components/layout/NavigationLoader'; // YENİ EKLENDİ
import { TransitionProvider } from '@/context/TransitionContext'; 

export default function LocaleLayout({ children, params: { locale } }) {
  useScroll(); 
  const pathname = usePathname();

  let messages;
  try { messages = require(`../../messages/${locale}.json`); } 
  catch (error) { messages = require(`../../messages/en.json`); }

  // '/project/' URL'indeyiz ama '/projects' değilsek detay sayfasıdır.
  const isProjectDetailPage = pathname.includes('/project/') && !pathname.includes('/projects');

  return (
    <html lang={locale}>
      <body className="antialiased bg-[#e3e3db] text-black">
        <NextIntlClientProvider locale={locale} messages={messages}>
          
          <TransitionProvider>
            {/* 1. İlk Açılış Preloader'ı (Sadece F5'te çalışır) */}
            <Preloader />
            
            {/* 2. İlk Açılış Geçişi (Preloader ile entegre) */}
            <PageTransition />
            
            {/* 3. Sayfalar Arası Geçiş Loader'ı (YENİ - Sadece navigasyonda çalışır) */}
            <NavigationLoader />
            
            <Header />
            
            <main className="relative z-10 min-h-screen">
              {children}
            </main>

            {/* Proje detay sayfalarında Global Footer GİZLENİR */}
            {!isProjectDetailPage && <Footer />}

          </TransitionProvider>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
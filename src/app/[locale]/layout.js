'use client';

import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import useScroll from '@/hooks/useScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/animation/Preloader';
import PageTransition from '@/components/layout/PageTransition'; 
import NavigationLoader from '@/components/layout/NavigationLoader';
import { TransitionProvider } from '@/context/TransitionContext'; 
import localFont from 'next/font/local';

// 1. KÜÇÜK YAZILAR (GÖVDE) İÇİN: Neue Montreal
const neueMontreal = localFont({
  src: '../../../src/app/fonts/NeueMontreal-Regular.otf',
  variable: '--font-neue-montreal',
  display: 'swap',
});

// 2. BÜYÜK BAŞLIKLAR İÇİN: Apercu
const apercu = localFont({
  src: '../../../src/app/fonts/apercu_regular_pro.otf',
  variable: '--font-apercu',
  display: 'swap',
});

export default function LocaleLayout({ children, params: { locale } }) {
  useScroll(); 
  const pathname = usePathname();

  let messages;
  try { messages = require(`../../messages/${locale}.json`); } 
  catch (error) { messages = require(`../../messages/en.json`); }

  const isProjectDetailPage = pathname.includes('/project/') && !pathname.includes('/projects');

  return (
    <html lang={locale}>
      {/* font-sans sınıfı Tailwind ayarımızla artık Neue Montreal'i işaret ediyor.
         Böylece tüm site varsayılan olarak Neue Montreal (küçük yazı fontu) ile başlar.
      */}
      <body className={`${neueMontreal.variable} ${apercu.variable} antialiased bg-[#e3e3db] text-black font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          
          <TransitionProvider>
            <Preloader />
            <PageTransition />
            <NavigationLoader />
            
            <Header />
            
            <main className="relative z-10 min-h-screen">
              {children}
            </main>

            {!isProjectDetailPage && <Footer />}

          </TransitionProvider>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
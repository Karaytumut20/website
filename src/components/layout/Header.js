'use client';
import { useState, useEffect, useRef } from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import OverlayMenu from './OverlayMenu';
import { gsap } from 'gsap';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const headerRef = useRef(null);
  const secondaryInfoRef = useRef(null);

  // Saat Güncelleme
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Efekti: Aşağı inince detaylar silinir
  useEffect(() => {
    const handleScroll = () => {
      if (!secondaryInfoRef.current) return;
      const scrollY = window.scrollY;
      
      // İlk 100px scroll edildiğinde opaklık 1'den 0'a düşer
      const opacity = Math.max(0, 1 - scrollY / 100);
      
      gsap.to(secondaryInfoRef.current, {
        opacity: opacity,
        y: scrollY > 100 ? -20 : 0, // Hafif yukarı kayboluş
        duration: 0.5,
        ease: "power2.out",
        overwrite: true
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        ref={headerRef}
        // DÜZELTME 1: Padding değerleri diğer sayfalarla (Projects, About) eşitlendi (px-6 md:px-12).
        // Bu sayede logo ve menü, aşağıdaki içerikle aynı hizada başlar.
        className="fixed top-0 left-0 w-full h-auto z-[100] mix-blend-difference pointer-events-none px-6 py-6 md:px-12 md:py-8"
      >
        {/* DÜZELTME 2: 12'li Grid Yapısı Kuruldu */}
        {/* Logo sol 6 sütuna, Menü sağ 6 sütuna yerleşir */}
        <div className="grid items-start w-full grid-cols-2 md:grid-cols-12">
          
          {/* SOL TARAFI (LOGO) - COL-SPAN-6 */}
          {/* md:col-span-6 ile gridin sol yarısını kaplar */}
          <div className="flex justify-start col-span-1 pointer-events-auto md:col-span-6">
            <TransitionLink 
              href="/" 
              className="block overflow-hidden group"
            >
              <div className="relative font-heading text-xl md:text-2xl font-bold uppercase tracking-tight leading-none text-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                <span>Umut</span>
                <span className="absolute left-0 top-full">Umut</span>
              </div>
            </TransitionLink>
          </div>

          {/* SAĞ TARAFI (MENU) - COL-SPAN-6 */}
          {/* md:col-span-6 ile gridin sağ yarısını kaplar ve sağa yaslanır (justify-end) */}
          <div className="flex justify-end col-span-1 pointer-events-auto md:col-span-6">
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="relative flex flex-col items-end justify-start overflow-hidden cursor-pointer group"
             >
                {/* MENU TEXT - ELEVATOR EFFECT */}
                <div className="relative font-mono text-xs md:text-sm font-medium uppercase tracking-widest text-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    <span className="block">{isMenuOpen ? 'Close' : 'Menu'}</span>
                    <span className="absolute right-0 block top-full">{isMenuOpen ? 'Close' : 'Menu'}</span>
                </div>
                
                {/* ALT ÇİZGİ ANIMASYONU */}
                <span className="w-full h-[1px] bg-white mt-1 transform origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"></span>
             </button>
          </div>

          {/* İKİNCİL BİLGİLER (SCROLL İLE KAYBOLUR) */}
          {/* Bunları grid'in dışına, absolute olarak koyuyoruz ki grid yapısını bozmadan aşağıda dursunlar. */}
          {/* Ancak hizaları yine px-6 md:px-12 padding'i sayesinde tutar. */}
          <div 
            ref={secondaryInfoRef}
            className="absolute top-16 left-0 w-full px-6 md:px-12 flex justify-between items-start text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60 pointer-events-none"
          >
            {/* SOL ALT: KONUM / ROL */}
            <div className="flex flex-col gap-1">
               <span className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                 Available for freelance
               </span>
               <span className="opacity-50">Istanbul, TR</span>
            </div>

            {/* SAĞ ALT: SAAT */}
            <div className="text-right opacity-80">
               <span>{time} LCL</span>
            </div>
          </div>

        </div>
      </header>
      
      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
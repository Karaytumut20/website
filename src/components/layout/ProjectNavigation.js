'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP Plugin Kaydı
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Roma Rakamı Dönüştürücü
const toRoman = (num) => {
  const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let roman = '';
  for (let i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

export default function ProjectNavigation({ project, nextProject, prevProject, allProjects }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // --- Scroll Progress Mantığı ---
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: (self) => {
        const bars = document.querySelectorAll('.nav-progress-fill');
        bars.forEach(bar => {
            gsap.set(bar, { width: `${self.progress * 100}%` });
        });
      }
    });
    return () => trigger.kill();
  }, []);

  // --- Menü Açılış Animasyonu ---
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const currentIndex = allProjects.findIndex(p => p.id === project.id) + 1;

  return (
    <>
      {/* GLOBAL CONTAINER 
         Tüm sayfayı kaplar ama tıklamaları engellemez (pointer-events-none).
         Sadece butonlar tıklanabilir olur.
      */}
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-between p-4 md:p-8">

        {/* ---------------- DESKTOP NAVBAR (Top) ---------------- */}
        <nav className="relative items-start justify-between hidden w-full md:flex">
          
          {/* Sol: Logo ve Hamburger */}
          <div className="z-50 flex gap-4 pointer-events-auto">
            <Link href="/" className="w-12 h-12 bg-[#1c1c1c] text-white flex items-center justify-center font-serif text-xl shadow-md transition-transform hover:scale-105">
              MC
            </Link>
            {/* Hamburger Menü (İşlevsiz görsel) */}
            <button className="flex items-center justify-center w-12 h-12 text-black transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
              <div className="flex flex-col gap-[5px]">
                <span className="w-5 h-px bg-black"></span>
                <span className="w-5 h-px bg-black"></span>
              </div>
            </button>
          </div>

          {/* Orta: Navigasyon Kontrolleri (Absolute Center) */}
          {/* Absolute ile tam ortaya sabitliyoruz, böylece soldaki öğeler merkezi kaydırmaz */}
          <div className="absolute top-0 z-40 flex items-center gap-3 -translate-x-1/2 pointer-events-auto left-1/2">
            
            {/* Previous Button */}
            <Link 
              href={`/project/${prevProject.slug}`} 
              className="flex items-center justify-center h-12 px-5 font-sans text-sm font-medium text-black transition-all bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:px-7 whitespace-nowrap"
            >
               ← Prev
            </Link>

            {/* Portal Button (Progress Bar & Dropdown) */}
            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative h-12 min-w-[260px] pl-6 pr-5 bg-[#f5f5f5] rounded-full flex items-center justify-between overflow-hidden border border-gray-200 shadow-inner group transition-all hover:border-gray-300"
                >
                    {/* Arkaplan Progress Fill */}
                    <div className="nav-progress-fill absolute top-0 left-0 h-full bg-[#e0e0e0] w-0 transition-none pointer-events-none" />
                    
                    {/* İçerik */}
                    <div className="relative z-10 flex items-center justify-between w-full gap-4 text-black">
                        <span className="w-8 font-serif text-lg font-medium text-left opacity-50">{toRoman(currentIndex)}</span>
                        
                        {/* Title - Truncate ile uzun isimleri kes */}
                        <span className="font-serif text-lg tracking-tight truncate max-w-[150px] text-center">
                            {project.title}
                        </span>
                        
                        <span className={`transform transition-transform text-[10px] opacity-40 ml-1 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                </button>

                {/* Desktop Dropdown Menü */}
                {isOpen && (
                    <div ref={menuRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[300px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-6 max-h-[60vh] overflow-y-auto no-scrollbar text-black text-center">
                        {allProjects.map((p, i) => (
                            <Link 
                                key={p.id} 
                                href={`/project/${p.slug}`}
                                className="block py-2 group"
                            >
                                <span className={`font-serif text-xl transition-all block ${p.id === project.id ? 'opacity-100 font-medium scale-105' : 'opacity-40 group-hover:opacity-80'}`}>
                                    {p.title}
                                    <sup className="ml-1 text-[9px] opacity-60 align-top">{toRoman(i + 1)}</sup>
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Next Button */}
            <Link 
              href={`/project/${nextProject.slug}`} 
              className="flex items-center justify-center h-12 px-5 font-sans text-sm font-medium text-black transition-all bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:px-7 whitespace-nowrap"
            >
               Next →
            </Link>
          </div>

          {/* Sağ taraf boşluk (Denge için) */}
          <div className="hidden w-24 md:block"></div>
        </nav>


        {/* ---------------- MOBILE NAVBAR (Bottom Fixed) ---------------- */}
        {/* Mobilde en alta sabitlenen alan */}
        <div className="flex justify-center w-full pointer-events-auto md:hidden pb-safe-offset"> 
        {/* pb-safe-offset: iPhone home bar için (eğer tailwind configde varsa, yoksa pb-4 yeterli) */}
          
          <div className="flex items-center w-full max-w-md gap-2 px-2">
            
            {/* Prev (Compact) */}
            <Link href={`/project/${prevProject.slug}`} className="flex items-center justify-center flex-shrink-0 text-lg text-black transition-transform bg-white border border-gray-200 rounded-full shadow-lg w-11 h-11 active:scale-95">
               ←
            </Link>

            {/* Portal Button Mobile (Flexible Width) */}
            <div className="relative flex-1 min-w-0"> {/* min-w-0: Flex item'ın taşmasını engeller */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex items-center justify-between w-full px-4 overflow-hidden border rounded-full shadow-lg h-11 bg-white/90 backdrop-blur-md border-white/20"
                >
                    {/* Mobile Progress Fill */}
                    <div className="absolute top-0 left-0 w-0 h-full pointer-events-none nav-progress-fill bg-black/5" />
                    
                    {/* İçerik */}
                    <div className="relative z-10 flex items-center w-full gap-2 overflow-hidden text-black">
                        <span className="font-mono text-[10px] opacity-50 flex-shrink-0">{toRoman(currentIndex)}</span>
                        
                        {/* Proje Başlığı (Sığmazsa ... koyar) */}
                        <span className="flex-1 font-serif text-base text-center truncate">
                            {project.title}
                        </span>
                        
                        <span className={`transform transition-transform text-[8px] text-black/40 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>▲</span>
                    </div>
                </button>

                 {/* Mobile Menü Popup (Yukarı açılır) */}
                 {isOpen && (
                    <div ref={menuRef} className="absolute bottom-full left-0 w-full mb-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-6 max-h-[50vh] overflow-y-auto text-black z-50">
                        {allProjects.map((p, i) => (
                            <Link 
                                key={p.id} 
                                href={`/project/${p.slug}`}
                                className="flex flex-col items-center py-2.5 text-center active:bg-gray-50"
                            >
                                <span className={`font-serif text-xl transition-all ${p.id === project.id ? 'text-black font-medium' : 'text-gray-400'}`}>
                                    {p.title}
                                    <sup className="ml-1 text-[9px] opacity-60">{toRoman(i + 1)}</sup>
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Next (Compact) */}
            <Link href={`/project/${nextProject.slug}`} className="flex items-center justify-center flex-shrink-0 text-lg text-black transition-transform bg-white border border-gray-200 rounded-full shadow-lg w-11 h-11 active:scale-95">
               →
            </Link>

          </div>
        </div>

      </div>
    </>
  );
}
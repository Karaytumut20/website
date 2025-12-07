'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP Plugin Kaydı (SSR hatasını önlemek için kontrol)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Roma Rakamı Dönüştürücü (Görseldeki I, II, III, IV... stili için)
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
  const progressRef = useRef(null);
  const menuRef = useRef(null);

  // --- Scroll Progress Mantığı ---
  useEffect(() => {
    // Sayfanın scroll durumuna göre progress bar'ı güncelle
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: (self) => {
        // Hem masaüstü hem mobil progress barları günceller
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
      {/* ---------------- DESKTOP NAVBAR (Top) ---------------- */}
      <nav className="fixed top-0 left-0 z-50 flex items-start justify-between w-full px-4 py-6 text-white pointer-events-none md:px-10 mix-blend-difference md:mix-blend-normal md:text-black">
        
        {/* Sol: Logo ve Hamburger */}
        <div className="flex gap-4 pointer-events-auto">
          {/* Logo Kutusu */}
          <Link href="/" className="w-12 h-12 bg-[#1c1c1c] text-white flex items-center justify-center font-serif text-xl shadow-md">
            MC
          </Link>
          {/* Hamburger Menü (OverlayMenu'yu tetikler - Harici bağlanmalı, şimdilik görsel) */}
          <button className="flex items-center justify-center w-12 h-12 text-black transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
            <div className="flex flex-col gap-[5px]">
              <span className="w-5 h-px bg-black"></span>
              <span className="w-5 h-px bg-black"></span>
            </div>
          </button>
        </div>

        {/* Orta/Sağ: Navigasyon Kontrolleri (Sadece Desktop) */}
        <div className="items-center hidden gap-3 pointer-events-auto md:flex">
            {/* Previous Button */}
            <Link href={`/project/${prevProject.slug}`} className="flex items-center justify-center h-12 px-6 font-sans text-sm text-black transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
               ← Previous
            </Link>

            {/* Portal Button (Progress Bar & Dropdown) */}
            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative h-12 min-w-[240px] pl-6 pr-4 bg-[#f0f0f0] rounded-full flex items-center justify-between overflow-hidden border border-gray-200 shadow-inner group"
                >
                    {/* Arkaplan Progress Fill (Gri Doluluk) */}
                    <div className="nav-progress-fill absolute top-0 left-0 h-full bg-[#dcdcdc] w-0 transition-none pointer-events-none" />
                    
                    {/* İçerik */}
                    <div className="relative z-10 flex items-center justify-between w-full text-black">
                        <span className="w-8 font-serif text-lg font-medium text-left opacity-60">{toRoman(currentIndex)}</span>
                        <span className="font-serif text-xl tracking-tight">{project.title}</span>
                        <span className={`transform transition-transform text-xs ml-2 opacity-50 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </div>
                </button>

                {/* Desktop Dropdown Menü */}
                {isOpen && (
                    <div ref={menuRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 max-h-[60vh] overflow-y-auto no-scrollbar text-black">
                        {allProjects.map((p, i) => (
                            <Link 
                                key={p.id} 
                                href={`/project/${p.slug}`}
                                className="relative flex flex-col items-center py-1 group"
                            >
                                <span className={`font-serif text-2xl transition-all ${p.id === project.id ? 'opacity-100 scale-110 font-medium' : 'opacity-40 group-hover:opacity-80'}`}>
                                    {p.title}
                                    <sup className="ml-1 text-[10px] align-top opacity-60">{toRoman(i + 1)}</sup>
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Next Button */}
            <Link href={`/project/${nextProject.slug}`} className="flex items-center justify-center h-12 px-6 font-sans text-sm text-black transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
               Next →
            </Link>
        </div>

        {/* Sağ taraf boşluk dengeleyici */}
        <div className="hidden w-12 md:block"></div>
      </nav>


      {/* ---------------- MOBILE NAVBAR (Bottom Fixed) ---------------- */}
      <div className="fixed left-0 z-50 flex justify-center w-full px-4 pointer-events-none md:hidden bottom-8">
         <div className="flex items-center gap-3 pointer-events-auto">
            
            {/* Prev (Yuvarlak) */}
            <Link href={`/project/${prevProject.slug}`} className="flex items-center justify-center w-12 h-12 text-xl text-black bg-white border border-gray-100 rounded-full shadow-lg">
               ←
            </Link>

            {/* Portal Button Mobile */}
            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative h-12 pl-5 pr-4 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center gap-3 overflow-hidden border border-white/20 shadow-lg min-w-[180px]"
                >
                    {/* Mobile Progress Fill */}
                    <div className="absolute top-0 left-0 w-0 h-full pointer-events-none nav-progress-fill bg-black/10" />
                    
                    <div className="relative z-10 flex items-baseline gap-2 text-black">
                        <span className="font-mono text-xs opacity-60">{toRoman(currentIndex)}</span>
                        <span className="font-serif text-xl">{project.title}</span>
                    </div>
                    <span className={`relative z-10 transform transition-transform text-[10px] text-black/50 ml-1 ${isOpen ? 'rotate-180' : ''}`}>▲</span>
                </button>

                 {/* Mobile Menü Popup (Yukarı açılır) */}
                 {isOpen && (
                    <div ref={menuRef} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-[85vw] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 py-8 max-h-[50vh] overflow-y-auto text-black">
                        {allProjects.map((p, i) => (
                            <Link 
                                key={p.id} 
                                href={`/project/${p.slug}`}
                                className="flex flex-col items-center py-2 text-center"
                            >
                                <span className={`font-serif text-3xl transition-all ${p.id === project.id ? 'text-black scale-105' : 'text-gray-300'}`}>
                                    {p.title}
                                    <sup className="ml-1 text-xs opacity-60">{toRoman(i + 1)}</sup>
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Next (Yuvarlak) */}
            <Link href={`/project/${nextProject.slug}`} className="flex items-center justify-center w-12 h-12 text-xl text-black bg-white border border-gray-100 rounded-full shadow-lg">
               →
            </Link>

         </div>
      </div>
    </>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function OverlayMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  
  // Görseldeki menü verileri
  const mainLinks = [
    { label: "Timepieces", path: "/projects" },
    { label: "R&D", path: "/about" },
    { label: "Our Ethos", path: "/contact" }
  ];

  const quickLinks = [
    { label: "EXPLORE ACF-01", path: "/project/innovate-2024" },
    { label: "PARTNERS", path: "/about" },
    { label: "CONTACT", path: "/contact" }
  ];

  const researchLinks = [
    { label: "ACF-02 DESIGN", path: "/projects" },
    { label: "ACF-01 FRAME", path: "/projects" },
    { label: "CALIBER AMB* TESTS", path: "/projects" },
    { label: "PROTOTYPES #01 - #02", path: "/projects" }
  ];

  useEffect(() => {
    if (isOpen) {
      // 1. Menü görünür olsun (opacity 0'dan başla)
      gsap.set(menuRef.current, { visibility: 'visible', opacity: 0 });
      
      // 2. Açılış Animasyonu
      const tl = gsap.timeline();
      
      tl.to(menuRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
      .fromTo(contentRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        "-=0.3"
      );

    } else {
      // Kapanış Animasyonu
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: 'hidden' });
        }
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={menuRef} 
      className="fixed inset-0 bg-white z-[90] text-black invisible opacity-0 flex flex-col justify-between"
    >
      {/* --- Üst Header (Logo ve Kapatma Butonu) --- */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 md:p-10">
        {/* Sol Üst Logo (Tasarım'daki NV logosu temsili) */}
        <div className="w-10 h-10">
           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
             <path d="M2 20V4L8 14L14 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
           </svg>
        </div>

        {/* Sağ Üst Kapatma Butonu */}
        <button onClick={onClose} className="p-2 group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:rotate-90">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* --- Ana İçerik Grid Yapısı --- */}
      <div ref={contentRef} className="grid flex-1 w-full grid-cols-1 gap-10 px-6 py-10 overflow-y-auto md:px-10 md:grid-cols-12">
        
        {/* Sütun 1: Büyük Başlıklar (Menu) */}
        <div className="flex flex-col pt-10 md:col-span-6">
          <span className="mb-8 font-mono text-xs tracking-widest text-gray-400 uppercase">Menu</span>
          <div className="flex flex-col gap-4">
            {mainLinks.map((item, i) => (
              <Link 
                key={i} 
                href={item.path} 
                onClick={onClose}
                className="flex items-center justify-between text-5xl font-bold tracking-tight transition-opacity group md:text-7xl hover:opacity-50"
              >
                <span>{item.label}</span>
                <span className="transition-all duration-300 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sütun 2: Quick Links */}
        <div className="flex flex-col pt-10 md:col-span-3">
          <span className="mb-8 font-mono text-xs tracking-widest text-gray-400 uppercase">Quick Links</span>
          <div className="flex flex-col">
            {quickLinks.map((item, i) => (
              <Link 
                key={i} 
                href={item.path} 
                onClick={onClose}
                className="py-4 font-mono text-sm tracking-wide uppercase transition-all border-b border-gray-200 hover:pl-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Sütun 3: Latest Research */}
        <div className="flex flex-col pt-10 md:col-span-3">
          <span className="mb-8 font-mono text-xs tracking-widest text-gray-400 uppercase">Latest Research</span>
          <div className="flex flex-col">
            {researchLinks.map((item, i) => (
              <Link 
                key={i} 
                href={item.path} 
                onClick={onClose}
                className="py-4 font-mono text-sm tracking-wide uppercase transition-all border-b border-gray-200 hover:pl-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* --- Footer (Sosyal Medya Hapları) --- */}
      <div className="w-full px-6 py-10 border-t border-gray-100 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          <a href="#" className="flex items-center justify-between w-full gap-4 px-6 py-3 transition-colors bg-gray-100 rounded-full md:w-auto group hover:bg-black hover:text-white">
            <span className="font-mono text-xs opacity-50">1.0</span>
            <span className="font-mono text-xs tracking-widest uppercase">Instagram</span>
          </a>

          <span className="hidden text-2xl font-light text-gray-300 md:block">/</span>

          <a href="#" className="flex items-center justify-between w-full gap-4 px-6 py-3 transition-colors bg-gray-100 rounded-full md:w-auto group hover:bg-black hover:text-white">
            <span className="font-mono text-xs opacity-50">2.0</span>
            <span className="font-mono text-xs tracking-widest uppercase">LinkedIn</span>
          </a>

          <span className="hidden text-2xl font-light text-gray-300 md:block">/</span>

          <a href="#" className="flex items-center justify-between w-full gap-4 px-6 py-3 transition-colors bg-gray-100 rounded-full md:w-auto group hover:bg-black hover:text-white">
            <span className="font-mono text-xs opacity-50">3.0</span>
            <span className="font-mono text-xs tracking-widest uppercase">Pinterest</span>
          </a>

        </div>
      </div>

    </div>
  );
}
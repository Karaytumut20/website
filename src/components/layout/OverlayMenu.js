'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { menuItems } from '@/lib/data';

export default function OverlayMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      // Menü Açılış Animasyonu (Yukarıdan aşağı)
      gsap.to(menuRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      
      // Linklerin animasyonu (Tek tek belirme)
      gsap.fromTo(linksRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: 'power2.out' }
      );
    } else {
      // Menü Kapanış Animasyonu (Yukarı geri git)
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={menuRef} 
      className="fixed inset-0 bg-[#141516] z-[90] flex flex-col justify-center items-center text-white -translate-y-full"
    >
      {/* Kapatma Butonu */}
      <button 
        onClick={onClose}
        className="absolute p-4 text-sm tracking-widest uppercase transition-opacity top-6 right-6 mix-blend-difference hover:opacity-50"
      >
        Close [X]
      </button>

      {/* Menü Linkleri */}
      <nav className="flex flex-col gap-2 text-center">
        {menuItems.map((item, index) => (
          <div key={index} className="overflow-hidden">
            <Link 
              href={item.path} 
              className="block text-[10vw] leading-none font-bold uppercase tracking-tighter hover:text-gray-400 transition-colors"
              onClick={onClose} 
              ref={el => linksRef.current[index] = el}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </nav>

      {/* Alt Bilgi (Footer) */}
      <div className="absolute flex gap-10 text-xs tracking-widest uppercase bottom-10 opacity-30">
        <span>Instagram</span>
        <span>LinkedIn</span>
        <span>Twitter</span>
      </div>
    </div>
  );
}
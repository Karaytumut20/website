'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function OverlayMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  
  // Güncel ve Doğru Link Yapısı
  const mainLinks = [
    { id: "01", label: "Home", path: "/" },
    { id: "02", label: "Work", path: "/projects" },
    { id: "03", label: "Studio", path: "/about" },
    { id: "04", label: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    { label: "Instagram", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Behance", url: "#" }
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.set(menuRef.current, { visibility: 'visible', opacity: 0 });
      
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
      className="fixed inset-0 bg-[#0a0a0a] z-[90] text-white invisible opacity-0 flex flex-col"
    >
      {/* İçerik */}
      <div className="flex flex-col justify-center flex-1 w-full h-full px-6 md:px-20">
        <div ref={contentRef} className="flex flex-col gap-2">
            {mainLinks.map((item) => (
              <Link 
                key={item.id} 
                href={item.path} 
                onClick={onClose}
                className="flex items-baseline gap-4 py-6 transition-colors border-b group md:gap-10 border-white/10 md:py-8 hover:border-white"
              >
                <span className="font-mono text-xs transition-opacity md:text-sm opacity-40 group-hover:opacity-100">
                    ({item.id})
                </span>
                <span className="text-5xl font-bold leading-none tracking-tighter uppercase transition-transform duration-500 ease-out md:text-8xl group-hover:translate-x-4">
                    {item.label}
                </span>
              </Link>
            ))}
        </div>
      </div>

      {/* Alt Footer */}
      <div className="flex items-end justify-between w-full px-6 py-10 border-t md:px-20 border-white/10">
         <div className="flex gap-6">
            {socialLinks.map((social, i) => (
                <a key={i} href={social.url} className="font-mono text-xs tracking-widest uppercase transition-opacity opacity-40 hover:opacity-100">
                    {social.label}
                </a>
            ))}
         </div>
         <span className="text-[10px] font-mono opacity-20 uppercase">Based in Worldwide</span>
      </div>

    </div>
  );
}
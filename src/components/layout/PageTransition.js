'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTransitionContext } from '@/context/TransitionContext';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const { isTransitioning, endTransition } = useTransitionContext();
  const overlayRef = useRef(null);
  const pathname = usePathname(); // Sayfa değiştiğini algılamak için

  // 1. Senaryo: Linke tıklandı, çıkış animasyonu (Perde Kapanır)
  useEffect(() => {
    if (isTransitioning) {
      gsap.to(overlayRef.current, {
        scaleY: 1,
        transformOrigin: 'bottom',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [isTransitioning]);

  // 2. Senaryo: Yeni sayfa yüklendi (Pathname değişti), giriş animasyonu (Perde Açılır)
  useEffect(() => {
    // Yeni sayfaya gelindiğinde scroll en üste atılmalı
    window.scrollTo(0, 0);

    // Animasyon (Perde yukarı çekilir)
    const tl = gsap.timeline({
        onComplete: () => {
            endTransition(); // Context'e işlemin bittiğini bildir
        }
    });

    tl.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.2 // Hafif bir bekleme (sayfanın render olması için)
    });

  }, [pathname, endTransition]); // Pathname her değiştiğinde çalışır

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-[#0a0a0a] pointer-events-none"
      style={{ transform: 'scaleY(0)' }} // Başlangıçta gizli
    />
  );
}
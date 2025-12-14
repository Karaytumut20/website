'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function ProjectScrollPager({ nextSlug, prevSlug }) {
  const router = useRouter();
  const pathname = usePathname();

  const endRef = useRef(null);
  const startRef = useRef(null);

  const lockRef = useRef(false);

  // Route değişince kilidi sıfırla
  useEffect(() => {
    lockRef.current = false;
  }, [pathname]);

  useEffect(() => {
    if (!endRef.current || !startRef.current) return;

    const goNext = () => {
      if (lockRef.current) return;
      if (!nextSlug) return;
      lockRef.current = true;
      stEnd.disable(); // ✅ kritik: bir kez çalışınca trigger kapanır
      router.push(`/project/${nextSlug}`);
    };

    const goPrev = () => {
      if (lockRef.current) return;
      if (!prevSlug) return;
      lockRef.current = true;
      stStart.disable();
      router.push(`/project/${prevSlug}`);
    };

    // Sayfanın altına gelince NEXT
    const stEnd = ScrollTrigger.create({
      trigger: endRef.current,
      start: 'top 90%',     // sentinel görünmeye yaklaşınca
      once: false,          // lock+disable ile kontrol ediyoruz
      onEnter: goNext,
      // momentum bazen back-enter yapabiliyor, güvenlik:
      onEnterBack: () => {},
    });

    // Sayfanın tepesine çıkınca PREV (istersen kaldır)
    const stStart = ScrollTrigger.create({
      trigger: startRef.current,
      start: 'bottom 10%',
      onLeaveBack: goPrev,  // yukarı çıkıp başı geçince prev
    });

    return () => {
      stEnd.kill();
      stStart.kill();
    };
  }, [router, nextSlug, prevSlug]);

  return (
    <>
      {/* Sayfanın en üstüne yakın sentinel */}
      <div ref={startRef} />

      {/* İçerik... */}

      {/* Sayfanın en altına sentinel */}
      <div ref={endRef} className="h-px" />
    </>
  );
}

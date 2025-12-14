'use client';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function useScroll() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });
    
    setLenis(lenisInstance);
    window.lenis = lenisInstance; // ✅ EKLEME: Global erişim için window'a ata

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      window.lenis = null; // ✅ Temizlik
    };
  }, []);

  return lenis;
}
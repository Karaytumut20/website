'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function TextRevealScrub({
  children,
  className = '',
  start = 'top 90%', 
  end = 'bottom 60%', 
}) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    if (!elRef.current) return;

    const el = elRef.current;
    let split = null;
    let ctx = null; // GSAP Context ile temizlik yapacağız

    // Mobilde sürekli resize tetiklenmesin diye genişlik kontrolü
    let lastWidth = window.innerWidth;

    const runSetup = () => {
      // 1. Önce eski split varsa temizle
      if (split) split.revert();

      // 2. Split işlemini yap
      split = new SplitType(el, { 
        types: 'words, chars',
        tagName: 'span' 
      });

      // 3. CSS düzeltmeleri (Mobilde satır kaymasını önler)
      split.words.forEach((w) => {
        w.style.display = 'inline-block';
        w.style.willChange = 'opacity, transform';
      });

      // 4. GSAP Context içine alıyoruz (React Strict Mode ve Cleanup dostu)
      ctx = gsap.context(() => {
        gsap.fromTo(
          split.words, 
          {
            opacity: 0.25,
            y: 8,
            color: "#999"
          },
          {
            opacity: 1,
            y: 0,
            color: "inherit",
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: start,
              end: end,
              scrub: 1, // Mobilde biraz daha yumuşak olması için 1 iyidir
            }
          }
        );
      }, elRef);
    };

    // --- KRİTİK NOKTA 1: FONT BEKLEME ---
    // Font yüklenmeden split yapılırsa, font yüklenince yazı bozulur.
    document.fonts.ready.then(() => {
      runSetup();
    });

    // --- KRİTİK NOKTA 2: MOBİL RESIZE ÇÖZÜMÜ ---
    const handleResize = () => {
      // Sadece GENİŞLİK değiştiyse (telefon yan çevrildiyse) yeniden hesapla.
      // Adres çubuğu inip kalktığında (height değiştiğinde) hesaplama yapma!
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        // Context'i temizle ve yeniden kur
        if (ctx) ctx.revert();
        runSetup();
      } else {
        // Genişlik değişmediyse sadece ScrollTrigger'ı tazele, split'i bozma.
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ctx) ctx.revert(); // GSAP animasyonlarını temizle
      if (split) split.revert(); // HTML'i eski haline getir
    };
  }, [start, end]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
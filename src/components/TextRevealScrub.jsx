'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function TextRevealScrub({
  children,
  className = '',
  // "Başta bir çoğu yüklü gelsin" dediğin için start noktasını erken,
  // end noktasını da kısa tuttum. Böylece çabucak netleşir.
  start = 'top 90%', 
  end = 'bottom 60%', 
}) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    if (!elRef.current) return;

    const el = elRef.current;
    let split = null;
    let anim = null; // Animasyonu referans olarak tutalım

    const buildSplit = () => {
      // Önce temizlik
      if (split) split.revert();
      
      split = new SplitType(el, { types: 'words, chars' }); // chars ile daha akıcı olur

      // Kelimelere stil verelim
      split.words.forEach((w) => {
        w.style.display = 'inline-block';
        w.style.willChange = 'opacity, transform';
      });
      
      // Animasyonu başlatalım
      runAnimation();
    };

    const runAnimation = () => {
      if (!split) return;
      
      // Eski animasyon varsa temizle
      if (anim) anim.kill();

      // --- İŞTE İSTEDİĞİN AYARLAR BURADA ---
      anim = gsap.fromTo(
        split.words, 
        {
          opacity: 0.25,  // Püf Noktası 1: 0 değil, 0.25. Yani başta silik de olsa GÖRÜNÜYOR.
          y: 8,           // Püf Noktası 2: Çok aşağıda değil, sadece hafifçe (8px) aşağıda.
          rotateX: 0,     // 3D dönüşü kapattım veya çok aza indirdim ki "hafif" olsun.
          color: "#999"   // Opsiyonel: Başta gri başlayıp siyaha/beyaza dönebilir.
        },
        {
          opacity: 1,     // Tam netleşiyor
          y: 0,           // Yerine oturuyor
          color: "inherit", // Orijinal rengine dönüyor
          stagger: 0.1,   // Soldan sağa dalga efekti
          ease: 'none',   // Scrub kullanırken genelde 'none' kullanılır (akıcı olsun diye)
          scrollTrigger: {
            trigger: el,
            start: start,
            end: end,
            scrub: 1,     // Püf Noktası 3: Kaydırmaya bağladık. (1 sn yumuşatma payı var)
          }
        }
      );
    };

    buildSplit();

    // Ekran boyutu değişirse yeniden hesapla
    const ro = new ResizeObserver(() => {
      buildSplit();
      ScrollTrigger.refresh();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (anim) anim.kill();
      if (split) split.revert();
    };
  }, [start, end]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
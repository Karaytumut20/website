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
    let ctx = gsap.context(() => {}, elRef); // Boş context başlat
    let resizeTimer = null;
    let lastWidth = window.innerWidth;

    const runSetup = () => {
      // 1. Önceki işlemleri temizle
      if (split) split.revert();
      ctx.revert(); // Eski animasyonları öldür

      // 2. Yeni Split işlemi
      split = new SplitType(el, { 
        types: 'words, chars, lines',
        tagName: 'span' 
      });

      // 3. CSS Ayarları (Mobil performansı için inline-block önemli)
      // DİKKAT: 'will-change' kaldırıldı, mobil çökmesini engeller.
      split.words.forEach((w) => {
        w.style.display = 'inline-block';
      });

      // 4. GSAP Context içine al
      ctx.add(() => {
        gsap.fromTo(
          split.words, 
          {
            opacity: 0.25, // Başlangıç opaklığı
            y: 8,
            color: "#999",
            willChange: 'transform, opacity' // Sadece animasyon sırasında GPU kullan (GSAP yönetir)
          },
          {
            opacity: 1,
            y: 0,
            color: "inherit",
            stagger: 0.1,
            ease: 'none',
            // force3D: true, // Mobilde performansı artırır
            scrollTrigger: {
              trigger: el,
              start: start,
              end: end,
              scrub: 0.5, // Mobilde çok düşük scrub (0.1 gibi) titreme yapabilir, 0.5 iyidir
            }
          }
        );
      });
    };

    // --- FONT YÜKLEME VE TIMEOUT GÜVENCESİ ---
    // Font yüklenirse çalıştır, ama 1sn içinde yüklenmezse yine de çalıştır (Beyaz ekran kalmasın)
    const init = () => {
      document.fonts.ready.then(() => {
        runSetup();
      }).catch(() => {
        // Font hatası olursa yine de çalıştır
        runSetup();
      });
    };

    // 100ms gecikmeli başlat ki DOM tam otursun
    const initialTimer = setTimeout(init, 100);

    // --- MOBİL RESIZE OPTİMİZASYONU (DEBOUNCE) ---
    const handleResize = () => {
      // Sadece genişlik değişiminde çalış
      if (window.innerWidth === lastWidth) return;
      
      lastWidth = window.innerWidth;

      // İşlemi hemen yapma, kullanıcı boyutlandırmayı bitirene kadar bekle (200ms)
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        runSetup();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      clearTimeout(initialTimer);
      if (ctx) ctx.revert();
      if (split) split.revert();
    };
  }, [start, end]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
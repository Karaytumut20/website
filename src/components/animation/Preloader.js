'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Preloader() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const finalLogoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const images = imagesContainerRef.current.children; // Resim elementleri

    // --- Başlangıç Ayarları ---
    // Scroll'u kilitle
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0); // Sayfa pozisyonunu en üste al

    // --- FAZ 1: Yükleme Ekranı (Hope & Honor) ---
    
    // 1. Bar dolsun (0 -> 100%)
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 2, // Yükleme süresi
      ease: "power3.inOut"
    })
    .to({ val: 0 }, {
        val: 100,
        duration: 2,
        ease: "power3.inOut",
        onUpdate: function() {
            if(percentRef.current) {
                percentRef.current.innerText = Math.floor(this.targets()[0].val);
            }
        }
    }, "<") // Bar ile senkronize

    // 2. Yükleme yazıları ve bar silinsin
    .to(textContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.inOut"
    })

    // --- FAZ 2: Görsel Şovu (Reveal) ---

    // 3. Görsel Kutusunu Görünür Yap ve Perdeyi Aç
    // Not: CSS'te 'invisible' ve 'opacity-0' verdik, burada 'autoAlpha: 1' ile açıyoruz.
    .to(imagesContainerRef.current, {
        autoAlpha: 1, 
        clipPath: "inset(0% 0 0% 0)", // Perdeyi tamamen aç
        duration: 0.8,
        ease: "power4.inOut"
    })

    // 4. Görseller Arası Hızlı Geçiş (Flash Effect)
    // İlk resim zaten görünüyor, diğerlerini sırayla hızlıca aç
    .to(images[1], { opacity: 1, duration: 0, delay: 0.25 }) 
    .to(images[2], { opacity: 1, duration: 0, delay: 0.25 }) 
    .to(images[3], { opacity: 1, duration: 0, delay: 0.25 }) 
    
    // 5. Görsel kutusunu kapat (Perdeyi çek)
    .to(imagesContainerRef.current, {
        clipPath: "inset(0% 0 100% 0)", // Aşağıdan yukarı kapanış efekti
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.3
    })

    // --- FAZ 3: Final Logo (H & H) ---

    // 6. "H & H" Logosunu göster
    .to(finalLogoRef.current, {
        autoAlpha: 1, 
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    })
    // Ekranda kısa bir süre kalsın (Marka bilinirliği)
    .to({}, { duration: 0.8 })

    // --- FAZ 4: Siteye Giriş ---

    // 7. Siyah perdeyi yukarı kaldır
    .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
            // Animasyon bitince scroll'u aç ve container'ı DOM'dan kaldır (performans için)
            document.body.style.overflow = "auto";
            // Preloader'ı gizle (display: none)
            gsap.set(containerRef.current, { display: "none" });
        }
    });

  }, []);

  return (
    <div 
        ref={containerRef} 
        className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-white flex flex-col justify-center items-center overflow-hidden"
    >
        {/* --- Yükleme Bölümü (Başlangıçta Görünür) --- */}
        <div ref={textContainerRef} className="absolute z-30 flex flex-col items-center justify-center w-full gap-6 px-4">
            
            {/* Marka Adı */}
            <h1 className="font-sans text-xl md:text-3xl font-light tracking-[0.2em] uppercase">
                Hope & Honor
            </h1>

            {/* Loading Bar Container */}
            <div className="flex items-center gap-4 w-[300px] md:w-[400px]">
                {/* Bar */}
                <div className="relative flex-1 h-[1px] bg-white/20 overflow-hidden">
                    <div 
                        ref={progressRef} 
                        className="absolute top-0 left-0 w-full h-full origin-left scale-x-0 bg-white"
                    ></div>
                </div>
                {/* Yüzde */}
                <span ref={percentRef} className="w-6 font-mono text-xs text-right opacity-60">
                    0
                </span>
            </div>
        </div>

        {/* --- Görsel Kutusu (Başlangıçta GİZLİ: opacity-0 invisible) --- */}
        {/* clipPath: inset(50% 0 50% 0) -> Başlangıçta ortadan kapalı */}
        <div 
            ref={imagesContainerRef}
            className="absolute z-20 w-[85vw] h-[50vh] md:w-[35vw] md:h-[65vh] bg-gray-900 opacity-0 invisible"
            style={{ clipPath: "inset(50% 0 50% 0)" }} 
        >
            {/* Resim 1 (En altta) */}
            <div className="absolute inset-0 w-full h-full">
                <Image src="/assets/img1.jpg" alt="Reveal 1" fill className="object-cover" priority />
            </div>
            {/* Resim 2 */}
            <div className="absolute inset-0 w-full h-full opacity-0">
                <Image src="/assets/img2.jpg" alt="Reveal 2" fill className="object-cover" priority />
            </div>
            {/* Resim 3 */}
            <div className="absolute inset-0 w-full h-full opacity-0">
                <Image src="/assets/img3.jpg" alt="Reveal 3" fill className="object-cover" priority />
            </div>
             {/* Resim 4 */}
             <div className="absolute inset-0 w-full h-full opacity-0">
                <Image src="/assets/img4.jpg" alt="Reveal 4" fill className="object-cover" priority />
            </div>
        </div>

        {/* --- Final Logo (Başlangıçta GİZLİ: opacity-0 invisible) --- */}
        <div ref={finalLogoRef} className="absolute z-30 flex items-center justify-center invisible translate-y-4 opacity-0">
            <h1 className="font-sans text-5xl font-bold tracking-tighter uppercase md:text-7xl">
                H & H
            </h1>
        </div>

    </div>
  );
}
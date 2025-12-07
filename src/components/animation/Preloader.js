'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Preloader() {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null); // Hope & Honor ve sayaç kapsayıcısı

  useEffect(() => {
    const tl = gsap.timeline();
    const images = imagesRef.current.children; // Resim elementleri

    // --- Başlangıç Ayarları ---
    // Sayfanın scroll edilmesini engelle
    document.body.style.overflow = "hidden";
    
    // Resimleri başlangıçta gizle (CodeGrid mantığı)
    gsap.set(images, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });
    gsap.set(imagesRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });

    // --- FAZ 1: "Hope & Honor" Yükleme Ekranı ---
    
    // 1. Barın dolması ve Sayacın artması
    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: "power3.inOut"
    })
    .to({ val: 0 }, {
        val: 100,
        duration: 2.5,
        ease: "power3.inOut",
        onUpdate: function() {
            if(percentRef.current) {
                // Sayacı güncelle
                percentRef.current.innerText = "%" + Math.floor(this.targets()[0].val);
            }
        }
    }, "<") // Bar ile aynı anda başla
    
    // 2. Yükleme yazılarının ve barın kaybolması
    .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.in"
    });

    // --- FAZ 2: Görsel Geçişleri (CodeGrid Reveal Efekti) ---

    // Resimlerin sırayla açılması
    // "hop" ease efekti: M0,0 C0.9,0 0.1,1 1,1 (yaklaşık değer)
    const customEase = "power4.inOut"; 

    Array.from(images).forEach((img, index) => {
        // Her bir resim bloğunun açılması
        tl.to(img, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: customEase,
        }, `-=${index === 0 ? 0 : 0.8}`); // Bir önceki bitmeden diğeri başlasın (overlap)
        
        // İçindeki resmin zoom-out efekti
        const imgInner = img.querySelector('img');
        if (imgInner) {
            tl.fromTo(imgInner, 
                { scale: 1.5 },
                { scale: 1, duration: 1.5, ease: "power4.out" },
                "<" // Clip path ile aynı anda
            );
        }
    });

    // --- FAZ 3: Kapanış ve Siteye Giriş ---

    // Resim kapsayıcısının yukarı doğru kapanması
    tl.to(imagesRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: customEase,
        delay: 0.5
    });

    // Siyah perdenin kalkması (Preloader'ın yok olması)
    tl.to(containerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: customEase,
        onComplete: () => {
            // Animasyon bitince container'ı tamamen gizle ve scroll'u aç
            if(containerRef.current) containerRef.current.style.display = 'none';
            document.body.style.overflow = "auto"; 
        }
    }, "-=1.2"); // Resimler kapanırken perde de kalkmaya başlasın

  }, []);

  return (
    <div 
        ref={containerRef} 
        className="fixed inset-0 z-[9999] bg-[#141516] text-white flex flex-col justify-center items-center overflow-hidden"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
        {/* --- Loading UI (Hope & Honor Style) --- */}
        <div ref={textRef} className="absolute z-30 flex items-center justify-between w-full gap-4 px-6 md:px-20 md:gap-8 mix-blend-difference">
            {/* Sol Yazı */}
            <h2 className="font-sans text-3xl font-light tracking-tight md:text-6xl whitespace-nowrap">
                Hope & Honor
            </h2>
            
            {/* Orta Çizgi */}
            <div className="relative flex-1 h-[2px] bg-white/10 overflow-hidden mx-4 md:mx-10">
                <div 
                    ref={progressBarRef} 
                    className="absolute top-0 left-0 w-full h-full origin-left scale-x-0 bg-white"
                ></div>
            </div>

            {/* Sağ Sayaç */}
            <span ref={percentRef} className="font-mono text-xl md:text-3xl tabular-nums opacity-80">
                %0
            </span>
        </div>

        {/* --- Images Container (CodeGrid Reveal Style) --- */}
        <div 
            ref={imagesRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] md:w-[400px] md:h-[550px] z-20"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        >
            {/* Resim 1 */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
                <Image src="/assets/preloader/img1.jpg" alt="Reveal 1" fill className="object-cover" priority />
            </div>
            {/* Resim 2 */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
                <Image src="/assets/preloader/img2.jpg" alt="Reveal 2" fill className="object-cover" priority />
            </div>
            {/* Resim 3 */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
                <Image src="/assets/preloader/img3.jpg" alt="Reveal 3" fill className="object-cover" priority />
            </div>
            {/* Resim 4 */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
                <Image src="/assets/preloader/img4.jpg" alt="Reveal 4" fill className="object-cover" priority />
            </div>
        </div>
    </div>
  );
}
'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// GSAP ScrollTrigger Eklentisini Kaydet
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const t = useTranslations('Hero'); // Eğer json dosyasında Hero verisi yoksa hata vermemesi için aşağıda manuel metin kullandım.
  
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- HERO SCROLL ANIMASYONU ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%", // Scroll mesafesi (Hız ayarı)
          pin: true,     // Hero bölümünü ekrana çivile
          scrub: 1,      // Scroll ile senkronize çalış (Yumuşak geçiş)
        }
      });

      // 1. Videonun Genişlemesi (Görseldeki "Aşağıya inip tam gözükme" efekti)
      // Başlangıç: Kenarlardan basık (inset). Bitiş: Tam ekran (inset 0).
      tl.fromTo(videoContainerRef.current, 
        { 
          // Başlangıçta üstten/alttan/yanlardan boşluklu (Yazının arkasında bir kutu gibi)
          clipPath: "inset(10% 20% 10% 20% round 10px)", 
          scale: 0.95
        },
        { 
          clipPath: "inset(0% 0% 0% 0% round 0px)", // Tamamen açılır
          scale: 1,
          duration: 1,
          ease: "power2.inOut" 
        }
      )
      // 2. Yazının Hareketi (Video açılırken yazı silikleşip yukarı çıkar)
      .to(textRef.current, {
        scale: 1.2,
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power1.in"
      }, "<"); // Video animasyonuyla aynı anda başla

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="text-black bg-white">
      
      {/* --- HERO SECTION (Sticky Video) --- */}
      <div ref={heroRef} className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-white">
        
        {/* Yazı Katmanı (En Üstte) */}
        <div ref={textRef} className="absolute z-20 px-4 text-center text-white pointer-events-none mix-blend-difference">
          {/* David Alaba Stili Büyük Başlık */}
          <h1 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-4">
            David<br/>Alaba
          </h1>
          <p className="text-sm md:text-xl tracking-[0.5em] uppercase font-medium opacity-80">
            Foundation
          </p>
        </div>

        {/* Video Katmanı (Arka Planda) */}
        <div ref={videoContainerRef} className="relative z-10 w-full h-full">
            {/* Video Elementi */}
            {/* ÖNEMLİ: muted, playsInline ve autoPlay özellikleri video oynaması için şarttır */}
            <video 
              ref={videoRef}
              className="absolute top-0 left-0 object-cover w-full h-full"
              autoPlay 
              muted 
              loop 
              playsInline
              poster="/assets/img1.jpg" // Video yüklenene kadar gösterilecek resim
            >
              {/* Kendi videonuzun yolunu buraya yazın. Örn: /assets/hero-video.mp4 */}
              <source src="/assets/hero-video.mp4" type="video/mp4" />
              {/* Eğer video dosyanız yoksa test için bu linki açabilirsiniz: 
                  <source src="https://cdn.coverr.co/videos/coverr-playing-football-2877/1080p.mp4" type="video/mp4" /> 
              */}
            </video>
            
            {/* Video Üzeri Hafif Karartma (Yazı okunabilirliği için) */}
            <div className="absolute inset-0 bg-black/20"></div>
        </div>

      </div>

      {/* --- ABOUT SECTION (After Scroll - Siyah Bölüm) --- */}
      {/* Görseldeki: 'We turn founders visions...' bölümü */}
      <div className="relative z-30 bg-[#0a0a0a] text-white py-32 px-6 md:px-10 min-h-screen flex flex-col justify-center">
        
        {/* Üst Kısım: Büyük Slogan */}
        <div className="max-w-[90%] mx-auto mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-[3.5vw] font-light leading-[1.2] tracking-tight text-gray-200">
            We turn founders’ visions into remarkable brands by combining strategy, design, and performance marketing, all under one roof. <span className="text-white transition-colors border-b cursor-pointer border-white/40 hover:border-white">Explore our services.</span>
          </h2>
        </div>

        {/* Alt Kısım: Grid Bilgiler */}
        <div className="w-full max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-white/10">
          
          {/* Sol: Etiket */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs tracking-widest uppercase text-white/40">
              Tomorrow's brands, today.
            </span>
          </div>

          {/* Orta: Boşluk */}
          <div className="hidden md:col-span-2 md:block"></div>

          {/* Sağ: Açıklama ve Link */}
          <div className="flex flex-col gap-12 md:col-span-6">
            <div className="flex flex-col gap-6 text-lg font-light leading-relaxed md:text-xl text-white/60">
              <p>
                Since 2013, we have been recognized globally for helping founders build market-defining brands.
              </p>
              <p>
                We partner with five clients a year to give each one the focus and care they deserve.
              </p>
            </div>
            
            <Link href="/about" className="inline-flex items-center gap-2 pb-1 text-white transition-colors border-b border-white/30 hover:border-white w-max group">
              <span className="text-sm tracking-widest uppercase">Learn More</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">↗</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
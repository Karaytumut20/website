'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTransitionContext } from '@/context/TransitionContext';
import { usePathname, useRouter } from 'next/navigation';

export default function NavigationLoader() {
  const { isTransitioning, endTransition, isFirstLoadCompleted, targetUrl } = useTransitionContext();
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  
  const pathname = usePathname(); 
  const router = useRouter();
  const prevPathname = useRef(pathname);

  // Pulse animasyonunu tutmak için referans
  const pulseAnimRef = useRef(null);

  // --- FAZ 1: ÇIKIŞ (Perde İner & Bekleme Modu) ---
  useEffect(() => {
    if (!isFirstLoadCompleted || !isTransitioning || !targetUrl || !overlayRef.current) return;

    // Kullanıcının başka bir yere tıklamasını engelle ve bekleme ikonu göster
    document.body.style.cursor = "wait";
    document.body.style.pointerEvents = "none";

    const tl = gsap.timeline({
        onComplete: () => {
            // 1. Yönlendirmeyi yap
            router.push(targetUrl);
            
            // 2. Logo için "Nefes Alma" (Pulse) animasyonunu başlat
            // Bu, kullanıcı siyah ekranda beklerken sitenin donmadığını hissettirir.
            if (textRef.current) {
                pulseAnimRef.current = gsap.to(textRef.current, {
                    opacity: 0.5,
                    scale: 0.95,
                    duration: 0.8,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        }
    });

    gsap.set(overlayRef.current, { display: "flex", yPercent: -100 });

    tl.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.6,
        ease: 'power4.inOut'
    })
    .fromTo(textRef.current, 
        { y: 20, opacity: 0, scale: 1 }, // Scale resetlenmeli
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 
        "-=0.2"
    );

  }, [isTransitioning, targetUrl, isFirstLoadCompleted, router]);


  // --- FAZ 2: GİRİŞ (Perde Kalkar) ---
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;
    window.scrollTo(0, 0);

    if (!overlayRef.current) return;

    // Pulse animasyonunu durdur (Eğer varsa)
    if (pulseAnimRef.current) {
        pulseAnimRef.current.kill();
        pulseAnimRef.current = null;
        // Opaklığı ve scale'i normale döndür
        gsap.set(textRef.current, { opacity: 1, scale: 1 });
    }

    const tl = gsap.timeline({
        onComplete: () => {
            endTransition(); 
            gsap.set(overlayRef.current, { display: "none" });
            
            // İmleci ve tıklamaları serbest bırak
            document.body.style.cursor = "default";
            document.body.style.pointerEvents = "auto";
        }
    });

    tl.to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        delay: 0.2 
    })
    .to(overlayRef.current, {
        yPercent: 100, 
        duration: 0.8,
        ease: 'power4.inOut'
    });

  }, [pathname, endTransition]); 

  // İlk yükleme bitmediyse render etme
  if (!isFirstLoadCompleted) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-white flex items-center justify-center hidden"
    >
        <h2 ref={textRef} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter opacity-0">
            H & H
        </h2>
    </div>
  );
}
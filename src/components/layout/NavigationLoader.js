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
  
  // Önceki path'i hatırlamak için (Gerçekten sayfa değişti mi?)
  const prevPathname = useRef(pathname);

  // --- FAZ 1: ÇIKIŞ (Perde İner & Sayfa Değişir) ---
  useEffect(() => {
    // Şartlar: İlk yükleme bitmiş, Geçiş başlamış, Hedef URL var ve Overlay hazır.
    if (!isFirstLoadCompleted || !isTransitioning || !targetUrl || !overlayRef.current) return;

    const tl = gsap.timeline({
        onComplete: () => {
            // KRİTİK NOKTA: Perde tamamen kapandığında (siyah ekran) yönlendirmeyi yap.
            // Kullanıcı bu sırada siyah ekran görür, bozuk sayfa görmez.
            router.push(targetUrl);
        }
    });

    // 1. Hazırlık (Görünür yap)
    gsap.set(overlayRef.current, { display: "flex", yPercent: -100 });

    // 2. Animasyon (Yukarıdan aşağı kapat)
    tl.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.6, // Hızlı ve net kapanış
        ease: 'power4.inOut'
    })
    .fromTo(textRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 
        "-=0.2"
    );

  }, [isTransitioning, targetUrl, isFirstLoadCompleted, router]);


  // --- FAZ 2: GİRİŞ (Perde Kalkar) ---
  useEffect(() => {
    // Sadece path gerçekten değiştiyse çalış
    if (pathname === prevPathname.current) return;

    // Path değişti, demek ki Next.js yeni sayfayı yükledi.
    prevPathname.current = pathname;
    window.scrollTo(0, 0);

    if (!overlayRef.current) return;

    const tl = gsap.timeline({
        onComplete: () => {
            endTransition(); // Her şeyi sıfırla
            gsap.set(overlayRef.current, { display: "none" });
        }
    });

    // Yazıyı sil, Perdeyi kaldır (Aşağı doğru akıp gitsin veya yukarı çekilsin)
    // "yPercent: 100" -> Aşağı doğru devam eder (Sinematik)
    // "yPercent: -100" -> Geldiği gibi yukarı geri döner
    
    tl.to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        delay: 0.2 // Render için minik nefes payı
    })
    .to(overlayRef.current, {
        yPercent: 100, 
        duration: 0.8,
        ease: 'power4.inOut'
    });

  }, [pathname, endTransition]); // Sadece pathname değişince tetiklenir


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
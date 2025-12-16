'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useTransitionContext } from '@/context/TransitionContext';

export default function Preloader() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const finalLogoRef = useRef(null);

  const { completeFirstLoad, isFirstLoadCompleted } = useTransitionContext();

  useEffect(() => {
    // Eğer daha önce yüklendiyse tekrar çalışma
    if (isFirstLoadCompleted) {
        if (containerRef.current) containerRef.current.style.display = "none";
        return;
    }

    const tl = gsap.timeline();
    const images = imagesContainerRef.current ? imagesContainerRef.current.children : [];

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // --- FAZ 1: Yükleme ---
    tl.to(progressRef.current, { scaleX: 1, duration: 1, ease: "power3.inOut" })
      .to({ val: 0 }, {
        val: 100, duration: 1, ease: "power3.inOut",
        onUpdate: function() { if(percentRef.current) percentRef.current.innerText = Math.floor(this.targets()[0].val); }
    }, "<")
    .to(textContainerRef.current, { opacity: 0, y: -20, duration: 0.3, ease: "power2.inOut" })

    // --- FAZ 2: Görsel ---
    .to(imagesContainerRef.current, { autoAlpha: 1, clipPath: "inset(0% 0 0% 0)", duration: 0.5, ease: "power4.inOut" })
    .to(images[1], { opacity: 1, duration: 0, delay: 0.12 }) 
    .to(images[2], { opacity: 1, duration: 0, delay: 0.12 }) 
    .to(images[3], { opacity: 1, duration: 0, delay: 0.12 }) 
    .to(imagesContainerRef.current, { clipPath: "inset(0% 0 100% 0)", duration: 0.5, ease: "power4.inOut", delay: 0.15 })

    // --- FAZ 3: Logo ---
    .to(finalLogoRef.current, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" })
    .to({}, { duration: 0.4 })

    // --- FAZ 4: Çıkış ---
    .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
            document.body.style.overflow = "auto";
            gsap.set(containerRef.current, { display: "none" });
            completeFirstLoad(); // Sinyali gönder
        }
    });
  }, [completeFirstLoad, isFirstLoadCompleted]);

  if (isFirstLoadCompleted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-white flex flex-col justify-center items-center overflow-hidden">
        <div ref={textContainerRef} className="absolute z-30 flex flex-col items-center justify-center w-full gap-6 px-4">
            <h1 className="font-sans text-xl md:text-3xl font-light tracking-[0.2em] uppercase">Umut</h1>
            <div className="flex items-center gap-4 w-[300px] md:w-[400px]">
                <div className="relative flex-1 h-[1px] bg-white/20 overflow-hidden">
                    <div ref={progressRef} className="absolute top-0 left-0 w-full h-full origin-left scale-x-0 bg-white"></div>
                </div>
                <span ref={percentRef} className="w-6 font-mono text-xs text-right opacity-60">0</span>
            </div>
        </div>
        <div ref={imagesContainerRef} className="absolute z-20 w-[85vw] h-[50vh] md:w-[35vw] md:h-[65vh] bg-gray-900 opacity-0 invisible" style={{ clipPath: "inset(50% 0 50% 0)" }}>
            <div className="absolute inset-0 w-full h-full"><Image src="/assets/img1.jpg" alt="Reveal 1" fill className="object-cover" priority /></div>
            <div className="absolute inset-0 w-full h-full opacity-0"><Image src="/assets/img2.jpg" alt="Reveal 2" fill className="object-cover" priority /></div>
            <div className="absolute inset-0 w-full h-full opacity-0"><Image src="/assets/img3.jpg" alt="Reveal 3" fill className="object-cover" priority /></div>
             <div className="absolute inset-0 w-full h-full opacity-0"><Image src="/assets/img4.jpg" alt="Reveal 4" fill className="object-cover" priority /></div>
        </div>
        <div ref={finalLogoRef} className="absolute z-30 flex items-center justify-center invisible translate-y-4 opacity-0">
            <h1 className="font-sans text-5xl font-bold tracking-tighter uppercase md:text-7xl">H & H</h1>
        </div>
    </div>
  );
}

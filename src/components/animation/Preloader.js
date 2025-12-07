'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const words = ["Hello", "Bonjour", "Merhaba", "Ciao", "Olà", "Guten Tag", "Hallå"];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const opacityRef = useRef(null);
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Kelimeleri sırayla göster
    if(index == words.length - 1) return;
    setTimeout( () => {
      setIndex(index + 1);
    }, index == 0 ? 1000 : 150);
  }, [index]);

  useEffect(() => {
    // GSAP Animasyonu
    const tl = gsap.timeline();
    const curve = "M0 100 L0 0 L100 0 L100 100 Q50 150 0 100"; 
    const flat = "M0 100 L0 0 L100 0 L100 100 Q50 100 0 100";  

    // 1. Yazıyı gizle
    tl.to(opacityRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 2, 
        onComplete: () => {
            document.body.style.overflow = "auto"; // Scroll'u aç
        }
    })
    // 2. Perdeyi kaldır (SVG curve efekti ile)
    .to(pathRef.current, {
        attr: { d: curve },
        duration: 0.5,
        ease: "power2.easeIn",
    })
    .to(pathRef.current, {
        attr: { d: flat },
        y: -1500, 
        duration: 0.5,
        ease: "power2.easeOut",
    })
    // 3. Container'ı tamamen kaldır
    .to(containerRef.current, {
        display: "none"
    });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-[#141516] text-white">
        <div ref={opacityRef} className="flex items-center text-5xl font-light tracking-wide md:text-7xl">
            <span className="w-3 h-3 mr-4 bg-white rounded-full animate-pulse"></span>
            {words[index]}
        </div>
        <svg className="absolute top-0 w-full h-[calc(100%+300px)] -z-10 pointer-events-none fill-[#141516]">
            <path ref={pathRef} d="M0 100 L0 0 L100 0 L100 100 Q50 100 0 100" />
        </svg>
    </div>
  );
}
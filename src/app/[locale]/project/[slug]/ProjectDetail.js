'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP Eklentisini Kaydet
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetail({ project, nextProject, prevProject }) {
  const router = useRouter();
  const footerRef = useRef(null);
  const progressBarRef = useRef(null); // Üstteki okuma barı
  const nextProjectBarRef = useRef(null); // Alttaki geçiş barı
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Sayfa açıldığında en tepeye git
    window.scrollTo(0, 0);

    // 1. Üstteki Okuma Barı (Sayfa okundukça dolar)
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: self.progress });
        }
      }
    });

    // 2. Footer Geçiş Mantığı (Next Project Transition)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top bottom-=100%', // Footer göründüğünde başla
        end: 'bottom bottom',      // Sayfa sonuna kadar
        scrub: true,               // Scroll ile senkronize ol
        onUpdate: (self) => {
          // Footer'daki barı doldur
          if (nextProjectBarRef.current && !isTransitioning) {
            // Sadece son %20'lik kısımda barı doldurmaya başla
            const progress = Math.max(0, (self.progress - 0.8) * 5); 
            gsap.set(nextProjectBarRef.current, { scaleX: progress });
            
            // Eğer bar dolduysa (%99+) ve geçiş başlamadıysa
            if (progress >= 0.99 && !isTransitioning) {
              setIsTransitioning(true);
              
              // Barı tamamen doldur (Görsel feedback)
              gsap.to(nextProjectBarRef.current, { scaleX: 1, duration: 0.2 });
              
              // Bir sonraki projeye yönlendir
              setTimeout(() => {
                router.push(`/project/${nextProject.slug}`);
              }, 500);
            }
          }
        }
      });
    });

    return () => {
      ctx.revert(); // Temizlik
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [nextProject, router, isTransitioning]);

  return (
    <div className="relative min-h-screen bg-[#e3e3db] text-black">
      
      {/* --- Sticky Nav (Üst Çubuk) --- */}
      <div className="fixed top-0 left-0 z-40 flex items-center justify-between w-full px-6 py-6 text-white mix-blend-difference">
        <Link href={`/project/${prevProject.slug}`} className="hidden font-mono text-sm uppercase transition-opacity md:block hover:opacity-50">
          ← Prev
        </Link>
        
        {/* Orta Kısım: Proje Adı ve Okuma Barı */}
        <div className="relative flex-1 mx-4 md:mx-10 h-[40px] flex items-center justify-center border border-white/20 rounded-full overflow-hidden bg-black/5 backdrop-blur-sm">
          {/* Okuma Barı */}
          <div 
            ref={progressBarRef} 
            className="absolute top-0 left-0 w-full h-full origin-left scale-x-0 bg-white"
          />
          <span className="relative z-10 font-mono text-sm text-white uppercase mix-blend-difference">
            {project.title}
          </span>
        </div>

        <Link href={`/project/${nextProject.slug}`} className="hidden font-mono text-sm uppercase transition-opacity md:block hover:opacity-50">
          Next →
        </Link>
      </div>

      {/* --- Hero Section (Başlık ve Açıklama) --- */}
      <div className="w-full h-[80vh] flex flex-col justify-center items-center px-4 pt-20">
        <h1 className="text-[8vw] font-bold uppercase leading-none tracking-tighter text-center">
          {project.title}
        </h1>
        <p className="max-w-2xl mt-8 text-lg leading-relaxed text-center md:text-xl opacity-70">
          {project.description}
        </p>
        <div className="flex gap-10 mt-10 font-mono text-sm uppercase opacity-50">
            <span>{project.category}</span>
            <span>{project.year}</span>
        </div>
      </div>

      {/* --- Gallery Section (Görseller) --- */}
      <div className="flex flex-col w-full gap-10 px-4 pb-20 md:px-20 md:gap-20">
        {project.images.map((img, i) => (
            <div key={i} className="relative w-full aspect-video md:aspect-[16/9] overflow-hidden bg-gray-300 group">
                <Image 
                    src={img} 
                    alt={`${project.title} detail ${i+1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
            </div>
        ))}
      </div>

      {/* --- Next Project Footer (Geçiş Alanı) --- */}
      <div ref={footerRef} className="relative flex flex-col items-center justify-center w-full h-screen text-white bg-black">
        <span className="mb-4 font-mono text-sm uppercase opacity-50">Next Project</span>
        <h2 className="text-[6vw] font-bold uppercase tracking-tighter text-center">
            {nextProject.title}
        </h2>
        
        {/* Next Project Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10">
            <div 
                ref={nextProjectBarRef}
                className="w-full h-full origin-left scale-x-0 bg-white"
            />
        </div>
        
        <p className="absolute font-mono text-xs tracking-widest uppercase bottom-10 opacity-40 animate-pulse">
            Keep scrolling to view next
        </p>
      </div>

    </div>
  );
}
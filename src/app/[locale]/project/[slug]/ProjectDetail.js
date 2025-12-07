'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // Standart Link
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Standart Router
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetail({ project, nextProject, prevProject }) {
  const router = useRouter();
  const footerRef = useRef(null);
  const progressBarRef = useRef(null);
  const nextProjectBarRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Sayfa açılışında en tepeye
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      
      // 1. Üst Okuma Barı (Sayfa okundukça dolar)
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: self.progress });
          }
        }
      });

      // 2. Footer Geçişi (Referansındaki Pinleme Mantığı)
      // Footer ekrana girdiği an kilitlenir (pin).
      // Kullanıcı scroll yapmaya devam ettikçe bar dolar.
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top top', // Footer ekranın tepesine değince
        end: '+=100%',    // Ekstra %100 scroll mesafesi boyunca kilitli kal
        pin: true,        // KİLİTLE
        scrub: 0,
        onUpdate: (self) => {
          if (nextProjectBarRef.current && !isTransitioning) {
            // Barı scroll'a göre doldur
            gsap.set(nextProjectBarRef.current, { scaleX: self.progress });

            // %100 dolduysa geçişi tetikle
            if (self.progress >= 0.99 && !isTransitioning) {
              setIsTransitioning(true);
              
              // Barı tamamen doldur
              gsap.to(nextProjectBarRef.current, { scaleX: 1, duration: 0.1 });
              
              // Sayfayı karart veya içeriği gizle (Opsiyonel görsel cila)
              // gsap.to(footerRef.current, { opacity: 0.5, duration: 0.5 });

              // Yönlendirme
              setTimeout(() => {
                router.push(`/project/${nextProject.slug}`);
              }, 500);
            }
          }
        }
      });

    });

    return () => ctx.revert();
  }, [nextProject, router, isTransitioning]);

  return (
    <div className="relative min-h-screen bg-[#e3e3db] text-black">
      
      {/* Navbar & Okuma Barı */}
      <div className="fixed top-0 left-0 z-40 flex items-center justify-between w-full px-6 py-6 text-white mix-blend-difference">
        <Link href={`/project/${prevProject.slug}`} className="hidden text-xs tracking-widest uppercase transition-opacity md:block hover:opacity-50">
          ← Prev
        </Link>
        
        {/* Orta: Okuma Barı */}
        <div className="relative flex-1 mx-4 md:mx-10 h-[40px] flex items-center justify-center border border-white/20 rounded-full overflow-hidden bg-black/5 backdrop-blur-sm">
          <div ref={progressBarRef} className="absolute top-0 left-0 w-full h-full origin-left scale-x-0 bg-white" />
          <span className="relative z-10 font-mono text-sm text-white uppercase mix-blend-difference">
            {project.title}
          </span>
        </div>

        <Link href={`/project/${nextProject.slug}`} className="hidden text-xs tracking-widest uppercase transition-opacity md:block hover:opacity-50">
          Next →
        </Link>
      </div>

      {/* Hero */}
      <div className="w-full h-[80vh] flex flex-col justify-center items-center px-4 pt-20">
        <h1 className="text-[10vw] font-bold uppercase leading-none tracking-tighter text-center">
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

      {/* Galeri */}
      <div className="flex flex-col w-full gap-20 px-4 pb-20 md:px-20">
        {project.images.map((img, i) => (
            <div key={i} className="relative w-full aspect-video md:aspect-[16/9] bg-gray-300 overflow-hidden">
                <Image 
                    src={img} 
                    alt="Detail" 
                    fill 
                    className="object-cover transition-transform duration-1000 hover:scale-105" 
                />
            </div>
        ))}
      </div>

      {/* --- Footer (Geçiş Alanı) --- */}
      <div ref={footerRef} className="w-full h-screen flex flex-col justify-center items-center relative bg-[#141516] text-white z-20 overflow-hidden">
        <span className="mb-4 font-mono text-sm uppercase opacity-50">Next Project</span>
        <h2 className="text-[8vw] font-bold uppercase tracking-tighter text-center leading-none mb-10">
            {nextProject.title}
        </h2>
        
        {/* Dolacak olan Bar */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-white/10">
            <div 
                ref={nextProjectBarRef}
                className="w-full h-full origin-left scale-x-0 bg-white"
            />
        </div>
        
        <p className="absolute font-mono text-xs tracking-widest uppercase bottom-12 opacity-40 animate-pulse">
            Scroll to Navigate
        </p>
      </div>

    </div>
  );
}
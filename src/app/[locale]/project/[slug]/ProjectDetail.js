'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import ProjectNavigation from '@/components/layout/ProjectNavigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetail({ project, nextProject, prevProject }) {
  const router = useRouter();
  
  const footerRef = useRef(null);
  const nextProjectProgressBarRef = useRef(null);
  const overlayRef = useRef(null);
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);
  const [canAdvance, setCanAdvance] = useState(false);

  // --- Sayfa Başlangıç Ayarları ---
  useEffect(() => {
    // Tarayıcı scroll hafızasını kapat
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Lenis scroll'u en başa al (Sayfa en üstten başlasın)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    ScrollTrigger.refresh();
    
    // Geçiş kilidini 1.2 sn sonra aç (Kullanıcı hemen aşağı kaydırıp geçmesin diye güvenlik)
    const timer = setTimeout(() => {
        setCanAdvance(true);
    }, 1200);

    // NOT: Buradaki tüm giriş animasyonları kaldırıldı.
    // Başlık ve yazılar CSS ile doğal hallerinde direkt görünür olacak.

    return () => clearTimeout(timer);
  }, [project.id]);

  // --- Scroll Logic & Transition (Footer Geçişi) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top top", 
        // Geçiş mesafesi
        end: `+=${typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1000}px`,
        pin: true,        // Footer'ı ekrana kilitle (Yazı ortada kalsın)
        pinSpacing: true,
        scrub: 0,
        
        onUpdate: (self) => {
          // Progress Bar
          if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
            gsap.set(nextProjectProgressBarRef.current, {
              scaleX: self.progress,
            });
          }

          // Tetiklenme Noktası (%99)
          if (self.progress >= 0.99 && !isTransitioning && canAdvance) {
            setShouldUpdateProgress(false);
            setIsTransitioning(true);

            const tl = gsap.timeline();

            // 1. Barı doldur
            tl.set(nextProjectProgressBarRef.current, { scaleX: 1 });

            // 2. Beyaz Perdeyi Aç (Metnin arkasında)
            tl.to(overlayRef.current, {
              opacity: 1,
              duration: 0.8,
              ease: "power2.inOut"
            });

            // 3. Sayfayı Değiştir
            tl.call(() => {
              router.push(`/project/${nextProject.slug}`);
            });
          }
        },
      });

    }, footerRef);

    return () => ctx.revert();
  }, [nextProject, router, isTransitioning, shouldUpdateProgress, canAdvance]);

  // Stil Tanımları
  const heroClasses = "w-full min-h-screen flex flex-col justify-center items-center px-6 text-center relative z-10";
  const titleClasses = "text-[10vw] font-medium uppercase leading-[0.85] tracking-tight mb-8 text-black";

  return (
    <div className="relative min-h-screen bg-[#f3f2ed] text-[#1c1c1c] font-sans selection:bg-black selection:text-white">
      
      {/* --- GEÇİŞ PERDESİ (Overlay) --- */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-white z-[40] opacity-0 pointer-events-none"
      />

      <ProjectNavigation 
        project={project}
        nextProject={nextProject}
        prevProject={prevProject}
        allProjects={projects} 
      />

      {/* --- HERO SECTION --- */}
      {/* Animasyon class'ı (project-hero-anim) kalsa da JS kodu olmadığı için etkisi yok */}
      <div className={heroClasses}>
        <h1 className={titleClasses}>
          {project.title}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed opacity-60">
          {project.description}
        </p>
        <div className="flex gap-8 mt-12 font-mono text-xs tracking-widest uppercase opacity-40">
            <span>{project.category}</span>
            <span>—</span>
            <span>{project.year}</span>
        </div>
      </div>

      {/* --- MAIN IMAGE --- */}
      <div className="w-full h-[60vh] md:h-screen relative overflow-hidden bg-gray-200 z-0">
         <Image 
            src={project.cover} 
            alt={project.title} 
            fill 
            className="object-cover"
            priority
         />
      </div>

      {/* --- GALLERY --- */}
      <div className="w-full px-4 py-20 md:px-20 md:py-40 flex flex-col gap-20 bg-[#f3f2ed] relative z-10">
        {project.images && project.images.slice(1).map((img, i) => (
            <div key={i} className="relative w-full aspect-square md:aspect-[16/9] bg-gray-300 overflow-hidden rounded-sm group">
                <Image 
                    src={img} 
                    alt="Detail" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
            </div>
        ))}
      </div>

      {/* --- NEXT PROJECT FOOTER --- */}
      <div ref={footerRef} className={`${heroClasses} z-[50] bg-[#f3f2ed]`}>
        
        <div className="flex flex-col items-center w-full gap-4 project-footer-content">
            <span className="mb-4 project-footer-copy opacity-60">Next Project</span>
            
            {/* HERO TITLE İLE AYNI */}
            <h1 className={titleClasses}>
              {nextProject.title}
            </h1>
        </div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300/50">
            <div 
                ref={nextProjectProgressBarRef}
                className="h-full origin-left scale-x-0 bg-black"
            />
        </div>
      </div>

    </div>
  );
}
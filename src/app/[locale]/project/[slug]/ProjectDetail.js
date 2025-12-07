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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

  // --- Sayfa Yüklenme Animasyonu ---
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Basit bir giriş animasyonu (İsteğe bağlı)
    gsap.fromTo(".project-hero-anim", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
  }, [project.id]);

  // --- Scroll Driven Transition Logic (Footer) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const footerScrollTrigger = ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top top",
        // Ekranın 2 katı kadar scroll mesafesi tanı (Geçiş süresini ayarlar)
        end: `+=${typeof window !== 'undefined' ? window.innerHeight * 2 : 1000}px`, 
        pin: true,
        pinSpacing: true,
        scrub: 0, // Scrub'ı kapattık, progress'i manuel yönetiyoruz
        
        onUpdate: (self) => {
          // Progress bar'ı güncelle
          if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
            gsap.set(nextProjectProgressBarRef.current, {
              scaleX: self.progress,
            });
          }

          // %100 dolduğunda geçişi tetikle
          if (self.progress >= 0.99 && !isTransitioning) {
            setShouldUpdateProgress(false);
            setIsTransitioning(true);

            const tl = gsap.timeline();

            // Barı tamamen doldur
            tl.set(nextProjectProgressBarRef.current, { scaleX: 1 });

            // Yazıları gizle (Exit animasyonu)
            tl.to(".project-footer-content", {
              opacity: 0,
              y: -20,
              duration: 0.5,
              ease: "power2.inOut",
            });

            // Sayfayı değiştir
            tl.call(() => {
              router.push(`/project/${nextProject.slug}`);
            });
          }
        },
      });

    }, footerRef);

    return () => ctx.revert();
  }, [nextProject, router, isTransitioning, shouldUpdateProgress]);

  return (
    <div className="relative min-h-screen bg-[#f3f2ed] text-[#1c1c1c] font-sans selection:bg-black selection:text-white">
      
      {/* Navbar (McAlpine Style) */}
      <ProjectNavigation 
        project={project}
        nextProject={nextProject}
        prevProject={prevProject}
        allProjects={projects} 
      />

      {/* --- HERO SECTION --- */}
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center px-6 pt-32 pb-20 text-center">
        <h1 className="project-hero-anim text-[10vw] font-medium uppercase leading-[0.85] tracking-tight mb-8">
          {project.title}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed project-hero-anim opacity-60">
          {project.description}
        </p>
        <div className="flex gap-8 mt-12 font-mono text-xs tracking-widest uppercase project-hero-anim opacity-40">
            <span>{project.category}</span>
            <span>—</span>
            <span>{project.year}</span>
        </div>
      </div>

      {/* --- MAIN IMAGE --- */}
      <div className="w-full h-[60vh] md:h-screen relative overflow-hidden bg-gray-200">
         <Image 
            src={project.cover} 
            alt={project.title} 
            fill 
            className="object-cover"
            priority
         />
      </div>

      {/* --- GALLERY --- */}
      <div className="w-full px-4 py-20 md:px-20 md:py-40 flex flex-col gap-20 bg-[#f3f2ed]">
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

      {/* --- FOOTER TRANSITION SECTION --- */}
      <div ref={footerRef} className="project-footer">
        <div className="flex flex-col items-center gap-4 project-footer-content">
            <span className="project-footer-copy">Next Project</span>
            <h1>{nextProject.title}</h1>
        </div>

        <div className="next-project-progress">
            <div 
                ref={nextProjectProgressBarRef}
                className="next-project-progress-bar"
            />
        </div>
      </div>

    </div>
  );
}
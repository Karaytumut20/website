'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function ProjectList({ projects }) {
  const previewRef = useRef(null);
  const [activeImg, setActiveImg] = useState(null);

  useEffect(() => {
    // Mouse hareketiyle görseli taşı (GSAP ile pürüzsüz takip)
    const movePreview = (e) => {
      if (!activeImg) return;
      // Görseli mouse'un biraz yanında ortalayarak göster
      gsap.to(previewRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', movePreview);
    return () => window.removeEventListener('mousemove', movePreview);
  }, [activeImg]);

  const handleMouseEnter = (img) => {
    setActiveImg(img);
    gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    setActiveImg(null);
    gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <div className="w-full px-4 pt-20 pb-40 md:px-10">
      {/* Yüzen Görsel (Preview Container) */}
      <div 
        ref={previewRef} 
        className="fixed top-0 left-0 w-[300px] h-[200px] md:w-[400px] md:h-[280px] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 overflow-hidden rounded-lg shadow-2xl"
      >
        {activeImg && (
          <Image 
            src={activeImg} 
            alt="Project Preview" 
            fill 
            className="object-cover"
          />
        )}
      </div>

      {/* Proje Listesi */}
      <div className="flex flex-col border-t border-black/20 dark:border-white/20">
        {projects.map((project, index) => (
          <Link 
            key={project.id} 
            href={`/project/${project.slug}`}
            className="relative flex items-center justify-between px-4 py-12 transition-colors border-b cursor-pointer group md:py-16 border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
            onMouseEnter={() => handleMouseEnter(project.image)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-baseline gap-4 pointer-events-none md:gap-10">
              <span className="font-mono text-sm opacity-50 md:text-base">0{index + 1}</span>
              <h2 className="text-4xl font-bold tracking-tighter uppercase transition-transform duration-300 md:text-7xl group-hover:translate-x-4">
                {project.title}
              </h2>
            </div>
            
            <div className="flex flex-col text-right pointer-events-none">
              <span className="text-xs tracking-widest uppercase md:text-sm opacity-60">{project.category}</span>
              <span className="mt-1 font-mono text-xs md:text-sm opacity-40">{project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
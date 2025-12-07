'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function ProjectList({ projects }) {
  const previewContainerRef = useRef(null);
  const listRef = useRef(null);

  // Animasyon Pozisyonları (CSS ile uyumlu: 0, -80px, -160px)
  // Liste elemanının yüksekliği 100px (h-[100px]) varsayıldı.
  const ROW_HEIGHT = 100; 
  
  const POSITIONS = {
    TOP: -ROW_HEIGHT * 2,    // -200px (3. satır görünür - Light)
    MIDDLE: -ROW_HEIGHT,     // -100px (2. satır - Dark)
    BOTTOM: 0                // 0px (1. satır - Light)
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Başlangıçta tüm wrapperları TOP pozisyonuna (3. satıra) al
      // Bu sayede varsayılan olarak Light görünümle başlarız.
      gsap.set(".project-roll-wrapper", { y: POSITIONS.TOP });
    }, listRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e, index, project) => {
    const target = e.currentTarget;
    const wrapper = target.querySelector('.project-roll-wrapper');
    const rect = target.getBoundingClientRect();
    
    // Mouse üst yarıdan mı girdi alt yarıdan mı?
    const enterFromTop = e.clientY < rect.top + rect.height / 2;

    // --- Roll Animasyonu ---
    // Her durumda ortaya (Koyu satıra) git, ancak giriş yönüne göre animasyon hissi ver
    gsap.to(wrapper, {
      y: POSITIONS.MIDDLE,
      duration: 0.4,
      ease: "power2.out",
    });

    // --- Preview Resmi Göster (Sağ Alt Köşe) ---
    // Varolan resimleri temizle (veya animasyonla kapat)
    if(previewContainerRef.current) {
        const oldImages = previewContainerRef.current.querySelectorAll('img');
        oldImages.forEach(img => {
            gsap.to(img, { scale: 0, duration: 0.4, onComplete: () => img.remove() });
        });

        // Yeni resim oluştur
        const img = document.createElement('img');
        img.src = project.cover;
        img.className = 'absolute top-0 left-0 object-cover w-full h-full rounded-lg shadow-2xl';
        img.style.transform = 'scale(0)'; // Başlangıç scale
        
        previewContainerRef.current.appendChild(img);

        gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    }
  };

  const handleMouseLeave = (e) => {
    const target = e.currentTarget;
    const wrapper = target.querySelector('.project-roll-wrapper');
    const rect = target.getBoundingClientRect();
    
    // Çıkış yönünü hesapla
    const leavingFromTop = e.clientY < rect.top + rect.height / 2;

    // Yukarıdan çıktıysa en alt satıra (TOP), aşağıdan çıktıysa en üst satıra (BOTTOM) git.
    // İkisi de "Light" versiyon olduğu için döngüsel hissettirir.
    const targetY = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;

    gsap.to(wrapper, {
      y: targetY,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div ref={listRef} className="relative w-full px-4 pt-20 pb-40 md:px-10">
      
      {/* --- Fixed Preview Container (Sağ Alt Köşe - CodeGrid Style) --- */}
      <div 
        ref={previewContainerRef}
        className="fixed bottom-10 right-10 w-[300px] h-[200px] md:w-[400px] md:h-[280px] z-50 pointer-events-none"
      >
        {/* Resimler buraya JS ile eklenecek */}
      </div>

      {/* --- Liste --- */}
      <div className="flex flex-col border-t border-black/20 dark:border-white/20">
        {projects.map((project, index) => (
          <Link 
            key={project.id} 
            href={`/project/${project.slug}`}
            className="group relative block w-full h-[100px] overflow-hidden border-b border-black/20 dark:border-white/20 cursor-pointer"
            onMouseEnter={(e) => handleMouseEnter(e, index, project)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Wrapper: 3 Satırlık Yükseklik (300px) */}
            <div className="project-roll-wrapper h-[300px] w-full relative">
                
                {/* 1. Satır (Light - Bottom Exit State) */}
                <div className="h-[100px] flex items-center justify-between px-4 bg-[#e3e3db] text-black">
                    <span className="text-4xl font-bold tracking-tighter uppercase md:text-5xl opacity-30">{project.title}</span>
                    <span className="font-mono text-xs tracking-widest uppercase opacity-30">{project.category}</span>
                </div>

                {/* 2. Satır (Dark - Active Hover State) */}
                <div className="h-[100px] flex items-center justify-between px-6 bg-black text-white">
                    <span className="text-4xl font-bold tracking-tighter uppercase transition-transform translate-x-4 md:text-5xl">{project.title}</span>
                    <div className="flex flex-col text-right">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#e3e3db]">{project.client}</span>
                        <span className="font-mono text-[10px] opacity-50">{project.year}</span>
                    </div>
                </div>

                {/* 3. Satır (Light - Top Initial State) */}
                <div className="h-[100px] flex items-center justify-between px-4 bg-[#e3e3db] text-black">
                    <span className="text-4xl font-bold tracking-tighter uppercase md:text-5xl">{project.title}</span>
                    <span className="font-mono text-xs tracking-widest uppercase opacity-60">{project.category}</span>
                </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
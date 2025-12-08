'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function ProjectList({ projects }) {
  const previewContainerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Başlangıçta tüm satırları "kapalı" (üst) pozisyonda başlat
      gsap.set(".project-roll-wrapper", { y: -200 }); // -200px: Varsayılan pasif durum
    }, listRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e, index, project) => {
    // MOBİL KONTROLÜ: 1024px altındaki cihazlarda hover efekti çalışmasın
    if (window.innerWidth < 1024) return;

    const target = e.currentTarget;
    const wrapper = target.querySelector('.project-roll-wrapper');
    
    // Satırı "aktif" (orta) pozisyona çek
    gsap.to(wrapper, { y: -100, duration: 0.4, ease: "power2.out" });

    // Resim Gösterme Mantığı
    if(previewContainerRef.current) {
        // Eski resimleri temizle
        const oldImages = previewContainerRef.current.querySelectorAll('img');
        oldImages.forEach(img => {
            gsap.to(img, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => img.remove() });
        });

        // Yeni resim oluştur
        const img = document.createElement('img');
        img.src = project.cover;
        img.className = 'absolute top-0 left-0 object-cover w-full h-full origin-center rounded-lg shadow-2xl';
        img.style.transform = 'scale(0.8)';
        img.style.opacity = '0';
        
        previewContainerRef.current.appendChild(img);

        // Yeni resmi aç
        gsap.to(img, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  };

  const handleMouseLeave = (e) => {
    if (window.innerWidth < 1024) return;

    const target = e.currentTarget;
    const wrapper = target.querySelector('.project-roll-wrapper');
    
    // Mouse çıkınca satırı tekrar pasif duruma al (Aşağıdan yukarı dönüyormuş gibi efekt)
    // Eğer mouse üstten çıktıysa -200 (top), alttan çıktıysa 0 (bottom) yapılabilir ama basitlik için resetliyoruz.
    gsap.to(wrapper, { y: -200, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div ref={listRef} className="relative w-full px-4 pt-10 pb-40 md:px-10">
      
      {/* SADECE MASAÜSTÜNDE GÖRÜNEN PREVIEW ALANI */}
      <div 
        ref={previewContainerRef}
        className="hidden lg:block fixed bottom-10 right-10 w-[400px] h-[280px] z-50 pointer-events-none"
      >
        {/* JS ile eklenen resimler buraya gelir */}
      </div>

      <div className="flex flex-col border-t border-black/10 dark:border-white/10">
        {projects.map((project, index) => (
          <Link 
            key={project.id} 
            href={`/project/${project.slug}`}
            className="group relative block w-full h-[100px] overflow-hidden border-b border-black/10 dark:border-white/10 cursor-pointer"
            onMouseEnter={(e) => handleMouseEnter(e, index, project)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Animasyon Wrapper */}
            <div className="project-roll-wrapper h-[300px] w-full relative">
                
                {/* Durum 3: Pasif (Varsayılan - Light) */}
                <div className="h-[100px] flex items-center justify-between px-2 md:px-4 bg-[#f3f2ed] text-black">
                    <span className="text-2xl font-bold tracking-tighter uppercase transition-opacity md:text-5xl opacity-40 group-hover:opacity-100">
                        {project.title}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase opacity-40">
                        {project.category}
                    </span>
                </div>

                {/* Durum 2: Aktif (Hover - Dark) */}
                <div className="h-[100px] flex items-center justify-between px-4 md:px-6 bg-black text-white">
                    <span className="text-2xl font-bold tracking-tighter uppercase transition-transform md:text-5xl md:translate-x-4">
                        {project.title}
                    </span>
                    <div className="flex flex-col text-right">
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#e3e3db]">{project.client}</span>
                        <span className="font-mono text-[10px] opacity-50">{project.year}</span>
                    </div>
                </div>

                {/* Durum 1: Alternatif Pasif (Animasyon Döngüsü İçin) */}
                <div className="h-[100px] flex items-center justify-between px-2 md:px-4 bg-[#f3f2ed] text-black">
                    <span className="text-2xl font-bold tracking-tighter uppercase md:text-5xl opacity-40">{project.title}</span>
                    <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase opacity-40">{project.category}</span>
                </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
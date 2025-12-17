'use client';

import { useEffect, useRef } from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import { gsap } from 'gsap';

export default function ProjectList({ projects }) {
  const previewContainerRef = useRef(null);
  const listRef = useRef(null);
  const isHoveringRef = useRef(false);
  const hideCallRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.project-roll-wrapper', { y: -200 });
    }, listRef);
    return () => {
      ctx.revert();
      if (hideCallRef.current) { hideCallRef.current.kill(); hideCallRef.current = null; }
    };
  }, []);

  const hidePreview = () => {
    const container = previewContainerRef.current;
    if (!container) return;
    const imgs = Array.from(container.querySelectorAll('img'));
    imgs.forEach((img) => {
      gsap.killTweensOf(img);
      gsap.to(img, {
        scale: 0.85, opacity: 0, duration: 0.25, ease: 'power2.out',
        onComplete: () => img.remove(),
      });
    });
  };

  const showPreview = (project) => {
    const container = previewContainerRef.current;
    if (!container) return;
    const oldImages = Array.from(container.querySelectorAll('img'));
    oldImages.forEach((img) => {
      gsap.killTweensOf(img);
      gsap.to(img, {
        scale: 0.85, opacity: 0, duration: 0.2, ease: 'power2.out',
        onComplete: () => img.remove(),
      });
    });
    const img = document.createElement('img');
    img.src = project.cover;
    img.className = 'absolute top-0 left-0 object-cover w-full h-full origin-center rounded-lg shadow-2xl';
    img.style.transform = 'scale(0.8)';
    img.style.opacity = '0';
    container.appendChild(img);
    gsap.to(img, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' });
  };

  const handleMouseEnter = (e, project) => {
    if (window.innerWidth < 1024) return;
    isHoveringRef.current = true;
    if (hideCallRef.current) { hideCallRef.current.kill(); hideCallRef.current = null; }
    const target = e.currentTarget;
    const wrapper = target.querySelector('.project-roll-wrapper');
    if (wrapper) gsap.to(wrapper, { y: -100, duration: 0.4, ease: 'power2.out' });
    showPreview(project);
  };

  const handleMouseLeave = (e) => {
    if (window.innerWidth < 1024) return;
    isHoveringRef.current = false;
    const target = e.currentTarget;
    const wrapper = target.querySelector('.project-roll-wrapper');
    if (wrapper) gsap.to(wrapper, { y: -200, duration: 0.4, ease: 'power2.out' });
    if (hideCallRef.current) hideCallRef.current.kill();
    hideCallRef.current = gsap.delayedCall(0.06, () => {
      if (!isHoveringRef.current) hidePreview();
    });
  };

  return (
    <div ref={listRef} className="relative w-full px-4 pt-10 pb-40 md:px-10">
      <div ref={previewContainerRef} className="hidden lg:block fixed bottom-10 right-10 w-[400px] h-[280px] z-50 pointer-events-none" />
      <div className="flex flex-col border-t border-black/10 dark:border-white/10">
        {projects.map((project, index) => (
          <TransitionLink
            key={project.id ?? index}
            href={`/project/${project.slug}`}
            className="group relative block w-full h-[100px] overflow-hidden border-b border-black/10 dark:border-white/10 cursor-pointer"
            onMouseEnter={(e) => handleMouseEnter(e, project)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="project-roll-wrapper h-[300px] w-full relative">
              
              {/* 1. STATE (NORMAL) */}
              <div className="h-[100px] flex items-center justify-between px-2 md:px-4 bg-[#f3f2ed] text-black">
                {/* GÜNCELLEME: font-heading eklendi */}
                <span className="text-2xl font-bold tracking-tighter uppercase transition-opacity font-heading md:text-5xl opacity-40 group-hover:opacity-100">{project.title}</span>
                <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase opacity-40">{project.category}</span>
              </div>

              {/* 2. STATE (HOVER - ORTA) */}
              <div className="h-[100px] flex items-center justify-between px-4 md:px-6 bg-black text-white">
                {/* GÜNCELLEME: font-heading eklendi */}
                <span className="text-2xl font-bold tracking-tighter uppercase transition-transform font-heading md:text-5xl md:translate-x-4">{project.title}</span>
                <div className="flex flex-col text-right">
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#e3e3db]">{project.client}</span>
                  <span className="font-mono text-[10px] opacity-50">{project.year}</span>
                </div>
              </div>

              {/* 3. STATE (ALT) */}
              <div className="h-[100px] flex items-center justify-between px-2 md:px-4 bg-[#f3f2ed] text-black">
                {/* GÜNCELLEME: font-heading eklendi */}
                <span className="text-2xl font-bold tracking-tighter uppercase font-heading md:text-5xl opacity-40">{project.title}</span>
                <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase opacity-40">{project.category}</span>
              </div>

            </div>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
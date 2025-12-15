'use client';

import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const toRoman = (num) => {
  const lookup = { M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1 };
  let roman = '';
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

export default function ProjectNavigation({ project, nextProject, prevProject, allProjects }) {
  const [isOpen, setIsOpen] = useState(false);

  const overlayRef = useRef(null);
  const menuRef = useRef(null);

  const currentIndex = useMemo(
    () => allProjects.findIndex((p) => p.id === project.id) + 1,
    [allProjects, project.id]
  );

  const total = allProjects.length;
  const roman = toRoman(currentIndex);

  // Scroll Progress
  useEffect(() => {
    const bars = () => document.querySelectorAll('.nav-progress-fill');

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: (self) => {
        const w = `${self.progress * 100}%`;
        bars().forEach((bar) => gsap.set(bar, { width: w }));
      },
    });

    return () => trigger.kill();
  }, []);

  // Overlay + Menu animasyonu + ESC
  useLayoutEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);

    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.18, ease: 'power2.out' }
      );
    }

    if (menuRef.current) {
      // Mobilde menü alttan yukarı doğru açılmalı (y: 10 -> y: 0)
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power3.out' }
      );
    }

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* GLOBAL CONTAINER */}
      {/* h-screen veya fixed inset-0 ile tam ekranı kaplıyor, flex ile içeriği dağıtıyoruz */}
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-between p-4 md:p-8">

        {/* ---------------- DESKTOP NAVBAR (Top) ---------------- */}
        <nav className="relative items-start justify-center hidden w-full md:flex">
          <div className="pointer-events-auto">
            <div className="relative h-12 flex items-center gap-2 rounded-full border border-black/10 bg-white/85 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.12)] px-2">
              {/* Prev */}
              <Link
                href={`/project/${prevProject.slug}`}
                className="group h-10 w-10 rounded-full border border-black/10 bg-white flex items-center justify-center shadow-sm transition-transform hover:scale-[1.04]"
                aria-label="Previous project"
              >
                <span className="text-[16px] leading-none translate-x-[-1px]">←</span>
              </Link>

              {/* Portal */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="group relative h-10 min-w-[360px] rounded-full border border-black/10 bg-[#f7f7f7]/90 overflow-hidden px-4 flex items-center justify-between shadow-inner"
                aria-expanded={isOpen}
                aria-label="Open project list"
              >
                <div className="nav-progress-fill absolute left-0 bottom-0 h-[2px] w-0 bg-black/15" />

                <div className="flex items-center min-w-0 gap-3">
                  <span className="font-mono text-[11px] tracking-widest opacity-50 flex-shrink-0">
                    {roman} / {toRoman(total)}
                  </span>
                  <span className="flex-shrink-0 w-px h-4 bg-black/10" />
                  <span className="font-serif text-[16px] tracking-tight truncate max-w-[220px]">
                    {project.title}
                  </span>
                </div>

                <div className="flex items-center flex-shrink-0 gap-2">
                  <span className="text-[10px] opacity-50">LIST</span>
                  <span
                    className={`text-[10px] opacity-40 transform transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {/* Next */}
              <Link
                href={`/project/${nextProject.slug}`}
                className="group h-10 w-10 rounded-full border border-black/10 bg-white flex items-center justify-center shadow-sm transition-transform hover:scale-[1.04]"
                aria-label="Next project"
              >
                <span className="text-[16px] leading-none translate-x-[1px]">→</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* ---------------- MOBILE NAVBAR (Bottom) ---------------- */}
        {/* DEĞİŞİKLİK: mt-16 kaldırıldı, mt-auto eklendi. Bu class elemanı en alta iter. */}
        <div className="w-full pb-2 mt-auto pointer-events-auto md:hidden">
          <div className="max-w-md mx-auto">
            <div className="h-12 rounded-full border border-black/10 bg-white/85 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.12)] px-2 flex items-center gap-2">
              <Link
                href={`/project/${prevProject.slug}`}
                className="flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm border-black/10 active:scale-95"
                aria-label="Previous project"
              >
                ←
              </Link>

              <button
                onClick={() => setIsOpen((v) => !v)}
                className="relative flex-1 h-10 rounded-full border border-black/10 bg-[#f7f7f7]/90 overflow-hidden px-4 flex items-center justify-between shadow-inner min-w-0"
                aria-expanded={isOpen}
                aria-label="Open project list"
              >
                <div className="nav-progress-fill absolute left-0 bottom-0 h-[2px] w-0 bg-black/10" />

                <div className="flex items-center min-w-0 gap-2">
                  <span className="font-mono text-[10px] tracking-widest opacity-50 flex-shrink-0">
                    {roman}
                  </span>
                  <span className="font-serif text-[14px] truncate text-center flex-1">
                    {project.title}
                  </span>
                </div>

                <span
                  className={`text-[10px] opacity-40 transform transition-transform flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▲
                </span>
              </button>

              <Link
                href={`/project/${nextProject.slug}`}
                className="flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm border-black/10 active:scale-95"
                aria-label="Next project"
              >
                →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY + MENU */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] pointer-events-auto">
          <button
            ref={overlayRef}
            onClick={close}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            aria-label="Close menu"
          />

          {/* Desktop dropdown (Üstte) */}
          <div className="hidden md:block">
            <div
              ref={menuRef}
              className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[380px]
                          rounded-3xl border border-white/30 bg-white/90 backdrop-blur-2xl
                          shadow-[0_30px_80px_rgba(0,0,0,0.22)] overflow-hidden"
            >
               {/* Desktop Menu Content (Same as before) */}
               <div className="px-6 pt-6 pb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] tracking-[0.22em] uppercase opacity-50">Projects</span>
                  <span className="font-mono text-[11px] opacity-45">
                    {currentIndex} / {total}
                  </span>
                </div>
              </div>
              <div className="max-h-[60vh] overflow-y-auto no-scrollbar pb-4">
                {allProjects.map((p, i) => {
                  const active = p.id === project.id;
                  return (
                    <Link
                      key={p.id}
                      href={`/project/${p.slug}`}
                      onClick={close}
                      className={`group block px-6 py-3 transition-colors ${
                        active ? 'bg-black/[0.04]' : 'hover:bg-black/[0.03]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div
                            className={`font-serif text-[18px] tracking-tight truncate ${
                              active ? 'text-black' : 'text-black/60 group-hover:text-black/85'
                            }`}
                          >
                            {p.title}
                          </div>
                          <div className="text-[10px] tracking-[0.22em] uppercase opacity-40 mt-1">
                            {toRoman(i + 1)}
                          </div>
                        </div>
                        <div
                          className={`h-2 w-2 rounded-full flex-shrink-0 ${
                            active ? 'bg-black/60' : 'bg-black/15 group-hover:bg-black/30'
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile popup (Altta) */}
          <div className="md:hidden">
            <div
              ref={menuRef}
              // DEĞİŞİKLİK: bottom-24 ile menüyü navbarın hemen üstünde açıyoruz
              className="absolute left-1/2 -translate-x-1/2 bottom-24 w-[92%] max-w-md
                          rounded-3xl border border-white/25 bg-white/92 backdrop-blur-2xl
                          shadow-[0_30px_80px_rgba(0,0,0,0.22)] overflow-hidden"
            >
              <div className="flex items-baseline justify-between px-5 pt-5 pb-3">
                <span className="text-[11px] tracking-[0.22em] uppercase opacity-50">Projects</span>
                <span className="font-mono text-[11px] opacity-45">
                  {currentIndex} / {total}
                </span>
              </div>

              <div className="max-h-[50vh] overflow-y-auto no-scrollbar pb-4">
                {allProjects.map((p, i) => {
                  const active = p.id === project.id;
                  return (
                    <Link
                      key={p.id}
                      href={`/project/${p.slug}`}
                      onClick={close}
                      className={`block px-5 py-3 transition-colors ${
                        active ? 'bg-black/[0.04]' : 'active:bg-black/[0.03]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div
                            className={`font-serif text-[18px] tracking-tight truncate ${
                              active ? 'text-black' : 'text-black/65'
                            }`}
                          >
                            {p.title}
                          </div>
                          <div className="text-[10px] tracking-[0.22em] uppercase opacity-40 mt-1">
                            {toRoman(i + 1)}
                          </div>
                        </div>
                        <div className={`h-2 w-2 rounded-full ${active ? 'bg-black/60' : 'bg-black/15'}`} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
'use client';
import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/ui/TransitionLink';
import { projects } from '@/lib/data';
import TextRevealScrub from '@/components/TextRevealScrub';
import ProjectGrid from './projects/components/ProjectGrid';

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

// Hizmetler Verisi
const services = [
  { id: '01', title: 'Art Direction', desc: 'Visual storytelling and brand aesthetics.' },
  { id: '02', title: 'Web Design', desc: 'User-centric interfaces with modern UX.' },
  { id: '03', title: 'Creative Dev', desc: 'React, Next.js & Creative Coding.' },
  { id: '04', title: '3D & Motion', desc: 'Interactive WebGL and fluid animations.' },
];

export default function Home() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const heroTextContainerRef = useRef(null);
  const servicesRef = useRef(null);

  // --- CURSOR STATE ---
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // İmleç Boyutu
  const CURSOR_SIZE = 100;

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  // ---------------------------------------------------------
  // 1. CUSTOM CURSOR MOUSE TAKİP
  // ---------------------------------------------------------
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    let xTo, yTo;

    if (cursorRef.current) {
        gsap.set(cursorRef.current, { xPercent: 0, yPercent: 0, x: 0, y: 0 });
        xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
    }

    const moveCursor = (e) => {
      if (window.innerWidth >= 1024 && cursorRef.current && xTo && yTo) {
        xTo(e.clientX - CURSOR_SIZE / 2);
        yTo(e.clientY - CURSOR_SIZE / 2);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  // ---------------------------------------------------------
  // 2. CURSOR DURUM ANİMASYONU
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isDesktop || !cursorRef.current) return;

    if (isHoveringProject) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [isHoveringProject, isDesktop]);

  const handleProjectEnter = () => { if(isDesktop) setIsHoveringProject(true); };
  const handleProjectLeave = () => { if(isDesktop) setIsHoveringProject(false); };

  // ---------------------------------------------------------
  // 3. SAYFA ANİMASYONLARI
  // ---------------------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- HERO LOAD ---
      const tlLoad = gsap.timeline({ delay: 0.2 });
      tlLoad.fromTo('.hero-line-inner', { y: '110%', skewY: 10 }, { y: '0%', skewY: 0, duration: 1.5, stagger: 0.1, ease: 'power4.out' })
            .fromTo('.hero-sub', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }, "-=1");

      // --- HERO SCROLL ---
      gsap.to(heroTextContainerRef.current, {
        yPercent: 30, opacity: 0, scale: 0.98, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      });

      // --- GRID ÇİZGİ ANİMASYONLARI ---
      const borders = gsap.utils.toArray('.anim-border');
      borders.forEach(border => {
          gsap.fromTo(border, 
              { scaleX: 0, transformOrigin: "left" },
              { scaleX: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: border, start: "top 95%" } }
          );
      });

      const vBorders = gsap.utils.toArray('.anim-border-v');
      vBorders.forEach(border => {
          gsap.fromTo(border, 
              { scaleY: 0, transformOrigin: "top" },
              { scaleY: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: border, start: "top 95%" } }
          );
      });

      // --- SERVICES LIST ANIMATION ---
      const serviceItems = servicesRef.current.querySelectorAll('.service-item');
      gsap.fromTo(serviceItems, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="text-black bg-white selection:bg-black selection:text-white">
      
      {/* CUSTOM CURSOR */}
      <div 
        ref={cursorRef}
        className="hidden lg:flex fixed top-0 left-0 z-[9999] pointer-events-none items-center justify-center mix-blend-difference"
        style={{ width: `${CURSOR_SIZE}px`, height: `${CURSOR_SIZE}px`, opacity: 0, transform: 'scale(0)' }} 
      >
        <div className="absolute inset-0 bg-white rounded-full opacity-100"></div>
        <span ref={cursorTextRef} className="relative z-10 text-xs font-bold tracking-widest text-black uppercase">View</span>
      </div>

      {/* --- HERO SECTION --- */}
      <div ref={heroRef} className="relative flex items-center w-full min-h-[85svh] md:min-h-screen px-6 overflow-hidden bg-[#e3e3db] md:px-12">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
           <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        </div>

        <div ref={heroTextContainerRef} className="relative z-10 flex flex-col items-start justify-end w-full gap-8 mt-20 md:flex-row md:items-end md:justify-between md:gap-0 md:mt-0 md:mb-10">
            {/* DÜZELTME YAPILAN KISIM: 
                -ml-[0.05em] eklenerek fontun solundaki doğal boşluk alındı.
                Böylece aşağıdaki grid çizgisiyle optik olarak mükemmel hizalanır.
            */}
            <div className="flex flex-col font-black leading-[0.9] tracking-tighter text-[#1c1c1c] uppercase text-[7vw] md:text-[6vw] mix-blend-multiply w-full md:w-auto -ml-[0.09em]">
                <div className="overflow-hidden whitespace-nowrap"><span className="block hero-line-inner will-change-transform">Independent <span className="font-serif italic text-black/80">Creative</span></span></div>
                <div className="overflow-hidden whitespace-nowrap"><span className="block hero-line-inner will-change-transform">Designer & Developer</span></div>
            </div>
            
            <div className="w-full md:w-[350px] hero-sub md:text-right md:pb-2">
                <p className="text-base font-medium leading-relaxed md:text-base opacity-70">
                    I help brands and agencies build immersive digital experiences. Focusing on interaction, motion, and clean code.
                </p>
            </div>
        </div>
      </div>

      {/* --- INTRO & SERVICES --- */}
      <div className="relative z-30 bg-[#0a0a0a] text-white py-24 md:py-40 px-6 md:px-12 min-h-screen flex flex-col justify-between rounded-t-3xl -mt-10 border-t border-white/10 shadow-2xl">
        <div className="relative w-full border-t border-white/10">
           <div className="absolute top-0 left-0 w-full h-px origin-left bg-white anim-border"></div>

           <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Row 1 */}
              <div className="relative py-12 pl-0 pr-6 border-b border-white/10 md:col-span-4 md:border-r md:pr-12">
                  <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-white anim-border"></div>
                  <div className="absolute top-0 right-0 hidden w-px h-full origin-top bg-white anim-border-v md:block"></div>
                  <span className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/40">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Who I Am
                  </span>
              </div>
              <div className="relative py-12 pl-0 border-b md:col-span-8 md:pl-12 border-white/10">
                  <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-white anim-border"></div>
                  <TextRevealScrub staggerEach={0.16} start="top 85%" end="bottom 15%">
                    <h2 className="text-3xl md:text-5xl lg:text-[3.5vw] font-light leading-[1.15] tracking-tight text-white">
                      I craft identities and experiences for the bold. Blurring the lines between reality and fiction through code and design.
                    </h2>
                  </TextRevealScrub>
              </div>

              {/* Row 2 */}
              <div className="relative py-12 pl-0 pr-6 border-b border-white/10 md:col-span-4 md:border-r md:pr-12">
                  <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-white anim-border"></div>
                  <div className="absolute top-0 right-0 hidden w-px h-full origin-top bg-white anim-border-v md:block"></div>
                  <span className="block mb-6 font-mono text-xs tracking-widest uppercase text-white/40">
                      My Expertise
                  </span>
                  <p className="max-w-xs text-sm leading-relaxed text-white/60">
                      Combining strategy, design, and technology to build brands that matter in culture.
                  </p>
              </div>
              <div ref={servicesRef} className="relative py-12 pl-0 border-b md:col-span-8 md:pl-12 border-white/10">
                  <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-white anim-border"></div>
                  <div className="flex flex-col">
                      {services.map((service, index) => (
                          <div key={index} className="flex flex-col justify-between py-8 transition-colors border-b cursor-default service-item group md:flex-row md:items-baseline border-white/10 hover:border-white/50">
                              <div className="flex items-baseline gap-6">
                                  <span className="font-mono text-xs text-white/30">({service.id})</span>
                                  <h3 className="text-2xl font-normal transition-transform duration-500 ease-out origin-left md:text-4xl group-hover:scale-105 group-hover:text-white">
                                      {service.title}
                                  </h3>
                              </div>
                              <p className="mt-2 font-mono text-sm transition-opacity duration-300 md:mt-0 text-white/40 group-hover:text-white/70">
                                  {service.desc}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* --- SELECTED WORKS --- */}
      <div className="relative z-30 bg-[#f3f2ed] pt-24 pb-24 md:pt-32 md:pb-32 rounded-t-3xl -mt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 md:px-12">
        <div className="relative w-full border-t border-black/10">
             <div className="absolute top-0 left-0 w-full h-px origin-left bg-black/10 anim-border"></div>
             <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="relative py-12 pl-0 pr-6 border-b border-black/10 md:col-span-4 md:border-r md:pr-12 md:border-b-0">
                    <div className="absolute bottom-0 left-0 w-full h-px origin-left md:hidden bg-black/10 anim-border"></div>
                    <div className="absolute top-0 right-0 hidden w-px h-full origin-top bg-black/10 anim-border-v md:block"></div>
                    <div className="sticky top-24">
                        <span className="flex items-center gap-2 mb-2 font-mono text-xs tracking-widest uppercase text-black/40">
                            <span className="w-2 h-2 bg-black rounded-full"></span>
                            Selected Works
                        </span>
                        <span className="block font-mono text-xs text-black/30">2023 — 2025</span>
                        <p className="hidden mt-8 text-sm leading-relaxed md:block text-black/60 max-w-[200px]">
                            A curated selection of projects focusing on interaction, performance, and visual impact.
                        </p>
                        <div className="hidden mt-12 md:block">
                            <TransitionLink href="/projects">
                                <button className="relative px-6 py-3 overflow-hidden transition-colors duration-300 bg-transparent border rounded-full group border-black/10 hover:border-black">
                                    <div className="absolute inset-0 w-full h-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                                    <span className="relative z-10 text-xs font-bold tracking-widest text-black uppercase transition-colors duration-300 group-hover:text-white">All Projects</span>
                                </button>
                            </TransitionLink>
                        </div>
                    </div>
                </div>
                <div className="relative py-12 pl-0 md:col-span-8 md:pl-12">
                    <ProjectGrid 
                        projects={projects.slice(0, 4)} 
                        onMouseEnter={handleProjectEnter} 
                        onMouseLeave={handleProjectLeave}
                    />
                    <div className="flex justify-center mt-12 md:hidden">
                        <TransitionLink href="/projects">
                            <button className="relative px-8 py-4 overflow-hidden transition-colors duration-300 bg-transparent border rounded-full group border-black/10 hover:border-black">
                                <div className="absolute inset-0 w-full h-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                                <span className="relative z-10 text-sm font-bold tracking-widest text-black uppercase transition-colors duration-300 group-hover:text-white">View All</span>
                            </button>
                        </TransitionLink>
                    </div>
                </div>
             </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="relative z-20 px-6 pt-20 pb-40 bg-white md:px-12">
          <div className="flex flex-col items-center justify-center text-center">
              <span className="mb-6 font-mono text-xs tracking-widest uppercase text-black/40">Got an idea?</span>
              <TransitionLink href="/contact" className="group">
                  <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none text-black transition-colors duration-500 group-hover:text-gray-400">Lets Talk</h2>
                  <div className="w-full h-1 mt-2 transition-transform duration-500 origin-center scale-x-0 bg-black group-hover:scale-x-100"></div>
              </TransitionLink>
          </div>
      </div>
      
    </div>
  );
}
'use client';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectList from './projects/components/ProjectList';
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

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. HERO GİRİŞ ANİMASYONU (LOAD) ---
      const tlLoad = gsap.timeline({ delay: 0.2 });

      tlLoad.fromTo('.hero-line-inner',
        { y: '110%', skewY: 10 },
        { 
          y: '0%', 
          skewY: 0,
          duration: 1.5, 
          stagger: 0.15, 
          ease: 'power4.out' 
        }
      )
      .fromTo('.hero-sub', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 
        "-=0.5"
      );

      // --- 2. HERO SCROLL ANİMASYONU (PARALLAX) ---
      gsap.to(heroTextContainerRef.current, {
        yPercent: 50,
        opacity: 0,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // --- 3. SERVICES LIST ANIMATION ---
      const serviceItems = servicesRef.current.querySelectorAll('.service-item');
      gsap.fromTo(serviceItems, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="text-black bg-white selection:bg-black selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <div ref={heroRef} className="relative flex flex-col justify-center md:justify-end w-full min-h-[85svh] md:min-h-screen px-4 md:pb-32 overflow-hidden bg-[#e3e3db] md:px-10">
        
        {/* Arka plan dekoratif grid çizgileri */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
           <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        </div>

        {/* Hero İçerik Kutusu */}
        <div ref={heroTextContainerRef} className="relative z-10 flex flex-col w-full">
            
            {/* DEVASA BAŞLIK (Maskeleme Efektli) */}
            <div className="flex flex-col font-black leading-[0.8] tracking-tighter text-[#1c1c1c] uppercase text-[13vw] md:text-[15vw] mix-blend-multiply">
                
                {/* 1. Satır: CREATIVE */}
                <div className="overflow-hidden">
                    <span className="block hero-line-inner">Creative</span>
                </div>
                
                {/* 2. Satır: DEVELOPER */}
                <div className="overflow-hidden">
                    <span className="block font-serif italic hero-line-inner text-black/80">
                        Developer
                    </span>
                </div>

                {/* 3. Satır: & DESIGNER */}
                <div className="overflow-hidden">
                    <span className="block text-right md:text-left hero-line-inner">
                        & Designer
                    </span>
                </div>

            </div>

            {/* Alt Açıklama */}
            <div className="mt-8 md:mt-16 md:w-1/3 hero-sub">
                <p className="text-base leading-relaxed md:text-xl">
                    I help brands and agencies build immersive digital experiences. 
                    Focusing on interaction, motion, and clean code.
                </p>
            </div>

        </div>

        {/* Scroll İndikatörü */}
        {/* GÜNCELLEME: bottom-6 -> bottom-24 (Mobil), md:bottom-10 -> md:bottom-32 (Masaüstü) */}
        <div className="absolute opacity-50 bottom-24 right-4 md:bottom-32 md:right-10 animate-bounce hero-sub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
        </div>

      </div>

      {/* --- INTRO & SERVICES (DARK SECTION) --- */}
      <div className="relative z-30 bg-[#0a0a0a] text-white py-24 md:py-40 px-6 md:px-10 min-h-screen flex flex-col justify-between rounded-t-3xl -mt-10 border-t border-white/10 shadow-2xl">
        
        {/* Mission Statement */}
        <div className="grid grid-cols-1 mb-24 md:mb-32 md:grid-cols-12 gap-y-10 md:gap-x-10">
           <div className="col-span-1 md:col-span-4">
              <span className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/40">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Who I Am
              </span>
           </div>
           <div className="col-span-1 md:col-span-8">
              <TextRevealScrub staggerEach={0.16} start="top 85%" end="bottom 15%">
                <h2 className="text-3xl md:text-5xl lg:text-[3.5vw] font-light leading-[1.15] tracking-tight text-white">
                  I craft identities and experiences for the bold. Blurring the lines between reality and fiction through code and design.
                </h2>
              </TextRevealScrub>
           </div>
        </div>

        {/* Services List */}
        <div ref={servicesRef} className="grid grid-cols-1 pt-16 border-t md:pt-20 md:grid-cols-12 gap-y-10 md:gap-x-10 border-white/10">
            <div className="col-span-1 md:col-span-4">
                <span className="block mb-6 font-mono text-xs tracking-widest uppercase text-white/40">
                    My Expertise
                </span>
                <p className="max-w-xs text-sm leading-relaxed text-white/60">
                    Combining strategy, design, and technology to build brands that matter in culture.
                </p>
            </div>
            <div className="col-span-1 md:col-span-8">
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

      {/* --- SELECTED WORKS SECTION --- */}
      <div className="relative z-30 bg-[#f3f2ed] pt-24 pb-24 md:pt-32 md:pb-32 rounded-t-3xl -mt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex items-end justify-between px-6 mb-12 md:mb-16 md:px-10">
          <span className="font-mono text-xs tracking-widest text-black uppercase opacity-40">
              Selected Works
          </span>
          <span className="hidden font-mono text-xs text-black md:block opacity-30">
              2023 — 2025
          </span>
        </div>
        
        <ProjectGrid projects={projects.slice(0, 4)} />
        
        <div className="flex justify-center mt-20 md:mt-24">
          <TransitionLink href="/projects">
            <button className="relative px-8 py-4 overflow-hidden transition-colors duration-300 bg-transparent border rounded-full group border-black/10 hover:border-black">
                <div className="absolute inset-0 w-full h-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                <span className="relative z-10 text-sm font-bold tracking-widest text-black uppercase transition-colors duration-300 group-hover:text-white">
                    View All Projects
                </span>
            </button>
          </TransitionLink>
        </div>
      </div>

      {/* --- NEW CTA SECTION --- */}
      <div className="relative z-20 px-6 pt-20 pb-40 bg-white md:px-10">
          <div className="flex flex-col items-center justify-center text-center">
              <span className="mb-6 font-mono text-xs tracking-widest uppercase text-black/40">
                  Got an idea?
              </span>
              <TransitionLink href="/contact" className="group">
                  <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none text-black transition-colors duration-500 group-hover:text-gray-400">
                      Lets Talk
                  </h2>
                  <div className="w-full h-1 mt-2 transition-transform duration-500 origin-center scale-x-0 bg-black group-hover:scale-x-100"></div>
              </TransitionLink>
          </div>
      </div>
      
    </div>
  );
}
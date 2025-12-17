'use client';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '@/components/ui/TransitionLink';
import ProjectList from './projects/components/ProjectList';
import { projects } from '@/lib/data';
import TextRevealScrub from '@/components/TextRevealScrub';

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

// Hizmetler Verisi
const services = [
  { id: '01', title: 'Art Direction', desc: 'Visual storytelling and brand aesthetics.' },
  { id: '02', title: 'Web Design', desc: 'User-centric interfaces with modern UX.' },
  { id: '03', title: 'Development', desc: 'Creative coding, React & Next.js solutions.' },
  { id: '04', title: '3D Motion', desc: 'Interactive WebGL and fluid animations.' },
];

export default function Home() {
  // const t = useTranslations('Hero');
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const videoContainerRef = useRef(null);
  // const videoRef = useRef(null); // Doğrudan video elementine animasyon vermediğimiz için buna gerek kalmadı
  const textRef = useRef(null);
  const servicesRef = useRef(null);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. HERO ANIMATION
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      });
      
      // Animasyon container'a uygulandığı için içeride hangi videonun oynadığı fark etmez, ikisi de animasyona dahil olur.
      tlHero.fromTo(videoContainerRef.current,
        { clipPath: 'inset(10% 20% 10% 20% round 10px)', scale: 0.95 },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, duration: 1, ease: 'power2.inOut' }
      ).to(textRef.current,
        { scale: 1.2, y: -50, opacity: 0, duration: 0.5, ease: 'power1.in' }, '<'
      );

      // 2. SERVICES LIST ANIMATION
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
    <div ref={mainRef} className="text-black bg-white">
      
      {/* --- HERO SECTION --- */}
      <div ref={heroRef} className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-white">
        
        <div ref={textRef} className="absolute z-20 px-4 text-center text-white pointer-events-none mix-blend-difference">
           {/* Hero Metni Buraya Gelebilir */}
        </div>

        <div ref={videoContainerRef} className="relative z-10 w-full h-full">
          
          {/* 1. DESKTOP VIDEO (md ve üzeri ekranlarda görünür) */}
          <video 
            className="absolute top-0 left-0 hidden object-cover w-full h-full md:block" 
            autoPlay 
            muted 
            loop 
            playsInline 
            poster="/assets/img1.jpg"
          >
            <source src="/assets/Real (1).mp4" type="video/mp4" />
          </video>

          {/* 2. MOBILE VIDEO (sadece md altı ekranlarda görünür) */}
          {/* DİKKAT: '/assets/hero-video-mobile.mp4' dosyasını projene eklemeyi unutma */}
          <video 
            className="absolute top-0 left-0 block object-cover w-full h-full md:hidden" 
            autoPlay 
            muted 
            loop 
            playsInline 
            poster="/assets/img1-mobile.jpg" // İstersen mobile özel poster de koyabilirsin
          >
            <source src="/assets/Real (3).mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* --- INTRO & SERVICES (DARK SECTION) --- */}
      <div className="relative z-30 bg-[#0a0a0a] text-white py-32 md:py-40 px-6 md:px-10 min-h-screen flex flex-col justify-between rounded-t-3xl -mt-10">
        
        {/* Mission Statement */}
        <div className="grid grid-cols-1 mb-32 md:grid-cols-12 gap-y-10 md:gap-x-10">
           <div className="col-span-1 md:col-span-4">
              <span className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/40">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Who We Are
              </span>
           </div>
           <div className="col-span-1 md:col-span-8">
              <TextRevealScrub staggerEach={0.16} start="top 85%" end="bottom 15%">
                <h2 className="text-3xl md:text-5xl lg:text-[3.5vw] font-light leading-[1.15] tracking-tight text-white">
                  We craft identities and experiences for the bold. Blurring the lines between reality and fiction.
                </h2>
              </TextRevealScrub>
           </div>
        </div>

        {/* Services List */}
        <div ref={servicesRef} className="grid grid-cols-1 pt-20 border-t md:grid-cols-12 gap-y-10 md:gap-x-10 border-white/10">
            <div className="col-span-1 md:col-span-4">
                <span className="block mb-6 font-mono text-xs tracking-widest uppercase text-white/40">
                    Our Capabilities
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
      <div className="relative z-30 bg-[#f3f2ed] pt-32 pb-32 rounded-t-3xl -mt-10">
        <div className="flex items-end justify-between px-6 mb-16 md:px-10">
          <span className="font-mono text-xs tracking-widest text-black uppercase opacity-40">
              Selected Works
          </span>
          <span className="hidden font-mono text-xs text-black md:block opacity-30">
              2023 — 2025
          </span>
        </div>
        
        <ProjectList projects={projects.slice(0, 4)} />
        
        <div className="flex justify-center mt-24">
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
                      Let's Talk
                  </h2>
                  <div className="w-full h-1 mt-2 transition-transform duration-500 origin-center scale-x-0 bg-black group-hover:scale-x-100"></div>
              </TransitionLink>
          </div>
      </div>
      
    </div>
  );
}
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

export default function Home() {
  const t = useTranslations('Hero');
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      });
      tl.fromTo(videoContainerRef.current,
        { clipPath: 'inset(10% 20% 10% 20% round 10px)', scale: 0.95 },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, duration: 1, ease: 'power2.inOut' }
      ).to(textRef.current,
        { scale: 1.2, y: -50, opacity: 0, duration: 0.5, ease: 'power1.in' }, '<'
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="text-black bg-white">
      <div ref={heroRef} className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-white">
        <div ref={textRef} className="absolute z-20 px-4 text-center text-white pointer-events-none mix-blend-difference">
          <h1 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-4">Umut</h1>
        </div>
        <div ref={videoContainerRef} className="relative z-10 w-full h-full">
          <video ref={videoRef} className="absolute top-0 left-0 object-cover w-full h-full" autoPlay muted loop playsInline poster="/assets/img1.jpg">
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
      <div className="relative z-30 bg-[#0a0a0a] text-white py-32 px-6 md:px-10 min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-[90%] mx-auto mb-24">
          <TextRevealScrub staggerEach={0.16} start="top 85%" end="bottom 15%">
            <h2 className="text-3xl md:text-5xl lg:text-[3.5vw] font-light leading-[1.2] tracking-tight text-gray-200">
              We craft identities and experiences for the bold. Blurring the lines between reality and fiction.
            </h2>
          </TextRevealScrub>
        </div>
      </div>
      <div className="relative z-30 bg-[#f3f2ed] pt-20 pb-20">
        <div className="px-6 mb-10 md:px-10">
          <span className="font-mono text-xs tracking-widest uppercase opacity-40">Selected Works</span>
        </div>
        <ProjectList projects={projects.slice(0, 4)} />
        <div className="flex justify-center mt-20">
          <TransitionLink href="/projects">
            <button className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors bg-black rounded-full hover:bg-zinc-800">
              View All Projects
            </button>
          </TransitionLink>
        </div>
      </div>
      
    </div>
  );
}
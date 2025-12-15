'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealScrub({
  children,
  className = '',
  delay = 0,
  reveal = 'words',       // 'words' | 'chars' (chars daha ağır)
  spread = 900,           // desktop'ta scroll mesafesi
  staggerEach = 0.12,     // aynı anda kaç kelime açılacak hissi
  scrub = 0.6,            // 0.3-1 arası daha “smooth”
}) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    if (!elRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(elRef.current, {
        types: reveal === 'chars' ? 'chars,words' : 'words',
      });

      const targets = reveal === 'chars' ? split.chars : split.words;

      // Başlangıç state
      gsap.set(targets, { y: 28, opacity: 0, filter: 'blur(6px)' });

      const calcEnd = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 768;

        // mobilde daha kısa scroll ile bitsin:
        const scaled = spread * (isMobile ? 0.45 : 1);
        const minEnd = isMobile ? Math.min(520, vh * 1.05) : Math.min(900, vh * 1.35);

        return Math.max(minEnd, scaled);
      };

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'none', // scrub'da en iyi bu
        stagger: staggerEach,
        delay,
        scrollTrigger: {
          trigger: elRef.current,
          start: () => (window.innerWidth < 768 ? 'top 92%' : 'top 85%'),
          end: () => `+=${calcEnd()}`,
          scrub,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        split.revert();
      };
    }, elRef);

    return () => ctx.revert();
  }, [delay, reveal, spread, staggerEach, scrub]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}

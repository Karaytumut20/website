'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealScrub({
  children,
  className = "",
  delay = 0,
  spread = 900,        // scroll mesafesi (büyüdükçe daha yavaş açılır)
  staggerEach = 0.12,  // büyüdükçe aynı anda daha az kelime açılır
  scrub = 0.6,         // 0.3-1 arası “smooth” hissiyat
}) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    if (!elRef.current) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduced) return;

    let split;
    let tl;

    const build = () => {
      split?.revert();
      tl?.kill();

      split = new SplitType(elRef.current, { types: 'words' });

      // kelimeleri inline-block yap (transform düzgün çalışsın)
      split.words.forEach(w => {
        w.style.display = "inline-block";
        w.style.willChange = "transform, opacity";
      });

      gsap.set(split.words, { opacity: 0, y: 18, rotateX: -35, transformOrigin: "50% 100%" });
      gsap.set(elRef.current, { perspective: 800 });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: elRef.current,
          start: "top 85%",
          end: `+=${spread}`,
          scrub,
          invalidateOnRefresh: true,
        },
      });

      tl.to(split.words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "none", // scrub için en doğal
        duration: 1,
        stagger: { each: staggerEach, from: "start" },
        delay,
        overwrite: true,
      });
    };

    build();

    // responsive: satır kırılımları değişince tekrar split et
    const ro = new ResizeObserver(() => {
      build();
      ScrollTrigger.refresh();
    });
    ro.observe(elRef.current);

    return () => {
      ro.disconnect();
      tl?.scrollTrigger?.kill();
      tl?.kill();
      split?.revert();
    };
  }, [delay, spread, staggerEach, scrub]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}

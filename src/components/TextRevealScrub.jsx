'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function TextRevealScrub({
  children,
  className = '',
  delay = 0,

  // büyüt -> daha seyrek (az kelime)
  staggerEach = 0.16,

  start = 'top 85%',
  end = 'bottom 15%',
}) {
  const elRef = useRef(null);

  useLayoutEffect(() => {
    if (!elRef.current) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (reduced) return;

    const el = elRef.current;

    let split = null;
    let st = null;

    const buildSplit = () => {
      if (split) split.revert();
      split = new SplitType(el, { types: 'words' });

      split.words.forEach((w) => {
        w.style.display = 'inline-block';
        w.style.willChange = 'transform, opacity';
      });

      gsap.set(el, { perspective: 900 });
    };

    const setHidden = () => {
      if (!split) return;
      gsap.set(split.words, {
        opacity: 0,
        y: 18,
        rotateX: -35,
        transformOrigin: '50% 100%',
      });
    };

    const animateIn = () => {
      if (!split) return;
      gsap.killTweensOf(split.words);

      setHidden(); // her girişte sıfırdan

      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.52, // ✅ daha hızlı
        ease: 'power3.out',
        delay,
        stagger: { each: Math.max(0.06, staggerEach * 0.75), from: 'start' }, // ✅ daha hızlı
        overwrite: true,
      });
    };

    const animateOut = () => {
      if (!split) return;
      gsap.killTweensOf(split.words);

      gsap.to(split.words, {
        opacity: 0,
        y: -10,
        rotateX: 20,
        duration: 0.26, // ✅ daha hızlı
        ease: 'power2.out',
        stagger: { each: Math.max(0.01, staggerEach * 0.35), from: 'end' },
        overwrite: true,
      });
    };

    buildSplit();
    setHidden();

    st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onEnter: animateIn,
      onEnterBack: animateIn,
      onLeaveBack: animateOut,
      onLeave: animateOut, // istemezsen sil
    });

    const ro = new ResizeObserver(() => {
      buildSplit();
      setHidden();
      ScrollTrigger.refresh();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      st?.kill();
      if (split) {
        gsap.killTweensOf(split.words);
        split.revert();
      }
    };
  }, [delay, staggerEach, start, end]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}

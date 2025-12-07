'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = "", delay = 0 }) {
  const elRef = useRef(null);

  useEffect(() => {
    // Metni harflere ve kelimelere böl
    const text = new SplitType(elRef.current, { types: 'chars,words' });
    
    // Harfleri başlangıçta gizle ve aşağı it
    gsap.set(text.chars, { y: 100, opacity: 0 });

    // Animasyon
    gsap.to(text.chars, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.02,
      delay: delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: elRef.current,
        start: 'top 85%', // Görünür olduğunda başla
        toggleActions: 'play none none reverse'
      }
    });

    // Temizlik (Cleanup)
    return () => text.revert();
  }, [delay]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
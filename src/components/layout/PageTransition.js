'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTransitionContext } from '@/context/TransitionContext';

export default function PageTransition() {
  const { isFirstLoadCompleted } = useTransitionContext();
  const overlayRef = useRef(null);

  // Navigasyona karışma, sadece ilk yüklemede Preloader arkasında siyah fon ol.
  useEffect(() => {
    if (isFirstLoadCompleted) {
        gsap.set(overlayRef.current, { display: "none" });
    }
  }, [isFirstLoadCompleted]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-[#0a0a0a] pointer-events-none"
    />
  );
}

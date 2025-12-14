'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const EVENT_NAME = 'softnav';
const COOLDOWN_MS = 1200;

function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  window.__lenis?.stop?.();
}

function unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  window.__lenis?.start?.();
}

export default function GlobalRouteEffects({
  overlayColor = '#000',
  overlayIn = 0.35,
  overlayOut = 0.45,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const overlayRef = useRef(null);
  const navigatingRef = useRef(false);
  const lastTsRef = useRef(0);

  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, { opacity: 0 });
    if (typeof window !== 'undefined') window.history.scrollRestoration = 'manual';
  }, []);

  // Soft navigation event
  useEffect(() => {
    const onSoftNav = (e) => {
      const url = e?.detail?.url;
      if (!url) return;

      const now = Date.now();
      if (navigatingRef.current) return;
      if (now - lastTsRef.current < COOLDOWN_MS) return;

      navigatingRef.current = true;
      lastTsRef.current = now;

      lockScroll();
      ScrollTrigger.getAll().forEach((t) => t.kill());

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: overlayIn,
        ease: 'power2.out',
        onComplete: () => {
          window.scrollTo(0, 0);
          router.push(url);
        },
      });
    };

    window.addEventListener(EVENT_NAME, onSoftNav);
    return () => window.removeEventListener(EVENT_NAME, onSoftNav);
  }, [router, overlayIn]);

  // Route değişince: en üste + overlay out + unlock
  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: overlayOut,
      ease: 'power2.out',
      onComplete: () => {
        navigatingRef.current = false;
        unlockScroll();
      },
    });
  }, [pathname, overlayOut]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ background: overlayColor }}
    />
  );
}

'use client';
import { useTranslations } from 'next-intl';
import DistortionEffect from '@/components/webgl/DistortionEffect';
import TextReveal from '@/components/animation/TextReveal';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black">
      {/* WebGL Arka Plan Efekti - public/assets/img1.png dosyası olmalı */}
      <DistortionEffect imageSrc="/assets/img1.png" />

      <div className="z-10 px-4 text-center text-white pointer-events-none mix-blend-difference">
        <TextReveal className="text-[7vw] font-bold uppercase leading-none tracking-tighter">
          {t('title')}
        </TextReveal>
        
        <div className="flex justify-between w-full max-w-lg mx-auto mt-12 uppercase text-xs tracking-[0.2em] opacity-80 animate-pulse">
            <span>Est. 2025</span>
            <span>Digital Studio</span>
        </div>
      </div>
    </div>
  );
}
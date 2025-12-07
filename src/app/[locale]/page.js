'use client'; // Client component olduğu için ekliyoruz

import { useTranslations } from 'next-intl';
import DistortionEffect from '@/components/webgl/DistortionEffect';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      
      {/* Arka Plan Efekti */}
      <DistortionEffect imageSrc="/assets/hero-bg.jpg" />

      {/* İçerik */}
      <div className="z-10 text-center text-white pointer-events-none mix-blend-difference">
        <h1 className="text-[6vw] font-bold uppercase leading-none tracking-tighter">
          {t('title')}
        </h1>
        <p className="mt-6 text-xl font-light tracking-widest opacity-80">
          EST. 2025
        </p>
      </div>

    </div>
  );
}
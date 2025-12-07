'use client';

import { useTranslations } from 'next-intl';
import DistortionEffect from '@/components/webgl/DistortionEffect';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black">
      
      {/* Efektin çalışması için public/assets klasörüne bir resim koymalısın */}
      <DistortionEffect imageSrc="/assets/img1.png" />

      <div className="z-10 text-center text-white pointer-events-none mix-blend-difference">
        <h1 className="text-[7vw] font-bold uppercase leading-none tracking-tighter">
          {t('title')}
        </h1>
        <div className="flex justify-between w-full max-w-lg mx-auto mt-8 text-sm tracking-widest uppercase opacity-80">
            <span>Est. 2025</span>
            <span>Digital Studio</span>
        </div>
      </div>

    </div>
  );
}
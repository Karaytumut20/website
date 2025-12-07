import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-6xl font-bold uppercase text-center max-w-4xl leading-tight">
        {t('title')}
      </h1>
      <p className="mt-8 text-gray-400 text-lg">
        Next.js 14 + WebGL + GSAP + Lenis
      </p>
    </div>
  );
}
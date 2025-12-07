'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Menu');

  return (
    <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
      <div className="text-2xl font-bold uppercase tracking-tighter">
        Monolith
      </div>
      
      <nav className="hidden md:flex gap-8 uppercase text-sm tracking-widest">
        <Link href="/">{t('home')}</Link>
        <Link href="/projects">{t('projects')}</Link>
        <Link href="/about">{t('about')}</Link>
        <Link href="/contact">{t('contact')}</Link>
      </nav>

      <div className="uppercase text-sm cursor-pointer">
        Menu +
      </div>
    </header>
  );
}
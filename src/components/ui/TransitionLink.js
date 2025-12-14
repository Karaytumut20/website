'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useTransitionContext } from '@/context/TransitionContext';

export default function TransitionLink({ href, children, className, onClick, ...props }) {
  const router = useRouter();
  const pathname = usePathname();
  const { startTransition } = useTransitionContext();

  const handleClick = (e) => {
    // 1. Eğer zaten o sayfadaysak bir şey yapma
    if (pathname === href) {
        e.preventDefault();
        return;
    }

    // 2. Özel onClick varsa çalıştır (örn: menüyü kapatmak için)
    if (onClick) onClick(e);

    // 3. Standart navigasyonu engelle
    e.preventDefault();

    // 4. Animasyonu başlat (Context'i tetikle)
    startTransition();

    // 5. Animasyonun yarısında sayfayı değiştir (0.8s süren animasyonun 0.4. saniyesinde)
    // Bu süre PageTransition.js'deki animasyon süresiyle senkronize olmalı.
    setTimeout(() => {
      router.push(href);
    }, 800); // Perde tamamen kapandığında yönlendir
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
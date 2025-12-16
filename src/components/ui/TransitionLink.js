'use client';
import { usePathname } from 'next/navigation';
import { useTransitionContext } from '@/context/TransitionContext';

export default function TransitionLink({ href, children, className, onClick, ...props }) {
  const pathname = usePathname();
  const { initiateTransition, isTransitioning } = useTransitionContext();

  const handleClick = (e) => {
    // 1. Zaten o sayfadaysak işlem yapma
    if (pathname === href) {
        e.preventDefault();
        return;
    }

    // 2. GÜVENLİK KİLİDİ: Eğer zaten bir geçiş işlemi sürüyorsa,
    // ikinci tıklamayı yoksay. (Spam engelleme)
    if (isTransitioning) {
        e.preventDefault();
        return;
    }

    if (onClick) onClick(e);

    e.preventDefault();

    // 3. Süreci başlat
    initiateTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
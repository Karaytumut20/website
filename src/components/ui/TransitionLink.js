'use client';
import { usePathname } from 'next/navigation';
import { useTransitionContext } from '@/context/TransitionContext';

export default function TransitionLink({ href, children, className, onClick, ...props }) {
  const pathname = usePathname();
  const { initiateTransition } = useTransitionContext();

  const handleClick = (e) => {
    // 1. Zaten aynı sayfadaysak işlem yapma
    if (pathname === href) {
        e.preventDefault();
        return;
    }

    if (onClick) onClick(e);

    // 2. Standart geçişi engelle
    e.preventDefault();

    // 3. Sadece süreci başlat (Router.push'u NavigationLoader yapacak)
    initiateTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
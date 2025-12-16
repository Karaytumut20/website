'use client';
import { usePathname } from 'next/navigation';
import { useTransitionContext } from '@/context/TransitionContext';

export default function TransitionLink({ href, children, className, onClick, ...props }) {
  const pathname = usePathname();
  const { initiateTransition, isTransitioning } = useTransitionContext();

  const handleClick = (e) => {
    // URL Normalizasyonu:
    // Pathname genellikle "/tr/about" veya "/en/about" gibi gelir.
    // Href ise "/about" şeklindedir.
    // Bu yüzden pathname'in başındaki dil kodunu (örn: /tr, /en) temizleyerek kontrol etmeliyiz.
    
    // Regex açıklaması: Başlangıçtaki (^) eğik çizgi (/) ve ardından gelen 2 harfi ([a-z]{2}) temizler.
    const normalizedPathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');

    // 1. AYNI SAYFA KONTROLÜ
    // Hem normal pathname'i hem de temizlenmiş halini kontrol ediyoruz.
    // Ayrıca href="/" ve normalizedPathname="" durumunu da (anasayfa) kapsıyoruz.
    const isSamePage = 
        pathname === href || 
        normalizedPathname === href || 
        (href === '/' && normalizedPathname === '');

    if (isSamePage) {
        e.preventDefault();
        // DÜZELTME: Sayfa aynı olsa bile menünün kapanması için onClick'i MUTLAKA çağırmalıyız.
        // Aksi takdirde kullanıcı tıklar, hiçbir şey olmaz ve menü açık kalır.
        if (onClick) onClick(e);
        return;
    }

    // 2. GÜVENLİK KİLİDİ: Eğer zaten bir geçiş işlemi sürüyorsa, ikinci tıklamayı yoksay.
    if (isTransitioning) {
        e.preventDefault();
        return;
    }

    // Menüyü kapat
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
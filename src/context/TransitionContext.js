'use client';
import { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  // Animasyon durumunu yönetir (Start -> Exit Animation -> Push -> Enter Animation)
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // İlk yükleme kontrolü (Preloader için)
  const [isFirstLoadCompleted, setIsFirstLoadCompleted] = useState(false);

  // Gidilecek hedef URL'i tutar
  const [targetUrl, setTargetUrl] = useState(null);

  // İşlemi başlatan fonksiyon (Link'ten çağrılır)
  const initiateTransition = (href) => {
    if (!isFirstLoadCompleted) return; // İlk yükleme bitmediyse çalışma
    setTargetUrl(href);
    setIsTransitioning(true);
  };

  // Animasyon ve geçiş bittiğinde sıfırlama
  const endTransition = () => {
    setIsTransitioning(false);
    setTargetUrl(null);
  };
  
  const completeFirstLoad = () => setIsFirstLoadCompleted(true);

  return (
    <TransitionContext.Provider value={{ 
        isTransitioning, 
        targetUrl,
        initiateTransition, 
        endTransition,
        isFirstLoadCompleted,
        completeFirstLoad 
    }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);
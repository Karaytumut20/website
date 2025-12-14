'use client';
import { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animasyon başladığında scroll'u kilitlemek veya başka durumları yönetmek için
  const startTransition = () => setIsTransitioning(true);
  const endTransition = () => setIsTransitioning(false);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);
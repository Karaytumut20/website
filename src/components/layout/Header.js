'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import OverlayMenu from './OverlayMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-[100] mix-blend-difference text-white pointer-events-none">
        
        {/* Sol Üst: Marka ve Zaman */}
        <div className="flex flex-col gap-1 pointer-events-auto">
          <Link href="/" className="font-sans text-xl font-bold leading-none tracking-tighter uppercase md:text-2xl">
           Umut
          </Link>
          <div className="flex gap-2 text-[10px] uppercase tracking-widest opacity-60 font-mono mt-1">
            <span>{time} ET</span>
            <span className="self-center w-1 h-1 bg-current rounded-full"></span>
            <span>EST. 2025</span>
          </div>
        </div>

        {/* Sağ Üst: Menü Butonu */}
        <div className="flex flex-col items-end gap-1 pointer-events-auto">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase cursor-pointer group"
            >
              <span className="transition-opacity transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
              <span className="text-lg leading-none">{isMenuOpen ? '—' : '+'}</span>
            </button>
        </div>
      </header>
      
      {/* Menü Bileşeni */}
      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
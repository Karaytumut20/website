'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // DÜZELTME: Standart Link
import OverlayMenu from './OverlayMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  // ... (Geri kalan kodlar aynı kalacak, sadece import değişti)
  
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
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-[100] mix-blend-difference text-white pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <Link href="/" className="text-2xl font-bold leading-none tracking-tighter uppercase">
            Monolith Studio
          </Link>
          <div className="flex gap-2 text-[10px] uppercase tracking-widest opacity-70 font-mono mt-1">
            <span>{time} ET</span>
            <span className="self-center w-1 h-1 bg-current rounded-full"></span>
            <span>NYC</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 pointer-events-auto">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sm font-bold tracking-widest uppercase transition-opacity cursor-pointer hover:opacity-70"
            >
              {isMenuOpen ? 'Close' : 'Menu +'}
            </button>
        </div>
      </header>
      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
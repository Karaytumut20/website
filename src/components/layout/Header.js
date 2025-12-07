'use client';
import { useState, useEffect } from 'react';
import { Link } from 'next-view-transitions'; // Sayfa geçişleri için özel Link
import OverlayMenu from './OverlayMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Saati her saniye güncelle
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
        
        {/* Sol: Logo ve Bilgi */}
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

        {/* Orta: Ses Kontrolü */}
        <button 
          onClick={() => setIsSoundOn(!isSoundOn)}
          className="items-center hidden gap-2 mt-2 text-xs tracking-widest uppercase transition-opacity pointer-events-auto md:flex hover:opacity-60"
        >
          <div className={`w-2 h-2 rounded-full transition-colors ${isSoundOn ? 'bg-green-500' : 'border border-white'}`}></div>
          Sound: {isSoundOn ? 'On' : 'Off'}
        </button>
        
        {/* Sağ: Menü Tetikleyici */}
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
'use client';
import { useState } from 'react';
import Link from 'next/link';
import OverlayMenu from './OverlayMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-auto">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold uppercase tracking-tighter z-[100]">
          Monolith
        </Link>
        
        {/* Menü Butonu */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="uppercase text-sm cursor-pointer tracking-widest hover:opacity-70 transition-opacity z-[100] font-bold"
        >
          {isMenuOpen ? 'Close' : 'Menu +'}
        </button>
      </header>

      {/* Overlay Menü Componenti */}
      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
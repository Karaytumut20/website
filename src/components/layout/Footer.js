'use client';
import Link from 'next/link'; // DÜZELTME: Standart Link

export default function Footer() {
  return (
    <footer className="w-full bg-[#141516] text-white py-20 px-6 md:px-10 mt-auto">
      <div className="flex flex-col items-start justify-between gap-10 pt-10 border-t md:flex-row md:items-end border-white/10">
        
        <div className="flex flex-col gap-2">
          <h2 className="text-[4vw] font-bold uppercase tracking-tighter leading-none">Let's Talk</h2>
          <a href="mailto:hello@monolith.com" className="text-xl transition-opacity opacity-60 hover:opacity-100">hello@monolith.com</a>
        </div>

        <div className="flex gap-8 text-xs tracking-widest uppercase opacity-40">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span>© 2025 Monolith</span>
        </div>

      </div>
    </footer>
  );
}
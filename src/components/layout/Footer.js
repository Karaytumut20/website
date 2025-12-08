'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white py-20 px-6 md:px-10 mt-auto">
      <div className="flex flex-col items-start justify-between gap-10 pt-10 border-t md:flex-row md:items-end border-white/10">
        
        {/* Sol: Büyük Çağrı */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[5vw] font-bold uppercase tracking-tighter leading-[0.8]">
            Create<br/>Legacy
          </h2>
          <a 
            href="mailto:hello@hopeandhonor.com" 
            className="font-mono text-lg transition-colors border-b border-transparent md:text-xl text-white/50 hover:text-white hover:border-white w-max"
          >
            hello@hopeandhonor.com
          </a>
        </div>

        {/* Sağ: Linkler ve Copyright */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex gap-6 font-mono text-xs tracking-widest uppercase opacity-40">
            <Link href="/projects" className="transition-opacity hover:opacity-100">Work</Link>
            <Link href="/about" className="transition-opacity hover:opacity-100">Studio</Link>
            <Link href="/contact" className="transition-opacity hover:opacity-100">Contact</Link>
          </div>
          <span className="text-[10px] uppercase tracking-widest opacity-20 font-mono">
            Hope & Honor © 2025
          </span>
        </div>

      </div>
    </footer>
  );
}
'use client';
import TextReveal from '@/components/animation/TextReveal';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#e3e3db] text-black pt-32 px-4 md:px-10 pb-20">
      
      <div className="mx-auto max-w-7xl">
        {/* Başlık (Text Reveal Animasyonu ile) */}
        <div className="pb-10 mb-20 border-b border-black/20">
          <TextReveal className="text-[8vw] leading-[0.9] font-bold uppercase tracking-tighter overflow-hidden">
            We are Monolith
          </TextReveal>
          <TextReveal className="text-[8vw] leading-[0.9] font-bold uppercase tracking-tighter ml-[10vw] overflow-hidden" delay={0.2}>
            Digital Studio
          </TextReveal>
        </div>

        {/* İçerik */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="text-xl font-light leading-relaxed md:text-2xl">
            <p className="mb-8">
              Founded in 2025, Monolith stands at the intersection of design, technology, and art. We don't just build websites; we craft digital ecosystems that breathe, move, and inspire.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 font-mono text-sm tracking-widest uppercase opacity-60">
            <div>
              <h3 className="mb-2 text-black opacity-100">Services</h3>
              <p>Web Development</p>
              <p>Creative Direction</p>
              <p>WebGL Experiences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
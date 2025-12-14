'use client';
import TextReveal from '@/components/animation/TextReveal';
import Link from 'next/link';

export default function AboutPage() {
  
  const clients = [
    "Audemars Piguet", "Nike", "Prada", "Google", 
    "Coperni", "Lancôme", "Rabanne", "L'Oreal", 
    "Lacoste", "Carolina Herrera", "Vogue Italia", "Booba"
  ];

  const press = [
    "Vogue Italia", "Vogue China", "Paper Magazine", 
    "Konbini", "Libération", "Highsnobiety", 
    "Exhibition Magazine"
  ];

  const services = [
    "Creative Direction", "Consulting", 
    "CGI & 3D Services", "Mixed Media", 
    "Post-Production", "Motion Design"
  ];

  return (
    <div className="min-h-screen bg-[#e3e3db] text-black font-sans pt-32 pb-10 px-6 md:px-10 flex flex-col">
      
      {/* --- BÖLÜM 1: MANIFESTO --- */}
      <div className="w-full max-w-[95%] mx-auto mt-10 md:mt-20 flex flex-col gap-20 mb-32 md:mb-48">
        
        {/* Paragraf 1 */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:gap-12 group">
            <span className="mt-1 text-3xl font-medium leading-none transition-opacity opacity-100 md:text-4xl group-hover:opacity-60">1.</span>
            <div className="max-w-5xl">
                <TextReveal className="text-3xl md:text-5xl lg:text-[3.2vw] font-medium leading-[1.1] tracking-tight text-[#1c1c1c]">
                Since 2021, LaCrapule Studio has been building a distinct visual language rooted in precision, curiosity, and cultural relevance. We aim to create bold visuals that blur the lines between reality and fiction.
                </TextReveal>
            </div>
        </div>

        {/* Paragraf 2 */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:gap-12 group">
            <span className="mt-1 text-3xl font-medium leading-none transition-opacity opacity-100 md:text-4xl group-hover:opacity-60">2.</span>
            <div className="max-w-5xl">
                <TextReveal className="text-3xl md:text-5xl lg:text-[3.2vw] font-medium leading-[1.1] tracking-tight text-[#1c1c1c]" delay={0.1}>
                From fashion to music, tech to art, we move across worlds to craft images that speak to now. Whether it’s a product, a film, or a digital experiment — each project is a way to push boundaries and tell stories that leave a mark.
                </TextReveal>
            </div>
        </div>

      </div>
      

      {/* --- BÖLÜM 2: DETAYLAR & CTA (Grid Yapısı) --- */}
      <div className="grid items-start w-full grid-cols-1 pt-10 border-t lg:grid-cols-12 gap-y-16 lg:gap-x-10 border-black/10">
        
        {/* SOL BLOK: Listeler (Trusted, Press, Services) - 7 Kolon */}
        <div className="grid grid-cols-1 gap-10 lg:col-span-7 md:grid-cols-3 md:gap-4">
            
            {/* Trusted Us */}
            <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 font-mono">Trusted Us</h4>
                <div className="flex flex-wrap text-base font-medium leading-snug md:text-lg gap-x-1">
                    {clients.map((client, i) => (
                        <span key={i} className="leading-relaxed transition-colors border-b cursor-default border-black/20 hover:border-black">
                            {client}{i !== clients.length - 1 && ","}
                        </span>
                    ))}
                </div>
            </div>

            {/* Press */}
            <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 font-mono">Press</h4>
                <div className="flex flex-col items-start gap-1 text-base font-medium leading-snug md:text-lg">
                    {press.map((item, i) => (
                        <span key={i}>{item}{i !== press.length - 1 && ","}</span>
                    ))}
                </div>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 font-mono">Services</h4>
                <div className="flex flex-col items-start gap-1 text-base font-medium leading-snug md:text-lg">
                    {services.map((service, i) => (
                        <span key={i}>{service}{i !== services.length - 1 && ","}</span>
                    ))}
                </div>
            </div>
        </div>

        {/* SAĞ BLOK: Contact & Big CTA - 5 Kolon */}
        <div className="flex flex-col justify-between h-full pl-0 lg:col-span-5 lg:pl-10">
            
            {/* Contact Üstte */}
            <div className="flex flex-col gap-6 mb-16 lg:mb-0">
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 font-mono">Contact</h4>
                <div className="text-base font-medium md:text-lg">
                    <a href="mailto:hello@lacrapulestudio.com" className="block mb-1 transition-colors border-b border-black/20 hover:border-black w-max">
                        hello@lacrapulestudio.com
                    </a>
                    <a href="#" className="block transition-opacity opacity-60 hover:opacity-100">Socials: Instagram</a>
                </div>
            </div>

            {/* Büyük CTA (En Sağ Alt) */}
            <div className="flex flex-col items-start gap-8 mt-auto">
                <h2 className="text-5xl md:text-7xl lg:text-[5vw] font-black uppercase tracking-tighter leading-[0.85] text-black">
                    Let&apos;s Create<br/>Bold Visual<br/>Together
                </h2>
                
                <Link href="/contact">
                    <button className="bg-black text-white px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-[#333] transition-colors rounded-sm">
                        Let&apos;s Work Together
                    </button>
                </Link>
            </div>

        </div>
      </div>

      {/* --- FOOTER COPYRIGHT --- */}
      <div className="w-full flex flex-col md:flex-row justify-between items-end md:items-center mt-32 pt-6 font-mono text-[9px] font-bold uppercase tracking-widest opacity-40">
          <span>La Crapule Studio © 2025<br/>All Rights Reserved</span>
          <span className="mt-4 md:mt-0">Made by Amine Z.</span>
      </div>

    </div>
  );
}
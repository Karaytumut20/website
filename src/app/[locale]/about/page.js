'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TextRevealScrub from '@/components/TextRevealScrub';
import Link from 'next/link';

// GSAP Plugin Kaydı
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);

  // --- İÇERİK VERİLERİ (Kişisel) ---
  const services = [
    "Art Direction", "Brand Identity", "Web Design", 
    "Creative Development", "Motion & 3D", "Interaction Design"
  ];

  const clients = [
    "Audemars Piguet", "Prada", "Acne Studios", "Polestar", 
    "Aesop", "Rimowa", "Technogym", "Gentle Monster"
  ];

  const awards = [
    { name: "Awwwards SOTD", year: "2024" },
    { name: "FWA of the Month", year: "2023" },
    { name: "Clio Awards Gold", year: "2023" },
    { name: "Cannes Lions Bronze", year: "2022" }
  ];

  // --- GSAP ANİMASYONLARI (Aynı kaldı) ---
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Grid Çizgileri
    const borders = gsap.utils.toArray('.anim-border');
    borders.forEach(border => {
        gsap.fromTo(border, 
            { scaleX: 0, transformOrigin: "left" },
            { 
                scaleX: 1, 
                duration: 1.5, 
                ease: "expo.out",
                scrollTrigger: {
                    trigger: border,
                    start: "top 90%",
                }
            }
        );
    });

    const vBorders = gsap.utils.toArray('.anim-border-v');
    vBorders.forEach(border => {
        gsap.fromTo(border, 
            { scaleY: 0, transformOrigin: "top" },
            { 
                scaleY: 1, 
                duration: 1.5, 
                ease: "expo.out",
                scrollTrigger: {
                    trigger: border,
                    start: "top 90%",
                }
            }
        );
    });

    // 2. İçeriklerin Yukarı Çıkışı (Fade Up)
    const contents = gsap.utils.toArray('.anim-content');
    contents.forEach(content => {
        gsap.fromTo(content,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: content,
                    start: "top 85%",
                }
            }
        );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#e3e3db] text-[#1c1c1c] font-sans pt-32 pb-20 px-4 md:px-10 flex flex-col overflow-hidden selection:bg-black selection:text-white">
        
        {/* --- HERO BÖLÜMÜ --- */}
        <div className="flex flex-col items-start justify-between mb-24 md:flex-row md:items-end">
             <div className="relative z-10 w-full">
                 <TextRevealScrub>
                     <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter uppercase text-[#1c1c1c]">
                         About Me
                     </h1>
                 </TextRevealScrub>
                 
                 {/* Alt Başlık / Motto */}
                 <div className="flex justify-end w-full mt-6 md:mt-0">
                    <p className="max-w-md text-sm font-medium tracking-widest text-right uppercase md:text-xl opacity-60 anim-content">
                        Digital Craftsmanship <br/> for the Modern Era.
                    </p>
                 </div>
             </div>
        </div>

        {/* --- ANA GRID (BENTO BOX LAYOUT) --- */}
        <div className="relative w-full border-t border-black/10">
            {/* Üst Çizgi Animasyonu */}
            <div className="absolute top-0 left-0 w-full h-px origin-left bg-black anim-border"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">

                {/* 1. KUTU: KİŞİSEL MANİFESTO (Büyük Alan) */}
                <div className="relative p-6 py-12 border-b md:p-12 lg:col-span-8 md:border-r border-black/10 group">
                    <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-black anim-border"></div>
                    <div className="absolute top-0 right-0 hidden w-px h-full origin-top bg-black anim-border-v md:block"></div>

                    <h3 className="mb-8 text-xs font-bold tracking-widest uppercase opacity-40 anim-content">My Vision</h3>
                    <div className="anim-content">
                        <p className="text-2xl md:text-4xl lg:text-[2.5vw] font-medium leading-[1.15] tracking-tight">
                            I am a creative developer operating at the intersection of <span className="font-serif italic">design</span>, <span className="font-serif italic">technology</span>, and <span className="font-serif italic">culture</span>.
                        </p>
                        <p className="max-w-2xl mt-8 text-lg leading-relaxed md:text-xl opacity-70">
                            Since 2021, I have been deconstructing the ordinary to build distinct visual languages. I dont just design websites; I curate digital atmospheres that evoke emotion and drive connection. My approach is rooted in precision, fueled by curiosity, and executed with obsession.
                        </p>
                    </div>
                </div>

                {/* 2. KUTU: RAKAMLAR / KISA BİLGİ (Sağ Üst) */}
                <div className="relative flex flex-col justify-between p-6 py-12 border-b md:p-12 lg:col-span-4 border-black/10">
                     <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-black anim-border"></div>
                     
                     <div className="anim-content">
                        <h3 className="mb-4 text-xs font-bold tracking-widest uppercase opacity-40">Freelancing Since</h3>
                        <p className="text-6xl font-black tracking-tighter">2021</p>
                     </div>
                     
                     <div className="mt-12 anim-content">
                        <h3 className="mb-4 text-xs font-bold tracking-widest uppercase opacity-40">Location</h3>
                        <p className="text-xl font-medium">Istanbul based,<br/>Worldwide available.</p>
                     </div>
                </div>

                {/* 3. KUTU: SERVICES (Sol Alt - Liste) */}
                <div className="relative p-6 py-12 border-b md:p-12 lg:col-span-4 md:border-r border-black/10">
                    <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-black anim-border"></div>
                    <div className="absolute top-0 right-0 hidden w-px h-full origin-top bg-black anim-border-v lg:block"></div>

                    <h3 className="mb-8 text-xs font-bold tracking-widest uppercase opacity-40 anim-content">My Expertise</h3>
                    <ul className="flex flex-col gap-3 anim-content">
                        {services.map((service, i) => (
                            <li key={i} className="text-lg font-medium transition-all duration-300 border-b border-transparent cursor-default md:text-xl hover:border-black hover:pl-2 w-max">
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. KUTU: CLIENTS (Orta Alt - Liste) */}
                <div className="relative p-6 py-12 border-b md:p-12 lg:col-span-4 md:border-r border-black/10">
                    <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-black anim-border"></div>
                    <div className="absolute top-0 right-0 hidden w-px h-full origin-top bg-black anim-border-v md:block"></div>

                    <h3 className="mb-8 text-xs font-bold tracking-widest uppercase opacity-40 anim-content">Selected Clients</h3>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 anim-content">
                        {clients.map((client, i) => (
                            <span key={i} className="text-lg font-medium transition-opacity cursor-default md:text-xl opacity-60 hover:opacity-100">
                                {client}{i !== clients.length - 1 && ","}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 5. KUTU: AWARDS (Sağ Alt) */}
                <div className="relative p-6 py-12 md:p-12 lg:col-span-4 border-b border-black/10 bg-[#1c1c1c] text-[#e3e3db]">
                    <div className="absolute bottom-0 left-0 w-full h-px origin-left bg-white anim-border"></div>

                    <h3 className="mb-8 text-xs font-bold tracking-widest uppercase opacity-40 anim-content">Recognition</h3>
                    <ul className="flex flex-col gap-4 anim-content">
                        {awards.map((award, i) => (
                            <li key={i} className="flex items-end justify-between pb-2 transition-colors border-b border-white/20 group hover:border-white">
                                <span className="text-lg font-medium">{award.name}</span>
                                <span className="font-mono text-xs opacity-50 group-hover:opacity-100">{award.year}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* --- ALT BÖLÜM: CTA (DEVASA) --- */}
        <div className="flex flex-col items-center w-full mt-32 text-center">
            <p className="mb-6 text-xs font-bold tracking-widest uppercase opacity-40 anim-content">
                Ready to collaborate?
            </p>
            
            <Link href="/contact" className="relative inline-block group">
                <h2 className="text-[10vw] leading-[0.8] font-black tracking-tighter uppercase text-[#1c1c1c] transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-500">
                    Lets Create <br/> The Future.
                </h2>
                {/* Alt Çizgi Animasyonu */}
                <div className="absolute bottom-2 left-0 w-full h-[0.5vw] bg-[#1c1c1c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </Link>
        </div>

        {/* --- FOOTER BİLGİSİ --- */}
        <div className="flex items-end justify-between pt-6 mt-32 border-t border-black/10 anim-content">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                Umut Karaytu © 2025
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                All Rights Reserved
            </span>
        </div>

    </div>
  );
}
'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextRevealScrub from '@/components/TextRevealScrub';

export default function ContactPage() {
  const [btnText, setBtnText] = useState('Send Proposal');
  const [isSending, setIsSending] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    project: '',
    email: '',
  });

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  
  const myEmailAddress = "umutkaraytu20@gmail.com"; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Tıklama anındaki 'küçülme' animasyonu
    gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });

    setBtnText('Opening Mail App...');

    const subject = `Project Inquiry: ${formData.project} - ${formData.name}`;
    const body = `Hi Umut,\n\nMy name is ${formData.name || '[Name]'}.\nI'm from ${formData.city || '[Location]'}.\nI'd like to talk about a ${formData.project || '[Project Details]'} project.\n\nYou can reach me at: ${formData.email || '[Email]'}\n\nLooking forward to hearing from you.`;

    const safeSubject = encodeURIComponent(subject);
    const safeBody = encodeURIComponent(body).replace(/%0A/g, '%0D%0A');

    setTimeout(() => {
        window.location.href = `mailto:${myEmailAddress}?subject=${safeSubject}&body=${safeBody}`;
        
        setIsSending(false);
        setBtnText('Message Sent (Check App)');
        
        setTimeout(() => setBtnText('Send Proposal'), 3000);
    }, 1000);
  };

  // --- SAYFA GİRİŞ ANİMASYONLARI ---
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Çizgi
    tl.from('.divider-line', { 
        scaleX: 0, 
        transformOrigin: 'left', 
        duration: 1.2, 
        ease: 'expo.out',
        delay: 0.2
    })
    // 2. Sol Bölüm
    .from('.info-section', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, "-=0.8")
    // 3. Form Elemanları (Buton da buna dahil artık)
    .from(formRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05, 
        ease: 'power2.out'
    }, "-=0.6");
    
    // NOT: Butona özel .from() animasyonu kaldırıldı.
    // Buton artık üstteki formRef.current.children animasyonuyla beraber geliyor.
    // Bu sayede opacity sorunu çözüldü.

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#e3e3db] text-[#1c1c1c] pt-32 px-4 md:px-10 pb-20 font-sans selection:bg-black selection:text-white">
      
      {/* BAŞLIK */}
      <div className="flex flex-col items-start justify-between mb-12 md:flex-row md:items-end">
         <div className="relative z-10">
             <TextRevealScrub>
                 <h1 className="text-[13vw] leading-[0.85] font-black tracking-tighter uppercase text-[#1c1c1c]">
                     Contact
                 </h1>
             </TextRevealScrub>
         </div>
      </div>

      {/* ÇİZGİ */}
      <div className="w-full h-0.5 bg-black/10 divider-line mb-16"></div>

      {/* İÇERİK */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-20">
        
        {/* SOL KOLON */}
        <div className="md:col-span-4 info-section">
           <p className="text-xl font-medium leading-relaxed opacity-70">
             Have an idea in mind? Let’s create something distinctive together. Fill out the form, and let's start the conversation.
           </p>
           
           <div className="flex flex-col gap-2 mt-16">
             <span className="text-xs tracking-widest uppercase opacity-40">Direct Contact</span>
             <a href={`mailto:${myEmailAddress}`} className="text-xl font-bold transition-all hover:opacity-60 decoration-1 underline-offset-4 hover:underline">
                {myEmailAddress}
             </a>
             <p className="mt-2 text-sm opacity-50">Based in Turkey, available worldwide.</p>
           </div>
        </div>

        {/* SAĞ KOLON: FORM */}
        <div className="relative md:col-span-8">
          <form 
            ref={formRef} 
            onSubmit={handleSend}
            className="text-3xl font-bold leading-normal tracking-tight md:text-5xl md:leading-snug"
          >
            <span className="opacity-40">Hello, my name is </span>
            
            <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                type="text" 
                placeholder="Your Name" 
                required 
                className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[280px] px-2 text-[#1c1c1c] placeholder:text-black/20 transition-colors"
            />
            
            <span className="opacity-40"> from </span>
            
            <input 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                type="text" 
                placeholder="City/Country" 
                required 
                className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[240px] px-2 text-[#1c1c1c] placeholder:text-black/20 transition-colors"
            />
            
            <span className="opacity-40">. I'd like to discuss a </span>
            
            <input 
                name="project" 
                value={formData.project} 
                onChange={handleChange} 
                type="text" 
                placeholder="Project Type" 
                required 
                className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[350px] px-2 text-[#1c1c1c] placeholder:text-black/20 transition-colors"
            />
            
            <span className="opacity-40"> project. You can reach me at </span>
            
            <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                type="email" 
                placeholder="Your Email" 
                required 
                className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[350px] px-2 text-[#1c1c1c] placeholder:text-black/20 transition-colors"
            />
            
            <span className="opacity-40">.</span>

            {/* BUTON ALANI */}
            <div className="mt-16 md:mt-24">
                <button 
                    ref={buttonRef}
                    type="submit"
                    disabled={isSending}
                    className="relative group overflow-hidden bg-[#1c1c1c] text-[#e3e3db] px-10 py-5 rounded-none md:text-xl font-bold uppercase tracking-widest w-full md:w-auto transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-wait"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {btnText}
                        {!isSending && (
                             <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        )}
                    </span>
                    <div className="absolute inset-0 transition-transform duration-500 ease-out origin-left transform scale-x-0 bg-[#333] group-hover:scale-x-100"></div>
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
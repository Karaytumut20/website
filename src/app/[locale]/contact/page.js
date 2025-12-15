'use client';

import { useState, useRef, useEffect } from 'react'; // useEffect eklendi
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('book');
  const [isMobile, setIsMobile] = useState(false); // Mobil kontrolü için state
  const [btnText, setBtnText] = useState({
    icloud: 'Send via iCloud',
    copy: 'Copy Message'
  });
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    project: '',
    email: '',
    role: '',
    portfolio: ''
  });

  const containerRef = useRef(null);
  const formRef = useRef(null);
  
  const myEmailAddress = "umutkaraytu20@gmail.com"; 

  // Cihazın mobil olup olmadığını anlayan basit kontrol
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
        setIsMobile(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateMailContent = () => {
    let subject = "";
    let body = "";

    if (activeTab === 'book') {
      subject = `Project Inquiry: ${formData.project} - ${formData.name}`;
      body = `Hi Umut,\n\nMy name is ${formData.name || '[Name]'}. \nI'm from ${formData.city || '[Location]'}.\nI'd like to talk about a ${formData.project || '[Project Type]'} project.\nYou can reach me at: ${formData.email || '[Email]'}\n\nLooking forward to hearing from you.`;
    } else {
      subject = `Career Application: ${formData.role} - ${formData.name}`;
      body = `Hi Umut,\n\nMy name is ${formData.name || '[Name]'}.\nI specialize in ${formData.role || '[Role]'}.\nI'd love to join the team. You can check out my portfolio at:\n${formData.portfolio || '[Portfolio URL]'}\n\nContact me at: ${formData.email || '[Email]'}\n\nBest regards.`;
    }
    return { subject, body };
  };

  // 1. GMAIL (Akıllı Link)
  const handleGmail = (e) => {
    e.preventDefault();
    const { subject, body } = generateMailContent();

    // Satır sonlarını güvenli hale getir
    const safeSubject = encodeURIComponent(subject);
    const safeBody = encodeURIComponent(body); // \n karakterlerini %0A'ya çevirir

    if (isMobile) {
      // Mobildeyse: Gmail uygulamasını zorlamak için mailto kullanır ama gmail spesifik denenebilir
      // Ancak en garantisi standart mailto'dur, çünkü Android/iOS kullanıcıyı yönlendirir.
      // Yine de "Gmail" butonu olduğu için Google'ın web view linki mobilde bazen sorun çıkarır.
      // Mobilde en temiz yöntem:
      const gmailAppUrl = `googlegmail:///co?to=${myEmailAddress}&subject=${safeSubject}&body=${safeBody}`;
      
      // Önce app linkini dener, çalışmazsa web'e düşmesi için window.open kullanılır
      // Ancak React tarafında bu karmaşık olabilir. En güvenli mobil web linki:
      window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${myEmailAddress}&su=${safeSubject}&body=${safeBody}`, '_blank');
    } else {
      // Masaüstü: Standart Web Linki
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${myEmailAddress}&su=${safeSubject}&body=${safeBody}`, '_blank');
    }
  };

  // 2. ICLOUD WEB (Kopyala + Aç)
  const handleICloudWeb = async (e) => {
    e.preventDefault();
    const { body } = generateMailContent();
    
    try {
      await navigator.clipboard.writeText(body);
      setBtnText(prev => ({ ...prev, icloud: 'Copied! Opening iCloud...' }));
      
      setTimeout(() => {
        // iCloud Compose için doğrudan bir URL şeması yoktur, inbox'ı açarız.
        window.open('https://www.icloud.com/mail/', '_blank');
        setBtnText(prev => ({ ...prev, icloud: 'Send via iCloud' }));
      }, 1500);
    } catch (err) {
      console.error('Copy failed', err);
      // Kopyalama başarısız olsa bile siteyi aç
      window.open('https://www.icloud.com/mail/', '_blank');
    }
  };

  // 3. DEFAULT MAIL APP (En Garantisi - iOS Mail, Outlook vb.)
  const handleDefaultMail = (e) => {
    e.preventDefault();
    const { subject, body } = generateMailContent();
    
    // mailto linklerinde satır atlaması için encodeURIComponent yeterlidir ancak 
    // bazı eski istemciler için manuel %0D%0A daha güvenlidir.
    const safeSubject = encodeURIComponent(subject);
    const safeBody = encodeURIComponent(body).replace(/%0A/g, '%0D%0A'); // \n -> \r\n dönüşümü

    // window.open yerine window.location.href mobilde daha kararlıdır
    window.location.href = `mailto:${myEmailAddress}?subject=${safeSubject}&body=${safeBody}`;
  };

  // 4. SADECE KOPYALA
  const handleCopyText = (e) => {
    e.preventDefault();
    const { body } = generateMailContent();
    navigator.clipboard.writeText(body)
      .then(() => {
        setBtnText(prev => ({ ...prev, copy: 'Message Copied!' }));
        setTimeout(() => setBtnText(prev => ({ ...prev, copy: 'Copy Message' })), 2000);
      })
      .catch(() => {
        setBtnText(prev => ({ ...prev, copy: 'Error Copying' }));
      });
  };
  
  // GSAP Animasyonları
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-title-char', {
      y: 100, opacity: 0, duration: 1, stagger: 0.05, ease: 'power4.out', delay: 0.2
    })
    .from('.animated-border', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'expo.out' }, "-=0.5")
    .from('.fade-in-content', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, "-=0.8");
  }, { scope: containerRef });

  useGSAP(() => {
    gsap.fromTo(formRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, [activeTab]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#e3e3db] text-black pt-32 px-4 md:px-10 pb-20 font-sans selection:bg-black selection:text-white">
      
      {/* BAŞLIK */}
      <div className="mb-16 overflow-hidden">
        <h1 className="text-[11vw] leading-[0.8] font-bold uppercase tracking-tighter overflow-hidden">
          {(activeTab === 'book' ? 'Start Project' : 'Join The Team').split('').map((char, index) => (
            <span key={index} className="inline-block hero-title-char">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
      </div>

      {/* TABLAR */}
      <div className="relative flex w-full">
        <div className="absolute top-0 left-0 w-full h-px bg-black/10 animated-border"></div>
        <button onClick={() => setActiveTab('book')} className={`flex-1 py-8 text-2xl md:text-4xl uppercase font-bold tracking-tighter text-left px-4 md:px-10 transition-all duration-300 group ${activeTab === 'book' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
          Book <span className={`block h-0.5 bg-black mt-2 transition-all duration-500 ${activeTab === 'book' ? 'w-full max-w-[50px]' : 'w-0 group-hover:w-[20px]'}`}></span>
        </button>
        <div className="w-px h-auto origin-top bg-black/10 animated-border"></div>
        <button onClick={() => setActiveTab('career')} className={`flex-1 py-8 text-2xl md:text-4xl uppercase font-bold tracking-tighter text-left px-4 md:px-10 transition-all duration-300 group ${activeTab === 'career' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
          Career <span className={`block h-0.5 bg-black mt-2 transition-all duration-500 ${activeTab === 'career' ? 'w-full max-w-[50px]' : 'w-0 group-hover:w-[20px]'}`}></span>
        </button>
        <div className="absolute bottom-0 left-0 w-full h-px bg-black/10 animated-border"></div>
      </div>

      {/* FORM ALANI */}
      <div className="grid grid-cols-1 gap-10 pt-16 md:grid-cols-12 md:gap-20 fade-in-content">
        
        {/* Sol */}
        <div className="px-4 md:col-span-4">
           <p className="text-lg font-medium leading-relaxed opacity-70">
             {activeTab === 'book' 
               ? "Great ideas start with a conversation. Fill in the blanks to tell us a bit about your vision."
               : "We are always looking for talented individuals. Tell us who you are and what you do best."}
           </p>
           <div className="flex flex-col gap-2 mt-12">
             <span className="text-xs tracking-widest uppercase opacity-40">Contact Info</span>
             <a href={`mailto:${myEmailAddress}`} className="text-xl font-bold hover:underline decoration-1 underline-offset-4">{myEmailAddress}</a>
           </div>
        </div>

        {/* Sağ: Form */}
        <div className="relative px-4 md:col-span-8">
          <form ref={formRef} className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            
            {activeTab === 'book' ? (
               <div className="space-y-4 md:space-y-2">
                 <span className="opacity-40">Hi, my name is</span>
                 <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="your name" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[300px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">. I&apos;m from</span>
                 <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="city/country" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[250px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">. I&apos;d like to talk about a</span>
                 <input name="project" value={formData.project} onChange={handleChange} type="text" placeholder="project type" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[400px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">project. You can reach me at</span>
                 <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="your email" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[350px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">to discuss details.</span>
               </div>
            ) : (
               <div className="space-y-4 md:space-y-2">
                 <span className="opacity-40">Hello, I&apos;m</span>
                 <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="your name" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[300px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">. I specialize in</span>
                 <input name="role" value={formData.role} onChange={handleChange} type="text" placeholder="your role" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[350px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">and I&apos;d love to join the team. Check out my portfolio at</span>
                 <input name="portfolio" value={formData.portfolio} onChange={handleChange} type="url" placeholder="portfolio url" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[400px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">. Contact me at</span>
                 <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="your email" required className="inline-block bg-transparent border-b-2 border-black/20 focus:border-black outline-none w-full md:w-auto md:min-w-[350px] px-2 text-black placeholder:text-black/20 transition-colors"/>
                 <span className="opacity-40">.</span>
               </div>
            )}

            {/* BUTON GRUBU */}
            <div className="flex flex-wrap items-center gap-6 mt-20">
               
               {/* 1. Gmail */}
               <button onClick={handleGmail} className="relative px-8 py-4 overflow-hidden text-white bg-black rounded-sm cursor-pointer group">
                  <span className="relative z-10 text-lg font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-black">
                    Send via Gmail
                  </span>
                  <div className="absolute inset-0 transition-transform duration-300 ease-out origin-left transform scale-x-0 bg-white group-hover:scale-x-100"></div>
               </button>

               {/* 2. iCloud (Web) */}
               <button onClick={handleICloudWeb} className="relative px-8 py-4 overflow-hidden text-black bg-transparent border border-black rounded-sm cursor-pointer group">
                  <span className="relative z-10 text-lg font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-white">
                    {btnText.icloud}
                  </span>
                  <div className="absolute inset-0 transition-transform duration-300 ease-out origin-left transform scale-x-0 bg-black group-hover:scale-x-100"></div>
               </button>

               {/* 3. Apple Mail / Default (App) */}
               <button onClick={handleDefaultMail} className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-opacity border-b border-transparent opacity-50 hover:opacity-100 hover:border-black">
                 Open Mail App
               </button>

                {/* 4. Copy Text */}
               <button onClick={handleCopyText} className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-opacity opacity-50 hover:opacity-100">
                 {btnText.copy}
               </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
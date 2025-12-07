'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('book'); // Varsayılan sekme: BOOK

  return (
    <div className="min-h-screen bg-[#e3e3db] text-black pt-32 px-4 md:px-10 pb-20">
      
      {/* Sayfa Başlığı */}
      <div className="pb-8 mb-12 border-b border-black/20">
        <h1 className="text-[12vw] leading-[0.8] font-bold uppercase tracking-tighter">
          {activeTab === 'book' ? 'Book Experience' : 'Start Career'}
        </h1>
      </div>

      {/* Tab Navigasyonu (Sekmeler) */}
      <div className="flex w-full border-b border-black/20 mb-16 sticky top-24 bg-[#e3e3db] z-10">
        <button 
          onClick={() => setActiveTab('book')}
          className={`flex-1 py-6 text-xl md:text-2xl uppercase font-bold tracking-tight text-left relative transition-colors ${activeTab === 'book' ? 'text-black opacity-100' : 'text-black/30 hover:text-black/60'}`}
        >
          <span className="mr-4 font-mono text-sm align-top">01</span> BOOK
          {activeTab === 'book' && <span className="absolute bottom-0 left-0 w-full h-1 bg-black" />}
        </button>
        
        <button 
          onClick={() => setActiveTab('career')}
          className={`flex-1 py-6 text-xl md:text-2xl uppercase font-bold tracking-tight text-left relative transition-colors ${activeTab === 'career' ? 'text-black opacity-100' : 'text-black/30 hover:text-black/60'}`}
        >
          <span className="mr-4 font-mono text-sm align-top">02</span> CAREER
          {activeTab === 'career' && <span className="absolute bottom-0 left-0 w-full h-1 bg-black" />}
        </button>
      </div>

      {/* İçerik Alanı (Grid) */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-20">
        
        {/* Sol Kolon: Açıklama */}
        <div className="md:col-span-5">
          <p className="text-xl font-light leading-relaxed md:text-2xl">
            {activeTab === 'book' 
              ? "We're excited to learn more about your project. Please provide details below so we can understand your vision and craft something unique."
              : "We are always looking for visionary talents. Tell us about your skills, your passion, and why you want to join the Monolith team."
            }
          </p>
          <div className="mt-10 font-mono text-sm uppercase opacity-50">
            * Required Fields
          </div>
        </div>

        {/* Sağ Kolon: Form */}
        <div className="md:col-span-7">
          <form className="flex flex-col gap-12">
            
            {/* Ad / Soyad */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="group">
                <label className="block mb-3 text-xs tracking-widest uppercase opacity-50">Name *</label>
                <input type="text" placeholder="Enter name" className="w-full py-3 text-lg transition-colors bg-transparent border-b outline-none border-black/30 focus:border-black placeholder:text-black/20" />
              </div>
              <div className="group">
                <label className="block mb-3 text-xs tracking-widest uppercase opacity-50">Last Name *</label>
                <input type="text" placeholder="Enter last name" className="w-full py-3 text-lg transition-colors bg-transparent border-b outline-none border-black/30 focus:border-black placeholder:text-black/20" />
              </div>
            </div>

            {/* Email / Telefon */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="group">
                <label className="block mb-3 text-xs tracking-widest uppercase opacity-50">Email Address *</label>
                <input type="email" placeholder="hello@example.com" className="w-full py-3 text-lg transition-colors bg-transparent border-b outline-none border-black/30 focus:border-black placeholder:text-black/20" />
              </div>
              <div className="group">
                <label className="block mb-3 text-xs tracking-widest uppercase opacity-50">Phone Number</label>
                <input type="tel" placeholder="+90 (555) 000 0000" className="w-full py-3 text-lg transition-colors bg-transparent border-b outline-none border-black/30 focus:border-black placeholder:text-black/20" />
              </div>
            </div>

            {/* Dinamik Alanlar */}
            {activeTab === 'book' ? (
              <div className="group">
                <label className="block mb-3 text-xs tracking-widest uppercase opacity-50">Project Details</label>
                <textarea rows="4" placeholder="Tell us about your project timeline, budget and goals..." className="w-full py-3 text-lg transition-colors bg-transparent border-b outline-none resize-none border-black/30 focus:border-black placeholder:text-black/20"></textarea>
              </div>
            ) : (
              <div className="group">
                <label className="block mb-3 text-xs tracking-widest uppercase opacity-50">Portfolio / LinkedIn URL</label>
                <input type="url" placeholder="https://" className="w-full py-3 text-lg transition-colors bg-transparent border-b outline-none border-black/30 focus:border-black placeholder:text-black/20" />
              </div>
            )}

            {/* Gönder Butonu */}
            <div className="pt-6">
              <button type="button" className="px-10 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors bg-black hover:bg-zinc-800">
                {activeTab === 'book' ? 'Send Request' : 'Apply Now'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
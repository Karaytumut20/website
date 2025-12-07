'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('book'); 

  return (
    <div className="min-h-screen bg-[#e3e3db] text-black pt-32 px-4 md:px-10 pb-20">
      
      {/* Başlık */}
      <div className="mb-16">
        <h1 className="text-[11vw] leading-[0.8] font-bold uppercase tracking-tighter">
          {activeTab === 'book' ? 'Book Experience' : 'Join The Team'}
        </h1>
      </div>

      {/* Tab Yapısı (Görseldeki gibi ince çizgili) */}
      <div className="flex w-full border-t border-b border-black/10">
        <button 
          onClick={() => setActiveTab('book')}
          className={`flex-1 py-8 text-2xl md:text-4xl uppercase font-bold tracking-tighter text-left px-4 md:px-10 transition-colors ${activeTab === 'book' ? 'bg-black text-white' : 'hover:bg-black/5'}`}
        >
          Book
          {activeTab === 'book' && <span className="block mt-2 font-mono text-xs font-normal opacity-60">Start a project</span>}
        </button>
        <div className="w-px bg-black/10"></div> {/* Dikey Çizgi */}
        <button 
          onClick={() => setActiveTab('career')}
          className={`flex-1 py-8 text-2xl md:text-4xl uppercase font-bold tracking-tighter text-left px-4 md:px-10 transition-colors ${activeTab === 'career' ? 'bg-black text-white' : 'hover:bg-black/5'}`}
        >
          Career
          {activeTab === 'career' && <span className="block mt-2 font-mono text-xs font-normal opacity-60">Work with us</span>}
        </button>
      </div>

      {/* Form Alanı */}
      <div className="grid grid-cols-1 gap-10 pt-16 md:grid-cols-12">
        
        {/* Sol Taraf: Açıklama */}
        <div className="px-4 md:col-span-4">
           <p className="text-lg font-medium leading-relaxed">
             {activeTab === 'book' 
               ? "We're excited to learn more about your tattoo. Please provide details below."
               : "We're excited to learn more about you. Tell us your story."}
           </p>
           
           <div className="mt-12">
             <h4 className="mb-4 text-xs tracking-widest uppercase opacity-40">General Information</h4>
             <p className="text-xs opacity-40">*Required</p>
           </div>
        </div>

        {/* Sağ Taraf: Form (Görseldeki Input Stili) */}
        <div className="md:col-span-8">
          <form className="flex flex-col gap-0">
            
            {/* Ad Soyad Satırı */}
            <div className="grid grid-cols-1 border-t md:grid-cols-2 border-black/10">
               <div className="p-4 border-b md:p-8 md:border-b-0 md:border-r border-black/10">
                  <label className="block mb-4 text-xs tracking-widest uppercase opacity-50">Name *</label>
                  <input type="text" placeholder="Enter name" className="w-full text-xl bg-transparent outline-none placeholder:opacity-20" />
               </div>
               <div className="p-4 md:p-8">
                  <label className="block mb-4 text-xs tracking-widest uppercase opacity-50">Last Name *</label>
                  <input type="text" placeholder="Enter last name" className="w-full text-xl bg-transparent outline-none placeholder:opacity-20" />
               </div>
            </div>

            {/* Telefon Email Satırı */}
            <div className="grid grid-cols-1 border-t border-b md:grid-cols-2 border-black/10">
               <div className="p-4 border-b md:p-8 md:border-b-0 md:border-r border-black/10">
                  <label className="block mb-4 text-xs tracking-widest uppercase opacity-50">Phone Number *</label>
                  <input type="tel" placeholder="Enter phone number" className="w-full text-xl bg-transparent outline-none placeholder:opacity-20" />
               </div>
               <div className="p-4 md:p-8">
                  <label className="block mb-4 text-xs tracking-widest uppercase opacity-50">E-mail address *</label>
                  <input type="email" placeholder="Enter e-mail address" className="w-full text-xl bg-transparent outline-none placeholder:opacity-20" />
               </div>
            </div>

            {/* Lokasyon (Görseldeki gibi) */}
            <div className="p-4 border-b md:p-8 border-black/10">
                <label className="block mb-4 text-xs tracking-widest uppercase opacity-50">Where are you located? *</label>
                <input type="text" placeholder="City, Country" className="w-full text-xl bg-transparent outline-none placeholder:opacity-20" />
            </div>

            {/* Mesaj */}
            <div className="p-4 border-b md:p-8 border-black/10">
                <label className="block mb-4 text-xs tracking-widest uppercase opacity-50">
                    {activeTab === 'book' ? 'Tell us about your idea' : 'Why do you want to join us?'} *
                </label>
                <textarea rows="4" className="w-full text-xl bg-transparent outline-none resize-none placeholder:opacity-20"></textarea>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-10">
                <button className="px-12 py-5 font-bold tracking-widest text-white uppercase transition-colors bg-black rounded-sm hover:bg-zinc-800">
                    Submit
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
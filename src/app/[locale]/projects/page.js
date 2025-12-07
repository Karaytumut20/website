'use client';
import { useState } from 'react';
import { projects } from '@/lib/data';
import ProjectList from './components/ProjectList';
import ProjectGrid from './components/ProjectGrid';

export default function ProjectsPage() {
  const [view, setView] = useState('list'); // Varsayılan görünüm: List

  return (
    <div className="min-h-screen pt-24 bg-[#e3e3db] dark:bg-[#141516] text-black dark:text-white transition-colors duration-500">
      
      {/* Görünüm Değiştirme Butonları (Fixed) */}
      <div className="fixed z-40 flex gap-2 text-white top-28 right-4 md:right-10 mix-blend-difference">
        <button 
          onClick={() => setView('list')}
          className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full transition-all ${view === 'list' ? 'bg-white text-black' : 'border-white/50 hover:border-white'}`}
        >
          List
        </button>
        <button 
          onClick={() => setView('grid')}
          className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full transition-all ${view === 'grid' ? 'bg-white text-black' : 'border-white/50 hover:border-white'}`}
        >
          Grid
        </button>
      </div>

      {/* Büyük Başlık */}
      <div className="px-4 pt-10 mb-10 md:px-10">
        <h1 className="text-[12vw] leading-[0.85] font-bold uppercase tracking-tighter opacity-10 select-none">
          Selected<br/>Works
        </h1>
      </div>

      {/* Aktif Görünümü Render Et */}
      {view === 'list' ? (
        <ProjectList projects={projects} />
      ) : (
        <ProjectGrid projects={projects} />
      )}

    </div>
  );
}
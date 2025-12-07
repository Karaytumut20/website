'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { projects } from '@/lib/data';
import ProjectList from './components/ProjectList';
import ProjectGrid from './components/ProjectGrid';
import Link from 'next/link';

const categories = ["All Projects", "Branding", "Design", "Development", "Strategy", "Motion"];

export default function ProjectsPage() {
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('All Projects');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  const titleRef = useRef(null);

  // Filtreleme Mantığı
  useEffect(() => {
    if (filter === 'All Projects') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category.includes(filter) || p.services?.includes(filter)));
    }
  }, [filter]);

  // Giriş Animasyonu
  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f2ed] text-[#1c1c1c] pt-32 px-4 md:px-10 pb-20 transition-colors duration-500">
      
      {/* --- 1. Filtreleme Alanı (Ashfall Style) --- */}
      <div className="mb-20 md:mb-32 border-b border-[#1c1c1c]/10 pb-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setFilter(cat)}
              className={`text-3xl md:text-5xl lg:text-[4vw] leading-tight font-medium tracking-tight transition-all duration-300 ${
                filter === cat 
                  ? 'opacity-100 underline decoration-2 underline-offset-8' 
                  : 'opacity-30 hover:opacity-60'
              }`}
            >
              {cat}
              {i !== categories.length - 1 && <span className="opacity-0">,</span>} {/* Virgül efekti */}
            </button>
          ))}
        </div>
      </div>

      {/* --- 2. Başlık ve Toggle (Inkfish Style) --- */}
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 border-b border-[#1c1c1c]/10 pb-4">
        
        {/* Sol: Devasa WORK Başlığı */}
        <div className="overflow-hidden">
            <h1 ref={titleRef} className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase select-none">
            Work
            <sup className="ml-2 font-mono text-2xl align-top opacity-50 md:text-4xl">[{filteredProjects.length}]</sup>
            </h1>
        </div>

        {/* Sağ: Grid/List Toggle */}
        <div className="flex gap-6 mb-2 font-mono text-xs tracking-widest uppercase md:mb-4">
            <button 
                onClick={() => setView('grid')} 
                className={`flex items-center gap-2 hover:opacity-100 transition-opacity ${view === 'grid' ? 'opacity-100' : 'opacity-40'}`}
            >
                <span className="w-2 h-2 bg-current rounded-full" /> Grid
            </button>
            <button 
                onClick={() => setView('list')} 
                className={`flex items-center gap-2 hover:opacity-100 transition-opacity ${view === 'list' ? 'opacity-100' : 'opacity-40'}`}
            >
                <span className="w-2 h-2 bg-current rounded-full" /> List
            </button>
        </div>
      </div>

      {/* --- 3. İçerik Alanı --- */}
      <div className="min-h-[50vh]">
        {view === 'grid' ? (
            <ProjectGrid projects={filteredProjects} />
        ) : (
            <ProjectList projects={filteredProjects} />
        )}
      </div>

    </div>
  );
}
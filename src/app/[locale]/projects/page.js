'use client';
import { useState, useEffect } from 'react';
import { projects } from '@/lib/data';
import ProjectList from './components/ProjectList';
import ProjectGrid from './components/ProjectGrid';
import TextRevealScrub from '@/components/TextRevealScrub'; // Animasyon bileşenini ekledik

const categories = ["All Projects", "Branding", "Design", "Development", "Strategy", "Motion"];

export default function ProjectsPage() {
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('All Projects');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (filter === 'All Projects') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category.includes(filter) || p.services?.includes(filter)));
    }
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#f3f2ed] text-[#1c1c1c] pt-40 px-6 md:px-12 pb-24 overflow-hidden">
      
      {/* BAŞLIK ALANI - TextRevealScrub Entegrasyonu */}
      <div className="flex flex-col items-start justify-between mb-20 md:flex-row md:items-end">
        <div className="relative z-10">
            {/* Animasyonlu Başlık: Kelime kelime açılarak gelir */}
            <TextRevealScrub>
                <h1 className="text-[13vw] leading-[0.85] font-black tracking-tighter uppercase text-[#1c1c1c]">
                    Selected
                    <br />
                    <span className="ml-[10vw] md:ml-[4vw] text-gray-400">Work</span>
                </h1>
            </TextRevealScrub>
        </div>

        {/* Proje Sayacı */}
        <div className="mt-6 font-mono text-sm tracking-widest uppercase md:mt-0 md:mb-4 opacity-60">
            [{filteredProjects.length} Projects]
        </div>
      </div>

      {/* KATEGORİ FİLTRELERİ & GÖRÜNÜM SEÇİCİ */}
      <div className="sticky top-0 z-40 flex flex-wrap items-center justify-between py-6 mb-12 bg-[#f3f2ed]/90 backdrop-blur-sm border-b border-black/10 transition-all">
        {/* Kategoriler */}
        <div className="flex gap-1 pr-4 overflow-x-auto no-scrollbar md:gap-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === cat 
                  ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]' 
                  : 'bg-transparent text-[#1c1c1c]/60 border-transparent hover:border-[#1c1c1c]/20 hover:text-[#1c1c1c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid/List Toggle */}
        <div className="flex items-center gap-1 pl-4 mt-4 border-l md:mt-0 border-black/10 md:pl-6">
            <button 
                onClick={() => setView('grid')} 
                className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-[#1c1c1c] text-white' : 'hover:bg-black/5 text-[#1c1c1c]/60'}`}
                aria-label="Grid View"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </button>
            <button 
                onClick={() => setView('list')} 
                className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-[#1c1c1c] text-white' : 'hover:bg-black/5 text-[#1c1c1c]/60'}`}
                aria-label="List View"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            </button>
        </div>
      </div>

      {/* PROJE LİSTESİ */}
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
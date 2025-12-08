'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { projects } from '@/lib/data';
import ProjectList from './components/ProjectList';
import ProjectGrid from './components/ProjectGrid';

const categories = ["All Projects", "Branding", "Design", "Development", "Strategy", "Motion"];

export default function ProjectsPage() {
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('All Projects');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const titleRef = useRef(null);

  useEffect(() => {
    if (filter === 'All Projects') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category.includes(filter) || p.services?.includes(filter)));
    }
  }, [filter]);

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    // DÜZELTME: pt-32 ve pb-20 ile üst/alt boşluklar artırıldı. overflow-hidden eklendi.
    <div className="min-h-screen bg-[#f3f2ed] text-[#1c1c1c] pt-32 px-4 md:px-10 pb-20 transition-colors duration-500 overflow-hidden">
      
      <div className="mb-16 md:mb-32 border-b border-[#1c1c1c]/10 pb-6 md:pb-10">
        {/* DÜZELTME: Kategori butonları mobilde yana kaydırılabilir (horizontal scroll) */}
        <div className="flex gap-6 pb-4 overflow-x-auto md:gap-10 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap text-2xl md:text-5xl lg:text-[4vw] leading-tight font-medium tracking-tight transition-all duration-300 ${
                filter === cat 
                  ? 'opacity-100 underline decoration-2 underline-offset-8' 
                  : 'opacity-30 hover:opacity-60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-between mb-10 border-b border-[#1c1c1c]/10 pb-4 gap-4">
        <div className="w-full overflow-hidden md:w-auto">
            {/* DÜZELTME: clamp font */}
            <h1 ref={titleRef} className="text-[clamp(4rem,15vw,12rem)] leading-[0.8] font-bold tracking-tighter uppercase select-none">
            Work
            <sup className="ml-2 font-mono text-xl align-top opacity-50 md:text-4xl">[{filteredProjects.length}]</sup>
            </h1>
        </div>

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
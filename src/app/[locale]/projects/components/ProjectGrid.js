'use client';
import { useEffect, useRef } from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function ProjectGrid({ projects }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if(!gridRef.current) return;
    gsap.fromTo(gridRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', clearProps: "all" }
    );
  }, [projects]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 pt-10 md:grid-cols-2 gap-x-10 gap-y-20">
      {projects.map((project) => (
        <TransitionLink 
          key={project.id} 
          href={`/project/${project.slug}`}
          className="block w-full cursor-pointer group"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 mb-6">
             <Image 
                src={project.cover} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 bg-black/20 group-hover:opacity-100">
                <div className="flex items-center justify-center w-24 h-24 transition-transform duration-500 delay-100 transform scale-0 bg-white rounded-full shadow-xl group-hover:scale-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span className="absolute mt-32 text-sm font-medium tracking-wide text-white transition-all duration-500 delay-200 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    View Project
                </span>
             </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl font-medium tracking-tight text-[#1c1c1c] group-hover:underline decoration-1 underline-offset-4">
                {project.title}
            </h3>
            <div className="flex items-center justify-between text-sm font-medium opacity-60">
                <span>{project.client || project.category}</span>
                <span className="font-mono text-xs">{project.services ? project.services.split('/')[0] : "Design"}</span>
            </div>
          </div>
        </TransitionLink>
      ))}
    </div>
  );
}
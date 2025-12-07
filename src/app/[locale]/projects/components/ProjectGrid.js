'use client';
import Link from 'next/link'; // DÜZELTME: Standart Link
import DistortionEffect from '@/components/webgl/DistortionEffect';

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 pt-40 md:grid-cols-2 md:gap-10 md:p-10">
      {projects.map((project) => (
        <Link 
          key={project.id} 
          href={`/project/${project.slug}`}
          className="group relative block w-full aspect-[4/3] overflow-hidden bg-gray-900 rounded-sm"
        >
          {/* WebGL Efekti (Tıklamayı engellememesi için pointer-events-none) */}
          <div className="absolute inset-0 w-full h-full transition-opacity duration-500 pointer-events-none opacity-80 group-hover:opacity-100">
             <DistortionEffect imageSrc={project.cover} />
          </div>

          <div className="absolute bottom-0 left-0 z-10 flex items-end justify-between w-full p-6 transition-transform duration-500 translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-black/80 to-transparent">
            <div>
              <h3 className="text-2xl font-bold text-white uppercase md:text-3xl">{project.title}</h3>
              <p className="mt-1 text-xs tracking-widest uppercase text-white/70">{project.category}</p>
            </div>
            <span className="font-mono text-sm text-white/50">{project.year}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
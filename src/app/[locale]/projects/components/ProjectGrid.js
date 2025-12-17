'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectGrid({ projects, onMouseEnter, onMouseLeave }) {
  return (
    <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-2">
      {projects.map((project, index) => (
        <div 
            key={index} 
            className="block group"
        >
          <Link 
            href={`/project/${project.slug}`} 
            className="block w-full cursor-none" // Sistem imlecini gizle
            onMouseEnter={onMouseEnter}          // Parent'a haber ver (Cursor Büyüsün)
            onMouseLeave={onMouseLeave}          // Parent'a haber ver (Cursor Küçülsün)
          >
            {/* Görsel Alanı */}
            <div className="relative w-full overflow-hidden aspect-[4/3] bg-gray-200 mb-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Alt Bilgi */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-1 text-xl font-bold tracking-tight uppercase">{project.title}</h3>
                <p className="font-mono text-sm opacity-60">{project.category}</p>
              </div>
              {/* Dekoratif ok işareti */}
              <div className="text-sm font-medium transition-all duration-300 transform translate-y-2 opacity-0 group-hover:opacity-40 group-hover:translate-y-0">
                  ↗
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
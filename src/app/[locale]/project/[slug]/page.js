import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectDetail from './ProjectDetail';

// Build sırasında statik sayfalar oluşturmak için (Performans)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function Page({ params }) {
  const { slug } = params;
  
  // Mevcut projeyi bul
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  // Proje bulunamazsa 404 sayfasına git
  if (!project) {
    notFound();
  }

  // Önceki ve Sonraki projeleri hesapla (Döngüsel yapı için modülo kullanıyoruz)
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <ProjectDetail 
      project={project} 
      nextProject={nextProject} 
      prevProject={prevProject} 
    />
  );
}
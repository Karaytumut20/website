'use client';
import { useState, useEffect, useRef } from 'react';
import { projects } from '@/lib/data';
import ProjectList from './components/ProjectList';
import ProjectGrid from './components/ProjectGrid';
import TextRevealScrub from '@/components/TextRevealScrub';
import gsap from 'gsap';

const categories = ["All Projects", "Branding", "Design", "Development", "Strategy", "Motion"];

export default function ProjectsPage() {
  const [view, setView] = useState('grid');
  
  // State: Seçili kategoriler, Dropdown durumu ve Filtrelenmiş Projeler
  const [selectedCategories, setSelectedCategories] = useState(['All Projects']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // --- CURSOR (İMLEÇ) STATE & REFS ---
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [isHoveringProject, setIsHoveringProject] = useState(false);

  // --- DROPDOWN REFS ---
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const arrowRef = useRef(null);

  // ---------------------------------------------------------
  // 1. CUSTOM CURSOR MOUSE TAKİP (GSAP quickTo)
  // ---------------------------------------------------------
  useEffect(() => {
    // Mouse takibi için xTo ve yTo kullanımı (En yüksek performans)
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // ---------------------------------------------------------
  // 2. CURSOR DURUM ANİMASYONU (Büyüme/Küçülme)
  // ---------------------------------------------------------
  useEffect(() => {
    if (isHoveringProject) {
      // Proje üzerindeyken: Büyü, Opak ol ve Yazıyı Göster
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      // Normaldeyken: Küçül ve Kaybol
      gsap.to(cursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHoveringProject]);

  // Çocuk bileşenlere (Grid/List) gönderilecek handler'lar
  const handleProjectEnter = () => setIsHoveringProject(true);
  const handleProjectLeave = () => setIsHoveringProject(false);

  // ---------------------------------------------------------
  // 3. DROPDOWN AÇILIŞ / KAPANIŞ ANİMASYONU
  // ---------------------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      if (isDropdownOpen) {
        // AÇILMA SENARYOSU
        
        // Ok ikonunu döndür
        gsap.to(arrowRef.current, { rotation: 180, duration: 0.5 });

        // Menü kutusunu aç (Siyah arka plan)
        tl.to(dropdownRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          display: "block",
          transformOrigin: "top center"
        })
        // Yazıları Maskeden Çıkar (Reveal Effect)
        .fromTo(".menu-text-inner", 
          { y: "100%" }, 
          { y: "0%", duration: 0.5, stagger: 0.05, ease: "power2.out" },
          "-=0.4"
        );

      } else {
        // KAPANMA SENARYOSU
        
        // Ok ikonunu düzelt
        gsap.to(arrowRef.current, { rotation: 0, duration: 0.5 });

        // Yazıları maskeye geri sok
        tl.to(".menu-text-inner", {
            y: "-100%",
            duration: 0.3,
            stagger: { amount: 0.1, from: "end" }
        })
        // Kutuyu kapat
        .to(dropdownRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          display: "none"
        }, "-=0.1");
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isDropdownOpen]);

  // Kategori seçildiğinde oluşan anlık efekt
  const animateSelection = (target) => {
    gsap.fromTo(target, 
      { x: 10, color: "#ffffff" },
      { x: 0, color: "#ffffff", duration: 0.4, ease: "elastic.out(1, 0.5)" }
    );
  };

  // ---------------------------------------------------------
  // 4. FİLTRELEME MANTIĞI
  // ---------------------------------------------------------
  useEffect(() => {
    if (selectedCategories.includes('All Projects')) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(p => 
        selectedCategories.some(cat => p.category.includes(cat) || p.services?.includes(cat))
      );
      setFilteredProjects(filtered);
    }
  }, [selectedCategories]);

  const toggleCategory = (cat, e) => {
    // Animasyonu tetikle
    const textElement = e.currentTarget.querySelector('.menu-text-inner');
    animateSelection(textElement);

    let newCategories = [...selectedCategories];

    if (cat === 'All Projects') {
      newCategories = ['All Projects'];
    } else {
      if (newCategories.includes('All Projects')) newCategories = [];
      
      if (newCategories.includes(cat)) {
        newCategories = newCategories.filter(c => c !== cat);
      } else {
        newCategories.push(cat);
      }

      if (newCategories.length === 0) newCategories = ['All Projects'];
    }
    setSelectedCategories(newCategories);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f3f2ed] text-[#1c1c1c] pt-40 px-6 md:px-12 pb-24 overflow-hidden" 
         onClick={() => isDropdownOpen && setIsDropdownOpen(false)}>
      
      {/* --- CUSTOM CURSOR ELEMENTİ --- */}
      {/* mix-blend-difference: Arka plan ne renkse zıttı görünür (Siyah üstünde beyaz, beyaz üstünde siyah) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
        style={{ width: '100px', height: '100px', opacity: 0, transform: 'scale(0)' }} 
      >
        <div className="absolute inset-0 bg-white rounded-full opacity-100"></div>
        <span ref={cursorTextRef} className="relative z-10 text-xs font-bold tracking-widest text-black uppercase">
            View
        </span>
      </div>

      {/* BAŞLIK ALANI */}
      <div className="flex flex-col items-start justify-between mb-20 md:flex-row md:items-end">
        <div className="relative z-10">
            <TextRevealScrub>
                {/* GÜNCELLEME: font-heading eklendi */}
                <h1 className="text-[13vw] leading-[0.85] font-heading font-black tracking-tighter uppercase text-[#1c1c1c]">
                        Projects
                </h1>
            </TextRevealScrub>
        </div>
        <div className="mt-6 font-mono text-sm tracking-widest uppercase md:mt-0 md:mb-4 opacity-60">
            [{filteredProjects.length} Projects]
        </div>
      </div>

      {/* KONTROL ÇUBUĞU */}
      <div className="sticky top-0 z-50 flex items-center justify-between py-6 mb-12 bg-[#f3f2ed]/90 backdrop-blur-md border-b border-black/5">
        
        {/* CUSTOM DROPDOWN (ANIMATED) */}
        <div className="relative w-72" onClick={(e) => e.stopPropagation()}>
            
            {/* TRIGGER BUTTON */}
            <button 
                ref={triggerRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-between w-full px-5 py-4 text-sm font-bold tracking-wide transition-all duration-300 border rounded-none group hover:bg-[#1c1c1c] hover:text-[#f3f2ed] ${isDropdownOpen ? 'bg-[#1c1c1c] text-[#f3f2ed] border-[#1c1c1c]' : 'bg-transparent border-[#1c1c1c] text-[#1c1c1c]'}`}
            >
                <span className="uppercase">
                    {selectedCategories.includes('All Projects') 
                        ? 'Filter Categories' 
                        : `${selectedCategories.length} Selected`}
                </span>
                <svg ref={arrowRef} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </button>

            {/* DROPDOWN MENU (BLACK BOX) */}
            <div 
                ref={dropdownRef}
                className="absolute left-0 w-full mt-0 overflow-hidden bg-[#1c1c1c] text-[#f3f2ed] shadow-2xl h-0 opacity-0 hidden"
            >
                <div className="py-4">
                    {categories.map((cat, i) => {
                        const isSelected = selectedCategories.includes(cat);
                        return (
                            <div 
                                key={i}
                                onClick={(e) => toggleCategory(cat, e)}
                                className="relative flex items-center justify-between px-6 py-3 overflow-hidden transition-colors cursor-pointer group hover:bg-white/5"
                            >
                                <div className="relative flex items-center w-full h-6 gap-3 overflow-hidden">
                                    {/* Nokta İndikatörü */}
                                    <span className={`w-1.5 h-1.5 rounded-full bg-[#f3f2ed] transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
                                    {/* Animasyonlu Metin */}
                                    <span className={`menu-text-inner text-sm font-medium uppercase tracking-wider block transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                                        {cat}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full h-1 bg-white/10"></div>
            </div>
        </div>

        {/* View Toggle (Grid/List) */}
        <div className="flex items-center gap-2 pl-6 border-l border-black/10">
            <button 
                onClick={() => setView('grid')} 
                className={`p-2 transition-all duration-300 ${view === 'grid' ? 'bg-[#1c1c1c] text-white scale-110' : 'hover:bg-black/5 text-[#1c1c1c]/60'}`}
                aria-label="Grid View"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </button>
            <button 
                onClick={() => setView('list')} 
                className={`p-2 transition-all duration-300 ${view === 'list' ? 'bg-[#1c1c1c] text-white scale-110' : 'hover:bg-black/5 text-[#1c1c1c]/60'}`}
                aria-label="List View"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            </button>
        </div>
      </div>

      {/* PROJE LİSTESİ */}
      <div className="min-h-[50vh]">
        {view === 'grid' ? (
            <ProjectGrid 
                projects={filteredProjects} 
                onMouseEnter={handleProjectEnter} // Event iletiyoruz
                onMouseLeave={handleProjectLeave} // Event iletiyoruz
            />
        ) : (
            <ProjectList 
                projects={filteredProjects} 
                onMouseEnter={handleProjectEnter} // Event iletiyoruz
                onMouseLeave={handleProjectLeave} // Event iletiyoruz
            />
        )}
      </div>

    </div>
  );
}
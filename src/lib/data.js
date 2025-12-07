export const projects = [
  {
    id: 1,
    title: "Tiny Sprouts",
    slug: "innovate-2024", // Slug'ı korudum, linkler bozulmasın
    category: "Edtech Platform",
    client: "Tiny Sprout Education",
    services: "Branding Identity / Web & App Design / Dashboard Design",
    date: "February 2025",
    year: "2025",
    description: "A story-driven edtech platform focused on nature-based learning.",
    cover: "/assets/img1.png", 
    images: ["/assets/img1.png", "/assets/img2.jpg", "/assets/img3.jpg"] 
  },
  {
    id: 2,
    title: "LVXH - AMOT",
    slug: "lvxh-amot",
    category: "Branding",
    client: "LVXH Group",
    services: "Visual Identity / Art Direction",
    date: "October 2023",
    year: "2023",
    description: "Luxury fashion branding with a minimalist touch.",
    cover: "/assets/img2.jpg",
    images: ["/assets/img2.jpg", "/assets/img4.jpg", "/assets/img1.png"]
  },
  {
    id: 3,
    title: "ARTISAN CRAFT",
    slug: "artisan-craft",
    category: "Development",
    client: "Artisan Co.",
    services: "E-commerce / UI/UX",
    date: "June 2023",
    year: "2023",
    description: "E-commerce platform for handmade goods.",
    cover: "/assets/img3.jpg",
    images: ["/assets/img3.jpg", "/assets/img1.png", "/assets/img2.jpg"]
  },
  {
    id: 4,
    title: "DISGUISED EDGE",
    slug: "disguised-edge",
    category: "Design",
    client: "Edge Magazine",
    services: "Editorial Design / Print",
    date: "March 2022",
    year: "2022",
    description: "Editorial design for a modern art magazine.",
    cover: "/assets/img4.jpg",
    images: ["/assets/img4.jpg", "/assets/img3.jpg", "/assets/img1.png"]
  },
  {
    id: 5,
    title: "NEBULA STREAM",
    slug: "nebula-stream",
    category: "Motion",
    client: "Nebula TV",
    services: "3D Motion / Sound Design",
    date: "January 2022",
    year: "2022",
    description: "3D motion graphics for a streaming service.",
    cover: "/assets/img1.png", // Resim yoksa img1 kullan
    images: ["/assets/img1.png", "/assets/img2.jpg", "/assets/img3.jpg"]
  }
];

export const menuItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
];
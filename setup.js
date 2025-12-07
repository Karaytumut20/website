const fs = require('fs');
const path = require('path');

const filesToCreate = [
  // Sayfalar
  'src/app/layout.js',
  'src/app/not-found.js',
  'src/app/[locale]/layout.js',
  'src/app/[locale]/page.js',
  'src/app/[locale]/globals.css',
  'src/app/[locale]/projects/page.js',
  'src/app/[locale]/projects/components/ProjectList.js',
  'src/app/[locale]/projects/components/ProjectGrid.js',
  'src/app/[locale]/project/[slug]/page.js',
  'src/app/[locale]/contact/page.js',
  'src/app/[locale]/about/page.js',
  
  // Componentler
  'src/components/layout/Header.js',
  'src/components/layout/Footer.js',
  'src/components/layout/OverlayMenu.js',
  'src/components/animation/Preloader.js',
  'src/components/animation/TextReveal.js',
  'src/components/animation/PageTransition.js',
  'src/components/webgl/DistortionEffect.js',
  'src/components/webgl/FluidBackground.js',
  
  // Hooks ve Lib
  'src/hooks/useScroll.js',
  'src/hooks/useMouse.js',
  'src/lib/data.js',
  'src/lib/utils.js',
  'src/lib/i18n.js',
  'src/middleware.js',
  
  // Mesajlar ve Shaderlar
  'src/messages/en.json',
  'src/messages/tr.json',
  'public/shaders/vertex.glsl',
  'public/shaders/fragment.glsl'
];

filesToCreate.forEach(file => {
  const absolutePath = path.join(__dirname, file);
  const dir = path.dirname(absolutePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(absolutePath)) {
    fs.writeFileSync(absolutePath, '', 'utf8');
    console.log(`✅ Oluşturuldu: ${file}`);
  } else {
    console.log(`⚠️ Zaten var: ${file}`);
  }
});

console.log("\n🎉 Dosya yapısı başarıyla tamamlandı!");
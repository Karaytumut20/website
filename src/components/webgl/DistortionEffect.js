'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Texture, Program, Mesh, Vec2, Vec4, Geometry, Flowmap } from 'ogl';
import vertex from '../../../public/shaders/vertex.glsl';
import fragment from '../../../public/shaders/fragment.glsl';

export default function DistortionEffect({ imageSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Renderer Kurulumu
    const renderer = new Renderer({ 
      alpha: true, 
      dpr: Math.min(window.devicePixelRatio, 2) 
    });
    const gl = renderer.gl;
    const container = containerRef.current;
    container.appendChild(gl.canvas);

    // 2. Flowmap (Mouse Hareketinin İzi)
    const flowmap = new Flowmap(gl, {
        falloff: 0.2, // İzin kaybolma hızı
        dissipation: 0.9, // Dağılma oranı
        alpha: 0.5
    });

    // 3. Geometri ve Texture
    // Ekranı kaplayan basit bir üçgen (performans için quad yerine triangle kullanılır)
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
    });

    const texture = new Texture(gl, {
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR
    });

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      texture.image = img;
    };

    // 4. Program (Shader Ayarları)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tWater: { value: texture }, // Ana resim
        tFlow: flowmap.uniform,     // Akış haritası
        res: { value: new Vec4() }, // Ekran oranları
        uTime: { value: 0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // 5. Boyutlandırma (Resize)
    function resize() {
      const { offsetWidth, offsetHeight } = container;
      renderer.setSize(offsetWidth, offsetHeight);
      
      // Görselin "cover" (ekranı kaplama) mantığı burada hesaplanır
      let a1, a2;
      const imageAspect = img.height / img.width;
      
      if (offsetHeight / offsetWidth < imageAspect) {
        a1 = 1;
        a2 = offsetHeight / offsetWidth / imageAspect;
      } else {
        a1 = (offsetWidth / offsetHeight) * imageAspect;
        a2 = 1;
      }

      program.uniforms.res.value = new Vec4(offsetWidth, offsetHeight, a1, a2);
    }
    
    window.addEventListener('resize', resize);
    // Resim yüklenince ilk boyutu ayarla
    img.onload = () => {
        texture.image = img;
        resize();
    }

    // 6. Mouse Takibi
    const mouse = new Vec2(-1);
    const velocity = new Vec2();
    let lastTime;
    let lastMouse = new Vec2();

    function updateMouse(e) {
      // Mouse koordinatlarını normalize et (0 ile 1 arası)
      const x = e.x / renderer.width;
      const y = 1.0 - e.y / renderer.height; // WebGL'de Y ekseni terstir
      
      mouse.set(x, y);

      if (!lastTime) {
        lastTime = performance.now();
        lastMouse.set(x, y);
      }

      const deltaX = x - lastMouse.x;
      const deltaY = y - lastMouse.y;

      lastMouse.set(x, y);

      let time = performance.now();
      let delta = Math.max(14, time - lastTime);
      lastTime = time;

      // Mouse hızını hesapla
      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      
      // Hız çok yüksekse efekti artır
      velocity.needsUpdate = true;
    }
    
    window.addEventListener('mousemove', updateMouse);

    // 7. Render Loop (Sürekli Güncelleme)
    let animationId;
    function update(t) {
      animationId = requestAnimationFrame(update);

      if (!velocity.needsUpdate) {
        mouse.set(-1);
        velocity.set(0);
      }
      velocity.needsUpdate = false;

      // Flowmap güncelle
      flowmap.aspect = renderer.width / renderer.height;
      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
      flowmap.update();

      // Shader'a zamanı gönder
      program.uniforms.uTime.value = t * 0.01;

      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    // 8. Temizlik (Component silinince hafızayı boşalt)
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      cancelAnimationFrame(animationId);
      gl.canvas.remove();
    };
  }, [imageSrc]);

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-full bg-black -z-10"
    />
  );
}
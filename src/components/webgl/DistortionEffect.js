'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Vec2, Vec4, Geometry, Flowmap, Texture } from 'ogl';

// Vertex Shader: Köşe noktalarının pozisyonunu belirler
const vertex = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

// Fragment Shader: Piksel renklerini ve su efektini hesaplar
const fragment = `
  precision highp float;
  uniform sampler2D tMap;
  uniform sampler2D tFlow;
  uniform float uTime;
  uniform vec4 res;

  varying vec2 vUv;

  void main() {
    vec3 flow = texture2D(tFlow, vUv).rgb;
    vec2 myUV = vUv - flow.xy * 0.2; // 0.2 distortion gücüdür
    vec3 tex = texture2D(tMap, myUV).rgb;
    gl_FragColor = vec4(tex, 1.0);
  }
`;

export default function DistortionEffect({ imageSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // 1. Renderer Kurulumu
    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    // 2. Flowmap (Mouse İzi)
    const flowmap = new Flowmap(gl, { falloff: 0.3, dissipation: 0.92, alpha: 0.5 });

    // 3. Geometri
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
    });

    // 4. Texture (Resim Yükleme)
    const texture = new Texture(gl, { minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const img = new Image();
    
    // Resmi yükle ve boyutları ayarla
    img.onload = () => { 
        texture.image = img; 
        resize(); 
    };
    img.src = imageSrc;

    // 5. Program (Shader Bağlantısı)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tWater: { value: texture },
        tFlow: flowmap.uniform,
        res: { value: new Vec4() },
        uTime: { value: 0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // 6. Resize Handler (Ekran Boyutlandırma)
    function resize() {
      const { offsetWidth, offsetHeight } = container;
      renderer.setSize(offsetWidth, offsetHeight);
      
      let a1, a2;
      const imageAspect = img.height / img.width;
      
      // CSS object-fit: cover mantığı
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

    // 7. Mouse Handler (Fare Takibi)
    const mouse = new Vec2(-1);
    const velocity = new Vec2();
    let lastTime;
    let lastMouse = new Vec2();

    function updateMouse(e) {
      // Mouse koordinatlarını normalize et
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
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
      
      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      velocity.needsUpdate = true;
    }
    window.addEventListener('mousemove', updateMouse);

    // 8. Render Loop (Animasyon Döngüsü)
    let animationId;
    function update(t) {
      animationId = requestAnimationFrame(update);
      
      if (!velocity.needsUpdate) { 
          mouse.set(-1); 
          velocity.set(0); 
      }
      velocity.needsUpdate = false;
      
      flowmap.aspect = renderer.width / renderer.height;
      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
      flowmap.update();
      
      program.uniforms.uTime.value = t * 0.01;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    // 9. Cleanup (Temizlik)
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      cancelAnimationFrame(animationId);
      if (container.contains(gl.canvas)) {
          container.removeChild(gl.canvas);
      }
    };
  }, [imageSrc]);

  return (
    <div 
        ref={containerRef} 
        className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none -z-10" 
    />
  );
}
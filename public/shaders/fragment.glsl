precision highp float;
precision highp int;

uniform sampler2D tMap;  // Ana görsel
uniform sampler2D tFlow; // Mouse akış haritası
uniform float uTime;
uniform vec4 res;        // Çözünürlük ayarları

varying vec2 vUv;

void main() {
    // Akış haritasından (Flowmap) R ve G kanallarını alıp sapma miktarı olarak kullanıyoruz
    vec3 flow = texture2D(tFlow, vUv).rgb;
    
    // Gelen akış verisine göre UV koordinatlarını bozuyoruz (Distortion)
    // 0.3 katsayısı bozulmanın şiddetini belirler
    vec2 myUV = vUv - flow.xy * 0.3;
    
    // Bozulan UV'ye göre ana görseli ekrana basıyoruz
    vec3 tex = texture2D(tMap, myUV).rgb;

    gl_FragColor = vec4(tex, 1.0);
}
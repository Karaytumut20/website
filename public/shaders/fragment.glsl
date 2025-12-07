precision highp float;
uniform sampler2D tMap;
uniform sampler2D tFlow;
varying vec2 vUv;
void main() {
    vec3 flow = texture2D(tFlow, vUv).rgb;
    vec2 myUV = vUv - flow.xy * 0.2; 
    vec3 tex = texture2D(tMap, myUV).rgb;
    gl_FragColor = vec4(tex, 1.0);
}
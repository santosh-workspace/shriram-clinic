'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Ambient WebGL layer behind the hero. Flowing fractal noise in warm
 * whites and a whisper of gold, gently displaced toward the cursor.
 * Hand-rolled on three.js (no ResizeObserver dependency) so it sizes
 * correctly in every browser. Static single frame under reduced-motion;
 * silently no-ops if WebGL is unavailable.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1.,0.)), u.x),
               mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p*=2.02; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 asp = vec2(uRes.x/max(uRes.y,1.0), 1.0);
    vec2 p = (uv - 0.5) * asp;

    vec2 m = (uMouse - 0.5) * asp;
    float d = distance(p, m);
    p += (m - p) * 0.06 * smoothstep(0.9, 0.0, d);

    float t = uTime * 0.04;
    float n = fbm(p * 2.4 + vec2(t, -t*0.6));
    n += 0.35 * fbm(p * 5.0 - vec2(t*0.5, t));

    vec3 canvasCol = vec3(0.973, 0.969, 0.957);
    vec3 goldCol   = vec3(0.722, 0.565, 0.396);
    vec3 col = mix(canvasCol, goldCol, smoothstep(0.35, 0.9, n) * 0.10);

    float vig = smoothstep(1.3, 0.15, length(p));
    col = mix(canvasCol, col, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function HeroCanvas() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      return; // WebGL unavailable — warm-white background shows through
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    renderer.setClearColor(0xf8f7f4, 1);
    container.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
    });

    const size = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    size();

    const target = new THREE.Vector2(0.5, 0.5);
    const onMove = (e: PointerEvent) => {
      target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', size);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(target, 0.05);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      renderer.render(scene, camera); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', size);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}

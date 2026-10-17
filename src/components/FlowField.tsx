"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function FlowField({ view, transitioning }: { view: string; transitioning: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const live = useRef({ view, transitioning });
  const reduced = useReducedMotion();
  useEffect(() => { live.current = { view, transitioning }; }, [view, transitioning]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let destroy: (() => void) | undefined;
    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: import("three").WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" }); }
      catch { mount.dataset.fallback = "true"; return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1 : 1.5));
      renderer.setSize(innerWidth, innerHeight);
      renderer.setClearColor(0x0d1117, 0);
      mount.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, .1, 60);
      camera.position.set(0, 0, 8);
      const pointer = new THREE.Vector2(0, 0);
      const smooth = new THREE.Vector2(0, 0);
      const uniforms = {
        uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() },
        uPhase: { value: 0 }, uRush: { value: 0 }, uRatio: { value: renderer.getPixelRatio() }
      };
      const field = `
        uniform float uTime; uniform vec2 uPointer; uniform float uPhase; uniform float uRush;
        vec3 flow(float t, float lane, float seed) {
          float x = (t-.5)*27.;
          float bend = sin(t*5.4+lane*1.4+uTime*.11);
          float y = bend*(1.1+lane*.12)+(lane-3.)*.83;
          float z = cos(t*6.2+lane*.65+uTime*.08)*1.8-3.2;
          y += sin(x*.36+uTime*.12+seed)*.24;
          float distanceToCursor = length(vec2(x*.12,y*.22)-uPointer);
          z += exp(-distanceToCursor*distanceToCursor*1.8)*.6;
          y += uPhase*.12*sin(t*3.14);
          x += uRush*sin(t*3.14)*2.;
          return vec3(x,y,z);
        }`;
      const count = innerWidth < 700 ? 800 : 2100;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const offsets = new Float32Array(count);
      const lanes = new Float32Array(count);
      const seeds = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        offsets[i] = ((i * 173) % count) / count;
        lanes[i] = (i % 7) + Math.sin(i * 1.7) * .22;
        seeds[i] = ((i * 61) % 97) / 97;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
      geometry.setAttribute("aLane", new THREE.BufferAttribute(lanes, 1));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
      const material = new THREE.ShaderMaterial({
        uniforms, transparent: true, depthWrite: false,
        vertexShader: field + `
          attribute float aOffset; attribute float aLane; attribute float aSeed;
          uniform float uRatio; varying float vAlpha; varying float vSeed;
          void main(){
            float t=fract(aOffset+uTime*(.006+aSeed*.009)+uRush*.06);
            vec3 p=flow(t,aLane,aSeed);
            p.y+=(aSeed-.5)*.6; p.z+=(aSeed-.5)*1.4;
            vec4 mv=modelViewMatrix*vec4(p,1.);
            gl_Position=projectionMatrix*mv;
            gl_PointSize=clamp((8.+aSeed*12.)/(-mv.z)*uRatio, .8, 3.);
            vAlpha=sin(t*3.14159)*(.13+aSeed*.43);vSeed=aSeed;
          }`,
        fragmentShader: `varying float vAlpha; varying float vSeed;
          void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.08,d)*vAlpha;
          vec3 c=mix(vec3(.45,.60,.68),vec3(.82,.89,.86),vSeed);gl_FragColor=vec4(c,a);}`
      });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      const paths = new THREE.Group();
      const pathGeometries: import("three").BufferGeometry[] = [];
      const pathMaterials: import("three").ShaderMaterial[] = [];
      for (let lane = 0; lane < 7; lane++) {
        const curve = new THREE.BufferGeometry();
        const data = new Float32Array(150 * 3);
        for (let i = 0; i < 150; i++) { data[i * 3] = i / 149; data[i * 3 + 1] = lane; }
        curve.setAttribute("position", new THREE.BufferAttribute(data, 3));
        const ink = new THREE.ShaderMaterial({
          uniforms, transparent: true, depthWrite: false,
          vertexShader: field + `varying float vA;void main(){vA=sin(position.x*3.14159);gl_Position=projectionMatrix*modelViewMatrix*vec4(flow(position.x,position.y,0.),1.);}`,
          fragmentShader: `varying float vA;void main(){gl_FragColor=vec4(.53,.68,.66,vA*.15);}`
        });
        paths.add(new THREE.Line(curve, ink)); pathGeometries.push(curve); pathMaterials.push(ink);
      }
      scene.add(paths);
      let frame = 0;
      let previous = 0;
      let visible = !document.hidden;
      const start = performance.now();
      function render(now: number) {
        if (disposed) return;
        if (!reduced) frame = requestAnimationFrame(render);
        const frameGap = live.current.view === "play" ? 66 : 32;
        if (!visible || (!reduced && now - previous < frameGap)) return;
        previous = now;
        const current = live.current;
        uniforms.uTime.value = reduced ? 18 : (now - start) / 1000;
        smooth.lerp(pointer, .035); uniforms.uPointer.value.copy(smooth);
        const phase = ["landing", "player", "work", "play", "contact"].indexOf(current.view);
        uniforms.uPhase.value += (Math.max(0, phase) - uniforms.uPhase.value) * .035;
        uniforms.uRush.value += ((current.transitioning ? 1 : 0) - uniforms.uRush.value) * .055;
        camera.position.x += (smooth.x * .26 - camera.position.x) * .03;
        camera.position.y += (smooth.y * .15 - camera.position.y) * .03;
        camera.position.z += ((current.transitioning ? 6.4 : 8) - camera.position.z) * .035;
        scene.rotation.z = Math.sin(uniforms.uTime.value * .025) * .035;
        renderer.render(scene, camera);
      }
      function move(event: PointerEvent) { pointer.set(event.clientX / innerWidth * 2 - 1, -(event.clientY / innerHeight * 2 - 1)); }
      function resize() { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); if(reduced) render(performance.now()); }
      function visibility() { visible = !document.hidden; }
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", visibility);
      render(performance.now());
      destroy = () => {
        cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", visibility);
        geometry.dispose(); material.dispose(); pathGeometries.forEach(g => g.dispose()); pathMaterials.forEach(m => m.dispose());
        renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => { if (mount.isConnected) mount.dataset.fallback = "true"; });
    return () => { disposed = true; destroy?.(); };
  }, [reduced]);
  return <div className="flow-field" ref={mountRef} aria-hidden="true" />;
}

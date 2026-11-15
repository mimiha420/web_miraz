import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Icon } from "@iconify/react";
import "./LandingPage.css";

// Shader retro VHS z zachowaniem efektów zakłóceń
const VHSShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      float wave = sin(uv.y * 50.0 + time * 5.0) * 0.0015;
      uv.x += wave;

      float distortion = 0.003;
      float r = texture2D(tDiffuse, vec2(uv.x + distortion, uv.y)).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, vec2(uv.x - distortion, uv.y)).b;

      float scanline = sin(uv.y * 800.0) * 0.04;
      vec3 color = vec3(r, g, b) - scanline;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const LandingPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Zmieniono kolor tła na --pal-coral (#F77979)
    const bgColor = 0xF77979;

    const getSize = () => ({
      w: canvas.clientWidth,
      h: canvas.clientHeight,
    });
    const { w, h } = getSize();

    // Renderer WebGL
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(bgColor, 1); // Pełne tło w nowym kolorze
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 3);

    // Resize
    const handleResize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      composer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Environment Map (HDR)
    const hdrEquirect = new RGBELoader()
      .setPath("https://miroleon.github.io/daily-assets/")
      .load("GRADIENT_01_01_comp.hdr", () => {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      });

    scene.environment = hdrEquirect;
    scene.fog = new THREE.FogExp2(bgColor, 0.2);

    // Tekstura i Materiał
    const surfaceImperfection = new THREE.TextureLoader().load(
      "https://miroleon.github.io/daily-assets/surf_imp_02.jpg"
    );
    surfaceImperfection.wrapT = THREE.RepeatWrapping;
    surfaceImperfection.wrapS = THREE.RepeatWrapping;

    const hands_mat = new THREE.MeshPhysicalMaterial({
      color: 0x4a5568,
      roughness: 0.2,
      metalness: 0.8,
      roughnessMap: surfaceImperfection,
      envMap: hdrEquirect,
      envMapIntensity: 1.5,
    });

    // Ładowanie pliku GLB z public/hands.glb
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/hands.glb",
      (gltf) => {
        const object = gltf.scene;

        object.traverse((child) => {
          if (child.isMesh) {
            child.material = hands_mat;
          }
        });

        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);

        object.rotation.y = Math.PI / 3;
        object.scale.setScalar(5);
        object.position.set(-3, -2, -0.5);

        scene.add(object);
      },
      undefined,
      (error) => {
        console.error("Błąd podczas ładowania hands.glb:", error);
      }
    );

    // --- CONFIGURE POST-PROCESSING (VHS EFFECT) ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const vhsPass = new ShaderPass(VHSShader);
    composer.addPass(vhsPass);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      vhsPass.uniforms.time.value = clock.getElapsedTime();
      composer.render();
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#F77979', // Ustawienie koloru tła kontenera
      }}
    >
      {/* Canvas tła 3D */}
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Napis główny */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          textAlign: 'center',
          width: '100%',
          maxWidth: '800px',
          padding: '0 20px',
          boxSizing: 'border-box',
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            fontSize: '2.2rem',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontWeight: '600',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            margin: 0,
            lineHeight: '1.3',
            pointerEvents: 'auto',
          }}
        >
          Pracownia Psychologiczna<br />Miraż
        </h1>
        <p style={{ marginTop: '15px', pointerEvents: 'auto' }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', textDecoration: 'none', letterSpacing: '2px' }}
          >
            @julia.sabura
          </a>
        </p>
      </div>

      {/* Ikony społecznościowe */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
            <Icon icon="mdi:instagram" width="28" height="28" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
            <Icon icon="prime:twitter" width="28" height="28" />
          </a>
          <a href="https://miroleon.de/links" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
            <Icon icon="ph:globe" width="28" height="28" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
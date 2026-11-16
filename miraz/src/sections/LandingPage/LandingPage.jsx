import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
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

    // Głęboki, elegancki granat (zapewnia doskonały kontrast dla białego napisu)
    const waterFogColor = 0x0f172a; // Ciemny granat / navy

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
    renderer.setClearColor(waterFogColor, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 3.2, 4.5);
    camera.lookAt(0, 0, 0);

    // Resize
    const handleResize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      composer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Environment Map (HDR)
    const hdrEquirect = new HDRLoader()
      .setPath("https://miroleon.github.io/daily-assets/")
      .load("GRADIENT_01_01_comp.hdr", () => {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      });

    scene.environment = hdrEquirect;
    scene.fog = new THREE.FogExp2(waterFogColor, 0.06);

    // Oświetlenie sceny (delikatne, chłodniejsze światło pasujące do granatu)
    const ambientLight = new THREE.AmbientLight(0x88ccff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // --- TAFLA WODY (Granatowa, organicznie falująca siatka) ---
    const waterGeometry = new THREE.PlaneGeometry(40, 40, 160, 160);
    waterGeometry.rotateX(-Math.PI / 2);

    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,        // Bazowy kolor granatowej wody
      emissive: 0x09101d,     // Głęboka poświata od spodu
      emissiveIntensity: 0.3,
      roughness: 0.2,         // Delikatny połysk dla naturalnego wyglądu
      metalness: 0.1,
      reflectivity: 0.7,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      envMap: hdrEquirect,
      envMapIntensity: 1.4,
    });

    const waterPlane = new THREE.Mesh(waterGeometry, waterMaterial);
    waterPlane.rotation.y = Math.PI / 8;
    scene.add(waterPlane);

    // Zapisujemy bazowe pozycje wierzchołków wody
    const waterPosAttr = waterGeometry.attributes.position;
    const baseWaterY = new Float32Array(waterPosAttr.count);
    for (let i = 0; i < waterPosAttr.count; i++) {
      baseWaterY[i] = waterPosAttr.getY(i);
    }

    // --- ŁADOWANIE LILII ---
    const lilies = [];
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      `${import.meta.env.BASE_URL}lilia.glb`,
      (gltf) => {
        const baseLily = gltf.scene;

        const box = new THREE.Box3().setFromObject(baseLily);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        baseLily.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.1 / (maxDim || 1);

        // Lilia 1 (prawa góra)
        const lilyTopRight = baseLily.clone();
        lilyTopRight.scale.setScalar(targetScale);
        lilyTopRight.position.set(3, 0.25, -0.9);
        lilyTopRight.rotation.y = Math.PI * 0.2;
        scene.add(lilyTopRight);
        lilies.push({ mesh: lilyTopRight, baseY: 0.25, offsetX: 3, offsetZ: -0.9 });

        // Lilia 2 (lewy dół)
        const lilyBottomLeft = baseLily.clone();
        lilyBottomLeft.scale.setScalar(targetScale * 1.15);
        lilyBottomLeft.position.set(-2, 0.75, 1.1);
        lilyBottomLeft.rotation.y = -Math.PI * 0.35;
        scene.add(lilyBottomLeft);
        lilies.push({ mesh: lilyBottomLeft, baseY: 0.75, offsetX: -2, offsetZ: 1.1 });
      },
      undefined,
      (error) => {
        console.error("Błąd podczas ładowania lilia.glb:", error);
      }
    );

    // --- POST-PROCESSING ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const vhsPass = new ShaderPass(VHSShader);
    // composer.addPass(vhsPass); // Odkomentuj jeśli chcesz VHS

    // Funkcja generująca organiczne, losowe fale bez sztucznego "patentu"
    const computeWaveHeight = (x, z, t) => {
      const f1 = Math.sin(x * 0.8 + z * 0.5 + t * 1.5) * 0.08;
      const f2 = Math.cos(x * 1.2 - z * 1.4 + t * 2.1) * 0.06;
      const f3 = Math.sin(x * 2.2 + z * 1.8 - t * 1.1) * 0.03;
      const f4 = Math.cos(x * 0.3 + z * 2.5 + t * 0.8) * 0.05;
      return f1 + f2 + f3 + f4;
    };

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (clock.update(), clock.getElapsed());

      // 1. Organiczny ruch fal na granatowej tafli
      for (let i = 0; i < waterPosAttr.count; i++) {
        const x = waterPosAttr.getX(i);
        const z = waterPosAttr.getZ(i);
        waterPosAttr.setY(i, baseWaterY[i] + computeWaveHeight(x, z, elapsedTime));
      }
      waterPosAttr.needsUpdate = true;
      waterGeometry.computeVertexNormals();

      // 2. Kołysanie lilii zsynchronizowane z falami
      lilies.forEach((item) => {
        const currentWaveY = computeWaveHeight(item.offsetX, item.offsetZ, elapsedTime);
        item.mesh.position.y = item.baseY + currentWaveY;

        item.mesh.rotation.z = Math.sin(elapsedTime * 1.3 + item.offsetX) * 0.08 + currentWaveY * 0.2;
        item.mesh.rotation.x = Math.cos(elapsedTime * 1.1 + item.offsetZ) * 0.08;
      });

      vhsPass.uniforms.time.value = elapsedTime;
      composer.render();
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      waterGeometry.dispose();
      waterMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0f172a", // Spójne tło zapasowe w kolorze ciemnego granatu
      }}
    >
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Napis główny - idealnie widoczny na granatowym tle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center",
          width: "100%",
          maxWidth: "800px",
          padding: "0 20px",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "4px",
            fontWeight: "600",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            margin: 0,
            lineHeight: "1.3",
            pointerEvents: "auto",
          }}
        >
          Pracownia Psychologiczna<br />Miraż
        </h1>
        <p style={{ marginTop: "15px", pointerEvents: "auto" }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.1rem",
              textDecoration: "none",
              letterSpacing: "2px",
            }}
          >
            @julia.sabura
          </a>
        </p>
      </div>

      {/* Ikony społecznościowe */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "auto",
        }}
      >
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            <Icon icon="mdi:instagram" width="28" height="28" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            <Icon icon="prime:twitter" width="28" height="28" />
          </a>
          <a
            href="https://miroleon.de/links"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            <Icon icon="ph:globe" width="28" height="28" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './TV.css';

export default function TV({ onComplete }) {
  const wrapperRef = useRef(null);
  const webglLayerRef = useRef(null);
  const cssLayerRef = useRef(null);
  const contactScreenRef = useRef(null);

  useEffect(() => {
    if (!webglLayerRef.current || !cssLayerRef.current || !contactScreenRef.current) return;

    let disposed = false;
    let animationFrameId;

    console.log("🟢 [TV.jsx] Start inicjalizacji sceny 3D...");

    // 1. Sceny
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    const cssScene = new THREE.Scene();

    const width = wrapperRef.current.clientWidth || window.innerWidth;
    const height = wrapperRef.current.clientHeight || window.innerHeight;

    // 2. Kamera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 3.5);

    // 3. Renderery
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    webglLayerRef.current.appendChild(renderer.domElement);

    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(width, height);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    cssRenderer.domElement.style.pointerEvents = 'none';
    cssLayerRef.current.appendChild(cssRenderer.domElement);

    // 4. Sterowanie OrbitControls (ZABLOKOWANE)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false; // <-- CAŁKOWICIE BLOKUJE RUCH I OBRÓT KAMERY
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // 5. Oświetlenie studyjne + dodatkowe klimatyczne światła
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.0);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 2.0); // Delikatna niebieska poświata z boku
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    // Dodatkowe światło punktowe skierowane centralnie na front telewizora
    const pointLight = new THREE.PointLight(0xffffff, 4.0, 10);
    pointLight.position.set(0, 1, 2);
    scene.add(pointLight);

    // --- ŁADOWANIE MODELU TV.glb ---
    const loader = new GLTFLoader();
    loader.load(
      '/TV.glb',
      (gltf) => {
        if (disposed) return;
        console.log("🎉 [TV.glb] Model pomyślnie wczytany:", gltf);
        const model = gltf.scene;

        // Wyśrodkowanie geometrii całego modelu
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.0 / (maxDim || 1);
        model.scale.set(scale, scale, scale);

        scene.add(model);
        model.updateMatrixWorld(true);

        // Szukanie mesha 'plane' (ekran telewizora)
        let targetMesh = null;
        model.traverse((child) => {
          if (child.isMesh) {
            const name = child.name.toLowerCase();
            if (name === 'plane' || name.includes('ekran') || name.includes('display') || name.includes('screen')) {
              targetMesh = child;
            }
          }
        });

        if (!targetMesh) {
          model.traverse((child) => {
            if (!targetMesh && child.isMesh) targetMesh = child;
          });
        }

        if (targetMesh && contactScreenRef.current) {
          console.log("🎯 [TV.glb] Znaleziono mesh ekranu:", targetMesh.name);

          const targetBox = new THREE.Box3().setFromObject(targetMesh);
          const targetSize = targetBox.getSize(new THREE.Vector3());
          const targetCenter = targetBox.getCenter(new THREE.Vector3());

          const physicalWidth = targetSize.x;
          const physicalHeight = targetSize.y;

          const htmlElement = contactScreenRef.current;
          const htmlWidth = htmlElement.offsetWidth || 800;
          const htmlHeight = htmlElement.offsetHeight || 600;

          const scaleX = physicalWidth / htmlWidth;
          const scaleY = physicalHeight / htmlHeight;

          const worldQuaternion = new THREE.Quaternion();
          targetMesh.getWorldQuaternion(worldQuaternion);

          // Tworzenie obiektu CSS3D
          const cssObject = new CSS3DObject(htmlElement);
          cssObject.scale.set(scaleX, scaleY, 1);
          cssObject.position.copy(targetCenter);
          cssObject.quaternion.copy(worldQuaternion);

          cssObject.rotateX(Math.PI / 2);
          cssObject.rotateY(Math.PI);
          cssObject.rotateZ(Math.PI);

          cssObject.translateZ(0.002);
          cssScene.add(cssObject);

          // WebGL Blocker
          const blockerMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            blending: THREE.NoBlending,
            side: THREE.DoubleSide,
            colorWrite: false,
          });

          const blockerGeometry = new THREE.PlaneGeometry(physicalWidth, physicalHeight);
          const blockerMesh = new THREE.Mesh(blockerGeometry, blockerMaterial);

          blockerMesh.position.copy(targetCenter);
          blockerMesh.quaternion.copy(worldQuaternion);

          blockerMesh.rotateX(Math.PI / 2);
          blockerMesh.rotateY(Math.PI);
          blockerMesh.rotateZ(Math.PI);

          scene.add(blockerMesh);

          console.log("✅ [TV.jsx] Pomyślnie zmapowano HTML na ekran.");
        } else {
          console.warn("⚠️ Nie znaleziono mesha ekranu w TV.glb.");
        }
      },
      undefined,
      (error) => {
        console.error('❌ Błąd ładowania TV.glb:', error);
      }
    );

    // Pętla renderowania
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    };
    animate();

    const handleResize = () => {
      if (!wrapperRef.current) return;
      const newWidth = wrapperRef.current.clientWidth;
      const newHeight = wrapperRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      cssRenderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      if (cssRenderer.domElement.parentNode) {
        cssRenderer.domElement.parentNode.removeChild(cssRenderer.domElement);
      }
    };
  }, []);

  return (
    <div className="tv-wrapper" ref={wrapperRef}>
      {/* Warstwa WebGL */}
      <div className="tv-webgl-layer" ref={webglLayerRef} />

      {/* Warstwa CSS3D */}
      <div className="tv-css-layer" ref={cssLayerRef} />

      {/* Formularz HTML */}
      <div ref={contactScreenRef} className="tv-contact-screen">
        <div className="container">


          <h2>Wybierz wersję strony</h2>

          <div className="tv-form-group">
            <p className="tv-description">
              Pełna wersja serwisu zawiera liczne animacje oraz efekty wizualne.
              Dla osób ze specyficznymi potrzebami, wrażliwych na ruch lub z niepełnosprawnościami
              zalecamy wybór <strong>wersji czystej (Clean)</strong> o spokojniejszym interfejsie.
            </p>
          </div>

          <div className="tv-buttons-container">
            <button
              type="button"
              className="tv-btn tv-btn-full"
              onClick={() => {
                console.log("🖱️ Kliknięto: Pełna wersja (TAK)");
                if (onComplete) onComplete(true);
              }}
            >
              <span>Wersja Pełna (Animowana)</span>
            </button>

            <button
              type="button"
              className="tv-btn tv-btn-clean"
              onClick={() => {
                console.log("🖱️ Kliknięto: Wersja Czysta (NIE)");
                if (onComplete) onComplete(false);
              }}
            >
              <span>Wersja Czysta (Zalecana / Clean)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
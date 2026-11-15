import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./Infokids.css";

/* ------------------------------------------------------------------ */
/*  GRAFIKI                                                            */
/* ------------------------------------------------------------------ */
import fishBg from "/fish_bg.png";
import fish1 from "/sealife_1.png";
import fish2 from "/sealife_6.png";
import fish3 from "/sealife_8.png";
import fish4 from "/sealife_13.png";

const FISH_SOURCES = [fish1, fish2, fish3, fish4];
const FISH_FACING = "right";
const FISH_COUNT = 9;

/* ------------------------------------------------------------------ */
/*  TREŚĆ (SLIDERY)                                                    */
/* ------------------------------------------------------------------ */
const GROUPS = [
  {
    title: "Emocje i zachowanie",
    items: [
      "Intensywne reakcje emocjonalne, wybuchy złości lub płaczu i trudności z samoregulacją.",
      "Nasilony lęk, wycofanie, smutek lub utrzymujące się rozdrażnienie.",
    ],
  },
  {
    title: "Rówieśnicy i nowe sytuacje",
    items: [
      "Trudności w nawiązywaniu i podtrzymywaniu relacji z rówieśnikami.",
      "Problemy z adaptacją do przedszkola, szkoły lub nowych sytuacji.",
    ],
  },
  {
    title: "Uwaga i wrażliwość",
    items: [
      "Trudności z koncentracją, impulsywnością lub organizacją codziennych aktywności.",
      "Silna wrażliwość na bodźce, zmiany rutyny albo nieprzewidywalne sytuacje.",
    ],
  },
  {
    title: "Zmiany i ważne wydarzenia",
    items: [
      "Nagłe zmiany zachowania, trudności ze snem lub niechęć do lubianych wcześniej aktywności.",
      "Trudności związane z sytuacją rodzinną, rozstaniem rodziców, stratą lub innym ważnym wydarzeniem.",
      "Zabawa lub pojawiające się w niej treści budzą Twój niepokój.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  SHADERY TŁA THREE.JS                                               */
/* ------------------------------------------------------------------ */
const BG_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BG_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform vec2 uCover;
  varying vec2 vUv;
  void main() {
    vec2 uv = (vUv - 0.5) * uCover + 0.5;
    uv.x += sin(uv.y * 9.0 + uTime * 0.7) * 0.004;
    uv.y += sin(uv.x * 7.0 + uTime * 0.5) * 0.004;
    vec4 c = texture2D(uMap, uv);
    float caustic = sin(uv.x * 18.0 + uTime * 0.9) * sin(uv.y * 14.0 - uTime * 0.7);
    c.rgb += max(caustic, 0.0) * 0.035;
    gl_FragColor = c;
    #include <colorspace_fragment>
  }
`;

const FISH_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uTailSign;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float tail = clamp(0.5 - p.x * uTailSign, 0.0, 1.0);
    p.y += sin(uTime * 6.0 + p.x * 9.0 * uTailSign + uPhase) * 0.14 * tail * tail;
    p.x += sin(uTime * 3.0 + uPhase) * 0.01;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FISH_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(uMap, vUv);
    gl_FragColor = vec4(c.rgb, c.a * uOpacity);
    #include <colorspace_fragment>
  }
`;

function useUnderwater(containerRef, canvasRef) {
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -10, 10);

    const loader = new THREE.TextureLoader();
    const loadTex = (src) => {
      const t = loader.load(src, () => { needsRender = true; });
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    };

    let needsRender = true;
    let width = 1;
    let height = 1;

    const bgTex = loadTex(fishBg);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: BG_FRAG,
      uniforms: {
        uMap: { value: bgTex },
        uTime: { value: 0 },
        uCover: { value: new THREE.Vector2(1, 1) },
      },
      depthWrite: false,
    });
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMat);
    bg.position.z = -5;
    scene.add(bg);

    const geo = new THREE.PlaneGeometry(1, 1, 24, 1);
    const fishes = [];

    FISH_SOURCES.forEach((src) => {
      const tex = loadTex(src);
      fishes.push({ tex, instances: [] });
    });

    for (let i = 0; i < FISH_COUNT; i++) {
      const kind = fishes[i % fishes.length];
      const depth = Math.random();
      const mat = new THREE.ShaderMaterial({
        vertexShader: FISH_VERT,
        fragmentShader: FISH_FRAG,
        uniforms: {
          uMap: { value: kind.tex },
          uTime: { value: 0 },
          uPhase: { value: Math.random() * 6.28 },
          uTailSign: { value: FISH_FACING === "right" ? 1 : -1 },
          uOpacity: { value: 0.55 + depth * 0.45 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = depth;

      const img = kind.tex;
      const fish = {
        mesh,
        mat,
        depth,
        img,
        dir: Math.random() > 0.5 ? 1 : -1,
        speed: 18 + Math.random() * 30 + depth * 25,
        yNorm: 0.08 + Math.random() * 0.84,
        bobAmp: 6 + Math.random() * 14,
        bobFreq: 0.4 + Math.random() * 0.8,
        phase: Math.random() * 6.28,
        x: Math.random(),
        sizeScale: 0.7 + depth * 0.7,
      };
      scene.add(mesh);
      kind.instances.push(fish);
    }
    const allFish = fishes.flatMap((k) => k.instances);

    const bubbleCanvas = document.createElement("canvas");
    bubbleCanvas.width = bubbleCanvas.height = 64;
    const bctx = bubbleCanvas.getContext("2d");
    const g = bctx.createRadialGradient(24, 22, 2, 32, 32, 30);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.25, "rgba(200,245,255,0.35)");
    g.addColorStop(0.85, "rgba(120,220,255,0.18)");
    g.addColorStop(1, "rgba(255,255,255,0.7)");
    bctx.fillStyle = g;
    bctx.beginPath();
    bctx.arc(32, 32, 30, 0, Math.PI * 2);
    bctx.fill();
    const bubbleTex = new THREE.CanvasTexture(bubbleCanvas);
    bubbleTex.colorSpace = THREE.SRGBColorSpace;

    const bubbles = [];
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.SpriteMaterial({
        map: bubbleTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.35 + Math.random() * 0.45,
      });
      const s = new THREE.Sprite(mat);
      s.position.z = 2;
      scene.add(s);
      bubbles.push({
        sprite: s,
        x: Math.random(),
        y: Math.random(),
        size: 6 + Math.random() * 18,
        speed: 14 + Math.random() * 30,
        wob: Math.random() * 6.28,
      });
    }

    const layout = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      renderer.setSize(width, height, false);
      camera.left = 0;
      camera.right = width;
      camera.top = height;
      camera.bottom = 0;
      camera.updateProjectionMatrix();

      bg.scale.set(width, height, 1);
      bg.position.x = width / 2;
      bg.position.y = height / 2;
      const img = bgTex.image;
      if (img && img.width) {
        const imgAspect = img.width / img.height;
        const boxAspect = width / height;
        if (boxAspect > imgAspect) {
          bgMat.uniforms.uCover.value.set(1, imgAspect / boxAspect);
        } else {
          bgMat.uniforms.uCover.value.set(boxAspect / imgAspect, 1);
        }
      }

      allFish.forEach((f) => {
        const im = f.img.image;
        const aspect = im && im.width ? im.width / im.height : 1.6;
        const h = Math.min(Math.max(height * 0.07, 36), 90) * f.sizeScale;
        f.w = h * aspect;
        f.h = h;
        f.mesh.scale.set(f.w, f.h, 1);
      });
      needsRender = true;
    };

    const ro = new ResizeObserver(layout);
    ro.observe(container);
    layout();
    const relayoutTimer = setInterval(layout, 600);
    setTimeout(() => clearInterval(relayoutTimer), 3000);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(container);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        clock.getDelta();
        return;
      }
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      if (!reduceMotion) {
        bgMat.uniforms.uTime.value = t;

        allFish.forEach((f) => {
          f.x += (f.dir * f.speed * dt) / width;
          const margin = f.w / width;
          if (f.dir > 0 && f.x > 1 + margin) f.x = -margin;
          if (f.dir < 0 && f.x < -margin) f.x = 1 + margin;

          const baseFacingRight = FISH_FACING === "right";
          const directionMultiplier = f.dir > 0 ? 1 : -1;
          const flip = baseFacingRight ? directionMultiplier : -directionMultiplier;

          f.mesh.scale.x = f.w * flip;
          f.mesh.position.x = f.x * width;
          f.mesh.position.y =
            f.yNorm * height +
            Math.sin(t * f.bobFreq + f.phase) * f.bobAmp;
          f.mesh.rotation.z =
            Math.cos(t * f.bobFreq + f.phase) * 0.06 * flip * f.dir;
          f.mat.uniforms.uTime.value = t;
        });

        bubbles.forEach((b) => {
          b.y += (b.speed * dt) / height;
          if (b.y > 1.05) {
            b.y = -0.05;
            b.x = Math.random();
          }
          b.sprite.position.x = b.x * width + Math.sin(t * 1.2 + b.wob) * 10;
          b.sprite.position.y = b.y * height;
          b.sprite.scale.set(b.size, b.size, 1);
        });
        needsRender = true;
      }

      if (needsRender) {
        renderer.render(scene, camera);
        needsRender = reduceMotion ? false : true;
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(relayoutTimer);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      bgTex.dispose();
      bgMat.dispose();
      bg.geometry.dispose();
      bubbleTex.dispose();
      fishes.forEach((k) => k.tex.dispose());
      allFish.forEach((f) => f.mat.dispose());
      bubbles.forEach((b) => b.sprite.material.dispose());
      renderer.dispose();
    };
  }, [containerRef, canvasRef]);
}

/* ------------------------------------------------------------------ */
/*  KOMPONENT GŁÓWNY Z SLIDEREM W STYLU WODNYM                         */
/* ------------------------------------------------------------------ */
export default function Infokids() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  useUnderwater(containerRef, canvasRef);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? GROUPS.length - 1 : prev - 1));
    setTimeout(() => setAnimating(false), 500);
  };

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev === GROUPS.length - 1 ? 0 : prev + 1));
    setTimeout(() => setAnimating(false), 500);
  };

  const currentGroup = GROUPS[currentIndex];

  return (
    <section className="infokids" ref={containerRef} aria-labelledby="infokids-title">
      <canvas className="infokids__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="infokids__shine" aria-hidden="true" />

      <div className="infokids__content">
        
        {/* Nagłówek retro */}
        <div className="retro-window">
          <div className="retro-titlebar">
            <span className="retro-title">Yahoo! Messenger - Wsparcie Dziecka</span>
            <div className="retro-controls">
              <span className="retro-btn">_</span>
              <span className="retro-btn">□</span>
              <span className="retro-btn">×</span>
            </div>
          </div>
          <div className="retro-body">
            <span className="infokids__pill">3 / Wsparcie dziecka</span>
            <h2 id="infokids-title" className="infokids__title">
              Każde zachowanie coś komunikuje.
            </h2>
            <p className="infokids__lead">
              Dzieci nie zawsze potrafią nazwać to, czego doświadczają, ani
              powiedzieć o swoich trudnościach, emocjach i potrzebach. Czasem
              widać je w zmianach zachowania, codziennego funkcjonowania i relacji
              z otoczeniem.
            </p>
          </div>
        </div>

        <h3 className="infokids__subtitle">
          Warto rozważyć konsultację, gdy zauważasz:
        </h3>

        {/* SLIDER W STYLU WODNYM */}
        <div className="water-slider-wrapper">
          <button className="retro-slider-btn prev" onClick={handlePrev} title="Poprzedni">
            ◄
          </button>

          <div className={`retro-window water-slide-card ${animating ? "water-ripple" : ""}`}>
            <div className="retro-titlebar">
              <span className="retro-title">
                {currentGroup.title} ({currentIndex + 1} / {GROUPS.length})
              </span>
              <div className="retro-controls">
                <span className="retro-btn">_</span>
                <span className="retro-btn">×</span>
              </div>
            </div>
            <div className="retro-body">
              <ul className="infokids__list">
                {currentGroup.items.map((item) => (
                  <li key={item}>
                    <span className="infokids__bubble" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button className="retro-slider-btn next" onClick={handleNext} title="Następny">
            ►
          </button>
        </div>

        {/* Kropki nawigacyjne (wskaźniki slajdów) */}
        <div className="slider-dots">
          {GROUPS.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => {
                if (animating || idx === currentIndex) return;
                setAnimating(true);
                setCurrentIndex(idx);
                setTimeout(() => setAnimating(false), 500);
              }}
            />
          ))}
        </div>

        <aside className="infokids__callout">
          Konsultacja może wesprzeć także rodzica lub opiekuna, który chce
          lepiej zrozumieć zachowanie dziecka, jego potrzeby rozwojowe i
          emocjonalne oraz poszukać sposobów wspierania go na co dzień.
        </aside>

        <p className="infokids__note">
          Nie każde zachowanie odbiegające od oczekiwań otoczenia świadczy o
          zaburzeniu. Może wyrażać indywidualne potrzeby, brak odpowiedniego
          wsparcia albo odmienny sposób doświadczania świata.
        </p>
      </div>
    </section>
  );
}
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./About.css";

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- GŁÓWNA SCENA 3D (Górny Hero) ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x2f9e95, 50, 70);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    let modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      `${import.meta.env.BASE_URL}city.glb`,
      (gltf) => {
        const object = gltf.scene;
        object.scale.setScalar(0.002);
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.x = -center.x;
        object.position.y = -center.y;
        object.position.z = -center.z;
        modelGroup.add(object);
      },
      undefined,
      (error) => {
        console.error("Błąd podczas ładowania city.glb:", error);
      }
    );

    // --- INTERSECTION OBSERVER ---
    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".zen-reveal");
    animatedElements.forEach((el) => observer.observe(el));

    // --- RESIZE OKNA ---
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onWindowResize);

    // --- PĘTLA ANIMACJI ---
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (modelGroup) {
        modelGroup.rotation.z = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      observer.disconnect();
    };
  }, []);

  return (
    <section id="pracownia" className="aboutSection">
      {/* Sekcja Hero z miastem / wideo rozciągnięta na 100% szerokości */}
      <div className="aboutHeroWrapper">
        <canvas ref={canvasRef} id="bg-canvas" className="aboutCanvas" />
        <div className="aboutOverlayContent">
          <h2 className="aboutTitle">Rzeczywistość ma wiele odcieni</h2>
          <p className="aboutSubtitle">Pracownia Psychologiczna Miraż</p>
        </div>
      </div>

      {/* Dolna sekcja z pełną szerokością */}
      <div className="zenColoredSection">
        <div className="fullWidthWrapper">
          
          {/* Układ dwukolumnowy typograficzny */}
          <div className="row g-4 g-lg-5 mx-0">
            <div className="col-lg-6 zen-reveal">
              <article className="zenArticle border-teal">
                <span className="zenNumber">01</span>
                <h4 className="zenArticleTitle">Percepcja & Filtrowanie</h4>
                <p className="zenParagraph">
                  Nie poznajemy świata całkowicie obiektywnie. To, czego doświadczamy, jest wypadkową czułości układu nerwowego, sposobu filtrowania informacji i uznawania ich za istotne, a także wcześniejszych doświadczeń, traum, oczekiwań, przekonań i emocji.
                </p>
              </article>

              <article className="zenArticle border-coral mt-5">
                <span className="zenNumber">02</span>
                <h4 className="zenArticleTitle">Schematy & Przetrwanie</h4>
                <p className="zenParagraph">
                  Dialog wewnętrzny i przekonania o sobie, swoim potencjale oraz intencjach innych mogą być ukształtowane przez lęk, dzieciństwo, nieleczone trudności, toksyczne środowisko lub relacje. Niektóre schematy pomagały nam kiedyś przetrwać, ale dziś mogą już nie służyć.
                </p>
              </article>
            </div>

            <div className="col-lg-6 zen-reveal delay-1">
              <article className="zenArticle border-coral">
                <span className="zenNumber">03</span>
                <h4 className="zenArticleTitle">Soczewka Przeszłości</h4>
                <p className="zenParagraph">
                  Umysł aktywnie interpretuje docierające do niego informacje, nadając im znaczenie na podstawie tego, co już przeżyliśmy. Przeszłe doświadczenia, lęki i przekonania tworzą soczewkę, przez którą patrzymy na świat. Dlatego dwie osoby mogą przeżywać tę samą sytuację zupełnie inaczej — a my sami możemy w przyszłości doświadczyć podobnych sytuacji w nowy sposób.
                </p>
              </article>

              <article className="zenArticle border-teal mt-5">
                <span className="zenNumber">04</span>
                <h4 className="zenArticleTitle">Przestrzeń do Zmiany</h4>
                <p className="zenParagraph">
                  Nie istnieje jeden uniwersalny wzorzec przeżywania świata. Niektóre interpretacje mogą jednak być nieadekwatne lub powodować cierpienie — ich rozpoznanie otwiera przestrzeń do zmiany.
                </p>
              </article>
            </div>
          </div>

          {/* Akapit Podsumowujący w Ramce */}
          <div className="row mt-5 pt-4 justify-content-center zen-reveal mx-0">
            <div className="col-12 col-xl-10">
              <blockquote className="zenQuoteBox">
                <p className="zenQuoteText">
                  „Zrozumienie, skąd pochodzą nasze przekonania i czy rzeczywiście są nasze, może stać się początkiem zmiany — nie świata, lecz naszej relacji z nim, z innymi i przede wszystkim z samym sobą.”
                </p>
                <span className="zenQuoteFooter">Pracownia Psychologiczna Miraż</span>
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
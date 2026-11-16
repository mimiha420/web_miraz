import React, { useState, useRef } from 'react';
import './Help.css';

const POINTS = [
  "Potrzebujesz lepiej zrozumieć siebie, swoje emocje lub codzienne trudności.",
  "Doświadczasz przewlekłego stresu, napięcia, lęku lub obniżonego nastroju.",
  "Trudno Ci wyrażać lub regulować emocje.",
  "Czujesz się przytłoczony obowiązkami, oczekiwaniami lub relacjami.",
  "Zauważasz powtarzające się schematy myślenia i zachowania, które utrudniają Ci funkcjonowanie.",
  "Doświadczasz trudności w relacjach, komunikacji lub stawianiu granic.",
  "Niedawno straciłeś kogoś bliskiego albo przechodzisz przez rozstanie lub inny kryzys.",
  "Zmagasz się z niską samooceną, perfekcjonizmem, samokrytycyzmem lub poczuciem niewystarczalności.",
  "Masz trudną relację z jedzeniem.",
  "Lęk ogranicza to, jak chciałbyś uczestniczyć w życiu.",
  "Czujesz się niezrozumiany, trudno Ci zaufać innym albo odnaleźć własną drogę.",
  "Czujesz się zagubiony, przytłoczony lub „do tyłu” z życiem.",
  "Doświadczasz obniżonego nastroju, drażliwości, braku motywacji lub aktywności.",
  "Masz poczucie, że coś jest nie tak z Tobą lub Twoim życiem.",
  "Przez długi czas maskowałeś się, dostosowywałeś do oczekiwań i ukrywałeś część siebie.",
  "Podejrzewasz u siebie neuroatypowość lub masz diagnozę i szukasz codzienności lepiej dopasowanej do swoich potrzeb.",
  "Chcesz rozwijać samoświadomość, lepiej rozumieć swoje potrzeby i budować dobrą relację ze sobą."
];

const ITEMS_PER_SLIDE = 4;

export default function Help() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);

  const slides = [];
  for (let i = 0; i < POINTS.length; i += ITEMS_PER_SLIDE) {
    slides.push(POINTS.slice(i, i + ITEMS_PER_SLIDE));
  }

  const totalSlides = slides.length;

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section className="retro-help-wrapper">
      <div className="retro-window">
        {/* Title Bar */}
        <div className="retro-window-header">
          <div className="retro-title-text">
            <span className="retro-icon">💡</span> 02 / Konsultacje — Help Center
          </div>
          <div className="retro-window-controls">
            <button type="button" className="win-btn win-min" title="Minimalizuj">_</button>
            <button type="button" className="win-btn win-max" title="Maksymalizuj">□</button>
            <button type="button" className="win-btn win-close" title="Zamknij">✕</button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="retro-menu-bar">
          <span>Plik</span>
          <span>Edycja</span>
          <span>Widok</span>
          <span>Pomoc</span>
        </div>

        {/* Content Area */}
        <div className="retro-window-body">
          <div className="retro-hero-banner">
            <h2>Kiedy warto porozmawiać?</h2>
            <p className="retro-lead-text">
              Nie musisz czekać, aż trudności staną się bardzo nasilone. Konsultacja może pomóc przyjrzeć się temu, co przeżywasz, rozpoznać zasoby i potrzeby oraz poszukać sposobów na codzienne wyzwania.
            </p>
          </div>

          {/* WERSJA PRZEGLĄDARKOWA — oryginalna lista / fieldset */}
          <fieldset className="retro-fieldset retro-desktop-only">
            <legend className="retro-legend">Dla dorosłych</legend>
            <ul className="retro-list">
              {POINTS.map((item, index) => (
                <li key={index} className="retro-list-item">
                  <span className="retro-bullet">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* WERSJA MOBILNA — slajdy */}
          <fieldset
            className="retro-fieldset retro-mobile-only"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <legend className="retro-legend">
              Dla dorosłych ({currentSlide + 1}/{totalSlides})
            </legend>

            <div className="retro-slider-viewport">
              <div
                className="retro-slider-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((group, slideIdx) => (
                  <ul
                    key={slideIdx}
                    className="retro-list retro-slide"
                    aria-hidden={slideIdx !== currentSlide}
                  >
                    {group.map((item, itemIdx) => (
                      <li key={itemIdx} className="retro-list-item">
                        <span className="retro-bullet">▶</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <div className="retro-slider-controls">
              <button
                type="button"
                className="xp-nav-btn"
                onClick={prevSlide}
                aria-label="Poprzedni slajd"
              >
                &lt; Wstecz
              </button>

              <div className="retro-slider-dots" role="tablist" aria-label="Wybór slajdu">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`retro-dot ${idx === currentSlide ? 'is-active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slajd ${idx + 1}`}
                    aria-selected={idx === currentSlide}
                  />
                ))}
              </div>

              <button
                type="button"
                className="xp-nav-btn"
                onClick={nextSlide}
                aria-label="Następny slajd"
              >
                Dalej &gt;
              </button>
            </div>
          </fieldset>

          <div className="retro-footer-quote">
            <div className="quote-icon">💬</div>
            <p>
              Chciałabym pomóc Ci poczuć więcej sprawczości, korzystać z własnych zasobów i organizować codzienność tak, by uwzględniała Twoje potrzeby oraz ograniczenia.
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="retro-status-bar">
          <span>Gotowy</span>
          <span className="status-sec status-desktop">2-Column Layout Active | Y2K Vibe</span>
          <span className="status-sec status-mobile">
            Slajd {currentSlide + 1}/{totalSlides} • Przesuń palcem
          </span>
        </div>
      </div>
    </section>
  );
}
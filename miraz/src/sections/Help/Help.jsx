import React from 'react';
import './Help.css';

export default function Help() {
  const points = [
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

  return (
    <section className="retro-help-wrapper">
      <div className="retro-window">
        {/* Title Bar */}
        <div className="retro-window-header">
          <div className="retro-title-text">
            <span className="retro-icon">💡</span> 02 / Konsultacje — Help Center
          </div>
          <div className="retro-window-controls">
            <button className="win-btn win-min" title="Minimalizuj">_</button>
            <button className="win-btn win-max" title="Maksymalizuj">□</button>
            <button className="win-btn win-close" title="Zamknij">✕</button>
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

          <div className="retro-section-container">
            <h3 className="retro-section-title">Dla dorosłych</h3>
            <div className="retro-grid">
              {points.map((item, index) => (
                <div key={index} className="retro-grid-item">
                  <span className="retro-bullet">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

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
          <span className="status-sec">2-Column Layout Active | Y2K Vibe</span>
        </div>
      </div>
    </section>
  );
}
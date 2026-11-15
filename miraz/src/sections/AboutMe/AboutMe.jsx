import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me" id="o-mnie">
      <div className="about-me__container">
        
        {/* Lewa strona / Nagłówek wizualny */}
        <div className="about-me__profile-card">
          <div className="about-me__avatar-wrapper">
            <div className="about-me__avatar-placeholder">
              <span>JS</span>
            </div>
            <div className="about-me__badge">05 / O mnie</div>
          </div>

          <h2 className="about-me__name">Julia Sabura</h2>
          <p className="about-me__role">Psycholożka</p>

          <blockquote className="about-me__quote">
            „Towarzyszy mi ciekawość Twoich doświadczeń, potrzeb i sposobu przeżywania rzeczywistości.”
          </blockquote>
        </div>

        {/* Prawa strona / Treść szczegółowa */}
        <div className="about-me__content">
          <div className="about-me__block">
            <h3 className="about-me__section-title">O moim podejściu</h3>
            <p className="about-me__text">
              W pracy ważne jest dla mnie spotkanie z drugim człowiekiem i próba spojrzenia na świat z jego perspektywy. 
              Towarzyszą mi otwartość i ciekawość tego, jak dana osoba przeżywa rzeczywistość oraz jakie strategie wypracowała, 
              by radzić sobie z trudnościami.
            </p>
            <p className="about-me__text">
              Bliskie jest mi łączenie wiedzy psychologicznej z kreatywnością i poszukiwanie różnych sposobów lepszego rozumienia siebie. 
              Organizowałam warsztaty mindfulness podczas Pejzaż Festiwalu i tworzę krótkie psychoedukacyjne treści internetowe.
            </p>
          </div>

          <div className="about-me__block about-me__block--highlight">
            <h3 className="about-me__section-title">Praca z osobami neuroatypowymi</h3>
            <p className="about-me__text">
              Szczególnie chciałabym pracować z osobami neuroatypowymi, które odkrywają ten aspekt swojego życia, chcą lepiej 
              zrozumieć własne funkcjonowanie, rozpoznawać potrzeby i szukać rozwiązań dopasowanych do siebie. 
            </p>
            <p className="about-me__text">
              Diagnozę postrzegam nie jako ostateczne wyjaśnienie, lecz jako początek drogi do uporządkowania 
              doświadczeń i budowania codzienności bardziej zgodnej z własnymi potrzebami.
            </p>
          </div>

          <div className="about-me__block">
            <h3 className="about-me__section-title">Wykształcenie i Doświadczenie</h3>
            <p className="about-me__text">
              Jestem absolwentką praktycznych studiów magisterskich ze specjalizacją kliniczną z psychoterapią na Uniwersytecie 
              Papieskim Jana Pawła II w Krakowie.
            </p>
            <ul className="about-me__list">
              <li>Poradnie psychologiczno-pedagogiczne (organizacja zajęć TUS)</li>
              <li>Poradnia psychologiczna dla osób uzależnionych i współuzależnionych (prowadzenie grup terapeutycznych)</li>
              <li>Szpital Specjalistyczny im. Jana Pawła II w Krakowie</li>
              <li>Szpital Kliniczny im. dr. Józefa Babińskiego w Krakowie</li>
            </ul>
            <p className="about-me__footer-note">
              W przyszłości planuję kontynuować kształcenie w ramach szkolenia psychoterapeutycznego w nurcie Gestalt.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMe;
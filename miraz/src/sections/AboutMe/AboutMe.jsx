import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me" id="o-mnie">
      <div className="about-me__container">
        
        {/* Lewa strona / Nagłówek wizualny */}
        <div className="about-me__profile-card">
          <div className="about-me__avatar-wrapper">
            <img 
              src="/julia1.jpg" 
              alt="Julia Sabura - Psycholog" 
              className="about-me__avatar-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="about-me__avatar-placeholder" style={{ display: 'none' }}>
              <span>JS</span>
            </div>
            <div className="about-me__badge">05 / O nas</div>
          </div>

          <h2 className="about-me__name">Julia Sabura</h2>
          <p className="about-me__role">PSYCHOLOG</p>

          <blockquote className="about-me__quote">
            „Zależy mi na stworzeniu bezpiecznej przestrzeni, w której można przyjrzeć się swojemu funkcjonowaniu, schematom i doświadczeniom bez oceniania, z ciekawością i wyrozumiałością, we własnym tempie.”
          </blockquote>
        </div>

        {/* Prawa strona / Treść szczegółowa */}
        <div className="about-me__content">
          <div className="about-me__block">
            <h3 className="about-me__section-title">O moim podejściu</h3>
            <p className="about-me__text">
              W swojej pracy stawiam nacisk na samo spotkanie z drugim człowiekiem i próbuję spojrzeć na świat z jego perspektywy. 
              Towarzyszą mi w tym otwartość i ciekawość jego doświadczeń, potrzeb, sposobu przeżywania rzeczywistości oraz strategii, 
              które wypracował, by radzić sobie z trudnościami.
            </p>
            <p className="about-me__text">
              Chciałabym towarzyszyć osobom doświadczającym różnego rodzaju trudności i kryzysów — zarówno w lepszym rozumieniu siebie 
              i swoich emocji, odkrywaniu własnych potrzeb, stawianiu granic czy odnajdywaniu się w relacjach, jak i w budowaniu 
              poczucia własnej wartości, rozwijaniu bardziej wspierającej relacji z samym sobą oraz poszukiwaniu własnego miejsca w otaczającej rzeczywistości.
            </p>
            <p className="about-me__text">
              Bliskie jest mi łączenie wiedzy psychologicznej z kreatywnością oraz poszukiwanie różnych sposobów na lepsze rozumienie siebie 
              i własnych doświadczeń. Organizowałam warsztaty mindfulness podczas Pejzaż Festiwalu, a także tworzę internetowe treści 
              psychoedukacyjne w formie krótkich filmów.
            </p>
          </div> 

          <div className="about-me__block about-me__block--highlight">
            <h3 className="about-me__section-title">Praca z osobami neuroatypowymi</h3>
            <p className="about-me__text">
              Szczególnie bliskim mi obszarem jest praca z osobami neuroatypowymi, dopiero odkrywającymi ten aspekt siebie, 
              które chcą lepiej zrozumieć swój sposób funkcjonowania, rozpoznawać własne potrzeby i szukać rozwiązań dopasowanych 
              do siebie, zamiast próbować za wszelką cenę wpisywać się w powszechnie przyjęte schematy.
            </p>
            <p className="about-me__text">
              Diagnozę postrzegam nie jako ostateczne wyjaśnienie wszystkich trudności, ale jako początek drogi do uporządkowania 
              swoich doświadczeń, zrozumienia trudności i budowania codzienności bardziej zgodnej ze swoimi potrzebami.
            </p>
          </div>

          <div className="about-me__block">
            <h3 className="about-me__section-title">Wykształcenie i Doświadczenie</h3>
            <p className="about-me__text">
              Jestem absolwentką studiów magisterskich o profilu praktycznym i specjalizacji klinicznej z psychoterapią na Uniwersytecie 
              Papieskim Jana Pawła II w Krakowie. Doświadczenie zdobywałam w następujących miejscach:
            </p>
            <ul className="about-me__list">
              <li>Poradnie psychologiczno-pedagogiczne (organizacja zajęć TUS)</li>
              <li>Poradnia psychologiczna dla osób uzależnionych i współuzależnionych (współprowadzenie grup terapeutycznych)</li>
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
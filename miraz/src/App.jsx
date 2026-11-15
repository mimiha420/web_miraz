import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './sections/Header/Header';
import LandingPage from './sections/LandingPage/LandingPage';
import About from './sections/About/About';
import InfoOne from './sections/Info_one/info_one';
import Infokids from './sections/Infokids/Infokids';
import Help from './sections/Help/Help';
import Contacter from './sections/Contacter/Contacter';
import AboutMe from './sections/AboutMe/AboutMe';
import Footer from './sections/Footer/Footer';

function App() {
  // Automatyczny Intersection Observer dla płynnego pojawiania się sekcji przy scrollu
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Uruchamia się, gdy 10% sekcji pojawi się na ekranie
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = document.querySelectorAll('.reveal-section');

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <BrowserRouter>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflowX: 'clip',
          backgroundColor: '#d97736',
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        <Header />

        {/* Sekcja Startowa (Landing Page) */}
        <section id="start" className="reveal-section">
          <LandingPage />
        </section>
        <section id="info-one" className="reveal-section">
          <InfoOne />
        </section>
        <section id="help" className="reveal-section">
          <Help />
        </section>
        <section id="info-kids" className="reveal-section">
          <Infokids />
        </section>
        <section id="contacter" className="reveal-section">
          <Contacter />
        </section>
        <section id="o-mnie" className="reveal-section">
          <AboutMe />
        </section>
        <section id="kontakt" className="reveal-section">
          <Footer />
        </section>

        {/* <section id="about" className="reveal-section">
          <About />
        </section> */}

        {/* Sekcja O nas (About w stylu Zen Garden)
        <section id="o-nas" className="reveal-section">
          <About />
        </section> */}
        {/* Sekcja O nas (About w stylu Zen Garden) */}
        {/* <section id="o-nas" className="reveal-section">
          <About />
        </section> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
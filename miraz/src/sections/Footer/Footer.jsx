import React from 'react';
import './Footer.css';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="site-footer" id="kontakt">
      <div className="footer-container">
        
        {/* Nagłówek i sekcja wprowadzenia */}
        <div className="footer-header">
          <span className="section-number">06 / Pierwszy krok</span>
          <h2 className="footer-title">Możemy zacząć od rozmowy.</h2>
        </div>

        <div className="footer-content">
          <div className="footer-description">
            <p>
              Konsultacja to okazja, by przyjrzeć się temu, co przeżywasz,
              rozpoznać potrzeby i poszukać rozwiązań. Nie musisz mieć gotowego
              planu ani wszystkiego wiedzieć przed spotkaniem.
            </p>
            <p className="footer-subtext">
              Pracuję w przyjaznej, bezpiecznej atmosferze – zarówno stacjonarnie
              (z dojazdem), jak i w formie online.
            </p>
          </div>

          {/* Rozbudowane dane kontaktowe */}
          <div className="footer-contact-grid">
            
            <div className="contact-card">
              <span className="contact-icon">✉</span>
              <div className="contact-details">
                <span className="contact-label">Napisz e-mail</span>
                <a 
                  href="mailto:badzmywkontakcie.miraz@gmail.com" 
                  className="contact-link"
                >
                  badzmywkontakcie.miraz@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📞</span>
              <div className="contact-details">
                <span className="contact-label">Zadzwoń lub napisz</span>
                <a 
                  href="tel:+48795249911" 
                  className="contact-link"
                >
                  +48 795 249 911
                </a>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <div className="contact-details">
                <span className="contact-label">Formy spotkań</span>
                <p className="contact-text-static">
                  Spotkania online oraz „Psycholog na kółkach” (z dojazdem)
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Dolna linia: Brand + Powrót na górę */}
        <div className="footer-bottom">
          <div className="footer-brand-info">
            <span className="brand-name">Pracownia Psychologiczna Miraż</span>
            <span className="brand-author">Julia Sabura • Psycholożka</span>
          </div>
          
          <button 
            type="button" 
            className="scroll-top-btn" 
            onClick={scrollToTop}
            aria-label="Wróć na górę strony"
          >
            Wróć na górę ↑
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
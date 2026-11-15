import React from 'react';
import './Contacter.css';

export default function Contacter() {
  const options = [
    {
      id: '01',
      title: 'Psycholog na kółkach',
      desc: 'Konsultacja psychologiczna z dojazdem do domu.',
      tag: 'Mobilna usługa'
    },
    {
      id: '02',
      title: 'Spotkanie online',
      desc: 'Rozmowa z bezpiecznej dla Ciebie przestrzeni.',
      tag: 'Wideo-rozmowa HD'
    }
  ];

  return (
    <section className="aero-contacter-wrapper">
      <div className="aero-contacter-container">
        {/* Lewy panel informacji */}
        <div className="aero-info-card">
          <div className="aero-badge">
            <span className="pulse-dot"></span> 04 / MOŻLIWOŚCI
          </div>

          <h2 className="aero-title">
            Wsparcie <br />
            <span className="gradient-text">dopasowane</span> <br />
            do Ciebie.
          </h2>

          <p className="aero-description">
            Wybierz formę spotkania, która jest teraz dla Ciebie najbardziej dostępna.
          </p>
        </div>

        {/* Prawy panel opcji */}
        <div className="aero-options-column">
          <div className="aero-options-list">
            {options.map((item) => (
              <div key={item.id} className="aero-option-card">
                <div className="aero-glass-shine"></div>
                
                <div className="card-header-row">
                  <span className="card-number">{item.id}</span>
                </div>
                
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                </div>

                <div className="card-footer">
                  <span className="card-tag">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sekcja "W przygotowaniu" */}
          <div className="aero-coming-soon-panel">
            <div className="coming-soon-header">
              <span className="coming-soon-label">W PRZYGOTOWANIU</span>
            </div>
            <p className="coming-soon-text">
              Trening Umiejętności Społecznych dla dzieci <span>•</span> Mindfulness <span>•</span> Spotkania stacjonarne
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
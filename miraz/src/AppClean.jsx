import React from 'react';
import './AppClean.css';

export default function AppClean() {
  return (
    <div className="min-h-screen">
      
      {/* --- HEADER / NAVIGATION --- */}
      <header className="miraz-header">
        <div className="miraz-header-container">
          <a href="#" className="miraz-logo">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 24L12 10L18 20L22 14L28 24H4Z" strokeLinejoin="round" />
            </svg>
            <div className="miraz-logo-text">
              <span className="miraz-logo-title">MIRAŻ</span>
              <span className="miraz-logo-subtitle">Julia Sabura</span>
            </div>
          </a>

          <nav className="miraz-nav">
            <a href="#o-mirazu">O Mirażu</a>
            <a href="#dla-doroslych">Dla dorosłych</a>
            <a href="#dla-dzieci">Dla dzieci</a>
            <a href="#o-mnie">O mnie</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="miraz-hero">
        <div className="miraz-hero-glow" />
        
        <div className="miraz-hero-content">
          <div className="miraz-hero-inner">
            <p className="miraz-hero-pre">Pracownia Psychologiczna</p>
            <h1>Miraż<span>.</span></h1>
            <p>
              Rzeczywistość ma wiele odcieni. Nasz umysł nie jest jej biernym odbiorcą — pomagam odnaleźć sprawczość, zrozumieć mechanizmy i poukładać codzienność.
            </p>
            
            <div className="miraz-hero-actions">
              <a href="#kontakt" className="miraz-btn-primary">
                Umów rozmowę
              </a>
              <a href="#o-mirazu" className="miraz-link-subtle">
                Poznaj podejście →
              </a>
            </div>
          </div>

          <div className="miraz-hero-badge-wrap">
            <span className="miraz-hero-badge">
              @julia.sabura • Spotkania online i z dojazdem
            </span>
          </div>
        </div>
      </section>

      {/* --- SECTION 01: O MIRAŻU --- */}
      <section id="o-mirazu" className="miraz-section">
        <div className="miraz-container">
          <div className="miraz-section-header">
            <h2 className="miraz-section-title">Jak działa nasz umysł.</h2>
            <p className="miraz-section-desc">
              Nie poznajemy świata całkowicie obiektywnie. To, czego doświadczamy, jest wypadkową czułości układu nerwowego, wcześniejszych doświadczeń oraz emocji.
            </p>
          </div>

          <div className="miraz-grid-4">
            <div className="miraz-card-feature teal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
              </svg>
              <h3>Percepcja & Filtrowanie</h3>
              <p>Sposób filtrowania informacji i uznawania ich za istotne zależy od czułości układu nerwowego, przekonań oraz emocji.</p>
            </div>

            <div className="miraz-card-feature coral">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <h3>Schematy & Przetrwanie</h3>
              <p>Dialog wewnętrzny kształtują dzieciństwo i relacje. Niektóre schematy pomagały kiedyś przetrwać, ale dziś mogą już nie służyć.</p>
            </div>

            <div className="miraz-card-feature teal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h3>Soczewka Przeszłości</h3>
              <p>Przeszłe lęki tworzą soczewkę, przez którą patrzymy na świat — dlatego dwie osoby mogą przeżywać tę samą sytuację zupełnie inaczej.</p>
            </div>

            <div className="miraz-card-feature coral">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
              </svg>
              <h3>Przestrzeń do Zmiany</h3>
              <p>Nie istnieje jeden uniwersalny wzorzec przeżywania świata. Rozpoznanie nieadekwatnych interpretacji otwiera przestrzeń do zmiany.</p>
            </div>
          </div>

          <div>
            <a href="#dla-doroslych" className="miraz-link-subtle" style={{ color: 'var(--color-teal)', borderColor: 'var(--color-mint-light)' }}>
              Zobacz, w czym mogę pomóc →
            </a>
          </div>
        </div>
      </section>

      {/* --- SECTION 02: DLA DOROSŁYCH --- */}
      <section id="dla-doroslych" className="miraz-section miraz-bg-pink">
        <div className="miraz-container">
          <div className="miraz-section-header">
            <span className="miraz-section-tag">Konsultacje dla dorosłych</span>
            <h2 className="miraz-section-title">Kiedy warto porozmawiać?</h2>
            <p className="miraz-section-desc">
              Nie musisz czekać, aż trudności staną się bardzo nasilone. Konsultacja pomaga przyjrzeć się temu, co przeżywasz i rozpoznać własne zasoby.
            </p>
          </div>

          <div className="miraz-grid-2">
            {[
              "Potrzebujesz lepiej zrozumieć siebie, swoje emocje lub codzienne trudności.",
              "Doświadczasz przewlekłego stresu, napięcia, lęku lub obniżonego nastroju.",
              "Trudno Ci wyrażać lub regulować emocje.",
              "Czujesz się przytłoczony obowiązkami, oczekiwaniami lub relacjami.",
              "Zauważasz powtarzające się schematy myślenia i zachowania, które utrudniają funkcjonowanie.",
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
              "Podejrzewasz u siebie neuroatypowość lub masz diagnozę i szukasz codzienności dopasowanej do potrzeb."
            ].map((item, index) => (
              <div key={index} className="miraz-list-item">
                <span className="miraz-list-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="miraz-quote-box">
            <p>
              „Chciałabym pomóc Ci poczuć więcej sprawczości, korzystać z własnych zasobów i organizować codzienność tak, by uwzględniała Twoje potrzeby oraz ograniczenia.”
            </p>
            <a href="#kontakt" className="miraz-btn-dark">
              Zarezerwuj termin
            </a>
          </div>
        </div>
      </section>

      {/* --- SECTION 03: DLA DZIECI & MOŻLIWOŚCI --- */}
      <section id="dla-dzieci" className="miraz-section">
        <div className="miraz-container">
          <div className="miraz-split-layout">
            
            <div>
              <span className="miraz-section-tag" style={{ color: 'var(--color-coral)' }}>Wsparcie dziecka</span>
              <h2 className="miraz-section-title">Każde zachowanie coś komunikuje.</h2>
              <p className="miraz-section-desc" style={{ marginBottom: 0 }}>
                Dzieci nie zawsze potrafią nazwać to, czego doświadczają. Czasem ich trudności widać w zmianach zachowania, codziennego funkcjonowania i relacji z otoczeniem.
              </p>

              <div className="miraz-grid-children">
                <div className="miraz-child-card">
                  <h3>Emocje i regulacja</h3>
                  <p>Intensywne reakcje emocjonalne, wybuchy złości lub płaczu i trudności z samoregulacją w codziennych sytuacjach.</p>
                </div>
                <div className="miraz-child-card">
                  <h3>Wycofanie i lęk</h3>
                  <p>Nasilony lęk, wycofanie społeczne, smutek lub utrzymujące się rozdrażnienie u dziecka.</p>
                </div>
                <div className="miraz-child-card">
                  <h3>Wsparcie dla rodzica</h3>
                  <p>Pomoc dla opiekuna, który chce lepiej zrozumieć potrzeby rozwojowe dziecka i poszukać sposobów wspierania go na co dzień.</p>
                </div>
                <div className="miraz-child-card">
                  <h3>Indywidualna perspektywa</h3>
                  <p>Nie każde zachowanie odbiegające od oczekiwań świadczy o zaburzeniu — może wyrażać odmienny sposób doświadczania świata.</p>
                </div>
              </div>
            </div>

            <div className="miraz-floating-card">
              <div className="miraz-floating-card-header">
                <div className="miraz-floating-dot" />
                <h3>Wsparcie dopasowane do Ciebie</h3>
                <p>Wybierz formę spotkania najbardziej dostępną teraz</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div className="miraz-service-box teal">
                  <div className="miraz-service-top">
                    <span className="title">01. Psycholog na kółkach</span>
                    <span className="badge-teal">Z dojazdem</span>
                  </div>
                  <p>Konsultacja psychologiczna z dojazdem bezpośrednio do Twojego domu.</p>
                </div>

                <div className="miraz-service-box coral">
                  <div className="miraz-service-top">
                    <span className="title">02. Spotkanie online</span>
                    <span className="badge-coral">Wideo HD</span>
                  </div>
                  <p>Bezpieczna rozmowa z dowolnego miejsca, w którym czujesz się swobodnie.</p>
                </div>
              </div>

              <div className="miraz-upcoming">
                <span>W przygotowaniu</span>
                <p>TUS dla dzieci • Mindfulness • Spotkania stacjonarne</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 04: O MNIE --- */}
      <section id="o-mnie" className="miraz-section miraz-bg-mint">
        <div className="miraz-container">
          <div className="miraz-about-grid">
            <div className="miraz-about-left">
              <span className="miraz-section-tag">O mnie</span>
              <h2 className="miraz-section-title" style={{ marginBottom: '4px' }}>Julia Sabura</h2>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-coral)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>
                Psycholożka
              </p>
              <blockquote>
                „Towarzyszy mi ciekawość Twoich doświadczeń, potrzeb i sposobu przeżywania rzeczywistości.”
              </blockquote>
            </div>

            <div className="miraz-about-right">
              <div>
                <h3>O moim podejściu</h3>
                <p>
                  W pracy ważne jest dla mnie spotkanie z drugim człowiekiem i próba spojrzenia na świat z jego perspektywy. Bliskie jest mi łączenie wiedzy psychologicznej z kreatywnością — organizowałam warsztaty mindfulness podczas Pejzaż Festiwalu i tworzę treści psychoedukacyjne.
                </p>
              </div>

              <div>
                <h3>Praca z osobami neuroatypowymi</h3>
                <p>
                  Szczególnie wspieram osoby neuroatypowe, które odkrywają ten aspekt swojego życia. Diagnozę postrzegam nie jako ostateczne wyjaśnienie, lecz początek drogi do budowania codzienności zgodnej z własnymi potrzebami.
                </p>
              </div>

              <div>
                <h3>Wykształcenie i doświadczenie</h3>
                <p style={{ marginBottom: '12px' }}>
                  Jestem absolwentką praktycznych studiów magisterskich ze specjalizacją kliniczną z psychoterapią na Uniwersytecie Papieskim Jana Pawła II w Krakowie. Doświadczenie zdobywałam m.in. w:
                </p>
                <div className="miraz-hospitals">
                  <div className="miraz-hospital-item">
                    <span className="miraz-hospital-dot" />
                    <span>Poradniach psychologiczno-pedagogicznych (TUS)</span>
                  </div>
                  <div className="miraz-hospital-item">
                    <span className="miraz-hospital-dot" />
                    <span>Poradni uzależnień i współuzależnień</span>
                  </div>
                  <div className="miraz-hospital-item">
                    <span className="miraz-hospital-dot" />
                    <span>Szpitalu Specjalistycznym im. Jana Pawła II</span>
                  </div>
                  <div className="miraz-hospital-item">
                    <span className="miraz-hospital-dot" />
                    <span>Szpitalu Klinicznym im. dr. J. Babińskiego</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-text)', marginTop: '16px' }}>
                  W przyszłości planuję kontynuować kształcenie w nurcie psychoterapii Gestalt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 05: KONTAKT --- */}
      <section id="kontakt" className="miraz-section">
        <div className="miraz-container">
          <div className="miraz-contact-grid">
            
            <div>
              <span className="miraz-section-tag">Pierwszy krok</span>
              <h2 className="miraz-section-title">Możemy zacząć od rozmowy.</h2>
              <p className="miraz-section-desc">
                Konsultacja to okazja, by przyjrzeć się temu, co przeżywasz, rozpoznać potrzeby i poszukać rozwiązań. Nie musisz mieć gotowego planu przed spotkaniem.
              </p>

              <div className="miraz-contact-info">
                <div className="miraz-contact-item">
                  <span className="label">E-mail</span>
                  <a href="mailto:kontakt@pracowniamiraz.pl" className="email">
                    kontakt@pracowniamiraz.pl
                  </a>
                </div>
                <div className="miraz-contact-item">
                  <span className="label">Telefon</span>
                  <span className="value">+48 000 000 000</span>
                </div>
              </div>
            </div>

            <div className="miraz-form-card">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 24L12 10L18 20L22 14L28 24H4Z" strokeLinejoin="round" />
              </svg>
              <div className="miraz-form-header">
                <h3>Napisz wiadomość</h3>
                <p>Odpowiem najszybciej, jak to będzie możliwe.</p>
              </div>

              
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="miraz-footer">
        <div className="miraz-container">
          <div className="miraz-footer-top">
            <div>
              <div className="miraz-footer-brand">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 24L12 10L18 20L22 14L28 24H4Z" strokeLinejoin="round" />
                </svg>
                <span>MIRAŻ</span>
              </div>
              <p className="miraz-footer-brand-sub">
                Pracownia Psychologiczna • Julia Sabura
              </p>
            </div>

            <div>
              <p className="miraz-footer-quote">
                „Zrozumienie, skąd pochodzą nasze przekonania i czy rzeczywiście są nasze, może stać się początkiem zmiany — nie świata, lecz naszej relacji z nim, z innymi i przede wszystkim z samym sobą.”
              </p>

              <div className="miraz-footer-links-grid">
                <div className="miraz-footer-col">
                  <h4>Nawigacja</h4>
                  <ul>
                    <li><a href="#o-mirazu">O Mirażu</a></li>
                    <li><a href="#dla-doroslych">Dla dorosłych</a></li>
                    <li><a href="#dla-dzieci">Dla dzieci</a></li>
                    <li><a href="#o-mnie">O mnie</a></li>
                  </ul>
                </div>
                <div className="miraz-footer-col">
                  <h4>Spotkania</h4>
                  <ul>
                    <li>Psycholog na kółkach</li>
                    <li>Konsultacje online</li>
                    <li>Wsparcie rodzicielskie</li>
                  </ul>
                </div>
                <div className="miraz-footer-col">
                  <h4>Kontakt</h4>
                  <ul>
                    <li>kontakt@pracowniamiraz.pl</li>
                    <li>+48 000 000 000</li>
                    <li>@julia.sabura</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="miraz-footer-bottom">
            <p>© {new Date().getFullYear()} Pracownia Psychologiczna Miraż • Wszelkie prawa zastrzeżone</p>
            <a href="#">
              Wróć na górę ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
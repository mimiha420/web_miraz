import React, { useState, useEffect } from 'react';
import './Header.css';

// Dopasowane bezpośrednio do id sekcji w App.jsx
const NAV_ITEMS = [
  { href: '#start', label: 'HOME' },
  { href: '#info-one', label: 'O MIRAŻU' },
  { href: '#help', label: 'DLA DOROSŁYCH' },
  { href: '#info-kids', label: 'DLA DZIECI' },
  { href: '#contacter', label: 'KONTAKT' },
  { href: '#o-mnie', label: 'O NAS' },
 
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState('#start');

  // Obsługa scrolla (zmniejszenie wysokości headera)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Automatyczne podświetlanie aktywnej sekcji podczas przewijania (Scroll Spy)
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(`#${id}`);
          }
        },
        {
          // Aktywuje sekcję, gdy znajdzie się w środkowej części ekranu
          rootMargin: '-35% 0px -55% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Blokada scrollowania body i obsługa ESC przy otwartym menu mobilnym
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  // Płynne przewinięcie do sekcji po kliknięciu
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveId(href);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`lp-header ${isScrolled ? 'is-scrolled' : ''} ${
        menuOpen ? 'is-open' : ''
      }`}
    >
      <a
        href="#start"
        className="lp-logo"
        aria-label="MIRAŻ - strona główna"
        onClick={(e) => handleNavClick(e, '#start')}
      >
        MIRAŻ
      </a>

      {/* Nawigacja Desktop */}
      <nav className="nav-main" aria-label="Główna nawigacja">
        <ul>
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeId === href ? 'is-active' : ''}
                onClick={(e) => handleNavClick(e, href)}
              >
                <span className="first-menu">{label}</span>
                <span className="second-menu" aria-hidden="true">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Przycisk Hamburger (Mobile) */}
      <button
        type="button"
        className="lp-burger"
        aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-drawer"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
      </button>

      {/* Drawer Mobilny */}
      <div
        id="mobile-drawer"
        className={`lp-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Nawigacja mobilna">
          <ul>
            {NAV_ITEMS.map(({ href, label }, idx) => (
              <li key={href} style={{ '--delay': `${0.06 * idx + 0.1}s` }}>
                <a
                  href={href}
                  tabIndex={menuOpen ? 0 : -1}
                  className={activeId === href ? 'is-active' : ''}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
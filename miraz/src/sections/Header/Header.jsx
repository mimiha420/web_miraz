import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="lp-header">
      <div className="lp-logo">MIRAŻ</div>
      <nav className="nav-main">
        <ul>
          <li><Link to="/"><span className="first-menu">O MIRAŻU</span><span className="second-menu">O MIRAŻU</span></Link></li>
          <li><Link to="/konsultacje"><span className="first-menu">KONSULTACJE</span><span className="second-menu">KONSULTACJE</span></Link></li>
          <li><Link to="/oferta"><span class="first-menu">OFERTA</span><span class="second-menu">OFERTA</span></Link></li>
          <li><Link to="/o-nas"><span className="first-menu">O NAS</span><span class="second-menu">O NAS</span></Link></li>
          <li><Link to="/cennik"><span className="first-menu">CENNIK</span><span class="second-menu">CENNIK</span></Link></li>
          <li><Link to="/kontakt"><span className="first-menu">KONTAKT</span><span class="second-menu">KONTAKT</span></Link></li>
        </ul>
      </nav>
    </header>
  );
}
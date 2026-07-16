import { useState, useContext } from 'react';
import Logo from './Logo';
import { LangContext } from '../App';
import content from '../i18n/content';

export default function Navbar() {
  const { lang } = useContext(LangContext);
  const t = content[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <Logo />
        </a>

        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <li>
            <a href="#" className="navbar__link" onClick={() => setMenuOpen(false)}>
              {t.sprinters}
            </a>
          </li>
          <li>
            <a href="#" className="navbar__link" onClick={() => setMenuOpen(false)}>
              {t.empresas}
            </a>
          </li>
          <li>
            <a href="#" className="navbar__link" onClick={() => setMenuOpen(false)}>
              {t.comunidad}
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <a href="#registro" className="btn btn--purple navbar__cta" onClick={() => setMenuOpen(false)}>
            {t.cta}
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

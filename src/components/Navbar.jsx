import { useState, useContext } from 'react';
import Logo from './Logo';
import { LangContext } from '../App';
import content from '../i18n/content';

export default function Navbar() {
  const { lang, setLang } = useContext(LangContext);
  const t = content[lang].nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <Logo />
        </a>

        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <li className="navbar__dropdown">
            <button
              className="navbar__dropdown-btn"
              onClick={() => toggleDropdown('sprinters')}
            >
              {t.sprinters}
              <span className="navbar__chevron">▾</span>
            </button>
            {openDropdown === 'sprinters' && (
              <ul className="navbar__dropdown-menu">
                <li><a href="#programa" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>{t.programa}</a></li>
                <li><a href="#metodologia" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>{t.metodologia}</a></li>
              </ul>
            )}
          </li>
          <li className="navbar__dropdown">
            <button
              className="navbar__dropdown-btn"
              onClick={() => toggleDropdown('empresas')}
            >
              {t.empresas}
              <span className="navbar__chevron">▾</span>
            </button>
            {openDropdown === 'empresas' && (
              <ul className="navbar__dropdown-menu">
                <li><a href="#para-empresas" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>{t.paraAgencias}</a></li>
                <li><a href="#para-empresas" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>{t.capacitacion}</a></li>
              </ul>
            )}
          </li>
          <li className="navbar__dropdown">
            <button
              className="navbar__dropdown-btn"
              onClick={() => toggleDropdown('recursos')}
            >
              {t.recursos}
              <span className="navbar__chevron">▾</span>
            </button>
            {openDropdown === 'recursos' && (
              <ul className="navbar__dropdown-menu">
                <li><a href="#" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>{t.blog}</a></li>
                <li><a href="#comunidad" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>{t.comunidad}</a></li>
              </ul>
            )}
          </li>
        </ul>

        <div className="navbar__actions">
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Toggle language"
          >
            <span className={lang === 'es' ? 'lang-active' : ''}>ES</span>
            <span>|</span>
            <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
          </button>
          <a href="#registro" className="btn btn--lime">
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

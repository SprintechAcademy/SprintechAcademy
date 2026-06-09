import { useState, useEffect, useContext } from 'react';
import Logo from './Logo';
import { LangContext } from '../App';
import content from '../i18n/content';

export default function Navbar() {
  const { lang, setLang } = useContext(LangContext);
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.programa, href: '#programa' },
    { label: t.metodologia, href: '#metodologia' },
    { label: t.comunidad, href: '#comunidad' },
    { label: t.precio, href: '#precio' },
    { label: t.paraEmpresas, href: '#para-empresas' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' navbar--solid' : ' navbar--transparent'}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <Logo variant={scrolled ? 'lime' : 'dark'} />
        </a>

        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
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
          <a href="#registro" className="btn btn--dark">
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

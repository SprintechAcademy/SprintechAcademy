import { useContext } from 'react';
import Logo from './Logo';
import { LangContext } from '../App';
import content from '../i18n/content';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z"/>
    </svg>
  );
}

export default function Footer() {
  const { lang } = useContext(LangContext);
  const t = content[lang].footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <a href="#" className="footer__logo">
              <Logo />
            </a>
            <p className="footer__desc">{t.desc}</p>
            <a href="#registro" className="btn btn--purple footer__cta">
              {t.cta}
            </a>
            <div className="footer__social">
              <a href="https://www.instagram.com/sprintechacademy?igsh=czY1N3VwdnJmemI0&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/sprintech-academy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://tiktok.com/@sprintechacademy" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t.nav.title}</h4>
            <ul className="footer__links">
              {t.nav.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

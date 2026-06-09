import { useContext } from 'react';
import Logo from './Logo';
import { LangContext } from '../App';
import content from '../i18n/content';

const NAV_HREFS = ['#programa', '#metodologia', '#comunidad', '#precio', '#para-empresas'];

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.04-8.5A8.18 8.18 0 0 0 21 9.35V5.9a4.85 4.85 0 0 1-1.41.79z"/>
    </svg>
  );
}

export default function Footer() {
  const { lang } = useContext(LangContext);
  const t = content[lang].footer;

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <a href="#" className="footer__logo">
            <Logo variant="lime" />
          </a>
          <nav className="footer__nav" aria-label="Footer navigation">
            {t.links.map((link, i) => (
              <a key={i} href={NAV_HREFS[i]}>{link}</a>
            ))}
          </nav>
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
        <div className="footer__bottom">
          <p className="footer__tagline">{t.tagline}</p>
          <p className="footer__copy">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

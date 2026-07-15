import { useContext, useEffect, useState } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';

export default function Hero() {
  const { lang } = useContext(LangContext);
  const t = content[lang].hero;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero${loaded ? ' hero-loaded' : ''}`}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="container">
        <div className="hero__content">
          <div className="hero__badge anim-hero" style={{ '--delay': '0s' }}>
            {t.badge}
          </div>
          <h1 className="hero__h1 anim-hero" style={{ '--delay': '0.1s' }}>
            <span>{t.h1a}</span>
            <span className="hero__h1--accent">{t.h1b}</span>
          </h1>
          <p className="hero__subtitle anim-hero" style={{ '--delay': '0.22s' }}>
            {t.subtitle}
          </p>
          <div className="hero__ctas anim-hero" style={{ '--delay': '0.34s' }}>
            <a href="#registro" className="btn btn--lime">
              {t.ctaPrimary}
            </a>
            <a href="#" className="btn btn--purple">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

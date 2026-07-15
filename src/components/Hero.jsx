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
    <section className={`hero section--cream${loaded ? ' hero-loaded' : ''}`}>
      <div className="hero__gradient" aria-hidden="true" />
      <div className="container">
        <div className="hero__content">
          <div className="hero__badge anim-hero" style={{ '--delay': '0s' }}>
            {t.badge}
          </div>
          <h1 className="hero__h1 anim-hero" style={{ '--delay': '0.1s' }}>
            {t.h1}
          </h1>
          <p className="hero__subtitle anim-hero" style={{ '--delay': '0.2s' }}>
            {t.subtitle}
          </p>
          <div className="hero__ctas anim-hero" style={{ '--delay': '0.3s' }}>
            <a href="#registro" className="btn btn--lime btn--lg">
              {t.ctaPrimary}
            </a>
            <a href="#comunidad" className="btn btn--ghost btn--lg">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

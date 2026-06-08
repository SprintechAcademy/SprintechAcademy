import { useContext, useEffect, useRef } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';

export default function Hero() {
  const { lang } = useContext(LangContext);
  const t = content[lang].hero;
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('hero-loaded');
      return;
    }
    requestAnimationFrame(() => {
      el.classList.add('hero-loaded');
    });
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__bg"></div>
      <div className="container hero__content">
        <div className="hero__badge anim-hero" style={{ '--delay': '0s' }}>
          {t.badge}
        </div>
        <h1 className="hero__h1 anim-hero" style={{ '--delay': '0.15s' }}>
          {t.h1}
        </h1>
        <p className="hero__subtitle anim-hero" style={{ '--delay': '0.3s' }}>
          {t.subtitle}
        </p>
        <div className="hero__stats anim-hero" style={{ '--delay': '0.45s' }}>
          {t.stats.map((stat, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="hero__ctas anim-hero" style={{ '--delay': '0.6s' }}>
          <a href="#registro" className="btn btn--lime btn--lg">
            {t.ctaPrimary}
          </a>
          <a href="#programa" className="btn btn--ghost">
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

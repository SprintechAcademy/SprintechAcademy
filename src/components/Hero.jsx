import { useContext, useEffect, useRef, useState } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) {
      setCount(target);
      return;
    }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, started }) {
  const count = useCountUp(stat.value, 1400, started);
  const display = stat.value === 0 ? '0' : count;

  return (
    <div className="hero__stat">
      <span className="hero__stat-value">
        {stat.prefix || ''}{display}{stat.suffix || ''}
      </span>
      <span className="hero__stat-label">{stat.label}</span>
    </div>
  );
}

export default function Hero() {
  const { lang } = useContext(LangContext);
  const t = content[lang].hero;
  const [loaded, setLoaded] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`hero section--dark${loaded ? ' hero-loaded' : ''}`}>
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
          <div className="hero__stats anim-hero" style={{ '--delay': '0.3s' }} ref={statsRef}>
            {t.stats.map((stat, i) => (
              <StatCard key={i} stat={stat} started={statsStarted} />
            ))}
          </div>
          <div className="hero__ctas anim-hero" style={{ '--delay': '0.4s' }}>
            <a href="#registro" className="btn btn--lime btn--lg">
              {t.ctaPrimary}
            </a>
            <a href="#programa" className="btn btn--ghost btn--lg">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

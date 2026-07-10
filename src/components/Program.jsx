import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Program() {
  const { lang } = useContext(LangContext);
  const t = content[lang].program;
  const ref = useScrollAnim();

  return (
    <section id="programa" className="program section--cream" ref={ref}>
      <div className="container">
        <h2 className="section-title anim-ready" style={{ '--delay': '0s' }}>
          {t.title}
        </h2>

        <div className="program__pillars anim-ready" style={{ '--delay': '0.1s' }}>
          {t.pillars.map((pillar) => (
            <div key={pillar.num} className="program__pillar">
              <span className="program__pillar-num">{pillar.num}</span>
              <h3 className="program__pillar-title">{pillar.title}</h3>
              <p className="program__pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="program__timeline-wrap anim-ready" style={{ '--delay': '0.2s' }}>
          <p className="program__timeline-label">{t.weekLabel}</p>
          <div className="program__timeline">
            {t.weeks.map((week) => (
              <div key={week.num} className="program__week-card">
                <span className="program__week-num">{week.num}</span>
                <span className="program__week-title">{week.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="program__benefits anim-ready" style={{ '--delay': '0.3s' }}>
          {t.benefits.map((b, i) => (
            <div key={i} className="program__benefit">
              <span className="program__benefit-check">✓</span>
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="anim-ready" style={{ '--delay': '0.4s' }}>
          <a href="#registro" className="program__cta">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

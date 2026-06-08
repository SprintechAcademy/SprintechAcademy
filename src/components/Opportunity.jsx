import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Opportunity() {
  const { lang } = useContext(LangContext);
  const t = content[lang].opportunity;
  const ref = useScrollAnim();

  return (
    <section id="oportunidad" className="opportunity section--dark" ref={ref}>
      <div className="container">
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title opportunity__title">{t.title}</h2>
          <p className="section-desc opportunity__subtitle">{t.subtitle}</p>
        </div>

        <div className="opportunity__stats">
          {t.stats.map((stat, i) => (
            <div
              key={i}
              className="opportunity__stat anim-ready"
              style={{ '--delay': `${i * 0.15}s` }}
            >
              <span className="opportunity__stat-value">{stat.value}</span>
              <span className="opportunity__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="opportunity__description anim-ready" style={{ '--delay': '0.5s' }}>
          {t.description}
        </p>

        <div className="anim-ready" style={{ '--delay': '0.65s' }}>
          <a href="#registro" className="btn btn--lime btn--lg">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

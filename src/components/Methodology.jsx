import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Methodology() {
  const { lang } = useContext(LangContext);
  const t = content[lang].methodology;
  const ref = useScrollAnim();

  return (
    <section id="metodologia" className="methodology section--white" ref={ref}>
      <div className="container">
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.subtitle}</p>
        </div>

        <div className="methodology__cards">
          {t.pillars.map((pillar, i) => (
            <div
              key={i}
              className="methodology__card anim-ready"
              style={{ '--delay': `${i * 0.13}s` }}
            >
              <div className="methodology__card-icon" aria-hidden="true">{pillar.icon}</div>
              <h3 className="methodology__card-title">{pillar.title}</h3>
              <p className="methodology__card-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

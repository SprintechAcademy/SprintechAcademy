import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Methodology() {
  const { lang } = useContext(LangContext);
  const t = content[lang].methodology;
  const ref = useScrollAnim();

  return (
    <section id="metodologia" className="methodology section--cream" ref={ref}>
      <div className="container">
        <h2 className="section-title anim-ready" style={{ '--delay': '0s' }}>
          {t.title}
        </h2>
        <p className="section-desc anim-ready" style={{ '--delay': '0.1s' }}>
          {t.subtitle}
        </p>
        <div className="methodology__cards">
          {t.pillars.map((pillar, i) => (
            <div
              key={pillar.num}
              className="methodology__card anim-ready"
              style={{ '--delay': `${0.1 + i * 0.1}s` }}
            >
              <span className="methodology__card-num">{pillar.num}</span>
              <h3 className="methodology__card-title">{pillar.title}</h3>
              <p className="methodology__card-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

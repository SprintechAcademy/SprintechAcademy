import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Methodology() {
  const { lang } = useContext(LangContext);
  const t = content[lang].methodology;
  const ref = useScrollAnim();

  return (
    <section id="metodologia" className="methodology" ref={ref}>
      <div className="container">
        <p className="eyebrow anim-ready" style={{ '--delay': '0s' }}>
          {t.eyebrow}
        </p>
        <h2 className="section-title anim-ready" style={{ '--delay': '0.08s' }}>
          {t.title}
        </h2>
        <div className="methodology__cards">
          {t.pillars.map((pillar, i) => (
            <div
              key={pillar.num}
              className="methodology__card anim-ready"
              style={{ '--delay': `${0.12 + i * 0.1}s` }}
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

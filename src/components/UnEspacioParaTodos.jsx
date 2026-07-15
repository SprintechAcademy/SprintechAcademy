import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function UnEspacioParaTodos() {
  const { lang } = useContext(LangContext);
  const t = content[lang].unEspacioParaTodos;
  const ref = useScrollAnim();

  return (
    <section id="comunidad" className="espacio section--cream" ref={ref}>
      <div className="container">
        <h2 className="section-title anim-ready" style={{ '--delay': '0s' }}>
          {t.title}
        </h2>
        <p className="section-desc anim-ready" style={{ '--delay': '0.1s' }}>
          {t.subtitle}
        </p>
        <div className="espacio__grid">
          {t.benefits.map((b, i) => (
            <div
              key={b.num}
              className="espacio__card anim-ready"
              style={{ '--delay': `${0.1 + i * 0.08}s` }}
            >
              <span className="espacio__card-num">{b.num}</span>
              <h3 className="espacio__card-title">{b.title}</h3>
              <p className="espacio__card-desc">{b.description}</p>
            </div>
          ))}
        </div>
        <p className="espacio__tagline anim-ready" style={{ '--delay': '0.6s' }}>
          {t.tagline}
        </p>
      </div>
    </section>
  );
}

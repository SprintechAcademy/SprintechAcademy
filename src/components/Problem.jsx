import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Problem() {
  const { lang } = useContext(LangContext);
  const t = content[lang].problem;
  const ref = useScrollAnim();

  return (
    <section id="problema" className="problem section--white" ref={ref}>
      <div className="container">
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.subtitle}</p>
        </div>

        <div className="problem__cards">
          {t.cards.map((card, i) => (
            <div
              key={i}
              className="problem__card anim-ready"
              style={{ '--delay': `${i * 0.12}s` }}
            >
              <div className="problem__card-icon" aria-hidden="true">{card.icon}</div>
              <h3 className="problem__card-title">{card.title}</h3>
              <p className="problem__card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

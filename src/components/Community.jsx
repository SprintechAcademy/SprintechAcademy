import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Community() {
  const { lang } = useContext(LangContext);
  const t = content[lang].community;
  const ref = useScrollAnim();

  return (
    <section id="comunidad" className="community section--cream" ref={ref}>
      <div className="container">
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.subtitle}</p>
        </div>

        <div className="community__grid">
          {t.pillars.map((pillar, i) => (
            <div
              key={i}
              className="community__card anim-ready"
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <div className="community__card-icon" aria-hidden="true">{pillar.icon}</div>
              <h3 className="community__card-title">{pillar.title}</h3>
              <p className="community__card-desc">{pillar.description}</p>
            </div>
          ))}
        </div>

        <p className="community__tagline anim-ready" style={{ '--delay': '0.7s' }}>
          {t.tagline}
        </p>
      </div>
    </section>
  );
}

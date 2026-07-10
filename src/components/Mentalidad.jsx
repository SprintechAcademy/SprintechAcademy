import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function Mentalidad() {
  const { lang } = useContext(LangContext);
  const t = content[lang].mentalidad;
  const ref = useScrollAnim();

  return (
    <section className="mentalidad section--dark" ref={ref}>
      <div className="container">
        <h2 className="mentalidad__headline anim-ready" style={{ '--delay': '0s' }}>
          {t.headline}
        </h2>
        <div className="mentalidad__cols">
          <div className="mentalidad__left anim-ready" style={{ '--delay': '0.15s' }}>
            {t.points.map((point) => (
              <div key={point.num} className="mentalidad__point">
                <span className="mentalidad__point-num">{point.num}</span>
                <div>
                  <h3 className="mentalidad__point-title">{point.title}</h3>
                  <p className="mentalidad__point-desc">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mentalidad__right anim-ready" style={{ '--delay': '0.3s' }}>
            {t.stats.map((stat, i) => (
              <div key={i} className="mentalidad__stat">
                <span className="mentalidad__stat-value">{stat.value}</span>
                <span className="mentalidad__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

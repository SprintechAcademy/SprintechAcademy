import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

function HighlightTitle({ title, highlight }) {
  if (!highlight) return <>{title}</>;
  const idx = title.indexOf(highlight);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="mentalidad__title-hl">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

export default function Mentalidad() {
  const { lang } = useContext(LangContext);
  const t = content[lang].mentalidad;
  const ref = useScrollAnim();

  return (
    <section className="mentalidad" ref={ref}>
      <div className="container">
        <div className="mentalidad__cols">
          <div className="mentalidad__left anim-ready" style={{ '--delay': '0s' }}>
            <p className="eyebrow mentalidad__eyebrow">{t.left.eyebrow}</p>
            <h2 className="mentalidad__title">
              <HighlightTitle title={t.left.title} highlight={t.left.titleHighlight} />
            </h2>
            <p className="mentalidad__body">{t.left.body}</p>
          </div>
          <div className="mentalidad__right anim-ready" style={{ '--delay': '0.15s' }}>
            <div className="mentalidad__concepts">
              {t.right.concepts.map((c) => (
                <div key={c.word} className="mentalidad__concept">
                  <strong className="mentalidad__concept-word">{c.word}</strong>
                  <p className="mentalidad__concept-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mentalidad__stats anim-ready" style={{ '--delay': '0.25s' }}>
          {t.stats.map((stat) => (
            <div key={stat.title} className="mentalidad__stat">
              <strong className="mentalidad__stat-title">{stat.title}</strong>
              <p className="mentalidad__stat-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

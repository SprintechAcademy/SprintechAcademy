import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

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
            <h2 className="mentalidad__title">{t.left.title}</h2>
            <p className="mentalidad__body">{t.left.body}</p>
          </div>
          <div className="mentalidad__right anim-ready" style={{ '--delay': '0.15s' }}>
            <p className="mentalidad__statement">{t.right.statement}</p>
            <div className="mentalidad__cards">
              {t.right.cards.map((card) => (
                <div key={card.num} className="mentalidad__card">
                  <span className="mentalidad__card-num">{card.num}</span>
                  <strong className="mentalidad__card-title">{card.title}</strong>
                  <p className="mentalidad__card-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

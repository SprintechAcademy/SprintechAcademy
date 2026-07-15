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
            <p className="eyebrow">{t.left.eyebrow}</p>
            <h2 className="mentalidad__title">{t.left.title}</h2>
            <p className="mentalidad__body">{t.left.body}</p>
          </div>
          <div className="mentalidad__right anim-ready" style={{ '--delay': '0.15s' }}>
            <div className="mentalidad__card">
              <div className="mentalidad__stripe mentalidad__stripe--dark">
                <p className="mentalidad__statement">{t.right.statement}</p>
              </div>
              <div className="mentalidad__stripe mentalidad__stripe--light">
                <p className="mentalidad__note">{t.right.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

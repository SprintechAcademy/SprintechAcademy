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
        <p className="mentalidad__eyebrow anim-ready" style={{ '--delay': '0s' }}>
          {t.eyebrow}
        </p>
        <h2 className="mentalidad__headline anim-ready" style={{ '--delay': '0.1s' }}>
          {t.headline}
        </h2>
        <p className="mentalidad__body anim-ready" style={{ '--delay': '0.2s' }}>
          {t.body}
        </p>
      </div>
    </section>
  );
}

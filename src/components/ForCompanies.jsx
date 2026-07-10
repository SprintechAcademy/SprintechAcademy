import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function ForCompanies() {
  const { lang } = useContext(LangContext);
  const t = content[lang].forCompanies;
  const ref = useScrollAnim();

  return (
    <section id="para-empresas" className="for-companies section--cream" ref={ref}>
      <div className="container">
        <h2 className="section-title anim-ready" style={{ '--delay': '0s' }}>
          {t.title}
        </h2>
        <p className="section-desc anim-ready" style={{ '--delay': '0.1s' }}>
          {t.subtitle}
        </p>
        <div className="for-companies__cols">
          <div className="for-companies__col anim-ready" style={{ '--delay': '0.2s' }}>
            <h3 className="for-companies__col-title">{t.left.title}</h3>
            <p className="for-companies__col-desc">{t.left.description}</p>
            <ul className="for-companies__benefits">
              {t.left.benefits.map((b) => (
                <li key={b}><span className="for-companies__check">✓</span> {b}</li>
              ))}
            </ul>
          </div>
          <div className="for-companies__col anim-ready" style={{ '--delay': '0.3s' }}>
            <h3 className="for-companies__col-title">{t.right.title}</h3>
            <p className="for-companies__col-desc">{t.right.description}</p>
            <ul className="for-companies__benefits">
              {t.right.benefits.map((b) => (
                <li key={b}><span className="for-companies__check">✓</span> {b}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="for-companies__cta anim-ready" style={{ '--delay': '0.4s' }}>
          <a href="#registro" className="btn btn--purple btn--lg">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

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
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.subtitle}</p>
        </div>

        <div className="for-companies__cols">
          <div className="for-companies__col anim-ready" style={{ '--delay': '0.15s' }}>
            <h3 className="for-companies__col-title">{t.left.title}</h3>
            <p className="for-companies__col-desc">{t.left.description}</p>
            <ul className="for-companies__benefits">
              {t.left.benefits.map((b, i) => (
                <li key={i}>✓ {b}</li>
              ))}
            </ul>
          </div>

          <div className="for-companies__col anim-ready" style={{ '--delay': '0.3s' }}>
            <h3 className="for-companies__col-title">{t.right.title}</h3>
            <p className="for-companies__col-desc">{t.right.description}</p>
            <ul className="for-companies__benefits">
              {t.right.benefits.map((b, i) => (
                <li key={i}>✓ {b}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="for-companies__cta anim-ready" style={{ '--delay': '0.45s' }}>
          <a href="#registro" className="btn btn--dark btn--lg" onClick={(e) => {
            e.preventDefault();
            document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });
            // trigger company tab — handled via URL hash approach
            window.dispatchEvent(new CustomEvent('openCompanyTab'));
          }}>
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

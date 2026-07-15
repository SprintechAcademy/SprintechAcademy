import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function CTAFinal() {
  const { lang } = useContext(LangContext);
  const t = content[lang].ctaFinal;
  const ref = useScrollAnim();

  return (
    <section id="registro" className="cta-final" ref={ref}>
      <div className="container">
        <h2 className="cta-final__title anim-ready" style={{ '--delay': '0s' }}>
          {t.title}
        </h2>
        <div className="cta-final__btns anim-ready" style={{ '--delay': '0.15s' }}>
          <a href="#registro" className="btn btn--primary">
            {t.ctaPrimary}
          </a>
          <a href="#" className="btn btn--outline">
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

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
          <a href="#registro" className="btn btn--lime">
            {t.ctaPrimary}
          </a>
          <a href="#" className="btn btn--ghost">
            <span className="btn-ghost__icon" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

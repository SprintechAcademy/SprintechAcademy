import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

const FREE_SPOTS_REMAINING = 7;

export default function Pricing() {
  const { lang } = useContext(LangContext);
  const t = content[lang].pricing;
  const ref = useScrollAnim();

  const counterText = t.betaBox.counter.replace('{n}', FREE_SPOTS_REMAINING);

  return (
    <section id="precio" className="pricing section--white" ref={ref}>
      <div className="container">
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.subtitle}</p>
        </div>

        <div className="pricing__layout">
          {/* Main price card */}
          <div className="pricing__card anim-ready" style={{ '--delay': '0.15s' }}>
            <div className="pricing__badge">{t.badge}</div>
            <div className="pricing__price-row">
              <span className="pricing__price">{t.price}</span>
              <span className="pricing__currency">{t.currency}</span>
            </div>
            <p className="pricing__cop">{t.cop}</p>
            <p className="pricing__payment">{t.paymentOption}</p>
            <p className="pricing__future">
              {t.futurePriceLabel}: <s>{t.futurePrice}</s>
            </p>

            <ul className="pricing__includes">
              {t.includes.map((item, i) => (
                <li key={i}>✓ {item}</li>
              ))}
            </ul>

            <a href="#registro" className="btn btn--lime btn--full">
              {t.cta}
            </a>
          </div>

          {/* Beta box */}
          <div className="pricing__beta anim-ready" style={{ '--delay': '0.3s' }}>
            <div className="pricing__beta-inner">
              <div className="pricing__beta-icon" aria-hidden="true">🎁</div>
              <h3 className="pricing__beta-title">{t.betaBox.title}</h3>
              <p className="pricing__beta-desc">{t.betaBox.description}</p>
              <div className="pricing__beta-counter">
                <span className="pricing__beta-count">{FREE_SPOTS_REMAINING}</span>
                <span className="pricing__beta-counter-label">{counterText}</span>
              </div>
              <a href="#registro" className="btn btn--dark btn--full">
                {t.betaBox.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

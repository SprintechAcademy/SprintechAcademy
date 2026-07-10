import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

const BETA_SPOTS = 10;
const SPOTS_TAKEN = 0;

export default function Pricing() {
  const { lang } = useContext(LangContext);
  const t = content[lang].pricing;
  const ref = useScrollAnim();
  const spotsLeft = BETA_SPOTS - SPOTS_TAKEN;
  const fillPct = (SPOTS_TAKEN / BETA_SPOTS) * 100;

  return (
    <section id="precio" className="pricing section--cream" ref={ref}>
      <div className="container">
        <h2 className="section-title anim-ready" style={{ '--delay': '0s' }}>
          {t.title}
        </h2>
        <p className="section-desc anim-ready" style={{ '--delay': '0.1s' }}>
          {t.subtitle}
        </p>
        <div className="pricing__layout">
          <div className="pricing__card anim-ready" style={{ '--delay': '0.2s' }}>
            <span className="pricing__badge">{t.badge}</span>
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
              {t.includes.map((item) => (
                <li key={item}>
                  <span className="pricing__check">✓</span> {item}
                </li>
              ))}
            </ul>
            <a href="#registro" className="btn btn--lime btn--full btn--lg">
              {t.cta}
            </a>
          </div>

          <div className="pricing__beta anim-ready" style={{ '--delay': '0.3s' }}>
            <span className="pricing__beta-tag">{t.betaBox.title}</span>
            <p className="pricing__beta-title">{t.betaBox.description}</p>
            <div className="pricing__beta-spots">
              <div className="pricing__beta-spots-bar">
                <div
                  className="pricing__beta-spots-fill"
                  style={{ width: `${fillPct}%` }}
                />
              </div>
              <p className="pricing__beta-spots-label">
                {t.betaBox.counter.replace('{n}', spotsLeft)}
              </p>
            </div>
            <a href="#registro" className="btn btn--lime btn--full btn--lg">
              {t.betaBox.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

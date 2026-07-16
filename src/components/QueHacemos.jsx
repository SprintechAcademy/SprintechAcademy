import { useState, useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

function SprintersPanel({ tab }) {
  const prog = tab.programs[0];
  return (
    <div className="qh-panel qh-panel--sprinters">
      <h2 className="qh-panel__title">{tab.title}</h2>

      <div className="qh-sprint-grid">
        <div className="qh-sprint-left">
          <span className="qh-sprint-tag">{prog.tag}</span>
          <h3 className="qh-sprint-name">{prog.name}</h3>
          <p className="qh-sprint-desc">{prog.desc}</p>
        </div>

        <div className="qh-sprint-right">
          <p className="qh-sprint-learn-title">{prog.learnTitle}</p>
          <ul className="qh-sprint-chips">
            {prog.list.map((item) => (
              <li key={item} className="qh-sprint-chip">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="qh-sprint-benefits">
        <h4 className="qh-sprint-benefits__title">{prog.benefitsTitle}</h4>
        <div className="qh-sprint-benefits__grid">
          {prog.benefits.map((b) => (
            <div key={b.title} className="qh-sprint-benefit">
              <strong className="qh-sprint-benefit__title">{b.title}</strong>
              <p className="qh-sprint-benefit__desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="qh-sprint-cta">
        <a href={prog.ctaHref} className="btn btn--purple">{prog.cta}</a>
        <p className="qh-sprint-price">{prog.price}</p>
      </div>

      <p className="qh-coming-soon">{tab.comingSoon}</p>
    </div>
  );
}

function AdLabPanel({ tab }) {
  return (
    <div className="qh-panel qh-panel--adlab">
      <h2 className="qh-panel__title">{tab.title}</h2>
      <p className="qh-panel__lead">{tab.desc}</p>
      <p className="qh-panel__body">{tab.body}</p>

      <div className="qh-how">
        <p className="qh-how__label">{tab.howWeWork.label}</p>
        <div className="qh-how__grid">
          {tab.howWeWork.items.map((item) => (
            <div key={item.title} className="qh-how__item">
              <strong className="qh-how__title">{item.title}</strong>
              <p className="qh-how__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="qh-programs">
        <p className="qh-programs__label">{tab.programs.label}</p>
        <div className="qh-programs__grid">
          {tab.programs.items.map((prog) => (
            <div key={prog.name} className="qh-programs__card">
              <strong className="qh-programs__card-name">{prog.name}</strong>
              <p className="qh-programs__card-desc">{prog.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="qh-ctas">
        {tab.ctas.map((cta) => (
          <a key={cta.label} href={cta.href} className={`btn ${cta.variant}`}>
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ComunidadPanel({ tab }) {
  return (
    <div className="qh-panel qh-panel--comunidad">
      <h2 className="qh-panel__title">{tab.title}</h2>
      <p className="qh-panel__lead">{tab.subtitle}</p>
      <div className="qh-benefits">
        {tab.benefits.map((b) => (
          <div key={b.label} className="qh-benefit">
            <strong className="qh-benefit__label">{b.label}</strong>
            <p className="qh-benefit__desc">{b.desc}</p>
          </div>
        ))}
      </div>
      <a href={tab.ctaHref} className="btn btn--purple">
        {tab.cta}
      </a>
    </div>
  );
}

export default function QueHacemos() {
  const { lang } = useContext(LangContext);
  const t = content[lang].queHacemos;
  const ref = useScrollAnim();
  const [active, setActive] = useState(0);

  return (
    <section className="que-hacemos" ref={ref}>
      <div className="container">
        <div className="que-hacemos__header anim-ready" style={{ '--delay': '0s' }}>
          <p className="eyebrow que-hacemos__eyebrow">{t.eyebrow}</p>
          <h2 className="que-hacemos__title">{t.title}</h2>
          <p className="que-hacemos__subtitle">{t.subtitle}</p>
        </div>

        <div className="que-hacemos__tabbar anim-ready" style={{ '--delay': '0.1s' }}>
          {t.tabs.map((tab, i) => (
            <button
              key={tab.key}
              className={`que-hacemos__tabbn${active === i ? ' que-hacemos__tabbn--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="que-hacemos__tabbn-label">{tab.label}</span>
              <span className="que-hacemos__tabbn-sub">{tab.sublabel}</span>
            </button>
          ))}
        </div>

        <div className="que-hacemos__panel-wrap" key={active}>
          {active === 0 && <SprintersPanel tab={t.tabs[0]} />}
          {active === 1 && <AdLabPanel tab={t.tabs[1]} />}
          {active === 2 && <ComunidadPanel tab={t.tabs[2]} />}
        </div>
      </div>
    </section>
  );
}

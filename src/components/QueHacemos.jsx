import { useState, useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function QueHacemos() {
  const { lang } = useContext(LangContext);
  const t = content[lang].queHacemos;
  const ref = useScrollAnim();
  const [active, setActive] = useState(0);

  const tab = t.tabs[active];

  return (
    <section className="que-hacemos" ref={ref}>
      <div className="container">
        <p className="eyebrow anim-ready" style={{ '--delay': '0s' }}>
          {t.eyebrow}
        </p>
        <div className="que-hacemos__layout anim-ready" style={{ '--delay': '0.1s' }}>
          {/* Left: tab buttons */}
          <div className="que-hacemos__tabs">
            {t.tabs.map((item, i) => (
              <button
                key={i}
                className={`que-hacemos__tab${active === i ? ' que-hacemos__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: panel — key forces remount → CSS animation fires */}
          <div className="que-hacemos__panel" key={active}>
            <div className="que-hacemos__panel-main">
              <h2 className="que-hacemos__panel-title">{tab.title}</h2>

              {tab.desc && (
                <p className="que-hacemos__panel-desc">{tab.desc}</p>
              )}

              {tab.list && (
                <ul className="que-hacemos__list">
                  {tab.list.map((item, i) => (
                    <li key={i} className="que-hacemos__list-item">
                      <span className="que-hacemos__list-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {tab.howWeWork && (
                <div className="que-hacemos__how">
                  <p className="que-hacemos__how-label">{tab.howWeWork.label}</p>
                  <div className="que-hacemos__how-grid">
                    {tab.howWeWork.items.map((item, i) => (
                      <div key={i} className="que-hacemos__how-item">
                        <strong className="que-hacemos__how-title">{item.title}</strong>
                        <p className="que-hacemos__how-desc">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab.communityCards && (
                <div className="que-hacemos__tags">
                  {tab.communityCards.map((card, i) => (
                    <span key={i} className="que-hacemos__tag">{card}</span>
                  ))}
                </div>
              )}

              <div className="que-hacemos__ctas">
                {tab.ctas.map((cta, i) => (
                  <a key={i} href={cta.href} className={`btn ${cta.variant}`}>
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>

            {tab.card && (
              <div className="que-hacemos__stat-card">
                <span className="que-hacemos__stat-num">{tab.card.stat}</span>
                <span className="que-hacemos__stat-label">{tab.card.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

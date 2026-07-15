import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function QueHacemos() {
  const { lang } = useContext(LangContext);
  const t = content[lang].queHacemos;
  const ref = useScrollAnim();

  return (
    <section className="que-hacemos section--cream" ref={ref}>
      <div className="container">
        <div className="que-hacemos__header anim-ready" style={{ '--delay': '0s' }}>
          <p className="que-hacemos__eyebrow">{t.eyebrow}</p>
          <h2 className="section-title">{t.title}</h2>
        </div>
        <div className="que-hacemos__cards">
          {t.cards.map((card, i) => (
            <div
              key={card.id}
              className={`que-hacemos__card que-hacemos__card--${card.accent} anim-ready`}
              style={{ '--delay': `${i * 0.1}s` }}
            >
              <p className="que-hacemos__card-label">{card.label}</p>
              <h3 className="que-hacemos__card-title">{card.title}</h3>
              <p className="que-hacemos__card-desc">{card.desc}</p>
              {card.cta && (
                <a href={card.ctaHref} className="que-hacemos__card-cta btn btn--dark">
                  {card.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

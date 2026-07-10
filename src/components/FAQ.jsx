import { useContext, useState } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

export default function FAQ() {
  const { lang } = useContext(LangContext);
  const t = content[lang].faq;
  const ref = useScrollAnim();
  const [open, setOpen] = useState(null);

  return (
    <section className="faq section--dark" ref={ref}>
      <div className="container">
        <h2 className="section-title anim-ready" style={{ '--delay': '0s' }}>
          {t.title}
        </h2>
        <div className="faq__list anim-ready" style={{ '--delay': '0.1s' }}>
          {t.items.map((item, i) => (
            <div key={i} className="faq__item">
              <button
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq__icon">{open === i ? '↑' : '↓'}</span>
              </button>
              {open === i && (
                <div className="faq__answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

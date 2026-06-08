import { useContext, useState } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq__item${open ? ' faq__item--open' : ''}`}>
      <button
        className="faq__question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <span className="faq__icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="faq__answer">
          <p>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { lang } = useContext(LangContext);
  const t = content[lang].faq;
  const ref = useScrollAnim();

  return (
    <section id="faq" className="faq section--cream" ref={ref}>
      <div className="container">
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title">{t.title}</h2>
        </div>

        <div className="faq__list">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="anim-ready"
              style={{ '--delay': `${i * 0.07}s` }}
            >
              <FAQItem item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

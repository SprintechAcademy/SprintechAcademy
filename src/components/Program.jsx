import { useContext, useState } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

const TOOLS = ['CM360', 'Flashtalking', 'DV360', 'Innovid', 'Excel', 'Google Sheets', 'Jira'];

export default function Program() {
  const { lang } = useContext(LangContext);
  const t = content[lang].program;
  const ref = useScrollAnim();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="programa" className="program section--cream" ref={ref}>
      <div className="container">
        <div className="anim-ready" style={{ '--delay': '0s' }}>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.description}</p>
        </div>

        <div className="program__weeks">
          {t.weeks.map((week, i) => (
            <div
              key={i}
              className="program__week-card anim-ready"
              style={{ '--delay': `${i * 0.12}s` }}
            >
              <div className="program__week-label">{week.week}</div>
              <h3 className="program__week-title">{week.title}</h3>
              <p className="program__week-content">{week.content}</p>
            </div>
          ))}
        </div>

        <div className="program__tools anim-ready" style={{ '--delay': '0.5s' }}>
          <p className="program__tools-label">{t.tools}</p>
          <div className="program__tools-list">
            {TOOLS.map((tool) => (
              <span key={tool} className="tool-badge">{tool}</span>
            ))}
          </div>
        </div>

        <button
          className="btn btn--outline program__toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t.ctaCollapse : t.ctaToggle}
        </button>

        {expanded && (
          <div className="program__expanded">
            <h3>{t.expandedTitle}</h3>
            <p>{t.expandedContent}</p>
          </div>
        )}

        <p className="program__footnote anim-ready" style={{ '--delay': '0.6s' }}>
          {t.footnote}
        </p>
      </div>
    </section>
  );
}

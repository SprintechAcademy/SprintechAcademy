import { useContext } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';

export default function Ticker() {
  const { lang } = useContext(LangContext);
  const text = content[lang].ticker.text;

  return (
    <div className="ticker">
      <div className="ticker__track">
        <span className="ticker__text">{text}</span>
        <span className="ticker__text" aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}

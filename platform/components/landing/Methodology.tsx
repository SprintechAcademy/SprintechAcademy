'use client'
import { useContext } from 'react'
import { LangContext } from './LandingPage'
import content from '@/lib/landing-content'
import useScrollAnim from '@/hooks/useScrollAnim'

export default function Methodology() {
  const { lang } = useContext(LangContext)
  const t = content[lang].methodology
  const ref = useScrollAnim()

  return (
    <section className="methodology" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <p className="eyebrow anim-ready" style={{ '--delay': '0s' } as React.CSSProperties}>{t.eyebrow}</p>
        <h2 className="section-title anim-ready" style={{ '--delay': '0.08s' } as React.CSSProperties}>{t.title}</h2>
        <div className="methodology__cards anim-ready" style={{ '--delay': '0.18s' } as React.CSSProperties}>
          {t.pillars.map((pillar) => (
            <div key={pillar.num} className="methodology__card" data-num={pillar.num}>
              <span className="methodology__card-num">{pillar.num}</span>
              <h3 className="methodology__card-title">{pillar.title}</h3>
              <p className="methodology__card-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

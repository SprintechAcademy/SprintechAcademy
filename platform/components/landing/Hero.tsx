'use client'
import { useState, useEffect, useContext } from 'react'
import LandingLogo from './Logo'
import { LangContext } from './LandingPage'
import content from '@/lib/landing-content'

export default function Hero() {
  const { lang } = useContext(LangContext)
  const t = content[lang].hero
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`hero${loaded ? ' hero-loaded' : ''}`}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="container">
        <div className="hero__content">
          <div className="hero__logo-mini anim-hero" style={{ '--delay': '0s' } as React.CSSProperties}>
            <LandingLogo />
          </div>
          <h1 className="hero__h1 anim-hero" style={{ '--delay': '0.12s' } as React.CSSProperties}>
            <span className="hero__h1-line1">{t.h1a}</span>
            <span className="hero__h1-line2">{t.h1b}</span>
          </h1>
          <p className="hero__subtitle anim-hero" style={{ '--delay': '0.26s' } as React.CSSProperties}>
            {t.subtitle}
          </p>
          <div className="hero__ctas anim-hero" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            <a href="/login" className="btn btn--purple">{t.ctaPrimary}</a>
            <a href="#" className="btn--ghost">
              <span className="btn-ghost__icon" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {t.ctaSecondary}
            </a>
          </div>
          <div className="hero__scroll anim-hero" style={{ '--delay': '0.58s' } as React.CSSProperties}>
            <span className="hero__scroll-bar" />
            <span className="hero__scroll-text">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}

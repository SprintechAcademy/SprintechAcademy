'use client'
import { createContext, useState } from 'react'
import type { Lang } from '@/lib/landing-content'
import Navbar from './Navbar'
import Hero from './Hero'
import Mentalidad from './Mentalidad'
import QueHacemos from './QueHacemos'
import Methodology from './Methodology'
import CTAFinal from './CTAFinal'
import Footer from './Footer'

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'es',
  setLang: () => {},
})

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('es')

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Navbar />
      <main>
        <Hero />
        <Mentalidad />
        <QueHacemos />
        <Methodology />
        <CTAFinal />
      </main>
      <Footer />
    </LangContext.Provider>
  )
}

import { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Program from './components/Program';
import Mentalidad from './components/Mentalidad';
import Methodology from './components/Methodology';
import UnEspacioParaTodos from './components/UnEspacioParaTodos';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import ForCompanies from './components/ForCompanies';
import CTAFinal from './components/CTAFinal';
import Footer from './components/Footer';
import './App.css';

export const LangContext = createContext({ lang: 'es', setLang: () => {} });

export default function App() {
  const [lang, setLang] = useState('es');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Program />
        <Mentalidad />
        <Methodology />
        <UnEspacioParaTodos />
        <Pricing />
        <FAQ />
        <ForCompanies />
        <CTAFinal />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}

import { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Program from './components/Program';
import Problem from './components/Problem';
import Opportunity from './components/Opportunity';
import Methodology from './components/Methodology';
import Community from './components/Community';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTAFinal from './components/CTAFinal';
import ForCompanies from './components/ForCompanies';
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
        <Program />
        <Problem />
        <Opportunity />
        <Methodology />
        <Community />
        <Pricing />
        <FAQ />
        <ForCompanies />
        <CTAFinal />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}

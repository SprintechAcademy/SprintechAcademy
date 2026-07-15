import { createContext, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mentalidad from './components/Mentalidad';
import QueHacemos from './components/QueHacemos';
import Methodology from './components/Methodology';
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
        <Mentalidad />
        <QueHacemos />
        <Methodology />
        <CTAFinal />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}

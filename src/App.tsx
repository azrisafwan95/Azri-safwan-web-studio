import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import WALinkGenerator from './components/WALinkGenerator';
import InvoiceGenerator from './components/InvoiceGenerator';
import About from './components/About';
import Footer from './components/Footer';
import { translations } from './data/translations';

function App() {
  const [lang, setLang] = useState<'en' | 'ms'>('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Kita hantar lang, setLang dan data kamus (t) ke Navbar */}
      <Navbar lang={lang} setLang={setLang} t={t.nav} />
      
      <main>
        {/* Kita hantar data kamus ke Hero */}
        <Hero t={t.hero} />
        
        <Portfolio />
        <Pricing />
        <WALinkGenerator />
        <InvoiceGenerator />
        <About />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
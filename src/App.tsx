import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import WALinkGenerator from './components/WALinkGenerator';
import InvoiceGenerator from './components/InvoiceGenerator';
import About from './components/About';
import Footer from './components/Footer';
import StudioPage from './components/StudioPage';
import { translations } from './data/translations';

function App() {
  const [lang, setLang] = useState<'en' | 'ms'>('en');
  const t = translations[lang];

  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<StudioPage />} />
        <Route path="/" element={
          <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar lang={lang} setLang={setLang} t={t.nav} />
            <main>
              <Hero t={t.hero} />
              <Portfolio t={t.portfolio} />
              <Pricing t={t.pricing} />
              <div id="tools" className="py-20 bg-[#0d0e12]">
                <WALinkGenerator t={t.wa} />
                <InvoiceGenerator t={t.inv} />
              </div>
              <About t={t.about} />
            </main>
            <Footer t={t.footer} />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
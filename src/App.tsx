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
          <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-500">
            <Navbar lang={lang} setLang={setLang} t={t.nav} />
            <main>
              <Hero t={t.hero} />
              <Portfolio t={t.portfolio} />
              <Pricing t={t.pricing} />
              
              <div id="tools" className="py-20 bg-[#0d0e12]">
                <div className="text-center mb-16 px-4">
                   <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
                    {t.tools.title} <span className="text-yellow-500">{t.tools.titleGold}</span>
                  </h2>
                  <p className="text-gray-400 font-medium text-sm max-w-xl mx-auto">{t.tools.desc}</p>
                </div>
                <WALinkGenerator t={t.tools} />
                <InvoiceGenerator t={t.tools} />
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
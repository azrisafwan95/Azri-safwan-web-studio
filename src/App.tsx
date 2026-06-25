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
import StudioPage from './components/StudioPage'; // <-- Import Pejabat
import { translations } from './data/translations';

function App() {
  const [lang, setLang] = useState<'en' | 'ms'>('en');
  const t = translations[lang];

  return (
    <Router>
      <Routes>
        {/* JALAN RAHSIA KE PEJABAT SANITY */}
        <Route path="/admin/*" element={<StudioPage />} />

        {/* WEBSITE BIASA */}
        <Route path="/" element={
          <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar lang={lang} setLang={setLang} t={t.nav} />
            <main>
              <Hero t={t.hero} />
              <Portfolio />
              <Pricing />
              <WALinkGenerator />
              <InvoiceGenerator />
              <About />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
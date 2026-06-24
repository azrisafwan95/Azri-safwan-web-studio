import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import WALinkGenerator from './components/WALinkGenerator'; // <-- Import baru
import InvoiceGenerator from './components/InvoiceGenerator';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Pricing />
        
        {/* Bahagian Tool Percuma WhatsApp */}
        <WALinkGenerator />

        {/* Bahagian Tool Invois Profesional */}
        <InvoiceGenerator />
        
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;

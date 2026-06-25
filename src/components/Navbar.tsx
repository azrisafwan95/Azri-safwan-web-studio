import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ lang, setLang, t }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.portfolio, href: '#portfolio' },
    { name: t.pricing, href: '#pricing' },
    { name: t.about, href: '#about' },
  ];

  const whatsappLink = "https://wa.me/601121281024";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-yellow-500/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="flex items-center">
            <a href="#home" className="flex items-center group">
              <img src="/logo-baru.png" alt="Logo" className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-yellow-500 transition-colors font-bold text-xs uppercase tracking-widest">
                {link.name}
              </a>
            ))}
            
            {/* SWITCHER BAHASA (Desktop) */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
              <button onClick={() => setLang('en')} className={`px-2 py-1 rounded-full text-[9px] font-black transition-all ${lang === 'en' ? 'bg-yellow-500 text-black' : 'text-gray-500'}`}>EN</button>
              <button onClick={() => setLang('ms')} className={`px-2 py-1 rounded-full text-[9px] font-black transition-all ${lang === 'ms' ? 'bg-yellow-500 text-black' : 'text-gray-500'}`}>BM</button>
            </div>

            <a href={whatsappLink} target="_blank" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              {t.contact}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            {/* SWITCHER BAHASA (Mobile) */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
              <button onClick={() => setLang('en')} className={`px-2 py-1 rounded-full text-[8px] font-black transition-all ${lang === 'en' ? 'bg-yellow-500 text-black' : 'text-gray-500'}`}>EN</button>
              <button onClick={() => setLang('ms')} className={`px-2 py-1 rounded-full text-[8px] font-black transition-all ${lang === 'ms' ? 'bg-yellow-500 text-black' : 'text-gray-500'}`}>BM</button>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-yellow-500 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-black/98 border-t border-yellow-500/20 overflow-hidden">
          <div className="px-6 py-8 flex flex-col space-y-6 items-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-yellow-500 text-lg font-bold uppercase tracking-widest">{link.name}</a>
            ))}
            <a href={whatsappLink} target="_blank" onClick={() => setIsOpen(false)} className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm w-full text-center shadow-lg">{t.contact}</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
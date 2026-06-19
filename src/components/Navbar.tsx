import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Harga', href: '#pricing' },
    { name: 'Tentang', href: '#about' },
  ];

  // Guna nombor abang: 01121281024
  const whatsappLink = "https://wa.me/601121281024";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-yellow-500/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO SECTION */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center group">
              <img 
                src="/logo-azri-safwan.png" 
                alt="Azri Safwan Web Studio" 
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-yellow-500 transition-colors font-semibold text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] active:scale-95"
            >
              Hubungi Saya
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-yellow-500 p-2 focus:outline-none"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-black/98 border-t border-yellow-500/20 overflow-hidden"
        >
          <div className="px-6 py-8 flex flex-col space-y-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-yellow-500 text-lg font-bold uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm w-full text-center shadow-lg"
            >
              WhatsApp Sekarang
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

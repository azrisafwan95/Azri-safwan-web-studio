import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="text-yellow-500 w-8 h-8" />
            <span className="text-xl font-bold tracking-tighter text-white">
              AZRI <span className="text-yellow-500">SAFWAN</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-yellow-500 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/60123456789"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-full font-bold transition-transform hover:scale-105"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 absolute top-full left-0 w-full p-4 flex flex-col space-y-4 items-center border-t border-yellow-500/20"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-yellow-500 text-lg"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://wa.me/60123456789"
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold w-full text-center"
          >
            WhatsApp
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
